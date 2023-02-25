export function addRound(number: number) {
    return {
        type: 'ADD_ROUND',
        number,
    }
}
  
export function removeRound(number: number) {
    return {
        type: 'REMOVE_ROUND',
        number,
    }
}