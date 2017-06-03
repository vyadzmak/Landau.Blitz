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
    var companiesController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, companiesHttpService) {
        var url = $$ApiUrl + "/companies";
    };
    blitzApp.controller("companiesController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "companiesHttpService", companiesController]);
}())