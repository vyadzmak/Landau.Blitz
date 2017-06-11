function actionFormatterCatalogs(value, row, index) {
    var catalogId = row.catalogId;
    return [
        '<button class="btn btn-info orange-tooltip edit-catalog" href="javascript:void(0)" title="Редактировать" style=" text-align: center;" ',
        'data-toggle="tooltip" title="Редактировать каталог"  data-placement="bottom">',
        '<i class="glyphicon glyphicon-edit"></i>',
        '</button>'
    ].join('');
}


var catalogsController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, catalogsHttpService) {
    var url = $$ApiUrl + "/catalogs";


    var data = [];

    usSpinnerService.stop("spinner-1");

    $scope.loading = true;

    function loadCatalogsData() {
        catalogsHttpService.getToCatalogsList($http, $scope, $state, data, url, usSpinnerService)
    }
    loadCatalogsData();


    $window.actionEventsCatalogs = {
        'click .edit-catalog': function(e, value, row, index) {
            $scope.updateCatalog(row);
        }
    };

    $scope.updateCatalog = function(row) {
        var singleCatalog = {};
        var catalogId = row.catalogId;
        var found = $filter('filter')($scope.catalogs, { Id: catalogId }, true);
        if (found.length > 0) singleCatalog = angular.copy(found[0]);

        $scope.gotoAddNewCatalogView(singleCatalog);
    }

    //add new currency btn event
    $scope.gotoAddNewCatalogView = function(catalog = {}) {
        $scope.catalog = catalog;
        if (catalog != {}) {
            $scope.isEdit = true;
        }

        $scope.catalog = catalog;
        var modalInstance = $uibModal.open({
            templateUrl: 'PartialViews/CatalogManagment.html',
            controller: manageCatalogController,
            controllerAs: 'vm',
            scope: $scope,
            resolve: {
                items: function() {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function() {
            $log.info(JSON.stringify($scope.catalog));
            if ($scope.catalog.Id == undefined) $scope.isEdit = false;

            if (!$scope.isEdit) {
                $scope.catalog.Id = -1;
            }
            console.log(JSON.stringify($scope.catalog));
            catalogsHttpService.manageCatalog($http, $scope, data, url, usSpinnerService, $scope.isEdit);
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }
};
blitzApp.controller("catalogsController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "catalogsHttpService", catalogsController]);