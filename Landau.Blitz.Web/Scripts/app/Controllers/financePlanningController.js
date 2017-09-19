function rowStyle(row, index) {
    var classes = ['active bold-trow', 'success', 'info', 'warning', 'danger'];

    if (row.Calculate) {
        return {
            classes: classes[0]
        }
    }

    return {};
}

this.setData = function(item) {
    try {
        if (item == undefined || item == null) return "-";
        var d = new Date(item);
        var curr_date = d.getDate();
        var curr_month = d.getMonth() + 1;
        var curr_year = d.getFullYear();
        item = curr_date + "/" + curr_month + "/" + curr_year;
        return item;
    } catch (e) {
        return "-"
    }
}

var financePlanningController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, NgTableParams, projectFactory) {
    usSpinnerService.stop("spinner-1");

    $scope.init = function() {
        $scope.currentProject = projectFactory.getToCurrentProject();
        //var t = JSON.parse($scope.currentProject.FinancePlanning.Table);
        for (var i = 0; i < $scope.currentProject.FinancePlanning.Table.length; i++) {
            var ob = ($scope.currentProject.FinancePlanning.Table[i]);
            ob.Term = setData(ob.Term);
            $scope.currentProject.FinancePlanning.Table[i] = ob;
        }

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
                if ($el.data("item") == "edit") {
                    $scope.updateItem(row);
                };
                if ($el.data("item") == "delete") {
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
        var found = $filter('filter')($scope.currentProject.FinancePlanning.Table, { Id: row.Id }, true);
        if (found.length > 0) {
            var element = found[0];
            element.Term = new Date(element.Term);
            $scope.addNewModal(modalView, modalController, element, $scope.currentProject.FinancePlanning.Table);
        }
    }

    $scope.addNewModal = function(modalView, modalCtrl, element, elements) {


        if (JSON.stringify(element) != "{}") {
            $scope.isEdit = true;
        } else {
            $scope.isEdit = false;
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
                if ($scope.mElement.Term != undefined) {
                    $scope.mElement.Term = new Date($scope.mElement.Term);
                }
                elements.push($scope.mElement);
            } else {
                $scope.mElement.Term = setData($scope.mElement.Term)
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