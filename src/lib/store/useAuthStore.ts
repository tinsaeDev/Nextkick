import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

type JWTUser = {
  id: string;
  phone: string;
  name: string;
  email?: string;
  role?: string;
  [key: string]: any;
};

type AuthState = {
  token: string | null;
  user: JWTUser | null;
  setToken: (token: string | null) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  setToken: (token) => {
    if (!token) {
      set({ token: null, user: null });
      return;
    }

    try {
      const decoded = jwtDecode<JWTUser>(token);
      set({ token, user: decoded });
    } catch (err) {
      console.error('Invalid JWT token:', err);
      set({ token: null, user: null });
    }
  },
  clear: () => set({ token: null, user: null })
}));
