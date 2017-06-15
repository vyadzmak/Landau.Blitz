var manageDirectorInfoController = function($scope, $uibModal, $uibModalInstance) {
    var vm = this;

    function loadDirectorInfoData() {
        vm.$scope = $scope;
        vm.confirm = function() {
            if ($scope.directorInfoForm.$valid) { $uibModalInstance.close(); }
        };
        vm.cancel = $uibModalInstance.dismiss;

    }
    loadDirectorInfoData();


};
blitzApp.controller("manageDirectorInfoController", ["$scope", "$uibModal", "$uibModalInstance", manageDirectorInfoController]);