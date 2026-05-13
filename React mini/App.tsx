import { useState } from 'react'
import './App.css'

type cell = "O" | "X" | null

const winningPatterns = [
  // hortizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // daignol
  [0, 4, 8],
  [2, 4, 6]
]

function App() {

  const [board,setBoard] = useState<cell[]>(Array(9).fill(null))

  const [isTurn,setIsTurn] = useState(true);

  const [winner,setWinner] = useState<cell>(null)

  const [draw,setDraw] = useState(false);

  function checkWinner(board : cell[]){

    for(let pattern of winningPatterns){
      const [a,b,c] = pattern

      if(board[a] && board[a] === board[b] && board[a] === board[c]){
        return board[a]
      }
    }

    return null
  }

  function handleState(index:number){

    if(winner){
      return
    }

    if(board[index] !== null){
      return
    }

    let newBoard = [...board];
    
    newBoard[index] = isTurn ? "X" : "O";

    setBoard(newBoard);
    
    setIsTurn(!isTurn);

    const gameWinner = checkWinner(newBoard);

    if(gameWinner){
      setWinner(gameWinner)
      return
    }
    // console.log(winner)

    const checkDraw = newBoard.every(cell => cell !== null) //not equal to because it will be filled with x and o

    if(checkDraw && !winner){
      setDraw(true);
    }
  }

  function reset(){
    setBoard(Array(9).fill(null));
    setIsTurn(true);
    setWinner(null);
    setDraw(false);
  }

  return (
    <>

    <h1>{winner ? `winner : ${winner}` : draw ? "draw" : `current turn : ${isTurn ? 'X' : "O"}`}</h1>
    

    {
      board.map((el:cell, index
      )=><button key={index}
      onClick={()=> handleState(index)
      }>
        {el}
      </button>)
    }

    <button onClick={() => reset()}> Rest </button>
    </>
  )
  
}

export default App
