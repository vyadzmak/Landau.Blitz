function rowStyle(row, index) {
    var classes = ['active bold-trow', 'success', 'info', 'warning', 'danger'];

    if (row.Calculate) {
        return {
            classes: classes[0]
        }
    }

    return {};
}


function formatCurrency(value) {
    if (value == "0") return "0";
    if (value == "") return "";
    var t = +value;
    return t.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    //return "<i>" + value + "</i>"
}

var finDataOpiuController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, NgTableParams, projectHttpService, projectFactory) {

    $scope.init = function() {
        $scope.currentProject = projectFactory.getToCurrentProject();
        
        if (!$scope.currentProject.FinDataOpiu.Opius || $scope.currentProject.FinDataOpiu.Opius.length == 0) {
            if ($scope.currentProject.ClientData.FinAnalysisCompanies &&
                $scope.currentProject.ClientData.FinAnalysisCompanies.length > 0) {
                $scope.currentProject.FinDataOpiu.Companies = angular
                    .copy($scope.currentProject.ClientData.FinAnalysisCompanies);

                $scope.mElement = $scope.currentProject.FinDataOpiu;
                $scope.addNewModal('PartialViews/Modals/FinDataOpiu/OpiuModal.html',
                    manageOpiuController,
                    $scope.mElement,
                    'opiuData',
                    $scope.mElement);
            } else {
                var dialog = new BootstrapDialog({
                    type: BootstrapDialog.TYPE_WARNING,
                    size: BootstrapDialog.SIZE_SMALL,
                    title: "Не указаны данные",
                    message: '<div style="text-align:center">Во вкладке "Данные о клиенте" подпункте "Финансовый анализ компаний" укажите количество компаний и их названия.' +
                        ' По данным компаниям будет проведен финансовый анализ.' +
                        '</div>'
                });
                dialog.setSize(BootstrapDialog.SIZE_SMALL);
                dialog.open();
            }
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
            if (elements !== 'opiuData') {
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
                projectFactory.initOpius($scope.currentProject);
            }
            projectHttpService.manageProject($http, $scope, usSpinnerService, projectFactory.getToCurrentProject(), false);

        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.init();

    $scope.cleanData = function() {
        var x = document.getElementById("table").rows;

        for (var i = 0; i < x.length; i++) {

            var r = x[i];
            // alert(JSON.stringify(r));
            for (var j = 0; j < r.children.length; j++) {
                var ch = r.children[j];
                if (i == 1) {
                    var ih = ch.innerHTML;
                    var rh = "";
                    //alert(JSON.stringify(ch));
                    ch.innerHTML = ch.innerHTML.replace('<a href="javascript:void(0)"', '<span');
                    //  ch.InnerHtml =ch.InnerHtml.replace('','<span');
                    //class="editable editable-click"
                    ch.innerHTML = ch.innerHTML.replace('class="editable editable-click"', '');
                    ch.innerHTML = ch.innerHTML.replace('</a>', '</span>');
                    var p = ch.innerHTML;
                }
            }
        }
    }
    //$scope.cleanData();
    usSpinnerService.stop("spinner-1");
    var expenses = [
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
    ];
    var additionalPayments = [
        'StandardAddPayment',
        'InvestmentAddPayment',
        'TurnoverAddPayment'
    ];

    $scope.calculateOpiu = function(opiu) {
        var totalExpenses = $scope.getVarArrayByName(opiu, "TotalExpensesForBusiness");
        var totalAddPayments = $scope.getVarArrayByName(opiu, "AdditionalPayment");
        angular.forEach(opiu.Months, function(month, mKey) {
            totalExpenses['M' + month.Id] = 0;
            totalAddPayments['M' + month.Id] = 0;
        });
        var margin,
            revenues,
            costOfGoods,
            grossProfit,
            profitOnBusiness,
            otherIncome,
            otherExpenses,
            netProfit,
            loanPayment,
            netLoanBalance;

        // calculating totalExpenses and total addPayments
        angular.forEach(opiu.Table, function(tRow, rKey) {
            if(!tRow.Calculate && expenses.indexOf(tRow.VarName)!==-1){
                angular.forEach(opiu.Months, function(month, mKey) {
                    totalExpenses['M' + month.Id] += +tRow['M' + month.Id];
                });
            }
            else if (!tRow.Calculate && additionalPayments.indexOf(tRow.VarName) !== -1) {
                angular.forEach(opiu.Months, function(month, mKey) {
                    totalAddPayments['M' + month.Id] += +tRow['M' + month.Id];
                });
            } else {
                switch(tRow.VarName) {
                    case "CostOfGoods": costOfGoods = tRow; break;
                    case "Revenues": revenues = tRow; break;
                    case "Margin": margin = tRow; break;
                    case "GrossProfit": grossProfit = tRow; break;
                    case "ProfitOnBusiness": profitOnBusiness = tRow; break;
                    case "OtherIncome": otherIncome = tRow; break;
                    case "OtherExpenses": otherExpenses = tRow; break;
                    case "NetProfit": netProfit = tRow; break;
                    case "LoanPayment": loanPayment = tRow; break;
                    case "NetLoanBalance": netLoanBalance = tRow; break;
                }
            }
        });
        // calculate values
        angular.forEach(opiu.Table, function(tRow, rKey) {
            angular.forEach(opiu.Months, function(month, mKey) {
                margin['M'+ month.Id] = +revenues['M' + month.Id]/+costOfGoods['M' + month.Id]-1;
                grossProfit['M' + month.Id] = +revenues['M' + month.Id] - +costOfGoods['M' + month.Id];
                profitOnBusiness['M' + month.Id] = +grossProfit['M' + month.Id] - +totalExpenses['M' + month.Id];
                netProfit['M' + month.Id] = +profitOnBusiness['M' + month.Id] + +otherIncome['M' + month.Id] - +otherExpenses['M' + month.Id];
                netLoanBalance['M' + month.Id] = +netProfit['M' + month.Id] - +loanPayment['M' + month.Id];

                margin['M' + month.Id] = margin['M' + month.Id].toFixed(2);
                grossProfit['M' + month.Id] = grossProfit['M' + month.Id].toFixed(2);
                profitOnBusiness['M' + month.Id] = profitOnBusiness['M' + month.Id].toFixed(2);
                netProfit['M' + month.Id] = netProfit['M' + month.Id].toFixed(2);
                netLoanBalance['M' + month.Id] = netLoanBalance['M' + month.Id].toFixed(2);
            });
        });

        //calculate average for all rows
        angular.forEach(opiu.Table, function(tRow, rKey) {
            var totalByMonths = 0;
            angular.forEach(opiu.Months, function(month, mKey) {
                totalByMonths += +tRow['M' + month.Id];
            });
            tRow.Avg = totalByMonths / opiu.Months.length;
        });
    }

    $scope.getVarArrayByName = function(opiu, name) {
        var ob = opiu.Table.filter(function(item) {
            return item.VarName == name;
        });
        if (ob == undefined || ob.length === 0) return null;
        return ob[0];
    }

};
blitzApp.controller("finDataOpiuController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "NgTableParams", "projectHttpService", "projectFactory", finDataOpiuController]);