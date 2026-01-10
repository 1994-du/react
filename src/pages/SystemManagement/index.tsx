import { Outlet } from "react-router-dom";
function SystemManagement() {
    return(
        <div className="system_management">
            <h1>System Management</h1>
            <Outlet />
        </div>
    )
}
export default SystemManagement;