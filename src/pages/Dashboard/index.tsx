import React, { useState, useCallback, useEffect, useMemo } from 'react'
import api from '../../services/api'
import DashboardLayout from '../../components/Layout/Dashboard'

const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <h1>Hello World</h1>
    </DashboardLayout>
  )
}

export default Dashboard
