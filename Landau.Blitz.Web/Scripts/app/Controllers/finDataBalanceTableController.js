
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

var finDataBalanceTableController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, projectFactory, balanceTableFactory, balanceCalculatorFactory, projectHttpService) {
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

    $scope.initBalance = function() {

        $scope.assets = {
            liquids: [
            {varName:'Savings', name: 'Сбережения'},
            {varName:'Deposit', name: 'Депозит'}],
            raws: [{varName:'Inventories', name:'ТМЗ'},
            {varName:'FinishedGoods', name:'Готовая продукция'},
            {varName:'RawMaterials', name:'Сырье'},
            {varName:'SemiProducts', name:'Полуфабрикаты/материалы'}]
        };

        $scope.currentProject = projectFactory.getToCurrentProject();

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
            $scope.activeCompany = $scope.currentProject.FinDataBalance.Balances[0];
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
                $scope.currentProject.FinDataBalance.Balances = balanceTableFactory.initBalances($scope.currentProject.FinDataBalance.Companies);
                $scope.activeCompany = $scope.currentProject.FinDataBalance.Balances[0];
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

};
blitzApp.controller("finDataBalanceTableController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "projectFactory", "balanceTableFactory", "balanceCalculatorFactory", "projectHttpService", finDataBalanceTableController]);