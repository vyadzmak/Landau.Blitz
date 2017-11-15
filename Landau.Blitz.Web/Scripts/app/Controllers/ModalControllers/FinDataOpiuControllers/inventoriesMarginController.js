var inventoriesMarginController = function ($scope, $uibModal, $uibModalInstance, mathFactory) {
    var vm = this;

    function loadReadyData() {
        vm.$scope = $scope;
        vm.updateValue = $scope.mElement.Row['M' + $scope.mElement.Month.Id];
        vm.updateData = angular.copy($scope.mElement.IsRevenues
            ? $scope.mElement.Month.RevenuesCalcData
            : $scope.mElement.Month.CalculationsData);
        if (!vm.updateData) {
            vm.updateValue = 0;
            vm.updateData = {
                Rows: [],
                TotalCost: 0,
                TotalSum: 0
            };
        }

        vm.remapIds = function (rows) {
            angular.forEach(rows, function (value, key) {
                value.Id = key + 1;
            });
        }

        vm.addNewRow = function (rows) {
            if (!rows) {
                rows = [];
            }
            rows.push({});
            vm.remapIds(rows);
        }

        vm.clickRightTableRow = function (rows, rowId) {
            vm.eIndex = rowId;
            vm.elements = rows;
        };

        vm.deleteData = function () {
            var ob = vm.elements.filter(function (item) {
                return item.Id == vm.eIndex;
            });

            if (ob.length > 0) {
                var dElement = ob[0];
                var index = vm.elements.indexOf(dElement);

                if (index != -1) {
                    vm.elements.splice(index, 1);
                }
            }
            vm.remapIds(vm.elements);
            vm.calculateTotal();
        }

        vm.removeElement = function () {
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
                        vm.deleteData();
                    }
                }
            });
            dialog.setSize(BootstrapDialog.SIZE_SMALL);
        };

        vm.menuItems = [
        {
            text: "Удалить",
            callback: vm.removeElement, //function to be called on click  
            disabled: false
        }
        ];

        vm.calculateTotal = function () {
            vm.updateValue = 0;
            vm.updateData.TotalCost = 0;
            vm.updateData.TotalSum = 0;
            angular.forEach(vm.updateData.Rows, function(value, key) {
                value.Quantity = mathFactory.getFloat(value.Quantity);
                value.Sum = mathFactory.round(mathFactory.getFloat(value.Sum), 2);
                value.Cost = mathFactory.round(mathFactory.getFloat(value.Cost), 2);
                value.TotalSum = value.Sum * value.Quantity;
                value.TotalCost = value.Cost * value.Quantity;
                vm.updateData.TotalSum += value.TotalSum;
                vm.updateData.TotalCost += value.TotalCost;
            });
            vm.updateValue = mathFactory.round(100 * (vm.updateData.TotalSum / vm.updateData.TotalCost - 1), 2);
            vm.updateValue = mathFactory.getFloat(vm.updateValue);
        }

        vm.confirm = function () {

            $scope.mElement.Row['M' + $scope.mElement.Month.Id] = vm.updateValue;
            if ($scope.mElement.IsRevenues) {
                $scope.mElement.Month.RevenuesCalcData = vm.updateData;
            } else {
                $scope.mElement.Month.CalculationsData = vm.updateData;
            }
            $uibModalInstance.close();
        };
        vm.cancel = $uibModalInstance.dismiss;
    }
    loadReadyData();
};
blitzApp.controller("inventoriesMarginController", ["$scope", "$uibModal", "$uibModalInstance", "mathFactory", inventoriesMarginController]);