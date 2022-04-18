import './App.css';
import * as Page from './utils/PageEnum';
import MenuContainer from "./components/MenuContainer";
import NewLogin from './components/NewLogin';
import Signup from "./components/Signup";
import Verify from './components/Verify';
import NewMain from "./components/NewMain";

import React, {useEffect, useState} from 'react'
import {getAuthHeader, loadToken} from "./utils/AuthUtils";

function App() {
    const [user, setUser] = useState('');
    const [page, setPage] = useState(Page.login);
    const [stayLoggedIn, setStayLoggedIn] = useState(localStorage.getItem('stayLogged') === 'true');

    useEffect(() => {
        const storedUser = stayLoggedIn ? localStorage.getItem('user') : sessionStorage.getItem('user');

        if (storedUser !== null){
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

    const selectComponent = (page) => {
        switch (page) {
            case Page.login:
                return <NewLogin setUser={setUser}
                                 setPage={setPage}
                                 stayLoggedIn={stayLoggedIn}
                                 setStayLoggedIn={setStayLoggedIn}/>
            case Page.signup:
                return <Signup setUser={setUser}
                               setPage={setPage}
                               stayLoggedIn={stayLoggedIn}
                               setStayLoggedIn={setStayLoggedIn}/>
            case Page.verify:
                return <Verify username={user['username']}
                               setPage={setPage}/>
        }
    }
    if (loadToken() != null) {
        fetch('http://127.0.0.1:8000/api/auth/check', {
            method: 'GET',
            headers: getAuthHeader(),
        }).then(response => {
            if (response.ok) setPage(Page.main)
        }).catch(e => {
            console.error(e)
        })
    }

    return (
        page !== Page.main ? <MenuContainer component={selectComponent(page)}/> : <NewMain user={user}
                                                                                           setUser={setUser}
                                                                                           setPage={setPage}
                                                                                           stayLoggedIn={stayLoggedIn}/>
    );
}

export default App;
