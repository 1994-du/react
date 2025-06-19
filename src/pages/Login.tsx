import { useNavigate } from 'react-router-dom';

const Login = ()=>{
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/home');
    };



    return(
        <div>
            <h1>Login</h1>
            <button onClick={()=>{handleLogin()}}>登录</button>
        </div>
    )
}
export default Login;