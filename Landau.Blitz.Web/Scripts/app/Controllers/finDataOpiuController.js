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

var finDataOpiuController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, NgTableParams, projectFactory) {

    $scope.init = function() {


        $scope.currentProject = projectFactory.getToCurrentProject();

        $('#opiuTable').bootstrapTable({
            idField: 'Title',
            pagination: false,
            search: true,
            data: $scope.currentProject.FinDataOpiu.Table,

            columns: [{
                field: 'Title',
                title: 'Наименование'
            }, {
                field: 'M1',
                title: '1',
                editable: {
                    type: 'text'
                },
                formatter: formatCurrency
            }, {
                field: 'M2',
                title: '2',
                editable: {
                    type: 'text'
                },
                formatter: formatCurrency
            }, {
                field: 'M3',
                title: '3',
                editable: {
                    type: 'text'
                },
                formatter: formatCurrency
            }, {
                field: 'M4',
                title: '4',
                editable: {
                    type: 'text'
                },
                formatter: formatCurrency
            }, {
                field: 'M5',
                title: '5',
                editable: {
                    type: 'text'
                },
                formatter: formatCurrency
            }, {
                field: 'M6',
                title: '6',
                editable: {
                    type: 'text'
                },
                formatter: formatCurrency
            }, {
                field: 'Avg',
                title: 'Среднее текущее',
                formatter: formatCurrency
            }, {
                field: 'AvgPrognose',
                title: 'Среднее прогноз',
                formatter: formatCurrency
            }]
        });
    }



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
};
blitzApp.controller("finDataOpiuController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "NgTableParams", "projectFactory", finDataOpiuController]);