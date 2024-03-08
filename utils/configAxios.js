import axios from 'axios'

const instance = (baseURL) => axios.create({
  baseURL
})

export default instance
