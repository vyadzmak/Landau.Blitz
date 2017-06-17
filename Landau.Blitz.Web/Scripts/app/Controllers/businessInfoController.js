var businessInfoController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, NgTableParams, projectFactory) {
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
    //------------------¡ÀŒ  ƒÀﬂ –¿¡Œ“€ — ÃŒƒ¿À‹Õ€Ã» Œ Õ¿Ã»---------------------------//
    //add new user btn event
    //ËÏˇ ‚¸˛ıË, ÍÓÌÚÓÎÎÂ, ÔÛÒÚÓÈ ˝ÎÂÏÂÌÚ, ÍÛ‰‡ ÔË¯ÂÏ, ˜ÚÓ ÔË¯ÂÏ
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
    //----------- ŒÕ≈÷ ¡ÀŒ ¿ ƒÀﬂ –¿¡Œ“€ — ÃŒƒ¿À‹Õ€Ã» Œ Õ¿Ã»---------------------------//

    $scope.showNewClientFounderInfo = function() {
        var modalView = 'PartialViews/Modals/BusinessInfo/ClientFounderInfoModal.html';
        var modalController = manageClientFounderInfoController;

        if ($scope.currentProject.BusinessInfo.ClientFounderInfos == undefined) {
            $scope.currentProject.BusinessInfo.ClientFounderInfos = [];
        }
        $scope.mElement = {};
        $scope.addNewModal(modalView, modalController, $scope.mElement, $scope.currentProject.BusinessInfo.ClientFounderInfos);
    }

    $scope.showNewConsumerStructure = function() {
        var modalView = 'PartialViews/Modals/BusinessInfo/ConsumerStructureModal.html';
        var modalController = manageConsumerStructureController;

        if ($scope.currentProject.BusinessInfo.ConsumerStructures == undefined) {
            $scope.currentProject.BusinessInfo.ConsumerStructures = [];
        }
        $scope.mElement = {};
        $scope.addNewModal(modalView, modalController, $scope.mElement, $scope.currentProject.BusinessInfo.ConsumerStructures);
    }

    $scope.showNewPeriodicityProcurement = function() {
        var modalView = 'PartialViews/Modals/BusinessInfo/PeriodicityProcurementModal.html';
        var modalController = managePeriodicityProcurementController;

        if ($scope.currentProject.BusinessInfo.PeriodicityProcurements == undefined) {
            $scope.currentProject.BusinessInfo.PeriodicityProcurements = [];
        }
        $scope.mElement = {};
        $scope.addNewModal(modalView, modalController, $scope.mElement, $scope.currentProject.BusinessInfo.PeriodicityProcurements);
    }

    $scope.showNewSupplierStructure = function() {
        var modalView = 'PartialViews/Modals/BusinessInfo/SupplierStructureModal.html';
        var modalController = manageSupplierStructureController;

        if ($scope.currentProject.BusinessInfo.SupplierStructures == undefined) {
            $scope.currentProject.BusinessInfo.SupplierStructures = [];
        }
        $scope.mElement = {};
        $scope.addNewModal(modalView, modalController, $scope.mElement, $scope.currentProject.BusinessInfo.SupplierStructures);
    }

};
blitzApp.controller("businessInfoController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "NgTableParams", "projectFactory", businessInfoController]);