import React from 'react';
import './App.css';
import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './components/ChatFeed'
import LoginForm from './components/LoginForm';

// this chat app is using Chat Engine API (https://chatengine.io/)

function App() {
  // log out function
  const logOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  // if we don't find any username in local storage we login
  if (!localStorage.getItem('username')) return <LoginForm />;

  return (
    <div className="App">
      {/* chat engine api */}
      <ChatEngine
        height="100vh"
        projectID="c9455b74-0c1d-4147-b335-0537ada2d2f6"
        // get user name and password from local storge and log in automatically
        userName={localStorage.getItem('username')}
        userSecret={localStorage.getItem('password')}
        renderChatFeed={(chatProps) => <ChatFeed {...chatProps} />}
      />

      <button onClick={logOut}
        style={{
            backgroundColor: 'LightGray', 
            border: 'none', 
            borderRadius: '15px',
            padding: '15px',
            cursor: 'pointer',
            textAlign: 'center',
            position: 'fixed',
            bottom: '20px',
            right: '20px'
      }}>
        Log Out
      </button>
    </div>
  );
}

export default App;
