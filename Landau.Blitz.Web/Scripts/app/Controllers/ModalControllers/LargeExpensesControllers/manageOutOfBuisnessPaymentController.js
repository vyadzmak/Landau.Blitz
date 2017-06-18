var manageOutOfBuisnessPaymentController = function($scope, $uibModal, $uibModalInstance) {
    var vm = this;

    function loadoutOfBuisnessPaymentData() {
        vm.$scope = $scope;
        //vm.BusinessPlace = $scope.businessPlace;
        vm.confirm = function() {
            if ($scope.outOfBuisnessPaymentForm.$valid) { $uibModalInstance.close(); }
        };
        vm.cancel = $uibModalInstance.dismiss;

    }
    loadoutOfBuisnessPaymentData();


};
blitzApp.controller("manageOutOfBuisnessPaymentController", ["$scope", "$uibModal", "$uibModalInstance", manageOutOfBuisnessPaymentController]);