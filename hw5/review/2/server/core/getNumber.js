let number

const getNumber = (forceRestart = false) => {
  // TODO:
  // generate a random number if number is undefined or forceRestart is true
  if (forceRestart || number === undefined) {
    number = Math.trunc(100*Math.random()) + 1;
    console.log(number);
  }
  return number
}

export default getNumber
