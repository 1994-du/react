import { useSelector,useDispatch } from "react-redux";
import { counterSlice,userSlice } from '@/store';
import './index.scss'
import { Button,Input } from "antd";
import React, { useState } from "react";
console.log('counterSlice', counterSlice);

function Redux() {
  const dispatch = useDispatch();
  const value:any = useSelector((state) => state);
  const [newAge, setNewAge] = useState<number>(0);
  return (
    <div className="redux_wrap">
      {/* <h1>Redux</h1> */}
      <pre>{JSON.stringify(value, null, 2)}</pre>
      <pre>{`<Button onClick={() => dispatch({ type: 'counter/increment' })}>修改counter</Button>`}</pre>
      <Button onClick={() => dispatch({ type: 'counter/increment' })}>修改counter</Button>
      <pre>{`<Button onClick={() => dispatch(counterSlice.actions.increment())}>修改counter</Button>`}</pre>
      <Button onClick={() => dispatch(counterSlice.actions.increment())}>修改counter</Button>
      <pre>{`<Button onClick={() => dispatch(userSlice.actions.setAge(Number(newAge)))}>修改age</Button>`}</pre>
      <Input value={newAge} type="number" onChange={(e)=>setNewAge(Number(e.target.value))}></Input>
      <Button onClick={() => dispatch(userSlice.actions.setAge(Number(newAge)))}>修改age</Button>
    </div>
  );
}
export default Redux;