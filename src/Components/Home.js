import React, { useRef, useState } from 'react'
import { useEffect } from 'react';

import { useNavigate, Link } from "react-router-dom";

var toggle = false;

function Home() {


    const mainRef = useRef(null);
    const [columns, setColumns] = useState([]);
    const [currentPlayerDivs, setCurrentPlayerDivs] = useState([]);
    const [currentBankerDivs, setCurrentBankerDivs] = useState([]);
    const [divCounter, setDivCounter] = useState(0);
    const [createdDivs, setCreatedDivs] = useState([]);
    const [value, setValue] = useState('');
    const [win, setWin] = useState(0);
    const [winner, setWinner] = useState(null);
    const [inputBetValue, setInputBetValue] = useState(160);
    const [amountOne, setAmountOne] = useState(0);
    const [amountTwo, setAmountTwo] = useState(0);
    const [playerDivs, setPlayerDivs] = useState(0);
    const [bankerDivs, setBankerDivs] = useState(0);
    const [playerOneCount, setPlayerOneCount] = useState(1);
    const [playerTwoCount, setPlayerTwoCount] = useState(1);
    const [playerTwoMoney, setPlayerTwoMoney] = useState(0);
    const [playerOneMoney, setPlayerOneMoney] = useState(0);
    const [highBalance, setHighBalance] = useState(0);




    const [input, setInput] = useState('');
    const [suggestion, setSuggestion] = useState('');



    const [playerOneFlag, setPlaterOneFlag] = useState(null);
    const [playerTwoFlag, setPlayerTwoFlag] = useState(null);




    var popupClassName = playerOneFlag ? 'win-popup' : 'loss-popup';
    var popupText = playerOneFlag ? 'Win' : 'Loss';

    var playerTwoClassName = playerTwoFlag ? 'win-popup' : 'loss-popup';
    var playerTwoPopupText = playerTwoFlag ? 'Win' : 'Loss';


    function createNewColumn() {
        const column = (
            <div key={columns.length} className="column">
                {currentPlayerDivs}
                {currentBankerDivs}
            </div>
        );
        setColumns(prevColumns => [...prevColumns, column]);
        setCurrentPlayerDivs([]);
        setCurrentBankerDivs([]);
        setDivCounter(0);
    }



    function createDiv(type) {

        const value = type === 'player' ? 'P' : 'B';
        setInput(prevInput => prevInput + value)

        const className = type === 'player' ? 'pCapital' : 'bCapital';
        const capitalValue = type === 'player' ? 'P' : 'B';

        if (type === 'player') {
            setPlayerDivs(playerDivs + 1)
            if (currentBankerDivs.length > 0) {
                createNewColumn();
            }
            const playerDiv = createPlayerDiv(capitalValue, className);
            setCurrentPlayerDivs(prevDivs => [...prevDivs, playerDiv]);
            setCreatedDivs(prevDivs => [...prevDivs, playerDiv]);
        } else if (type === 'banker') {
            setBankerDivs(bankerDivs + 1)
            if (currentPlayerDivs.length > 0) {
                createNewColumn();
            }
            const bankerDiv = createBankerDiv(capitalValue, className);
            setCurrentBankerDivs(prevDivs => [...prevDivs, bankerDiv]);
            setCreatedDivs(prevDivs => [...prevDivs, bankerDiv]);
        }
    }

    function createPlayerDiv(value, className) {
        return (
            <div key={divCounter} className={className}>
                {value}
            </div>
        );
    }

    function createBankerDiv(value, className) {
        return (
            <div key={divCounter} className={className}>
                {value}
            </div>
        );
    }

    function undoDiv() {
        const lastDivIndex = createdDivs.length - 1;
        console.log(lastDivIndex, "last div")
        if (lastDivIndex >= 0) {
            const lastDiv = createdDivs[lastDivIndex];
            console.log(lastDiv, "last div", 1)
            if (lastDiv.props.className === 'pCapital') {
                setCurrentPlayerDivs(prevDivs => prevDivs.slice(0, -1));
                console.log(currentPlayerDivs, "last div", 2)
            } else if (lastDiv.props.className === 'bCapital') {
                setCurrentBankerDivs(prevDivs => prevDivs.slice(0, -1));
                console.log(currentPlayerDivs, "last div", 2)
            }
            console.log(createdDivs, "last div", 3)
            setCreatedDivs(prevDivs => prevDivs.slice(0, -1));
            console.log(createdDivs, "last div", 3)

            if (currentPlayerDivs.length === 0 && currentBankerDivs.length === 0 && columns.length > 0) {
                console.log(columns, "last div", 4)
                const lastColumnIndex = columns.length - 1;
                console.log(lastColumnIndex, "current column")
                setColumns(prevColumns => prevColumns.slice(0, lastColumnIndex));
                console.log(columns, "last div", 5)
            }
        }

    }

    useEffect(() => {
        console.log(input, "PBPBPPP");
        if (input.length > 3) {
            console.log(input, "3");
            var symbols = input.split("");
            var length = symbols.length;
            var answer = "";
            var lastArrayInput = symbols[length - 1];
            if (symbols[length - 4] === symbols[length - 1]) {
                answer = symbols[length - 4 + 1];
            } else {
                answer = symbols[length - 4 + 1] === "B" ? "P" : "B";
            }
            if (lastArrayInput !== suggestion && symbols.length > 4) {
                toggle = !toggle
                console.log(toggle, "toggle");
            } else if (lastArrayInput === suggestion && symbols.length > 4) {
                setWin(win + 1);
            }
            if (toggle === true) {
                answer = answer === "B" ? "P" : "B";
            }
            if (toggle === false && symbols.length > 4) {
                setPlayerTwoMoney(playerTwoMoney)
                setPlaterOneFlag(true)
                setPlayerTwoFlag(false)
                setPlayerOneCount(playerOneCount + 1)
                console.log(playerOneCount, "p1 has won");
                setAmountTwo(inputBetValue)
                setAmountOne(parseInt(amountOne) + parseInt(inputBetValue))
                setPlayerOneMoney(amountOne)
                // setPlayerOneMoney(amountOne)
                console.log(playerOneMoney, "p1 money")
            } else if (toggle === true && symbols.length > 4) {
                setPlayerOneMoney(playerOneMoney)
                setPlaterOneFlag(false)
                setPlayerTwoFlag(true)
                setPlayerTwoCount(playerTwoCount + 1)
                console.log(playerTwoCount, "p2 has won");
                setAmountOne(inputBetValue)
                setAmountTwo(parseInt(amountTwo) + parseInt(inputBetValue))
                setPlayerTwoMoney(amountTwo)
                // setPlayerTwoMoney(amountTwo)
                console.log(playerTwoMoney, "p2 money")
            }
            setSuggestion(answer);

        }
    }, [input]);

    // useEffect(() => {

    //     setPlayerOneMoney(amountOne)
    //     setPlayerTwoMoney(amountTwo)
    // }, [amountOne, amountTwo])


    let winPercentage = (win / parseInt(input.length)) * 100;
    winPercentage = isNaN(winPercentage) ? 100 : Math.round(winPercentage);

    var grossWin = Math.abs(playerOneMoney - playerTwoMoney)
    if (grossWin > highBalance) {
        setHighBalance(grossWin);
      }







    return (
        <>

            <div className="title">
                <p className="title-text">IONINKS</p>
            </div>
            <div className="card-container">
                {/* <div className="suggestion-div">
                    <button className='suggestion' onClick={suggestSymbol} style={{ marginRight: "20px", marginTop: "10px" }}>
                        Suggestion
                    </button>
                    {suggestion === 'P' && <div className="pCapitals">P</div>}
                    {suggestion === 'B' && <div className="bCapitals">B</div>}
                </div> */}
                {/* <p style={{ marginTop: "10px" }}>{input}</p> */}
                <p style={{ marginTop: "10px" }} className='first-card-title'>Player 1</p>
                <p>{winner}</p>
                {/* <p>win:{Math.round((win/parseInt(input.length))*100)}</p> */}
                {/* <p>win: {winPercentage}</p> */}

                <div className="card">
                    <div className="button-row">
                        <div className="button-container">
                            <p className="button-text">Next Bet</p>
                            {suggestion === "P" && playerOneFlag === null ? (
                                <button style={{ border: "2px solid #006ACC" }} className="button">Player</button>
                            ) : suggestion === "B" && playerOneFlag === null ? (
                                <button style={{ border: "2px solid #CC0000", color: "#CC0000" }} className="button">Banker</button>
                            ) : null}

                            {playerOneFlag && suggestion === "P" && (
                                <button style={{ border: "2px solid #006ACC" }} className="button">
                                    Player
                                </button>
                            )}
                            {playerOneFlag && suggestion === "B" && (
                                <button style={{ border: "2px solid #CC0000", color: "#CC0000" }} className="button">
                                    Banker
                                </button>
                            )}
                            {playerOneFlag === false && suggestion === "P" && (
                                <button style={{ border: "2px solid #CC0000", color: "#CC0000" }} className="button">
                                    Banker
                                </button>
                            )}
                            {playerOneFlag === false && suggestion === "B" && (
                                <button style={{ border: "2px solid #006ACC" }} className="button">
                                    Player
                                </button>
                            )}

                        </div>
                        <div className="button-container">
                            <p className="button-text">Amount</p>
                            <button style={{ color: "black" }} className="button">{amountOne}</button>
                        </div>
                        <div className="button-container">
                            <p className="button-text">Winning Percentage</p>
                            <p style={{ fontSize: "0.9rem", fontWeight: "bold" }} className='card-top-section'>{winPercentage}%</p>
                        </div>
                    </div>
                    <div className="middle-section">
                        <p className='unit'>Unit of bet setting</p>
                        <input
                            className="input-bet"
                            type="number"
                            value={inputBetValue}
                            onChange={(e) => setInputBetValue(e.target.value)}
                        />
                    </div>
                    <div className="last-section">
                        {playerOneFlag !== null && (
                            <div className={`playerOnePopup ${popupClassName}`}>
                                <p className="popup-text">{popupText}</p>
                            </div>
                        )}
                    </div>
                </div>
                <p className='first-card-title'>Player 2</p>
                <div className="card">
                    <div className="button-row">
                        {/* <div className="button-container">
                            <p className="button-text">Next Bet</p>
                            <button style={{ border: "1px solid red", color: "red" }} className="button">Banker</button>
                        </div> */}
                        <div className="button-container">
                            <p className="button-text">Next Bet</p>

                            {suggestion === "P" && playerTwoFlag === null ? (
                                <button style={{ border: "2px solid #CC0000", color: "#CC0000" }} className="button">
                                    Banker
                                </button>
                            ) : (suggestion === "B" && playerTwoFlag === null) ? (
                                <button style={{ border: "2px solid #006ACC" }} className="button">
                                    Player
                                </button>
                            ) : null}


                            {playerTwoFlag && suggestion === "P" && (
                                <button style={{ border: "2px solid #006ACC" }} className="button">
                                    Player
                                </button>
                            )}
                            {playerTwoFlag && suggestion === "B" && (
                                <button style={{ border: "2px solid #CC0000", color: "#CC0000" }} className="button">
                                    Banker
                                </button>
                            )}
                            {playerTwoFlag === false && suggestion === "P" && (
                                <button style={{ border: "2px solid #CC0000", color: "#CC0000" }} className="button">
                                    Banker
                                </button>
                            )}
                            {playerTwoFlag === false && suggestion === "B" && (
                                <button style={{ border: "2px solid #006ACC" }} className="button">
                                    Player
                                </button>
                            )}


                        </div>
                        <div className="button-container">
                            <p className="button-text">Amount</p>
                            <button style={{ color: "black" }} className="button">{amountTwo}</button>
                        </div>
                        <div className="button-container">
                            <p className="button-text">Winning Percentage</p>
                            <p style={{ fontSize: "0.9rem", fontWeight: "bold" }} className='card-top-section'>{100 - winPercentage}%</p>
                        </div>
                    </div>
                    <div className="middle-section">
                        <p className='unit'>Unit of bet setting</p>
                        <input
                            className="input-bet"
                            type="number"
                            value={inputBetValue}
                            onChange={(e) => setInputBetValue(e.target.value)}
                        />
                    </div>

                    <div className="last-section">
                        {playerTwoFlag !== null && (
                            <div className={`playerTwoPopup ${playerTwoClassName}`}>
                                <p className="popup-text">{playerTwoPopupText}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="card">
                    <div className="main-div">
                        <div className="inner-div">
                            <div style={{ backgroundColor: "black", color: "white", marginLeft: "74px" }} className="first-div">T</div>
                            <div className="second-div">{input.length}</div>
                        </div>
                        <div className="inner-div">
                            <div style={{ backgroundColor: "#006ACC", color: "white" }} className="first-div">P</div>
                            <div className="second-div">{playerDivs}</div>
                        </div>
                        <div className="inner-div">
                            <div style={{ backgroundColor: "#CC0000", color: "white" }} className="first-div">B</div>
                            <div className="second-div">{bankerDivs}</div>
                        </div>
                    </div>
                    <div ref={mainRef} className="columnsContainer">
                        {columns}
                        <div className="column">
                            {currentPlayerDivs}
                            {currentBankerDivs}
                        </div>
                    </div>


                    <div className="bottom-caption">
                        <p className='first-caption'>Gross win</p>
                        <p className='second-caption'>High Banance</p>
                    </div>

                    <div className="bottom-row">
                        {/* <button id="playerBtn" onClick={() => createDiv('player')} style={{ backgroundColor: "#006ACC", color: "white", fontSize: "0.8rem" }} className="bottom-button">Player</button>
                            <button id="bankerBtn" onClick={() => createDiv('banker')} style={{ backgroundColor: "#CC0000", color: "white", fontSize: "0.8rem" }} className="bottom-button">Banker</button> */}
                        <button id="playerBtn" onClick={() => { setValue('Player Value'); createDiv('player'); }} style={{ backgroundColor: "#006ACC", color: "white", fontSize: "0.8rem" }} className="bottom-button">Player</button>

                        <button id="bankerBtn" onClick={() => { setValue('Banker Value'); createDiv('banker'); }} style={{ backgroundColor: "#CC0000", color: "white", fontSize: "0.8rem" }} className="bottom-button">Banker</button>
                        <button className="bottom-button"> {grossWin}</button>
                        <button className="bottom-button">{highBalance}</button>

                    </div>
                    <div className="undo-div">

                    </div>
                </div>
            </div>
            <button className='suggestion' onClick={undoDiv}>Undo</button>


        </>
    )
}
export default Home;



