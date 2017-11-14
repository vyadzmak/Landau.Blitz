
var finDataOpiuController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, NgTableParams, projectHttpService, projectFactory, calculatorFactory) {

    $scope.init = function() {
        $scope.currentProject = projectFactory.getToCurrentProject();
        
        if (!$scope.currentProject.FinDataOpiu.Opius || $scope.currentProject.FinDataOpiu.Opius.length == 0) {
            if ($scope.currentProject.ClientData.FinAnalysisCompanies &&
                $scope.currentProject.ClientData.FinAnalysisCompanies.length > 0 &&
                $scope.currentProject.FinDataBalance.CurrentFinAnalysisDate) {
                $scope.currentProject.FinDataOpiu.Companies = angular
                    .copy($scope.currentProject.ClientData.FinAnalysisCompanies);

                $scope.mElement = $scope.currentProject.FinDataOpiu;
                $scope.addNewModal('PartialViews/Modals/FinDataOpiu/OpiuModal.html',
                    manageOpiuController,
                    $scope.mElement,
                    'opiuData',
                    $scope.mElement);
            } else {
                var dialog = new BootstrapDialog({
                    type: BootstrapDialog.TYPE_WARNING,
                    size: BootstrapDialog.SIZE_SMALL,
                    title: "Не указаны данные",
                    message:
                        '<div style="text-align:center">Во вкладке "Данные о клиенте" подпункте "Финансовый анализ компаний" укажите количество компаний и их названия.' +
                            ' По данным компаниям будет проведен финансовый анализ.' +
                            ' Также заполните данные на вкладке Финданные Баланс' +
                            '</div>'
                });
                dialog.setSize(BootstrapDialog.SIZE_SMALL);
                dialog.open();
            }
        } else {
            $scope.activeOpiu = projectFactory.getActiveOpiu();
        }
    }

    $scope.loanTypes = [
            {Id:1, Name:"Банковский заем" },
            {Id:2, Name:"Возобновляемая кредитная линия" },
            {Id:3, Name:"Невозобновляемая кредитная линия" },
            {Id:4, Name:"Смешанная кредитная линия" },
            {Id:5, Name:"Банковская гарантия" },
            {Id:6, Name:"Аккредитив" }
    ];

    $scope.activeOpiuChanged = function() {
        projectFactory.setActiveOpiu($scope.activeOpiu.Id);
        $scope.activeOpiu = projectFactory.getActiveOpiu();
    }

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
            if (elements !== 'opiuData') {
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
            } else {
                projectFactory.initOpius($scope.currentProject);
                $scope.activeOpiu = projectFactory.getActiveOpiu();
            }
            projectHttpService.manageProject($http, $scope, usSpinnerService, projectFactory.getToCurrentProject(), false);

        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.init();

    usSpinnerService.stop("spinner-1");
    
    $scope.calculateOpiu = function(opiu) {
        calculatorFactory.calculateOpiuData($scope.currentProject, opiu);
    }

    $scope.addNewRow = function(rows) {
        rows.push({});
        $scope.remapIds(rows);
    }
    
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

        $scope.remapIds($scope.elements);

        $scope.calculateOpiu($scope.activeOpiu);
        projectHttpService.manageProject($http, $scope, usSpinnerService, projectFactory.getToCurrentProject(), false);

    }
    
    $scope.remapIds = function(rows) {
        angular.forEach(rows, function(value, key) {
            value.Id = key + 1;
        });
    }

    $scope.clickRightTableRow = function(rows, rowId) {
        $scope.eIndex = rowId;
        $scope.elements = rows;
    };

    $scope.removeElement = function() {
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
            callback: $scope.removeElement, //function to be called on click  
            disabled: false
        }
    ];

    $scope.opiuItemHasData = function(value, array) {
        var res = (value.Avg > 0 || value.AvgPrediction > 0) && !value.Calculate;
        if (!(value.Avg > 0 || value.AvgPrediction > 0)) {
            value.Comments = undefined;
        }
        return res;
    }

};
    blitzApp.controller("finDataOpiuController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "NgTableParams", "projectHttpService", "projectFactory", "calculatorFactory", finDataOpiuController]);