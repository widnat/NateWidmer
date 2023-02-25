export function addPlayer(name: string) {
    return {
        type: 'ADD_PLAYER',
        name,
    }
}

export function removePlayer(name: string) {
    return {
        type: 'REMOVE_PLAYER',
        name,
    }
}

type Action = addPlayer | removePlayer;

const defaultPlayers = [
  { name: '' },
  { name: '' },
  { name: '' },
  { name: '' },
  { name: '' },
  { name: '' },
  { name: '' },
  { name: '' },
];

function players(state=defaultPlayers, action) {
  switch (action.type) {
    case ADD_BIRD:
      return [
        ...state,
        {
          name: action.bird,
          views: 1
        }
      ];
    default:
      return state;
  }
}