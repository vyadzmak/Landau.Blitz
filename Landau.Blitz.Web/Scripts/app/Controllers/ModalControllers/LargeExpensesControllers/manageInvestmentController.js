var manageInvestmentController = function($scope, $uibModal, $uibModalInstance) {
    var vm = this;

    function loadInvestmentData() {
        vm.$scope = $scope;
        //vm.BusinessPlace = $scope.businessPlace;
        vm.confirm = function() {
            if ($scope.investmentForm.$valid) { $uibModalInstance.close(); }
        };
        vm.cancel = $uibModalInstance.dismiss;

    }
    loadInvestmentData();


};
blitzApp.controller("manageOutOfBuisnessPaymentController", ["$scope", "$uibModal", "$uibModalInstance", manageInvestmentController]);