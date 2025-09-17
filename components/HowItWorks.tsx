export default function HowItWorks() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">How It Works</h2>
      
      <ul className="space-y-4">
        <li className="flex items-start">
          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mr-3">
            1
          </div>
          <p className="text-gray-600">Share your code with friends, sellers, or delivery agents</p>
        </li>
        <li className="flex items-start">
          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mr-3">
            2
          </div>
          <p className="text-gray-600">They sign up and complete their first action using your code</p>
        </li>
        <li className="flex items-start">
          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mr-3">
            3
          </div>
          <p className="text-gray-600">You both earn rewards once their action is completed</p>
        </li>
      </ul>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Rewards</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-blue-800">Users</p>
            <p className="text-xs text-gray-600">10% off next purchase or 100 Birr wallet credit</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-green-800">Sellers</p>
            <p className="text-xs text-gray-600">Reduced commission for first month</p>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-yellow-800">Delivery Agents</p>
            <p className="text-xs text-gray-600">Bonus on first 10 deliveries</p>
          </div>
        </div>
      </div>
    </div>
  );
}