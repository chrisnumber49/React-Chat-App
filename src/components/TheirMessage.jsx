import React from 'react';

function TheirMessage({previousMessage, message}) {
    // to know if this message is the opening message that other user sent
    const isOpeningMessageByUser = !previousMessage || previousMessage.sender.username !== message.sender.username;

    return ( 
        <div className="message-row">
            {/* if it's the opening message that other user sent add the avatar */}
            {isOpeningMessageByUser && (
                <div
                    className="message-avatar"
                    style={{backgroundImage: message.sender && `url(${message.sender.avatar})`}}
                />
            )}

            {/* similar to MyMessage Component, to check if this message is image or text message */}
            {message.attachments && message.attachments.length > 0 ?
            // yes then use image
            (
            <img
                src={message.attachments[0].file}
                alt="message-attachment"
                className="message-image"
                style={{ marginLeft: isOpeningMessageByUser ? '4px' : '48px', float: 'left' }}
            />
            ) :
            // no then normal text
            (
            <div className="message" style={{ float: 'left', backgroundColor: '#D3D3D3', marginLeft: isOpeningMessageByUser ? '4px' : '48px' }}>
                {message.text}
            </div>
            )}
        </div>
     );
}

export default TheirMessage;