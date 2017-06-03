function actionFormatter(value, row, index) {
    var companyId = row.companyId;
    return [
        '<button class="btn btn-info orange-tooltip edit-company" href="javascript:void(0)" title="Редактировать" style=" text-align: center;" ',
        'data-toggle="tooltip" title="Редактировать компанию"  data-placement="bottom">',
        '<i class="glyphicon glyphicon-edit"></i>',
        '</button>'
    ].join('');
}

(function() {
    var systemSettingsController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, systemSettingsHttpService) {
        // var url = $$ApiUrl + "/companies";
    };
    blitzApp.controller("systemSettingsController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "systemSettingsHttpService", systemSettingsController]);
}())