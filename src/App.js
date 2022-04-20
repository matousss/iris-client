import './App.css';
import * as Page from './utils/PageEnum';
import MenuContainer from "./components/MenuContainer";
import NewLogin from './components/NewLogin';
import Signup from "./components/Signup";
import Verify from './components/Verify';
import NewMain from "./components/NewMain";

import React, {useEffect, useState} from 'react'
import {getAuthHeader, loadToken, saveToken} from "./utils/AuthUtils";
import {getChannels, getFullProfile, logout} from './utils/RequestUtils'
import {func} from "prop-types";

const WS_PORT = 8000
const WS_URL = 'ws://' + window.location.hostname + ':' + WS_PORT + '/ws/messages'


function App() {
    const [user, setUser] = useState('');
    const [page, setPage] = useState(Page.login);
    const [stayLoggedIn, setStayLoggedIn] = useState(localStorage.getItem('stayLogged') === 'true');
    const [token, setToken] = useState('')
    const [ws, setWebsocket] = useState(null)
    const [loading, setLoading] = useState(true)
    const [channels, setChannels] = useState(null)

    const connect = () => {
        // set loading screen
        let ws = new WebSocket(WS_URL + '?token=' + loadToken())
        ws.onopen = (event) => {
            console.log(event);
            // remove loading screen?
        };
        ws.onclose = () => {
            connect();
        };
        setWebsocket(ws)
    }


    useEffect(() => {
        const storedUser = stayLoggedIn ? localStorage.getItem('user') : sessionStorage.getItem('user');

        if (storedUser !== null) {
            setUser(JSON.parse(storedUser));
            setPage(Page.main);
        }

    }, [])

    useEffect(() => {
        localStorage.setItem('stayLogged', stayLoggedIn.toString());
        console.log(stayLoggedIn);
        console.log(localStorage);
        console.log(sessionStorage);

    }, [stayLoggedIn])

    useEffect(() => {
        let token = loadToken();
        if (token !== null) setToken(token);
    }, [])

    useEffect(() => {
        saveToken(token)
        if (token !== null) {
            fetch('http://127.0.0.1:8000/api/profile/full/current', {
                method: 'GET',
                headers: getAuthHeader(),
            }).then(response => {

                if (response.ok) {
                    response.json().then(data => {
                        setUser(data)
                        setPage(Page.main)
                    })

                }
            }).catch(e => {
                console.error(e)
            })
        }
    }, [token])

    const selectComponent = (page) => {
        switch (page) {
            case Page.login:
                return <NewLogin setUser={setUser}
                                 setPage={setPage}
                                 stayLoggedIn={stayLoggedIn}
                                 setStayLoggedIn={setStayLoggedIn}
                                 setToken={setToken}/>
            case Page.signup:
                return <Signup setUser={setUser}
                               setPage={setPage}
                               stayLoggedIn={stayLoggedIn}
                               setStayLoggedIn={setStayLoggedIn}/>
            case Page.verify:
                return <Verify username={user['username']}
                               setPage={setPage}/>
            default:
                return (<div>Error</div>)
        }
    }

    return (
        page !== Page.main ? <MenuContainer component={selectComponent(page)}/> : <NewMain user={user}
                                                                                           setUser={setUser}
                                                                                           setPage={setPage}
                                                                                           stayLoggedIn={stayLoggedIn}/>
    );
}

export default App;
