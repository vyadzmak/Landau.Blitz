var manageFieldController = function($scope, $http, $location, $state, $uibModal, $uibModalInstance, $stateParams, usSpinnerService, items) {
    var url = $$ApiUrl + "/Sheets";
    var vm = this;

    function loadFieldData() {
        vm.$scope = $scope;
        vm.items = items;
        vm.Field = $scope.field;
        vm.confirm = function() {
            if ($scope.fieldForm.$valid) { $uibModalInstance.close(); }
        };
        vm.cancel = $uibModalInstance.dismiss;

    }
    loadFieldData();


};
blitzApp.controller("manageFieldController", ["$scope", "$http", "$location", "$state", "$uibModal", "$uibModalInstance", "$stateParams", "usSpinnerService", manageFieldController]);