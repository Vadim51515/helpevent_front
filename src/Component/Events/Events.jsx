import React, { useState, useEffect, useCallback } from 'react';
import styles from './Events.module.css'
import Axios from 'axios';
import {
    BrowserRouter as Router,
    Link,
    useHistory,
    NavLink
} from "react-router-dom";
const Events = (props) => {
    const [events, setEvents] = useState([])
    const [changeEvent, setChangeEvent] = useState(undefined)
    const [event, setEvent] = useState(undefined)
    const [resources, setResources] = useState(undefined)
    const [changeResource, setChangeResources] = useState(0)
    const [changeResourceBool, setChangeResourcesBool] = useState(false)
    const [addResourceBool, setAddResourceBool] = useState(false)
    const [newResource, setNewResource] = useState({
        name: '',
        price: '',
        quantity: '',
    })
    const [addResourceErorr, setAddResourceErorr] = useState(false)
    const [delResourceBool, setDelResourceBool] = useState(false)
    const [delResource, setDelResource] = useState(0)
    const [addNewEventBool, setAddNewEventBool] = useState(false)
    const [addNewEventError, setAddNewEventError] = useState(false)
    const [newEvent, setNewEvent] = useState('')
    const [changeNameEventBool, setChangeNameEventBool] = useState(false)
    const [changeNameEvent, setChangeNameEvent] = useState('')

    const [delEventBool, setDelEventBool] = useState(false)
    const [delEvent, setDelEvent] = useState()
    const history = useHistory();
    const handleOnClick = useCallback(() => history.push('/login'), [history]);


    useEffect(() => {
        Axios.get('http://localhost:3001/events')
            .then(response => {
                setEvents(response.data.filter(e => e.idUser == localStorage.getItem('userId')))
            })
    }, []);
    useEffect(() => {
        Axios.get('http://localhost:3001/resources')
            .then(response => {
                // console.log(response.data);
                if (event) {
                    setResources(response.data.filter(e => e.idEvent == event.id))
                    // console.log();
                }
            })
    }, [event]);
    const changeEventSave = () => {
        setResources(resources.map(e => {
            if (changeResource.id === e.id) {
                return changeResource
            }
            else {
                return e
            }
        }))
        console.log(changeResource);
        Axios.patch("http://localhost:3001/patch/resources",
            {
                name: changeResource.name,
                price: changeResource.price,
                quantity: changeResource.quantity,
                id: changeResource.id,
            })
    }
    const addNewResource = () => {
        if (newResource.name == '' || newResource.price == '' || newResource.quantity == '') {
            setAddResourceErorr(true)
        }
        else {
            setAddResourceErorr(false)
            Axios.post("http://localhost:3001/newresources",
                {
                    name: newResource.name,
                    price: newResource.price,
                    quantity: newResource.quantity,
                    idEvent: event.id,
                })
            resources.push({
                name: newResource.name,
                price: newResource.price,
                quantity: newResource.quantity,
                idEvent: event.id,
            })
            setAddResourceBool(false)
        }
    }
    const delResourceFun = () => {
        console.log(delResource);
        Axios.delete(`http://localhost:3001/delresources/${delResource.id}`);
        setResources(resources.filter(e => e.id !== delResource.id))
        setDelResourceBool(false)
    }
    const addNewEvent = () => {
        if (newEvent == '') {
            setAddNewEventError(true)
        }
        else {
            setAddNewEventError(false)
            Axios.post("http://localhost:3001/addnewevent",
                {
                    name: newEvent,
                    idUser: localStorage.getItem('userId'),
                })
            Axios.get('http://localhost:3001/events')
                .then(response => {
                    setEvents(response.data.filter(e => e.idUser == localStorage.getItem('userId')))
                })
        }
    }
    return (
        <div className={styles.events}>
            <div className={styles.myEventsMenu}>
                <p>Мои мероприятия</p>
                <hr />
                {events.map(e => (
                    <div>
                        <p onClick={(i) => {
                            setChangeEvent(2)
                            setEvent(e)
                        }}
                            style={{ cursor: 'pointer' }}>{e.name}</p>
                        <hr />
                    </div>
                ))}
                <p className={styles.addEventButton} onClick={(i) => {
                    setAddNewEventBool(true)
                }}>Добавить мероприятие</p>
                <button onClick={()=>{
                     localStorage.setItem('userId', undefined);
                     handleOnClick()
                }} className={styles.exit}>Выйти</button>



            </div>
            <div className={styles.myEvents}>
                {changeEvent
                    ?
                    <div>
                        <div className={styles.nameBox}>
                            {changeNameEventBool
                                ? <input value={changeNameEvent} onChange={(e) => { setChangeNameEvent(e.target.value) }} />
                                : <h3 className={styles.eventName}>{event.name}</h3>
                            }
                            {changeNameEventBool
                                ? <button style={{ marginTop: 10, marginLeft: 'auto' }} onClick={(i) => {
                                    if (changeNameEvent == '') {
                                        alert("Название не может быть пустым")
                                    }
                                    else {
                                        Axios.patch("http://localhost:3001/patch/event",
                                            {
                                                name: changeNameEvent,
                                                id: event.id,
                                            })
                                        setEvents(events.map(e => {
                                            if (e.id === event.id) {
                                                return { ...e, name: changeNameEvent }
                                            }
                                            else {
                                                return e
                                            }
                                        }))
                                        setEvent({ ...event, name: changeNameEvent })
                                        setChangeNameEventBool(false)
                                    }
                                }} className={styles.saveButton}>Сохранить</button>
                                : <button style={{ marginTop: 10, marginLeft: 'auto' }} onClick={(i) => {
                                    setChangeNameEventBool(true)
                                    setChangeNameEvent(event.name)
                                }} className={styles.changeButton}>Изменить</button>
                            }
                            {changeNameEventBool
                                ? <button style={{ marginTop: 10 }} className={styles.delButton} onClick={(i) => {
                                    setChangeNameEvent('')
                                    setChangeNameEventBool(false)
                                }}>Отмена</button>
                                : <button style={{ marginTop: 10 }} className={styles.delButton} onClick={(i) => {
                                    setDelEventBool(true)
                                }}>Удалить</button>
                            }
                        </div>
                        <hr />
                        <div className={styles.designation}>
                            <p style={{ fontWeight: 500 }}>Название</p>
                            <p style={{ fontWeight: 500, marginLeft:30 }}>Количество</p>
                            <p style={{ fontWeight: 500, marginLeft:55}}>Цена</p>
                            <p style={{ fontWeight: 500, marginLeft:90 }}>Сумма</p>
                            <button onClick={(e) => {
                                setAddResourceBool(true)
                            }} className={styles.addResource}>Добавить ресурс</button>
                        </div>
                        <hr />
                        <div className={styles.res}>
                            {resources &&
                                resources.map(e => (
                                    <>
                                        <div className={styles.resource} key={e.id}>
                                            {changeResource && changeResource.id == e.id
                                                ?
                                                <div className={styles.resourceInfo}>
                                                    <input onChange={(e) => {
                                                        setChangeResources({
                                                            ...changeResource,
                                                            name: e.target.value
                                                        })
                                                    }}
                                                        value={changeResource.name} />
                                                    <input  style={{marginLeft:10}} onChange={(e) => {
                                                        setChangeResources({
                                                            ...changeResource,
                                                            quantity: e.target.value
                                                        })
                                                    }} value={changeResource.quantity} />
                                                    <input style={{marginLeft:10}} onChange={(e) => {
                                                        setChangeResources({
                                                            ...changeResource,
                                                            price: e.target.value
                                                        })
                                                    }} value={changeResource.price} />
                                                </div>
                                                :
                                                <div className={styles.resourceInfo}>
                                                    <p style={{ width: 80 }}>{e.name}</p>
                                                    <p>{e.quantity}</p>
                                                    <p>{e.price}</p>
                                                    <p>{Number(e.quantity) * Number(e.price)}</p>
                                                </div>
                                            }
                                            {changeResource && changeResource.id == e.id && changeResourceBool
                                                ? <button onClick={(i) => {
                                                    setChangeResources(undefined)
                                                    setChangeResourcesBool(false)
                                                    changeEventSave()
                                                }} className={styles.saveButton}>Сохранить</button>
                                                : <button onClick={(i) => {
                                                    setChangeResources(e)
                                                    setChangeResourcesBool(true)
                                                }} className={styles.changeButton}>Изменить</button>
                                            }
                                            {changeResource && changeResource.id == e.id && changeResourceBool
                                                ? <button className={styles.delButton} onClick={(i) => {
                                                    setChangeResources(undefined)
                                                    setChangeResourcesBool(false)
                                                }}>Отмена</button>
                                                : <button className={styles.delButton} onClick={(i) => {
                                                    setDelResourceBool(true)
                                                    setDelResource(e)
                                                }}>Удалить</button>
                                            }
                                        </div>
                                        <hr />
                                    </>
                                ))}
                        </div>
                    </div>
                    : <h1 className={styles.dontChouse}>Вы не выбрали мероприятие</h1>
                }

            </div>
            {addResourceBool &&
                <div className={styles.addResourcePopupFon}>
                    <div className={styles.addResourcePopup}>
                        <h3 className={styles.addResourceText}>Добавление нового ресурса</h3>
                        <p>Введите имя ресурса</p>
                        <input className={styles.addResourceInput} onChange={(e) => {
                            setNewResource({
                                ...newResource,
                                name: e.target.value
                            })
                        }} />
                        <p >Введите стоимость ресурса</p>
                        <input className={styles.addResourceInput} onChange={(e) => {
                            setNewResource({
                                ...newResource,
                                price: e.target.value
                            })
                        }} />
                        <p>Введите количество ресурса</p>
                        <input className={styles.addResourceInput} onChange={(e) => {
                            setNewResource({
                                ...newResource,
                                quantity: e.target.value
                            })
                        }} />
                        {addResourceErorr &&
                            <p style={{ color: 'red' }}>Заполните все поля</p>
                        }
                        <hr />

                        <div style={{ display: 'flex' }}>
                            <button className={styles.addResourcePopupAddButton} onClick={(e) => { addNewResource() }}>Добавить</button>
                            <button className={styles.addResourcePopupСancellationButton} onClick={(e) => { setAddResourceBool(false) }}>Отмена</button>
                        </div>
                    </div>
                </div>
            }
            {delResourceBool &&
                <div className={styles.delResourcePopupFon}>
                    <div className={styles.delResourcePopup}>
                        <h3 style={{ width: 'max-content', marginLeft: 'auto', marginRight: 'auto' }}> Удалить ресурс {delResource && delResource.name}?</h3>
                        <div style={{ display: 'flex' }}>
                            <button className={styles.addResourcePopupAddButton} onClick={(e) => {
                                delResourceFun()

                            }} >Да</button>
                            <button className={styles.addResourcePopupСancellationButton} onClick={() => {
                                setDelResourceBool(false)
                            }} >Отмена</button>
                        </div>
                    </div>
                </div>
            }
            {addNewEventBool &&
                <div className={styles.delResourcePopupFon}>
                    <div className={styles.delResourcePopup}>
                        <h3 style={{ width: 'max-content', marginLeft: 'auto', marginRight: 'auto' }}>Создание нового мероприятия</h3>
                        <p>Введите название нового мероприятия</p>
                        <input onChange={(e) => { setNewEvent(e.target.value) }} className={styles.addResourceInput} />
                        {addNewEventError && <p style={{ color: 'red' }}>Вы не ввели название мероприятия</p>}
                        <div style={{ display: 'flex' }}>
                            <button className={styles.addResourcePopupAddButton} onClick={(e) => {
                                addNewEvent();
                                setAddNewEventBool(false);
                            }}>Добавить</button>
                            <button className={styles.addResourcePopupСancellationButton} onClick={(e) => { setAddNewEventBool(false); }}>Отмена</button>
                        </div>
                    </div>
                </div>
            }
            {delEventBool &&
                <div className={styles.delResourcePopupFon}>
                    <div style={{width:500}} className={styles.delResourcePopup}>
                       <h3> Вы хотите удалить мероприятие {event.name}?</h3> 
                       <div style={{ display: 'flex' }}>
                            <button className={styles.addResourcePopupAddButton} onClick={(e) => {
                                Axios.delete(`http://localhost:3001/delevent/${event.id}`);
                                setEvents(events.filter(i => i.id != event.id))
                                setDelEventBool(false)
                                setChangeEvent(undefined)
                            }} >Да</button>
                            <button className={styles.addResourcePopupСancellationButton} onClick={() => {
                               setDelEventBool(false)
                               
                            }} >Отмена</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )

}

export default Events

