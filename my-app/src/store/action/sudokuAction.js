import axios from 'axios'

export function setSudokuBoards(payload) {
  return {
    type: 'board/setSudokuBoards',
    payload
  }
} 

export function setInputBoards(payload) {
  return {
    type: 'board/setInputBoards',
    payload
  }
} 

export function setSudokuBoardsAsync(payload){
  return (dispatch) => {
    axios({
      url: `https://sugoku2.herokuapp.com/board?difficulty=${payload.difficulty}`,
      method: 'GET',
      headers:{
        "Content-Type":"application/json"
      }
    })
    .then(({data}) => {
      dispatch(setInputBoards(data.board))
      dispatch(setSudokuBoards(data.board))
    })
  }
}
