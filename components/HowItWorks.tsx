export default function HowItWorks() {
  return (
    <div className="bg-white rounded-lg shadow-md p-10">
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
      
      <div className="mt-8 pt-8 border-t border-gray-200"> 
      </div>
    </div>
  );
}