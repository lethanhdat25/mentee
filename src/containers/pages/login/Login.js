import React, {useCallback, useEffect, useMemo, useState} from 'react';
import * as yup from 'yup';
import {Formik} from 'formik';
import css from './Login.module.css';
import { useNavigate } from "react-router-dom";
import {login, register} from '../../../store/auth/auth.reducer';
import {useDispatch, useSelector} from 'react-redux';
import Axios from 'axios';

const Login = () => {
    const dispatch = useDispatch();
    const {loading,user, errorCode} = useSelector(state => state.auth);
    const [windowHeight, setWindowHeight] = useState(undefined);
    const navigate = useNavigate();
    const [status,setStatus]= useState("login");

    //get window height
    useEffect(() => {
        function handleResize() {
            setWindowHeight(window.innerHeight);
        }

        handleResize();
        window.addEventListener('resize', handleResize);


        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const style = useMemo(() => ({height: windowHeight}), [windowHeight]);

    const loginNavigate = useCallback(()=>{
        navigate("/home",{replace:true})
    },[navigate])

    //login success
    useEffect(()=>{
        if(user){
            navigate("/home",{replace:true});
        }
    },[user, navigate])

    const handleSubmit = async (data) => {
        if (status === "login"){
            await dispatch(login({data, callback:loginNavigate}));
        }else{
            await dispatch(register({data, callback:loginNavigate}));
        }
    };

    const schema = yup.object().shape(
        {
            userName: yup.string().required(),
            passwordHash: yup.string().required()
        }
    );

    const initialValues = {
        userName: '',
        passwordHash: '',
    };

    const step = useMemo(()=>status==="login"?"LOGIN":"REGISTER",[status]);
    const smallBtn = useMemo(()=>{
        if (status==="login") return <small className={css["btn-signUp"]} onClick={()=>setStatus("register")}>Create your account</small>
        else return <small className={css["btn-signUp"]} onClick={()=>setStatus("login")}>Login with your account</small>
    },[status])

    return (
        <div style={style} className={css.login}>
            <div className={css['login-inner']}>
                <h1>{step}</h1>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values) => handleSubmit(values)}
                    validationSchema={schema}
                >
                    {({values, handleBlur, handleChange, handleSubmit, touched, errors}) => {
                        return (
                            <>
                                {!!loading && (
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                )}
                                {!!errorCode && <div>Email or Password</div>}
                                <form onSubmit={handleSubmit}>
                                    <div className={css['form-inner']}>
                                        <div className={css.control}>
                                            <label htmlFor={'userName'}>Name</label>
                                            <input value={values.userName} type={'text'} id={'userName'}
                                                   name={'userName'}
                                                   onBlur={handleBlur}
                                                   onChange={handleChange}/>
                                            {errors.userName && touched.userName ? <div>{errors.userName}</div> : null}
                                        </div>
                                        <div className={css.control}>
                                            <label htmlFor={'passwordHash'}>Password</label>
                                            <input value={values.passwordHash} type={'passwordHash'} id={'passwordHash'}
                                                   name={'passwordHash'}
                                                   onBlur={handleBlur}
                                                   onChange={handleChange}/>
                                            {errors.passwordHash && touched.passwordHash ? <div>{errors.passwordHash}</div> : null}
                                        </div>
                                        <button type="submit" className="btn btn-primary">{step}</button>
                                        {smallBtn}
                                    </div>
                                </form>
                            </>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default Login;
