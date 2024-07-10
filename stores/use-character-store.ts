import { create } from "zustand"

interface State {
  motivation: string
  speechStyle: string
}

export const useCharacterStore = create<State>((set) => ({
  motivation: "",
  speechStyle: "",
}))

export const { getState, setState } = useCharacterStore
