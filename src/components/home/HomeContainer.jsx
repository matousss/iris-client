import React from 'react'
import {cycleTheme} from "../../utils/ThemesUtils";

export function HomeContainer(props) {
    return (
        <>
            <div className='menu-container h-screen w-screen flex justify-center items-center '>
                <div
                    className='bg-white w-full md:w-2/3 lg:w-1/2 h-5/6 md:h-3/4 m-9 rounded-xl flex flex-col'>
                    <div className={'bg-secondary/90 flex flex-col justify-center items-center m-auto w-full h-full rounded-lg'}>
                        {props.children}
                    </div>
                </div>
            </div>
            <button onClick={e => cycleTheme(!e.shiftKey)} className={'fixed top-0 right-0 group'}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 group-hover:border-1.5 rounded-full" viewBox="0 0 20 20" fill="white">
                    <path fill-rule="evenodd"
                          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                          clip-rule="evenodd"/>
                </svg>
            </button>
        </>
    )
}
