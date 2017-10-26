
//function rowBoldStyle(row, index) {
//    var classes = ['active bold-trow', 'success', 'info', 'warning', 'danger'];

//    if (row.Bold) {
//        return {
//            classes: classes[0]
//        }
//    }

//    return {};
//}

//function formatCurrency(value) {
//    if (value == "0") return "0";
//    if (value == "") return "";
//    var t = +value;
//    return t.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
//        //return "<i>" + value + "</i>"
//}

//function cellClick(field, value, row, $element) {
//    //window.setDataToBalance();
//}

var finDataBalanceTableController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, projectFactory, balanceTableFactory, balanceCalculatorFactory, calculatorFactory, projectHttpService) {
    //var edit = false;
    //window.setDataToBalance = function() {
    //    if (edit) {
    //        balanceTableFactory.setDataToBalance($scope.currentProject);
    //        edit = false;
    //    } else {
    //        edit = true;
    //    }
    //}

    //$scope.getToSinglePeriodHeader = function() {
    //    var columns = [];
    //    var date = $scope.currentProject.FinDataBalance.Date;

    //    columns.push({ field: "Active", title: "Актив" });
    //    columns.push({ field: "ActiveDate1", title: date, editable: { type: "text", mode: "inline" }, formatter: formatCurrency });
    //    columns.push({ field: "Passive", title: "Пассив" });
    //    columns.push({ field: "PassiveDate1", title: date, editable: { type: "text", mode: "inline" }, formatter: formatCurrency });

    //    return columns;
    //}

    //$scope.getToMultiPeriodHeader = function() {
    //    var columns = [];
    //    var date = $scope.currentProject.FinDataBalance.Date;
    //    var prevDate = $scope.currentProject.FinDataBalance.PreviousDate;

    //    columns.push({ field: "Active", title: "Актив" });
    //    columns.push({ field: "ActiveDate1", title: prevDate });
    //    columns.push({ field: "ActiveDate2", title: date, editable: { type: "text", mode: "inline" }, formatter: formatCurrency });
    //    columns.push({ field: "Passive", title: "Пассив" });
    //    columns.push({ field: "PassiveDate1", title: prevDate });
    //    columns.push({ field: "PassiveDate2", title: date, editable: { type: "text", mode: "inline" }, formatter: formatCurrency });

    //    return columns;
    //}

    //$scope.formatTable = function() {
    //        try {
    //            var x = document.getElementById("balanceTable").rows;

    //            for (var i = 0; i < x.length; i++) {
    //                //active bold-trow
    //                var r = x[i];
    //                // alert(JSON.stringify(r));
    //                if (r.className == "active bold-trow")

    //                {
    //                    for (var j = 0; j < r.children.length; j++) {
    //                        var ch = r.children[j];

    //                        var ih = ch.innerHTML;
    //                        var rh = "";
    //                        //alert(JSON.stringify(ch));
    //                        ch.innerHTML = ch.innerHTML.replace('<a href="javascript:void(0)"', '<span');
    //                        //  ch.InnerHtml =ch.InnerHtml.replace('','<span');
    //                        //class="editable editable-click"
    //                        ch.innerHTML = ch.innerHTML.replace('class="editable editable-click"', '');
    //                        ch.innerHTML = ch.innerHTML.replace('</a>', '</span>');
    //                        var p = ch.innerHTML;

    //                    }
    //                }
    //            }
    //        } catch (e) {

    //        }
    //    }
    // var url = $$ApiUrl + "/companies";
    $scope.assets = {
        liquids: [
        {varName:'Savings', name: 'Сбережения'},
        {varName:'Deposit', name: 'Депозит'}],
        raws: [{varName:'Inventories', name:'ТМЗ'},
        {varName:'FinishedGoods', name:'Готовая продукция'},
        {varName:'RawMaterials', name:'Сырье'},
        {varName:'SemiProducts', name:'Полуфабрикаты/материалы'}]
    };

    $scope.initBalance = function() {$scope.currentProject = projectFactory.getToCurrentProject();

        if (!$scope.currentProject.FinDataBalance.Balances ||
            $scope.currentProject.FinDataBalance.Balances.length == 0) {
            if ($scope.currentProject.ClientData.FinAnalysisCompanies &&
                $scope.currentProject.ClientData.FinAnalysisCompanies.length > 0) {

                $scope.currentProject.FinDataBalance.Companies = angular
                    .copy($scope.currentProject.ClientData.FinAnalysisCompanies);

                $scope.mElement = $scope.currentProject.FinDataBalance;
                $scope.addNewModal('PartialViews/Modals/FinDataBalance/BalanceModal.html',
                    manageBalanceController,
                    $scope.mElement,
                    'balanceData',
                    $scope.mElement);

            } else {
                var dialog = new BootstrapDialog({
                    type: BootstrapDialog.TYPE_WARNING,
                    size: BootstrapDialog.SIZE_SMALL,
                    title: "Не указаны данные",
                    message:
                        '<div style="text-align:center">Во вкладке "Данные о клиенте" подпункте "Финансовый анализ компаний" укажите количество компаний и их названия.' +
                            ' По данным компаниям будет проведен финансовый анализ.' +
                            '</div>'
                });
                dialog.setSize(BootstrapDialog.SIZE_SMALL);
                dialog.open();
            }
        } else {
            $scope.activeCompany = projectFactory.getActiveCompanyBalance(1);
            if ($scope.activeCompany.CompanyBalances && $scope.activeCompany.CompanyBalances.length > 0) {
                $scope.activeBalance = $scope.activeCompany.CompanyBalances[0];
            }
        }




        //$scope.columns = [];

        //if ($scope.currentProject.ParentExists) {
        //    $scope.columns = $scope.getToMultiPeriodHeader();
        //} else {
        //    $scope.columns = $scope.getToSinglePeriodHeader();

        //}
        //balanceTableFactory.setSinglePeriodProject($scope.currentProject);
        //$('#balanceTable').bootstrapTable({
        //    idField: 'Title',
        //    pagination: false,
        //    search: true,
        //    data: $scope.currentProject.FinDataBalance.Table,
        //    columns: $scope.columns,
        //    onClickCell: cellClick
        //});

        //$scope.formatTable();
        //$scope.$watch('currentProject.FinDataBalance.Table', function(newValue, oldValue) {
        //    if (newValue != oldValue) {
        //        balanceTableFactory.setDataToBalance($scope.currentProject);

        //    }
        //}, true);
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
            if (elements !== 'balanceData') {
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
                projectFactory.initBalances($scope.currentProject.FinDataBalance.Companies);

                $scope.activeCompany = projectFactory.getActiveCompanyBalance($scope.activeCompany.Id);
                if ($scope.activeCompany.CompanyBalances && $scope.activeCompany.CompanyBalances.length > 0) {
                    $scope.activeBalance = $scope.activeCompany.CompanyBalances[0];
                }
            }
            projectHttpService.manageProject($http, $scope, usSpinnerService, projectFactory.getToCurrentProject(), false);

        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });

    };

    $scope.initBalance();
    usSpinnerService.stop("spinner-1");

    $scope.activeCompanyChangedChanged = function() {
        $scope.activeCompany = projectFactory.getActiveCompanyBalance($scope.activeCompany.Id);
        if ($scope.activeCompany.CompanyBalances && $scope.activeCompany.CompanyBalances.length > 0) {
            $scope.activeBalance = $scope.activeCompany.CompanyBalances[0];
        }
    };

    $scope.addNewRow = function(rows) {
        rows.push({Id:rows.length+1});
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
        projectHttpService.manageProject($http, $scope, usSpinnerService, projectFactory.getToCurrentProject(), false);

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

    $scope.calculateBalance = function(balance, companyId) {
        // null assets
        balance.LiquidAssets = 0;
        balance.Receivables = 0;
        balance.Inventories = 0;
        balance.TotalCurrentAssets = 0;
        balance.TotalFixedAssets = 0;
        balance.TotalAssets = 0;
        // null liabilities
        balance.TotalShortTermDebt = 0;
        balance.TotalLongTermDebt = 0;
        balance.TotalLongAccountsPayable = 0;
        balance.Equity = 0;
        balance.TotalLiabilities = 0;

        // calculating liabilities
        var shortTermLiabilities = ['BudgetSettlements',
                    'RentalsArrears',
                    'ShortTermDebt',
                    'PayableAccounts',
                    'CommodityLoan',
                    'CustomersPrepayment',
                    'ShortPrivateLoans',
                    'ShortWorkingCapitalCredit',
                    'ShortFixedAssetsCredit',
                    'OtherCurrentDebt'];

        var longTermLiabilities = [
            'LongPrivateLoans',
            'LongWorkingCapitalCredit',
            'LongFixedAssetsCredit',
            'OtherLiabilities'
        ];

        angular.forEach(shortTermLiabilities, function(varName, varKey) {
            balance.Liabilities[varName].Total = 0;
            balance.Liabilities[varName].ConsTotal = 0;
            balance.Liabilities[varName].OutTotal = 0;
            angular.forEach(balance.Liabilities[varName].Rows, function(tRow, tKey) {
                
                if (!tRow.IsRelatedCompany) {
                    balance.Liabilities[varName].ConsTotal += calculatorFactory.getFloat(tRow.Sum);
                }

                if(varName === 'PayableAccounts' && tRow.IsRelatedCompany){
                    balance.Liabilities[varName].OutTotal += calculatorFactory.getFloat(tRow.Sum);
                }else {
                    balance.Liabilities[varName].Total += calculatorFactory.getFloat(tRow.Sum);
                }

            });
            balance.TotalShortTermDebt += balance.Liabilities[varName].Total;
        });



        angular.forEach(longTermLiabilities, function(varName, varKey) {
            balance.Liabilities[varName].Total = 0;
            balance.Liabilities[varName].ConsTotal = 0;
            balance.Liabilities[varName].OutTotal = 0;

            angular.forEach(balance.Liabilities[varName].Rows, function(tRow, tKey) {
                if (!tRow.IsRelatedCompany) {
                    balance.Liabilities[varName].ConsTotal += calculatorFactory.getFloat(tRow.Sum);
                }
                balance.Liabilities[varName].Total += calculatorFactory.getFloat(tRow.Sum);
            });
            balance.TotalLongTermDebt += balance.Liabilities[varName].Total;
        });

        balance.TotalLongAccountsPayable = balance.TotalShortTermDebt + balance.TotalLongTermDebt;

        // calculating assets
        // liquids
        var liqs = [
            'Checkout',
            'Savings',
            'Deposit'
        ];

        angular.forEach(liqs, function(varName, varKey) {
            balance.Assets[varName].Total = 0;
            balance.Assets[varName].ConsTotal = 0;
            balance.Assets[varName].OutTotal = 0;

            angular.forEach(balance.Assets[varName].Rows, function(tRow, tKey) {
                var totalOut = calculatorFactory.getFloat(tRow.NotConfirmed) + calculatorFactory.getFloat(tRow.OutBusiness);
                balance.Assets[varName].OutTotal += totalOut;
                balance.Assets[varName].Total += calculatorFactory.getFloat(tRow.Sum) - totalOut;
            });
            balance.LiquidAssets += balance.Assets[varName].Total;
        });

        balance.Assets.CurrentAccount.ConsTotal = 0;
        balance.Assets.CurrentAccount.OutTotal = 0;
        balance.Assets.CurrentAccount.Total = 0;
        angular.forEach(balance.Assets.CurrentAccount.Rows, function(tRow, tKey) {
            balance.Assets.CurrentAccount.Total += calculatorFactory.getFloat(tRow.Sum);
        });
        balance.LiquidAssets += balance.Assets.CurrentAccount.Total;

        // debt recievables
        //'RecievableAccounts','OtherRecievables',
        var recvbls = ['RecievableAccounts', 'OtherRecievables'];
        angular.forEach(recvbls, function(varName, varKey) {
            balance.Assets[varName].Total = 0;
            balance.Assets[varName].ConsTotal = 0;
            balance.Assets[varName].OutTotal = 0;

            angular.forEach(balance.Assets[varName].Rows, function(tRow, tKey) {
                var sum = calculatorFactory.getFloat(tRow.Sum);
                if (!tRow.IsRelatedCompany) {
                    balance.Assets[varName].ConsTotal += sum;
                }
                if (tRow.NoReturn) {
                    balance.Assets[varName].OutTotal += sum;
                } else {
                    balance.Assets[varName].Total +=  sum;
                }
            });
            balance.Receivables += balance.Assets[varName].Total;
        });
        //'TransitGoods','SuppliersPrepayment',
        var tgsps = ['TransitGoods', 'SuppliersPrepayment'];
        angular.forEach(tgsps, function(varName, varKey) {
            balance.Assets[varName].Total = 0;
            balance.Assets[varName].ConsTotal = 0;
            balance.Assets[varName].OutTotal = 0;

            angular.forEach(balance.Assets[varName].Rows, function(tRow, tKey) {
                var sum = calculatorFactory.getFloat(tRow.Sum);
                balance.Assets[varName].Total +=  sum;
            });
            balance.Receivables += balance.Assets[varName].Total;
        });
        
        // TMZ
        // 'Inventories','FinishedGoods','RawMaterials','SemiProducts',
        var ifrss = ['Inventories','FinishedGoods','RawMaterials','SemiProducts'];
        angular.forEach(ifrss, function(varName, varKey) {
            balance.Assets[varName].Total = 0;
            balance.Assets[varName].ConsTotal = 0;
            balance.Assets[varName].OutTotal = 0;

            angular.forEach(balance.Assets[varName].Rows, function(tRow, tKey) {
                var quantity = calculatorFactory.getFloat(tRow.Quantity);
                var costPU = calculatorFactory.getFloat(tRow.CostPerUnit);
                tRow.Sum = (quantity * costPU).toFixed(2);
                balance.Assets[varName].Total +=  calculatorFactory.getFloat(tRow.Sum);
            });
            balance.Inventories += balance.Assets[varName].Total;
        });
        // ForSaleGoods
        balance.Assets.ForSaleGoods.ConsTotal = 0;
        balance.Assets.ForSaleGoods.OutTotal = 0;
        balance.Assets.ForSaleGoods.Total = 0;
        angular.forEach(balance.Assets.ForSaleGoods.Rows, function(tRow, tKey) {
            balance.Assets.ForSaleGoods.Total += calculatorFactory.getFloat(tRow.Sum);
        });
        balance.Inventories += balance.Assets.ForSaleGoods.Total;

        //TotalCurrentAssets
        balance.TotalCurrentAssets = balance.Inventories + balance.LiquidAssets + balance.Receivables;
        
        //FixedAssets
        //Hardware, MotorTransport
        var hmts = ['Hardware','MotorTransport'];
        angular.forEach(hmts, function(varName, varKey) {
            balance.Assets[varName].Total = 0;
            balance.Assets[varName].ConsTotal = 0;
            balance.Assets[varName].OutTotal = 0;

            angular.forEach(balance.Assets[varName].Rows, function(tRow, tKey) {
                var quantity = calculatorFactory.getFloat(tRow.Quantity);
                var costB1 = calculatorFactory.getFloat(tRow.CostB1);
                var costB2 = calculatorFactory.getFloat(tRow.CostB2);
                tRow.Revalue = (costB2-costB1).toFixed(2);
                balance.Assets[varName].Total +=  (costB2*quantity).toFixed(2);
            });
            angular.forEach(balance.Assets[varName].OwnRows, function(tRow, tKey) {
                var quantity = calculatorFactory.getFloat(tRow.Quantity);
                var costB1 = calculatorFactory.getFloat(tRow.CostBuy);
                var costB2 = calculatorFactory.getFloat(tRow.CostB2);
                tRow.CostDiff = (costB2-costB1).toFixed(2);
                balance.Assets[varName].Total +=  (costB2*quantity).toFixed(2);
            });
            balance.TotalFixedAssets += balance.Assets[varName].Total;
        });
        // RealEstate
        balance.Assets.RealEstate.ConsTotal = 0;
        balance.Assets.RealEstate.OutTotal = 0;
        balance.Assets.RealEstate.Total = 0;
        angular.forEach(balance.Assets.RealEstate.Rows, function(tRow, tKey) {
            var costB1 = calculatorFactory.getFloat(tRow.CostB1);
            var costB2 = calculatorFactory.getFloat(tRow.CostB2);
            tRow.Revalue = (costB2-costB1).toFixed(2);
            balance.Assets.RealEstate.Total +=  (costB2).toFixed(2);
        });
        balance.TotalFixedAssets += balance.Assets.RealEstate.Total;

        //Investments
        balance.Assets.Investments.ConsTotal = 0;
        balance.Assets.Investments.OutTotal = 0;
        balance.Assets.Investments.Total = 0;
        angular.forEach(balance.Assets.Investments.Rows, function(tRow, tKey) {
            balance.Assets.Investments.Total += calculatorFactory.getFloat(tRow.Sum);
        });


        //TotalAssets
        balance.TotalAssets = 
            calculatorFactory.getFloat(balance.TotalCurrentAssets) + 
            calculatorFactory.getFloat(balance.TotalFixedAssets) + 
            calculatorFactory.getFloat(balance.Assets.Investments.Total);

        balance.Equity = balance.TotalAssets - balance.TotalLongAccountsPayable;
        balance.TotalLiabilities = balance.Equity + balance.TotalLongAccountsPayable;

        // save balance to factory
        projectFactory.setBalancesBalance(balance, companyId);
    }
};
blitzApp.controller("finDataBalanceTableController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "projectFactory", "balanceTableFactory", "balanceCalculatorFactory", "calculatorFactory", "projectHttpService", finDataBalanceTableController]);