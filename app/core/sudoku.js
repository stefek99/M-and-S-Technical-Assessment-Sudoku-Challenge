angular.module('myApp.sudoku', [])
  
  .service('sudoku', [function() {
    let service = {};

    service.getRandom = () => {
      // TODO... :)
      return [
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
    }

    service.checkIfSolved = (sudoku) => {

        return false;
    }

    return service;
  }])

  .service('helpers', [function() {
    let service = {};

    // https://stackoverflow.com/questions/15973985/using-ng-model-within-nested-ng-repeat-directives
    // "It's ugly, I know, but the alternative is uglier."
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
      },
      controller: function() {
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
      },
      controllerAs: 'sudokuCtrl'
    };
  });
  