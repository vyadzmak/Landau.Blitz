var manageSupplierController = function ($scope, $uibModal, $uibModalInstance) {
    var vm = this;

    function loadSupplierData() {
        vm.$scope = $scope;
        vm.confirm = function() {
            if ($scope.supplierForm.$valid) { $uibModalInstance.close(); }
        };
        vm.cancel = $uibModalInstance.dismiss;
    }
    loadSupplierData();


};
blitzApp.controller("manageSupplierController", ["$scope", "$uibModal", "$uibModalInstance", manageSupplierController]);