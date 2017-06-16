var manageSupplierStructureController = function ($scope, $uibModal, $uibModalInstance) {
    var vm = this;

    function loadSupplierStructureData() {
        vm.$scope = $scope;
        vm.confirm = function() {
            if ($scope.supplierStructureForm.$valid) { $uibModalInstance.close(); }
        };
        vm.cancel = $uibModalInstance.dismiss;
    }
    loadSupplierStructureData();


};
blitzApp.controller("manageSupplierStructureController", ["$scope", "$uibModal", "$uibModalInstance", manageSupplierStructureController]);