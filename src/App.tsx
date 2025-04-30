import { useState } from 'react'
import { motion } from 'framer-motion'
import TestSvg from './assets/test-svg.svg?react'
import TestComponent from './components/TestComponent'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-blue-600">VC-grade Workflow Animation</h1>
      
      <div className="mb-8">
        {/* SVG with Framer Motion animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          style={{ width: 150, height: 150 }}
        >
          <TestSvg width="100%" height="100%" />
        </motion.div>
      </div>

      <div className="mb-8">
        <TestComponent />
      </div>

      <div className="flex space-x-4 mb-8">
        <button 
          onClick={() => setCount((count) => count + 1)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          count is {count}
        </button>
      </div>
      
      <p className="text-gray-600">
        SVG animation with TailwindCSS and Framer Motion
      </p>
    </div>
  )
}

export default App
