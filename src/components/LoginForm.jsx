import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // function for submitting
    const submitLogin = async(e) => {
        e.preventDefault();

        // the headers object for Chat Engine API
        const chatRoomObject = {
            'Project-ID':"c9455b74-0c1d-4147-b335-0537ada2d2f6",
            'User-Name': username,
            'User-Secret': password
        };

        try {
            // to check if there is any user and password in this chat project in Chat Engine same as we type
            await axios.get('https://api.chatengine.io/chats', { headers: chatRoomObject });

            // if so we storge user and password into local storge
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            window.location.reload();
            setError('');
            setUsername('');
            setPassword('');
        } catch (error) {
            // if not show this error message
            setError("User doesn't exist.");
            setUsername('');
            setPassword('');
        }
    };

    return ( 
        <div>
            <div style={{position:'fixed', bottom:'10px', right:'10px', color: 'white'}}>
                <p>Try with these 2 user name: Guest1/Guest2</p>
                <p>Both password are the same: 1234</p>
            </div>

            <div className="wrapper">
                <div className="form">
                    <h1 className="title">Login Chat App</h1>
                    
                    {/* the login form */}
                    <form onSubmit={submitLogin}>
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e)=> setUsername(e.target.value)} 
                            className="input" 
                            placeholder="user name..." 
                            required 
                        />

                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e)=> setPassword(e.target.value)} 
                            className="input" 
                            placeholder="password..." 
                            required 
                        />

                        <div align="center">
                            <button className="button" type="submit">
                                <span>Let's Go!</span>
                            </button>
                        </div>

                        <div align="center">
                            <h2>{error}</h2>
                        </div>
                    </form>
                </div>
            </div>
        </div>
     );
}

export default LoginForm;