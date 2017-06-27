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
                }
            }, {
                field: 'M2',
                title: '2',
                editable: {
                    type: 'text'
                }
            }, {
                field: 'M3',
                title: '3',
                editable: {
                    type: 'text'
                }
            }, {
                field: 'M4',
                title: '4',
                editable: {
                    type: 'text'
                }
            }, {
                field: 'M5',
                title: '5',
                editable: {
                    type: 'text'
                }
            }, {
                field: 'M6',
                title: '6',
                editable: {
                    type: 'text'
                }
            }, {
                field: 'Avg',
                title: 'Среднее текущее',

            }, {
                field: 'AvgPrognose',
                title: 'Среднее прогноз',

            }]
        });
    }



    $scope.init();
    usSpinnerService.stop("spinner-1");
};
blitzApp.controller("finDataOddsController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "projectFactory", finDataOddsController]);