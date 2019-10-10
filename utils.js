const randomChoice = (choices) => {
  const probMethod = Math.random();
  if (probMethod < 0.5) return randomByDate(choices);
  else return randomByMath(choices);
};
const randomByMath = (choices) => {
  return choices[Math.floor(Math.random() * choices.length)];
};
const randomByDate = (choices) => {
  return choices[Date.now() % choices.length];
};

module.exports = {
  randomChoice,
  randomByMath,
  randomByDate
};
