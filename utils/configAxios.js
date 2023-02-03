import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.URI : process.env.URI_DEVELOP
})

export default instance
