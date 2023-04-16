import { IUserVote } from 'pages/Entourage/types';
import { useCallback} from 'react';

export const getWinnerEnthourage = useCallback((votes: IUserVote[]): Record<string, unknown> | undefined => {
  const countVotes = votes.reduce((result: Record<string, number>, vote: IUserVote) => {
    if (vote.votes) {
      result[vote.votes] = result[vote.votes] ? result[vote.votes] + 1 : 1;
    }
    return result;
  }, {});

  let maxValue = 0;

  let winner = {};

  Object.entries(countVotes).forEach(([name, value]) => {
    if (value > maxValue) {
      maxValue = value;
      winner = {
        name,
        value
      }
    };
  });

  return winner;
}, []);
