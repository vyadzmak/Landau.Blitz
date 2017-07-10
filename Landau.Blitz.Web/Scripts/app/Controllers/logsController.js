var logsController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, promiseUtils, httpService) {
    var url = $$ApiUrl + "/log";
    $scope.logs = [];
    $scope.showProjectMenu = false;
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

    $scope.makeDeleteLog = function() {
        var rParams = { id: -1 };
        promiseUtils.getPromiseHttpResult(httpService.deleteRequest($http, $scope, usSpinnerService, url, rParams)).then(function(result) {
            if (result == "OK") {
                $scope.logs = [];
            }
            $('#logTable').bootstrapTable('load', $scope.logs);
            //  $('#logTable').bootstrapTable('resetView');
        })
    }

    $scope.cleanLog = function() {

        var dialog = BootstrapDialog.confirm({
            title: 'Предупреждение',
            message: 'Вы действительно хотите очистить лог?',
            type: BootstrapDialog.TYPE_WARNING,
            size: BootstrapDialog.SIZE_SMALL,
            closable: true,
            btnCancelLabel: 'Нет',
            btnOKLabel: 'Да',
            btnOKClass: 'btn-warning',
            callback: function(result) {
                if (result) {
                    $scope.makeDeleteLog();
                }
            }
        });
        dialog.setSize(BootstrapDialog.SIZE_SMALL);
    }



};
blitzApp.controller("logsController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "promiseUtils", "httpService", logsController]);