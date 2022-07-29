import axios from 'axios';
const version = 'v1';
export default axios.create({
  baseURL: `http://localhost:5000/${version}`,
  headers: {
    'Content-type': 'application/json',
  },
});
