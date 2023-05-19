import React, { useRef, useState } from 'react'

import { useNavigate, Link } from "react-router-dom";



function Home() {
    const [columns, setColumns] = useState([]);
    const [currentPlayerDivs, setCurrentPlayerDivs] = useState([]);
    const [currentBankerDivs, setCurrentBankerDivs] = useState([]);
    const [divCounter, setDivCounter] = useState(0);

    const [input, setInput] = useState('');
    const [suggestion, setSuggestion] = useState('');


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
        if (input.length > 3) {
            var symbols = input.split("");
            var length = symbols.length;
            var answer = "";
            if (symbols[length - 4] === symbols[length - 1]) {
                answer = symbols[length - 4 + 1];
            } else {
                answer = symbols[length - 4 + 1] === "B" ? "P" : "B";
            }
            setSuggestion(answer);
            console.log("ans ", answer);
        } else {
            setSuggestion("");
        }
        const className = type === 'player' ? 'pCapital' : 'bCapital';
        const value = type === 'player' ? 'P' : 'B';

        setInput(prevInput => prevInput + value);

        if (type === 'player') {
            if (currentBankerDivs.length > 0) {
                createNewColumn();
            }
            setCurrentPlayerDivs(prevDivs => [...prevDivs, createPlayerDiv(value, className)]);
        } else if (type === 'banker') {
            if (currentPlayerDivs.length > 0) {
                createNewColumn();
            }
            setCurrentBankerDivs(prevDivs => [...prevDivs, createBankerDiv(value, className)]);
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
                <div className="card">
                    <div className="button-row">
                        <div className="button-container">
                            <p className="button-text">Next Bet</p>
                            {suggestion === "P" ? (
                                <button style={{ border: "2px solid #006ACC" }} className="button">Player</button>
                            ) : suggestion === "B" ? (
                                <button style={{ border: "2px solid #CC0000", color: "#CC0000" }} className="button">Banker</button>
                            ) : null}

                        </div>
                        <div className="button-container">
                            <p className="button-text">Amount</p>
                            <button style={{ color: "black" }} className="button">2500</button>
                        </div>
                        <div className="button-container">
                            <p className="button-text">Winning Percentage</p>
                            <p style={{ fontSize: "0.9rem", fontWeight: "bold" }} className='card-top-section'>45%</p>
                        </div>
                    </div>
                    <div className="middle-section">
                        <p className='unit'>Unit of bet setting</p>
                        <p className='unit-value'>160</p>
                    </div>
                    <div className="last-section">
                        <p className='unit'>Unit of bet setting</p>
                        <p className='unit-value'>160</p>
                    </div>
                </div>
                <p className='first-card-title'>Player 2</p>
                <div className="card">
                    <div className="button-row">
                        <div className="button-container">
                            <p className="button-text">Next Bet</p>
                            <button style={{ border: "1px solid red", color: "red" }} className="button">Banker</button>
                        </div>
                        <div className="button-container">
                            <p className="button-text">Amount</p>
                            <button style={{ color: "black" }} className="button">2500</button>
                        </div>
                        <div className="button-container">
                            <p className="button-text">Winning Percentage</p>
                            <p style={{ fontSize: "0.9rem", fontWeight: "bold" }} className='card-top-section'>45%</p>
                        </div>
                    </div>
                    <div className="middle-section">
                        <p className='unit'>Unit of bet setting</p>
                        <p className='unit-value'>160</p>
                    </div>
                    <div className="last-section">
                        <p className='unit'>Unit of bet setting</p>
                        <p className='unit-value'>160</p>
                    </div>
                </div>
                <div className="card">
                    <div className="main-div">
                        <div className="inner-div">
                            <div style={{ backgroundColor: "#04DE00", color: "white", marginLeft: "74px" }} className="first-div">T</div>
                            <div className="second-div">17</div>
                        </div>
                        <div className="inner-div">
                            <div style={{ backgroundColor: "#006ACC", color: "white" }} className="first-div">P</div>
                            <div className="second-div">17</div>
                        </div>
                        <div className="inner-div">
                            <div style={{ backgroundColor: "#CC0000", color: "white" }} className="first-div">B</div>
                            <div className="second-div">17</div>
                        </div>
                    </div>
                    <div className="columnsContainer">
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
                        <button id="playerBtn" onClick={() => createDiv('player')} style={{ backgroundColor: "#006ACC", color: "white", fontSize: "0.8rem" }} className="bottom-button">Player</button>
                        <button id="bankerBtn" onClick={() => createDiv('banker')} style={{ backgroundColor: "#CC0000", color: "white", fontSize: "0.8rem" }} className="bottom-button">Banker</button>
                        <button className="bottom-button">1000</button>
                        <button className="bottom-button">1000</button>

                    </div>
                </div>
            </div>

        </>
    )
}
export default Home;



