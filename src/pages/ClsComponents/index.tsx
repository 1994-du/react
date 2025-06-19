import { useSelector, useDispatch } from 'react-redux';
import { counterSlice } from '@/store';
import { Button } from 'antd';
import { Component } from 'react';
import GlobalContext from '@/utils/globalContext';
interface ClsComponentState {
    count: number;
    isShow: boolean;
}
interface BoxProps {
    message: string;
    children?: React.ReactNode;
}
class Box extends Component<BoxProps> {
    render() {
        return (
            <div className='box'>
                {this.props.children}
                <h1>{this.props.message}</h1>
            </div>
        )
    }
}

class ClsComponent extends Component<{},ClsComponentState> {
    constructor(props: any) {
        super(props);
        this.state = {
            count: 0,
            isShow: false,
        };
    }

    handleIncrement = () => {
        this.setState({
            count: this.state.count + 1,
        })
    };

    handleDecrement = () => {
        this.setState({
            count: this.state.count - 1,
        })
    };

    render() {
        return (
            <GlobalContext.Consumer>
                {
                    (context)=>{
                        if(!context){
                            return <div>loading...</div>
                        }
                        return(
                            <div>
                                <h1>Class Component</h1>
                                <h1>Count:{this.state.count}</h1>
                                <Button onClick={this.handleIncrement}>加</Button>
                                <Button onClick={this.handleDecrement}>减</Button>
                                <h1>父组件传过来的值：{context?.name}</h1>
                                <hr />
                                <Button onClick={()=>{
                                    this.setState({
                                        isShow: !this.state.isShow,
                                    })
                                }}>显示插槽</Button>
                                {this.state.isShow && <Box message={context?.name}>
                                    <div>插槽</div>
                                </Box>}
                            </div>
                        )
                    }
                }
            </GlobalContext.Consumer>
            
        );
    }
}
export default ClsComponent;