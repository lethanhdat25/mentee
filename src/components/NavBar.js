import React from 'react';
import {useDispatch} from 'react-redux';
import {logout} from '../store/auth/auth.reducer';
import {useNavigate} from 'react-router-dom';

const NavBar = () => {

    const dispatch =useDispatch();
    const navigate = useNavigate();
    const handleLogout =()=>{
        dispatch(logout());
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/login",{replace:true});
    }

    return (
        <nav className="navbar navbar-light bg-light justify-content-between" style={{padding: 20}}>
            <a className="navbar-brand">Navbar</a>
            <button type="button" className={`btn btn-warning`} onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default NavBar;
