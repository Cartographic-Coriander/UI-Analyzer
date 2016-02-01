import axios from 'axios';

export function getImage () {
  return axios.get('/api/comment')
}