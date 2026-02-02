import { useEffect, useState} from 'react'
import { queryUserList,deleteUser } from '@/api/systemManagement'
import type { userItem } from '@/types/user'
import { Table, Button, message, Drawer } from 'antd'
export default function UserManagement() {
    const [userList, setUserList] = useState<userItem[]>([])
    const handleDetele= (record: userItem) => {
        console.log(record);
        // 确认删除
        if(!window.confirm('确认删除吗？')){
            return;
        }
        deleteUser(record.id).then(res=>{
            console.log('deleteUser',res)
            if(res.data.code === 200){
               message.success('删除成功')
                queryData()
            }
        })
    }
    const [open, setOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<userItem>({} as userItem)
    const handleEdit = (record: userItem) => {
        setCurrentUser(record)
        setOpen(true);
    }
    const onClose = ()=>{
        setOpen(false);
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
                <Button type='text'  onClick={()=>handleDetele(record)}>删除</Button>
                <Button type='text'  onClick={()=>handleEdit(record)}>编辑</Button>
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
        <div>
        <Table dataSource={userList} columns={columns} rowKey="id"></Table>
        <Drawer
            title="编辑用户信息"
            closable={{ 'aria-label': 'Close Button' }}
            onClose={onClose}
            open={open}>
            <div>
                <p>用户名：{currentUser.username}</p>
                <p>角色：{currentUser.roleName}</p>
                <p>头像：<img src={`${import.meta.env.VITE_PROXY_URL}${currentUser.avatar}`} alt="头像" style={{ width: 40, height: 40, borderRadius: '50%' }} /></p>
            </div>
        </Drawer>
      </div>
    )
}