var manageBalanceController = function ($scope, $uibModal, $uibModalInstance) {
    var vm = this;

    function loadBalanceData() {
        $scope.loadPreviousProjects();
        vm.$scope = $scope;
        vm.confirm = function () {
            if ($scope.balanceForm.$valid) {
                if (!$scope.previousEnabled) {
                    $scope.mElement.PreviousFinAnalysisDate = undefined;
                }
                $uibModalInstance.close();
            }
        };
        vm.cancel = $uibModalInstance.dismiss;
    }
    loadBalanceData();
};
blitzApp.controller("manageBalanceController", ["$scope", "$uibModal", "$uibModalInstance", manageBalanceController]);