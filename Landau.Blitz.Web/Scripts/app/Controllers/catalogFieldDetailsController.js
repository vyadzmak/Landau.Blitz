var catalogFieldDetailsController = function($scope, $stateParams, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, navigatorService, templatesHttpService) {
    var rData = [];

    var $btnAddField = $("#addField");

    $(function() {
        $btnAddField.click(function() {
            $scope.addNewFieldView();
        });
    });

    function addData(field) {
        var dElement = {};
        dElement.catalogFieldId = field.Id;
        dElement.catalogFieldName = field.Name;
        return dElement;
    };

    $scope.generateFieldTable = function() {
        var fields = navigatorService.getFields();

        for (var i = 0; i < fields.length; i++) {
            var dElement = addData(fields[i]);
            rData.push(dElement);
        }


        $('#catalogFieldTable').bootstrapTable({
            data: rData,
            height: '100%',
            sortName: 'catalogFieldId',
            sortOrder: 'desc',
            onPostBody: function() {
                $('#catalogFieldTable').bootstrapTable('resetView');
            }

        });

        $('[data-toggle="tooltip"]').tooltip()

        var $result = $('#eventsResult');

        $('#catalogFieldTable').on('all.bs.table', function(e, name, args) {
                // console.log('Event:', name, ', data:', args);
            })
            .on('click-row.bs.table', function(e, row, $element) {

                // console.log('Event: click-row.bs.table' + JSON.stringify(row.templateId));
                // var templateId = row.templateId;
                // var currentIndex = $element.context.cellIndex;
                // var totalCount = $element.context.parentElement.cells.length;


                // if (totalCount - currentIndex > 1) {
                //     $state.go("main.dashboard.editor", { 'templateId': templateId })
                // }
                // $result.text('Event: click-row.bs.table'+ JSON.stringify(row.userName));
            })

        $('#catalogFieldTable').bootstrapTable('resetWidth');
        usSpinnerService.stop('spinner-1');
        $scope.loading = false;
        //$scope.a();
        //window.scope = $scope;

    };

    // var url = $$ApiUrl + "/companies";
    $scope.isChanged = false;

    $scope.init = function() {
        console.log("catalog field Id=" + $stateParams.catalogId);
        navigatorService.setCurrentCatalog($stateParams.catalogId);
        $scope.template = navigatorService.getCurrentTemplate();
        $scope.currentCatalog = navigatorService.getCurrentCatalog();
        if ($scope.currentCatalog.Fields == undefined) {
            $scope.currentCatalog.Fields = [];
        }
        //alert(JSON.stringify($scope.currentCatalog));
        $scope.$watch('currentCatalog', function(newValue, oldValue) {
            if (newValue != oldValue) {
                $scope.isChanged = true;

            }
        }, true);
        // 
    }

    $scope.init();


    $scope.save = function() {

        $scope.isChanged = false;
        templatesHttpService.updateTemplate($http, $scope, $state, $scope.template);
    }

    //add new user btn event
    $scope.addNewFieldView = function(catalogField = {}) {
        //alert("Click");
        $scope.catalogField = {};
        if (catalogField != {}) {
            $scope.isEdit = true;
        }

        $scope.catalogField = catalogField;
        var modalInstance = $uibModal.open({
            templateUrl: 'PartialViews/CatalogFieldManagment.html',
            controller: manageCatalogFieldController,
            controllerAs: 'vm',
            scope: $scope,
            resolve: {
                items: function() {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function() {
            //console.log(JSON.stringify($scope.Block))
            var id = 1;

            if ($scope.currentCatalog.Fields.length > 0) {
                id = $scope.currentCatalog.Fields[$scope.currentCatalog.Fields.length - 1].Id + 1;
            }
            $scope.catalogField.Id = id;
            $scope.currentCatalog.Fields.push($scope.catalogField);
            $scope.catalogField = {};

            navigatorService.setFields($scope.currentCatalog.Fields);
            //alert(JSON.stringify($scope.currentCatalog.Fields));

            $scope.generateFieldTable();

            //templatesHttpService.updateTemplate($http, $scope, $state, $scope.template);

        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.generateFieldTable();
};
blitzApp.controller("catalogFieldDetailsController", ["$scope", "$stateParams", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "navigatorService", "templatesHttpService", catalogFieldDetailsController]);