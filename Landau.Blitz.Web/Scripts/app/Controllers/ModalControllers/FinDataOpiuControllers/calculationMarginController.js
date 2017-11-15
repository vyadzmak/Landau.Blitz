var calculationMarginController = function ($scope, $uibModal, $uibModalInstance, $filter, mathFactory) {
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
                Goods: [],
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

        vm.goodsCountChanged = function () {
            if (vm.updateData.Goods &&
                vm.updateData.Goods.length > 0) {
                vm.updateData.Goods.length = vm.updateData.GoodsCount;
                for (var i = 0; i < vm.updateData.Goods.length; i++) {
                    if (!vm.updateData.Goods[i]) {
                        vm.updateData.Goods[i] = {}
                    }
                }
            } else {
                vm.updateData.Goods = [];
                for (var i = 0; i < vm.updateData.GoodsCount; i++) {
                    vm.updateData.Goods.push({});
                }
            }
            vm.remapIds(vm.updateData.Goods);
        }

        vm.calculateTotal = function () {
            vm.updateValue = 0;
            vm.updateData.TotalCost = 0;
            vm.updateData.TotalSum = 0;
            angular.forEach(vm.updateData.Goods, function (good, gKey) {
                good.Cost = 0;
                angular.forEach(good.Rows, function(value, key) {
                    value.Quantity = mathFactory.getFloat(value.Quantity);
                    value.Cost = mathFactory.round(mathFactory.getFloat(value.Cost), 2);
                    value.TotalCost = value.Cost * value.Quantity;
                    good.Cost += value.TotalCost;
                });

                good.TotalCost = mathFactory.round(good.Cost / mathFactory.getFloat(good.Yield), 2);
                good.Margin = mathFactory.round(100 * (mathFactory.getFloat(good.TotalSum) / mathFactory.getFloat(good.TotalCost) - 1), 2);

                vm.updateData.TotalSum += mathFactory.round(mathFactory.getFloat(good.TotalSum), 2);
                vm.updateData.TotalCost += mathFactory.round(mathFactory.getFloat(good.TotalCost), 2);
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
blitzApp.controller("calculationMarginController", ["$scope", "$uibModal", "$uibModalInstance", "$filter", "mathFactory", calculationMarginController]);