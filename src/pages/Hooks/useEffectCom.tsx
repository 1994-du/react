import { useEffect, useState } from "react";
import { Skeleton } from "antd";
function UseEffectCom() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setCount(c => c + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    return (
        <div>
            {
                count < 3 ?
                (<Skeleton active />)
                :
                (<>
                <h2>useEffect---{count}</h2>
                <p>useEffect 是一个 Hook，它允许你在函数组件中执行副作用操作。</p>
                <p>它可以用于数据获取、订阅或手动操作 DOM 等。</p>
                <p>useEffect 接收两个参数：一个函数和一个依赖数组。</p>
                <p>当依赖数组中的值发生变化时，useEffect 会重新执行函数。</p>
                <p>useEffect 的返回值是一个清理函数，用于清理副作用。</p>
                <p>useEffect 的清理函数会在组件卸载时执行。</p>
                <p>useEffect 的清理函数可以用于取消订阅、清除定时器等操作。</p>
                <p>只有当副作用需要“清理”时（比如定时器、订阅、事件监听等），才需要 return 一个函数。</p>
                </>)
            }
        </div>
    );
}
export default UseEffectCom;
