const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/rnd", (req, res) => {
  var board = [
    [2, 3, 0, 0, 0, 0, 0, 0, 0, 0],
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
  var dir = direction();
  var row = 0;
  var col = 0;
  //one 5 tile ship
  if (dir == 0) {
    row = random(10);
    col = random(6);
    for (i = col; i <= col + 4; i++) {
      board[row][i] = 1;
    }
  } else {
    row = random(6);
    col = random(10);
    for (i = row; i <= row + 4; i++) {
      board[i][col] = 1;
    }
  }

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
        }
        flag = false;
      }
    } else {
      row = random(7);
      col = random(10);
      if (check(row, col, dir, 4, board) == true) {
        for (i = row; i <= row + 3; i++) {
          board[i][col] = 1;
        }
        flag = false;
      }
    }
  }

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
          }
          flag = false;
        }
      } else {
        row = random(8);
        col = random(10);
        if (check(row, col, dir, 3, board) == true) {
          for (i = row; i <= row + 2; i++) {
            board[i][col] = 1;
          }
          flag = false;
        }
      }
    }
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
          }
          flag = false;
        }
      } else {
        row = random(9);
        col = random(10);
        if (check(row, col, dir, 2, board) == true) {
          for (i = row; i <= row + 1; i++) {
            board[i][col] = 1;
          }
          flag = false;
        }
      }
    }
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
          flag = false;
        }
      }
    }
  }

  res.json({ board: board });
});

app.post("/check", (req, res) => {
  var playerBoard = req.body.playerBoard;
  var col = req.body.col;
  var row = req.body.row;
  var enemyBoard = req.body.enemyBoard;

  console.log(req.body);

  if (enemyBoard[row][col] == 1) {
    playerBoard[row][col] = 3;
  } else if (enemyBoard[row][col] == 0) {
    playerBoard[row][col] = 2;
  }

  res.json({ board: playerBoard });
});

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
