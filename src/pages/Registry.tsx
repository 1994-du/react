import { useState } from 'react'
import { Input, Button ,message as aMessage} from 'antd';
import '../styles/registry.scss'
import { toRegistry } from '@/api/login';
import { useNavigate } from 'react-router-dom';
export default function Registry() {
    const navigate = useNavigate();
    const [userName,setUserName] = useState('');
    const [passWord,setPassWord] = useState('');
    const handleRegistry = () => {
        toRegistry({username:userName,password:passWord}).then(res=>{
        console.log('注册',res);
        const { code, message } = res.data;
        if(code === 200){
            navigate('/login');
            aMessage.success(message);
        }
        })
  };
  return (
    <div className='registry_content'>
        <Input placeholder="账号" autoComplete='new-username' size="large" value={userName} onChange={(e)=>setUserName(e.target.value)}/>
        <Input.Password placeholder="密码" autoComplete='new-password' size="large" value={passWord} onChange={(e)=>setPassWord(e.target.value)}/>
        <Button type='primary' size="large" onClick={()=>{handleRegistry()}}>注册</Button>
    </div>
  )
}