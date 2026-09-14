import { create } from 'zustand'

export const useTravelStore = create((set, get) => ({
  tripData: null,
  
  setTripData: (data) => set({ tripData: data }),
  
  resetTrip: () => set({ tripData: null }),
  
  updateTripData: (updates) => set((state) => ({
    tripData: state.tripData ? { ...state.tripData, ...updates } : updates
  }))
}))
