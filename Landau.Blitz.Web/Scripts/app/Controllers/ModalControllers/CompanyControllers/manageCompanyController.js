var manageCompanyController = function ($scope, $uibModal, $uibModalInstance) {
    var vm = this;

    function loadCompanyData() {
        vm.$scope = $scope;
        vm.confirm = function () {
            $scope.submitted = true;
            if ($scope.companyForm.$valid) {
                $scope.submitted = false;
                $uibModalInstance.close();
            }
        };
        vm.cancel = $uibModalInstance.dismiss;
    }
    loadCompanyData();


};
blitzApp.controller("manageCompanyController", ["$scope", "$uibModal", "$uibModalInstance", manageCompanyController]);