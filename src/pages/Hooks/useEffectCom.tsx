import { useEffect, useState } from "react";
import { Flex, Skeleton } from "antd";
import styles from './hooks.module.scss'
function UseEffectCom() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setCount(c => c + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    return (
        <Flex vertical justify="flex-start" align="center" gap="10px">
            {
                count < 3 ?
                (<Skeleton active />)
                :
                (<>
                <h2>useEffect---{count}</h2>
                <span className={styles.demo_span}>useEffect 是一个 Hook，它允许你在函数组件中执行副作用操作。</span>
                <span className={styles.demo_span}>可以用于数据获取、订阅或手动操作 DOM 等。</span>
                <span className={styles.demo_span}>useEffect 接收两个参数：一个函数和一个依赖数组。</span>
                <span className={styles.demo_span}>当依赖数组中的值发生变化时，useEffect 会重新执行函数。</span>
                <span className={styles.demo_span}>useEffect 的返回值是一个清理函数，用于清理副作用。</span>
                <span className={styles.demo_span}>useEffect 的清理函数会在组件卸载时执行。</span>
                <span className={styles.demo_span}>useEffect 的清理函数可以用于取消订阅、清除定时器等操作。</span>
                <span className={styles.demo_span}>只有当副作用需要“清理”时（比如定时器、订阅、事件监听等），才需要 return 一个函数。</span>
                </>)
            }
        </Flex>
    );
}
export default UseEffectCom;
