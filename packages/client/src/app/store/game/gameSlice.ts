import { createSlice } from '@reduxjs/toolkit';

import { UserChoice, Voice } from './types';
import { IReducer } from '../reducer';

const initialState = {
  users: {
    gameMembers: [{
      login: '',
      id: 0,
      enthourage: '',
    }],
    login: '',
    vote: '',
  }
};

const gamers = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameMemebers(
      state,
      action: {
        type: string;
        payload: UserChoice[]
      }
    ) {
      state.users.gameMembers = action.payload;
    },
    setVoice(
      state,
      action: {
        type: string,
        payload: Voice,
      }
    ) {
      const currentUser: UserChoice = state.users.gameMembers.filter((member: UserChoice) => member.login === action.payload.login)[0];
      currentUser.enthourage = action.payload.vote;
    }
  },
});

export const { setGameMemebers, setVoice } = gamers.actions;
export const gameMembersReducer = gamers.reducer;
export const selectGameMembers = (state: IReducer) => state.game.users.gameMembers;
