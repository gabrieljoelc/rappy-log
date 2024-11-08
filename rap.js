function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function* freestyle(rapsArr) {
  let rapsCopy = rapsArr.slice();
  for (let index = 0; index < rapsArr.length; index++) {
    const randomIndex = getRandomInt(rapsCopy.length - 1);
    yield rapsCopy[randomIndex];
    rapsCopy.splice(randomIndex, 1)
  }
};

export const defaultBars = [
  'Like I ain\'t down with the hood',
  'Euphoric brain liquid melt shifted felt good',
  'And money on the wood',
  'We made a promise and it\'s understood',
];
