var manageOpiuController = function ($scope, $uibModal, $uibModalInstance) {
    var vm = this;

    function loadOpiuData() {
        vm.$scope = $scope;
        vm.confirm = function() {
            if ($scope.opiuForm.$valid) { $uibModalInstance.close(); }
        };
        vm.cancel = $uibModalInstance.dismiss;
    }
    loadOpiuData();
    $scope.activitiesQuantityChanged = function (company) {
        if (company.Activities &&
            company.Activities.length > 0) {
            company.Activities.length = company.ActivitiesQuantity;
            for (var i = 0; i < company.Activities.length; i++) {
                if (!company.Activities[i]) {
                    company.Activities[i] = {}
                }
            }
        } else {
            company.Activities = [];
            for (var i = 0; i < company.ActivitiesQuantity; i++) {
                company.Activities.push({});
            }
        }
    }

    $scope.months = [{ Id:1 , Name: "������" },{ Id:2 , Name: "�������" },{ Id:3 , Name: "����" },{ Id:4 , Name: "������" },{ Id:5 , Name: "���" },
    { Id:6 , Name: "����" },{ Id:7 , Name: "����" },{ Id:8 , Name: "������" },{ Id:9 , Name: "��������" },{ Id:10 , Name: "�������" },
    { Id:11 , Name: "������" },{ Id:12 , Name: "�������" }];

};
blitzApp.controller("manageOpiuController", ["$scope", "$uibModal", "$uibModalInstance", manageOpiuController]);