import { createContext, useContext, useState, useEffect } from 'react'
import api from '../utils/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('chronos_token')
      if (!token) { setLoading(false); return }
      try {
        const res = await api.get('/auth/me')
        setUser(res.data)
      } catch (err) {
        if (err.response?.status === 401) {
          try {
            const refresh = await api.post('/auth/refresh')
            localStorage.setItem('chronos_token', refresh.data.token)
            const res = await api.get('/auth/me')
            setUser(res.data)
          } catch {
            localStorage.removeItem('chronos_token')
          }
        }
      } finally {
        setLoading(false)
      }
    }
    initAuth()
  }, [])

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    localStorage.setItem('chronos_token', res.data.token)
    setUser(res.data.user)
    return res.data
  }

  const logout = async () => {
    try { await api.post('/auth/logout') } catch {}
    localStorage.removeItem('chronos_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
