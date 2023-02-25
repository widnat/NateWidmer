import { AnyAction } from '@reduxjs/toolkit';

export interface IGame {
    players: Array<string>;
    rounds: Array<IRound>
}

export interface IRound {
    playerRounds: Array<IPlayerRound>;
}

export interface IPlayerRound {
    playerIndex: number;
    bid: number;
    won: number;
    bonus: number;
    total: number;
}

const initialState: GameState = {
    players: new Array(),
    playing: 
  }



export type PlayerAction = Omit<IModel, 'text'>;
export type RoundAction = Omit<TActionSlice, 'isFinished'>;

export interface IColumnLayoutProps {
  labelText?: string;
  addHandler: (v: string) => AnyAction;
  removeHandler: (v: string) => AnyAction;
  completedHandler: (v: TActionSlice) => AnyAction;
  selectorState: IModel[];
  droppableId: string;
  updateTextShowed: (v: TUpdateTextShowed) => AnyAction;
}