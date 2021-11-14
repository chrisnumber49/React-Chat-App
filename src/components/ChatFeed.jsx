import React from 'react';
import MessageForm from './MessageForm';
import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';

function ChatFeed(props) {
    // chats is all of chat room, activeChat is the key of current chat room you select, so chat is the current chat room
    const { chats, activeChat, userName, messages } = props;
    const chat = chats && chats[activeChat];
    
    // function that render all of message
    const renderMessage = () =>{
        // array of key of each message
        const keys = Object.keys(messages);

        return keys.map((key, index)=>{
            // each message
            const message = messages[key];
            // the message before this message
            const previousMessageKey = (index === 0? null: keys[index-1]);
            const isMyMessage = (userName === message.sender.username);

            return(
                <div key={`msg_${index}`} style={{width:'100%'}}>
                    <div className="message-block">
                        {
                            isMyMessage? 
                            <MyMessage message={message}/>: 
                            <TheirMessage message={message} previousMessage={messages[previousMessageKey]}/>
                        }
                    </div>
                    
                    {/* read receipts */}
                    <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px'}}>
                        {renderReadReceipts(message, isMyMessage)}
                    </div>
                </div>
            );
        })
    };


    // for each message we check who has seen 
    const renderReadReceipts = (message, isMyMessage) => {
        // check each person in this chat room
        return chat.people.map((person, index) => {
            // if this person last seen message is exactly this message, we show the avatar of this person down below this message
            return person.last_read === message.id && (
                <div
                key={`read_${index}`}
                className="read-receipt"
                style={{
                    float: isMyMessage ? 'right' : 'left',
                    backgroundImage: person.person.avatar && `url(${person.person.avatar})`
                }}
                />
            )
        });
    }

    
    if (!chat) return 'loading...';
    return ( 
        <div className="chat-feed">
            {/* The block of title on top */}
            <div className="chat-title-container">
                <div className="chat-title">{chat.title}</div>

                {/* subtitle to show user in this chat room */}
                <div className="chat-subtitle">
                    {chat.people.map((person)=>`${person.person.username} `)}
                </div>
            </div>
            
            {/* the messages */}
            {renderMessage()}

            {/* leave a sapec off after messages */}
            <div style={{height:'100px'}}/>

            {/* form for sending message */}
            <div className="message-form-container">
                <MessageForm {...props} activeChat={activeChat}/>
            </div>
        </div>
     );
}

export default ChatFeed;