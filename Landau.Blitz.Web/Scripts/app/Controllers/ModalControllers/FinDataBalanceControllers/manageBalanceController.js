var manageBalanceController = function ($scope, $uibModal, $uibModalInstance) {
    var vm = this;

    function loadBalanceData() {
        vm.$scope = $scope;
        vm.confirm = function() {
            if ($scope.balanceForm.$valid) { $uibModalInstance.close(); }
        };
        vm.cancel = $uibModalInstance.dismiss;
    }
    loadBalanceData();
    $scope.datesQuantityChanged = function (company) {
        if (company.BalanceDates &&
            company.BalanceDates.length > 0) {
            company.BalanceDates.length = company.BalancesQuantity;
            for (var i = 0; i < company.BalanceDates.length; i++) {
                if (!company.BalanceDates[i]) {
                    company.BalanceDates[i] = {}
                }
            }
        } else {
            company.BalanceDates = [];
            for (var i = 0; i < company.BalancesQuantity; i++) {
                company.BalanceDates.push({});
            }
        }
    }

    $scope.months = [{ Id:1 , Name: "Январь" },{ Id:2 , Name: "Февраль" },{ Id:3 , Name: "Март" },{ Id:4 , Name: "Апрель" },{ Id:5 , Name: "Май" },
    { Id:6 , Name: "Июнь" },{ Id:7 , Name: "Июль" },{ Id:8 , Name: "Август" },{ Id:9 , Name: "Сентябрь" },{ Id:10 , Name: "Октябрь" },
    { Id:11 , Name: "Ноябрь" },{ Id:12 , Name: "Декабрь" }];

};
blitzApp.controller("manageBalanceController", ["$scope", "$uibModal", "$uibModalInstance", manageBalanceController]);