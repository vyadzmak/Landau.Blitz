var manageSettingController = function($scope, $uibModal, $uibModalInstance) {
    var vm = this;

    function loadSettingData() {
        vm.$scope = $scope;
        vm.confirm = function() {
            if ($scope.settingForm.$valid) { $uibModalInstance.close(); }
        };
        vm.cancel = $uibModalInstance.dismiss;
    }
    loadSettingData();


};
blitzApp.controller("manageSettingController", ["$scope", "$uibModal", "$uibModalInstance", manageSettingController]);