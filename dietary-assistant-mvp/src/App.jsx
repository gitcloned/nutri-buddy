import { useState } from 'react';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import NutritionSummary from './components/NutritionSummary';
import { mockConversation, mockUserProfile } from './mockData';
import { IoMenu, IoNutrition } from 'react-icons/io5';

function App() {
  const [messages, setMessages] = useState(mockConversation);
  
  // Fake bot response with predefined answers
  const getBotResponse = (userMessage) => {
    const lowerMsg = userMessage.toLowerCase();
    
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
      return `Hello ${mockUserProfile.name}! How can I help you today?`;
    }
    else if (lowerMsg.includes('goal')) {
      return `Your current goal is ${mockUserProfile.goals.calorieTarget} calories per day. You're doing great!`;
    }
    else if (lowerMsg.includes('meal') || lowerMsg.includes('food') || lowerMsg.includes('ate') || lowerMsg.includes('had')) {
      return `I've logged your meal! Based on what you described, here's the estimated nutritional content:\n\n🔸 Calories: ~400 kcal\n🔸 Protein: 22g\n🔸 Carbs: 45g\n🔸 Fat: 12g\n\nYou're making good progress toward your daily goals.`;
    }
    else {
      return "I'm here to help you track your nutrition and reach your goals. You can tell me what you ate, ask about your progress, or check your daily nutrition summary.";
    }
  };
  
  const handleSendMessage = (message) => {
    // Add user message
    const userMessage = {
      id: `msg${messages.length + 1}`,
      sender: 'user',
      message,
      timestamp: new Date().toISOString()
    };
    
    setMessages([...messages, userMessage]);
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botMessage = {
        id: `msg${messages.length + 2}`,
        sender: 'bot',
        message: getBotResponse(message),
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
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
        <NutritionSummary />
        
        {/* Chat Input */}
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default App;