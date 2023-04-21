import './App.css';
import Board from "./Components/Board";
import {useEffect, useState} from "react";

function App() {

    const [board, setBoard] = useState(Array(12).fill(null)
        .map(() => (
            {
                id: Math.random().toString(),
                img: null,
                isOpen: false,
                solved: false,
            })))

    const [movesCount, setMovesCount] = useState([])
    const [winner, setWinner] = useState(false)
    const [results, setResults] = useState([])


    const emodjy = ["😍", "😎", "🐱", "♂️", "👀", "👍"]
    const emodjyBoard = () => {
        const newBoard = board.map(el => ({...el, img: null, isOpen: false, solved:false})
        )
        for (let el of emodjy) {
            for (let j = 1; j < 3; j++) {
                let index;
                do {
                    index = Math.floor(Math.random() * 12)
                }
                while (newBoard[index].img !== null)
                newBoard[index].img = el
            }
        }
        setBoard(newBoard)
    }

    const openCard = (id,img) => {
        const newBoard = board.map(el => el.id === id ? ({...el, isOpen: true}) : el )
        setBoard(newBoard)
        setMovesCount([...movesCount,img])
    }

    const compareImages = () => {
        let opened = board.filter(el => el.isOpen && (el.solved === false))
        console.log(opened);
        if(opened.length === 2){
            if(opened[0].img === opened[1].img){
                const solvedBoard = board.map(el => el.id === opened[0].id || el.id === opened[1].id ? ({...el, solved: true}) : el )
                opened = []
                setBoard(solvedBoard)
            } else { const newBoard = board.map(el => el.solved ? el : ({...el, isOpen: false}))
                setBoard(newBoard) }
        }
    }

    const calculateWinner = () => {
        const win = board.every(el => el.isOpen)
            setWinner(win)
            if (win) {setResults([...results, movesCount.length / 2])}
    }

    useEffect(() => {emodjyBoard()}, [])

    useEffect(() => {
        setTimeout(() => {compareImages();}, 500);
    }, [movesCount])

    useEffect(() => {
        if (movesCount.length > 12) {calculateWinner()}
    }, [movesCount])

        const restart = () => {
            emodjyBoard()
            setMovesCount([])
            setWinner(false)
        }

        useEffect(() => {
            setTimeout(() => {restart();}, 3000);
        }, [results])

    console.log(movesCount);

    return (
        <div className="App">
            <h1>Memory Game</h1>
            <Board
                board={board}
                setBoard={setBoard}
                openCard={openCard}
            />
            {winner && <h2 style={{color: "navy"}}>Congratulation, You won in {movesCount.length / 2} moves!</h2>}
            {results.length > 0 &&
                <div> moves {
                    results.map(el =>
                        <li>{el}</li>)
                }
                </div>
            }
        </div>
    )
}

export default App;