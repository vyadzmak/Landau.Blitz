var contractAnalysisController = function ($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, projectFactory, projectHttpService) {
    usSpinnerService.stop("spinner-1");

    $scope.init = function() {
        $scope.currentProject = projectFactory.getToCurrentProject();
    };

    $scope.filterFromArray = function (arr, id) {
        var ob = arr.filter(function (item) {
            return item.Id == id;
        });

        return ob[0];
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
        $scope.remapIds($scope.elements);
        $scope.recalculateData();
        projectHttpService.manageProject($http, $scope, usSpinnerService, projectFactory.getToCurrentProject(), false);

    }
    $scope.RemoveElement = function () {
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

    $scope.remapIds = function (rows) {
        angular.forEach(rows, function (value, key) {
            value.Id = key + 1;
        });
    }

    $scope.menuItems = [
        {
            text: "Удалить",
            callback: $scope.RemoveElement, //function to be called on click  
            disabled: false
        }
    ];

    $scope.showNewSales = function () {
        if (!$scope.currentProject.ContractAnalysis.Sales) {
            $scope.currentProject.ContractAnalysis.Sales = [];
        }
        $scope.currentProject.ContractAnalysis.Sales.push({});
        $scope.remapIds($scope.currentProject.ContractAnalysis.Sales);
    }

    $scope.showNewPurchases = function () {
        if (!$scope.currentProject.ContractAnalysis.Purchases) {
            $scope.currentProject.ContractAnalysis.Purchases = [];
        }
        $scope.currentProject.ContractAnalysis.Purchases.push({});
        $scope.remapIds($scope.currentProject.ContractAnalysis.Purchases);
    }

    $scope.clickSales = function (id) {
        $scope.rmIndex = 1;
        $scope.eIndex = id;

        $scope.editElement = $scope.filterFromArray($scope.currentProject.ContractAnalysis.Sales, $scope.eIndex);

        $scope.mElement = $scope.editElement;
        $scope.elements = $scope.currentProject.ContractAnalysis.Sales;
    };

    $scope.clickPurchases = function (id) {
        $scope.rmIndex = 1;
        $scope.eIndex = id;

        $scope.editElement = $scope.filterFromArray($scope.currentProject.ContractAnalysis.Purchases, $scope.eIndex);

        $scope.mElement = $scope.editElement;
        $scope.elements = $scope.currentProject.ContractAnalysis.Purchases;
    };

    $scope.calculateTotalSales = function () {
        var totalPaid = 0;
        var totalSum = 0;
        var totalUnpaid = 0;

        for (let i = 0; i < $scope.currentProject.ContractAnalysis.Sales.length; i++) {
            totalSum += +$scope.currentProject.ContractAnalysis.Sales[i].TotalCost;
            totalPaid += +$scope.currentProject.ContractAnalysis.Sales[i].PaidSum;
            $scope.currentProject.ContractAnalysis.Sales[i]
                .UnpaidSum = +$scope.currentProject.ContractAnalysis.Sales[i].TotalCost -
                (+$scope.currentProject.ContractAnalysis.Sales[i].PaidSum);
            totalUnpaid += +$scope.currentProject.ContractAnalysis.Sales[i].UnpaidSum;
        }

        $scope.currentProject.ContractAnalysis.TotalSales = totalSum;
        $scope.currentProject.ContractAnalysis.TotalSalesPaid = totalPaid;
        $scope.currentProject.ContractAnalysis.TotalSalesUnpaid = totalUnpaid;

    }

    $scope.calculateTotalPurchases = function () {
        var totalPaid = 0;
        var totalSum = 0;
        var totalUnpaid = 0;

        for (let i = 0; i < $scope.currentProject.ContractAnalysis.Purchases.length; i++) {
            totalSum += +$scope.currentProject.ContractAnalysis.Purchases[i].TotalCost;
            totalPaid += +$scope.currentProject.ContractAnalysis.Purchases[i].PaidSum;
            $scope.currentProject.ContractAnalysis.Purchases[i]
                .UnpaidSum = +$scope.currentProject.ContractAnalysis.Purchases[i].TotalCost -
                (+$scope.currentProject.ContractAnalysis.Purchases[i].PaidSum);
            totalUnpaid += +$scope.currentProject.ContractAnalysis.Purchases[i].UnpaidSum;
        }

        $scope.currentProject.ContractAnalysis.TotalPurchases = totalSum;
        $scope.currentProject.ContractAnalysis.TotalPurchasesPaid = totalPaid;
        $scope.currentProject.ContractAnalysis.TotalPurchasesUnpaid = totalUnpaid;
    }

    $scope.recalculateData = function() {
        $scope.calculateTotalPurchases();
        $scope.calculateTotalSales();
    }

    $scope.init();
    
};
blitzApp.controller("contractAnalysisController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "projectFactory", "projectHttpService", contractAnalysisController]);