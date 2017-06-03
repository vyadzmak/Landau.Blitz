var templateDetailsController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, navigatorService, templatesHttpService) {
    // var url = $$ApiUrl + "/companies";
    $scope.isChanged = false;

    $scope.init = function() {
        $scope.template = navigatorService.getCurrentTemplate();

        $scope.$watch('template', function(newValue, oldValue) {
            if (newValue != oldValue) {
                $scope.isChanged = true;
            }
        }, true);

    }

    $scope.init();




    //add new user btn event
    $scope.addNewSheetView = function(sheet = {}) {
        // alert("Click");
        $scope.sheet = {};
        if (sheet != {}) {
            $scope.isEdit = true;
        }

        $scope.sheet = sheet;
        var modalInstance = $uibModal.open({
            templateUrl: 'PartialViews/SheetManagment.html',
            controller: manageSheetController,
            controllerAs: 'vm',
            scope: $scope,
            resolve: {
                items: function() {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function() {
            // console.log(JSON.stringify($scope.sheet))
            $scope.template.Content.Sheets.push($scope.sheet);
            $scope.sheet = {};
            templatesHttpService.updateTemplate($http, $scope.template);

        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });

        $scope.save = function() {

            $scope.isChanged = false;
            templatesHttpService.updateTemplate($http, $scope.template);
        }


    };
};
blitzApp.controller("templateDetailsController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "navigatorService", "templatesHttpService", templateDetailsController]);