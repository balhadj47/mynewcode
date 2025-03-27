import React from 'react'

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          <p>Manage system users</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          <p>Manage product catalog</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Analytics</h2>
          <p>View system analytics</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
