import './App.css';
import * as Page from './utils/PageEnum';
import MenuContainer from "./components/MenuContainer";
import NewLogin from './components/NewLogin';
import Signup from "./components/Signup";
import Verify from './components/Verify';
import NewMain from "./components/NewMain";

import React, {useEffect, useState} from 'react'
import {loadToken, saveToken} from "./utils/AuthUtils";
import {getChannels, getFullProfile, getMiniProfile, logout} from './utils/RequestUtils'
import {func} from "prop-types";
import Loading from "./components/Loading";
import {getData, parseChannels} from './utils/StorageUtil';
import {Channel, ModelStorage, User} from "./utils/ModelStorage";

const WS_PORT = 8000
const WS_URL = 'ws://' + window.location.hostname + ':' + WS_PORT + '/ws/messages'


function App() {
    const [user, setUser] = useState('');
    const [page, setPage] = useState(Page.login);
    const [stayLoggedIn, setStayLoggedIn] = useState(localStorage.getItem('stayLogged') === 'true');
    const [token, setToken] = useState('')
    const [ws, setWebsocket] = useState(null)
    const [loading, setLoading] = useState(true)
    const [userStorage, setUserStorage] = useState(null)
    const [channelStorage, setChannelStorage] = useState(null)
    const [messageStorage, setMessageStorage] = useState(null)


    const connect = () => {
        // set loading screen
        let ws = new WebSocket(WS_URL + '?token=' + token)
        ws.onopen = (event) => {
            console.log(event);
            // remove loading screen?
        };
        ws.onclose = () => {
            connect();
        };
        setWebsocket(ws)
    }





    const initMain = _token => {
        if (_token !== null) {
            console.log("fokin main")
            saveToken(_token)
            setToken(_token)
            getFullProfile().then(response => {
                if (response.status === 200) {
                    response.json().then(data => {
                        setUser(data);
                        getData(data.user).then(data => {
                            setUserStorage(data.users)
                            setChannelStorage(data.channels)
                            setLoading(false);
                            setPage(Page.main)

                        });

                    })


                } else if (response.status === 401) {
                    setToken(null)
                }
            }).catch(e => {
                console.error(e)
            })
        }
    }


    useEffect(() => {
        // const storedUser = stayLoggedIn ? localStorage.getItem('user') : sessionStorage.getItem('user');
        //
        // if (storedUser !== null) {
        //     setUser(JSON.parse(storedUser));
        //     //setPage(Page.main);
        // }

        const storedToken = loadToken();
        if (storedToken !== null) {
            initMain(storedToken);
        } else {
            setLoading(false);
        }

    }, [])

    useEffect(() => {
        localStorage.setItem('stayLogged', stayLoggedIn.toString());
        console.log(stayLoggedIn);
        console.log(localStorage);
        console.log(sessionStorage);

    }, [stayLoggedIn])

    useEffect(() => {
        saveToken(token)
    }, [token])


    const selectComponent = (page) => {
        switch (page) {
            case Page.login:
                return <NewLogin setUser={setUser}
                                 setPage={setPage}
                                 stayLoggedIn={stayLoggedIn}
                                 setStayLoggedIn={setStayLoggedIn}
                                 initMain={initMain}/>
            case Page.signup:
                return <Signup setUser={setUser}
                               setPage={setPage}
                               stayLoggedIn={stayLoggedIn}
                               setStayLoggedIn={setStayLoggedIn}
                />
            case Page.verify:
                return <Verify username={user['username']}
                               setPage={setPage}
                               initMain={initMain}/>
            default:
                return (<div>Error</div>)
        }
    }

    const clearDesk = () => {
        logout().then(response => {
        })
        setPage(Page.login)
        setUser(null);
        (stayLoggedIn ? localStorage : sessionStorage).removeItem('user');
        setToken(null)
        setUserStorage(null)
        setChannelStorage(null)

    }
    //
    // const loadChannels = () => {
    //     if (sessionStorage.getItem('channels') !== null) {
    //         setChannels(parseChannels())
    //     }
    //     //fetch
    //     getChannels().then(response => {
    //         response.json().then(data => {
    //             sessionStorage.setItem('channels', JSON.stringify(data));
    //             setChannels(data);
    //         });
    //     })
    // }


    return (
        <>
            {loading ? <Loading opacity={.6}/> :
                (page !== Page.main ? <MenuContainer component={selectComponent(page)}/> : <NewMain user={user}
                                                                                                    setUser={setUser}
                                                                                                    clearDesk={clearDesk}
                                                                                                    setPage={setPage}
                                                                                                    stayLoggedIn={stayLoggedIn}
                                                                                                    storage={
                                                                                                        {
                                                                                                            users: userStorage,
                                                                                                            channels: channelStorage
                                                                                                        }
                                                                                                    }/>
                )
            }

        </>
    );
}

export default App;
