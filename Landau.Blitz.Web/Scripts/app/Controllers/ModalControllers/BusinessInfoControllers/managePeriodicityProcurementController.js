var managePeriodicityProcurementController = function ($scope, $uibModal, $uibModalInstance) {
    var vm = this;

    function loadPriodicityProcurementData() {
        vm.$scope = $scope;
        vm.confirm = function() {
            if ($scope.periodicityProcurementForm.$valid) { $uibModalInstance.close(); }
        };
        vm.cancel = $uibModalInstance.dismiss;
    }
    loadPriodicityProcurementData();


};
blitzApp.controller("managePeriodicityProcurementController", ["$scope", "$uibModal", "$uibModalInstance", managePeriodicityProcurementController]);