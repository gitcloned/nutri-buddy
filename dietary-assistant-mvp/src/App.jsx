import React, { useState } from 'react';

// Mock data
const mockUserProfile = {
  name: "Alex",
  age: 32,
  dietaryRestrictions: ["Gluten-free"],
  goals: {
    calorieTarget: 2000,
    proteinTarget: 120,
    carbTarget: 200,
    fatTarget: 65
  },
  lastActive: "2023-04-20T10:30:00Z"
};

const mockMealHistory = [
  {
    id: "meal1",
    timestamp: "2023-04-23T08:30:00Z",
    description: "Oatmeal with berries and almond milk",
    nutritionInfo: {
      calories: 320,
      protein: 12,
      carbs: 45,
      fat: 10
    }
  },
  {
    id: "meal2",
    timestamp: "2023-04-23T12:30:00Z",
    description: "Chicken salad with olive oil dressing",
    nutritionInfo: {
      calories: 450,
      protein: 35,
      carbs: 15,
      fat: 28
    }
  },
  {
    id: "meal3",
    timestamp: "2023-04-23T18:30:00Z",
    description: "Salmon with quinoa and vegetables",
    nutritionInfo: {
      calories: 520,
      protein: 42,
      carbs: 38,
      fat: 24
    }
  }
];

const initialMessages = [
  {
    id: "msg1",
    sender: "bot",
    message: "👋 Hi Alex! I'm your dietary assistant. How can I help you today?",
    timestamp: "2023-04-24T10:00:00Z"
  }
];

// Component for chat messages
const ChatMessage = ({ message }) => {
  const isBot = message.sender === 'bot';
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  return (
    <div className={`${isBot ? 'bg-blue-100' : 'bg-green-100'} p-3 rounded-lg mb-2 max-w-[80%] ${isBot ? 'self-start' : 'self-end'}`}>
      <div className="whitespace-pre-wrap">{message.message}</div>
      <div className="text-xs text-gray-500 mt-1 text-right">{formattedTime}</div>
    </div>
  );
};

// Component for chat input
const ChatInput = ({ onSendMessage }) => {
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
        className="p-2 rounded-full text-gray-500 hover:text-green-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
        </svg>
      </button>
      
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your meal or question..."
        className="flex-1 p-2 mx-2 rounded-full bg-gray-100 focus:outline-none focus:ring-1 focus:ring-green-500"
      />
      
      <button 
        type="submit" 
        className="p-2 rounded-full text-white bg-green-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      </button>
    </form>
  );
};

// Component for nutrition summary
const NutritionSummary = () => {
  // Calculate total nutrition for the day
  const totals = mockMealHistory.reduce((acc, meal) => {
    acc.calories += meal.nutritionInfo.calories;
    acc.protein += meal.nutritionInfo.protein;
    acc.carbs += meal.nutritionInfo.carbs;
    acc.fat += meal.nutritionInfo.fat;
    return acc;
  }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  
  // Calculate percentages of goals
  const caloriePercentage = Math.round((totals.calories / mockUserProfile.goals.calorieTarget) * 100);
  
  return (
    <div className="p-3 border-t">
      <h3 className="text-sm font-semibold text-gray-700">Today's Nutrition Summary</h3>
      
      <div className="mt-2">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Calories: {totals.calories} / {mockUserProfile.goals.calorieTarget}</span>
          <span>{caloriePercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div 
            className="bg-green-500 h-1.5 rounded-full" 
            style={{ width: `${Math.min(caloriePercentage, 100)}%` }}
          ></div>
        </div>
      </div>
      
      <div className="flex justify-between mt-3 text-xs">
        <div className="text-center">
          <div className="font-medium">Protein</div>
          <div className="text-gray-600">{totals.protein}g</div>
        </div>
        <div className="text-center">
          <div className="font-medium">Carbs</div>
          <div className="text-gray-600">{totals.carbs}g</div>
        </div>
        <div className="text-center">
          <div className="font-medium">Fat</div>
          <div className="text-gray-600">{totals.fat}g</div>
        </div>
      </div>
    </div>
  );
};

// Main component
const DietaryAssistant = () => {
  const [messages, setMessages] = useState(initialMessages);
  
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
    
    // Add bot response after a short delay
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
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg h-[600px] flex flex-col">
      {/* Header */}
      <div className="bg-green-500 text-white p-3 rounded-t-lg flex justify-between items-center">
        <button className="p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="text-center">
          <h1 className="font-bold">Dietary Assistant</h1>
          <p className="text-xs">Helping you eat smarter</p>
        </div>
        <button className="p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
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
  );
};

export default DietaryAssistant;