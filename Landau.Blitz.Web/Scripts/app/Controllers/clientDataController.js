var clientDataController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, NgTableParams, projectFactory) {
    usSpinnerService.stop("spinner-1");

    $scope.init = function() {
        $scope.currentProject = projectFactory.getToCurrentProject();
        if ($scope.currentProject != undefined) {
            $scope.businessPlacesParams = new NgTableParams({}, { dataset: $scope.currentProject.ClientData.BusinessPlaces });
            $scope.directorInfosParams = new NgTableParams({}, { dataset: $scope.currentProject.ClientData.DirectorInfos });
            $scope.relatedCompanyInfosParams = new NgTableParams({}, { dataset: $scope.currentProject.ClientData.RelatedCompanyInfos });
            $scope.legalOwnerCompanyInfosParams = new NgTableParams({}, { dataset: $scope.currentProject.ClientData.LegalOwnerCompanyInfos });
            $scope.actualOwnerCompanyInfosParams = new NgTableParams({}, { dataset: $scope.currentProject.ClientData.ActualOwnerCompanyInfos });
            $scope.creditHistoryInfosParams = new NgTableParams({}, { dataset: $scope.currentProject.ClientData.CreditHistoryInfos });
            $scope.bankAccountInfosParams = new NgTableParams({}, { dataset: $scope.currentProject.ClientData.BankAccountInfos });
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
    //-----------КОНЕЦ БЛОКА ДЛЯ РАБОТЫ С МОДАЛЬНЫМИ ОКНАМИ---------------------------//

    $scope.showNewBusinessPlace = function() {
        var modalView = 'PartialViews/Modals/ClientData/BusinessPlaceModal.html';
        var modalController = manageBusinessPlaceController;

        if ($scope.currentProject.ClientData.BusinessPlaces == undefined) {
            $scope.currentProject.ClientData.BusinessPlaces = [];
        }
        $scope.mElement = {};
        $scope.addNewModal(modalView, modalController, $scope.mElement, $scope.currentProject.ClientData.BusinessPlaces);
    }

    $scope.showNewDirectorInfo = function() {
        var modalView = 'PartialViews/Modals/ClientData/DirectorInfoModal.html';
        var modalController = manageDirectorInfoController;

        if ($scope.currentProject.ClientData.DirectorInfos == undefined) {
            $scope.currentProject.ClientData.DirectorInfos = [];
        }
        $scope.mElement = {};
        $scope.addNewModal(modalView, modalController, $scope.mElement, $scope.currentProject.ClientData.DirectorInfos);
    }

    $scope.showNewRelatedCompanyInfo = function() {
        var modalView = 'PartialViews/Modals/ClientData/RelatedCompanyModal.html';
        var modalController = manageRelatedCompanyController;

        if ($scope.currentProject.ClientData.RelatedCompanyInfos == undefined) {
            $scope.currentProject.ClientData.RelatedCompanyInfos = [];
        }
        $scope.mElement = {};
        $scope.addNewModal(modalView, modalController, $scope.mElement, $scope.currentProject.ClientData.RelatedCompanyInfos);
    }

    $scope.showNewLegalOwnerCompanyInfo = function() {
        var modalView = 'PartialViews/Modals/ClientData/LegalOwnerCompanyModal.html';
        var modalController = manageLegalOwnerCompanyController;

        if ($scope.currentProject.ClientData.LegalOwnerCompanyInfos == undefined) {
            $scope.currentProject.ClientData.LegalOwnerCompanyInfos = [];
        }
        $scope.mElement = {};
        $scope.addNewModal(modalView, modalController, $scope.mElement, $scope.currentProject.ClientData.LegalOwnerCompanyInfos);
    }

    $scope.showNewActualOwnerCompanyInfo = function() {
        var modalView = 'PartialViews/Modals/ClientData/ActualOwnerCompanyModal.html';
        var modalController = manageActualOwnerCompanyController;

        if ($scope.currentProject.ClientData.ActualOwnerCompanyInfos == undefined) {
            $scope.currentProject.ClientData.ActualOwnerCompanyInfos = [];
        }
        $scope.mElement = {};
        $scope.addNewModal(modalView, modalController, $scope.mElement, $scope.currentProject.ClientData.ActualOwnerCompanyInfos);
    }

    $scope.showNewCreditHistoryInfo = function() {
        var modalView = 'PartialViews/Modals/ClientData/CreditHistoryModal.html';
        var modalController = manageCreditHistoryController;

        if ($scope.currentProject.ClientData.CreditHistoryInfos == undefined) {
            $scope.currentProject.ClientData.CreditHistoryInfos = [];
        }
        $scope.mElement = {};
        $scope.addNewModal(modalView, modalController, $scope.mElement, $scope.currentProject.ClientData.CreditHistoryInfos);
    }

    $scope.showNewBankAccountInfo = function() {
        var modalView = 'PartialViews/Modals/ClientData/BankAccountModal.html';
        var modalController = manageBankAccountController;

        if ($scope.currentProject.ClientData.BankAccountInfos == undefined) {
            $scope.currentProject.ClientData.BankAccountInfos = [];
        }
        $scope.mElement = {};
        $scope.addNewModal(modalView, modalController, $scope.mElement, $scope.currentProject.ClientData.BankAccountInfos);
    }
};
blitzApp.controller("clientDataController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "NgTableParams", "projectFactory", clientDataController]);