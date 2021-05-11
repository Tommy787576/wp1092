let logger = [];
var stream;
const logFolder = './server/log/'
const fs = require('fs');

const timeFormater = (d) => {
  return  d.getFullYear() + "-" + 
          ('0' + (d.getMonth() + 1)).slice(-2) + "-" + 
          ('0' + d.getDate()).slice(-2) + "-" + 
          ('0' + d.getHours()).slice(-2) + "-" + 
          ('0' + d.getMinutes()).slice(-2) + "-" + 
          ('0' + d.getSeconds()).slice(-2);

}

const logGuess = (number, isEnd = false) => {
  let logStr = `guess ${number} ${timeFormater(new Date())}`; 
  logger.push(logStr)
  writeLogFile(logStr);
  if (isEnd) {
    logStr = `end-game`; 
    logger.push(logStr)
    writeLogFile(logStr);
  }
}

const logStart = (number) => {
  let logStr = `start number=${number} ${timeFormater(new Date())}`; 
  logger.push(logStr)
  writeLogFile(logStr);
}

const logRestart = (number) => {
  let logStr = `restart number=${number} ${timeFormater(new Date())}`; 
  logger.push(logStr)
  writeLogFile(logStr);
}

const writeLogFile = (logStr) => {
  if (stream === undefined) {
    
    let log_filename = `${timeFormater(new Date())}.log`
    stream = fs.createWriteStream(logFolder + log_filename, {flags:'a'});
  }
  stream.write(logStr + '\n');
  // fs.appendFileSync(logFolder + log_filename, , function (err) {
    // if (err) {
      // console.log(err);
    // }
    // console.log('Saved!');
  // });
}

export {logGuess, logStart, logRestart}
