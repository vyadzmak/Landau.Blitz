var businessInfoController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, NgTableParams, projectFactory, projectHttpService) {
    usSpinnerService.stop("spinner-1");

    $scope.init = function() {
        $scope.currentProject = projectFactory.getToCurrentProject();
        if ($scope.currentProject != undefined) {
            $scope.clientFounderInfos = new NgTableParams({}, { dataset: $scope.currentProject.BusinessInfo.ClientFounderInfos });
            $scope.consumerStructures = new NgTableParams({}, { dataset: $scope.currentProject.BusinessInfo.ConsumerStructures });
            $scope.periodicityProcurements = new NgTableParams({}, { dataset: $scope.currentProject.BusinessInfo.PeriodicityProcurements });
            $scope.supplierStructures = new NgTableParams({}, { dataset: $scope.currentProject.BusinessInfo.SupplierStructures });
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

    $scope.filterFromArray = function(arr, id) {
        var ob = arr.filter(function(item) {
            return item.Id == id;
        });

        return ob[0];
    }
    $scope.clickClientFounderInfo = function(id) {


        $scope.rmIndex = 1;
        $scope.eIndex = id;

        console.log(id);
        $scope.editElement = $scope.filterFromArray($scope.currentProject.BusinessInfo.ClientFounderInfos, $scope.eIndex);

        $scope.modalView = 'PartialViews/Modals/BusinessInfo/ClientFounderInfoModal.html';
        $scope.modalController = manageClientFounderInfoController;

        $scope.mElement = $scope.editElement;
        $scope.elements = $scope.currentProject.BusinessInfo.ClientFounderInfos;
    };

    $scope.clickConsumerStructure = function(id) {


        $scope.rmIndex = 1;
        $scope.eIndex = id;

        console.log(id);
        $scope.editElement = $scope.filterFromArray($scope.currentProject.BusinessInfo.ConsumerStructures, $scope.eIndex);

        $scope.modalView = 'PartialViews/Modals/BusinessInfo/ConsumerStructureModal.html';;
        $scope.modalController = manageConsumerStructureController;

        $scope.mElement = $scope.editElement;
        $scope.elements = $scope.currentProject.BusinessInfo.ConsumerStructures;
    };


    $scope.clickSupplierStructure = function(id) {


        $scope.rmIndex = 1;
        $scope.eIndex = id;

        console.log(id);
        $scope.editElement = $scope.filterFromArray($scope.currentProject.BusinessInfo.SupplierStructures, $scope.eIndex);

        $scope.modalView = 'PartialViews/Modals/BusinessInfo/SupplierStructureModal.html';;
        $scope.modalController = manageSupplierStructureController;

        $scope.mElement = $scope.editElement;
        $scope.elements = $scope.currentProject.BusinessInfo.SupplierStructures;
    };

    $scope.clickPeriodicityProcurements = function(id) {


        $scope.rmIndex = 1;
        $scope.eIndex = id;

        console.log(id);
        $scope.editElement = $scope.filterFromArray($scope.currentProject.BusinessInfo.PeriodicityProcurements, $scope.eIndex);

        $scope.modalView = 'PartialViews/Modals/BusinessInfo/PeriodicityProcurementModal.html';
        $scope.modalController = managePeriodicityProcurementController;

        $scope.mElement = $scope.editElement;
        $scope.elements = $scope.currentProject.BusinessInfo.PeriodicityProcurements;
    };

    $scope.EditElement = function() {

        $scope.addNewModal($scope.modalView, $scope.modalController,
            $scope.mElement, $scope.elements, $scope.mElement);

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


    $scope.showNewClientFounderInfo = function() {
        if (!$scope.currentProject.BusinessInfo.ClientFounderInfos) {
            $scope.currentProject.BusinessInfo.ClientFounderInfos = [];
        }
        $scope.currentProject.BusinessInfo.ClientFounderInfos.push({Id:$scope.currentProject.BusinessInfo.ClientFounderInfos.length+1});
        //var modalView = 'PartialViews/Modals/BusinessInfo/ClientFounderInfoModal.html';
        //var modalController = manageClientFounderInfoController;

        //if ($scope.currentProject.BusinessInfo.ClientFounderInfos == undefined) {
        //    $scope.currentProject.BusinessInfo.ClientFounderInfos = [];
        //}
        //$scope.mElement = {};
        //$scope.addNewModal(modalView, modalController, $scope.mElement, $scope.currentProject.BusinessInfo.ClientFounderInfos);
    }

    $scope.showNewConsumerStructure = function() {
        if (!$scope.currentProject.BusinessInfo.ConsumerStructures) {
            $scope.currentProject.BusinessInfo.ConsumerStructures = [];
        }
        $scope.currentProject.BusinessInfo.ConsumerStructures.push({Id:$scope.currentProject.BusinessInfo.ConsumerStructures.length+1});
        //var modalView = 'PartialViews/Modals/BusinessInfo/ConsumerStructureModal.html';
        //var modalController = manageConsumerStructureController;

        //if ($scope.currentProject.BusinessInfo.ConsumerStructures == undefined) {
        //    $scope.currentProject.BusinessInfo.ConsumerStructures = [];
        //}
        //$scope.mElement = {};
        //$scope.addNewModal(modalView, modalController, $scope.mElement, $scope.currentProject.BusinessInfo.ConsumerStructures);
    }

    $scope.showNewPeriodicityProcurement = function() {
        if (!$scope.currentProject.BusinessInfo.PeriodicityProcurements) {
            $scope.currentProject.BusinessInfo.PeriodicityProcurements = [];
        }
        $scope.currentProject.BusinessInfo.PeriodicityProcurements.push({Id:$scope.currentProject.BusinessInfo.PeriodicityProcurements.length+1});
        //var modalView = 'PartialViews/Modals/BusinessInfo/PeriodicityProcurementModal.html';
        //var modalController = managePeriodicityProcurementController;

        //if ($scope.currentProject.BusinessInfo.PeriodicityProcurements == undefined) {
        //    $scope.currentProject.BusinessInfo.PeriodicityProcurements = [];
        //}
        //$scope.mElement = {};
        //$scope.addNewModal(modalView, modalController, $scope.mElement, $scope.currentProject.BusinessInfo.PeriodicityProcurements);
    }

    $scope.showNewSupplierStructure = function() {
        if (!$scope.currentProject.BusinessInfo.SupplierStructures) {
            $scope.currentProject.BusinessInfo.SupplierStructures = [];
        }
        $scope.currentProject.BusinessInfo.SupplierStructures.push({Id:$scope.currentProject.BusinessInfo.SupplierStructures.length+1});
        //var modalView = 'PartialViews/Modals/BusinessInfo/SupplierStructureModal.html';
        //var modalController = manageSupplierStructureController;

        //if ($scope.currentProject.BusinessInfo.SupplierStructures == undefined) {
        //    $scope.currentProject.BusinessInfo.SupplierStructures = [];
        //}
        //$scope.mElement = {};
        //$scope.addNewModal(modalView, modalController, $scope.mElement, $scope.currentProject.BusinessInfo.SupplierStructures);
    }

};
blitzApp.controller("businessInfoController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "NgTableParams", "projectFactory", "projectHttpService", businessInfoController]);