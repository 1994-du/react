import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '@/App';
import Home from '../pages/Home';
import FunComponents from '../pages/FunComponents';
import ClsComponents from '../pages/ClsComponents';
import Redux from '../pages/Redux';
import Login from '../pages/Login';
const router = createBrowserRouter([
    {
        path: '/*',
        element: <App />,
        children:[
            {
                path: 'home/*',
                element: <Home />,
                children: [
                    {
                        path: 'FunComponent',
                        element: <FunComponents />,
                    },
                    {
                        path: 'ClsComponent',
                        element: <ClsComponents />,
                    }
                ],
            },
            {
                path:'redux',
                element:<Redux/>
            }
        ]
    },
    {
        path: '/login',
        element: <Login/>,
    }
],
{
    future: {
        v7_relativeSplatPath: true, // 启用新行为
    },
});

export default router;