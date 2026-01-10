import { useEffect, useState} from 'react'
import { queryUserList } from '@/api/systemManagement'
import type { userItem } from '@/types/user'
import { Table, Button  } from 'antd'
export default function UserManagement() {
    const [userList, setUserList] = useState<userItem[]>([])
    const handleDetele= (record: userItem) => {
        console.log(record)
    }
    const columns = [
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '角色',
            dataIndex: 'roleName',
            key: 'roleName',
        },
        {
            title: '头像',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (text: string) => <img src={text} alt="头像" />
        },
        {
            title: '头像',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (text: string) => <div>
                <Button onClick="{handleDelete}">删除</Button>
            </div>
        },
    ]
    useEffect(()=>{
        queryUserList({}).then(res=>{
            console.log('user',res)
            setUserList(res.data.data)
        })
    },[])
    return(
        <Table dataSource={userList} columns={columns} key="id"></Table>
    )
}