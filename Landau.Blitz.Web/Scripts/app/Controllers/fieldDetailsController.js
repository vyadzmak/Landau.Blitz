var fieldDetailsController = function($scope, $stateParams, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, navigatorService, templatesHttpService) {
    // var url = $$ApiUrl + "/companies";
    $scope.isChanged = false;

    $scope.init = function() {
        console.log("field Id=" + $stateParams.fieldId);
        navigatorService.setCurrentField($stateParams.fieldId);
        $scope.template = navigatorService.getCurrentTemplate();
        $scope.currentField = navigatorService.getCurrentField();
        if ($scope.currentField.Elements == undefined) {
            $scope.currentField.Elements = [];
        }
        //alert(JSON.stringify($scope.currentSheet));
        $scope.$watch('currentField', function(newValue, oldValue) {
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
    $scope.addNewElementView = function(element = {}) {
        // alert("Click");
        $scope.element = {};
        if (element != {}) {
            $scope.isEdit = true;
        }

        $scope.element = element;
        var modalInstance = $uibModal.open({
            templateUrl: 'PartialViews/ElementManagment.html',
            controller: manageElementController,
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

            if ($scope.currentField.Elements.length > 0) {
                id = $scope.currentField.Elements[$scope.currentField.Elements.length - 1].Id + 1;
            }
            $scope.element.Id = id;
            $scope.currentField.Elements.push($scope.element);
            $scope.element = {};
            templatesHttpService.updateTemplate($http, $scope, $state, $scope.template);

        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
};
blitzApp.controller("fieldDetailsController", ["$scope", "$stateParams", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "navigatorService", "templatesHttpService", fieldDetailsController]);