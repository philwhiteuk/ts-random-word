export const kebabCase = async (a: Promise<string[]>) =>
  await Promise.resolve(a).then((a) => a.join('-').toLowerCase());
