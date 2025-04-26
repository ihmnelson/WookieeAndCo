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
    const [bingoBoard, setBingoBoard] = useState(Array(boardSize).fill().map(() => Array(boardSize).fill(false)));

    useEffect(() => {
        generateBoard();
    }, []);

    const generateBoard = () => {
        let shuffledActivities = [...activities].sort(() => Math.random() - 0.5);
        setBingoBoard(prevBoard => 
            prevBoard.map((row, i) =>
                row.map((_, j) => (i === 2 && j === 2 ? true : false))
            )
        );
    };

    const toggleCell = (i, j) => {
        if (i === 2 && j === 2) return;
        setBingoBoard(prevBoard => 
            prevBoard.map((row, rowIndex) =>
                row.map((cell, colIndex) => 
                    rowIndex === i && colIndex === j ? !cell : cell
                )
            )
        );
    };

    return (
        <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif", color: "grey" }}>
            <h2>🌳 Healthy Habbits Bingo 🚶‍♂️</h2>
            <div 
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${boardSize}, 120px)`,
                    gridTemplateRows: `repeat(${boardSize}, 120px)`, // Ensures rows match columns
                    gap: "15px", // Keeps equal spacing for both rows and columns
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
                                cursor: "pointer",
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
        </div>
    );
};

export default BingoGame;
