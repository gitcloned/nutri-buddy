import { useState } from 'react';
import { IoSend, IoMic } from 'react-icons/io5';

export default function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex items-center p-2 border-t">
      <button 
        type="button" 
        className="p-2 rounded-full text-gray-500 hover:text-primary"
      >
        <IoMic size={20} />
      </button>
      
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your meal or question..."
        className="flex-1 p-2 mx-2 rounded-full bg-gray-100 focus:outline-none focus:ring-1 focus:ring-primary"
      />
      
      <button 
        type="submit" 
        className="p-2 rounded-full text-white bg-primary"
      >
        <IoSend size={18} />
      </button>
    </form>
  );
}