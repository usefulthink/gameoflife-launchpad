import sinon from 'sinon';
import unexpected from 'unexpected';

import gameoflife from '../lib/gameoflife';

const expect = unexpected.clone();

describe('gameoflife', () => {
  // babysteps my ass.
  it('calculates a new generation', () => {
    const oldGeneration = [[0, 0], [2, 0], [1, 1], [1, 2], [2, 2]];
    const newGeneration = [[1, 0], [0, 1], [1, 2], [2, 2]];

    // need to sort the arrays as the order of items isn't relevant and not
    // subject of the test.
    expect(
        gameoflife(oldGeneration).map(c => c.join()).sort(),
        'to equal',
        newGeneration.map(c => c.join()).sort());
  });
});
