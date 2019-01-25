angular.module('myApp.sudoku', [])
  
  .service('sudoku', [function() {
    let service = {};

    let size = 9; // more readable than `sudoku.length` 

    service.getRandom = () => {
      // TODO... :)
      // return [
      //   [5,3, , ,7, , , , ,], // trailing commas and `empty` values (something different than `undefined`)
      //   [6, , ,1,9,5, , , ,],
      //   [ ,9,8, , , , ,6, ,],
      //   [8, , , ,6, , , ,3],
      //   [4, , ,8, ,3, , ,1],
      //   [7, , , ,2, , , ,6],
      //   [ ,6, , , , ,2,8, ,],
      //   [ , , ,4,1,9, , ,5],
      //   [ , , , ,8, , ,7,9]
      // ];

      return [
        [5,3,4,6,7,8,9,1,2],
        [6,7,2,1,9,5,3,4,8],
        [1,9,8,3,4,2,5,6,7],
        [8,5,9,7,6,1,4,2,3],
        [4,2,6,8,5,3,7,9,1],
        [7,1,3,9,2,4,8,5,6],
        [9,6,1,5,3,7,2,8,4],
        [2,8,7,4,1,9,6,3,5],
        [3,4,5,2,8,6,1,7,9]
      ];
    }

    service.check = (sudoku) => {

      // Checking rows and columns in the same loop
      for (let i=0; i<size; i++) {
        let rowSet = new Set();
        let colSet = new Set();
        for (let j=0; j<size; j++) {
          if (!sudoku[i][j] || !sudoku[i][j].digit) return false; // no digit, instant return
          if (!sudoku[j][i] || !sudoku[j][i].digit) return false;
          
          rowSet.add(sudoku[i][j].digit);
          colSet.add(sudoku[j][i].digit);
        }
        if (rowSet.size !== size) return false; // do not have 9 unique elements, elements are not unique, sudoku not solved.
        if (colSet.size !== size) return false;
      }    

      // Checking rows and columns is easy, checking if there is an easy way of checking 3x3 boxes?
      // https://stackoverflow.com/questions/289537/a-cool-algorithm-to-check-a-sudoku-field
      // Nope, I think I need to define the boxes manually
      let boxes = [
        [[0,0], [0,1], [0,2], [1,0], [1,1], [1,2], [2,0], [2,1], [2,2]],
        [[0,3], [0,4], [0,5], [1,3], [1,4], [1,5], [2,3], [2,4], [2,5]],
        [[0,6], [0,7], [0,8], [1,6], [1,7], [1,8], [2,6], [2,7], [2,8]],
        [[3,0], [3,1], [3,2], [4,0], [4,1], [4,2], [5,0], [5,1], [5,2]],
        [[3,3], [3,4], [3,5], [4,3], [4,4], [4,5], [5,3], [5,4], [5,5]],
        [[3,6], [3,7], [3,8], [4,6], [4,7], [4,8], [5,6], [5,7], [5,8]],
        [[6,0], [6,1], [6,2], [7,0], [7,1], [7,2], [8,0], [8,1], [8,2]],
        [[6,3], [6,4], [6,5], [7,3], [7,4], [7,5], [8,3], [8,4], [8,5]],
        [[6,6], [6,7], [6,8], [7,6], [7,7], [7,8], [8,6], [8,7], [8,8]],
      ];

      for (let i=0; i<size; i++) {
        let box = boxes[i];
        let set = new Set();
        for (let j=0; j<size; j++) {
          // by now (after checking rows and cols) we have all the digits, no need for extra check
          set.add(sudoku[box[j][0]][box[j][1]].digit);
        }
        if (set.size !== size) return false;
      }

      return true;
    }

    return service;
  }])

  .service('helpers', [function() {
    let service = {};

    // https://stackoverflow.com/questions/15973985/using-ng-model-within-nested-ng-repeat-directives
    // "It's ugly, I know, but the alternative is uglier."
    // It's about how ng-repeat is creating a new scope and handling primitive types
    // Rather than passing integers directly, need to pass { digit: 1 } 
    service.formatData = (sudoku) => {
      let formatted = [];

      sudoku.forEach((row) => {
        formatted.push(row.map((el) => { return { digit: el }}));
      });

      return formatted;
    }

    return service;
  }])

  .directive('sudoku', function() {
    return {
      restrict: 'E',
      templateUrl: 'core/sudoku.html',
      scope: {
        data: '=',
        check: '&checkFn'
      },
      controller: function($scope) {
        let ctrl = this;

        ctrl.trim = (field, event) => {
          // we do not accept zero in any form
          if (event.key === "0") {
            event.preventDefault();
            return false;
          }

          // if we have something, we accept only Backspace or Delete
          if (field && field.digit) {
            if (event.key !== "Backspace" && event.key !== "Delete") {
              event.preventDefault();
              return false;
            }
          }
        }

        ctrl.check = () => {
          $scope.check();
        }
      },
      controllerAs: 'sudokuCtrl'
    };
  });
  