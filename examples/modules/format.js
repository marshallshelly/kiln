import { get } from "./store.js";

export const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;

export function summary() {
  const { count, log } = get();
  return `${plural(count, "unit")} after ${plural(log.length, "action")}`;
}
