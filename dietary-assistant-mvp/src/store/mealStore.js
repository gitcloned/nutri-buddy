import { create } from 'zustand'

const userGoals = {
  calorieTarget: 1350,
  proteinTarget: 80,
  carbsTarget: 150,
  fatTarget: 50
}

const mealStore = create((set, get) => ({
  meals: [],
  goals: userGoals,
  
  addMeal: (meal) => {
    set((state) => ({
      meals: [...state.meals, {
        ...meal,
        id: Date.now(),
        timestamp: new Date().toISOString()
      }]
    }))
  },

  getTotalNutrition: () => {
    const { meals } = get()
    return meals.reduce((acc, meal) => {
      const nutrients = meal.foodData.foodNutrients || []
      return {
        calories: acc.calories + (nutrients.find(n => n.nutrientName === 'Energy')?.value || 0),
        protein: acc.protein + (nutrients.find(n => n.nutrientName === 'Protein')?.value || 0),
        carbs: acc.carbs + (nutrients.find(n => n.nutrientName === 'Carbohydrate, by difference')?.value || 0),
        fat: acc.fat + (nutrients.find(n => n.nutrientName === 'Total lipid (fat)')?.value || 0)
      }
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 })
  }
}))

export default mealStore
