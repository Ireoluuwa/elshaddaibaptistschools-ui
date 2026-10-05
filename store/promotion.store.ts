import { create } from 'zustand';

// TEMPORARY: promotion progress shared between the Promotion page, the new-session
// warning and the dashboard. Replace with server data once promotions are saved.
interface PromotionState {
  promotedClasses: string[];
  markPromoted: (className: string) => void;
  undoPromotion: (className: string) => void;
}

export const usePromotionStore = create<PromotionState>((set) => ({
  promotedClasses: [],
  markPromoted: (className) =>
    set((state) =>
      state.promotedClasses.includes(className)
        ? state
        : { promotedClasses: [...state.promotedClasses, className] },
    ),
  undoPromotion: (className) =>
    set((state) => ({ promotedClasses: state.promotedClasses.filter((c) => c !== className) })),
}));
