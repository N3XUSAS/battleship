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

  useEffect(() => {
    Randomize();
  }, []);

  async function Randomize() {
    fetch("http://localhost:8000/rnd")
      .then((res) => res.json())
      .then((data) => setPlayerData(data.board));
  }

  function change(row: number, col: number) {
    const temp = [...playerData.map((row) => [...row])];
    if (temp[row][col] == 0) {
      temp[row][col] = 1;
    } else {
      temp[row][col] = 0;
    }

    setPlayerData(temp);
    console.log(playerData);
  }

  return (
    <main>
      <div className="flex flex-col h-screen w-full bg1 items-center">
        <div className="... w-full basis-1/12 bg2"></div>
        <div className="... w-full basis-10/12 bg1 items-center">
          <div className="... w-full h-full flex flex-row justify-center items-center">
            <div className="... h-5/6 rounded-2xl w-full basis-6/12 bg2 items-center justify-center mx-4 flex flex-col">
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
                        </React.Fragment>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="... h-5/6 rounded-2xl w-full basis-6/12 bg2 items-center mx-4 flex flex-col">
              <br></br>
              <h3>Welcome to Battleship board game!</h3>
              <p>
                Objective of this board game is to destroy all enemy ships
                before opponent destroys yours
              </p>
              <table width="440">
                <tbody>
                  <tr>
                    <td className="sea"></td>
                    <td>Empty field</td>
                  </tr>
                  <tr>
                    <td className="ship"></td>
                    <td>Ship tile</td>
                  </tr>
                </tbody>
              </table>
              <button className="UIButton" onClick={() => Randomize()}>
                Randomize
              </button>
              <button className="UIButton">Start</button>
            </div>
          </div>
        </div>
        <div className="... w-full basis-1/12 bg2"></div>
      </div>
    </main>
  );
}
