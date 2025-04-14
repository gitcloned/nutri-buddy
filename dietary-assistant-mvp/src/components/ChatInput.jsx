import { useState } from 'react';
import { IoSend, IoMic } from 'react-icons/io5';

export default function ChatInput({ onSendMessage }) {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  const handleMicClick = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setInput(transcript);
    setIsListening(false);
  };

  recognition.onerror = () => {
    setIsListening(false);
  };

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="chat-input bg-white border-t">
      <form onSubmit={(e) => e.preventDefault()} className="flex items-center p-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your meal or question..."
          className="flex-1 p-3 rounded-full bg-gray-100 focus:outline-none focus:ring-1 focus:ring-primary text-sm"
        />
        
        <div className="flex gap-2 ml-2">
          <button 
            type="button" 
            onClick={handleMicClick}
            className={`p-2 rounded-full ${isListening ? 'bg-primary text-white' : 'bg-gray-100'}`}
          >
            <IoMic size={20} />
          </button>
          
          <button 
            type="button" 
            onClick={handleSend}
            className="p-2 rounded-full bg-primary text-white"
          >
            <IoSend size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}