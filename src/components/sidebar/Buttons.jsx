import React, {useEffect} from "react";
import {cycleTheme} from "../../utils/ThemesUtils";
import {getAvatar} from "./ChannelCard";


function SidebarButton(props) {
    return (
        <button onClick={e => props.onClick(e)}
                className={'w-full hover:bg-white/20 group ' + (props.height ? 'h-[' + props.height + ']' : 'h-full ') + props.className}>
            {props.children}
        </button>
    )
}


function DummyButton({avatar, username}) {
    return (
        <SidebarButton onClick={() => {
        }} className={'inline hover:bg-white/0 cursor-not-allowed'}>
            {/*{avatar ? <img src={avatar}/> : 'ne'}*/}
            <div className={'m-auto w-max border-text-1/50 border-[3px] border-dashed rounded-full'}>
                {getAvatar(username, avatar)}
            </div>
        </SidebarButton>
    )
}

function SettingsButton() {

    return (
        <SidebarButton onClick={() => console.log("open settings")}
                       className={'inline'}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-sidebar m-auto group-hover:animate-spin-slow"
                 viewBox="0 0 20 20"
                 fill="currentColor">
                <path fillRule="evenodd"
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"/>
            </svg>
        </SidebarButton>
    )
}

function ThemeButton() {

    return (
        <SidebarButton onClick={e => cycleTheme(!e.shiftKey)}
                       className={'w-sidebar inline'}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-sidebar group-hover:animate-pulse-fast"
                 viewBox="0 0 20 20"
                 fill="currentColor">
                <path fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"/>
            </svg>
        </SidebarButton>
    )
}

function SignOutButton(props) {
    function signOut() {
        props.clearDesk();
    }

    useEffect(() => {

    }, [props.expanded])

    return (
        <SidebarButton onClick={() => signOut()}
                       className={'justify-self-end flex items-left row align-left w-full'}>
            <div className={"w-sidebar my-auto group-hover:animate-shake"}>
                <svg xmlns="http://www.w3.org/2000/svg"
                     className={"h-10 mx-auto ml-[1.1rem] "}
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
            </div>
            <div
                className={
                    'on-expand text-xl my-auto 0 inline'}>
                <nobr>
                    Sign Out
                </nobr>
            </div>
        </SidebarButton>
    );
}

function ExpandButton({onClick}) {

    return (
        <SidebarButton onClick={() => onClick()}
                       className={'w-sidebar inline'}>
            <svg xmlns="http://www.w3.org/2000/svg"
                 className={"h-8 w-full rotate duration-[250ms]"}
                 fill="none"
                 viewBox="0 0 24 24"
                 stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
        </SidebarButton>
    )
}

export {SidebarButton, DummyButton, SettingsButton, ThemeButton, SignOutButton, ExpandButton}
