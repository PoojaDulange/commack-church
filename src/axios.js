import axios from 'axios'

const demo = axios.create({
  baseURL: 'https://sstchrchapidev.azurewebsites.net/',
})

export default demo
