'use strict';

angular.module('myApp.view1', ['ngRoute', 'myApp.sudoku'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl as ctrl'
  });
}])

.controller('View1Ctrl', ["sudoku", function(sudoku) {
  let ctrl = this;
  ctrl.sudoku = sudoku.getRandom();
}]);