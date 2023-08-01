import { useEffect, useState } from 'react';
import axios from 'axios';
import './index.scss';
import Cookies from 'js-cookie';

import {getLoginUserId, getUserData} from '../../store/transactionSlice'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const dispatch = useDispatch()
  const {loginUserId, userData} = useSelector((state)=>state.transaction)

  useEffect(()=>{
    const token = Cookies.get('BankUserToken')
    if(token !== undefined){
      <Redirect to="/" />
    }
  },[])

  const onSubmitForm = async (event) => {
    event.preventDefault();
    Cookies.remove('BankUserToken')
    const url = `https://bursting-gelding-24.hasura.app/api/rest/get-user-id?email=${email}&password=${password}`;
    const options = {
      url,
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': 'admin',
      },
    };
    try {
      const response = await axios(options);
      const {id} = response.data.get_user_id[0]
      console.log(id)
      dispatch(getLoginUserId(id), getUserData({loginDetails: {email, password}}))
      const token = 'A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar'
      Cookies.set('BankUserToken', token)
      const {history} = props
      history.replace("/")
    } catch (error) {
      console.error(error);
      setErrMsg('An error occurred while processing the request.');
    }
  };
  console.log(loginUserId)

  return (
    <div className='loginPage'>
      <div>
        <form>
          <label htmlFor='email'>Enter Username</label>
          <input type='email' id='email' value={email} onChange={(event) => setEmail(event.target.value)} />
          <label htmlFor='password'>Enter Password</label>
          <input type='password' id='password' value={password} onChange={(event) => setPassword(event.target.value)} />
        </form>
        <button onClick={onSubmitForm}>Submit</button>
        <p className='error'>{errMsg}</p>
      </div>
    </div>
  );
}

export default Login;
