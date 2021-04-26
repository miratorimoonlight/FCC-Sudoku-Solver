const chai = require('chai');
const assert = chai.assert;

// const Solver = require('../controllers/sudoku-solver.js');
// let solver = new Solver();

const allFunctions = require('../allFunctionsForTesting');

suite('UnitTests', () => {
  suite('Puzzle Validation', function() {

    test('A valid puzzle string of 81 characters', function(){
      let reqInput = {
        body: {
          puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
        }
      };

      assert.equal(allFunctions.checkPuzzle(reqInput), true);
    })

    test('A puzzle string with invalid characters', function(){
      let reqInput = {
        body: {
          puzzle: 'A.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
        }
      };

      assert.deepEqual(
        allFunctions.checkPuzzle(reqInput), 
        { error: 'Invalid characters in puzzle' }
      );
    })

    test('A puzzle string not 81 char in length', function(){
      let reqInput = {
        body: {
          puzzle: '.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
        }
      };

      assert.deepEqual(
        allFunctions.checkPuzzle(reqInput), 
        { "error": "Expected puzzle to be 81 characters long" }
      );
    })

  })

  suite('Test on Placement functions', function() {

    test('A valid row placement', function() {
      let puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      
      assert.equal(allFunctions.checkRowPlacement(puzzle, 0, 0, 7), true);
    })  

    test('A INVALID row placement', function() {
      let puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      
      assert.equal(allFunctions.checkRowPlacement(puzzle, 0, 0, 9), false);
    })  

    test('A valid column placement', function() {
      let puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      
      assert.equal(allFunctions.checkColPlacement(puzzle, 0, 0, 7), true);
    })  

    test('A INVALID column placement', function() {
      let puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      
      assert.equal(allFunctions.checkColPlacement(puzzle, 0, 0, 6), false);
    })  

    test('A valid region (3x3 grid) placement', function() {
      let puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      
      assert.equal(allFunctions.checkRegionPlacement(puzzle, 0, 0, 7), true);
    })  

    test('A INVALID region (3x3 grid) placement', function() {
      let puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      
      assert.equal(allFunctions.checkRegionPlacement(puzzle, 0, 0, 9), false);
    })  

  })

  suite('Test on Solver Function', function() {

    test('Valid puzzle strings pass the solver', function() {
      let puzzle = '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51';
      
      let expectedResult = '827549163531672894649831527496157382218396475753284916962415738185763249374928651'

      assert.equal(allFunctions.solve(puzzle), expectedResult)
    })

    test('Invalid puzzle strings fail the solver', function() {
      let puzzle = '88..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51';
      
      assert.equal(allFunctions.solve(puzzle), false)
    })

    test('Solver returns the the expected solution for an incomplete puzzle', function() {
      let puzzle = '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51';
      let expectedResult = '827549163531672894649831527496157382218396475753284916962415738185763249374928651'

      assert.equal(allFunctions.solve(puzzle), expectedResult)
    })

  })

  
});
