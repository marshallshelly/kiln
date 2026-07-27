use std::sync::Arc;

use anyhow::{Context, Result, anyhow};
use winit::application::ApplicationHandler;
use winit::dpi::PhysicalSize;
use winit::event::WindowEvent;
use winit::event_loop::{ActiveEventLoop, ControlFlow, EventLoop};
use winit::window::{Window, WindowId};

const HEADLESS_SIZE: PhysicalSize<u32> = PhysicalSize::new(800, 560);
const INK: [f32; 3] = [0.043, 0.071, 0.149];
const AMBER: [f32; 4] = [0.961, 0.663, 0.235, 1.0];
const COPY_ROW_ALIGNMENT: u32 = 256;

#[derive(Debug, Clone, Copy)]
struct Rect {
    x: f32,
    y: f32,
    width: f32,
    height: f32,
    radius: f32,
    color: [f32; 4],
}

impl Rect {
    #[expect(dead_code, reason = "hit testing lands with the DOM in M3")]
    fn contains(&self, px: f32, py: f32) -> bool {
        px >= self.x && px < self.x + self.width && py >= self.y && py < self.y + self.height
    }
}

fn srgb_to_linear(c: f32) -> f32 {
    if c <= 0.04045 {
        c / 12.92
    } else {
        ((c + 0.055) / 1.055).powf(2.4)
    }
}

#[repr(C)]
#[derive(Debug, Clone, Copy, bytemuck::Pod, bytemuck::Zeroable)]
struct Uniforms {
    rect: [f32; 4],
    color: [f32; 4],
    params: [f32; 4],
}

impl Uniforms {
    fn new(rect: &Rect, surface: PhysicalSize<u32>) -> Self {
        let [r, g, b, a] = rect.color;
        Self {
            rect: [rect.x, rect.y, rect.width, rect.height],
            color: [
                srgb_to_linear(r),
                srgb_to_linear(g),
                srgb_to_linear(b),
                a,
            ],
            params: [
                rect.radius,
                surface.width as f32,
                surface.height as f32,
                0.0,
            ],
        }
    }
}

fn demo_rect() -> Rect {
    Rect {
        x: 160.0,
        y: 120.0,
        width: 480.0,
        height: 320.0,
        radius: 48.0,
        color: AMBER,
    }
}

fn ink() -> wgpu::Color {
    let [r, g, b] = INK;
    wgpu::Color {
        r: f64::from(srgb_to_linear(r)),
        g: f64::from(srgb_to_linear(g)),
        b: f64::from(srgb_to_linear(b)),
        a: 1.0,
    }
}

struct Painter {
    pipeline: wgpu::RenderPipeline,
    uniforms: wgpu::Buffer,
    bind_group: wgpu::BindGroup,
}

impl Painter {
    fn new(device: &wgpu::Device, format: wgpu::TextureFormat) -> Self {
        let shader = device.create_shader_module(wgpu::include_wgsl!("shader.wgsl"));

        let uniforms = device.create_buffer(&wgpu::BufferDescriptor {
            label: Some("uniforms"),
            size: size_of::<Uniforms>() as u64,
            usage: wgpu::BufferUsages::UNIFORM | wgpu::BufferUsages::COPY_DST,
            mapped_at_creation: false,
        });

        let layout = device.create_bind_group_layout(&wgpu::BindGroupLayoutDescriptor {
            label: Some("uniforms"),
            entries: &[wgpu::BindGroupLayoutEntry {
                binding: 0,
                visibility: wgpu::ShaderStages::VERTEX_FRAGMENT,
                ty: wgpu::BindingType::Buffer {
                    ty: wgpu::BufferBindingType::Uniform,
                    has_dynamic_offset: false,
                    min_binding_size: None,
                },
                count: None,
            }],
        });

        let bind_group = device.create_bind_group(&wgpu::BindGroupDescriptor {
            label: Some("uniforms"),
            layout: &layout,
            entries: &[wgpu::BindGroupEntry {
                binding: 0,
                resource: uniforms.as_entire_binding(),
            }],
        });

        let pipeline_layout = device.create_pipeline_layout(&wgpu::PipelineLayoutDescriptor {
            label: Some("kiln"),
            bind_group_layouts: &[Some(&layout)],
            immediate_size: 0,
        });

        let pipeline = device.create_render_pipeline(&wgpu::RenderPipelineDescriptor {
            label: Some("kiln"),
            layout: Some(&pipeline_layout),
            vertex: wgpu::VertexState {
                module: &shader,
                entry_point: Some("vs_main"),
                compilation_options: wgpu::PipelineCompilationOptions::default(),
                buffers: &[],
            },
            fragment: Some(wgpu::FragmentState {
                module: &shader,
                entry_point: Some("fs_main"),
                compilation_options: wgpu::PipelineCompilationOptions::default(),
                targets: &[Some(wgpu::ColorTargetState {
                    format,
                    blend: Some(wgpu::BlendState::ALPHA_BLENDING),
                    write_mask: wgpu::ColorWrites::ALL,
                })],
            }),
            primitive: wgpu::PrimitiveState::default(),
            depth_stencil: None,
            multisample: wgpu::MultisampleState::default(),
            multiview_mask: None,
            cache: None,
        });

        Self {
            pipeline,
            uniforms,
            bind_group,
        }
    }

    fn upload(&self, queue: &wgpu::Queue, rect: &Rect, size: PhysicalSize<u32>) {
        queue.write_buffer(&self.uniforms, 0, bytemuck::bytes_of(&Uniforms::new(rect, size)));
    }

    fn encode(&self, encoder: &mut wgpu::CommandEncoder, view: &wgpu::TextureView) {
        let mut pass = encoder.begin_render_pass(&wgpu::RenderPassDescriptor {
            label: Some("kiln"),
            color_attachments: &[Some(wgpu::RenderPassColorAttachment {
                view,
                depth_slice: None,
                resolve_target: None,
                ops: wgpu::Operations {
                    load: wgpu::LoadOp::Clear(ink()),
                    store: wgpu::StoreOp::Store,
                },
            })],
            depth_stencil_attachment: None,
            timestamp_writes: None,
            occlusion_query_set: None,
            multiview_mask: None,
        });
        pass.set_pipeline(&self.pipeline);
        pass.set_bind_group(0, &self.bind_group, &[]);
        pass.draw(0..3, 0..1);
    }
}

struct Gpu {
    surface: wgpu::Surface<'static>,
    device: wgpu::Device,
    queue: wgpu::Queue,
    config: wgpu::SurfaceConfiguration,
    painter: Painter,
}

struct App {
    window: Option<Arc<Window>>,
    gpu: Option<Gpu>,
    rect: Rect,
    failure: Option<anyhow::Error>,
}

impl App {
    fn new() -> Self {
        Self {
            window: None,
            gpu: None,
            rect: demo_rect(),
            failure: None,
        }
    }

    fn init(&mut self, event_loop: &ActiveEventLoop) -> Result<()> {
        let window = Arc::new(
            event_loop
                .create_window(
                    Window::default_attributes()
                        .with_title("Kiln")
                        .with_inner_size(winit::dpi::LogicalSize::new(800.0, 560.0)),
                )
                .context("create window")?,
        );

        let instance = wgpu::Instance::new(wgpu::InstanceDescriptor::new_with_display_handle(
            Box::new(event_loop.owned_display_handle()),
        ));

        let surface = instance
            .create_surface(Arc::clone(&window))
            .context("create surface")?;

        let adapter = pollster::block_on(instance.request_adapter(&wgpu::RequestAdapterOptions {
            compatible_surface: Some(&surface),
            ..Default::default()
        }))
        .context("request adapter")?;

        let (device, queue) = pollster::block_on(adapter.request_device(&wgpu::DeviceDescriptor {
            label: Some("kiln"),
            ..Default::default()
        }))
        .context("request device")?;

        let size = window.inner_size();
        let config = surface
            .get_default_config(&adapter, size.width.max(1), size.height.max(1))
            .ok_or_else(|| anyhow!("surface is not supported by the chosen adapter"))?;
        surface.configure(&device, &config);

        let painter = Painter::new(&device, config.format);

        self.gpu = Some(Gpu {
            surface,
            device,
            queue,
            config,
            painter,
        });
        self.window = Some(window);
        Ok(())
    }

    fn resize(&mut self, size: PhysicalSize<u32>) {
        let Some(gpu) = self.gpu.as_mut() else {
            return;
        };
        if size.width == 0 || size.height == 0 {
            return;
        }
        gpu.config.width = size.width;
        gpu.config.height = size.height;
        gpu.surface.configure(&gpu.device, &gpu.config);
    }

    fn render(&mut self) {
        let Some(gpu) = self.gpu.as_ref() else {
            return;
        };

        let frame = match gpu.surface.get_current_texture() {
            wgpu::CurrentSurfaceTexture::Success(frame) => frame,
            wgpu::CurrentSurfaceTexture::Timeout
            | wgpu::CurrentSurfaceTexture::Occluded
            | wgpu::CurrentSurfaceTexture::Validation => return,
            wgpu::CurrentSurfaceTexture::Suboptimal(_)
            | wgpu::CurrentSurfaceTexture::Outdated
            | wgpu::CurrentSurfaceTexture::Lost => {
                gpu.surface.configure(&gpu.device, &gpu.config);
                return;
            }
        };

        gpu.painter.upload(
            &gpu.queue,
            &self.rect,
            PhysicalSize::new(gpu.config.width, gpu.config.height),
        );

        let view = frame
            .texture
            .create_view(&wgpu::TextureViewDescriptor::default());
        let mut encoder = gpu
            .device
            .create_command_encoder(&wgpu::CommandEncoderDescriptor {
                label: Some("frame"),
            });
        gpu.painter.encode(&mut encoder, &view);

        gpu.queue.submit([encoder.finish()]);
        gpu.queue.present(frame);
    }
}

impl ApplicationHandler for App {
    fn resumed(&mut self, event_loop: &ActiveEventLoop) {
        if self.window.is_some() {
            return;
        }
        if let Err(error) = self.init(event_loop) {
            self.failure = Some(error);
            event_loop.exit();
        }
    }

    fn window_event(&mut self, event_loop: &ActiveEventLoop, _id: WindowId, event: WindowEvent) {
        match event {
            WindowEvent::CloseRequested => event_loop.exit(),
            WindowEvent::Resized(size) => {
                self.resize(size);
                if let Some(window) = self.window.as_ref() {
                    window.request_redraw();
                }
            }
            WindowEvent::RedrawRequested => self.render(),
            _ => {}
        }
    }
}

fn render_headless(path: &str, size: PhysicalSize<u32>) -> Result<()> {
    let instance = wgpu::Instance::new(wgpu::InstanceDescriptor::new_without_display_handle());

    let adapter =
        pollster::block_on(instance.request_adapter(&wgpu::RequestAdapterOptions::default()))
            .context("request adapter")?;
    let (device, queue) = pollster::block_on(adapter.request_device(&wgpu::DeviceDescriptor {
        label: Some("kiln-headless"),
        ..Default::default()
    }))
    .context("request device")?;

    let extent = wgpu::Extent3d {
        width: size.width,
        height: size.height,
        depth_or_array_layers: 1,
    };
    let format = wgpu::TextureFormat::Rgba8UnormSrgb;
    let texture = device.create_texture(&wgpu::TextureDescriptor {
        label: Some("headless target"),
        size: extent,
        mip_level_count: 1,
        sample_count: 1,
        dimension: wgpu::TextureDimension::D2,
        format,
        usage: wgpu::TextureUsages::RENDER_ATTACHMENT | wgpu::TextureUsages::COPY_SRC,
        view_formats: &[],
    });
    let view = texture.create_view(&wgpu::TextureViewDescriptor::default());

    let painter = Painter::new(&device, format);
    painter.upload(&queue, &demo_rect(), size);

    let row_bytes = size.width * 4;
    let padded_row = row_bytes.div_ceil(COPY_ROW_ALIGNMENT) * COPY_ROW_ALIGNMENT;
    let readback = device.create_buffer(&wgpu::BufferDescriptor {
        label: Some("readback"),
        size: u64::from(padded_row * size.height),
        usage: wgpu::BufferUsages::COPY_DST | wgpu::BufferUsages::MAP_READ,
        mapped_at_creation: false,
    });

    let mut encoder = device.create_command_encoder(&wgpu::CommandEncoderDescriptor {
        label: Some("headless"),
    });
    painter.encode(&mut encoder, &view);
    encoder.copy_texture_to_buffer(
        texture.as_image_copy(),
        wgpu::TexelCopyBufferInfo {
            buffer: &readback,
            layout: wgpu::TexelCopyBufferLayout {
                offset: 0,
                bytes_per_row: Some(padded_row),
                rows_per_image: Some(size.height),
            },
        },
        extent,
    );
    queue.submit([encoder.finish()]);

    let (tx, rx) = std::sync::mpsc::channel();
    readback.slice(..).map_async(wgpu::MapMode::Read, move |result| {
        let _ = tx.send(result);
    });
    device
        .poll(wgpu::PollType::wait_indefinitely())
        .context("poll device")?;
    rx.recv().context("map callback dropped")?.context("map readback buffer")?;

    let mapped = readback
        .slice(..)
        .get_mapped_range()
        .context("read mapped range")?;
    let pixels: Vec<u8> = (0..size.height)
        .flat_map(|row| {
            let start = (row * padded_row) as usize;
            mapped[start..start + row_bytes as usize].iter().copied()
        })
        .collect();
    drop(mapped);
    readback.unmap();

    let file = std::fs::File::create(path).with_context(|| format!("create {path}"))?;
    let mut encoder = png::Encoder::new(std::io::BufWriter::new(file), size.width, size.height);
    encoder.set_color(png::ColorType::Rgba);
    encoder.set_depth(png::BitDepth::Eight);
    encoder
        .write_header()
        .context("write png header")?
        .write_image_data(&pixels)
        .context("write png data")?;

    println!("wrote {path} ({}x{})", size.width, size.height);
    Ok(())
}

fn main() -> Result<()> {
    let mut args = std::env::args().skip(1);
    if args.next().as_deref() == Some("--render") {
        let path = args.next().unwrap_or_else(|| "kiln.png".to_string());
        return render_headless(&path, HEADLESS_SIZE);
    }

    let event_loop = EventLoop::new().context("create event loop")?;
    event_loop.set_control_flow(ControlFlow::Wait);

    let mut app = App::new();
    event_loop.run_app(&mut app).context("run event loop")?;

    match app.failure {
        Some(error) => Err(error),
        None => Ok(()),
    }
}
