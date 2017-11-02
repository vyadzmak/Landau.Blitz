var manageOpiuController = function ($scope, $uibModal, $uibModalInstance) {
    var vm = this;

    function loadOpiuData() {
        vm.$scope = $scope;
        vm.confirm = function() {
            if ($scope.opiuForm.$valid) {
                angular.forEach($scope.mElement.Companies, function(company, cKey) {
                    if (company.IsStarting) {
                        company.IsSeasonality = undefined;
                        company.SeasonMonths = undefined;
                    }
                });
                $uibModalInstance.close();
            }
        };
        vm.cancel = $uibModalInstance.dismiss;
    }
    loadOpiuData();
    
    $scope.months = [{ Id:1 , Name: "������" },{ Id:2 , Name: "�������" },{ Id:3 , Name: "����" },{ Id:4 , Name: "������" },{ Id:5 , Name: "���" },
    { Id:6 , Name: "����" },{ Id:7 , Name: "����" },{ Id:8 , Name: "������" },{ Id:9 , Name: "��������" },{ Id:10 , Name: "�������" },
    { Id:11 , Name: "������" },{ Id:12 , Name: "�������" }];

};
blitzApp.controller("manageOpiuController", ["$scope", "$uibModal", "$uibModalInstance", manageOpiuController]);