export function getRandomDelay(min = 1000, max = 5000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function humanizedAction(actionFunc) {
  const delay = getRandomDelay();
  await new Promise(resolve => setTimeout(resolve, delay));
  return actionFunc();
}
