import { createContext, useEffect, useReducer, useState } from "react";
import { BetsCartActionType, betsCartReducer, initialBetsCartState } from "../reducers/betsCartReducer";
import { BetsCartListType } from "../types/betsCartType";
import { addBetToDB, clearBetsFromDB, getAllBetsFromDB, removeBetFromDB } from "../services/db";
import { MatchType } from "../types/matchType";

const BetsCartContext = createContext<{
  state: typeof initialBetsCartState;
  dispatch: React.Dispatch<BetsCartActionType>;
  addBet: (
    match: MatchType,
    betOdd: number,
    oddType: string
  ) => Promise<((this: IDBTransaction, ev: Event) => unknown) | null>;
  deleteBet: (id: number) => Promise<((this: IDBTransaction, ev: Event) => unknown) | null>;
  clearAllBets: () => Promise<((this: IDBTransaction, ev: Event) => unknown) | null>;
  bets: BetsCartListType[];
  isOpenedBetsCart: boolean;
  setIsOpenedBetsCart: (x: boolean) => void;
} | null>(null);

function BetsCartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(betsCartReducer, initialBetsCartState);

  const [bets, setBets] = useState<BetsCartListType[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [isOpenedBetsCart, setIsOpenedBetsCart] = useState<boolean>(false);

  useEffect(() => {
    getBets();
  }, []);

  useEffect(() => {
    getBets();
  }, [refresh]);

  const getBets = async () => {
    const result = await getAllBetsFromDB();
    setBets(result);
  };

  const addBet = async (match: MatchType, betOdd: number, oddType: string) => {
    const response = await addBetToDB({ match, oddNumber: betOdd, oddType: oddType });
    setRefresh((prev) => !prev);
    return response;
  };

  const deleteBet = async (id: number) => {
    const response = await removeBetFromDB(id);
    setRefresh((prev) => !prev);
    return response;
  };

  const clearAllBets = async () => {
    const response = await clearBetsFromDB();
    setRefresh((prev) => !prev);
    return response;
  }

  return (
    <BetsCartContext.Provider
      value={{ state, dispatch, bets, addBet, deleteBet, clearAllBets, isOpenedBetsCart, setIsOpenedBetsCart }}
    >
      {children}
    </BetsCartContext.Provider>
  );
}

export { BetsCartProvider, BetsCartContext };
