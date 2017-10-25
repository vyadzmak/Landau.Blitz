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

    $scope.months = [{ Id:1 , Name: "������" },{ Id:2 , Name: "�������" },{ Id:3 , Name: "����" },{ Id:4 , Name: "������" },{ Id:5 , Name: "���" },
    { Id:6 , Name: "����" },{ Id:7 , Name: "����" },{ Id:8 , Name: "������" },{ Id:9 , Name: "��������" },{ Id:10 , Name: "�������" },
    { Id:11 , Name: "������" },{ Id:12 , Name: "�������" }];

};
blitzApp.controller("manageBalanceController", ["$scope", "$uibModal", "$uibModalInstance", manageBalanceController]);