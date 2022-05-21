import React, {useEffect, useRef, useState} from 'react';
import SettingsButton from "./SettingsButton";
import EmailSetting from "./EmailSetting";
import PasswordSetting from "./PasswordSetting";
import AvatarSetting from "./AvatarSetting";
import {CustomModal} from "../CustomModal";
import {func} from "prop-types";

export default function SettingsModal(props) {
    const closeModal = () => {
        props.setVisible(false);
    }

    const saveAndClose = () => {
        // TODO save changes
        closeModal();
    }

    const [activeButton, setActiveButton] = useState(0)
    const sections = {
        password: ['Change password', PasswordSetting],
        email: ['Change email', EmailSetting],
        avatar: ['Change avatar', AvatarSetting],
    }

    let resizeTimer;

    function resizeHandler(e) {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(scrollTo, 100, 0);
    }

    useEffect(() => {
        setActiveButton(0)
    }, [props.visible])

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        return () => window.removeEventListener('resize', resizeHandler);
    }, [])

    let scrollPaneRef = useRef(null);
    const scrollTo = height => scrollPaneRef.current.scrollTop = height;
    const scrollToAnchor = anchor => scrollTo(document.getElementById(anchor).offsetTop);

    return (
        <CustomModal isOpen={props.visible} className={'w-full h-full md:w-2/3 md:h-3/4 lg:w-1/2 lg:h-4/5'}>

            <div className={'flex'}>
                <h1 className='text-3xl mb-3'>Settings</h1>
                <div className={'flex w-full justify-end'}>
                    <button className={'h-[80%] group text-ptext/10 hover:text-warning'} onClick={closeModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={"h-full"} fill="none" viewBox="0 0 24 24"
                             stroke="currentColor" strokeWidth={1.4}>
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div className='grow flex h-1/2'>
                <ul className='w-1/3 md:w-1/3 h-full border-r-[1px] border-ptext/20'>
                    <>
                        {Object.keys(sections).map((key, i) =>
                            <li><SettingsButton href={'#' + key} scrollToAnchor={scrollToAnchor}
                                                isActive={activeButton === i}>{sections[key][0]}</SettingsButton>
                            </li>)}</>

                </ul>
                <div ref={scrollPaneRef} className='w-2/3 max-h-fit md:w-3/4 mt-5 relative
                overflow-hidden scroll-smooth duration-[500ms]'
                     onScroll={e => {
                         let scrollTop = e.target.scrollTop;
                         let h = e.target.clientHeight;
                         setActiveButton(Math.round(scrollTop / h))
                     }}>
                    <>
                        {Object.keys(sections).map(key => {
                            let Element = sections[key][1];
                            return <Element id={key}/>;
                        })}</>

                </div>
            </div>


        </CustomModal>
    );
}