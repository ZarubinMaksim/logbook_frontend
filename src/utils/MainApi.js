const baseUrl = 'http://localhost:3000'
const headers = {
  'Content-type': 'application/json',
  Accept: 'application/json'
}

const getResponseData = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`)
}

const setAlarm = (room, date, time) => {
  console.log('setAlarm')
  // return fetch(`${baseUrl}/createAlarm`, {
  //   method: 'POST',
  //   headers: headers,
  //   body: JSON.stringify({ room, date, time})
  // })
  // .then(getResponseData)
}

const MainApi = {
  setAlarm
}

export default MainApi;
  