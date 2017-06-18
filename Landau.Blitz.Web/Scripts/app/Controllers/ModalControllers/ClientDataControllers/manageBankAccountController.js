var manageBankAccountController = function($scope, $uibModal, $uibModalInstance) {
    var vm = this;

    function loadBankAccountData() {
        vm.$scope = $scope;
        vm.confirm = function() {
            if ($scope.bankAccountForm.$valid) { $uibModalInstance.close(); }
        };
        vm.cancel = $uibModalInstance.dismiss;

    }
    loadBankAccountData();


};
blitzApp.controller("manageBankAccountController", ["$scope", "$uibModal", "$uibModalInstance", manageBankAccountController]);