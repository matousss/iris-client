import React, {useEffect, useState} from 'react';
import ChannelButton from "./ChannelButton";
//temp import
import avatar from '../assets/avatar.svg'
import {isMobile} from "react-device-detect";
import SidebarTop from "./SidebarTop";
import {SignOutButton} from "./Buttons";

export default function Sidebar(props) {
    const [expanded, setExpanded] = useState(false)

    const sort = (a, b) => {
        if (a.messages === null || b.messages === null || a.messages.length === 0 || b.messages.length === 0) return -1;
        let aMessage = a.messages[0]
        let bMessage = b.messages[0]

        return (bMessage.creation.getTime() - aMessage.creation.getTime())

    }

    const sortedChannels = Array.from(props.storage.channels.values()).sort((a, b) => sort(a, b))

    const generateButtons = () => Array.from(sortedChannels, (channel, i) => {
            return (<ChannelButton key={i} channel={channel.id} avatar={channel.icon} username={channel.title}
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
    //         elements.push(<ChannelButton
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
