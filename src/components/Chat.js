import React, {useState, useRef} from 'react'
import { firestore } from "../firebase";
import { auth } from "../firebase";
import "firebase/firestore";

import { useCollectionData } from 'react-firebase-hooks/firestore';
import style from "../styles/chat.module.css";

const ChatRoom = (props) => {
    const messageRef = firestore.collection('messages');
    const query = messageRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, {idField: 'id'});

    const [formValue, setFormValue] = useState('');

    const handleInputChange = (e) => {
        setFormValue(e.target.value);
    }

    const dummy = useRef();

    const sendMessage = async (e) => {
        e.preventDefault();
        const {uid, photoUrl} = auth.currentUser;
        await messageRef.add({
            text: formValue,
            createdAt: Date.now(),
            uid
        });

        setFormValue('');
        dummy.current.scrollIntoView({behavior: 'smooth'});
    }

    console.log("messages: ", messages);

    return (
        messages ?
        <>
            {
                messages.map((msg) => {
                    return <ChatMessage key={msg.id} message={msg} currentUser={props.currentUser} />
                })
            }
            <div ref={dummy} />
            <div className="messageSendingFormContainer">
                <form onSubmit={sendMessage}>
                    <input value={formValue} onChange={handleInputChange}/>
                    <button type="submit">send</button>
                </form>
            </div>
        </> : <></>
    );
}

const ChatMessage = (props) => {
    const {text, uid} = props.message;
    let messageStyle = uid === props.currentUser ? style.sentMessage : style.receivedMessage;
    return <div className={messageStyle}><p>{text}</p></div>;
}


function Chat(props) {
    return (
        <div>
            <h1 className={style.h1}>{"Chat Room"}</h1>
            <button onClick = {() => {auth.signOut()}}>sign out</button>
            <div className={style.chatContainer} >
                <div className={style.chatRoom} >
                    <h2 className={style.curentUserChatHeader}>{"Current User: " + props.user.displayName}</h2>
                    <ChatRoom currentUser={props.user.uid}/>
                </div>
            </div>
        </div>
    )
}

export default Chat
