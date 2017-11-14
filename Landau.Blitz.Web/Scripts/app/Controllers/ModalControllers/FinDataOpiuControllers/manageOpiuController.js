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
    
    $scope.months = [{ Id:1 , Name: "январь" },{ Id:2 , Name: "февраль" },{ Id:3 , Name: "март" },{ Id:4 , Name: "апрель" },{ Id:5 , Name: "май" },
    { Id:6 , Name: "июнь" },{ Id:7 , Name: "июль" },{ Id:8 , Name: "август" },{ Id:9 , Name: "сентябрь" },{ Id:10 , Name: "октябрь" },
    { Id:11 , Name: "ноябрь" },{ Id:12 , Name: "декабрь" }];

};
blitzApp.controller("manageOpiuController", ["$scope", "$uibModal", "$uibModalInstance", manageOpiuController]);