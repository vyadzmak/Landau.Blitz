var clientDataController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, NgTableParams, projectFactory, projectHttpService) {
    usSpinnerService.stop("spinner-1");

    $scope.rmIndex = -1;
    $scope.eIndex = -1;
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
            if ($scope.mElement.Id == -1 || $scope.mElement.Id == undefined) {


                var id = 1;
                if (elements.length > 0) {
                    id = elements[elements.length - 1].Id + 1;
                }
                $scope.mElement.Id = id;
                elements.push($scope.mElement);
                $scope.mElement = {};
            } else {
                var ob = elements.filter(function(item) {
                    return item.Id == $scope.mElement.Id;
                });

                if (ob.length > 0) {
                    var dElement = ob[0];
                    var index = $scope.elements.indexOf(dElement);

                    if (index != -1) {
                        $scope.elements[index] = $scope.mElement;
                    }
                }
                $scope.mElement = {};
            }
            projectHttpService.manageProject($http, $scope, usSpinnerService, projectFactory.getToCurrentProject(), false);

        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    //-----------КОНЕЦ БЛОКА ДЛЯ РАБОТЫ С МОДАЛЬНЫМИ ОКНАМИ---------------------------//
    $scope.filterFromArray = function(arr, id) {
            var ob = arr.filter(function(item) {
                return item.Id == id;
            });

            return ob[0];
        }
        //-----------блок для контекстного меню--------------------------------------//
    $scope.clickBusinessPlace = function(id) {


        $scope.rmIndex = 1;
        $scope.eIndex = id;

        console.log(id);
        $scope.editElement = $scope.filterFromArray($scope.currentProject.ClientData.BusinessPlaces, $scope.eIndex);

        $scope.modalView = 'PartialViews/Modals/ClientData/BusinessPlaceModal.html';
        $scope.modalController = manageBusinessPlaceController;

        $scope.mElement = $scope.editElement;
        $scope.elements = $scope.currentProject.ClientData.BusinessPlaces;

        //alert(id);
    };

    $scope.clickDirectorInfo = function(id) {


        $scope.rmIndex = 1;
        $scope.eIndex = id;

        console.log(id);
        $scope.editElement = $scope.filterFromArray($scope.currentProject.ClientData.DirectorInfos, $scope.eIndex);

        $scope.modalView = 'PartialViews/Modals/ClientData/DirectorInfoModal.html';
        $scope.modalController = manageDirectorInfoController;

        $scope.mElement = $scope.editElement;
        $scope.elements = $scope.currentProject.ClientData.DirectorInfos;

        //alert(id);
    };

    $scope.clickRelatedCompanyInfo = function(id) {


        $scope.rmIndex = 1;
        $scope.eIndex = id;

        console.log(id);
        $scope.editElement = $scope.filterFromArray($scope.currentProject.ClientData.RelatedCompanyInfos, $scope.eIndex);

        $scope.modalView = 'PartialViews/Modals/ClientData/RelatedCompanyModal.html';
        $scope.modalController = manageRelatedCompanyController;

        $scope.mElement = $scope.editElement;
        $scope.elements = $scope.currentProject.ClientData.RelatedCompanyInfos;

        //alert(id);
    };

    $scope.clickLegalOwnerCompanyInfo = function(id) {
        
        $scope.rmIndex = 1;
        $scope.eIndex = id;

        console.log(id);
        $scope.editElement = $scope.filterFromArray($scope.currentProject.ClientData.LegalOwnerCompanyInfos, $scope.eIndex);

        $scope.modalView = 'PartialViews/Modals/ClientData/LegalOwnerCompanyModal.html';
        $scope.modalController = manageLegalOwnerCompanyController;

        $scope.mElement = $scope.editElement;
        $scope.elements = $scope.currentProject.ClientData.LegalOwnerCompanyInfos;

        //alert(id);
    };
    
    $scope.clickActualOwnerCompanyInfo = function(id) {
        
        $scope.rmIndex = 1;
        $scope.eIndex = id;

        console.log(id);
        $scope.editElement = $scope.filterFromArray($scope.currentProject.ClientData.ActualOwnerCompanyInfos, $scope.eIndex);

        $scope.modalView = 'PartialViews/Modals/ClientData/ActualOwnerCompanyModal.html';
        $scope.modalController = manageActualOwnerCompanyController;

        $scope.mElement = $scope.editElement;
        $scope.elements = $scope.currentProject.ClientData.ActualOwnerCompanyInfos;

        //alert(id);
    };
    
     $scope.clickCreditHistoryInfo = function(id) {
        
        $scope.rmIndex = 1;
        $scope.eIndex = id;

        console.log(id);
        $scope.editElement = $scope.filterFromArray($scope.currentProject.ClientData.CreditHistoryInfos, $scope.eIndex);

        $scope.modalView = 'PartialViews/Modals/ClientData/CreditHistoryModal.html';
        $scope.modalController = manageCreditHistoryController;

        $scope.mElement = $scope.editElement;
        $scope.elements = $scope.currentProject.ClientData.CreditHistoryInfos;

        //alert(id);
    };

    $scope.clickBankAccountInfo = function(id) {
        
        $scope.rmIndex = 1;
        $scope.eIndex = id;

        console.log(id);
        $scope.editElement = $scope.filterFromArray($scope.currentProject.ClientData.BankAccountInfos, $scope.eIndex);

        $scope.modalView = 'PartialViews/Modals/ClientData/BankAccountModal.html';
        $scope.modalController = manageBankAccountController;

        $scope.mElement = $scope.editElement;
        $scope.elements = $scope.currentProject.ClientData.BankAccountInfos;

        //alert(id);
    };

    $scope.EditElement = function() {

        $scope.addNewModal($scope.modalView, $scope.modalController, $scope.mElement, $scope.elements, $scope.mElement);

        //alert("ED Type = " + $scope.rmIndex + " Element Index= " + $scope.eIndex);
    };


    $scope.deleteData = function() {
        var ob = $scope.elements.filter(function(item) {
            return item.Id == $scope.eIndex;
        });

        if (ob.length > 0) {
            var dElement = ob[0];
            var index = $scope.elements.indexOf(dElement);

            if (index != -1) {
                $scope.elements.splice(index, 1);
            }
        }
        projectHttpService.manageProject($http, $scope, usSpinnerService, projectFactory.getToCurrentProject(), false);

    }
    $scope.RemoveElement = function() {
        //alert("RM Type = " + $scope.rmIndex + " Element Index= " + $scope.eIndex);


        var dialog = BootstrapDialog.confirm({
            title: 'Предупреждение',
            message: 'Вы действительно хотите удалить данные?',
            type: BootstrapDialog.TYPE_WARNING,
            size: BootstrapDialog.SIZE_SMALL,
            closable: true,
            btnCancelLabel: 'Нет',
            btnOKLabel: 'Да',
            btnOKClass: 'btn-warning',
            callback: function(result) {
                if (result) {
                    $scope.deleteData();
                }
            }
        });
        dialog.setSize(BootstrapDialog.SIZE_SMALL);
    };

    $scope.menuItems = [{
            text: "Редактировать", //menu option text 
            callback: $scope.EditElement, //function to be called on click  
            disabled: false //No click event. Grayed out option. 
        },
        {
            text: "Удалить",
            callback: $scope.RemoveElement, //function to be called on click  
            disabled: false
        }
    ];

    //----------------------------------------------------------------------------//
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
blitzApp.controller("clientDataController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "NgTableParams", "projectFactory", "projectHttpService", clientDataController]);