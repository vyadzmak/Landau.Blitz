var consolidatedBalanceController = function ($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, projectFactory, balanceTableFactory, balanceCalculatorFactory, calculatorFactory, projectHttpService) {

    $scope.init = function () {
        $scope.currentProject = projectFactory.getToCurrentProject();
    }
    
    $scope.init();
    usSpinnerService.stop("spinner-1");
};
blitzApp.controller("consolidatedBalanceController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "projectFactory", "balanceTableFactory", "balanceCalculatorFactory", "calculatorFactory", "projectHttpService", consolidatedBalanceController]);