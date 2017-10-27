var manageOddsController = function ($scope, $uibModal, $uibModalInstance) {
    var vm = this;

    function loadOddsData() {
        vm.$scope = $scope;
        vm.confirm = function() {
            if ($scope.oddsForm.$valid) { $uibModalInstance.close(); }
        };
        vm.cancel = $uibModalInstance.dismiss;
    }
    loadOddsData();
};
blitzApp.controller("manageOddsController", ["$scope", "$uibModal", "$uibModalInstance", manageOddsController]);