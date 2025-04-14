export const mockUserProfile = {
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
  
  export const mockMealHistory = [
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
  
  export const mockConversation = [
    {
      id: "msg1",
      sender: "bot",
      message: "👋 Hi Alex! I'm your dietary assistant. How can I help you today?",
      timestamp: "2023-04-24T10:00:00Z"
    },
    {
      id: "msg2",
      sender: "user",
      message: "I had a turkey sandwich for lunch",
      timestamp: "2023-04-24T10:01:00Z"
    },
    {
      id: "msg3",
      sender: "bot",
      message: "I've logged your turkey sandwich for lunch! Here's the nutritional breakdown:\n\n🔸 Calories: ~350 kcal\n🔸 Protein: 20g\n🔸 Carbs: 30g\n🔸 Fat: 14g\n\nThis is a balanced lunch option with good protein content. You're at 1,640 calories for the day, which is 360 below your daily target of 2,000 calories.",
      timestamp: "2023-04-24T10:01:30Z"
    }
  ];