const assert = require("assert");

function getCandidates(scores, lowerLimits, upperLimits) {
  // Build frequency array indexed by scores
  const freq = Array(scores.length).fill(0);
  scores.forEach(score => {
    const value = freq[score] || 0;
    freq[score] = value + 1;
  });

  // build accumulated frequency array indexed by scores
  const freqAcc = freq.map((freq, score) => {
    const prevFreq = freq[score - 1] || 0;
    return freq + prevFreq;
  });

  const result = lowerLimits.map((lower, index) => {
    const upper = upperLimits[index];
    const candidates = freqAcc[upper] - freqAcc[lower];
    return candidates;
  });

  return result;
}

assert(
  getCandidates(
    [1],

    [0],
    [2]
  ),

  [1]
);

assert(
  getCandidates(
    [1, 2, 3, 3],

    [0],
    [2]
  ),

  [2]
);

assert(
  getCandidates(
    [1, 2, 3, 3, 4, 5, 8, 3],

    [0, 4, 9],
    [3, 8, 10]
  ),

  [5, 3, 0]
);
