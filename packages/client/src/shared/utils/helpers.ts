import { IUserVote } from 'pages/Entourage/types';

export function reverseSort(a: any, b: any): number {
  if (a.score > b.score) {
    return -1;
  }
  if (a.score < b.score) {
    return 1;
  }
  return 0;
}

export const getWinnerEnthourage = (votes: IUserVote[]): Record<string, unknown> | undefined => {
  const countVotes = votes.reduce((result: Record<string, number>, vote: IUserVote) => {
    if (vote.enthourage) {
      result[vote.enthourage] = result[vote.enthourage] ? result[vote.enthourage] + 1 : 1;
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
}

export function isOpen(ws: any) {
  return ws.readyState === ws.OPEN 
}
