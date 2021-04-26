const sudoku = require("sudokutoolcollection");

module.exports = {
  /********** Func from validator.js *********/
  checkCheck: (req) => {
    const {coordinate, value} = req.body;

    if (!coordinate || !value) 
      return { error: 'Required field(s) missing' };

    //check coordinate
    if (coordinate.length != 2) 
      return { error: 'Invalid coordinate' };

    //assign the splitted coord to 2 diff variables
    let [row, col] = coordinate.split('');
    
    switch(row.toLowerCase()){
      case 'a': req.body.row = 0; break;
      case 'b': req.body.row = 1; break;
      case 'c': req.body.row = 2; break;
      case 'd': req.body.row = 3; break;
      case 'e': req.body.row = 4; break;
      case 'f': req.body.row = 5; break;
      case 'g': req.body.row = 6; break;
      case 'h': req.body.row = 7; break;
      case 'i': req.body.row = 8; break;
      default: return { error: 'Invalid coordinate' };
    }

    if (!/^[1-9]$/.test(col))
      return { error: 'Invalid coordinate' };
    
    //if no error to col, add it to the req.body (+ cast it to number)
    req.body.col = +col - 1;

    console.log("row col", row, " ", col);
    console.log("value..", value);

    if (!/^[1-9]$/.test(value))
      return { error: 'Invalid value' };

    return true;
  },

  /********** Func from validator.js *********/
  checkPuzzle: (req) => {
    const {puzzle} = req.body;
  
    if(!puzzle) 
      return { error: 'Required field missing' };

    if(puzzle.length != 81) 
      return { error: 'Expected puzzle to be 81 characters long' };

    if(/[^0-9.]/g.test(puzzle))
      return { error: 'Invalid characters in puzzle' };

    return true;
  },

  /********** Func from sudoku-solver.js *********/
  checkRowPlacement: function (puzzleString, row, column, value) {
    let puzzleGrid = this.convertStrToGrid(puzzleString);

    //to Satisfy FCC test case only
    if (puzzleGrid[row][column] != 0 && puzzleGrid[row][column] == value)
      return true

    //if there's the same value in the row, return false (cannot put value there)
    for (let i = 0; i <=8; i++)
      if(puzzleGrid[row][i] == value) return false;

    return true;
  },

  /********** Func from sudoku-solver.js *********/
  checkColPlacement: function (puzzleString, row, column, value) {
    let puzzleGrid = this.convertStrToGrid(puzzleString);

    //to Satisfy FCC test case only
    if (puzzleGrid[row][column] != 0 && puzzleGrid[row][column] == value)
      return true

    //if there's the same value in the col, return false (cannot put value there)
    for (let i = 0; i <=8; i++) 
      if(puzzleGrid[i][column] == value) return false;
      

    return true;
  },

  /********** Func from sudoku-solver.js *********/
  checkRegionPlacement: function (puzzleString, row, column, value) {
    let puzzleGrid = this.convertStrToGrid(puzzleString);

    //to Satisfy FCC test case only
    if (puzzleGrid[row][column] != 0 && puzzleGrid[row][column] == value)
      return true

    let startRow = row - row % 3;
    let startCol = column - column % 3;

    for(let i = 0; i <= 2; i++)
      for(let j = 0; j <=2; j++)
        if(puzzleGrid[i + startRow][j + startCol] == value)
          return false
    
    return true
  },

  /********** Func from sudoku-solver.js *********/
  solve: function (puzzleString) {
    let result = sudoku().solver.solve(puzzleString);    

    return result; //as a string
  },

  /********** Func from sudoku-solver.js *********/
  convertStrToGrid: (puzzleString) => {
    let grid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    let row = -1;
    let col = 0;

    for (let i = 0; i < puzzleString.length; i++) {
      //if reach the char at position 9 or 18 or sth, enter a new row
      if (i % 9 == 0)
        row++

      //if col is at position 9 or 18 or sth, get col back to position 0
      if (col % 9 == 0)
        col = 0;

      grid[row][col] = puzzleString[i] == '.' ? 0 : +puzzleString[i];
      col++;
    }

    return grid;
  }

}