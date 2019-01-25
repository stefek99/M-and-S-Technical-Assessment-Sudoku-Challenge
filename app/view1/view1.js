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
  
  ctrl.easy = () => {
    ctrl.sudoku = helpers.formatData(sudoku.getEasy());
  }

  ctrl.normal = () => {
    ctrl.sudoku = helpers.formatData(sudoku.getNormal());
  }

  ctrl.check = () => {
    if(sudoku.check(ctrl.sudoku)) {
      alert("solved"); // TODO: make winning more exciting
    }
  }

  ctrl.normal();
}]);