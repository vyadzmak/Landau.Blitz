var finDataOddsController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, projectFactory, projectHttpService, calculatorFactory) {
    // var url = $$ApiUrl + "/companies";
    $scope.init = function() {


        $scope.currentProject = projectFactory.getToCurrentProject();
        if (!$scope.currentProject.FinDataOdds.Odds ||
            $scope.currentProject.FinDataOdds.Odds.length == 0) {
            
            $scope.currentProject.FinDataBalance.Companies = angular
                .copy($scope.currentProject.ClientData.FinAnalysisCompanies);

            $scope.mElement = {};
            $scope.addNewModal('PartialViews/Modals/FinDataOdds/OddsModal.html',
                manageOddsController,
                $scope.mElement,
                'oddsData',
                $scope.mElement);

        }
    }

    $scope.addNewModal = function(modalView, modalCtrl, currentElement, elements, element = {}) {


        if (element != {}) {
            $scope.isEdit = true;
        }

        currentElement = element;
        var modalInstance = $uibModal.open({
            templateUrl: modalView,
            controller: modalCtrl,
            controllerAs: 'vm',
            scope: $scope

        });

        modalInstance.result.then(function() {
            if (elements !== 'oddsData') {
                if ($scope.mElement.Id == -1 || $scope.mElement.Id == undefined) {


                    var id = 1;
                    if (elements.length > 0) {
                        id = elements[elements.length - 1].Id + 1;
                    }
                    $scope.mElement.Id = id;
                    elements.push($scope.mElement);
                    $scope.mElement = {};
                } else {
                    var ob = elements.filter(function(item) {
                        return item.Id == $scope.mElement.Id;
                    });

                    if (ob.length > 0) {
                        var dElement = ob[0];
                        var index = $scope.elements.indexOf(dElement);

                        if (index != -1) {
                            $scope.elements[index] = $scope.mElement;
                        }
                    }
                    $scope.mElement = {};
                }
            } else {
                projectFactory.initOddsData($scope.mElement, $scope.currentProject);
            }
            projectHttpService.manageProject($http, $scope, usSpinnerService, projectFactory.getToCurrentProject(), false);

        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });

    };

    $scope.init();
    usSpinnerService.stop("spinner-1");

    $scope.SumsValues = [
        {
            TotalName: 'TotalIncome',
            SubValues: [
                'RevenuesIncome',
                'PrepaidIncome',
                'ReturnIncome',
                'OtherIncome'
            ]
        },
        {
            TotalName: 'TotalOutOperationsIncome',
            SubValues: [
                'CreditIncome',
            'SalesIncome',
            'SponsorshipIncome',
            'OtherOutOperationsIncome'
            ]
        },
        {
            TotalName: 'TotalExpensesForBusiness',
            SubValues: [
                'Purchase',
            'Wage',
            'Rent',
            'Storage',
            'Fuels',
            'Waybill',
            'Advertising',
            'Customs',
            'DeliveryOfGoods',
            'Fare',
            'Taxes',
            'Utilities',
            'Security',
            'Hospitality',
            'LoanInterestPayment',
            'MarriageDamageCancellation',
            'BankServices',
            'OtherBusinessExpenses'
            ]
        },
        {
            TotalName: 'TotalExpensesOutBusiness',
            SubValues: [
                'AutoLoanRepayment',
            'LoanRepayment',
            'ExpectedLoanRepayment',
            'FamilyExpenses',
            'InvestmentExpenses',
            'FixedAssetsPurchase',
            'DividendExpenses',
            'AssistanceExpenses',
            'OtherExpenses'
            ]
        },
        {
            TotalName: 'Income',
            SubValues: [
                'TotalIncome',
                'TotalOutOperationsIncome'
            ]
        },
        {
            TotalName: 'Expenses',
            SubValues: [
                'TotalExpensesOutBusiness',
                'TotalExpensesForBusiness'
            ]
        },
        {
            TotalName: 'EndMonth',
            SubValues: [
                'Income',
                'Expenses'
            ]
        }
    ];

    $scope.calculateOdds = function() {
        
        
        // calculate values
        angular.forEach($scope.SumsValues, function(tSumV, tSumKey) {
            var totalValue = $scope.getVarArrayByName($scope.currentProject.FinDataOdds.Odds, tSumV.TotalName);

            
            angular.forEach($scope.currentProject.FinDataOdds.Odds.Header, function(month, mKey) {
                totalValue[month.VarName] = 0;
                angular.forEach(tSumV.SubValues, function(subValue, sKey) {
                    var sSubValue = $scope.getVarArrayByName($scope.currentProject.FinDataOdds.Odds, subValue);
                    totalValue[month.VarName] += calculatorFactory.getFloat(sSubValue[month.VarName]);
                });
            });
        });

        //calculate average for all rows
        angular.forEach($scope.currentProject.FinDataOdds.Odds.Table, function(tRow, rKey) {
            var totalByMonths = 0;
            angular.forEach($scope.currentProject.FinDataOdds.Odds.Months, function(month, mKey) {
                totalByMonths += +tRow['M' + month.Id];
            });
            tRow.Avg = totalByMonths / $scope.currentProject.FinDataOdds.Odds.Months.length;
        });
    }

    $scope.getVarArrayByName = function(odds, name) {
        var ob = odds.Table.filter(function(item) {
            return item.VarName === name;
        });
        if (ob == undefined || ob.length === 0) return null;
        return ob[0];
    }
};
blitzApp.controller("finDataOddsController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "projectFactory", "projectHttpService", "calculatorFactory", finDataOddsController]);