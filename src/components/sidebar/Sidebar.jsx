import React, {useEffect, useState} from 'react';
import ChannelButton from "./ChannelButton";
import {isMobile} from "react-device-detect";
import TopButtons from "./TopButtons";
import {SignOutButton} from "./Buttons";

export default function Sidebar(props) {
    const [expanded, setExpanded] = useState(false)





    const generateButtons = () => Array.from(props.sortedChannels, (channel) => {
            return (<ChannelButton key={channel.id} channel={channel.id} avatar={channel.icon} username={channel.title}
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
            onMouseEnter={() => {
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
            <TopButtons toggleExpansion={toggleExpansion} user={props.user} setSettingsVisible={props.setSettingsVisible}/>
            <li id='sidebar-channels' className={'buttons'}>
                {generateButtons()}

            </li>
            <li>
                <SignOutButton clearDesk={props.clearDesk} expanded={expanded}/>
            </li>
        </ul>
    );
}