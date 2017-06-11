var manageCatalogController = function($scope, $http, $location, $state, $uibModal, $uibModalInstance, $stateParams, usSpinnerService, items) {
    var url = $$ApiUrl + "/catalogs";
    var vm = this;

    function loadCatalogData() {
        vm.$scope = $scope;
        vm.items = items;
        vm.Catalog = $scope.catalog;
        vm.confirm = function() {
            if ($scope.catalogForm.$valid) { $uibModalInstance.close(); }
        };
        vm.cancel = $uibModalInstance.dismiss;

    }
    loadCatalogData();


};
blitzApp.controller("manageCatalogController", ["$scope", "$http", "$location", "$state", "$uibModal", "$uibModalInstance", "$stateParams", "usSpinnerService", manageCatalogController]);