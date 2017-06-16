var manageCreditHistoryController = function($scope, $uibModal, $uibModalInstance) {
    var vm = this;

    function loadCreditHistoryData() {
        vm.$scope = $scope;
        vm.confirm = function() {
            if ($scope.creditHistoryForm.$valid) { $uibModalInstance.close(); }
        };
        vm.cancel = $uibModalInstance.dismiss;

    }
    loadCreditHistoryData();


};
blitzApp.controller("manageCreditHistoryController", ["$scope", "$uibModal", "$uibModalInstance", manageCreditHistoryController]);