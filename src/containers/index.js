import {Route, Routes} from 'react-router-dom';
import Login from './pages/login/Login';
import Axios from 'axios';
import Home from './pages/Home';
import {useDispatch} from 'react-redux';
import {refreshToken} from '../store/auth/auth.reducer';

const Containers = () => {
    const dispatch = useDispatch();
    Axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
    const rfToken = localStorage.getItem("refreshToken");
    Axios.interceptors.response.use(
        (response)=>response,
        async (error)=>{
            const status = error.response ? error.response.status : null;

            if (status === 401) {
                dispatch(refreshToken({refreshToken:rfToken}))
            }

        },
    );
    return (
        <Routes>
            <Route path={'/home'} element={<Home/>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={"/"}  element={<Login/>}/>
        </Routes>
    );
};
export default Containers;
