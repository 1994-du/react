import { Outlet,useNavigate } from 'react-router-dom';
import styles from './hooks.module.scss'
import { Tabs } from 'antd';
function Hooks() {
    const navigate = useNavigate();
    const tabsItems = [
        {
            label: 'useState',
            key: 'useState',
        },
        {
            label: 'useEffect',
            key: 'useEffect',
        },
        {
            label: 'useContext',
            key: 'useContext',
        },
        {
            label: 'useMemo',
            key: 'useMemo',
        }
    ];
    const custom_hooks_style:React.CSSProperties={
        height:'100%',
        display:'flex',
        flexDirection:'column'
    }
    const hooks_content_style:React.CSSProperties={
        flex:1,
        overflowY:'auto',
        padding:'24px',
        background:'#fff',
        borderRadius:'4px',
        boxShadow:'0 2px 8px rgba(0, 0, 0, 0.1)'
    }
    return (
        <div className="custom_hooks" style={custom_hooks_style}>
            <Tabs
                className={styles.custom_hooks_tabs}
                defaultActiveKey="1"
                centered
                items={tabsItems}
                onChange={(key) => navigate(`/hooks/${key}`)}
            />
            <div style={hooks_content_style}>
                <Outlet />
            </div>
        </div>
    );
};
export default Hooks;