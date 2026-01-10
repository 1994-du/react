import { useNavigate } from 'react-router-dom';
import { Button,Input } from 'antd';
import '@/styles/login.scss'
import { toLogin } from '@/api/login';
import { useState } from 'react';
import { AxiosResponse } from 'axios';

interface LoginResponse {
  data: {
    token: string;
    username: string;
    userId: number;
  };
  code: number;
  msg: string;
}

const Login = ()=>{
    const [userName,setUserName] = useState('');
    const [passWord,setPassWord] = useState('');
    const navigate = useNavigate();
    const handleLogin = () => {
        
        toLogin({
            username: userName,
            password: passWord,
        }).then((res:AxiosResponse<LoginResponse>)=>{
            console.log(res);
            const {code,data,msg} = res.data;
            if(code === 200){
                sessionStorage.setItem('username',data.username)
                sessionStorage.setItem('isLogin',true+'')
                navigate('/home');
            }else{
                alert(msg);
            }
        })
    };
    return(
        <div className='login_content'>
            <Input placeholder="账号" autoComplete='new-username' size="large" value={userName} onChange={(e)=>setUserName(e.target.value)}/>
            <Input.Password placeholder="密码" autoComplete='new-password' size="large" value={passWord} onChange={(e)=>setPassWord(e.target.value)}/>
            <Button type='primary' size="large" onClick={()=>{handleLogin()}}>登录</Button>
        </div>
    )
}
export default Login;