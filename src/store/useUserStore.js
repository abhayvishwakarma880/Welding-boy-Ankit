import { create } from "zustand";

const LOCAL_KEY = "weldingshop_user";

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const useUserStore = create((set) => ({
  user: null,
  token: null,
  isLoggedIn: false,

  initUser: () => {
    const saved = loadFromStorage();
    if (saved?.user && saved?.token) {
      set({ user: saved.user, token: saved.token, isLoggedIn: true });
    }
  },

  setUser: (user, token) => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify({ user, token }));
    set({ user, token, isLoggedIn: true });
  },

  updateUser: (updatedUser) => {
    set((state) => {
      const newData = { user: updatedUser, token: state.token };
      localStorage.setItem(LOCAL_KEY, JSON.stringify(newData));
      return { user: updatedUser };
    });
  },

  logout: () => {
    localStorage.removeItem(LOCAL_KEY);
    set({ user: null, token: null, isLoggedIn: false });
  },
}));

export default useUserStore;
