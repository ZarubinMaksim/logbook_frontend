const baseUrl = 'http://localhost:3003'
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

//---------***--------ALARM---------***--------//

const setAlarm = (room, date) => {
  console.log('setAlarm succsesful in MAinapi')
  return fetch(`${baseUrl}/alarm`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ room, date})
  })
  .then(getResponseData)
}

const getAlarms = () => {
  console.log('get alarms from mainapi')
  return fetch(`${baseUrl}/alarm`, {
    method: 'GET',
    headers: headers,
  })
  .then(getResponseData)
}

const deleteAlarm = (id) => {
  return fetch(`${baseUrl}/alarm/${id}`, {
    method: 'DELETE',
    headers: headers,
  })
  .then(getResponseData)
  .catch((err) => {
    console.error(`Error:`, err)
  })
}

const updateAlarm = (id, room, date) => {
  return fetch(`${baseUrl}/alarm/${id}`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify({ room, date })
  })
  .then(getResponseData)
}
//---------***--------ALARM END---------***--------//


//---------***--------ALERT---------***--------//
const setAlert = (room, alertText) => {

  console.log('setalert succsesful in MAinapi', room, alertText)
  return fetch(`${baseUrl}/alert`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ room, alertText})
  })
  .then(getResponseData)
}

const getAlerts = () => {
  console.log('get alerts from mainapi')
  return fetch(`${baseUrl}/alert`, {
    method: 'GET',
    headers: headers,
  })
  .then(getResponseData)
}

const deleteAlert = (id) => {
  return fetch(`${baseUrl}/alert/${id}`, {
    method: 'DELETE',
    headers: headers,
  })
  .then(getResponseData)
  .catch((err) => {
    console.error(`Error:`, err)
  })
}

const updateAlert = (id, room, alertText) => {
  return fetch(`${baseUrl}/alert/${id}`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify({ room, alertText })
  })
  .then(getResponseData)
}

//---------***--------ALERT END---------***--------//


//---------***--------INVOICE---------***--------//
const setInvoice = (room, company, vat, details, email) => {
  console.log('invoice succsesful in MAinapi',)
  return fetch(`${baseUrl}/invoice`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ room, company, vat, details, email })
  })
  .then(getResponseData)
}

const getInvoices = () => {
  console.log('get alerts from mainapi')
  return fetch(`${baseUrl}/invoice`, {
    method: 'GET',
    headers: headers,
  })
  .then(getResponseData)
}

const deleteInvoice = (id) => {
  return fetch(`${baseUrl}/invoice/${id}`, {
    method: 'DELETE',
    headers: headers,
  })
  .then(getResponseData)
  .catch((err) => {
    console.error(`Error:`, err)
  })
}

const updateInvoice = (id, room, company, vat, details, email) => {
  return fetch(`${baseUrl}/invoice/${id}`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify({ room, company, vat, details, email })
  })
  .then(getResponseData)
}

//---------***--------INVOICE END---------***--------//


//---------***--------CONTACTS---------***--------//
const setContact = (department, firstname, name, middlename, phone, mobile, email) => {
  console.log('invoice succsesful in MAinapi',)
  return fetch(`${baseUrl}/contact`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ department, firstname, name, middlename, phone, mobile, email })
  })
  .then(getResponseData)
}

const getContacts = () => {
  console.log('get alerts from mainapi')
  return fetch(`${baseUrl}/contact`, {
    method: 'GET',
    headers: headers,
  })
  .then(getResponseData)
}

const deleteContact = (id) => {
  return fetch(`${baseUrl}/contact/${id}`, {
    method: 'DELETE',
    headers: headers,
  })
  .then(getResponseData)
  .catch((err) => {
    console.error(`Error:`, err)
  })
}

const updateContact = (id, department, firstname, name, middlename, phone, mobile, email) => {
  return fetch(`${baseUrl}/contact/${id}`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify({ department, firstname, name, middlename, phone, mobile, email })
  })
  .then(getResponseData)
}

//---------***--------CONTACTS END---------***--------//


//---------***--------TAXI---------***--------//
const setTaxi = (route, room, date, flight, pax, phone) => {
  console.log('taxi succsesful in MAinapi', route, room, date, flight, pax, phone)
  return fetch(`${baseUrl}/taxi`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ route, room, date, flight, pax, phone })
  })
  .then(getResponseData)
}

const getTaxies = () => {
  console.log('get taxis from mainapi')
  return fetch(`${baseUrl}/taxi`, {
    method: 'GET',
    headers: headers,
  })
  .then(getResponseData)
}

const deleteTaxi = (id) => {
  return fetch(`${baseUrl}/taxi/${id}`, {
    method: 'DELETE',
    headers: headers,
  })
  .then(getResponseData)
  .catch((err) => {
    console.error(`Error:`, err)
  })
}

const updateTaxi = (id, route, room, date, pax, flight, phone) => {
  return fetch(`${baseUrl}/taxi/${id}`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify({ route, room, date, pax, flight, phone })
  })
  .then(getResponseData)
}

//---------***--------TAXI END---------***--------//


//---------***--------UMBRELLA---------***--------//
const setUmbrella = (room, umbrella) => {
  return fetch(`${baseUrl}/umbrella`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ room, umbrella })
  })
  .then(getResponseData)
}

const getUmbrellas = () => {
  return fetch(`${baseUrl}/umbrella`, {
    method: 'GET',
    headers: headers,
  })
  .then(getResponseData)
}

const deleteUmbrella = (id) => {
  return fetch(`${baseUrl}/umbrella/${id}`, {
    method: 'DELETE',
    headers: headers,
  })
  .then(getResponseData)
  .catch((err) => {
    console.error(`Error:`, err)
  })
}

const updateUmbrella = (id, room, umbrella) => {
  return fetch(`${baseUrl}/umbrella/${id}`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify({ room, umbrella })
  })
  .then(getResponseData)
}

//---------***--------UMBRELLA END---------***--------//


//---------***--------NOTE---------***--------//
const setNote = (note) => {
  return fetch(`${baseUrl}/note`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ note })
  })
  .then(getResponseData)
}

const getNote = () => {
  return fetch(`${baseUrl}/note`, {
    method: 'GET',
    headers: headers,
  })
  .then(getResponseData)
}

const updateNote = (id, note) => {
  return fetch(`${baseUrl}/note/${id}`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify({ note })
  })
  .then(getResponseData)
}



//---------***--------NOTE END---------***--------//

const MainApi = {
  setAlarm,
  getAlarms,
  deleteAlarm,
  updateAlarm,
  setAlert,
  getAlerts,
  deleteAlert,
  updateAlert,
  setInvoice,
  getInvoices,
  updateInvoice,
  deleteInvoice,
  setContact,
  getContacts,
  deleteContact,
  updateContact,
  setTaxi,
  getTaxies,
  deleteTaxi,
  updateTaxi,
  setUmbrella,
  getUmbrellas,
  deleteUmbrella,
  updateUmbrella,
  setNote,
  getNote,
  updateNote,
}

export default MainApi;
  