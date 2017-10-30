var finDataCrossCheckingController = function ($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, projectFactory, calculatorFactory, usSpinnerService) {
    $scope.init = function () {
        $scope.currentProject = projectFactory.getToCurrentProject();
        $scope.calculateCrossChecking();
    }

    $scope.calculateCrossChecking = function() {
        try {
            var len = $scope.currentProject.ConsolidatedBalance.length;
            $scope.currentProject.FinDataCrossChecking.Period =
                moment($scope.currentProject.ConsolidatedBalance[len - 1].Date) - moment($scope.currentProject.ConsolidatedBalance[len - 2].Date);
            $scope.currentProject.FinDataCrossChecking
                .Period = $scope.currentProject.FinDataCrossChecking.Period / 3600 / 1000 / 24 / 30;
            $scope.currentProject.FinDataCrossChecking.ActualIncreaseSK =
                calculatorFactory.getFloat($scope.currentProject.ConsolidatedBalance[len - 1].ConsEquity) -
                calculatorFactory.getFloat($scope.currentProject.ConsolidatedBalance[len - 2].ConsEquity);
        }
        catch(except) {
            var dialog = BootstrapDialog.alert({
                title: 'Невозможно построить Cross-Checking',
                message: 'Не удалось рассчитать Cross-Checking. Проверьте правильность заполнения баланса',
                type: BootstrapDialog.TYPE_DANGER,
                size: BootstrapDialog.SIZE_SMALL,
                closable: true
            });
            dialog.setSize(BootstrapDialog.SIZE_SMALL);
        }

    }

    $scope.init();
    usSpinnerService.stop("spinner-1");
};
blitzApp.controller("finDataCrossCheckingController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "projectFactory", "calculatorFactory", "usSpinnerService", finDataCrossCheckingController]);