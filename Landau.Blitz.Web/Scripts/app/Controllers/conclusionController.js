var conclusionController = function ($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, projectFactory) {
    usSpinnerService.stop("spinner-1");

    $scope.init = function() {
        $scope.currentProject = projectFactory.getToCurrentProject();
        
        if (!$scope.currentProject || !$scope.currentProject.Conclusion || !$scope.currentProject.Conclusion.Text) {
                $scope.currentProject.Conclusion.Text = "На основании проведенного анализа и вышеизложенной информации,  предлагаю открыть лимит кредитования в размере ________, на срок _______ месяцев. В рамках открываемого лимита кредитования   предлагаю выдать первый субкредит в размере ________на срок______месяцев под _____% годовых, под предложенное обеспечение. График погашения субкредита– ежемесячно равными долями (в случае применения плавающего графика погашения субкредита прокомментировать сроки применения льготного периода).";
            }
    };
    $scope.init();
    
};
blitzApp.controller("conclusionController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "projectFactory", conclusionController]);