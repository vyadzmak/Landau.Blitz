var manageProjectController = function($scope, $uibModal, $uibModalInstance) {
    var vm = this;

    function loadProjectData() {
        vm.$scope = $scope;
        vm.confirm = function() {
            if ($scope.projectForm.$valid) { $uibModalInstance.close(); }
        };
        vm.cancel = $uibModalInstance.dismiss;
        vm.modelOptions = {
            debounce: {
                default: 500,
                blur: 250
            },
            getterSetter: true
        };
    }
    loadProjectData();


};
blitzApp.controller("manageProjectController", ["$scope", "$uibModal", "$uibModalInstance", manageProjectController]);