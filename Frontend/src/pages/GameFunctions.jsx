import React, { useState, useEffect } from "react";
import activities from '../assets/challenges.json';
import { Link } from 'react-router-dom'; // Import Link

const boardSize = 5;

const BingoGame = () => {
  const [bingoBoardData, setBingoBoardData] = useState(
    Array(boardSize).fill().map(() => Array(boardSize).fill(''))
  );
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
  const [blackoutAchieved, setBlackoutAchieved] = useState(false);

  const smallButtonStyle = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    padding: '0.5rem 1rem',
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#ffffff',
    backgroundColor: '#5b4f6e',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    zIndex: 10, // Ensure it's above other elements
  };

  const smallButtonHoverStyle = {
    backgroundColor: '#44395a',
  };

  useEffect(() => {
    generateBoard();

    // Apply styles to body to prevent scrolling and set background
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
    const shuffledActivities = [...activities].sort(() => 0.5 - Math.random());
    const newBoardData = Array(boardSize).fill().map((_, rowIndex) =>
      Array(boardSize).fill('').map((_, colIndex) => {
        if (rowIndex === 2 && colIndex === 2) {
          return "FREE SPACE";
        }
        const index = rowIndex * boardSize + colIndex;
        return shuffledActivities[index >= shuffledActivities.length ? Math.floor(Math.random() * shuffledActivities.length) : index];
      })
    );
    setBingoBoardData(newBoardData);
    setBingoBoard(
      Array(boardSize).fill().map((_, rowIndex) =>
        Array(boardSize).fill(false).map((cell, colIndex) =>
          rowIndex === 2 && colIndex === 2 ? true : cell
        )
      )
    );
    setCompletedBingos(new Set());
    setBingoCount(0);
    setBlackoutAchieved(false);
    setShowPopup(false); // Ensure popup is closed on new board
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
      setBingoCount(prevCount => prevCount + (newBingos.size - prevBingoCount));
    }

    setCompletedBingos(newBingos);

    if (board.every(row => row.every(cell => cell))) {
      setBlackoutAchieved(true);
      setShowPopup(true); // Show blackout popup
    }
  };

  const toggleCell = (i, j) => {
    if (i === 2 && j === 2) return; // Prevent toggling the free space
    if (bingoBoard[i][j]) return; // If the cell is already true, do nothing

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
      position: 'relative', // Make this relative to position the absolute button
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh', // Ensure it covers the viewport height
      backgroundImage: `
        linear-gradient(90deg, #d3dee6 25%, transparent 25%, transparent 75%, #d3dee6 75%),
        linear-gradient(#d3dee6 25%, transparent 25%, transparent 75%, #d3dee6 75%)
      `,
      backgroundSize: '516px 516px',
      backgroundPosition: '0 0, 200px 200px',
      backgroundColor: '#e6ecef',
      padding: '20px', // Add some padding around the content
      boxSizing: 'border-box', // Include padding in the element's total width and height
    }}>
      {/* Small search button */}
      <Link to="/user-search">
        <button
          style={smallButtonStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = smallButtonHoverStyle.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = smallButtonStyle.backgroundColor}
        >
          Search Users
        </button>
      </Link>

      <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>
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
          marginBottom: "20px"
        }}
      >
        {bingoBoardData.map((row, i) =>
          row.map((text, j) => (
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
                cursor: i === 2 && j === 2 ? "default" : "pointer",
                textAlign: "center",
                fontSize: "16px",
                fontWeight: "bold",
                backgroundColor: bingoBoard[i][j] ? "#7194f0" : "#280732",
                color: "white",
                borderRadius: "10px",
                transition: "all 0.3s ease-in-out",
              }}
              className={i === 2 && j === 2 ? "center-cell" : ""}
            >
              <span style={{ padding: "5px" }}>{text}</span>
            </div>
          ))
        )}
      </div>

      {showPopup && !blackoutAchieved && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          textAlign: "center",
          borderRadius: "10px",
          zIndex: 10
        }}>
          <h2>Bingo! 🎉</h2>
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
          borderRadius: "10px",
          zIndex: 10
        }}>
          <h2>Blackout Achieved! 🏆</h2>
          <button onClick={() => setBlackoutAchieved(false)} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
            Okay
          </button>
        </div>
      )}

      <p style={{ marginTop: "20px", fontSize: "18px", fontWeight: "bold", color: "black" }}>
        Number of bingos: {completedBingos.size}
      </p>

      <button onClick={generateBoard} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer", marginTop: "10px" }}>
        New Board
      </button>
    </div>
  );
};

export default BingoGame;