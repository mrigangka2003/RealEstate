import { useContext, useState } from "react";
import "./chat.scss";
import {AuthContext} from "../../contexts/AuthContext"
import apiRequest from "../../lib/apiRequest";

function Chat({ chats }) {
  const [chat, setChat] = useState(null);
  const {currentUser} = useContext(AuthContext) ;

  const handleOpenChat =async(id , receiver)=>{
    try {
      const res = await apiRequest('/chats' , + id) ;
      setChat(...res.data,receiver) ;

    } catch (error) {
      console.log(error) ;
    }
  }

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chats.map((c) => (
          <div 
          className="message" 
          key={c.id} 
          style={{backgroundColor : c.seenBy.includes(currentUser.id) ? "white " :"#fecd514e" 
          }}
          onClick={()=>handleOpenChat(c.id , c.receiver)}
          >
            <img
              src={c.receiver.avatar || "/NoAvatar.jpg"}
              alt=""
            />
            <span>{c.receiver.username}</span>
            <p>{c.lastMessage}</p>
          </div>
        ))}
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img
                src={chat.receiver.avatar || '/NoAvatar.jpg'}
                alt=""
              />
              {chat.receiver.username}
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="center">
            {
              chat.messages.map((message)=>(
              <div className="chatMessage own" key={message.id}>
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>
              ))
            }
          </div>
          <div className="bottom">
            <textarea></textarea>
            <button>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
