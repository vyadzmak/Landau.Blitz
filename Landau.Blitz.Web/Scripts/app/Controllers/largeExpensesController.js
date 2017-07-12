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

    $scope.clickInvestment = function(id) {
        $scope.rmIndex = 1;
        $scope.eIndex = id;

        console.log(id);
        $scope.editElement = $scope.filterFromArray($scope.currentProject.LargeExpenses.Investments, $scope.eIndex);

        $scope.modalView = 'PartialViews/Modals/LargeExpenses/InvestmentsModal.html';
        $scope.modalController = manageInvestmentController;

        $scope.mElement = $scope.editElement;
        $scope.elements = $scope.currentProject.LargeExpenses.Investments;
    };

    $scope.clickOutOfBusinessPayment = function(id) {
        $scope.rmIndex = 1;
        $scope.eIndex = id;

        console.log(id);
        $scope.editElement = $scope.filterFromArray($scope.currentProject.LargeExpenses.OutOfBuisnessPayments, $scope.eIndex);

        $scope.modalView = 'PartialViews/Modals/LargeExpenses/OutOfBusinessPaymentModal.htm';
        $scope.modalController = managePeriodicityProcurementController;

        $scope.mElement = $scope.editElement;
        $scope.elements = $scope.currentProject.BusinessInfo.PeriodicityProcurements;
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

    
    $scope.showNewOutOfBuisnessPayment = function() {
        
        var modalView = 'l';
        var modalController = manageOutOfBuisnessPaymentController
PartialViews/Modals/LargeExpenses/OutOfBusinessPaymentModal.htm
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