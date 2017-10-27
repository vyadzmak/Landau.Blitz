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

    $scope.months = [{ Id:1 , Name: "янваь" },{ Id:2 , Name: "февраль" },{ Id:3 , Name: "март" },{ Id:4 , Name: "апрель" },{ Id:5 , Name: "май" },
    { Id:6 , Name: "июнь" },{ Id:7 , Name: "июль" },{ Id:8 , Name: "август" },{ Id:9 , Name: "сент¤брь" },{ Id:10 , Name: "октябрь" },
    { Id:11 , Name: "ноябрь" },{ Id:12 , Name: "декабрь" }];

};
blitzApp.controller("manageBalanceController", ["$scope", "$uibModal", "$uibModalInstance", manageBalanceController]);