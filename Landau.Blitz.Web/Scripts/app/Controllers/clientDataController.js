var clientDataController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, NgTableParams, projectFactory, mathFactory, projectHttpService) {
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
        
    }
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

        $scope.mElement = $scope.editElement;
        $scope.elements = $scope.currentProject.ClientData.BusinessPlaces;

    };

    $scope.clickDirectorInfo = function(id) {
        $scope.rmIndex = 1;
        $scope.eIndex = id;

        $scope.editElement = $scope.filterFromArray($scope.currentProject.ClientData.DirectorInfos, $scope.eIndex);

        $scope.mElement = $scope.editElement;
        $scope.elements = $scope.currentProject.ClientData.DirectorInfos;

    };

    $scope.loanDetailsRowClicked = function(id, noEditing, loanId) {

        if (!noEditing) {
            $scope.rmIndex = 1;
            $scope.eIndex = id;

            $scope.editLoan =$scope.filterFromArray($scope.currentProject.ClientData.CreditHistoryInfos, loanId);
            $scope.editElement = $scope.filterFromArray($scope.editLoan.LoanDetails, $scope.eIndex);

            $scope.mElement = $scope.editElement;
            $scope.elements = $scope.editLoan.LoanDetails;
        }
    };

    $scope.clickRelatedCompanyInfo = function(id) {
        $scope.rmIndex = 1;
        $scope.eIndex = id;

        $scope.editElement = $scope.filterFromArray($scope.currentProject.ClientData.RelatedCompanyInfos, $scope.eIndex);

        $scope.mElement = $scope.editElement;
        $scope.elements = $scope.currentProject.ClientData.RelatedCompanyInfos;

    };

    $scope.clickLegalOwnerCompanyInfo = function(id) {
        $scope.rmIndex = 1;
        $scope.eIndex = id;

        $scope.editElement = $scope.filterFromArray($scope.currentProject.ClientData.LegalOwnerCompanyInfos, $scope.eIndex);

        $scope.mElement = $scope.editElement;
        $scope.elements = $scope.currentProject.ClientData.LegalOwnerCompanyInfos;

    };
    
    $scope.clickActualOwnerCompanyInfo = function(id) {
        $scope.rmIndex = 1;
        $scope.eIndex = id;

        $scope.editElement = $scope.filterFromArray($scope.currentProject.ClientData.ActualOwnerCompanyInfos, $scope.eIndex);
        
        $scope.mElement = $scope.editElement;
        $scope.elements = $scope.currentProject.ClientData.ActualOwnerCompanyInfos;

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

    };

    $scope.clickBankAccountInfo = function(id) {
        $scope.rmIndex = 1;
        $scope.eIndex = id;

        $scope.editElement = $scope.filterFromArray($scope.currentProject.ClientData.BankAccountInfos, $scope.eIndex);

        $scope.mElement = $scope.editElement;
        $scope.elements = $scope.currentProject.ClientData.BankAccountInfos;

    };

    $scope.EditElement = function() {

        $scope.addNewModal($scope.modalView, $scope.modalController, $scope.mElement, $scope.elements, $scope.mElement);

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

        $scope.calculateClientData();

        projectHttpService.manageProject($http, $scope, usSpinnerService, projectFactory.getToCurrentProject(), false);

    }
    $scope.RemoveElement = function() {
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
    }

    $scope.showNewDirectorInfo = function() {
        if (!$scope.currentProject.ClientData.DirectorInfos) {
            $scope.currentProject.ClientData.DirectorInfos = [];
        }
        $scope.currentProject.ClientData.DirectorInfos.push({Id:$scope.currentProject.ClientData.DirectorInfos.length+1});
    }

    $scope.showNewRelatedCompanyInfo = function() {
        if (!$scope.currentProject.ClientData.RelatedCompanyInfos) {
            $scope.currentProject.ClientData.RelatedCompanyInfos = [];
        }
        $scope.currentProject.ClientData.RelatedCompanyInfos.push({Id:$scope.currentProject.ClientData.RelatedCompanyInfos.length+1});
    }

    $scope.showNewLegalOwnerCompanyInfo = function() {
        if (!$scope.currentProject.ClientData.LegalOwnerCompanyInfos) {
            $scope.currentProject.ClientData.LegalOwnerCompanyInfos = [];
        }
        $scope.currentProject.ClientData.LegalOwnerCompanyInfos.push({Id:$scope.currentProject.ClientData.LegalOwnerCompanyInfos.length+1});
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
    }

    $scope.showNewBankAccountInfo = function() {
        if (!$scope.currentProject.ClientData.BankAccountInfos) {
            $scope.currentProject.ClientData.BankAccountInfos = [];
        }
        $scope.currentProject.ClientData.BankAccountInfos.push({Id:$scope.currentProject.ClientData.BankAccountInfos.length+1});
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
        $scope.calculateCreditHistory();
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
        $scope.calculateCreditHistory();
    }

    $scope.calculateCreditHistory=function() {
        if (!$scope.currentProject.ClientData.CreditHistoryInfo) {
            $scope.currentProject.ClientData
                .CreditHistoryInfo = { LoanAmount: 0, RemainingDebt: 0, LoanContribution: 0 };
        } else {
            $scope.currentProject.ClientData.CreditHistoryInfo.LoanAmount = 0;
            $scope.currentProject.ClientData.CreditHistoryInfo.RemainingDebt = 0;
            $scope.currentProject.ClientData.CreditHistoryInfo.LoanContribution = 0;
        }
        angular.forEach($scope.currentProject.ClientData.CreditHistoryInfos, function(value, key) {
            if (value.LoanDetails && value.LoanDetails.length > 0) {
                value.LoanAmount = 0;
                value.RemainingDebt = 0;
                value.LoanContribution = 0;
                if (value.LoanType && value.LoanType.Id === 4) { // counting mixed credit line
                    var renewablePart;
                    var nonRenewablePart;
                    var renewablesEnded = false;
                    angular.forEach(value.LoanDetails, function(vDetail, vDKey) {
                        if (vDetail.detType === 2) {
                            renewablePart = vDetail;
                            if (value.LoanDetails[vDKey + 1] && value.LoanDetails[vDKey + 1].detType !== 3) {
                                renewablePart.LoanAmount = 0;
                                renewablePart.RemainingDebt = 0;
                                renewablePart.LoanContribution = 0;
                            }
                        } else if (vDetail.detType === 3) {
                            renewablesEnded = true;
                            nonRenewablePart = vDetail;
                            if (value.LoanDetails[vDKey + 1]) {
                                nonRenewablePart.LoanAmount = 0;
                                nonRenewablePart.RemainingDebt = 0;
                                nonRenewablePart.LoanContribution = 0;
                            }
                        } else if (!renewablesEnded) {
                            renewablePart.LoanAmount += mathFactory.getFloat(vDetail.LoanAmount);
                            renewablePart.RemainingDebt += mathFactory.getFloat(vDetail.RemainingDebt);
                            renewablePart.LoanContribution += mathFactory.getFloat(vDetail.LoanContribution);
                        } else if (renewablesEnded) {
                            nonRenewablePart.LoanAmount += mathFactory.getFloat(vDetail.LoanAmount);
                            nonRenewablePart.RemainingDebt += mathFactory.getFloat(vDetail.RemainingDebt);
                            nonRenewablePart.LoanContribution += mathFactory.getFloat(vDetail.LoanContribution);
                        }
                    });
                    value.LoanAmount = mathFactory.getFloat(renewablePart.LoanAmount) + mathFactory.getFloat(nonRenewablePart.LoanAmount);
                    value.RemainingDebt = mathFactory.getFloat(renewablePart.RemainingDebt)+mathFactory.getFloat(nonRenewablePart.RemainingDebt);
                    value.LoanContribution = mathFactory.getFloat(renewablePart.LoanContribution)+mathFactory.getFloat(nonRenewablePart.LoanContribution);
                } else {
                    angular.forEach(value.LoanDetails, function(vDetail, vDKey) {
                        value.LoanAmount += mathFactory.getFloat(vDetail.LoanAmount);
                        value.RemainingDebt += mathFactory.getFloat(vDetail.RemainingDebt);
                        value.LoanContribution += mathFactory.getFloat(vDetail.LoanContribution);
                    });
                }
            }

            $scope.currentProject.ClientData.CreditHistoryInfo.LoanAmount += value.LoanAmount;
            $scope.currentProject.ClientData.CreditHistoryInfo.RemainingDebt += value.RemainingDebt;
            $scope.currentProject.ClientData.CreditHistoryInfo.LoanContribution += value.LoanContribution;
        });
    };

    $scope.calculateBankAccounts=function() {
        angular.forEach($scope.currentProject.ClientData.BankAccountInfos, function(value, key) {
            if (moment(value.DatePeriodStart).isValid && moment(value.DatePeriodEnd).isValid) {
                var monthPeriod = moment(value.DatePeriodEnd).diff(moment(value.DatePeriodStart), 'months', true);
                value.AverageTurnover = mathFactory.getFloat(value.Turnover) / monthPeriod;
                value.AverageTurnover = mathFactory.round(value.AverageTurnover, 2);
            }
        });
    };
    
    $scope.calculateClientData = function() {
        $scope.calculateCreditHistory();
        $scope.calculateBankAccounts();
    }
    
    $scope.init();
};
blitzApp.controller("clientDataController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "NgTableParams", "projectFactory", "mathFactory", "projectHttpService", clientDataController]);