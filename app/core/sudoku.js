angular.module('myApp.sudoku', [])
  
  .service('sudoku', [function() {
    let service = {};

    service.getRandom = () => {
      // TODO... :)
      return [
        [5,3,0,0,7,0,0,0,0],
        [6,0,0,1,9,5,0,0,0],
        [0,9,8,0,0,0,0,6,0],
        [8,0,0,0,6,0,0,0,3],
        [4,0,0,8,0,3,0,0,1],
        [7,0,0,0,2,0,0,0,6],
        [0,6,0,0,0,0,2,8,0],
        [0,0,0,4,1,9,0,0,5],
        [0,0,0,0,8,0,0,7,9]
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
    };
  });
  