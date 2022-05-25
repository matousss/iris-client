import {SearchField} from "./SearchField";
import React, {useContext, useEffect, useState} from "react";
import {searchUser} from "../../utils/requests/DataReq";
import {CustomModal} from "../CustomModal";
import UserResult from "./UserResult";
import image from '../../assets/nobody.png'
import {LoadingContext} from "../../App";
import {UserContext} from "../Main";

export function UserSearch({visible, closeModal, onSelect}) {
    const [result, setResult] = useState(null);
    const [displayed, setDisplayed] = useState("todo not searched")
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useContext(LoadingContext);

    const search = async (keyword) => {
        setLoading(true);
        setMessage('');
        try {
            let result = await searchUser(keyword);
            switch (result.status) {
                case 200:
                    setResult(await result.json())
                    break;
                default:
                    setResult(undefined)
                    setMessage('Unexpected Error')
            }
        } finally {
            setLoading(false)
        }
    }

    const handleSelect = async id => {
        let response = await onSelect(id);
        switch (response.status) {
            case 201:
                closeModal()
                break;
            case 406:
                setMessage('Already chatting with that user!')
                break;
            default:
                setMessage('Unexpected error')
        }
    }

    useEffect(() => setLoading(false), [displayed])

    const user = useContext(UserContext)

    useEffect(() => {
        if (result === undefined) return setDisplayed("Error occured");
        if (result === null) return setDisplayed(null);
        if (result.length === 0) return setDisplayed(null);

        setDisplayed(result.map((v, i) => v.id === user.id ? '' : <UserResult key={i} user={v} onClick={handleSelect}/>))

    }, [result])

    return <CustomModal isOpen={visible} className={'w-full h-full md:w-2/3 md:h-1/2 lg:w-1/2 lg:h-2/5'}>
        <div className={'mx-auto w-full h-full'}>
            <div className={'flex justify-center'}>
                <div className={'w-2/3 mx-auto'}>
                    <SearchField onSearch={search} enabled={!loading} reset={() => setResult(null)}/>
                </div>
                <div className={'flex justify-end'}>
                    <button className={'h-[80%] group text-ptext/10 hover:text-warning'} onClick={closeModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={"h-full"} fill="none" viewBox="0 0 24 24"
                             stroke="currentColor" strokeWidth={1.4}>
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div className={'w-full my-2 text-center font-bold text-lg text-warning'}>
                {message}
            </div>
            <ul className={'w-full h-full max-h-4/5 px-4 flex flex-col ' + (displayed ? 'overflow-auto' : '')}>
                {displayed ? displayed :
                    <img src={image} alt={'.'} className={'rounded-xl object-scale-down max-h-full my-auto'}/>}
            </ul>
        </div>
    </CustomModal>
}