blitzApp.factory('crossCheckCalculatorFactory', ['$rootScope', 'mathFactory', function ($rootScope, mathFactory) {
    var crossCheckCalculatorFactory = {};

    var getVarArrayByName = function (opiu, name) {
        var ob = opiu.Table.filter(function (item) {
            return item.VarName == name;
        });
        if (ob == undefined || ob.length === 0) return null;
        return ob[0];
    }

    crossCheckCalculatorFactory.calculateData = function (currentProject) {

        try {
            var len = currentProject.ConsolidatedBalance.length;
            if (len > 1) {
                currentProject.FinDataCrossChecking.Period =
                    moment(currentProject.ConsolidatedBalance[len - 1].Date) - moment(currentProject.ConsolidatedBalance[len - 2].Date);
                currentProject.FinDataCrossChecking
                    .Period = currentProject.FinDataCrossChecking.Period / 3600 / 1000 / 24 / 30;
                currentProject.FinDataCrossChecking.ActualIncreaseSK =
                    mathFactory.getFloat(currentProject.ConsolidatedBalance[len - 1].ConsEquity) -
                    mathFactory.getFloat(currentProject.ConsolidatedBalance[len - 2].ConsEquity);
                currentProject.FinDataCrossChecking.ActualSK = mathFactory
                    .getFloat(currentProject.ConsolidatedBalance[len - 1].ConsEquity);

                var totalFactors = 0;
                angular.forEach(currentProject.FinDataCrossChecking.Factors, function (factor, fKey) {
                    totalFactors += mathFactory.getFloat(factor.Sum);
                });
                
                // calculating netProfit for the period
                var cleanNetProfit = 0;
                var balancesMonthsDiff = moment(currentProject.FinDataBalance.CurrentFinAnalysisDate).month() -
                    moment(currentProject.FinDataBalance.PreviousFinAnalysisDate).month();
                var rowNetProfit = getVarArrayByName(currentProject.ConsolidatedOpiu.Opiu, 'NetProfit');
                if (currentProject.ConsolidatedOpiu.Opiu.OpiuMonthsQuantity >= balancesMonthsDiff) {
                    var monthDiffWithOpiu = currentProject.ConsolidatedOpiu.Opiu
                        .OpiuMonthsQuantity -
                        balancesMonthsDiff;
                    for (var i = 1; i <= balancesMonthsDiff; i++) {
                        var rNetProfit = mathFactory.getFloat(rowNetProfit['M' + (monthDiffWithOpiu + i)]);
                        if (i === 1) {
                            var daysInFirstBalMonth = moment(currentProject.FinDataBalance.PreviousFinAnalysisDate).
                            daysInMonth();
                            var dayNumOfFirstBalMonth = moment(currentProject.FinDataBalance.PreviousFinAnalysisDate).date();
                            rNetProfit = rNetProfit * (daysInFirstBalMonth - dayNumOfFirstBalMonth) / daysInFirstBalMonth;
                        }
                        cleanNetProfit += rNetProfit;
                    }
                } else {
                    cleanNetProfit = mathFactory.getFloat(rowNetProfit.Avg) * mathFactory.getFloat(currentProject.FinDataCrossChecking.Period);
                }
                currentProject.FinDataCrossChecking.PeriodNetProfit = cleanNetProfit;
                // expected sk increase
                currentProject.FinDataCrossChecking.ExpectedIncreaseSK =
                    mathFactory.getFloat(currentProject.FinDataCrossChecking.PeriodNetProfit) *
                    mathFactory.getFloat(currentProject.FinDataCrossChecking.Period) -
                    mathFactory.getFloat(currentProject.FinDataCrossChecking.PaidInterest);
                    // expected sk and sk difference
                    currentProject.FinDataCrossChecking.ExpectedSK =
                    mathFactory.getFloat(currentProject.ConsolidatedBalance[len - 2].ConsEquity) +
                    totalFactors +
                    mathFactory.getFloat(currentProject.FinDataCrossChecking.ExpectedIncreaseSK);

                currentProject.FinDataCrossChecking.DiffSK =
                    mathFactory.getFloat(currentProject.FinDataCrossChecking.ActualSK) -
                    mathFactory.getFloat(currentProject.FinDataCrossChecking.ExpectedSK);
            }
        }
        catch (except) {
            console.log(except);
        }

        return currentProject;
    }

    return crossCheckCalculatorFactory;

}]);