﻿var readyOddsValueController = function ($scope, $uibModal, $uibModalInstance) {
    var vm = this;

    function loadReadyData() {
        vm.$scope = $scope;
        vm.updateData = $scope.mElement.Row[$scope.mElement.Month.VarName];
        vm.confirm = function () {
            $scope.submitted = true;
            if ($scope.readyMadeValueForm.$valid) {
                $scope.submitted = false;
                $scope.mElement.Row[$scope.mElement.Month.VarName] = vm.updateData;
                $uibModalInstance.close();
            }
        };
        vm.cancel = $uibModalInstance.dismiss;
    }
    loadReadyData();
};
blitzApp.controller("readyOddsValueController", ["$scope", "$uibModal", "$uibModalInstance", readyOddsValueController]);