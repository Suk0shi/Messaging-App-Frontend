import Head from "../components/Head";
import "../styles/Chat.css"
import { useEffect, useState, useRef } from "react";



function Chat() {

    const [message, setmessage] = useState()
    const [friends, setFriends] = useState([]);
    const [messages, setMessages] = useState([]);
    const [addFriendForm, setAddFriendForm] = useState(false);
    const [loginRequired, setLoginRequired] = useState(false);
    const [thisUser, setThisUser] = useState();
    const [selectedFriend, setSelectedFriend] = useState();
    const [update, setUpdate] = useState();
    const [inputValue, setInputValue] = useState('');

    const scrollableDivRef = useRef(null);

    useEffect(() => {
      // Scroll to the bottom of the div on component mount
      if (scrollableDivRef.current) {
        scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
      }
    }, [messages]);

    useEffect(() => {
        fetch(`https://sukoshichat.adaptable.app/friends`, {
          mode: 'cors',
          headers: {
            'Authorization': `${localStorage.getItem('SavedToken')}`
          },
        })
          .then((response) => response.json())
          .then((data) => { 
            if(data==='Login required') {
                console.log(data),
                setLoginRequired(true)
            } else {
                console.log(data), 
                setFriends(data.friends),
                setThisUser(data.username)
            }
            })
          console.log(friends)
      }, [message]);

        
      useEffect(() => {
        if(selectedFriend){
          fetch(`https://sukoshichat.adaptable.app/messages/${selectedFriend}`, {
            mode: 'cors',
            headers: {
              'Authorization': `${localStorage.getItem('SavedToken')}`
            },
          })
            .then((response) => response.json())
            .then((data) => { 
              if(data==='Login required') {
                  console.log(data),
                  setLoginRequired(true)
              } else {
                  console.log(data), 
                  setMessages(data.messages)
              }
              })
            console.log(messages)
        }
      }, [selectedFriend, update]);

    const handleSubmit = (e, route, selectedFriend) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const payload = Object.fromEntries(formData);
      
      setInputValue('');

      fetch(`https://sukoshichat.adaptable.app/${route}/${selectedFriend}`, {
        method: 'Post', 
        headers: {
          'Authorization': `${localStorage.getItem('SavedToken')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then((response) => {
        console.log(response);
        setUpdate(!update);
        setmessage(response);
      })
      .catch((err) => {
        console.log(err.toString());
        setmessage("Something went wrong")
      });
    }

    function getMessages(e, data) {
      e.preventDefault();

      console.log(data)
      setSelectedFriend(data)

      

      //get chat with sukoshi and hugo in
    }

    const handleChange = (event) => {
      setInputValue(event.target.value);
    };

    return (
        <>
            <Head logout={true}/>
            <div className="chatPage">
                <div className="friendsList">
                    <div className="friendsTop">
                      <h2>Friends</h2>
                      <ul>
                          {friends.length ? friends.map((data) => (
                              <li key={data}>
                                <a href="" onClick={(e) => getMessages(e, data)}>{data}</a>
                              </li>
                          )): undefined}
                      </ul>
                    </div>
                    <div className="friendsBottom">
                      <button onClick={e => setAddFriendForm(!addFriendForm)}>Add Friend</button>
                      {thisUser ? 
                          <div>
                              <p>{thisUser}</p>
                          </div>
                          : undefined}
                    </div>
                </div>
                <div className="chatBackground">
                    <div className="chat" ref={scrollableDivRef}>
                        {selectedFriend ? <h2 className="selectedFriend">{selectedFriend}</h2> : <h2 className="selectedFriend">Select a friend to start chatting</h2>}
                        <div className="messages">
                          {messages.length ? messages.map((data) => (
                            <div key={data.user} className="message">
                              <h3 key={data.user} className="messageUser">{data.user}</h3>
                              <p key={data.date} className="messageDate">{data.date}</p>
                              <p key={data.text} className="messageText">{data.text}</p>
                            </div>
                          )): undefined}
                        </div>
                        <form action="" onSubmit={e => handleSubmit(e, 'sendMessage', selectedFriend)}>
                            <input name="message" type="text" value={inputValue} onChange={handleChange} required/>
                            <button>{
                              <svg width="20" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20.7639 12H10.0556M3 8.00003H5.5M4 12H5.5M4.5 16H5.5M9.96153 12.4896L9.07002 15.4486C8.73252 16.5688 8.56376 17.1289 8.70734 17.4633C8.83199 17.7537 9.08656 17.9681 9.39391 18.0415C9.74792 18.1261 10.2711 17.8645 11.3175 17.3413L19.1378 13.4311C20.059 12.9705 20.5197 12.7402 20.6675 12.4285C20.7961 12.1573 20.7961 11.8427 20.6675 11.5715C20.5197 11.2598 20.059 11.0295 19.1378 10.5689L11.3068 6.65342C10.2633 6.13168 9.74156 5.87081 9.38789 5.95502C9.0808 6.02815 8.82627 6.24198 8.70128 6.53184C8.55731 6.86569 8.72427 7.42461 9.05819 8.54246L9.96261 11.5701C10.0137 11.7411 10.0392 11.8266 10.0493 11.9137C10.0583 11.991 10.0582 12.069 10.049 12.1463C10.0387 12.2334 10.013 12.3188 9.96153 12.4896Z" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            }</button>
                        </form>
                    </div>
                </div>
            </div>
            {addFriendForm ? 
                <form action="" onSubmit={e => handleSubmit(e, 'addFriend', '')} className="addFriendForm">
                    <h2>Add Friend</h2>
                    <button className="close" onClick={e => setAddFriendForm(!addFriendForm)}>X</button>
                    <label htmlFor="username">Username</label>
                    <input name="username" placeholder="username" type="text" required/>
                    <button>Add Friend</button>
                    {message}
                </form>
                : undefined}
            {loginRequired ? 
                <h1>Login Required</h1>
                : undefined}
        </>
    )
}

export default Chat