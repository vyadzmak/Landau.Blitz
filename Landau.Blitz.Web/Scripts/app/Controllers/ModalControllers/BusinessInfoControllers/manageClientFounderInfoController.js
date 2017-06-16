var manageClientFounderInfoController = function ($scope, $uibModal, $uibModalInstance) {
    var vm = this;

    function loadClientFounderInfoData() {
        vm.$scope = $scope;
        vm.confirm = function() {
            if ($scope.clientFounderInfoForm.$valid) { $uibModalInstance.close(); }
        };
        vm.cancel = $uibModalInstance.dismiss;
    }
    loadClientFounderInfoData();


};
blitzApp.controller("manageClientFounderInfoController", ["$scope", "$uibModal", "$uibModalInstance", manageClientFounderInfoController]);