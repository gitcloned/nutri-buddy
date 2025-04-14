import { useEffect } from 'react';
import mealStore from '../store/mealStore';

export default function NutritionSummary({ foodData }) {
  const { meals, goals, addMeal, getTotalNutrition } = mealStore();
  const totals = getTotalNutrition();
  
  useEffect(() => {
    if (foodData?.foods?.[0]) {
      addMeal({
        name: foodData.foods[0].description,
        type: 'meal', // Can be breakfast, lunch, dinner, or snack
        foodData: foodData.foods[0]
      });
    }
  }, [foodData]);

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Weight Progress Section */}
      <div className="p-4">
        <div className="relative h-40 w-full">
          {/* Weight Chart Component would go here */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-4xl font-bold text-primary">
              {totals.calories.toFixed(1)}
            </div>
            <div className="text-sm text-gray-500">kcal</div>
          </div>
        </div>
      </div>

      {/* Today's Meals */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Today's Meals</h2>
        <div className="space-y-4">
          {meals.map((meal, index) => (
            <div key={meal.id} className="flex items-center gap-4">
              <img 
                src={`https://via.placeholder.com/60`} 
                alt={meal.name}
                className="w-15 h-15 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium">{meal.name}</h3>
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <span>20 min</span>
                  <span>•</span>
                  <span>{meal.foodData.foodNutrients.find(n => n.nutrientName === 'Energy')?.value || 0} calories</span>
                </div>
              </div>
              <div className="w-6 h-6 rounded-full border-2 border-primary"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}