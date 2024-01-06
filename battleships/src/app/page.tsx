"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

var row: string[] = [" ", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

var col: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

export default function Home() {
  const router = useRouter();
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

  const [playerLocations, setPlayerLocations] = useState([[]]);

  useEffect(() => {
    Randomize();
  }, []);

  async function Randomize() {
    fetch("http://localhost:8000/rnd")
      .then((res) => res.json())
      .then((data) => {
        setPlayerData(data.board);
        setPlayerLocations(data.location);
      });
  }

  function Start() {
    localStorage.setItem("board", JSON.stringify(playerData));
    localStorage.setItem("location", JSON.stringify(playerLocations));
    router.push("/game");
  }

  return (
    <main>
      <div className="flex flex-col h-screen w-full bg1 items-center">
        <div className="... w-full basis-1/12 bg2 flex flex-col justify-center">
          <h2>Battleship Borad Game</h2>
        </div>
        <div className="... w-full basis-10/12 bg1 items-center">
          <div className="... w-full h-full flex flex-row justify-center items-center">
            <div className="... h-5/6 rounded-2xl w-full basis-4/12 bg2 items-center justify-center mx-4 flex flex-col">
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
            <div className="... h-5/6 rounded-2xl w-full basis-8/12 bg2 items-center mx-4 flex flex-col">
              <br></br>
              <h3>Welcome to Battleship board game!</h3>
              <p>
                Objective of this board game is to destroy all enemy ships
                before opponent destroys yours
              </p>
              <p>
                Every turn player chose a tile to attack. If atack hit water
                opponent takes a turn. If player or opponent hit a ship he can
                take another turn.
              </p>
              <br></br>
              <table className="legendStart">
                <tbody>
                  <tr>
                    <td className="sea" width="13%"></td>
                    <td>Empty field</td>
                  </tr>
                  <tr>
                    <td className="ship"></td>
                    <td>Ship tile</td>
                  </tr>
                </tbody>
              </table>
              <br></br>
              <p>If you want to change formation click "Randomize" button</p>
              <p>If you are ready press "Start" button</p>
              <br></br>
              <button className="UIButton" onClick={() => Randomize()}>
                Randomize
              </button>
              <button className="UIButton" onClick={() => Start()}>
                Start
              </button>
            </div>
          </div>
        </div>
        <div className="... w-full basis-1/12 bg2 flex flex-col justify-center items-center">
          <p>Simonas Nalivaika 2024m.</p>
        </div>
      </div>
    </main>
  );
}
