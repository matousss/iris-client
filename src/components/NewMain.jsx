import React, {useEffect, useState} from 'react';
import Sidebar from "./Sidebar";
import MessagePanel from "./MessagePanel";

export default function NewMain(props) {
    const [activeConversation, setActiveConversation] = useState('');

    return (
        <div className='h-screen'>
            <Sidebar user={props.user} setUser={props.setUser} clearDesk={props.clearDesk} setActiveConversation={setActiveConversation} channels={props.channels}/>
            <MessagePanel user={props.user} activeConversation={activeConversation} setActiveConversation={setActiveConversation}/>
        </div>
    );
}


//
// class NewMain extends React.Component {
//     #ws;
//     state = {activeConversation: ""}
//
//     constructor(props, context) {
//         super(props, context);
//         this.connect()
//     }
//
//
//     connect() {
//         // set loading screen
//         let ws = new WebSocket(WS_URL + '?token=' + loadToken())
//         ws.onopen = (event) => {
//             console.log(event);
//             // remove loading screen?
//         };
//         ws.onclose = () => {
//             this.connect();
//         };
//
//         this.#ws = ws;
//     }
//
//
//     setActiveConversation = (conversation) => {
//         if (this.state.activeConversation === conversation) return
//         console.log(conversation)
//         this.setState({activeConversation: conversation})
//     }
//
//
//     render() {
//         let props = this.props;
//         return (
//             <div className='h-screen'>
//                 <Sidebar user={props.user} setUser={props.setUser} setActiveConversation={this.setActiveConversation}
//                          setPage={props.setPage}/>
//                 <MessagePanel user={props.user} activeConversation={() => this.activeConversation}
//                               setActiveConversation={this.setActiveConversation}/>
//             </div>
//         );
//
//     }
// }
//
//
// export default NewMain
