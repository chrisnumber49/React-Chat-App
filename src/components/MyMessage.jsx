import React from 'react';

function MyMessage({message}) {
    // to check if this message is image or text message
    if(message?.attachments?.length > 0){
        // if its an image
        return (
            <img 
                src={message.attachments[0].file}
                alt="Image message"
                className="message-image"
                style={{float: 'right'}}
            />
        );
    };

    // if not then use normal text
    return ( 
        <div className="message" style={{float:'right', marginRight:'18px', color:'white', backgroundColor:'#4682B4'}}>
            {message.text}
        </div>
     );
}

export default MyMessage;