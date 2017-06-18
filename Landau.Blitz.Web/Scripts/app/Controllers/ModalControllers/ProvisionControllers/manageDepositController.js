var manageDepositController = function ($scope, $uibModal, $uibModalInstance) {
    var vm = this;

    function loadDepositData() {
        vm.$scope = $scope;
        vm.confirm = function() {
            if ($scope.depositForm.$valid) { $uibModalInstance.close(); }
        };
        vm.cancel = $uibModalInstance.dismiss;
    }
    loadDepositData();


};
blitzApp.controller("manageDepositController", ["$scope", "$uibModal", "$uibModalInstance", manageDepositController]);