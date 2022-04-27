import React, {useState} from 'react';
import UserCard from "./UserCard";
import SearchField from "./SearchField";
import UserButton from "./UserButton";
import Signout from "./Signout";
import {isMobile} from "react-device-detect";
import {getMiniProfile} from "../utils/RequestUtils";

//temp import
import avatar from '../assets/avatar.svg'


export default function Sidebar(props) {
    const [visible, setVisible] = useState(false)


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


    return (<div className='h-screen w-16 fixed bg-orange-400 shadow-2xl hover:w-96 sidebar'
                 onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
        <div className='list-none flex flex-col items-center h-full w-full sidebar-container'>
            <div className='w-full mb-2'>
                <UserCard avatar={/*placeholder*/ props.user.avatar} username={props.user.username} visible={visible}/>
            </div>

            <SearchField visible={visible}/>

            <div className='w-full overflow-x-hidden overflow-y-scroll border-y-2 border-gray-700 buttons'>
                {/*<UserButton avatar={avatar} username='Dane' visible={visible} setActiveConversation={props.setActiveConversation}/>
                <UserButton avatar={avatar} username='Chci' visible={visible} setActiveConversation={props.setActiveConversation}/>
                <UserButton avatar={avatar} username='Ti' visible={visible} setActiveConversation={props.setActiveConversation}/>
                <UserButton avatar={avatar} username='Cucat' visible={visible} setActiveConversation={props.setActiveConversation}/>
                <UserButton avatar={avatar} username='Ty Tvoje Plesnivý' visible={visible} setActiveConversation={props.setActiveConversation}/>
                <UserButton avatar={avatar} username='Palce' visible={visible} setActiveConversation={props.setActiveConversation}/>
                <UserButton avatar={avatar} username='U Nohou' visible={visible} setActiveConversation={props.setActiveConversation}/>
                <UserButton avatar={avatar} username='Plsky' visible={visible} setActiveConversation={props.setActiveConversation}/>*/}
                {/*Object.values(props.channels).forEach(element => {
                    const otherUser = element.users[0] === props.user.id ? element.users[1] : element.users[0];
                    const miniProfile = getMiniProfile(otherUser);
                    React.createElement(UserButton, {
                        avatar: {avatar},
                        username: miniProfile.username,
                        visible: {visible},
                        setActiveConversation: props.setActiveConversation
                    });
                })*/}
                {

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
                            return <UserButton key={channel.id} avatar={channel.icon} username={channel.title}
                                               setActiveConversation={props.setActiveConversation} visible={visible}/>
                        }
                    )

                }
            </div>

            <Signout visible={visible} setUser={props.setUser} clearDesk={props.clearDesk}/>
        </div>
    </div>);
}
