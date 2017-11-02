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
    
    $scope.months = [{ Id:1 , Name: "Январь" },{ Id:2 , Name: "Февраль" },{ Id:3 , Name: "Март" },{ Id:4 , Name: "Апрель" },{ Id:5 , Name: "Май" },
    { Id:6 , Name: "Июнь" },{ Id:7 , Name: "Июль" },{ Id:8 , Name: "Август" },{ Id:9 , Name: "Сентябрь" },{ Id:10 , Name: "Октябрь" },
    { Id:11 , Name: "Ноябрь" },{ Id:12 , Name: "Декабрь" }];

};
blitzApp.controller("manageOpiuController", ["$scope", "$uibModal", "$uibModalInstance", manageOpiuController]);