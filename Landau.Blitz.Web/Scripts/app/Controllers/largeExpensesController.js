var largeExpensesController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, NgTableParams, projectFactory) {
    // var url = $$ApiUrl + "/companies";
    $scope.init = function() {
        $scope.currentProject = projectFactory.getToCurrentProject();
        if ($scope.currentProject != undefined) {
            $scope.outOfBuisnessPaymentsParams = new NgTableParams({}, { dataset: $scope.currentProject.LargeExpenses.OutOfBuisnessPayments });
            $scope.investmentsParams = new NgTableParams({}, { dataset: $scope.currentProject.LargeExpenses.Investments });
        }
    };
    $scope.init();

    //------------------БЛОК ДЛЯ РАБОТЫ С МОДАЛЬНЫМИ ОКНАМИ---------------------------//
    //add new user btn event
    //имя вьюхи, контроллер, пустой элемент, куда пишем, что пишем
    $scope.addNewModal = function(modalView, modalCtrl, currentElement, elements, element = {}) {


        if (element != {}) {
            $scope.isEdit = true;
        }

        currentElement = element;
        var modalInstance = $uibModal.open({
            templateUrl: modalView,
            controller: modalCtrl,
            controllerAs: 'vm',
            scope: $scope

        });

        modalInstance.result.then(function() {
            //alert(JSON.stringify($scope.mElement));
            var id = 1;
            if (elements.length > 0) {
                id = elements[elements.length - 1].Id + 1;
            }
            $scope.mElement.Id = id;
            elements.push($scope.mElement);
            $scope.mElement = {};

            ///alert(JSON.stringify($scope.currentProject.ClientData.BusinessPlaces));
            // templatesHttpService.updateTemplate($http, $scope, $state, $scope.template);

        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    
    $scope.showNewOutOfBuisnessPayment = function() {
        
        var modalView = 'PartialViews/Modals/LargeExpenses/OutOfBuisnessPaymentModal.html';
        var modalController = manageOutOfBuisnessPaymentController

        if ($scope.currentProject.LargeExpenses.OutOfBuisnessPayments == undefined) {
            $scope.currentProject.LargeExpenses.OutOfBuisnessPayments = [];
        }
        $scope.mElement = {};
        $scope.addNewModal(modalView, modalController, $scope.mElement, $scope.currentProject.LargeExpenses.OutOfBuisnessPayments);
    }

    $scope.showNewInvestment = function() {
        
        var modalView = 'PartialViews/Modals/LargeExpenses/InvestmentsModal.html';
        var modalController = manageInvestmentController

        if ($scope.currentProject.LargeExpenses.Investments == undefined) {
            $scope.currentProject.LargeExpenses.Investments = [];
        }
        $scope.mElement = {};
        $scope.addNewModal(modalView, modalController, $scope.mElement, $scope.currentProject.LargeExpenses.Investments);
    }


    usSpinnerService.stop("spinner-1");
};
blitzApp.controller("largeExpensesController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "NgTableParams", "projectFactory", largeExpensesController]);