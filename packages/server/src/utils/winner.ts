export type UserChoice = {
  login: string,
  id: number,
  entourage: string,
  profession: string,
  secret: string,
  answers: any,
  votes: any,
}

export const getWinnerEnthourage = (votes: UserChoice[]): Record<string, string> => {
  const countVotes = votes.reduce((result: Record<string, number>, vote: UserChoice) => {
    if (vote.entourage) {
      result[vote.entourage] = result[vote.entourage] ? result[vote.entourage] + 1 : 1;
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
