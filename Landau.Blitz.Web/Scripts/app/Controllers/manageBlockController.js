var manageBlockController = function($scope, $http, $location, $state, $uibModal, $uibModalInstance, $stateParams, usSpinnerService, items) {
    var url = $$ApiUrl + "/Sheets";
    var vm = this;

    function loadBlockData() {
        vm.$scope = $scope;
        vm.items = items;
        vm.Block = $scope.block;
        vm.confirm = function() {
            if ($scope.blockForm.$valid) { $uibModalInstance.close(); }
        };
        vm.cancel = $uibModalInstance.dismiss;

    }
    loadBlockData();


};
blitzApp.controller("manageBlockController", ["$scope", "$http", "$location", "$state", "$uibModal", "$uibModalInstance", "$stateParams", "usSpinnerService", manageBlockController]);