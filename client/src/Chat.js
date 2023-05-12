import React from 'react';

function Chat() {
  return (
    <div>
      <h1>Chat</h1>
      <div id="chatBox">
        {/* Chat messages will go here... */}
      </div>
      <input type="text" placeholder="Type a message..." />
      <button>Send</button>
    </div>
  );
}

export default Chat;
