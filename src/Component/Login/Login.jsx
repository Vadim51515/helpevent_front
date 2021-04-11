import React, { useState, useEffect, useCallback } from 'react';
import styles from './Login.module.css'
import Axios from 'axios';
import {
    BrowserRouter as Router,
    Link,
    useHistory,
    NavLink
    } from "react-router-dom";
const Login = (props) => {
    const history = useHistory();
    const handleOnClick = useCallback(() => history.push('/events'), [history]);
    const [login, setLogin] = useState('')
    const [loginErorr, setLoginErorr] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordErorr, setPasswordErorr] = useState(false)
    const [users, setUsers] = useState([])
    useEffect(() => {
        Axios.get('http://localhost:3001/login')
            .then(response => {
                if (response.data !== undefined) {
                    setUsers(response.data);
                }
            })
            const time =  setInterval(timer, 1000);
    }, []);
    const timer =  () => {
        Axios.get('http://localhost:3001/login')
        .then(response => {
            if (response.data !== undefined) {
                setUsers(response.data);
            }
        })
    }
    const auth = () => {
        users.map(e=>{
            if (e.login == login) {
                setLoginErorr(false)
                if (e.password == password) {
                    setLoginErorr(false)
                    localStorage.removeItem('userId');
                    localStorage.setItem('userId', e.id);
                    handleOnClick()
                }
                else{
                    setPasswordErorr(true)
                }
            }
            else{
                setLoginErorr(true)
            }
        })
    }
    return (
    <div className={styles.padding}>
        <div className={styles.login}>
            <h1>Войдите в ваш аккаунт</h1>
            <div className={styles.loginBox} >
                <p style={{ marginBottom: 5, fontSize: 18, fontWeight: 400 }}>Введите ваш логин</p>
                <input onChange={(e => { setLogin((e.target.value)) })} style={{ marginBottom: 10 }} />
                <p style={{ marginBottom: 5, fontSize: 18, fontWeight: 400 }}>Введите ваш пароль</p>
                <input type='password' onChange={(e => { setPassword((e.target.value)) })} />
                {
                    loginErorr || passwordErorr ?
                <p 
                style={{marginBottom: 5, fontSize: 18, fontWeight: 400, color:'red'}}
                >Данные введены не коректно</p>
                :null
                }
                <div style={{ marginTop: 10, marginBottom:10 }}>
                    <button onClick={(e) => { auth() }}>Войти</button>
                </div>
                <NavLink
                    className={styles.aboutUs}
                    activeClassName={styles.active}
                    to='/registration'>
                    Нет аккаунта? Зарегистрируйтесь
                    </NavLink>
            </div>
        </div>
        </div>
    )

}

export default Login

