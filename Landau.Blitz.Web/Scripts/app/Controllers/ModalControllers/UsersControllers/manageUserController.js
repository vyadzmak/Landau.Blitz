var manageUserController = function($scope, $uibModal, $uibModalInstance) {
    var vm = this;

    function loadUserData() {
        vm.$scope = $scope;
        vm.confirm = function() {
            if ($scope.userForm.$valid) { $uibModalInstance.close(); }
        };
        vm.cancel = $uibModalInstance.dismiss;
    }
    loadUserData();


};
blitzApp.controller("manageUserController", ["$scope", "$uibModal", "$uibModalInstance", manageUserController]);