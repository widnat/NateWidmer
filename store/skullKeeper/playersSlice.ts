import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { StoreState } from '../store'

interface Players {
    players: Array<Player>;
}

interface Player {
    playerName: string;
}

const initialState: Players = {
    players: [
        { playerName: '' },
        { playerName: '' },
        { playerName: '' },
        { playerName: '' },
        { playerName: '' },
        { playerName: '' },
        { playerName: '' },
        { playerName: '' },
    ]
}

export const playersSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        updatePlayer: (state, action: PayloadAction<Player>) => {
        state.players[1].playerName
        },
        decrement: state => {
        state.value -= 1
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        incrementByAmount: (state, action: PayloadAction<number>) => {
        state.value += action.payload
        }
    }
})

export const { increment, decrement, incrementByAmount } = playersSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: StoreState) => state.players.playerName

export default playersSlice.reducer