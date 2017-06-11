var elementDetailsController = function($scope, $stateParams, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, navigatorService, templatesHttpService) {
    // var url = $$ApiUrl + "/companies";
    $scope.isChanged = false;

    $scope.init = function() {
        console.log("element Id=" + $stateParams.elementId);
        navigatorService.setCurrentElement($stateParams.elementId);
        $scope.template = navigatorService.getCurrentTemplate();
        $scope.currentElement = navigatorService.getCurrentElement();
        //alert(JSON.stringify($scope.currentElement));
        $scope.$watch('currentElement', function(newValue, oldValue) {
            if (newValue != oldValue) {
                $scope.isChanged = true;

            }
        }, true);



    }

    $scope.init();

    $('#myTabs a').click(function(e) {
        e.preventDefault()
        $(this).tab('show')
    })
    $scope.save = function() {

        $scope.isChanged = false;
        templatesHttpService.updateTemplate($http, $scope, $state, $scope.template);
    }



};
blitzApp.controller("elementDetailsController", ["$scope", "$stateParams", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "navigatorService", "templatesHttpService", elementDetailsController]);