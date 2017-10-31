var finDataCrossCheckingController = function ($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, projectFactory, calculatorFactory, projectHttpService, usSpinnerService) {
    $scope.init = function () {
        $scope.currentProject = projectFactory.getToCurrentProject();
        if (!$scope.currentProject.FinDataCrossChecking.Factors ||
            !$scope.currentProject.FinDataCrossChecking.Factors.length) {
            $scope.currentProject.FinDataCrossChecking.Factors = [];
            projectHttpService.manageProject($http, $scope, usSpinnerService, projectFactory.getToCurrentProject(), false);
        }
        $scope.calculateCrossChecking();
    }

    $scope.calculateCrossChecking = function () {
        try {
            var len = $scope.currentProject.ConsolidatedBalance.length;
            $scope.currentProject.FinDataCrossChecking.Period =
                moment($scope.currentProject.ConsolidatedBalance[len - 1].Date) - moment($scope.currentProject.ConsolidatedBalance[len - 2].Date);
            $scope.currentProject.FinDataCrossChecking
                .Period = $scope.currentProject.FinDataCrossChecking.Period / 3600 / 1000 / 24 / 30;
            $scope.currentProject.FinDataCrossChecking.ActualIncreaseSK =
                calculatorFactory.getFloat($scope.currentProject.ConsolidatedBalance[len - 1].ConsEquity) -
                calculatorFactory.getFloat($scope.currentProject.ConsolidatedBalance[len - 2].ConsEquity);
            $scope.currentProject.FinDataCrossChecking.ActualSK = calculatorFactory
                .getFloat($scope.currentProject.ConsolidatedBalance[len - 1].ConsEquity);

            var totalFactors = 0;
            angular.forEach($scope.currentProject.FinDataCrossChecking.Factors, function (factor, fKey) {
                totalFactors += calculatorFactory.getFloat(factor.Sum);
            });
            $scope.currentProject.FinDataCrossChecking.ExpectedSK =
                calculatorFactory.getFloat($scope.currentProject.ConsolidatedBalance[len - 2].ConsEquity) +
                totalFactors +
                calculatorFactory.getFloat($scope.currentProject.FinDataCrossChecking.ExpectedIncreaseSK);

            $scope.currentProject.FinDataCrossChecking.DiffSK =
                calculatorFactory.getFloat($scope.currentProject.FinDataCrossChecking.ActualSK) -
                calculatorFactory.getFloat($scope.currentProject.FinDataCrossChecking.ExpectedSK);

            projectFactory.setCrossChecking($scope.currentProject.FinDataCrossChecking);
            $scope.currentProject = projectFactory.getToCurrentProject();
        }
        catch (except) {
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

    $scope.addNewRow = function (rows) {
        rows.push({ Id: rows.length + 1 });
    }

    $scope.deleteData = function () {
        var ob = $scope.elements.filter(function (item) {
            return item.Id == $scope.eIndex;
        });

        if (ob.length > 0) {
            var dElement = ob[0];
            var index = $scope.elements.indexOf(dElement);

            if (index != -1) {
                $scope.elements.splice(index, 1);
            }
        }
        $scope.calculateCrossChecking();
        projectHttpService.manageProject($http, $scope, usSpinnerService, projectFactory.getToCurrentProject(), false);

    }

    $scope.clickRightTableRow = function (rows, rowId) {
        $scope.eIndex = rowId;
        $scope.elements = rows;
    };

    $scope.removeElement = function () {
        var dialog = BootstrapDialog.confirm({
            title: 'Предупреждение',
            message: 'Вы действительно хотите удалить данные?',
            type: BootstrapDialog.TYPE_WARNING,
            size: BootstrapDialog.SIZE_SMALL,
            closable: true,
            btnCancelLabel: 'Нет',
            btnOKLabel: 'Да',
            btnOKClass: 'btn-warning',
            callback: function (result) {
                if (result) {
                    $scope.deleteData();
                }
            }
        });
        dialog.setSize(BootstrapDialog.SIZE_SMALL);
    };

    $scope.menuItems = [
        {
            text: "Удалить",
            callback: $scope.removeElement, //function to be called on click  
            disabled: false
        }
    ];

    $scope.init();
    usSpinnerService.stop("spinner-1");
};
blitzApp.controller("finDataCrossCheckingController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "projectFactory", "calculatorFactory", "projectHttpService", "usSpinnerService", finDataCrossCheckingController]);