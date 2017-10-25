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

    $scope.months = [{ Id:1 , Name: "Январь" },{ Id:2 , Name: "Февраль" },{ Id:3 , Name: "Март" },{ Id:4 , Name: "Апрель" },{ Id:5 , Name: "Май" },
    { Id:6 , Name: "Июнь" },{ Id:7 , Name: "Июль" },{ Id:8 , Name: "Август" },{ Id:9 , Name: "Сентябрь" },{ Id:10 , Name: "Октябрь" },
    { Id:11 , Name: "Ноябрь" },{ Id:12 , Name: "Декабрь" }];

};
blitzApp.controller("manageOpiuController", ["$scope", "$uibModal", "$uibModalInstance", manageOpiuController]);