// function cellStyle(value, row, index) {
//     var classes = ['active bold-trow', 'success', 'info', 'warning', 'danger'];
//     // alert(value + " " + index);
//     if (index == 0) {
//         return {
//             classes: classes[0]
//         };
//     }
//     return {};
// }


function rowBoldStyle(row, index) {
    var classes = ['active bold-trow', 'success', 'info', 'warning', 'danger'];

    if (row.Bold) {
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

function cellClick(field, value, row, $element) {
    //window.setDataToBalance();
}

var finDataBalanceTableController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, projectFactory, balanceTableFactory, balanceCalculatorFactory) {
    var edit = false;
    window.setDataToBalance = function() {
        if (edit) {
            balanceTableFactory.setDataToBalance($scope.currentProject);
            edit = false;
        } else {
            edit = true;
        }
    }

    $scope.getToSinglePeriodHeader = function() {
        var columns = [];
        var date = $scope.currentProject.FinDataBalance.Date;

        columns.push({ field: "Active", title: "Актив" });
        columns.push({ field: "ActiveDate1", title: date, editable: { type: "text", mode: "inline" }, formatter: formatCurrency });
        columns.push({ field: "Passive", title: "Пассив" });
        columns.push({ field: "PassiveDate1", title: date, editable: { type: "text", mode: "inline" }, formatter: formatCurrency });

        return columns;
    }

    $scope.getToMultiPeriodHeader = function() {
        var columns = [];
        var date = $scope.currentProject.FinDataBalance.Date;
        var prevDate = $scope.currentProject.FinDataBalance.PreviousDate;

        columns.push({ field: "Active", title: "Актив" });
        columns.push({ field: "ActiveDate1", title: prevDate });
        columns.push({ field: "ActiveDate2", title: date, editable: { type: "text", mode: "inline" }, formatter: formatCurrency });
        columns.push({ field: "Passive", title: "Пассив" });
        columns.push({ field: "PassiveDate1", title: prevDate });
        columns.push({ field: "PassiveDate2", title: date, editable: { type: "text", mode: "inline" }, formatter: formatCurrency });

        return columns;
    }

    $scope.formatTable = function() {
            try {
                var x = document.getElementById("balanceTable").rows;

                for (var i = 0; i < x.length; i++) {
                    //active bold-trow
                    var r = x[i];
                    // alert(JSON.stringify(r));
                    if (r.className == "active bold-trow")

                    {
                        for (var j = 0; j < r.children.length; j++) {
                            var ch = r.children[j];

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
            } catch (e) {

            }
        }
        // var url = $$ApiUrl + "/companies";
    $scope.initBalance = function() {
        $scope.currentProject = projectFactory.getToCurrentProject();

        $scope.columns = [];

        if ($scope.currentProject.ParentExists) {
            $scope.columns = $scope.getToMultiPeriodHeader();
        } else {
            $scope.columns = $scope.getToSinglePeriodHeader();

        }
        balanceTableFactory.setSinglePeriodProject($scope.currentProject);
        $('#balanceTable').bootstrapTable({
            idField: 'Title',
            pagination: false,
            search: true,
            data: $scope.currentProject.FinDataBalance.Table,
            columns: $scope.columns,
            onClickCell: cellClick
        });

        $scope.formatTable();
        $scope.$watch('currentProject.FinDataBalance.Table', function(newValue, oldValue) {
            if (newValue != oldValue) {
                balanceTableFactory.setDataToBalance($scope.currentProject);

            }
        }, true);
    }
    $scope.initBalance();
    usSpinnerService.stop("spinner-1");


};
blitzApp.controller("finDataBalanceTableController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "projectFactory", "balanceTableFactory", "balanceCalculatorFactory", finDataBalanceTableController]);