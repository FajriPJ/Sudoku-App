const initialState = {
  sudokuBoards: [],
  inputBoards: [],
}

function reducer(state = initialState, action){
  const { type, payload } = action
  
  if (type === 'board/setSudokuBoards'){
    return {...state, sudokuBoards: payload}
  } else if ( type === 'board/setInputBoards'){
    return {...state, inputBoards: payload}
  }
  return state
}

export default reducer