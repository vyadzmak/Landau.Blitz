var finDataOddsController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, projectFactory, projectHttpService, calculatorFactory) {
    // var url = $$ApiUrl + "/companies";
    $scope.init = function() {


        $scope.currentProject = projectFactory.getToCurrentProject();
        if (!$scope.currentProject.FinDataOdds.Odds ||
            $scope.currentProject.FinDataOdds.Odds.length == 0) {
            
            $scope.currentProject.FinDataBalance.Companies = angular
                .copy($scope.currentProject.ClientData.FinAnalysisCompanies);

            $scope.mElement = {};
            $scope.addNewModal('PartialViews/Modals/FinDataOdds/OddsModal.html',
                manageOddsController,
                $scope.mElement,
                'oddsData',
                $scope.mElement);

        }
    }

    $scope.addNewModal = function(modalView, modalCtrl, currentElement, elements, element = {}) {


        if (element != {}) {
            $scope.isEdit = true;
        }

        currentElement = element;
        var modalInstance = $uibModal.open({
            templateUrl: modalView,
            controller: modalCtrl,
            controllerAs: 'vm',
            scope: $scope

        });

        modalInstance.result.then(function() {
            if (elements !== 'oddsData') {
                if ($scope.mElement.Id == -1 || $scope.mElement.Id == undefined) {


                    var id = 1;
                    if (elements.length > 0) {
                        id = elements[elements.length - 1].Id + 1;
                    }
                    $scope.mElement.Id = id;
                    elements.push($scope.mElement);
                    $scope.mElement = {};
                } else {
                    var ob = elements.filter(function(item) {
                        return item.Id == $scope.mElement.Id;
                    });

                    if (ob.length > 0) {
                        var dElement = ob[0];
                        var index = $scope.elements.indexOf(dElement);

                        if (index != -1) {
                            $scope.elements[index] = $scope.mElement;
                        }
                    }
                    $scope.mElement = {};
                }
            } else {
                projectFactory.initOddsData($scope.mElement, $scope.currentProject);
            }
            projectHttpService.manageProject($http, $scope, usSpinnerService, projectFactory.getToCurrentProject(), false);

        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });

    };

    usSpinnerService.stop("spinner-1");
    
    $scope.calculateOdds = function() {
        calculatorFactory.calculateOddsData($scope.currentProject);
        $scope.currentProject = projectFactory.getToCurrentProject();
    }

    $scope.oddsItemHasData = function(value, array) {
        if (value.Calculate) {
            return false;
        }
        var res = false;
        angular.forEach($scope.currentProject.FinDataOdds.Odds.Header, function(month, mKey) {
            if (value[month.VarName]) {
                res = true;
            }
        });
        if (!res) {
            value.Comments = undefined;
        }
        return res;
    }
    $scope.isPredicted = ['TotalIncome', 'TotalOutOperationsIncome'];
    $scope.checkEditability = function(row, hVarName) {
        var result = row.Calculate;
        if ($scope.isPredicted.indexOf(row.VarName) !== -1 && hVarName === 'Prediction') {
            result = false;
        }
        return result;
    }
    $scope.init();
};
blitzApp.controller("finDataOddsController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "projectFactory", "projectHttpService", "calculatorFactory", finDataOddsController]);