var manageLegalOwnerCompanyController = function($scope, $uibModal, $uibModalInstance) {
    var vm = this;

    function loadLegalOwnerCompanyData() {
        vm.$scope = $scope;
        vm.confirm = function() {
            if ($scope.legalOwnerCompanyForm.$valid) { $uibModalInstance.close(); }
        };
        vm.cancel = $uibModalInstance.dismiss;

    }
    loadLegalOwnerCompanyData();


};
blitzApp.controller("manageLegalOwnerCompanyController", ["$scope", "$uibModal", "$uibModalInstance", manageLegalOwnerCompanyController]);