const Tracking = () => {
  const mockWeeklyData = [
    { day: 'Mon', calories: 1950, target: 2000 },
    { day: 'Tue', calories: 2100, target: 2000 },
    { day: 'Wed', calories: 1850, target: 2000 },
    { day: 'Thu', calories: 1920, target: 2000 },
    { day: 'Fri', calories: 2200, target: 2000 },
    { day: 'Sat', calories: 2300, target: 2000 },
    { day: 'Sun', calories: 1800, target: 2000 },
  ]

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Nutrition Tracking</h1>
      <div className="mt-6">
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Weekly Overview</h3>
            <div className="mt-6">
              <div className="grid grid-cols-7 gap-2">
                {mockWeeklyData.map((day) => (
                  <div key={day.day} className="flex flex-col items-center">
                    <div className="text-sm font-medium text-gray-900">{day.day}</div>
                    <div className="mt-2 h-24 w-full relative">
                      <div
                        className={`absolute bottom-0 w-full rounded-t ${
                          day.calories > day.target ? 'bg-red-500' : 'bg-green-500'
                        }`}
                        style={{ height: `${(day.calories / day.target) * 100}%` }}
                      />
                    </div>
                    <div className="mt-1 text-xs text-gray-500">{day.calories}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-900">Daily Target:</span>
                  <span className="text-gray-500">2000 calories</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-900">Weekly Average:</span>
                  <span className="text-gray-500">
                    {Math.round(
                      mockWeeklyData.reduce((acc, day) => acc + day.calories, 0) / mockWeeklyData.length
                    )}{' '}
                    calories
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tracking