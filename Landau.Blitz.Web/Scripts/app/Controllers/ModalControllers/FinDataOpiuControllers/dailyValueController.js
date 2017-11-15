var dailyValueController = function ($scope, $uibModal, $uibModalInstance, mathFactory) {
    var vm = this;

    function loadReadyData() {
        vm.$scope = $scope;
        vm.updateValue = $scope.mElement.Row['M' + $scope.mElement.Month.Id];
        vm.updateData = angular.copy($scope.mElement.IsRevenues
            ? $scope.mElement.Month.RevenuesCalcData
            : $scope.mElement.Month.CalculationsData);
        if (!vm.updateData) {
            vm.updateValue = 0;
            vm.updateData = [];
            var days = moment($scope.mElement.Month.Name, 'MM.YY').daysInMonth();
            for (var i = 0; i < days; i++) {
                vm.updateData.push({ Id: i + 1, Sum: 0});
            }
        }

        vm.calculateTotal = function () {
            vm.updateValue = 0;
            for (var i = 0; i < vm.updateData.length; i++) {
                vm.updateData[i].Sum = mathFactory.round(mathFactory.getFloat(vm.updateData[i].Sum), 2);
                vm.updateValue += vm.updateData[i].Sum;
            }
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
blitzApp.controller("dailyValueController", ["$scope", "$uibModal", "$uibModalInstance", "mathFactory", dailyValueController]);