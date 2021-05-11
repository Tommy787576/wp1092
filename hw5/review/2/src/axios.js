import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })

const startGame = async () => {
  try {
    const {
      data: { msg }
    } = await instance.post('/start')
    return msg
  } catch ( err ) {
    if (err.response === undefined) {
      console.log("Network Error");
      alert("Can not connect to server!")
      return 0;
    }
  }
}

const guess = async (number) => {
  // TODO: Change this to catch error
  // The error message should be: Error: "xx" is not a valid number (1 - 100)
  try {
    const {
      data: { msg },
      status: { stat }
    } = await instance.get('/guess', { params: { number } }) 
    return msg
  } catch (err) {
    if (err.response === undefined) {
      console.log("Network Error");
      alert("Can not connect to server!")
      return 0;
    } else {
      if (err.response.status === 400) {
        let msg = `Error: "${number}" is not a valid number (1 - 100)`
        return msg
      }
    }
  }

}

const restart = async () => {
  try {  
    const {
      data: { msg }
    } = await instance.post('/restart')
    return msg
  } catch (err) {
    console.log(err.response)
    if (err.response === undefined) {
      console.log("Network Error");
      alert("Can not connect to server!")
      return 0;
    }
  }

}

export { startGame, guess, restart }
