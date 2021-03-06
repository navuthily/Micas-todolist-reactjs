import axios from 'axios';
import * as Config from '../constants/config'
export default function callApi(enpoint, method, body){
  return axios({
    method,
    url:`${Config.API_URL}/${enpoint}`,
    data: body
  })
    .catch(err =>{
      console.log(err);
  });
}