var manageElementController = function($scope, $http, $location, $state, $uibModal, $uibModalInstance, $stateParams, usSpinnerService, items) {
    var url = $$ApiUrl + "/Sheets";
    var vm = this;

    function loadElementData() {
        vm.$scope = $scope;
        vm.items = items;
        vm.Element = $scope.element;
        vm.confirm = function() {
            if ($scope.elementForm.$valid) { $uibModalInstance.close(); }
        };
        vm.cancel = $uibModalInstance.dismiss;

    }
    loadElementData();


};
blitzApp.controller("manageElementController", ["$scope", "$http", "$location", "$state", "$uibModal", "$uibModalInstance", "$stateParams", "usSpinnerService", manageElementController]);