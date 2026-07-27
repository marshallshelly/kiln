struct Uniforms {
    rect: vec4<f32>,
    color: vec4<f32>,
    params: vec4<f32>,
};

@group(0) @binding(0) var<uniform> u: Uniforms;

@vertex
fn vs_main(@builtin(vertex_index) index: u32) -> @builtin(position) vec4<f32> {
    let i = i32(index);
    let x = f32(i / 2) * 4.0 - 1.0;
    let y = f32(i & 1) * 4.0 - 1.0;
    return vec4<f32>(x, y, 0.0, 1.0);
}

fn sd_rounded_box(p: vec2<f32>, b: vec2<f32>, r: f32) -> f32 {
    let q = abs(p) - b + vec2<f32>(r, r);
    return min(max(q.x, q.y), 0.0) + length(max(q, vec2<f32>(0.0, 0.0))) - r;
}

@fragment
fn fs_main(@builtin(position) frag: vec4<f32>) -> @location(0) vec4<f32> {
    let half_size = u.rect.zw * 0.5;
    let center = u.rect.xy + half_size;
    let radius = min(u.params.x, min(half_size.x, half_size.y));

    let dist = sd_rounded_box(frag.xy - center, half_size, radius);
    let coverage = 1.0 - smoothstep(-0.5, 0.5, dist);
    if coverage <= 0.0 {
        discard;
    }

    return vec4<f32>(u.color.rgb, u.color.a * coverage);
}
