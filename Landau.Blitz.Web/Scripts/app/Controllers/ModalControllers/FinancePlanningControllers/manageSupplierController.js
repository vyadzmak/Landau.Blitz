var manageSupplierController = function ($scope, $uibModal, $uibModalInstance) {
    var vm = this;

    function loadSupplierData() {
        vm.$scope = $scope;
        if ($scope.mElement.OtherCostItem) {
            $scope.mElement.CostItem = null;
        }
        vm.confirm = function() {
            if ($scope.supplierForm.$valid) {
                if ($scope.mElement.OtherCostItem) {
                    $scope.mElement.CostItem = $scope.mElement.OtherCostItem;
                }
                 $uibModalInstance.close();
            }
        };
        vm.cancel = $uibModalInstance.dismiss;
    }
    loadSupplierData();


};
blitzApp.controller("manageSupplierController", ["$scope", "$uibModal", "$uibModalInstance", manageSupplierController]);