export const throwDice = (): number => {
  const random = Math.floor(Math.random() * 6);
  return random;
};
