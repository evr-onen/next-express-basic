import { create } from "zustand"

// ** Types
type UserType = {
  username: string
  email: string
}

type ActionsType = {
  setUser: (payload: UserType) => void
}

export const useUserStore = create<UserType & ActionsType>((set) => ({
  username: "",
  email: "",
  setUser: (payload) => set({ username: payload.username, email: payload.email }),
}))
