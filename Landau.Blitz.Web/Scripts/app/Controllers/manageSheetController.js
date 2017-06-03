var manageSheetController = function($scope, $http, $location, $state, $uibModal, $uibModalInstance, $stateParams, usSpinnerService, items) {
    var url = $$ApiUrl + "/Sheets";
    var vm = this;

    function loadSheetData() {
        vm.$scope = $scope;
        vm.items = items;
        vm.Sheet = $scope.sheet;
        vm.confirm = function() {
            if ($scope.sheetForm.$valid) { $uibModalInstance.close(); }
        };
        vm.cancel = $uibModalInstance.dismiss;

    }
    loadSheetData();


};
blitzApp.controller("manageSheetController", ["$scope", "$http", "$location", "$state", "$uibModal", "$uibModalInstance", "$stateParams", "usSpinnerService", manageSheetController]);