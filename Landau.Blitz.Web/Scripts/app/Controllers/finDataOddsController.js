//function formatCurrency(value) {
//    if (value == "0") return "0";
//    if (value == "") return "";
//    var t = +value;
//    return t.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
//        //return "<i>" + value + "</i>"
//}

var finDataOddsController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, projectFactory, projectHttpService) {
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
        //$('#oddsTable').bootstrapTable({
        //    idField: 'Title',
        //    pagination: false,
        //    search: true,
        //    data: $scope.currentProject.FinDataOdds.Table,

        //    columns: [{
        //        field: 'Title',
        //        title: 'Наименование'
        //    }, {
        //        field: 'M1',
        //        title: '1',
        //        editable: {
        //            type: 'text'
        //        },
        //        formatter: formatCurrency
        //    }, {
        //        field: 'M2',
        //        title: '2',
        //        editable: {
        //            type: 'text'
        //        },
        //        formatter: formatCurrency
        //    }, {
        //        field: 'M3',
        //        title: '3',
        //        editable: {
        //            type: 'text'
        //        },
        //        formatter: formatCurrency
        //    }, {
        //        field: 'M4',
        //        title: '4',
        //        editable: {
        //            type: 'text'
        //        },
        //        formatter: formatCurrency
        //    }, {
        //        field: 'M5',
        //        title: '5',
        //        editable: {
        //            type: 'text'
        //        },
        //        formatter: formatCurrency
        //    }, {
        //        field: 'M6',
        //        title: '6',
        //        editable: {
        //            type: 'text'
        //        },
        //        formatter: formatCurrency
        //    }, {
        //        field: 'Avg',
        //        title: 'Среднее текущее',
        //        formatter: formatCurrency
        //    }, {
        //        field: 'AvgPrognose',
        //        title: 'Среднее прогноз',
        //        formatter: formatCurrency
        //    }]
        //});
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

    $scope.init();
    usSpinnerService.stop("spinner-1");

    $scope.SumsValues=[
        {TotalName:''}
    ]

    $scope.calculateOdds = function() {
        
        var income,
            totalIncome,
            totalOutOperationsIncome,
            expenses,
            totalExpensesForBusiness,
            totalExpensesOutBusiness,
            endMonth,
            endPeriod;
        angular.forEach($scope.currentProject.FinDataOdds.Odds.Table, function(tRow, rKey) {
            if(tRow.Calculate)
            {
                switch(tRow.VarName) {
                    case "Income": income = tRow; break;
                    case "TotalIncome": totalIncome = tRow; break;
                    case "TotalOutOperationsIncome": totalOutOperationsIncome = tRow; break;
                    case "Expenses": expenses = tRow; break;
                    case "TotalExpensesForBusiness": totalExpensesForBusiness = tRow; break;
                    case "TotalExpensesOutBusiness": totalExpensesOutBusiness = tRow; break;
                    case "EndMonth": endMonth = tRow; break;
                    case "EndPeriod": endPeriod = tRow; break;
                }
            }
        });
        // calculate values
        angular.forEach($scope.currentProject.FinDataOdds.Odds.Table, function(tRow, rKey) {
            angular.forEach($scope.currentProject.FinDataOdds.Odds.Header, function(month, mKey) {
                
            });
        });

        //calculate average for all rows
        angular.forEach($scope.currentProject.FinDataOdds.Odds.Table, function(tRow, rKey) {
            var totalByMonths = 0;
            angular.forEach($scope.currentProject.FinDataOdds.Odds.Months, function(month, mKey) {
                totalByMonths += +tRow['M' + month.Id];
            });
            tRow.Avg = totalByMonths / $scope.currentProject.FinDataOdds.Odds.Months.length;
        });
    }

    $scope.getVarArrayByName = function(opiu, name) {
        var ob = opiu.Table.filter(function(item) {
            return item.VarName == name;
        });
        if (ob == undefined || ob.length === 0) return null;
        return ob[0];
    }
};
blitzApp.controller("finDataOddsController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "projectFactory", "projectHttpService", finDataOddsController]);