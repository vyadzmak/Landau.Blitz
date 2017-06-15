var manageBusinessPlaceController = function($scope, $uibModal, $uibModalInstance) {
    var url = $$ApiUrl + "/Sheets";
    var vm = this;

    function loadBusinessPlaceData() {
        vm.$scope = $scope;
        //vm.BusinessPlace = $scope.businessPlace;
        vm.confirm = function() {
            if ($scope.businessPlaceForm.$valid) { $uibModalInstance.close(); }
        };
        vm.cancel = $uibModalInstance.dismiss;

    }
    loadBusinessPlaceData();


};
blitzApp.controller("manageBusinessPlaceController", ["$scope", "$uibModal", "$uibModalInstance", manageBusinessPlaceController]);