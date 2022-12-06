import { expect } from 'chai';
import { randomWord } from './randomWord';

describe('randomWord', () => {
  it('gets a random word from a list of words', async () => {
    const [string] = await randomWord()();
    expect(string).not.to.be.undefined;
    expect(string).not.to.be.null;
    expect(typeof string).to.eq('string');
  });

  it('gets a word with a minimum length of characters', async () => {
    const minLength = 20;
    const [string] = await randomWord({ wordLength: { min: minLength, max: minLength + 1 } })();
    expect(string.length).to.be.gte(minLength);
  });

  it('gets a word with a minimum and maximum length of characters', async () => {
    const maxLength = 5;
    const [string] = await randomWord({ wordLength: { min: maxLength - 1, max: maxLength } })();
    expect(string.length).to.be.lte(maxLength);
  });
});
