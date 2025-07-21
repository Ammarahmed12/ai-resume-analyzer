import { create } from "zustand";

interface FakeUser {
  username: string;
}

interface FakeFS {
  write: (...args: any[]) => Promise<undefined>;
  read: (...args: any[]) => Promise<undefined>;
  upload: (...args: any[]) => Promise<undefined>;
  delete: (...args: any[]) => Promise<undefined>;
  readDir: (...args: any[]) => Promise<any[]>;
}
interface FakeAI {
  chat: (...args: any[]) => Promise<undefined>;
  feedback: (...args: any[]) => Promise<undefined>;
  img2txt: (...args: any[]) => Promise<undefined>;
}
interface FakeKV {
  get: (...args: any[]) => Promise<undefined>;
  set: (...args: any[]) => Promise<undefined>;
  delete: (...args: any[]) => Promise<undefined>;
  list: (...args: any[]) => Promise<any[]>;
  flush: (...args: any[]) => Promise<undefined>;
}
interface FakeAuth {
  user: FakeUser | null;
  isAuthenticated: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
  checkAuthStatus: () => Promise<boolean>;
  getUser: () => FakeUser | null;
}
interface FakeStore {
  isLoading: boolean;
  error: string | null;
  puterReady: boolean;
  auth: FakeAuth;
  fs: FakeFS;
  ai: FakeAI;
  kv: FakeKV;
  init: () => void;
  clearError: () => void;
}

export const usePuterStore = create<FakeStore>((set, get) => ({
  isLoading: false,
  error: null,
  puterReady: true,
  auth: {
    user: null,
    isAuthenticated: false,
    signIn: async () => {
      set({
        auth: {
          ...get().auth,
          user: { username: "fakeuser" },
          isAuthenticated: true,
          signIn: get().auth.signIn,
          signOut: get().auth.signOut,
          refreshUser: get().auth.refreshUser,
          checkAuthStatus: get().auth.checkAuthStatus,
          getUser: get().auth.getUser,
        },
        isLoading: false,
      });
    },
    signOut: async () => {
      set({
        auth: {
          ...get().auth,
          user: null,
          isAuthenticated: false,
          signIn: get().auth.signIn,
          signOut: get().auth.signOut,
          refreshUser: get().auth.refreshUser,
          checkAuthStatus: get().auth.checkAuthStatus,
          getUser: get().auth.getUser,
        },
        isLoading: false,
      });
    },
    refreshUser: async () => {},
    checkAuthStatus: async () => get().auth.isAuthenticated,
    getUser: () => get().auth.user,
  },
  fs: {
    write: async () => undefined,
    read: async () => undefined,
    upload: async () => undefined,
    delete: async () => undefined,
    readDir: async () => [],
  },
  ai: {
    chat: async () => undefined,
    feedback: async () => undefined,
    img2txt: async () => undefined,
  },
  kv: {
    get: async () => undefined,
    set: async () => undefined,
    delete: async () => undefined,
    list: async () => [],
    flush: async () => undefined,
  },
  init: () => {},
  clearError: () => set({ error: null }),
}));
