var logsController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, promiseUtils, httpService) {
    var url = $$ApiUrl + "/log";
    $scope.logs = [];

    promiseUtils.getPromiseHttpResult(httpService.getRequestList($http, $scope, usSpinnerService, url)).then(function(result) {
        $scope.logs = JSON.parse(result);
        $('#logTable').bootstrapTable({
            idField: 'Id',
            pagination: true,
            search: true,
            data: $scope.logs,
            showColumns: true,
            columns: [{
                    field: 'Id',
                    title: 'Id',
                    sortable: true
                }, {
                    field: 'Date',
                    title: 'Дата',
                    sortable: true
                },
                {
                    field: 'Message',
                    title: 'Сообщение',
                    sortable: true
                }
            ]
        });


    })




};
blitzApp.controller("logsController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "promiseUtils", "httpService", logsController]);