var manageActualOwnerCompanyController = function($scope, $uibModal, $uibModalInstance) {
    var vm = this;

    function loadActualOwnerCompanyData() {
        vm.$scope = $scope;
        vm.confirm = function() {
            if ($scope.actualOwnerCompanyForm.$valid) { $uibModalInstance.close(); }
        };
        vm.cancel = $uibModalInstance.dismiss;

    }
    loadActualOwnerCompanyData();


};
blitzApp.controller("manageActualOwnerCompanyController", ["$scope", "$uibModal", "$uibModalInstance", manageActualOwnerCompanyController]);