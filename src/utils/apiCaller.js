import axios from 'axios';
import * as Config from './../constants/Config'
export default function callApi(enpoint, method="get", body){
  return axios({
    method,
    url:`${Config.API_URL}/${enpoint}`,
    data: body
  })
    .catch(err =>{
      console.log(err);
    
  });
}