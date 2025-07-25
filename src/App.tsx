
import React from 'react'
import { useStore } from './store/useStore'

function App() {
  const { count, increment, decrement } = useStore()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Zustand + React + Tailwind CSS</h1>
      <div className="flex items-center space-x-4">
        <button
          onClick={decrement}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          - Decrease
        </button>
        <span className="text-3xl font-mono">{count}</span>
        <button
          onClick={increment}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          + Increase
        </button>
      </div>
    </div>
  )
}

export default App
