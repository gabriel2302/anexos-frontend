import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth()
  return <h1>Hello WOrld</h1>
}

export default Dashboard
