import React from 'react';
import Square from "./Square";

const boardStyle={
    border: "4px solid navy",
    width: "400px",
    height: "300px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "auto auto auto auto"
}

const Board = (props) => {
    return (
        <div style={boardStyle}>
            {props.board.map((el) =>
                <Square key={el.id}
                    card={el}
                    board={props.board}
                    setBoard={props.setBoard}
                    openCard={props.openCard}
                />)}
        </div>
    );
};

export default Board;