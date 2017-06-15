var manageRelatedCompanyController = function($scope, $uibModal, $uibModalInstance) {
    var vm = this;

    function loadRelatedCompanyData() {
        vm.$scope = $scope;
        vm.confirm = function() {
            if ($scope.relatedCompanyForm.$valid) { $uibModalInstance.close(); }
        };
        vm.cancel = $uibModalInstance.dismiss;

    }
    loadRelatedCompanyData();


};
blitzApp.controller("manageRelatedCompanyController", ["$scope", "$uibModal", "$uibModalInstance", manageRelatedCompanyController]);