var manageTemplateController = function($scope, $http, $location, $state, $uibModal, $uibModalInstance, $stateParams, usSpinnerService, items) {
    var url = $$ApiUrl + "/templates";
    var vm = this;

    function loadTemplateData() {
        vm.$scope = $scope;
        vm.items = items;
        vm.template = $scope.template;
        vm.confirm = function() {
            if ($scope.templateForm.$valid) { $uibModalInstance.close(); }
        };
        vm.cancel = $uibModalInstance.dismiss;

    }
    loadTemplateData();


};
blitzApp.controller("manageTemplateController", ["$scope", "$http", "$location", "$state", "$uibModal", "$uibModalInstance", "$stateParams", "usSpinnerService", manageTemplateController]);