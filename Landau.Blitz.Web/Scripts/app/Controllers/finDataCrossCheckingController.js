var finDataCrossCheckingController = function ($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, projectFactory, calculatorFactory, projectHttpService, usSpinnerService) {
    $scope.init = function () {
        $scope.currentProject = projectFactory.getToCurrentProject();
        if (!$scope.currentProject.FinDataCrossChecking.Factors ||
            !$scope.currentProject.FinDataCrossChecking.Factors.length) {
            $scope.currentProject.FinDataCrossChecking.Factors = [];
            projectHttpService.manageProject($http, $scope, usSpinnerService, projectFactory.getToCurrentProject(), false);
        }
    }

    $scope.calculateCrossChecking = function () {
        calculatorFactory.calculateCrossCheckData($scope.currentProject);
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