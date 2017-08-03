function rowStyle(row, index) {
    var classes = ['active bold-trow', 'success', 'info', 'warning', 'danger'];

    if (row.Calculate) {
        return {
            classes: classes[0]
        }
    }

    return {};
}

var financePlanningController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, NgTableParams, projectFactory) {
    usSpinnerService.stop("spinner-1");

    $scope.init = function() {
        $scope.currentProject = projectFactory.getToCurrentProject();


        $('#financePlanningTable').bootstrapTable({
            idField: 'CostItem',
            pagination: false,
            search: true,
            data: $scope.currentProject.FinancePlanning.Table,

            columns: [{
                field: 'CostItem',
                title: 'Статья затрат',
            }, {
                field: 'Supplier',
                title: 'Поставщик',
            },
                {
                    field: 'Amount',
                    title: 'Сумма',
                },
                {
                    field: 'SourceOfFinancing',
                    title: 'Источник финансирования',
                },
                {
                    field: 'Term',
                    title: 'Срок',

                }
            ],
            contextMenu: '#context-menu',
            onContextMenuItem: function(row, $el) {
                if($el.data("item") == "edit") {
                    $scope.updateItem(row);
                };
                if($el.data("item") == "delete") {
                    $scope.deleteItem(row);
                };
            }
        });




    };
    $scope.init();

    $scope.deleteItem = function(row) {
        for (var i = 0; i < $scope.currentProject.FinancePlanning.Table.length; i++) {
            if ($scope.currentProject.FinancePlanning.Table[i].Id == row.Id) {
                $scope.currentProject.FinancePlanning.Table.splice(i, 1);
                $('#financePlanningTable').bootstrapTable('load', $scope.currentProject.FinancePlanning.Table);
                $('#financePlanningTable').bootstrapTable('resetView');
            }
        }
    }

    $scope.updateItem = function(row) {
        var modalView = 'PartialViews/Modals/FinancePlanning/SupplierModal.html';
        var modalController = manageSupplierController;
        var found = $filter('filter')($scope.currentProject.FinancePlanning.Table, {Id: row.Id}, true);
        if (found.length > 0) {
            var element = found[0];
            $scope.addNewModal(modalView, modalController, element, $scope.currentProject.FinancePlanning.Table);
        }
    }

    $scope.addNewModal = function(modalView, modalCtrl, element, elements) {


        if (element != {}) {
            $scope.isEdit = true;
        }
        $scope.mElement = element;
        var modalInstance = $uibModal.open({
            templateUrl: modalView,
            controller: modalCtrl,
            controllerAs: 'vm',
            scope: $scope

        });

        modalInstance.result.then(function() {
            //alert(JSON.stringify($scope.mElement));
            if (!$scope.isEdit) {
                var id = 1;
                if (elements.length > 0) {
                    id = elements[elements.length - 1].Id + 1;
                }
                $scope.mElement.Id = id;
                $scope.mElement.Term = new Date($scope.mElement.Term);
                elements.push($scope.mElement);
            } else {
                for (var i = 0; i < elements.length; i++) {
                    if ($scope.mElement.Id == elements[i].Id) {
                        elements[i] = $scope.mElement;
                    }
                }
            }
            $scope.mElement = {};

            $('#financePlanningTable').bootstrapTable('load', $scope.currentProject.FinancePlanning.Table);
            $('#financePlanningTable').bootstrapTable('resetView');
            ///alert(JSON.stringify($scope.currentProject.ClientData.BusinessPlaces));
            // templatesHttpService.updateTemplate($http, $scope, $state, $scope.template);

        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    //-----------����� ����� ��� ������ � ���������� ������---------------------------//

    $scope.showNewFinPlan = function() {
        var modalView = 'PartialViews/Modals/FinancePlanning/SupplierModal.html';
        var modalController = manageSupplierController;

        if ($scope.currentProject.FinancePlanning.Table == undefined) {
            $scope.currentProject.FinancePlanning.Table = [];
        }
        $scope.mElement = {};
        $scope.addNewModal(modalView, modalController, $scope.mElement, $scope.currentProject.FinancePlanning.Table);
    }

    $("#addFP").click(function() {
        $scope.showNewFinPlan();
    });
};
blitzApp.controller("financePlanningController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "NgTableParams", "projectFactory", financePlanningController]);