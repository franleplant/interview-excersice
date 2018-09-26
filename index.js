const assert = require("assert");

function getCandidates(scores, lowerLimits, upperLimits) {
  // Build frequency array indexed by scores
  const freq = [];
  scores.forEach(score => {
    const value = freq[score] || 0;
    freq[score] = value + 1;
  });


  // build accumulated frequency array indexed by scores
  const freqAcc = []
  const biggestScore = freq.length - 1
  for (let score = 0; score <= biggestScore ; score++) {
    const prevFreqAcc = freqAcc[score - 1] || 0;
    const nextFreq = freq[score] || 0
    console.log('prev freq', prevFreqAcc, nextFreq)
    freqAcc[score] = nextFreq + prevFreqAcc;
  }

  console.log('scores', scores)
  console.log('freq', freq)
  console.log('feqAc', freqAcc)

  const result = lowerLimits.map((lower, index) => {
    const upper = upperLimits[index];

    const upperFreq = freqAcc[upper] || freqAcc[freqAcc.length - 1]
    const lowerFreq = freqAcc[lower - 1] || 0

    const candidates =  upperFreq - lowerFreq;
    return candidates;
  });

  return result;
}


assert.deepEqual(
  getCandidates(
    [1],

    [0],
    [2]
  ),

  [1]
);

assert.deepEqual(
  getCandidates(
    [1],

    [1],
    [1]
  ),

  [1]
);

assert.deepEqual(
  getCandidates(
    [1, 2, 3, 3],

    [0],
    [2]
  ),

  [2]
);

assert.deepEqual(
  getCandidates(
    [1, 2, 3, 3, 4, 5, 8, 3],

    [0, 4, 9],
    [3, 8, 10]
  ),

  [5, 3, 0]
);
