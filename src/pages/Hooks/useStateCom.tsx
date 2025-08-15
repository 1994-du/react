function UseStateCom() {
    return (
        <div>
            <h2>useState</h2>
            <p>useState 是一个 Hook，它允许你在函数组件中添加状态。</p>
            <p>const [count, setCount] = useState(0);</p>
            <p>通过调用 setCount 来更新状态。</p>
            <p>setCount(count + 1);</p>
        </div>
    );
}
export default UseStateCom;