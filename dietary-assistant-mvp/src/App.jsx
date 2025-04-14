import { useState } from 'react';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import NutritionSummary from './components/NutritionSummary';
import { IoMenu, IoNutrition } from 'react-icons/io5';
import { callOpenAI, callUSDAApi } from './services/api'; // Import API functions

function App() {
  const [messages, setMessages] = useState([]);
  const [foodData, setFoodData] = useState(null); // Add state for foodData

  const handleSendMessage = async (message) => {
    const userMessage = {
      id: `msg${messages.length + 1}`,
      sender: 'user',
      message,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, userMessage]);

    const openAIResponse = await callOpenAI(message);

    if (openAIResponse.toolCall) {
      const foodDataResponse = await callUSDAApi(openAIResponse.toolCall.arguments);
      setFoodData(foodDataResponse); // Update foodData state
      const botMessage = {
        id: `msg${messages.length + 2}`,
        sender: 'bot',
        message: `I found some information about the food item "${openAIResponse.toolCall.arguments.query}". Check the Nutrition Summary for details.`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } else {
      const botMessage = {
        id: `msg${messages.length + 2}`,
        sender: 'bot',
        message: openAIResponse.message,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="chat-container">
        {/* Header */}
        <div className="bg-primary text-white p-3 rounded-t-lg flex justify-between items-center">
          <button className="p-1">
            <IoMenu size={24} />
          </button>
          <div className="text-center">
            <h1 className="font-bold">Dietary Assistant</h1>
            <p className="text-xs">Helping you eat smarter</p>
          </div>
          <button className="p-1">
            <IoNutrition size={24} />
          </button>
        </div>
        
        {/* Messages */}
        <div className="flex-1 p-3 overflow-y-auto flex flex-col space-y-2">
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
        
        {/* Nutrition Summary */}
        <NutritionSummary foodData={foodData} /> {/* Pass foodData as a prop */}
        
        {/* Chat Input */}
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default App;