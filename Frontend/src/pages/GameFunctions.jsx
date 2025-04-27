import React, { useState, useEffect } from "react";
import activities from '../assets/challenges.json';

const boardSize = 5;

const BingoGame = () => {
    const [bingoBoard, setBingoBoard] = useState(
        Array(boardSize).fill().map((_, rowIndex) => 
            Array(boardSize).fill(false).map((cell, colIndex) => 
                rowIndex === 2 && colIndex === 2 ? true : cell
            )
        )
    );
    const [showPopup, setShowPopup] = useState(false);
    const [completedBingos, setCompletedBingos] = useState(new Set());
    const [bingoCount, setBingoCount] = useState(0);
    // const [singleBingoAchieved, setSingleBingoAchieved] = useState(false);
    const [blackoutAchieved, setBlackoutAchieved] = useState(false);

    useEffect(() => {
        generateBoard();

        // Fully prevent scrolling
        document.documentElement.style.height = "100%";
        document.body.style.height = "100%";
        document.body.style.overflow = "hidden";
        document.body.style.margin = "0";
        document.body.style.padding = "0";
        document.body.style.backgroundColor = "#e6ecef";

        return () => {
            // Reset when component unmounts
            document.documentElement.style.height = "";
            document.body.style.height = "";
            document.body.style.overflow = "";
            document.body.style.margin = "";
            document.body.style.padding = "";
            document.body.style.backgroundColor = "";
        };
    }, []);

    const generateBoard = () => {
        setBingoBoard(
            Array(boardSize).fill().map((_, rowIndex) => 
                Array(boardSize).fill(false).map((cell, colIndex) => 
                    rowIndex === 2 && colIndex === 2 ? true : cell
                )
            )
        );
        setCompletedBingos(new Set());
        setBingoCount(0);
        // setSingleBingoAchieved(false);
        setBlackoutAchieved(false);
    };

    const checkWin = (board) => {
        let newBingos = new Set(completedBingos);
        let prevBingoCount = newBingos.size;

        for (let i = 0; i < boardSize; i++) {
            if (board[i].every(cell => cell)) newBingos.add(`row-${i}`);
            if (board.map(row => row[i]).every(cell => cell)) newBingos.add(`col-${i}`);
        }

        if (board.map((row, i) => row[i]).every(cell => cell)) newBingos.add("diag-1");
        if (board.map((row, i) => row[boardSize - 1 - i]).every(cell => cell)) newBingos.add("diag-2");

        if (newBingos.size > prevBingoCount) {
            setShowPopup(true);
            setBingoCount(prevCount => prevCount + 1);
            // setSingleBingoAchieved(true);
        }

        setCompletedBingos(newBingos);

        if (board.every(row => row.every(cell => cell))) {
            setBlackoutAchieved(true);
        }
    };

    const toggleCell = (i, j) => {
        if (i === 2 && j === 2) return;
        if (bingoBoard[i][j]) return;

        setBingoBoard(prevBoard => {
            const newBoard = prevBoard.map((row, rowIndex) =>
                row.map((cell, colIndex) => rowIndex === i && colIndex === j ? true : cell)
            );
            checkWin(newBoard);
            return newBoard;
        });
    };

    return (
        <div style={{ 
            minHeight: "100vh", 
            textAlign: "center", 
            padding: "00px", 
            fontFamily: "Arial, sans-serif", 
            color: "black",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center", // Center all content nicely
            backgroundImage: `
                linear-gradient(90deg, #d3dee6 25%, transparent 25%, transparent 75%, #d3dee6 75%),
                linear-gradient(#d3dee6 25%, transparent 25%, transparent 75%, #d3dee6 75%)
            `,
            backgroundSize: '516px 516px',
            backgroundPosition: '0 0, 200px 200px', 
            backgroundColor: '#e6ecef', // Added checkerboard background
        }}>
            <h2 style={{ fontSize: "32px", marginTop: "-175px" }}>
                🌳 Healthy Habits Bingo 🚶‍♂️
            </h2>

            <div 
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${boardSize}, 120px)`,
                    gridTemplateRows: `repeat(${boardSize}, 120px)`,
                    gap: "15px",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "-15px"
                }}
            >
                {bingoBoard.map((row, i) =>
                    row.map((cell, j) => (
                        <div
                            key={`${i}-${j}`}
                            onClick={() => toggleCell(i, j)}
                            style={{
                                width: "120px",
                                height: "120px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "4px solid #5b4f6e",
                                cursor: cell ? "default" : "pointer",
                                textAlign: "center",
                                fontSize: "16px",
                                fontWeight: "bold",
                                backgroundColor: cell ? "#7194f0" : "#280732",
                                color: "white",
                                borderRadius: "10px",
                                transition: "all 0.3s ease-in-out",
                            }}
                            className={i === 2 && j === 2 ? "center-cell" : ""}
                        >
                            <span style={{ padding: "5px" }}> {/* Added padding to the text */}
                                {i === 2 && j === 2 ? "FREE SPACE" : activities[i * boardSize + j]}
                            </span>
                        </div>
                    ))
                )}
            </div>

            {showPopup && (
                <div style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "white",
                    padding: "20px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    textAlign: "center",
                    borderRadius: "10px"
                }}>
                    <h2>Good Job! 🎉</h2>
                    <button onClick={() => setShowPopup(false)} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
                        Okay
                    </button>
                </div>
            )}

            {blackoutAchieved && (
                <div style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "white",
                    padding: "20px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    textAlign: "center",
                    borderRadius: "10px"
                }}>
                    <h2>Good Job Completing the Blackout! 🏆</h2>
                    <button onClick={() => setBlackoutAchieved(false)} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
                        Okay
                    </button>
                </div>
            )}

            <p style={{ marginTop: "20px", fontSize: "18px", fontWeight: "bold", color: "black" }}>
                Number of bingos today: {bingoCount / 2}
            </p>
        </div>
    );
};

export default BingoGame;