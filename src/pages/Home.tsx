import { useNavigate,Outlet } from "react-router-dom";
import '@/styles/home.module.scss';
import { Button } from "antd";
import GlobalContext from "@/utils/globalContext";
function Home () {
  const navigator = useNavigate();
  return (
    <div className="home">
      <Button onClick={()=>{navigator('/home/FunComponent')}}>函数组件</Button>
      <Button onClick={()=>{navigator('/home/ClsComponent')}}>类组件</Button>
      <GlobalContext.Provider value={
        {
          name:'zhangsan',
          age:18
        }
      }>
        <Outlet/>
      </GlobalContext.Provider>
    </div>
  )
}
export default Home;