var provisionController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, NgTableParams, projectFactory) {
    usSpinnerService.stop("spinner-1");

    $scope.init = function() {
        $scope.currentProject = projectFactory.getToCurrentProject();
        if ($scope.currentProject != undefined) {
            $scope.deposits = new NgTableParams({}, { dataset: $scope.currentProject.Provision.Deposits });
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

    $scope.showNewDeposit = function() {
        var modalView = 'PartialViews/Modals/Provision/DepositModal.html';
        var modalController = manageDepositController;

        if ($scope.currentProject.Provision.Deposits == undefined) {
            $scope.currentProject.Provision.Deposits = [];
        }
        $scope.mElement = {};
        $scope.addNewModal(modalView, modalController, $scope.mElement, $scope.currentProject.Provision.Deposits);
    }
};
blitzApp.controller("provisionController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "NgTableParams", "projectFactory", provisionController]);