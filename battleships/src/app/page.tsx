"use client";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";

var row: string[] = [" ", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

var col: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

export default function Home() {
  const [playerData, setPlayerData] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const [guess, setGuess] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const [enemyData, setEnemyData] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const [win, setWin] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/rnd")
      .then((res) => res.json())
      .then((data) => setPlayerData(data.board));

    fetch("http://localhost:8000/rnd")
      .then((res) => res.json())
      .then((data) => setEnemyData(data.board));
  }, []);

  async function check(row: any, col: any) {
    const data = {
      guess: guess,
      col: col,
      row: row,
      enemyBoard: enemyData,
    };
    axios.post("http://localhost:8000/player", data).then((response) => {
      setGuess(response.data.board);
      if (response.data.board[row][col] == 2) {
        enemyTurn();
      } else {
        const data2 = {
          board: response.data.board,
        };
        axios.post("http://localhost:8000/win", data2).then((response) => {
          if (response.data.result == true) {
            setWin("Player Won!");
          }
        });
      }
    });
  }

  async function enemyTurn() {
    const data = {
      playerBoard: playerData,
    };
    try {
      axios
        .post("http://localhost:8000/enemy", data)
        .then((response) => {
          setPlayerData(response.data.board);
          const data2 = {
            board: response.data.board,
          };
          axios.post("http://localhost:8000/win", data2).then((response) => {
            if (response.data.result == true) {
              setWin("Computer Won!");
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main>
      <div className="flex flex-col h-screen w-full bg1 items-center">
        <div className="... w-full basis-1/12 bg2"></div>
        <div className="... w-full basis-10/12 bg1 items-center">
          <div className="... w-full h-full flex flex-row justify-center items-center">
            <div className="... h-5/6 rounded-2xl w-full basis-4/12 bg2 items-center justify-center mx-4">
              <table width="440">
                <tbody>
                  <tr>
                    {row.map((item, index) => (
                      <td>{item}</td>
                    ))}
                  </tr>
                  {playerData.map((row, rowIndex) => (
                    <tr>
                      <td>{col[rowIndex]}</td>
                      {playerData[rowIndex].map((item, itemIndex) => (
                        <React.Fragment key={itemIndex}>
                          {item === 0 && <td className="sea"></td>}
                          {item === 1 && <td className="ship"></td>}
                          {item === 2 && <td className="sea">X</td>}
                          {item === 3 && <td className="destShip">X</td>}
                        </React.Fragment>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="... h-5/6 rounded-2xl w-full basis-4/12 bg2 items-center mx-4">
              <table width="440">
                <tbody>
                  <tr>
                    {row.map((item, index) => (
                      <td>{item}</td>
                    ))}
                  </tr>
                  {guess.map((row, rowIndex) => (
                    <tr>
                      <td>{col[rowIndex]}</td>
                      {guess[rowIndex].map((item, itemIndex) => (
                        <React.Fragment key={itemIndex}>
                          {item === 0 && (
                            <td className="sea">
                              <button
                                onClick={() => check(rowIndex, itemIndex)}
                              >
                                O
                              </button>
                            </td>
                          )}
                          {item === 2 && <td className="sea">X</td>}
                          {item === 3 && <td className="destShip">X</td>}
                        </React.Fragment>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="... h-5/6 rounded-2xl w-full basis-4/12 bg2 items-center justify-center mx-4">
              <h3>{win}</h3>
              <table width="440">
                <tbody>
                  <tr>
                    <td className="sea">
                      <button>O</button>
                    </td>
                    <td>Empty field that can be clicked</td>
                  </tr>
                  <tr>
                    <td className="sea"></td>
                    <td>Empty field</td>
                  </tr>
                  <tr>
                    <td className="sea">X</td>
                    <td>Missed field</td>
                  </tr>
                  <tr>
                    <td className="ship"></td>
                    <td>Healty ship tile</td>
                  </tr>
                  <tr>
                    <td className="destShip"></td>
                    <td>Destroyed ship tile</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="... w-full basis-1/12 bg2"></div>
      </div>
    </main>
  );
}
