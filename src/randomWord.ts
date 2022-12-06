import { createReadStream, statSync } from 'fs';

type RandomWordOptions = {
  list: string;
  wordLength: {
    min: number;
    max: number;
  };
};

export function randomWord(overrides?: Partial<RandomWordOptions>): () => Promise<string[]> {
  return () =>
    new Promise((resolve) => {
      // merge overrides with defaults
      const options: RandomWordOptions = {
        list: '/usr/share/dict/words',
        wordLength: {
          min: 15,
          max: 17,
        },
        ...overrides,
      };

      // stream the word list from a random start point
      const wordListSize = statSync(options.list).size;
      const bufferLengthBytes = options.wordLength.max;
      const stream = createReadStream(options.list, {
        start: Math.floor(Math.random() * wordListSize),
        highWaterMark: bufferLengthBytes,
      });

      let buffer = '';
      stream.on('data', (chunk) => {
        buffer += chunk.toString();

        // check the buffered string for any complete words matching the length requirements
        const match = new RegExp(`\\W([a-zA-Z]{${options.wordLength.min},${options.wordLength.max}})\\W`).exec(buffer);
        if (match && match[1]) {
          // close the stream and return the match
          stream.close();
          resolve([match[1]]);
        }

        // any incomplete words go back on the buffer
        buffer = `\n${buffer.split(/\W/).pop()}` || '';
      });

      // if we get to the end of the word list before finding a suitable word we create a new one
      stream.on('end', () => {
        resolve(Promise.resolve(randomWord()()));
      });
    });
}
