export function getKeyByValue(object, value) {
  return Object.entries(object).find(([key, val]) => val === value)?.[0];
}
