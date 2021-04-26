/************* Code here... **************/

const sudoku = require("sudokutoolcollection");

class SudokuSolver {

  validate(puzzleString) {
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let puzzleGrid = this.convertStrToGrid(puzzleString);

    //to Satisfy FCC test case only
    if (puzzleGrid[row][column] != 0 && puzzleGrid[row][column] == value)
      return true

    //if there's the same value in the row, return false (cannot put value there)
    for (let i = 0; i <=8; i++)
      if(puzzleGrid[row][i] == value) return false;

    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let puzzleGrid = this.convertStrToGrid(puzzleString);

    //to Satisfy FCC test case only
    if (puzzleGrid[row][column] != 0 && puzzleGrid[row][column] == value)
      return true

    //if there's the same value in the col, return false (cannot put value there)
    for (let i = 0; i <=8; i++) 
      if(puzzleGrid[i][column] == value) return false;
      

    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
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
  }

  solve(puzzleString) {
    let result = sudoku().solver.solve(puzzleString);    

    return result; //as a string
  }

  convertStrToGrid(puzzleString) {
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

module.exports = SudokuSolver;

