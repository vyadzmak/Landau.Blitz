var sheetDetailsController = function($scope, $stateParams, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, navigatorService, templatesHttpService) {
    // var url = $$ApiUrl + "/companies";
    $scope.isChanged = false;

    $scope.init = function() {
        console.log("SheetId=" + $stateParams.sheetId);
        navigatorService.setCurrentSheet($stateParams.sheetId);
        $scope.template = navigatorService.getCurrentTemplate();
        $scope.currentSheet = navigatorService.getCurrentSheet();
        if ($scope.currentSheet.Blocks == undefined) {
            $scope.currentSheet.Blocks = [];
        }
        //alert(JSON.stringify($scope.currentSheet));
        $scope.$watch('currentSheet', function(newValue, oldValue) {
            if (newValue != oldValue) {
                $scope.isChanged = true;

            }
        }, true);

    }

    $scope.init();


    $scope.save = function() {

        $scope.isChanged = false;
        templatesHttpService.updateTemplate($http, $scope, $state, $scope.template);

    }

    //add new user btn event
    $scope.addNewBlockView = function(block = {}) {
        // alert("Click");
        $scope.block = {};
        if (block != {}) {
            $scope.isEdit = true;
        }

        $scope.block = block;
        var modalInstance = $uibModal.open({
            templateUrl: 'PartialViews/BlockManagment.html',
            controller: manageBlockController,
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

            if ($scope.currentSheet.Blocks.length > 0) {
                id = $scope.currentSheet.Blocks[$scope.currentSheet.Blocks.length - 1].Id + 1;
            }
            $scope.block.Id = id;
            $scope.currentSheet.Blocks.push($scope.block);
            $scope.block = {};
            templatesHttpService.updateTemplate($http, $scope, $state, $scope.template);

        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
};
blitzApp.controller("sheetDetailsController", ["$scope", "$stateParams", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "navigatorService", "templatesHttpService", sheetDetailsController]);