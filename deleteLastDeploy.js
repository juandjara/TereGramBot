// this script requires a `.env` file with a `NOW_TOKEN` to work

require('dotenv').config()
const pkg = require('./package.json')
const axios = require('axios').create({
  baseURL: "https://api.zeit.co/now",
  headers: {
    Authorization: `Bearer ${process.env.NOW_TOKEN}`
  }
})

axios.get('/deployments')
  .then(res => res.data)
  .then(data => data.deployments.filter(d => d.name === pkg.name))
  .then(botDeploys => botDeploys.slice(-1)[0])
  .then(lastDeploy => axios.delete(`/deployments/${lastDeploy.uid}`))
  .then(res => res.data)
  .then(console.log)
  .catch(err => console.error(err.response.data))
