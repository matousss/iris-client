import React, {useEffect, useState} from 'react';
import UserCard from "./UserCard";
import SearchField from "./SearchField";
import UserButton from "./Buttons/UserButton";
import SignOutButton from "./Buttons/SignOutButton";
//temp import
import avatar from '../assets/avatar.svg'
import ExpandButton from "./ExpandButton";
import {isMobile} from "react-device-detect";
import SidebarButton from "./Buttons/SidebarButton";
import SettingsButton from "./Buttons/SettingsButton";
import ThemeButton from "./Buttons/ThemeButton";
import SidebarTop from "./SidebarTop";

export default function Sidebar(props) {
    const [expanded, setExpanded] = useState(false)


    const generateButtons = () =>
        Array.from(Array.from(props.storage.channels.values()).sort((a, b) => {
                if (a.messages === null || b.messages === null || a.messages.length() === 0 || b.messages.length() === 0) return 1;
                let aMessage = a.messages[a.messages.length() - 1]
                let bMessage = b.messages[b.messages.length() - 1]

                console.log(a)
                if (aMessage.creation < bMessage.creation) {
                    return -1;
                }
                if (aMessage.creation > bMessage.creation) {
                    return 1;
                }
                return 0;
            }),
            (channel) => {
                return (<UserButton key={channel.id} avatar={channel.icon} username={channel.title}
                                    setActiveConversation={props.setActiveConversation}
                                    visible={expanded}/>)
            }
        )


    useEffect(() => {
        let sbContainer = document.getElementById('sidebar-container');
        if (expanded) sbContainer.classList.add('sidebar-expanded')
        else sbContainer.classList.remove('sidebar-expanded');

    }, [expanded])

    // const showChannels = () => {
    //     let elements = []
    //     props.channels.forEach(val => {
    //         console.log(val)
    //         switch (val['type']) {
    //             case 'directchannel':
    //                 initDirectChannel(val).then(e => elements.push(e))
    //                 break;
    //             case 'groupchannel':
    //                 initGroupChannel(val).then(e => elements.push(e))
    //                 break;
    //             default:
    //
    //
    //         }
    //
    //         elements.push(<UserButton
    //             avatar={val['avatar']}
    //             username={val['username']}
    //             setActiveConversation={props.setActiveConversation}/>)
    //     })
    //     return elements
    // }

    const handleDrag = e => {
        let x = e.touches[0].clientX
        let startX = e.target.dragStart;
        let n = x - startX;
        if (n > 100) setExpanded(true)
        if (n < -100) setExpanded(false)
    }

    const toggleExpansion = () => {
        setExpanded(!expanded)
    };

    return (
        <ul id='sidebar-container'
            className={'sidebar'}
            onTouchStart={e => e.target.dragStart = e.touches[0].clientX}
            onTouchMove={e => handleDrag(e)}
            onMouseEnter={e => {
                if (!isMobile) setExpanded(true)
            }}
            onMouseLeave={() => {
                if (!isMobile) setExpanded(false)
            }}

        >
            {/*idk why, but only way to fix height*/}
            {/*<li className={"pb-[80px]"} style={{height: "80px"}}>
                <UserCard/>
            </li>*/}
            <SidebarTop toggleExpansion={toggleExpansion}/>
            <li id='sidebar-channels' className={'buttons'}>
                {generateButtons()}

            </li>
            <li>
                <SignOutButton clearDesk={props.clearDesk} expanded={expanded}/>
            </li>
        </ul>
    );
}
