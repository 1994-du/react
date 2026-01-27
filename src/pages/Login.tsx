import { useNavigate } from 'react-router-dom';
import { Button,Input } from 'antd';
import '@/styles/login.scss'
import { toLogin } from '@/api/login';
import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/store/user';

interface LoginResponse {
  data: {
    token: string;
    username: string;
    avatar: string;
    menus: string[];
  };
  code: number;
  msg: string;
}

const Login = ()=>{
    const [userName,setUserName] = useState('');
    const [passWord,setPassWord] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleLogin = () => {
        
        toLogin({
            username: userName,
            password: passWord,
        }).then((res:AxiosResponse<LoginResponse>)=>{
            console.log(res);
            const {code,data,msg} = res.data;
            if(code === 200){
                // Store in Redux
                dispatch(setUserInfo({
                    userInfo: {
                        username: data.username,
                        avatar: data.avatar,
                        token: data.token
                    },
                    menuList: data.menus // Empty menu list for now - will be populated based on actual API response
                }));
                
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