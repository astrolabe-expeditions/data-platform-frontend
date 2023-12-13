'use client'

import React from 'react'

const NotFound = ({ errorMessage }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">
          {errorMessage || 'Page not found'}
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => window.history.back()}>
          Go Back
        </button>
      </div>
    </div>
  )
}

export default NotFound
