import { useState, useEffect } from "react";
import { auth, provider, db } from "./firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { ref, push, set, onValue } from "firebase/database";  // Import necessary Firebase Realtime Database methods

function App() {
  const [user] = useAuthState(auth);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);  // State to hold the list of messages

  useEffect(() => {
    if (user) {
      // Listen for messages in the main room
      const messagesRef = ref(db, 'rooms/main_room/messages');
      onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Convert the messages object to an array
          const messagesArray = Object.keys(data).map(key => ({
            ...data[key],
            id: key,
          }));
          setMessages(messagesArray);  // Update the messages state
        }
      });
    }
  }, [user]);  // Only run when user changes

  const login = async () => {
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const sendMessage = async () => {
    if (messageText.trim()) {
      const messagesRef = ref(db, 'rooms/main_room/messages');
      const newMessageRef = push(messagesRef);  // Generate a unique ID for each message

      set(newMessageRef, {
        uid: user.uid,
        displayName: user.displayName,
        text: messageText,
        timestamp: new Date().toISOString(),
      });

      setMessageText("");  // Clear input field after sending the message
    }
  };

  return (
    <div className="p-4">
      {user ? (
        <>
          <button onClick={logout} className="bg-red-500 text-white p-2 rounded">Logout</button>
          <p>Welcome {user.displayName}</p>
          
          <div className="mb-4">
            {/* Display the messages */}
            {messages.map((message) => (
              <div key={message.id} className="bg-gray-100 p-2 rounded mb-2">
                <p><strong>{message.displayName}</strong>: {message.text}</p>
                <p className="text-sm text-gray-500">{new Date(message.timestamp).toLocaleString()}</p>
              </div>
            ))}
          </div>
          
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="border p-2 w-full"
            placeholder="Type your message..."
          ></textarea>
          
          <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded mt-2">Send Message</button>
        </>
      ) : (
        <button onClick={login} className="bg-blue-500 text-white p-2 rounded">Login with Google</button>
      )}
    </div>
  );
}

export default App;
