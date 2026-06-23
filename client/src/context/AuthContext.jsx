import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import http from '../api/http.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const { data } = await http.get('/auth/me');
      setUser(data.user);
      setProfile(data.profile);
    } catch {
      setUser(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadUser(); }, []);

  const login = async (credentials) => {
    await http.post('/auth/login', credentials);
    await loadUser();
  };

  const register = async (payload) => {
    await http.post('/auth/register', payload);
    await loadUser();
  };

  const logout = async () => {
    await http.post('/auth/logout');
    setUser(null);
    setProfile(null);
  };

  const value = useMemo(() => ({ user, profile, loading, login, register, logout, reload: loadUser }), [user, profile, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
