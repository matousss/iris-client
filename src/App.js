import './App.css';
import * as Page from './utils/PageEnum';
import {Login, Signup, Verify, HomeContainer} from "./components/home";

import React, {createContext, useEffect, useState} from 'react'
import {loadToken, saveToken} from "./utils/AuthUtils";
import {getFullProfile} from './utils/requests/DataReq'
import {logout} from './utils/requests/AuthReq'
import Loading from "./components/Loading";
import {getData} from './utils/StorageUtil';
import {loadTheme} from "./utils/ThemesUtils";
import Main from "./components/Main";
import ErrorModal from "./components/ErrorModal";
import {LocalUser} from "./utils/ModelStorage";


export const LoadingContext = createContext([false, null]);

function App() {
    const [user, setUser] = useState(null);
    const [page, setPage] = useState(Page.login);
    const [stayLoggedIn, setStayLoggedIn] = useState(localStorage.getItem('stayLogged') === 'true');
    const [token, setToken] = useState('')
    const [loading, setLoading] = useState(true)
    const [userStorage, setUserStorage] = useState(null)
    const [channelStorage, setChannelStorage] = useState(null)
    const [error, setError] = useState(null);

    const showError = (message, details) => {
        console.error(message);
        setError(React.createElement(ErrorModal, {title: message, isOpen: true}, details))
    }

    const initMain = _token => {
        if (_token !== null) {
            setLoading(true)
            saveToken(_token)
            setToken(_token)
            getFullProfile().then(response => {
                if (response.status === 200) {
                    response.json().then(data => {
                        let localUser = new LocalUser(data)
                        setUser(localUser);
                        getData(data).then(data => {
                            setUserStorage(data.users);
                            setChannelStorage(data.channels);
                            setLoading(false);
                            setPage(Page.main);
                        });

                    })


                } else if (response.status === 401) {
                    setToken(null);
                    setLoading(false);
                }
            }).catch(e => {
                console.error(e);
                setLoading(false);
                showError('Server unreachable', 'Try reloading page');
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
        loadTheme()

        const storedToken = loadToken();
        if (storedToken !== null) {
            initMain(storedToken);
        } else {
            setLoading(false);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('stayLogged', stayLoggedIn.toString());
    }, [stayLoggedIn])

    useEffect(() => {
        saveToken(token)
    }, [token])

    const selectComponent = (page) => {
        switch (page) {
            case Page.login:
                return <Login setUser={setUser}
                              setPage={setPage}
                              stayLoggedIn={stayLoggedIn}
                              setStayLoggedIn={setStayLoggedIn}
                              setLoading={setLoading}
                              initMain={initMain}/>
            case Page.signup:
                return <Signup setUser={setUser}
                               setPage={setPage}
                               stayLoggedIn={stayLoggedIn}
                               setStayLoggedIn={setStayLoggedIn}
                               setLoading={setLoading}
                />
            case Page.verify:
                return <Verify user={user}
                               setPage={setPage}
                               initMain={initMain}
                               setLoading={setLoading}
                />
            default:
                return (<div>Error</div>)
        }
    }

    const clearDesk = () => {
        logout().then(() => {
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
            {loading ? <Loading opacity={.6}/> : ''}
            <><LoadingContext.Provider value={[loading, setLoading]}>
                {(page !== Page.main ? <HomeContainer>{selectComponent(page)}</HomeContainer> :

                        <Main user={user}
                              clearDesk={clearDesk}
                              setPage={setPage}
                              stayLoggedIn={stayLoggedIn}
                              users={userStorage}
                              channels={channelStorage}/>

                )
                }

                {error ? error : ''}
             </LoadingContext.Provider></>

        </>
    );
}

export default App;
