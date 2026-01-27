import { useEffect, useState} from 'react'
import { queryUserList,deleteUser } from '@/api/systemManagement'
import type { userItem } from '@/types/user'
import { Table, Button, message  } from 'antd'
export default function UserManagement() {
    const [userList, setUserList] = useState<userItem[]>([])
    const handleDetele= (record: userItem) => {
        console.log(record);
        
        deleteUser(record.id).then(res=>{
            console.log('deleteUser',res)
            if(res.data.code === 200){
               message.success('删除成功')
                queryData()
            }
        })
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
            render: (avatar: string) => <img src={`${import.meta.env.VITE_PROXY_URL}${avatar}`} alt="头像" style={{ width: 40, height: 40, borderRadius: '50%' }} />
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (_: unknown, record: userItem) => <div>
                <Button onClick={()=>handleDetele(record)}>删除</Button>
            </div>
        },
    ]
    const queryData = ()=>{
        queryUserList({}).then(res=>{
            console.log('user',res)
            setUserList(res.data.data.list)
        })
    }
    useEffect(()=>{
        queryData()
    },[])
    return(
        <Table dataSource={userList} columns={columns} rowKey="id"></Table>
    )
}