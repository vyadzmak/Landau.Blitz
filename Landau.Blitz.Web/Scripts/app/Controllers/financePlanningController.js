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

var financePlanningController = function ($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, NgTableParams, projectHttpService, projectFactory) {
    usSpinnerService.stop("spinner-1");

    $scope.init = function() {
        $scope.currentProject = projectFactory.getToCurrentProject();
        $scope.expenditures = [
        { Id: 1, Name:"ПОС  (приобретение товаров, сырья, расходных материалов, кормов, семян, скота для откорма)"},
        { Id: 2, Name:"Расходы по доставке, растамаживанию (товаров, сырья, расходных материалов, кормов, семян, скота для откорма)"},
        { Id: 3, Name:"Приобретение оборудования, автотраспорта, мебели, техники, основного стада"},
        { Id: 4, Name:"Приобретение коммерческой недвижимости (здания, сооружения, земля)"},
        { Id: 5, Name:"Предоплата за оборудование, автотранспорт, мебель, технику, основное стадо"},
        { Id: 6, Name: "Предоплата за коммерческую недвижимость" },
        { Id: 7, Name: "Приобретение строительных материалов" },
        { Id: 8, Name: "Оплата услуг, работ, связанных со строительством объектов коммерческого назначения" },
        { Id: 9, Name: "Оплата расходов по оформлению, узаконению коммерческих объектов" },
        { Id: 10, Name: "Расходы, связанные с монтажем, установкой, наладкой техники и оборудования" },
        { Id: 11, Name: "Дополнительные расходы на рекламу, продвижение продуктов в рамках финансируемого проекта" },
        { Id: 12, Name: "Расходы по обучению персонала для обслуживания оборудования, техники в рамках финансируемого проекта" },
        { Id: 13, Name: "Прочие" }
        ];
        $scope.financialSources = [
            {Id:1,Name:"собственные средства"},
            {Id:2,Name:"заемные средства (кредит Банка)"},
            {Id:3,Name:"заемные средства (частный заем)"}
        ];
        //var t = JSON.parse($scope.currentProject.FinancePlanning.Table);
        //for (var i = 0; i < $scope.currentProject.FinancePlanning.Table.length; i++) {
        //    var ob = ($scope.currentProject.FinancePlanning.Table[i]);
        //    ob.Term = setData(ob.Term);
        //    $scope.currentProject.FinancePlanning.Table[i] = ob;
        //}

        //$('#financePlanningTable').bootstrapTable({
        //    idField: 'CostItem',
        //    pagination: false,
        //    search: true,
        //    data: $scope.currentProject.FinancePlanning.Table,

        //    columns: [{
        //            field: 'CostItem',
        //            title: 'Статья затрат',
        //        }, {
        //            field: 'Supplier',
        //            title: 'Поставщик',
        //        },
        //        {
        //            field: 'Amount',
        //            title: 'Сумма',
        //        },
        //        {
        //            field: 'SourceOfFinancing',
        //            title: 'Источник финансирования',
        //        },
        //        {
        //            field: 'Term',
        //            title: 'Срок',

        //        }
        //    ],
        //    contextMenu: '#context-menu',
        //    onContextMenuItem: function(row, $el) {
        //        if ($el.data("item") == "edit") {
        //            $scope.updateItem(row);
        //        };
        //        if ($el.data("item") == "delete") {
        //            $scope.deleteItem(row);
        //        };
        //    }
        //});




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

    $scope.addNewFinancePlan = function() {
        if (!$scope.currentProject.FinancePlanning.Plans) {
            $scope.currentProject.FinancePlanning.Plans = [];
        }
        $scope.currentProject.FinancePlanning.Plans.push({ Id: $scope.currentProject.FinancePlanning.Plans.length + 1 });
    }

    $scope.clickFinancePlan = function (id) {

        $scope.rmIndex = 1;
        $scope.eIndex = id;

        $scope.editElement = $scope.filterFromArray($scope.currentProject.FinancePlanning.Plans, $scope.eIndex);

        $scope.mElement = $scope.editElement;
        $scope.elements = $scope.currentProject.FinancePlanning.Plans;

        //alert(id);
    };

    $scope.deleteData = function () {
        var ob = $scope.elements.filter(function (item) {
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
    $scope.RemoveElement = function () {
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
            callback: function (result) {
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

    $scope.filterFromArray = function (arr, id) {
        var ob = arr.filter(function (item) {
            return item.Id == id;
        });

        return ob[0];
    }

    $scope.calculateFinancePlan = function() {
        var ownFunds = 0;
        var borrowedFunds = 0;
        var totalFunds = 0;
        for (var i = 0; i < $scope.currentProject.FinancePlanning.Plans.length; i++) {
            if ($scope.currentProject.FinancePlanning.Plans[i].Source.Id === 1) {
                ownFunds += +$scope.currentProject.FinancePlanning.Plans[i].Sum;
            } else {
                borrowedFunds += +$scope.currentProject.FinancePlanning.Plans[i].Sum;
            }
            totalFunds += +$scope.currentProject.FinancePlanning.Plans[i].Sum;
        }
        $scope.currentProject.FinancePlanning.OwnResources = ownFunds;
        $scope.currentProject.FinancePlanning.BorrowedResources = borrowedFunds;
        $scope.currentProject.FinancePlanning.TotalResources = totalFunds;

    }

};
blitzApp.controller("financePlanningController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "NgTableParams", "projectHttpService", "projectFactory", financePlanningController]);