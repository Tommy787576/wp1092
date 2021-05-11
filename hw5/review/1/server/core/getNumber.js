import getTime from '../core/time'
import log2file from '../server'

let number

const getRandom = (x) => {
  return Math.floor(Math.random()*x);
};

const getNumber = (forceRestart = false) => {
  // TODO:
  // generate a random number if number is undefined or forceRestart is true
  if (number == undefined || forceRestart){
    const prefix = number == undefined ? 'start' : 'restart'
    number = getRandom(100)
    try{
      log2file(`${prefix} number=${number} ${getTime()}`)
    }
    catch (e) {
      console.log(e)
    }
  }
  return number
}

export default getNumber