var clientDataController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, NgTableParams, projectFactory, projectHttpService) {
    usSpinnerService.stop("spinner-1");

    $scope.rmIndex = -1;
    $scope.eIndex = -1;
    $scope.init = function() {
        $scope.currentProject = projectFactory.getToCurrentProject();
        $scope.loanTypes = [
            {Id:1, Name:"Банковский заем" },
            {Id:2, Name:"Возобновляемая кредитная линия" },
            {Id:3, Name:"Невозобновляемая кредитная линия" },
            {Id:4, Name:"Смешанная кредитная линия" },
            {Id:5, Name:"Банковская гарантия" },
            {Id:6, Name:"Аккредитив" }
        ];
        $scope.creditProgramms = [
            {Id:1, Name:"Программа 1" },
            {Id:2, Name:"Программа 2" },
            {Id:3, Name:"Программа 3" }
        ];
        $scope.creditTypes = [
            {Id:1, Name:"Микро-кредит" },
            {Id:2, Name:"Старт-кредит" }
        ];
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

    $scope.loanDetailsRowClicked = function(id, noEditing, loanId) {

        if (noEditing) {
            
        }
        else{
        $scope.rmIndex = 1;
        $scope.eIndex = id;

        console.log(id);
        $scope.editLoan =$scope.filterFromArray($scope.currentProject.ClientData.CreditHistoryInfos, loanId);
        $scope.editElement = $scope.filterFromArray($scope.editLoan.LoanDetails, $scope.eIndex);

        $scope.mElement = $scope.editElement;
        $scope.elements = $scope.editLoan.LoanDetails;
        }
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

    $scope.menuItems = [
        //{
        //    text: "Редактировать", //menu option text 
        //    callback: $scope.EditElement, //function to be called on click  
        //    disabled: false //No click event. Grayed out option. 
        //},
        {
            text: "Удалить",
            callback: $scope.RemoveElement, //function to be called on click  
            disabled: false
        }
    ];

    //----------------------------------------------------------------------------//
    $scope.showNewBusinessPlace = function() {
        if (!$scope.currentProject.ClientData.BusinessPlaces) {
            $scope.currentProject.ClientData.BusinessPlaces = [];
        }
        $scope.currentProject.ClientData.BusinessPlaces.push({Id:$scope.currentProject.ClientData.BusinessPlaces.length+1});
        //var modalView = 'PartialViews/Modals/ClientData/BusinessPlaceModal.html';
        //var modalController = manageBusinessPlaceController;

        //if ($scope.currentProject.ClientData.BusinessPlaces == undefined) {
        //    $scope.currentProject.ClientData.BusinessPlaces = [];
        //}
        //$scope.mElement = {};
        //$scope.addNewModal(modalView, modalController, $scope.mElement, $scope.currentProject.ClientData.BusinessPlaces);
    }

    $scope.showNewDirectorInfo = function() {
        if (!$scope.currentProject.ClientData.DirectorInfos) {
            $scope.currentProject.ClientData.DirectorInfos = [];
        }
        $scope.currentProject.ClientData.DirectorInfos.push({Id:$scope.currentProject.ClientData.DirectorInfos.length+1});
        //var modalView = 'PartialViews/Modals/ClientData/DirectorInfoModal.html';
        //var modalController = manageDirectorInfoController;

        //if ($scope.currentProject.ClientData.DirectorInfos == undefined) {
        //    $scope.currentProject.ClientData.DirectorInfos = [];
        //}
        //$scope.mElement = {};
        //$scope.addNewModal(modalView, modalController, $scope.mElement, $scope.currentProject.ClientData.DirectorInfos);
    }

    $scope.showNewRelatedCompanyInfo = function() {
        if (!$scope.currentProject.ClientData.RelatedCompanyInfos) {
            $scope.currentProject.ClientData.RelatedCompanyInfos = [];
        }
        $scope.currentProject.ClientData.RelatedCompanyInfos.push({Id:$scope.currentProject.ClientData.RelatedCompanyInfos.length+1});
        //var modalView = 'PartialViews/Modals/ClientData/RelatedCompanyModal.html';
        //var modalController = manageRelatedCompanyController;

        //if ($scope.currentProject.ClientData.RelatedCompanyInfos == undefined) {
        //    $scope.currentProject.ClientData.RelatedCompanyInfos = [];
        //}
        //$scope.mElement = {};
        //$scope.addNewModal(modalView, modalController, $scope.mElement, $scope.currentProject.ClientData.RelatedCompanyInfos);
    }

    $scope.showNewLegalOwnerCompanyInfo = function() {
        if (!$scope.currentProject.ClientData.LegalOwnerCompanyInfos) {
            $scope.currentProject.ClientData.LegalOwnerCompanyInfos = [];
        }
        $scope.currentProject.ClientData.LegalOwnerCompanyInfos.push({Id:$scope.currentProject.ClientData.LegalOwnerCompanyInfos.length+1});
        //var modalView = 'PartialViews/Modals/ClientData/LegalOwnerCompanyModal.html';
        //var modalController = manageLegalOwnerCompanyController;

        //if ($scope.currentProject.ClientData.LegalOwnerCompanyInfos == undefined) {
        //    $scope.currentProject.ClientData.LegalOwnerCompanyInfos = [];
        //}
        //$scope.mElement = {};
        //$scope.addNewModal(modalView, modalController, $scope.mElement, $scope.currentProject.ClientData.LegalOwnerCompanyInfos);
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
        if (!$scope.currentProject.ClientData.CreditHistoryInfos) {
            $scope.currentProject.ClientData.CreditHistoryInfos = [];
        }
        $scope.currentProject.ClientData.CreditHistoryInfos.push({Id:$scope.currentProject.ClientData.CreditHistoryInfos.length+1});
        //var modalView = 'PartialViews/Modals/ClientData/CreditHistoryModal.html';
        //var modalController = manageCreditHistoryController;

        //if ($scope.currentProject.ClientData.CreditHistoryInfos == undefined) {
        //    $scope.currentProject.ClientData.CreditHistoryInfos = [];
        //}
        //$scope.mElement = {};
        //$scope.addNewModal(modalView, modalController, $scope.mElement, $scope.currentProject.ClientData.CreditHistoryInfos);
    }

    $scope.showNewBankAccountInfo = function() {
        if (!$scope.currentProject.ClientData.BankAccountInfos) {
            $scope.currentProject.ClientData.BankAccountInfos = [];
        }
        $scope.currentProject.ClientData.BankAccountInfos.push({Id:$scope.currentProject.ClientData.BankAccountInfos.length+1});
        //var modalView = 'PartialViews/Modals/ClientData/BankAccountModal.html';
        //var modalController = manageBankAccountController;

        //if ($scope.currentProject.ClientData.BankAccountInfos == undefined) {
        //    $scope.currentProject.ClientData.BankAccountInfos = [];
        //}
        //$scope.mElement = {};
        //$scope.addNewModal(modalView, modalController, $scope.mElement, $scope.currentProject.ClientData.BankAccountInfos);
    }

    $scope.finAnalysisCompaniesCountChanged = function() {
        if ($scope.currentProject.ClientData.FinAnalysisCompanies &&
            $scope.currentProject.ClientData.FinAnalysisCompanies.length>0) {
            $scope.currentProject.ClientData.FinAnalysisCompanies.length=$scope.currentProject.ClientData.FinAnalysisCompaniesCount
            for (var i = 0; i < $scope.currentProject.ClientData.FinAnalysisCompanies.length; i++) {
                if (!$scope.currentProject.ClientData.FinAnalysisCompanies[i]) {
                    $scope.currentProject.ClientData.FinAnalysisCompanies[i] = {}
                }
            }
        } else {
            $scope.currentProject.ClientData.FinAnalysisCompanies = [];
            for (var i = 0; i < $scope.currentProject.ClientData.FinAnalysisCompaniesCount; i++) {
                $scope.currentProject.ClientData.FinAnalysisCompanies.push({});
            }
        }
    }

    $scope.loanTypeChanged = function(loan) {
        loan.LoanDetails = [];
        if (loan.LoanType.Id === 4) {
            loan.LoanDetails.push({Id: 1, Document:'Возобновляемая часть', noEditing: true, detType:2});
            loan.LoanDetails.push({Id: 2, Document:'Невозобновляемая часть', noEditing: true, detType:3});
        }
    }

    $scope.addLoanDetail = function(loan, type) {
        if (type === 2) {
            var ind = loan.LoanDetails.length;
            for (var i = 0; i < loan.LoanDetails.length; i++) {
                if (loan.LoanDetails[i].detType === 3) {
                    ind = i;
                }
            }
            loan.LoanDetails.splice(ind,0,{Id:loan.LoanDetails.length+1});
        } else {
            loan.LoanDetails.push({});
        }
    }
};
blitzApp.controller("clientDataController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "NgTableParams", "projectFactory", "projectHttpService", clientDataController]);