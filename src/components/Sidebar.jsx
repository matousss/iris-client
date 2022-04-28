import React, {useEffect, useState} from 'react';
import UserCard from "./UserCard";
import SearchField from "./SearchField";
import UserButton from "./UserButton";
import SignOutButton from "./SignOutButton";
//temp import
import avatar from '../assets/avatar.svg'
import ExpandButton from "./ExpandButton";


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
        <div id='sidebar-container'
             className='sidebar backdrop-blur-sm'
             onTouchStart={e => e.target.dragStart = e.touches[0].clientX}
             onTouchMove={e => handleDrag(e)}>
            <div className={'min-h-[64px] content-center block'}>
                <ExpandButton onClick={toggleExpansion}/>
            </div>
            <div id='sidebar-channels' className={'h-full'}>
                {generateButtons()}
            </div>
            <div className={''}>
                <SignOutButton clearDesk={/*props.clearDesk*/ ()=>{}} expanded={expanded}/>
            </div>
        </div>
    );
}
