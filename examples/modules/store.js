const listeners = new Set();
let state = { count: 0, log: [] };

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function get() {
  return state;
}

export function dispatch(action) {
  state = reduce(state, action);
  for (const fn of listeners) fn(state);
}

function reduce(current, action) {
  switch (action) {
    case "inc":
      return { ...current, count: current.count + 1, log: [...current.log, "inc"] };
    case "dec":
      return { ...current, count: current.count - 1, log: [...current.log, "dec"] };
    default:
      return current;
  }
}
