var readyMadeValueController = function ($scope, $uibModal, $uibModalInstance) {
    var vm = this;

    function loadReadyData() {
        vm.$scope = $scope;
        vm.updateData = $scope.mElement.Row['M' + $scope.mElement.Month.Id];
        vm.confirm = function () {
            $scope.submitted = true;
            if ($scope.readyMadeValueForm.$valid) {
                $scope.submitted = false;
                $scope.mElement.Row['M' + $scope.mElement.Month.Id] = vm.updateData;
                $uibModalInstance.close();
            }
        };
        vm.cancel = $uibModalInstance.dismiss;
    }
    loadReadyData();
};
blitzApp.controller("readyMadeValueController", ["$scope", "$uibModal", "$uibModalInstance", readyMadeValueController]);