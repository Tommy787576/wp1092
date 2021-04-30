let number

const getNumber = (forceRestart = false) => {
  // generate a random number if number is undefined or forceRestart is true
  if (number === undefined || forceRestart) {
    number = Math.floor(Math.random() * 100) + 1;
    // console.log("number is generated, target number = ", number);
  }
  return number
}

export default getNumber
