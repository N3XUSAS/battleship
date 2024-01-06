const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/rnd", (req, res) => {
  var board = [
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
  ];

  var locations = [];
  var line = [];
  var dir = direction();
  var row = 0;
  var col = 0;
  //one 5 tile ship
  if (dir == 0) {
    row = random(10);
    col = random(6);
    for (i = col; i <= col + 4; i++) {
      board[row][i] = 1;
      line.push(row);
      line.push(i);
    }
  } else {
    row = random(6);
    col = random(10);
    for (i = row; i <= row + 4; i++) {
      board[i][col] = 1;
      line.push(i);
      line.push(col);
    }
  }
  locations.push(line);
  line = [];

  // one 4 tile ship
  var flag = true;
  while (flag == true) {
    dir = direction();
    if (dir == 0) {
      row = random(10);
      col = random(7);
      if (check(row, col, dir, 4, board) == true) {
        for (i = col; i <= col + 3; i++) {
          board[row][i] = 1;
          line.push(row);
          line.push(i);
        }
        flag = false;
      }
    } else {
      row = random(7);
      col = random(10);
      if (check(row, col, dir, 4, board) == true) {
        for (i = row; i <= row + 3; i++) {
          board[i][col] = 1;
          line.push(i);
          line.push(col);
        }
        flag = false;
      }
    }
  }
  locations.push(line);
  line = [];

  //two 3 tile ships

  for (y = 0; y < 2; y++) {
    var flag = true;
    while (flag == true) {
      dir = direction();
      if (dir == 0) {
        row = random(10);
        col = random(8);
        if (check(row, col, dir, 3, board) == true) {
          for (i = col; i <= col + 2; i++) {
            board[row][i] = 1;
            line.push(row);
            line.push(i);
          }
          flag = false;
        }
      } else {
        row = random(8);
        col = random(10);
        if (check(row, col, dir, 3, board) == true) {
          for (i = row; i <= row + 2; i++) {
            board[i][col] = 1;
            line.push(i);
            line.push(col);
          }
          flag = false;
        }
      }
    }
    locations.push(line);
    line = [];
  }

  //three 2 tile ships

  for (y = 0; y < 3; y++) {
    var flag = true;
    while (flag == true) {
      dir = direction();
      if (dir == 0) {
        row = random(10);
        col = random(9);
        if (check(row, col, dir, 2, board) == true) {
          for (i = col; i <= col + 1; i++) {
            board[row][i] = 1;
            line.push(row);
            line.push(i);
          }
          flag = false;
        }
      } else {
        row = random(9);
        col = random(10);
        if (check(row, col, dir, 2, board) == true) {
          for (i = row; i <= row + 1; i++) {
            board[i][col] = 1;
            line.push(i);
            line.push(col);
          }
          flag = false;
        }
      }
    }
    locations.push(line);
    line = [];
  }

  //three 1 tile ships

  for (y = 0; y < 3; y++) {
    var flag = true;
    while (flag == true) {
      dir = direction();
      if (dir == 0) {
        row = random(10);
        col = random(10);
        if (check(row, col, dir, 1, board) == true) {
          board[row][col] = 1;
          line.push(row);
          line.push(col);
          flag = false;
        }
      }
    }
    locations.push(line);
    line = [];
  }

  console.log(locations);

  res.json({ board: board, location: locations });
});

app.post("/player", (req, res) => {
  var guess = req.body.guess;
  var col = req.body.col;
  var row = req.body.row;
  var enemyBoard = req.body.enemyBoard;
  var locations = req.body.enemyLocations;

  if (enemyBoard[row][col] == 1) {
    guess[row][col] = 3;
  } else if (enemyBoard[row][col] == 0) {
    guess[row][col] = 2;
  }

  for (i = 0; i < 10; i++) {
    var cnt = 0;
    for (y = 0; y < locations[i].length - 1; y += 2) {
      if (guess[locations[i][y]][locations[i][y + 1]] === 3) {
        cnt++;
      }
    }
    if (cnt === locations[i].length / 2) {
      for (y = 0; y < locations[i].length; y += 2) {
        guess[locations[i][y]][locations[i][y + 1]] = 4;
      }
    }
  }

  res.json({ board: guess });
});

app.post("/enemy", (req, res) => {
  var playerBoard = req.body.playerBoard;
  var locations = req.body.playerLocations;
  var flag = true;
  var hit = false;
  var lastRow = -1;
  var lastCol = -1;
  while (flag == true) {
    var row;
    var col;
    if (hit === false) {
      row = random(10);
      col = random(10);
    } else {
      var rnd = Math.floor(Math.random() * -3) + 2;
      while (
        rnd === 0 ||
        lastCol + rnd < 0 ||
        lastCol + rnd > 9 ||
        lastRow + rnd < 0 ||
        lastRow + rnd > 9
      ) {
        rnd = Math.floor(Math.random() * -3) + 2;
      }
      var dir = direction();
      if (dir == 0) {
        col = lastCol + rnd;
      } else {
        row = lastRow + rnd;
      }
    }
    if (playerBoard[row][col] != 2 && playerBoard[row][col] != 3) {
      if (playerBoard[row][col] == 0) {
        playerBoard[row][col] = 2;
        flag = false;
      } else {
        playerBoard[row][col] = 3;
        hit = true;
        lastRow = row;
        lastCol = col;
      }
    }
  }

  for (i = 0; i < 10; i++) {
    var cnt = 0;
    for (y = 0; y < locations[i].length - 1; y += 2) {
      if (playerBoard[locations[i][y]][locations[i][y + 1]] === 3) {
        cnt++;
      }
    }
    if (cnt === locations[i].length / 2) {
      for (y = 0; y < locations[i].length - 1; y += 2) {
        console.log("got");
        playerBoard[locations[i][y]][locations[i][y + 1]] = 4;
      }
    }
  }
  res.json({ board: playerBoard });
});

app.post("/win", (req, res) => {
  var board = req.body.board;
  var result = false;
  var cnt = 0;
  for (i = 0; i < 10; i++) {
    for (y = 0; y < 10; y++) {
      if (board[i][y] == 4) {
        cnt += 1;
      }
    }
  }
  if (cnt == 24) {
    result = true;
  }
  res.json({ result: result });
});

function change(board, locations, row) {
  console.log(row);
  for (i = 0; i < locations[row] / 2; i += 2) {
    board[locations[row][i]][locations[row][i + 1]] == 4;
    console.log(locations[row][i], locations[row][i + 1]);
  }
  return board;
}

function direction() {
  //0 = horizontal
  //1 = vertical
  return Math.floor(Math.random() * 2);
}

function random(num) {
  return Math.floor(Math.random() * num);
}

function check(row, col, dir, len, board) {
  var flag = true;
  if (dir == 0) {
    for (i = col; i <= col + len - 1; i++) {
      if (i > 0 && board[row][i - 1] == 1) {
        flag = false;
      }
      if (i < 9 && board[row][i + 1] == 1) {
        flag = false;
      }
      if (row > 0 && board[row - 1][i] == 1) {
        flag = false;
      }
      if (row < 9 && board[row + 1][i] == 1) {
        flag = false;
      }
      if (i > 0 && row > 0 && board[row - 1][i - 1] == 1) {
        flag = false;
      }
      if (i > 0 && row < 9 && board[row + 1][i - 1] == 1) {
        flag = false;
      }
      if (i < 9 && row > 0 && board[row - 1][i + 1] == 1) {
        flag = false;
      }
      if (i < 9 && row < 9 && board[row + 1][i + 1] == 1) {
        flag = false;
      }
      if (board[row][i] == 1) {
        flag = false;
      }
    }
  } else {
    for (i = row; i <= row + len - 1; i++) {
      if (col > 0 && board[i][col - 1] == 1) {
        flag = false;
      }
      if (col < 9 && board[i][col + 1] == 1) {
        flag = false;
      }
      if (i > 0 && board[i - 1][col] == 1) {
        flag = false;
      }
      if (i < 9 && board[i + 1][col] == 1) {
        flag = false;
      }
      if (col > 0 && i > 0 && board[i - 1][col - 1] == 1) {
        flag = false;
      }
      if (col > 0 && i < 9 && board[i + 1][col - 1] == 1) {
        flag = false;
      }
      if (col < 9 && i > 0 && board[i - 1][col + 1] == 1) {
        flag = false;
      }
      if (col < 9 && i < 9 && board[i + 1][col + 1] == 1) {
        flag = false;
      }
      if (board[row][i] == 1) {
        flag = false;
      }
    }
  }
  return flag;
}

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
