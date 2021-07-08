/* eslint-disable @typescript-eslint/ban-types */
import React, { createContext, useCallback, useState, useContext } from 'react'

import api from '../services/api'

interface User {
  id: string
  username: string
  role: string
  name: string
  enrollment: string
  institution_id: string
}
interface AuthState {
  token: string
  user: User
}
interface SignCredentials {
  username: string
  password: string
}

interface AuthContextData {
  user: User
  signIn(credentials: SignCredentials): Promise<void>
  signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Anexos:token')
    const user = localStorage.getItem('@Anexos:user')

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`

      return { token, user: JSON.parse(user) }
    }

    return {} as AuthState
  })

  const signIn = useCallback(async ({ username, password }) => {
    const response = await api.post('/sessions', {
      username,
      password,
    })

    const { token, user } = response.data

    localStorage.setItem('@Anexos:token', token)
    localStorage.setItem('@Anexos:user', JSON.stringify(user))

    api.defaults.headers.authorization = `Bearer ${token}`

    setData({ token, user })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@Anexos:token')
    localStorage.removeItem('@Anexos:user')

    setData({} as AuthState)
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
