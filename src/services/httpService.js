import axios from 'axios'; 
import logger from './logService';
import {toast} from 'react-toastify';
//axios.interceptors.response.use(success, error)
//handling unexpected errors globally
axios.interceptors.response.use(null, error => {
    const expectedError =
      error.response && 
      error.response.status >= 400 && 
      error.response.status < 500;
        
  if (!expectedError){ 
    logger.log(error);
    toast.error('An unexpected error occurred.') 
  }
      return Promise.reject(error);
  
    //to pass this to our catch block, we need 2 return a rejected prmoise
  
  });

  export default {
      get: axios.get,
      post: axios.post,
      put: axios.post,
      delete: axios.delete
  }