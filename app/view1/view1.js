'use strict';

angular.module('myApp.view1', ['ngRoute', 'myApp.sudoku'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl as mainCtrl'
  });
}])

.controller('View1Ctrl', ["sudoku", "helpers", function(sudoku, helpers) {
  let ctrl = this;
  ctrl.sudoku = helpers.formatData(sudoku.getRandom());

  ctrl.check = () => {
    console.log("checking");
  }
}]);