import { Navigate } from "react-router-dom";

function PrivateRoute({children}) {
    let token = localStorage.getItem("token")
    
    return (<>
        {token  ? children : <Navigate to="/login" />}
    </> );
}

export default PrivateRoute;