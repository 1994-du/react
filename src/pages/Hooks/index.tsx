import { Outlet,useNavigate } from 'react-router-dom';
import { Button } from 'antd';
function Hooks() {
    const navigate = useNavigate();
    function handleClick(type:string){
        console.log(type);
        navigate(`/hooks/${type}`);
    }
    return (
        <div className="custom_hooks">
            <h1>常用的 Hook</h1>
            <Button type="primary" onClick={() => handleClick('useState')}>useState</Button>
            <Button type="primary" onClick={() => handleClick('useEffect')}>useEffect</Button>
            <Button type="primary" onClick={() => handleClick('useContext')}>useContext</Button>
            <Button type="primary" onClick={() => handleClick('useMemo')}>useMemo</Button>
            <div>
                <Outlet/>
            </div>
        </div>
    );
};
export default Hooks;