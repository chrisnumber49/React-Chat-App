import { useState } from 'react';
import { SendOutlined, PictureOutlined } from '@ant-design/icons';
import { sendMessage, isTyping } from 'react-chat-engine';

const MessageForm = (props) => {
    const [value, setValue] = useState('');
    // activeChat is the key of current chat room you select, cred represents the current user
    const { activeChat, creds } = props;

    const changeInput = (e) => {
        setValue(e.target.value);

        // from react-chat-engine to show someone is typing
        isTyping(props, activeChat);
    };

    const submitInput = (e) => {
        e.preventDefault();
        // removes the leading and trailing white space from a string
        const text = value.trim();
        if (text.length > 0) {
            // from react-chat-engine to send message to the current chat room in Chat Engine
            sendMessage(creds, activeChat, { text });
        }

        setValue('');
    };

    // function for uploading image
    const uploadImage = (e) => {
        // from react-chat-engine to send message to the current chat room in Chat Engine
        sendMessage(creds, activeChat, { files: e.target.files, text: '' });
    };

    return (
        <form className="message-form" onSubmit={submitInput}>
            <input
                className="message-input"
                placeholder="Send a message..."
                value={value}
                onChange={changeInput}
                onSubmit={submitInput}
            />

            {/* button for uploading image */}
            <label htmlFor="upload-button">
                <span className="image-button">
                    <PictureOutlined className="picture-icon" />
                </span>
            </label>
            <input
                type="file"
                multiple={false}
                id="upload-button"
                style={{ display: 'none' }}
                onChange={uploadImage.bind(this)}
            />
            
            {/* submit button */}
            <button type="submit" className="send-button">
                <SendOutlined className="send-icon" />
            </button>
        </form>
    );
};

export default MessageForm;