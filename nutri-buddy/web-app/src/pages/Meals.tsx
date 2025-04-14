const Meals = () => {
  const mockMeals = [
    {
      id: 1,
      name: 'Breakfast',
      foods: [
        { name: 'Oatmeal', calories: 150, protein: 6, carbs: 27, fat: 3 },
        { name: 'Banana', calories: 105, protein: 1, carbs: 27, fat: 0 },
      ],
    },
    {
      id: 2,
      name: 'Lunch',
      foods: [
        { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
        { name: 'Brown Rice', calories: 216, protein: 5, carbs: 45, fat: 1.8 },
      ],
    },
  ]

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Meals</h1>
          <p className="mt-2 text-sm text-gray-700">A list of all your meals and their nutritional information.</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Add Meal
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {mockMeals.map((meal) => (
              <div key={meal.id} className="mb-8 overflow-hidden bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">{meal.name}</h3>
                </div>
                <div className="border-t border-gray-200">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Food</th>
                        <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Calories</th>
                        <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Protein</th>
                        <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Carbs</th>
                        <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Fat</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {meal.foods.map((food, foodIdx) => (
                        <tr key={foodIdx}>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{food.name}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-500">{food.calories}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-500">{food.protein}g</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-500">{food.carbs}g</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-500">{food.fat}g</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Meals