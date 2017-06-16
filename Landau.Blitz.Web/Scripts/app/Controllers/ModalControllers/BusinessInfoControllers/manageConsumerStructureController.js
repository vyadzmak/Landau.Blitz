var manageConsumerStructureController = function ($scope, $uibModal, $uibModalInstance) {
    var vm = this;

    function loadConsumerStructureData() {
        vm.$scope = $scope;
        vm.confirm = function() {
            if ($scope.consumerStructureForm.$valid) { $uibModalInstance.close(); }
        };
        vm.cancel = $uibModalInstance.dismiss;
    }
    loadConsumerStructureData();


};
blitzApp.controller("manageConsumerStructureController", ["$scope", "$uibModal", "$uibModalInstance", manageConsumerStructureController]);