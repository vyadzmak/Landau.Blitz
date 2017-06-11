var questionDetailsController = function($scope, $stateParams, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, navigatorService, templatesHttpService) {
    // var url = $$ApiUrl + "/companies";
    $scope.isChanged = false;

    $scope.init = function() {
        console.log("question Id=" + $stateParams.questionId);
        navigatorService.setCurrentQuestion($stateParams.questionId);
        $scope.template = navigatorService.getCurrentTemplate();
        $scope.currentQuestion = navigatorService.getCurrentQuestion();
        if ($scope.currentQuestion.Fields == undefined) {
            $scope.currentQuestion.Fields = [];
        }
        //alert(JSON.stringify($scope.currentSheet));
        $scope.$watch('currentQuestion', function(newValue, oldValue) {
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
    $scope.addNewFieldView = function(field = {}) {
        // alert("Click");
        $scope.field = {};
        if (field != {}) {
            $scope.isEdit = true;
        }

        $scope.field = field;
        var modalInstance = $uibModal.open({
            templateUrl: 'PartialViews/FieldManagment.html',
            controller: manageFieldController,
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

            if ($scope.currentQuestion.Fields.length > 0) {
                id = $scope.currentQuestion.Fields[$scope.currentQuestion.Fields.length - 1].Id + 1;
            }
            $scope.field.Id = id;
            $scope.currentQuestion.Fields.push($scope.field);
            $scope.field = {};
            templatesHttpService.updateTemplate($http, $scope, $state, $scope.template);

        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
};
blitzApp.controller("questionDetailsController", ["$scope", "$stateParams", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "navigatorService", "templatesHttpService", questionDetailsController]);