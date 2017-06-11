var blockDetailsController = function($scope, $stateParams, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, navigatorService, templatesHttpService) {
    // var url = $$ApiUrl + "/companies";
    $scope.isChanged = false;

    $scope.init = function() {
        console.log("BlockId=" + $stateParams.blockId);
        navigatorService.setCurrentBlock($stateParams.blockId);
        $scope.template = navigatorService.getCurrentTemplate();
        $scope.currentBlock = navigatorService.getCurrentBlock();
        if ($scope.currentBlock.Questions == undefined) {
            $scope.currentBlock.Questions = [];
        }
        //alert(JSON.stringify($scope.currentSheet));
        $scope.$watch('currentBlock', function(newValue, oldValue) {
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
    $scope.addNewQuestionView = function(question = {}) {
        // alert("Click");
        $scope.question = {};
        if (question != {}) {
            $scope.isEdit = true;
        }

        $scope.question = question;
        var modalInstance = $uibModal.open({
            templateUrl: 'PartialViews/QuestionManagment.html',
            controller: manageQuestionController,
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

            if ($scope.currentBlock.Questions.length > 0) {
                id = $scope.currentBlock.Questions[$scope.currentBlock.Questions.length - 1].Id + 1;
            }
            $scope.question.Id = id;
            $scope.currentBlock.Questions.push($scope.question);
            $scope.question = {};
            templatesHttpService.updateTemplate($http, $scope, $state, $scope.template);

        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
};
blitzApp.controller("blockDetailsController", ["$scope", "$stateParams", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "navigatorService", "templatesHttpService", blockDetailsController]);