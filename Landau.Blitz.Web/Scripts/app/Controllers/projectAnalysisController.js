var projectAnalysisController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, projectHttpService, projectFactory, usSpinnerService) {
    // var url = $$ApiUrl + "/companies";
    $scope.filterFromArray = function (arr, id) {
        var ob = arr.filter(function (item) {
            return item.Id == id;
        });

        return ob[0];
    }

    $scope.deleteData = function () {
        var ob = $scope.elements.filter(function (item) {
            return item.Id == $scope.eIndex;
        });

        if (ob.length > 0) {
            var dElement = ob[0];
            var index = $scope.elements.indexOf(dElement);

            if (index != -1) {
                $scope.elements.splice(index, 1);
            }
        }
        projectHttpService.manageProject($http, $scope, usSpinnerService, projectFactory.getToCurrentProject(), false);

    }
    $scope.RemoveElement = function () {
        var dialog = BootstrapDialog.confirm({
            title: 'Предупреждение',
            message: 'Вы действительно хотите удалить данные?',
            type: BootstrapDialog.TYPE_WARNING,
            size: BootstrapDialog.SIZE_SMALL,
            closable: true,
            btnCancelLabel: 'Нет',
            btnOKLabel: 'Да',
            btnOKClass: 'btn-warning',
            callback: function (result) {
                if (result) {
                    $scope.deleteData();
                }
            }
        });
        dialog.setSize(BootstrapDialog.SIZE_SMALL);
    };

    $scope.menuItems = [
        {
            text: "Удалить",
            callback: $scope.RemoveElement, //function to be called on click  
            disabled: false
        }
    ];

    $scope.showNewExpectedRevenue = function () {
        if (!$scope.currentProject.ProjectAnalysis.ExcpectedRevenues) {
            $scope.currentProject.ProjectAnalysis.ExcpectedRevenues = [];
        }
        $scope.currentProject.ProjectAnalysis.ExcpectedRevenues.push({
            Id: $scope.currentProject.ProjectAnalysis.ExcpectedRevenues.length + 1,
            RevenueDynamics: []
        });
    }

    $scope.showNewVarExpenses = function () {
        if (!$scope.currentProject.ProjectAnalysis.VarExpenses) {
            $scope.currentProject.ProjectAnalysis.VarExpenses = [];
        }
        $scope.currentProject.ProjectAnalysis.VarExpenses.push({
            Id: $scope.currentProject.ProjectAnalysis.VarExpenses.length + 1
        });
    }

    $scope.showNewConstExpenses = function () {
        if (!$scope.currentProject.ProjectAnalysis.ConstExpenses) {
            $scope.currentProject.ProjectAnalysis.ConstExpenses = [];
        }
        $scope.currentProject.ProjectAnalysis.ConstExpenses.push({
            Id: $scope.currentProject.ProjectAnalysis.ConstExpenses.length + 1
        });
    }

    $scope.clickExpectedRevenue = function (id) {
        $scope.rmIndex = 1;
        $scope.eIndex = id;

        $scope.editElement = $scope.filterFromArray($scope.currentProject.ProjectAnalysis.ExcpectedRevenues, $scope.eIndex);

        $scope.mElement = $scope.editElement;
        $scope.elements = $scope.currentProject.ProjectAnalysis.ExcpectedRevenues;
    };

    $scope.clickVarExpenses = function (id) {
        $scope.rmIndex = 1;
        $scope.eIndex = id;

        $scope.editElement = $scope.filterFromArray($scope.currentProject.ProjectAnalysis.VarExpenses, $scope.eIndex);

        $scope.mElement = $scope.editElement;
        $scope.elements = $scope.currentProject.ProjectAnalysis.VarExpenses;
    };

    $scope.clickConstExpenses = function (id) {
        $scope.rmIndex = 1;
        $scope.eIndex = id;

        $scope.editElement = $scope.filterFromArray($scope.currentProject.ProjectAnalysis.ConstExpenses, $scope.eIndex);

        $scope.mElement = $scope.editElement;
        $scope.elements = $scope.currentProject.ProjectAnalysis.ConstExpenses;
    };

    $scope.createRevenueDynamics = function (text, elem, rev) {
        rev.RevenueDynamics.splice(0, rev.RevenueDynamics.length);
        if (!isNaN(parseInt(rev.ReachTerm)) && isFinite(rev.ReachTerm)) {
            for (var i = 0; i < +rev.ReachTerm; i++) {
                rev.RevenueDynamics.push({ Id: rev.RevenueDynamics.length + 1, Revenue: 0 });
            }
        } else {
            rev.ReachTerm = 0;
        }
    }

    $scope.calculateCostPrice = function(param1, param2, rev) {
        if (!isNaN(parseFloat(rev.Revenue)) && isFinite(rev.Revenue) &&
            !isNaN(parseFloat(rev.Markup)) && isFinite(rev.Markup)) {
            rev.Costprice = +rev.Revenue / (100 + (+rev.Markup)) * 100;
        }
    }

    $scope.calculateTotalExpenses = function() {
        var totalExpenses = 0;
        for (let i = 0; i < $scope.currentProject.ProjectAnalysis.VarExpenses.length; i++) {
            totalExpenses += +$scope.currentProject.ProjectAnalysis.VarExpenses[i].Sum;
        }
        for (let i = 0; i < $scope.currentProject.ProjectAnalysis.ConstExpenses.length; i++) {
            totalExpenses += +$scope.currentProject.ProjectAnalysis.ConstExpenses[i].Sum;
        }
        $scope.currentProject.ProjectAnalysis.TotalExpenses = totalExpenses;
    }

    $scope.calculateSSK = function() {
        
    }

    usSpinnerService.stop("spinner-1");
};
blitzApp.controller("projectAnalysisController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "projectHttpService", "projectFactory", "usSpinnerService", projectAnalysisController]);