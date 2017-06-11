var manageQuestionController = function($scope, $http, $location, $state, $uibModal, $uibModalInstance, $stateParams, usSpinnerService, items) {
    var url = $$ApiUrl + "/Sheets";
    var vm = this;

    function loadQuestionData() {
        vm.$scope = $scope;
        vm.items = items;
        vm.Question = $scope.question;
        vm.confirm = function() {
            if ($scope.questionForm.$valid) { $uibModalInstance.close(); }
        };
        vm.cancel = $uibModalInstance.dismiss;

    }
    loadQuestionData();


};
blitzApp.controller("manageQuestionController", ["$scope", "$http", "$location", "$state", "$uibModal", "$uibModalInstance", "$stateParams", "usSpinnerService", manageQuestionController]);