/************* Code here... **************/

'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
const validator = require('../validator');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post(validator.checkPuzzle, validator.checkCheck, (req, res) => {
      let {puzzle, row, col, value} = req.body;
      let result = {valid: true, conflict: []};

      if(solver.checkRowPlacement(puzzle, row, col, value) == false) {
        result.valid = false;
        result.conflict.push("row");
      }
        
      if(solver.checkColPlacement(puzzle, row, col, value) == false) {
        result.valid = false;
        result.conflict.push("column");
      } 
        
      
      if(solver.checkRegionPlacement(puzzle, row, col, value) == false) {
        result.valid = false;
        result.conflict.push("region");
      }
        
      return res.send(result);

    });
    
  app.route('/api/solve')
    .post(validator.checkPuzzle, (req, res) => {
      const {puzzle} = req.body;
      let solvedPuzzleStr = solver.solve(puzzle);

      if(!solvedPuzzleStr)
        return res.send({ error: 'Puzzle cannot be solved' });
      else
        return res.send({ solution: solvedPuzzleStr });

    });
};
