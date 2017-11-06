var provisionController = function ($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, NgTableParams, projectFactory, projectHttpService, mathFactory) {
    usSpinnerService.stop("spinner-1");
    $scope.provisionTypes = [
    { Id: 1, Name: 'Квартира' },
    { Id: 2, Name: 'Жилой дом' },
    { Id: 3, Name: 'Нежилое/коммерческое помещение' },
    { Id: 4, Name: 'Оборудование' },
    { Id: 5, Name: 'Товары в обороте' },
    { Id: 6, Name: 'Транспортное средство' },
    { Id: 7, Name: 'Гарантия ДАМУ' },
    { Id: 8, Name: 'Прочее' }
    ];
    $scope.init = function () {
        $scope.currentProject = projectFactory.getToCurrentProject();
        if (!$scope.currentProject.Provision.Deposits) {
            $scope.currentProject.Provision.Deposits = [];
        }
        if (!$scope.currentProject.Provision.ActiveDeposits) {
            $scope.currentProject.Provision.ActiveDeposits = [];
        }
        if (!$scope.currentProject.Provision.ActiveLiabilities) {
            $scope.currentProject.Provision.ActiveLiabilities = [];
        }
    };
    $scope.init();
    $scope.filterFromArray = function (arr, id) {
        var ob = arr.filter(function (item) {
            return item.Id == id;
        });

        return ob[0];
    }


    $scope.calculateDeposits = function () {
        var totalDeposits = 0;
        var totalWODamu = 0;
        angular.forEach($scope.currentProject.Provision.Deposits, function (item, key) {
            if (item.Name.Id !== 7) {
                totalWODamu += mathFactory.getFloat(item.AssessedPrice);
            }
            totalDeposits += mathFactory.getFloat(item.AssessedPrice);
            //item.LiquidityRatio = mathFactory.getFloat(item.AssessedPrice) / mathFactory.getFloat(item.MarketPrice);
            //item.LiquidityRatio = mathFactory.round(item.LiquidityRatio, 2);
        });
        $scope.currentProject.Provision.DepositsRatio = totalWODamu /
            mathFactory.getFloat($scope.currentProject.FinancePlanning.ProposedSum) *
            100;
        $scope.currentProject.Provision.DepositsRatio = mathFactory
            .round($scope.currentProject.Provision.DepositsRatio, 2);
        $scope.currentProject.Provision.DepositsTotal = mathFactory
            .round(totalDeposits, 2);
        $scope.currentProject.Provision.DepositsWODamuTotal = mathFactory
            .round(totalWODamu, 2);
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
        $scope.calculateDeposits();
        $scope.calculateLiabilities();
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

    $scope.calculateLiabilities = function () {
        var totalActiveLiabilities = 0;
        var totalActiveDepositsWoDamu = 0;
        angular.forEach($scope.currentProject.Provision.ActiveDeposits, function (item, key) {
            if (item.Name.Id !== 7) {
                totalActiveDepositsWoDamu += mathFactory.getFloat(item.AssessedPrice);
            }
        });
        angular.forEach($scope.currentProject.Provision.ActiveLiabilities, function (item, key) {
            totalActiveLiabilities += mathFactory.getFloat(item.Sum);
        });
        $scope.currentProject.Provision.ActiveDepositsWoDamuTotal = mathFactory.round(totalActiveDepositsWoDamu, 2);
        $scope.currentProject.Provision.ActiveLiabilitiesTotal = mathFactory.round(totalActiveLiabilities, 2);
        $scope.currentProject.Provision.ActiveDepositsRatio = mathFactory.round(totalActiveDepositsWoDamu/totalActiveLiabilities*100, 2);
    }
};
blitzApp.controller("provisionController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "NgTableParams", "projectFactory", "projectHttpService", "mathFactory", provisionController]);