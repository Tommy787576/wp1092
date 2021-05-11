import express from 'express'
import getNumber from '../core/getNumber'
import {logGuess, logStart, logRestart} from '../core/logWriter'

const router = express.Router()

function roughScale(x, base) {
  const parsed = parseInt(x, base)
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}

// Just call getNumber(true) to generate a random number for guessing game
router.post('/start', (_, res) => {
  logStart(getNumber(true));
  res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)
  
  // check if NOT a num or not in range [1,100]
  if (!guessed || guessed < 1 || guessed > 100) {
    res.status(400).send({ msg: 'Not a legal number.' })
  }
  else {
  // TODO: check if number and guessed are the same,
  // and response with some hint "Equal", "Bigger", "Smaller"
    let _msg;
    if ( guessed === number ) {
      _msg = "Equal"
      logGuess(guessed, true);
    } else {
      if ( guessed < number )  _msg = "Bigger"
      if ( guessed > number )  _msg = "Smaller"
      logGuess(guessed);
    }
    res.status(200).send({ msg: _msg })
  }
})

// TODO: add router.post('/restart',...)
router.post('/restart', (req, res) => {
  logRestart(getNumber(true));
  res.json({ msg: 'The game has restarted.' })
})

export default router
