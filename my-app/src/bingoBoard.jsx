import React, { useState, useEffect } from "react";

const activities = [
    "10 Jumping Jacks", "5 Push-ups", "10-min walk", "open blinds", "Run in place for 20s",
    "5 Squats", "10 High Knees", "Stretch for 30s", "10 Lunges", "5 Burpees",
    "Arm Circles for 20s", "10 Toe Touches", "5 Mountain Climbers", "Dance for 1 min", "Side Lunges x5",
    "15 Second Balance Hold", "10 Shoulder Rolls", "Deep Breathing for 20s", "5 Calf Raises", "Swing Arms x10",
    "5 Side Leg Raises", "10 Second Yoga Pose", "Jump Forward and Back 5x", "Walk in a Circle", "Shake Arms & Legs"
];

const boardSize = 5;

const BingoGame = () => {
    const [bingoBoard, setBingoBoard] = useState(
        Array(boardSize).fill().map((_, rowIndex) => 
            Array(boardSize).fill(false).map((cell, colIndex) => 
                rowIndex === 2 && colIndex === 2 ? true : cell // FREE SPACE stays true
            )
        )
    );
    const [showPopup, setShowPopup] = useState(false);
    const [completedBingos, setCompletedBingos] = useState(new Set());
    const [bingoCount, setBingoCount] = useState(0);
    const [singleBingoAchieved, setSingleBingoAchieved] = useState(false); // Tracks first bingo
    const [blackoutAchieved, setBlackoutAchieved] = useState(false); // Tracks blackout

    useEffect(() => {
        generateBoard();
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
        setSingleBingoAchieved(false);
        setBlackoutAchieved(false);
    };

    const checkWin = (board) => {
        let newBingos = new Set(completedBingos);
        let prevBingoCount = newBingos.size;
        let newBingoAchieved = false;

        for (let i = 0; i < boardSize; i++) {
            if (board[i].every(cell => cell)) newBingos.add(`row-${i}`);
            if (board.map(row => row[i]).every(cell => cell)) newBingos.add(`col-${i}`);
        }

        if (board.map((row, i) => row[i]).every(cell => cell)) newBingos.add("diag-1");
        if (board.map((row, i) => row[boardSize - 1 - i]).every(cell => cell)) newBingos.add("diag-2");

        // If a new bingo is found, increase the counter ONCE
        if (newBingos.size > prevBingoCount) {
            setShowPopup(true);
            setBingoCount(prevCount => prevCount + 1);
            setSingleBingoAchieved(true); // First bingo achieved
        }

        setCompletedBingos(newBingos);

        // Check if all squares are true for blackout
        if (board.every(row => row.every(cell => cell))) {
            setBlackoutAchieved(true);
        }
    };

    const toggleCell = (i, j) => {
        if (i === 2 && j === 2) return; // Prevent changing FREE SPACE
        if (bingoBoard[i][j]) return; // Prevent toggling back to false

        setBingoBoard(prevBoard => {
            const newBoard = prevBoard.map((row, rowIndex) =>
                row.map((cell, colIndex) => rowIndex === i && colIndex === j ? true : cell)
            );
            checkWin(newBoard);
            return newBoard;
        });
    };

    return (
        <div style={{ textAlign: "center", padding: "80px", fontFamily: "Arial, sans-serif", color: "black", backgroundColor: "#d3dee6" }}>
            <h2 style={{ fontSize: "32px", marginTop: "-55px" }}>🌳 Healthy Habbits Bingo 🚶‍♂️</h2>

            <div 
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${boardSize}, 120px)`,
                    gridTemplateRows: `repeat(${boardSize}, 120px)`,
                    gap: "15px",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "20px"
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
                                transition: "all 0.3s ease-in-out"
                            }}
                            className={i === 2 && j === 2 ? "center-cell" : ""}
                        >
                            {i === 2 && j === 2 ? "FREE SPACE" : activities[i * boardSize + j]}
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
