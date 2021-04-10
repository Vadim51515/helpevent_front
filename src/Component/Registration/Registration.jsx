import React, { useState, useEffect, useCallback } from 'react';
import styles from './Registration.module.css'
import Axios from 'axios';
import {
    BrowserRouter as Router,
    Link,
    useHistory
    } from "react-router-dom";
const Registration = (props) => {
    const history = useHistory();
    const handleOnClick = useCallback(() => history.push('/login'), [history]);
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [doublePassword, setDoublePassword] = useState('')
    const [passwordErorr, setPasswordErorr] = useState(false)
    const [users, setUsers] = useState([])
    useEffect(() => {
        Axios.get('http://localhost:3001/')
            .then(response => {
                if (response.data !== undefined) {
                    setUsers(response.data);
                }
            })
    }, []);

    const auth = () => {
        if (password === doublePassword) {
            setPasswordErorr(false)
            alert ('Вы успешно зарегестрировались')
            Axios.post("http://localhost:3001/registration",
            {
                login: login,
                password: password,
            }) 
            handleOnClick()    
        }
        else{
            setPasswordErorr(true)
        }
    }
    return (
        <div className={styles.padding}>
        <div className={styles.registration}>
            <h1>Регистрация</h1>
            <div className={styles.registrationBox} >
                <p style={{ marginBottom: 5, fontSize: 18, fontWeight: 400 }}>Введите ваш логин</p>
                <input onChange={(e => { setLogin((e.target.value)) })} style={{ marginBottom: 10 }} />
                <p style={{ marginBottom: 5, fontSize: 18, fontWeight: 400 }}>Введите ваш пароль</p>
                <input  style={{ marginBottom: 10 }} type='password' onChange={(e => { setPassword((e.target.value)) })} />
                <p style={{ marginBottom: 5, fontSize: 18, fontWeight: 400 }}>Повторите пароль</p>
                <input type='password' onChange={(e => { setDoublePassword((e.target.value)) })} />
                {passwordErorr && <p>Пароли не совпадают</p>}
                <div style={{ marginTop: 10 }}>
                    <button onClick={(e) => { auth() }}>Зарегистрироваться</button>
                </div>
            </div>
        </div>
        </div>
    )

}

export default Registration

