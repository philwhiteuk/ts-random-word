async function repeat<T>(fn: () => Promise<T[]>, times = 1): Promise<T[]> {
  return await Promise.all(Array(times).fill(null).map(fn)).then((a) => a.flat());
}

export async function two<T>(fn: () => Promise<T[]>): Promise<T[]> {
  return await repeat(fn, 2);
}

export const twice = two;

export async function three<T>(fn: () => Promise<T[]>): Promise<T[]> {
  return await repeat(fn, 3);
}

export const thrice = three;
