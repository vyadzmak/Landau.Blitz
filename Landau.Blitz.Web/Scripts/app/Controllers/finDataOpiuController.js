
var finDataOpiuController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, NgTableParams, projectHttpService, projectFactory, calculatorFactory) {

    $scope.init = function() {
        $scope.currentProject = projectFactory.getToCurrentProject();
        
        if (!$scope.currentProject.FinDataOpiu.Opius || $scope.currentProject.FinDataOpiu.Opius.length == 0) {
            if ($scope.currentProject.ClientData.FinAnalysisCompanies &&
                $scope.currentProject.ClientData.FinAnalysisCompanies.length > 0 &&
                $scope.currentProject.FinDataBalance.CurrentFinAnalysisDate) {
                $scope.currentProject.FinDataOpiu.Companies = angular
                    .copy($scope.currentProject.ClientData.FinAnalysisCompanies);

                $scope.mElement = $scope.currentProject.FinDataOpiu;
                $scope.addNewModal('PartialViews/Modals/FinDataOpiu/OpiuModal.html',
                    manageOpiuController,
                    'opiuData',
                    $scope.mElement);
            } else {
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
        } else {
            $scope.activeOpiu = projectFactory.getActiveOpiu();
        }
    }

    $scope.updateOpiu = function() {
        $scope.mElement = $scope.currentProject.FinDataOpiu;
        $scope.addNewModal('PartialViews/Modals/FinDataOpiu/OpiuModal.html',
            manageOpiuController,
            'opiuData',
            $scope.mElement);
        $scope.isEdit = true;
    }

    $scope.loanTypes = [
            {Id:1, Name:"Банковский заем" },
            {Id:2, Name:"Возобновляемая кредитная линия" },
            {Id:3, Name:"Невозобновляемая кредитная линия" },
            {Id:4, Name:"Смешанная кредитная линия" },
            {Id:5, Name:"Банковская гарантия" },
            {Id:6, Name:"Аккредитив" }
    ];

    $scope.activeOpiuChanged = function() {
        projectFactory.setActiveOpiu($scope.activeOpiu.Id);
        $scope.activeOpiu = projectFactory.getActiveOpiu();
    }

    $scope.addNewModal = function(modalView, modalCtrl, data, element = {}, elements) {

        var modalInstance = $uibModal.open({
            templateUrl: modalView,
            controller: modalCtrl,
            controllerAs: 'vm',
            scope: $scope,
            size:'lg'
        });

        modalInstance.result.then(function() {
            if (data !== 'opiuData') {
                var dataRow;
                if ($scope.mElement.Row.Id) {
                    dataRow = _.find($scope.mElement.Month.Rows, function(o) {return o.Id === $scope.mElement.Row.Id});
                } else {
                    dataRow = $scope.mElement.Month;
                }
                if ($scope.mElement.IsRevenues) {
                    dataRow.RevenuesCalcData = $scope.mElement.CalcData;
                } else {
                    dataRow.CalculationsData = $scope.mElement.CalcData;
                }
                $scope.calculateOpiu($scope.activeOpiu);
            } else {
                usSpinnerService.spin("spinner-1");
                if ($scope.isEdit) {
                    projectFactory.updateOpius($scope.currentProject);
                    angular.forEach($scope.currentProject.FinDataOpiu.Opius, function(value, key) {
                        $scope.calculateOpiu(value);
                    });
                    $scope.activeOpiu = projectFactory.getActiveOpiu();
                } else{
                    projectFactory.initOpius($scope.currentProject);
                    $scope.activeOpiu = projectFactory.getActiveOpiu();
                }
                usSpinnerService.stop("spinner-1");
            }
            projectHttpService.manageProject($http, $scope, usSpinnerService, projectFactory.getToCurrentProject(), false);

        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.init();

    usSpinnerService.stop("spinner-1");
    
    $scope.calculateOpiu = function(opiu) {
        calculatorFactory.calculateOpiuData($scope.currentProject, opiu);
    }

    $scope.addNewRow = function(rows) {
        rows.push({});
        $scope.remapIds(rows);
    }

    $scope.showSubRows = function(table, val) {
        angular.forEach(table, function(value, key) {
            value.ShowSubRows = val;
        });
    }

    $scope.addSubRow = function(table, row, months) {
        if (!row.Rows) {
            row.Rows = [];
        }
        var subRow = { Title: row.Title}
        angular.forEach(months, function(value, key) {
            subRow['M' + value.Id] = 0;
        });
        row.Rows.push(subRow);
        $scope.remapIds(row.Rows);
        row.Rows[row.Rows.length - 1].Title += row.Rows.length;
        row.ShowSubRows = true;
        if (row.VarName === 'Revenues') {
            angular.forEach(months, function(value, key) {
                value.MarginCalcType = 1;
                value.CalculationsData = null;
                value.RevenuesCalcType = 1;
                value.RevenuesCalcData = null;
            });
            angular.forEach(table, function(value, key) {
                if (value.VarName === "CostOfGoods") {
                    $scope.addSubRow(table, value, months);
                } else if (value.VarName === "Margin") {
                    $scope.addSubRow(table, value, months);
                }
            });
        }
    }

    $scope.deleteData = function() {
        var ob = $scope.elements.filter(function(item) {
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

        $scope.calculateOpiu($scope.activeOpiu);
        projectHttpService.manageProject($http, $scope, usSpinnerService, projectFactory.getToCurrentProject(), false);

    }

    $scope.deleteSubRow = function(table, row, subRow, months) {
        var index = row.Rows.findIndex(function(value) {
            return value.Id === subRow.Id;
        });
        if(index!==-1){
            row.Rows.splice(index, 1);
        }
        $scope.remapIds(row.Rows);
        if (row.VarName === 'Revenues') {
            angular.forEach(months, function(value, key) {
                if(value.Rows) {
                    var index = value.Rows.findIndex(function(value) {
                        return value.Id === subRow.Id;
                    });
                    if(index!==-1){
                        value.Rows.splice(index, 1);
                    }
                    $scope.remapIds(value.Rows);
                }
            });
            angular.forEach(table, function(value, key) {
                if (value.VarName === "CostOfGoods") {
                    $scope.deleteSubRow(table, value, subRow);
                } else if (value.VarName === "Margin") {
                    $scope.deleteSubRow(table, value, subRow);
                }
            });
        }
        $scope.calculateOpiu($scope.activeOpiu);
    }

    $scope.remapIds = function(rows) {
        angular.forEach(rows, function(value, key) {
            value.Id = key + 1;
        });
    }

    $scope.clickRightTableRow = function(rows, rowId) {
        $scope.eIndex = rowId;
        $scope.elements = rows;
    };

    $scope.removeElement = function() {
        var dialog = BootstrapDialog.confirm({
            title: 'Предупреждение',
            message: 'Вы действительно хотите удалить данные?',
            type: BootstrapDialog.TYPE_WARNING,
            size: BootstrapDialog.SIZE_SMALL,
            closable: true,
            btnCancelLabel: 'Нет',
            btnOKLabel: 'Да',
            btnOKClass: 'btn-warning',
            callback: function(result) {
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

    $scope.opiuItemHasData = function(value, array) {
        var res = (value.Avg > 0 || value.AvgPrediction > 0) && !value.Calculate;
        if (!(value.Avg > 0 || value.AvgPrediction > 0)) {
            value.Comments = undefined;
        }
        return res;
    }

    $scope.cellDropdownChoice = function(row, month, calcType, subRow) {
        if (row.VarName!=='Revenues' && month.MarginCalcType !== calcType) {
            month.MarginCalcType = calcType;
            month.CalculationsData = null;
        } else if(row.VarName==='Revenues' && month.RevenuesCalcType !== calcType) {
            month.RevenuesCalcType = calcType;
            month.RevenuesCalcData = null;
        }
        
        $scope.mElement = { Row: subRow?subRow:row, Month: month, IsRevenues: row.VarName==='Revenues'};
        if(!subRow){
            $scope.mElement.CalcData = row.VarName === 'Revenues' ? month.RevenuesCalcData : month.CalculationsData;
        } else {
            if (!month.Rows) {
                month.Rows = [];
            }
            var index = -1;
            angular.forEach(month.Rows, function(rvalue, rkey) {
                if (rvalue.Id === subRow.Id) {
                    index = rkey;
                    if (row.VarName!=='Revenues' && rvalue.MarginCalcType !== calcType) {
                        rvalue.MarginCalcType = calcType;
                        rvalue.CalculationsData = null;
                    } else if(row.VarName==='Revenues' && rvalue.RevenuesCalcType !== calcType) {
                        rvalue.RevenuesCalcType = calcType;
                        rvalue.RevenuesCalcData = null;
                    }
                }
            });
            if (index!==-1) {
                $scope.mElement.CalcData = row.VarName === 'Revenues'? month.Rows[index].RevenuesCalcData: month.Rows[index].CalculationsData;
            } else {
                month.Rows.push({
                    Id: subRow.Id,
                    MarginCalcType: row.VarName === 'Revenues' ? null : calcType,
                    CalculationsData: null,
                    RevenuesCalcType: row.VarName === 'Revenues' ? calcType : null,
                    RevenuesCalcData: null
                });
                $scope.mElement.CalcData = 
                    row.VarName === 'Revenues'? 
                    month.Rows[month.Rows.length-1].RevenuesCalcData: 
                    month.Rows[month.Rows.length-1].CalculationsData;
            }
        }
        switch (calcType) {
            case 1:
            case 4:
                $scope.addNewModal('PartialViews/Modals/FinDataOpiu/ReadyMadeValueModal.html',readyMadeValueController,"",$scope.mElement);
                break;
            case 2:
                $scope.addNewModal('PartialViews/Modals/FinDataOpiu/DailyValueModal.html',dailyValueController,"",$scope.mElement);
                break;
            case 5:
                $scope.addNewModal('PartialViews/Modals/FinDataOpiu/InventoriesMarginModal.html',inventoriesMarginController,"",$scope.mElement);
                break;
            case 6:
                $scope.addNewModal('PartialViews/Modals/FinDataOpiu/CalculationMarginModal.html',calculationMarginController,"",$scope.mElement);
                break;
            case 7:
                $scope.populateMargin(row, month);
                break;
            case 3:
                if(subRow){
                    subRow['M' + month.Id] = 0;
                } else {
                    row['M' + month.Id] = 0;
                }
                $scope.calculateOpiu($scope.activeOpiu);
                break;

            default:
                break;
        }
    }
    
    $scope.populateMargin = function(row, month, subRow) {
        
        angular.forEach($scope.activeOpiu.Months,
            function(value, key) {
                if (month.Id < value.Id) {
                    if (!subRow) {
                        value.MarginCalcType = month.MarginCalcType === 3 ? 3 : 4;
                        row['M' + value.Id] = row['M' + month.Id];
                    } else {
                        if (!value.Rows) {
                            value.Rows = [];
                        }
                        var index = value.Rows.findIndex(function(value) {
                            return value.Id === subRow.Id;
                        });
                        if (index !== -1) {
                            value.Rows[index].MarginCalcType = month.MarginCalcType === 3 ? 3 : 4;
                        } else {
                            value.Rows.push({
                                Id: subRow.Id,
                                MarginCalcType: month.MarginCalcType === 3 ? 3 : 4,
                                CalculationsData: null,
                                RevenuesCalcType: 1,
                                RevenuesCalcData: null
                            });
                        }
                        subRow['M' + value.Id] = subRow['M' + month.Id];
                    }
                }
            });
        
        $scope.calculateOpiu($scope.activeOpiu);
    }
    $scope.changeRowTitle = function(row, id, title){
        if (row.VarName === 'Revenues' || row.VarName === 'CostOfGoods' || row.VarName === 'Margin') {
            angular.forEach(row.Rows, function(value, key) {
                if (value.Id === id) {
                    value.Title = title;
                }
            });
        }
    }
    $scope.changeSubRowTitle = function(table, row, subRow){
        if (row.VarName === 'Revenues' || row.VarName === 'CostOfGoods' || row.VarName === 'Margin') {
            angular.forEach(table, function(value, key) {
                if (value.VarName === "CostOfGoods") {
                    $scope.changeRowTitle(value, subRow.Id, subRow.Title);
                } else if (value.VarName === "Margin") {
                    $scope.changeRowTitle(value, subRow.Id, subRow.Title);
                }else if (value.VarName === "Revenues") {
                    $scope.changeRowTitle(value, subRow.Id, subRow.Title);
                }
            });
        }
    }

};
blitzApp.controller("finDataOpiuController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "NgTableParams", "projectHttpService", "projectFactory", "calculatorFactory", finDataOpiuController]);