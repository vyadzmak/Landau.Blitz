function formatCurrency(value) {
    if (value == "0") return "0";
    if (value == "") return "";
    var t = +value;
    return t.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        //return "<i>" + value + "</i>"
}

var finDataOddsController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, projectFactory) {
    // var url = $$ApiUrl + "/companies";
    $scope.init = function() {


        $scope.currentProject = projectFactory.getToCurrentProject();

        $('#oddsTable').bootstrapTable({
            idField: 'Title',
            pagination: false,
            search: true,
            data: $scope.currentProject.FinDataOdds.Table,

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
    usSpinnerService.stop("spinner-1");
};
blitzApp.controller("finDataOddsController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "projectFactory", finDataOddsController]);