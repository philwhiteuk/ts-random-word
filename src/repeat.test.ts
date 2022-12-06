import { expect } from 'chai';
import { three, thrice, twice, two } from './repeat';

describe('repeat', () => {
  const thing = () => Promise.resolve(['same']);

  it('does the same thing twice', async () => {
    expect(await two(thing)).to.eql(['same', 'same']);
    expect(await twice(thing)).to.eql(['same', 'same']);
  });

  it('does the same thing thrice', async () => {
    expect(await three(thing)).to.eql(['same', 'same', 'same']);
    expect(await thrice(thing)).to.eql(['same', 'same', 'same']);
  });
});
