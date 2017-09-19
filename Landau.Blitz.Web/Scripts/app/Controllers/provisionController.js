var provisionController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, NgTableParams, projectFactory, projectHttpService) {
    usSpinnerService.stop("spinner-1");

    $scope.init = function() {
        $scope.currentProject = projectFactory.getToCurrentProject();
        if ($scope.currentProject != undefined) {
            $scope.deposits = new NgTableParams({}, { dataset: $scope.currentProject.Provision.Deposits });
        }
    };
    $scope.init();
    $scope.filterFromArray = function(arr, id) {
        var ob = arr.filter(function(item) {
            return item.Id == id;
        });

        return ob[0];
    }


    $scope.calculateLiquidityRatio = function() {
            try {
                $scope.mElement.LiquidityRatio = +($scope.mElement.AssessedPrice / $scope.mElement.MarketPrice).toFixed(2);

            } catch (e) {
                $scope.mElement.LiquidityRatio = 0;
            }
        }
        //------------------���� ��� ������ � ���������� ������---------------------------//
        //add new user btn event
        //��� �����, ����������, ������ �������, ���� �����, ��� �����
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
    //-----------����� ����� ��� ������ � ���������� ������---------------------------//

    $scope.clickDeposit = function(id) {
        $scope.rmIndex = 1;
        $scope.eIndex = id;

        console.log(id);
        $scope.editElement = $scope.filterFromArray($scope.currentProject.Provision.Deposits, $scope.eIndex);

        $scope.modalView = 'PartialViews/Modals/Provision/DepositModal.html';
        $scope.modalController = manageDepositController;

        $scope.mElement = $scope.editElement;
        $scope.elements = $scope.currentProject.Provision.Deposits;
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
blitzApp.controller("provisionController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "NgTableParams", "projectFactory", "projectHttpService", provisionController]);