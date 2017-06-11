var manageCatalogFieldController = function($scope, $http, $location, $state, $uibModal, $uibModalInstance, $stateParams, usSpinnerService, items) {
    var url = $$ApiUrl + "/Sheets";
    var vm = this;

    function loadCatalogFieldData() {
        vm.$scope = $scope;
        vm.items = items;
        vm.CatalogField = $scope.catalogField;
        vm.confirm = function() {
            if ($scope.catalogFieldForm.$valid) { $uibModalInstance.close(); }
        };
        vm.cancel = $uibModalInstance.dismiss;

    }
    loadCatalogFieldData();


};
blitzApp.controller("manageCatalogFieldController", ["$scope", "$http", "$location", "$state", "$uibModal", "$uibModalInstance", "$stateParams", "usSpinnerService", manageCatalogFieldController]);