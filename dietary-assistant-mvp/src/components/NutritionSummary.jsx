import { mockUserProfile, mockMealHistory } from '../mockData';

export default function NutritionSummary() {
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
            className="bg-primary h-1.5 rounded-full" 
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
}