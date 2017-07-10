var manageProjectController = function($scope, $uibModal, $uibModalInstance) {
    var vm = this;

    function loadProjectData() {
        vm.$scope = $scope;
        vm.confirm = function() {
            if ($scope.projectForm.$valid) { $uibModalInstance.close(); }
        };
        vm.cancel = $uibModalInstance.dismiss;
    }
    loadProjectData();


};
blitzApp.controller("manageProjectController", ["$scope", "$uibModal", "$uibModalInstance", manageProjectController]);