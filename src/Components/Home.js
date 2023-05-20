import React, { useRef, useState } from 'react'
import { useEffect } from 'react';

import { useNavigate, Link } from "react-router-dom";



function Home() {

   
    const mainRef = useRef(null);
    const [columns, setColumns] = useState([]);
    const [currentPlayerDivs, setCurrentPlayerDivs] = useState([]);
    const [currentBankerDivs, setCurrentBankerDivs] = useState([]);
    const [divCounter, setDivCounter] = useState(0);
    const [createdDivs, setCreatedDivs] = useState([]);
    const [value, setValue] = useState('');
    const [flag, setFlag] = useState(false);

    
    const [input, setInput] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const [newSuggestion, setNewSuggestion] = useState('');
    
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
            if (currentBankerDivs.length > 0) {
                createNewColumn();
            }
            const playerDiv = createPlayerDiv(capitalValue, className);
            setCurrentPlayerDivs(prevDivs => [...prevDivs, playerDiv]);
            setCreatedDivs(prevDivs => [...prevDivs, playerDiv]);
        } else if (type === 'banker') {
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
        console.log(lastDivIndex,"last div")
        if (lastDivIndex >= 0) {
            const lastDiv = createdDivs[lastDivIndex];
            console.log(lastDiv,"last div",1)
            if (lastDiv.props.className === 'pCapital') {
                setCurrentPlayerDivs(prevDivs => prevDivs.slice(0, -1));
                console.log(currentPlayerDivs,"last div",2)
            } else if (lastDiv.props.className === 'bCapital') {
                setCurrentBankerDivs(prevDivs => prevDivs.slice(0, -1));
                console.log(currentPlayerDivs,"last div",2)
            }
            console.log(createdDivs,"last div",3)
            setCreatedDivs(prevDivs => prevDivs.slice(0, -1));
            console.log(createdDivs,"last div",3)

            if (currentPlayerDivs.length === 0 && currentBankerDivs.length === 0 && columns.length > 0) {
                console.log(columns,"last div",4)
                const lastColumnIndex = columns.length - 1;
                console.log(lastColumnIndex,"current column")
                setColumns(prevColumns => prevColumns.slice(0, lastColumnIndex));
                console.log(columns,"last div",5)
            }
        }
    
    }


    // function undoDiv() {
    //     const lastDivIndex = createdDivs.length - 1;
    //     if (lastDivIndex >= 0) {
    //       const lastDiv = createdDivs[lastDivIndex];
    //       if (lastDiv.props.className === 'pCapital') {
    //         setCurrentPlayerDivs(prevDivs => prevDivs.slice(0, -1));
    //       } else if (lastDiv.props.className === 'bCapital') {
    //         setCurrentBankerDivs(prevDivs => prevDivs.slice(0, -1));
    //       }
    //       setCreatedDivs(prevDivs => prevDivs.slice(0, -1));
      
    //       if (currentPlayerDivs.length === 0 && currentBankerDivs.length === 0 && columns.length > 0) {
    //         const lastColumnIndex = columns.length - 1;
    //         const previousColumnIndex = lastColumnIndex - 1;
      
    //         const updatedColumns = [...columns];
      
    //         if (previousColumnIndex >= 0) {
    //           const previousColumn = updatedColumns[previousColumnIndex];
    //           const updatedPreviousColumn = React.cloneElement(previousColumn, {
    //             children: removeLastDivFromColumn(previousColumn.props.children)
    //           });
    //           updatedColumns.splice(previousColumnIndex, 1, updatedPreviousColumn);
    //         }
      
    //         setColumns(updatedColumns);
    //       }
    //     }
    //   }
      
    //   function removeLastDivFromColumn(columnChildren) {
    //     const reversedChildren = React.Children.toArray(columnChildren).reverse();
    //     let updatedChildren = [...reversedChildren];
    //     let found = false;
      
    //     for (let i = 0; i < updatedChildren.length; i++) {
    //       const child = updatedChildren[i];
    //       if (child.props.className === 'pCapital' || child.props.className === 'bCapital') {
    //         updatedChildren.splice(i, 1);
    //         found = true;
    //         break;
    //       }
    //     }
      
    //     if (found) {
    //       updatedChildren = updatedChildren.reverse();
    //     }
      
    //     return updatedChildren;
    //   }
      
      
      



    // var lastSymbol = symbols[symbols.length - 1];

      
      

        
    // useEffect(() => {
    //     console.log(input,"PBPB")
    //     if (input.length > 3) {
    //       var symbols = input.split("");
    //       var length = symbols.length;
    //       var answer = "";
  
    //       if (symbols[length - 4] === symbols[length - 1]) {
    //         answer = symbols[length - 4 + 1];
    //       } else {
    //         answer = symbols[length - 4 + 1] === "B" ? "P" : "B";
    //       }
    //       setSuggestion(answer);
    //       setNewSuggestion(answer);
    //       console.log("ans ", answer);
    //     } else {
    //       setSuggestion("jfasdjl");
    //     }
    //   }, [input]);






    //   useEffect(() => {
    //     console.log(newSuggestion,input,"suggestion")
    //     // if(suggestion !===  )
 
    //   }, [newSuggestion])
      

    


        useEffect(() => {
            
          
            // console.log(answer,"dssdfafd",input)
            // if(answer != input.split("")[input.length-1]){
            //     console.log("dssdfafd")
            // }
          
        console.log(input,"PBPB")
        if (input.length > 3) {
            console.log(input,"previous input")
          var symbols = input.split("");
          var length = symbols.length;
          var answer = "";
          
          if (symbols[length - 4] === symbols[length - 1]) {
            answer = symbols[length - 4 + 1];
          } else {
            answer = symbols[length - 4 + 1] === "B" ? "P" : "B";
          }

          console.log(answer,"answer")
        if(answer != symbols[length -1]){
                console.log("dssdfafd","answer")
            }

          setSuggestion(answer);
          setNewSuggestion(answer);
          console.log("ans ", answer);
        }else {
                  setSuggestion("jfasdjl");
               } 
      }, [input]);

    
    

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
                        <button className="bottom-button">1000</button>
                        <button className="bottom-button">1000</button>

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



