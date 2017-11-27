var finDataOddsController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, projectFactory, projectHttpService, calculatorFactory) {
    // var url = $$ApiUrl + "/companies";
    $scope.init = function() {


        $scope.currentProject = projectFactory.getToCurrentProject();
        if (!$scope.currentProject.FinDataOdds.Odds) {
            if ($scope.currentProject.ClientData.FinAnalysisCompanies &&
                $scope.currentProject.ClientData.FinAnalysisCompanies.length > 0 &&
                $scope.currentProject.FinDataBalance.CurrentFinAnalysisDate) {
                $scope.currentProject.FinDataBalance.Companies = angular
                    .copy($scope.currentProject.ClientData.FinAnalysisCompanies);

                $scope.mElement = {};
                $scope.addNewModal('PartialViews/Modals/FinDataOdds/OddsModal.html',
                    manageOddsController,
                    $scope.mElement,
                    'oddsData',
                    $scope.mElement);

            }
            else {
                var dialog = new BootstrapDialog({
                    type: BootstrapDialog.TYPE_WARNING,
                    size: BootstrapDialog.SIZE_SMALL,
                    title: "Не указаны данные",
                    message:
                        '<div style="text-align:center">Во вкладке "Данные о клиенте" подпункте "Финансовый анализ компаний" укажите количество компаний и их названия.' +
                            ' По данным компаниям будет проведен финансовый анализ.' +
                            ' Также заполните данные на вкладке Финданные Баланс' +
                            '</div>',
                    onhidden: function(dialogRef) {
                        $state.go("main.dashboard.project.finDataBalanceTable");
                    }
                });
                dialog.setSize(BootstrapDialog.SIZE_SMALL);
                dialog.open();
            }
        }
    }

    $scope.updateOdds = function() {
        $scope.mElement = {};
        $scope.mElement.MonthsBefore = $scope.currentProject.FinDataOdds.Odds.MonthsBefore;
        $scope.mElement.MonthsAfter = $scope.currentProject.FinDataOdds.Odds.MonthsAfter;
        $scope.addNewModal('PartialViews/Modals/FinDataOdds/OddsModal.html',
                manageOddsController,
                $scope.mElement,
                'oddsData',
                $scope.mElement);
    }

    $scope.addNewModal = function(modalView, modalCtrl, currentElement, elements, element = {}) {


        if (!_.isEmpty(element)) {
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
                $scope.calculateOdds();
				$scope.isEdit = false;
            } else {
                usSpinnerService.spin("spinner-1");
                if ($scope.isEdit) {
                    projectFactory.updateOddsData($scope.mElement, $scope.currentProject);
                    $scope.calculateOdds();
					$scope.isEdit = false;
                } else{
                    projectFactory.initOddsData($scope.mElement, $scope.currentProject);
                }
                usSpinnerService.stop("spinner-1");
            }
            projectHttpService.manageProject($http, $scope, usSpinnerService, projectFactory.getToCurrentProject(), false);

        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });

    };

    usSpinnerService.stop("spinner-1");
    
    $scope.showSubRows = function(table, val) {
        angular.forEach(table, function(value, key) {
            value.ShowSubRows = val;
        });
    }

    $scope.addSubRow = function(row, months) {
        if (!row.Rows) {
            row.Rows = [];
        }
        var subRow = { Title: row.Title}
        angular.forEach(months, function(value, key) {
            subRow[value.VarName] = 0;
        });
        row.Rows.push(subRow);
        $scope.remapIds(row.Rows);
        row.Rows[row.Rows.length - 1].Title += row.Rows.length;
        row.ShowSubRows = true;
    }

    $scope.deleteSubRow = function(row, subRow) {
        var index = row.Rows.findIndex(function(value) {
            return value.Id === subRow.Id;
        });
        if(index!==-1){
            row.Rows.splice(index, 1);
        }
        $scope.remapIds(row.Rows);
        $scope.calculateOdds();
    }
    
    $scope.remapIds = function(rows) {
        angular.forEach(rows, function(value, key) {
            value.Id = key + 1;
        });
    }
    
    $scope.calculateOdds = function() {
        calculatorFactory.calculateOddsData($scope.currentProject);
        $scope.currentProject = projectFactory.getToCurrentProject();
    }

    $scope.oddsItemHasData = function(value, array) {
        if (value.Calculate) {
            return false;
        }
        var res = false;
        angular.forEach($scope.currentProject.FinDataOdds.Odds.Header, function(month, mKey) {
            if (value[month.VarName]) {
                res = true;
            }
        });
        if (!res) {
            value.Comments = undefined;
        }
        return res;
    }
    $scope.isPredicted = ['TotalIncome', 'TotalOutOperationsIncome'];
    $scope.percentTypeNonEditable = ['Purchase','Wage','Rent','Storage','Fuels','Waybill','Advertising','Customs',
            'DeliveryOfGoods','Fare','Taxes','Utilities','Security','Hospitality','LoanInterestPayment',
            'MarriageDamageCancellation','BankServices','OtherBusinessExpenses'];

    $scope.takeFromOpiu=['Wage','Rent','Storage','Fuels','Waybill','Advertising','Customs',
            'DeliveryOfGoods','Fare','Taxes','Utilities','Security','Hospitality','LoanInterestPayment',
            'MarriageDamageCancellation','BankServices','OtherBusinessExpenses', 'OtherExpenses', 'TotalOutOperationsIncome', 'TotalIncome'];
    
    $scope.percentTypeEditable = ['RevenuesIncome','PrepaidIncome','ReturnIncome','OtherIncome',
            'CreditIncome','SalesIncome','SponsorshipIncome','OtherOutOperationsIncome'];

    $scope.outExpenesToPopulate = ['AutoLoanRepayment', 'LoanRepayment', 'ExpectedLoanRepayment', 'FamilyExpenses',
            'InvestmentExpenses', 'FixedAssetsPurchase', 'DividendExpenses', 'AssistanceExpenses'];

    $scope.checkEditability = function(row, hVarName, hasSubrows) {
        var result = row.Calculate || (hasSubrows);
        if(hVarName === 'Prediction'){
            if (($scope.isPredicted.indexOf(row.VarName) !== -1 ||
                $scope.percentTypeEditable.indexOf(row.VarName) !== -1) &&
                !hasSubrows) {
                result = false;
            } else if ($scope.takeFromOpiu.indexOf(row.VarName) === -1 &&
                !hasSubrows && !row.Calculate) {
                result = false;
            }
            else {
                result = true;
            }
        }
        return result;
    }

    $scope.getDataType = function(row, hVarName) {
        var result = "'currency'";
        if (hVarName === 'Prediction') {
            if ($scope.percentTypeEditable.indexOf(row.VarName) !== -1 ||
                $scope.percentTypeNonEditable.indexOf(row.VarName) !== -1 ||
                row.VarName === 'TotalExpensesForBusiness' ||
                row.VarName === 'TotalOutOperationsIncome'||
                row.VarName === 'OtherExpenses') {
                result = "'percent'";
            }
        }
        return result;
    }
    
    $scope.cellOptionsShown = function(rowVarName, monthVarName, hasSubRows) {
        if ((monthVarName.indexOf('M') === 0 ||
            monthVarName.indexOf('Prediction') === 0) &&
            $scope.takeFromOpiu.indexOf(rowVarName) !== -1) {
            return !hasSubRows;
        } else if ($scope.outExpenesToPopulate.indexOf(rowVarName) !== -1 &&
            monthVarName.indexOf('Prediction') === 0) {
            return !hasSubRows;
        } else if (monthVarName.indexOf('M') === 0 &&
        ($scope.percentTypeEditable.indexOf(rowVarName) !== -1 ||
            rowVarName === 'Purchase')) {
            return !hasSubRows;
        } else {
            return false;
        }
    }

    $scope.cellDropdownChoice = function(row, month, calcType) {
        
        $scope.mElement = { Row: row, Month: month };
        if (!row.NonOpiu) {
            row.NonOpiu = {};
        }
        row.NonOpiu[month.VarName] = calcType;
        if (calcType) {
            $scope.addNewModal('PartialViews/Modals/FinDataOdds/ReadyMadeValueModal.html',
                readyOddsValueController,
                "",
                $scope.mElement);
        } else {
            $scope.calculateOdds();
        }
    }

    $scope.populateValue = function(row, month, subRow) {
        
        angular.forEach($scope.currentProject.FinDataOdds.Odds.Header,
            function(value, key) {
                if (value.VarName.indexOf('M')===0) {
                    if (!subRow) {
                        row[value.VarName] = row['Prediction'];
                    } else {
                        subRow[value.VarName] = subRow['Prediction'];
                    }
                }
            });
        
        $scope.calculateOdds();
    }

    $scope.init();
};
blitzApp.controller("finDataOddsController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "projectFactory", "projectHttpService", "calculatorFactory", finDataOddsController]);