const squareStyle = {
    border: "2px solid blue",
    background: "lightblue",
    fontSize: "60px",
    fontWeight: "800",
    float: "left",
    cursor: "pointer",
    padding: "0px",
    textAlign: "center",
    width: "100px",
    height: "100px"
}

const Square = (props) => {

    return (
        <button style={squareStyle}
                onClick={()=>props.openCard(props.card.id, props.card.img)}
        >
            {props.card.isOpen && props.card.img}
        </button>
    );
};

export default Square;