import { kebabCase } from './kebabCase';
import { expect } from 'chai';

describe('kebabCase', () => {
  it('skewers all the pieces', async () => {
    const pieces = Promise.resolve(['a', 'b', 'c']);
    const string = await kebabCase(pieces);
    expect(string).to.eq('a-b-c');
  });

  it('lowercases each of the characters', async () => {
    const pieces = Promise.resolve(['Ab', 'cD', 'E']);
    const string = await kebabCase(pieces);
    expect(string).to.eq('ab-cd-e');
  });
});
