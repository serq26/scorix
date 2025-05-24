import { MatchType } from "../types/matchType";

export interface BetsCartActionType {
  type: "ADD_BET" | "REMOVE_BET" | "CLEAR_BETS";
  payload: {
    match: MatchType;
    oddNumber: number;
  };
}

export const initialBetsCartState = {
  items: [] as { match: MatchType; oddNumber: number }[],
  total: 0,
};

export function betsCartReducer(
  state: typeof initialBetsCartState,
  action: BetsCartActionType
) {
  switch (action.type) {
    case "ADD_BET": {
      const existingItem = state.items.find(
        (item) => item.match.id === action.payload.match.id && item.match.id
      );

      if (!existingItem) {
        return { ...state, items: [...state.items, action.payload] };
      } else {
        return state;
      }
    }
    case "REMOVE_BET": {
      return {
        ...state,
        items: state.items.filter(
          (item) => item.match.id !== action.payload.match.id
        ),
      };
    }
    case "CLEAR_BETS": {
      return initialBetsCartState;
    }
    default:
      return state;
  }
}
