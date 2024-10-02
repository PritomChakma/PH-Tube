function setTime(time) {
  const hour = parseInt(time / 3600);
  let remainingSecong = time % 3600;
  const munite = remainingSecong / 60;
  remainingSecong = remainingSecong % 60;

  return `${hour} Hour ${munite} munite ${remainingSecong} second ago`;
}
console.log(setTime(45345));
