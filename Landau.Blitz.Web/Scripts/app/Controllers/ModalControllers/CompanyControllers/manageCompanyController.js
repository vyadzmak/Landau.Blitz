var manageCompanyController = function($scope, $uibModal, $uibModalInstance) {
    var vm = this;

    function loadCompanyData() {
        vm.$scope = $scope;
        vm.confirm = function() {
            if ($scope.companyForm.$valid) { $uibModalInstance.close(); }
        };
        vm.cancel = $uibModalInstance.dismiss;
    }
    loadCompanyData();


};
blitzApp.controller("manageCompanyController", ["$scope", "$uibModal", "$uibModalInstance", manageCompanyController]);