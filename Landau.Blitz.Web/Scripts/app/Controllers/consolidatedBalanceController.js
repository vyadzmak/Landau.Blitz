var consolidatedBalanceController = function ($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, projectFactory, balanceTableFactory, balanceCalculatorFactory, calculatorFactory, projectHttpService) {

    $scope.init = function () {
        $scope.currentProject = projectFactory.getToCurrentProject();
        $scope.calculateConsolidatedBalance();
    }

    $scope.assetsNames = [
                    'Checkout',
                    'CurrentAccount',
                    'Savings',
                    'Deposit',
                    'RecievableAccounts',
                    'TransitGoods',
                    'SuppliersPrepayment',
                    'OtherRecievables',
                    'Inventories',
                    'FinishedGoods',
                    'RawMaterials',
                    'SemiProducts',
                    'ForSaleGoods',
                    'Hardware',
                    'MotorTransport',
                    'RealEstate',
                    'Investments'
    ];

    $scope.liabilitiesNames = [
                    'BudgetSettlements',
                    'RentalsArrears',
                    'ShortTermDebt',
                    'PayableAccounts',
                    'CommodityLoan',
                    'CustomersPrepayment',
                    'ShortPrivateLoans',
                    'ShortWorkingCapitalCredit',
                    'ShortFixedAssetsCredit',
                    'OtherCurrentDebt',
                    'LongPrivateLoans',
                    'LongWorkingCapitalCredit',
                    'LongFixedAssetsCredit',
                    'OtherLiabilities'
    ];

    $scope.totalNames = [
                    "ConsLiquidAssets",
					"ConsReceivables",
					"ConsInventories",
					"ConsTotalCurrentAssets",
					"ConsTotalFixedAssets",
					"ConsTotalAssets",
					"ConsTotalShortTermDebt",
					"ConsTotalLongTermDebt",
					"ConsTotalLongAccountsPayable",
					"ConsEquity",
					"ConsTotalLiabilities"
    ];

    $scope.calculateConsolidatedBalance = function () {
        $scope.currentProject.ConsolidatedBalance = angular
            .copy($scope.currentProject.FinDataBalance.Balances[0].CompanyBalances);

        angular.forEach($scope.currentProject.FinDataBalance.Balances, function (comp, compKey) {
            if (compKey > 0) {
                angular.forEach(comp.CompanyBalances, function (compBalance, bKey) {
                    angular.forEach($scope.currentProject.ConsolidatedBalance, function (consBalance, cbKey) {
                        if (consBalance.Date === compBalance.Date) {
                            angular.forEach($scope.assetsNames, function (assetName, abKey) {
                                consBalance.Assets[assetName].ConsTotal = calculatorFactory.getFloat(consBalance.Assets[assetName].ConsTotal) + calculatorFactory.getFloat(compBalance.Assets[assetName].ConsTotal);
                            });
                            angular.forEach($scope.liabilitiesNames, function (liabilityName, lbKey) {
                                consBalance.Liabilities[liabilityName].ConsTotal = calculatorFactory.getFloat(consBalance.Liabilities[liabilityName].ConsTotal) + calculatorFactory.getFloat(compBalance.Liabilities[liabilityName].ConsTotal);
                            });
                            angular.forEach($scope.totalNames, function (totalName, tbKey) {
                                consBalance[totalName] = calculatorFactory.getFloat(consBalance[totalName]) + calculatorFactory.getFloat(compBalance[totalName]);
                            });
                        }
                    });
                });
            }
        });

    }

    $scope.init();
    usSpinnerService.stop("spinner-1");
};
blitzApp.controller("consolidatedBalanceController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "projectFactory", "balanceTableFactory", "balanceCalculatorFactory", "calculatorFactory", "projectHttpService", consolidatedBalanceController]);