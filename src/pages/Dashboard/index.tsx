import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'
import DashboardLayout from '../../components/Layout/Dashboard'

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth()
  return (
    <DashboardLayout>
      <h1>Hello World</h1>
    </DashboardLayout>
  )
}

export default Dashboard
