'use strict';

describe('myApp.sudoku module', function() {
  beforeEach(module('myApp.sudoku'));

  describe('sudoku service', function() {

    let sudokuEmpty = [
        [5,3, , ,7, , , , ,],
        [6, , ,1,9,5, , , ,],
        [ ,9,8, , , , ,6, ,],
        [8, , , ,6, , , ,3],
        [4, , ,8, ,3, , ,1],
        [7, , , ,2, , , ,6],
        [ ,6, , , , ,2,8, ,],
        [ , , ,4,1,9, , ,5],
        [ , , , ,8, , ,7,9]
    ];

    let sudokuSolved = [
        [5,3,4,6,7,8,9,1,2],
        [6,7,2,1,9,5,3,4,8],
        [1,9,8,3,4,2,5,6,7],
        [8,5,9,7,6,1,4,2,3],
        [4,2,6,8,5,3,7,9,1],
        [7,1,3,9,2,4,8,5,6],
        [9,6,1,5,3,7,2,8,4],
        [2,8,7,4,1,9,6,3,5],
        [3,4,5,2,8,6,1,7,9]
    ]

    let sudokuWrong = [
        [5,3,4,6,7,8,9,1,2],
        [6,7,2,1,9,5,3,4,8],
        [1,9,8,3,4,2,5,6,7],
        [8,5,9,7,6,1,4,2,3],
        [4,2,6,8,5,3,7,9,1],
        [7,1,3,9,2,4,8,5,6],
        [9,6,1,5,3,7,2,8,4],
        [2,8,7,4,1,9,6,3,5],
        [3,4,5,2,8,6,1,7,1] // last digit 9 replaced with 1
    ]

    it('should tell the empty sudoku is not solved', inject(function(sudoku, helpers) {
        expect(sudoku.check(helpers.formatData(sudokuEmpty))).toEqual(false);
    }));

    it('should tell the solved sudoku is solved', inject(function(sudoku, helpers) {
        expect(sudoku.check(helpers.formatData(sudokuSolved))).toEqual(true);
    }));

    it('should tell the empty wrong is not solved', inject(function(sudoku, helpers) {
        expect(sudoku.check(helpers.formatData(sudokuWrong))).toEqual(false);
    }));

  });
});
