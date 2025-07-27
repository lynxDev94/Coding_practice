function blowCandles(str) {
  const candles = str.split('').map(Number);
  let blows = 0;
  let i = 0;

  while (i < candles.length) {
    if (candles[i] === 0) {
      i++;
    } else {
      for (let j = i; j < i + 3 && j < candles.length; j++) {
        if (candles[j] > 0) {
          candles[j]--;
        }
      }
      blows++;
    }
  }

  return blows;
  
}