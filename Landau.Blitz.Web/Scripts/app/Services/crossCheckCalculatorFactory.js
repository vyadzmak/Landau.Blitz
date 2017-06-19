blitzApp.factory('crossCheckCalculatorFactory', ['$rootScope', function($rootScope) {
    var crossCheckCalculatorFactory = {};

    function monthDiff(d1, d2) {
        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth() + 1;
        months += d2.getMonth();
        return months <= 0 ? 0 : months;
    }

    function calculateActualIncreaseSK(currentProject) {
        currentProject.FinDataCrossChecking.IncreaseSK = currentProject.FinDataBalance.Equity2 - currentProject.FinDataBalance.Equity;
    }

    crossCheckCalculatorFactory.calculateData = function(currentProject) {
        currentProject.FinDataCrossChecking.ActualIncreaseSK = currentProject.FinDataBalance.Equity2 - currentProject.FinDataBalance.Equity;


        currentProject.FinDataCrossChecking.DeltaMonths = monthDiff(currentProject.FinDataBalance.Date, currentProject.FinDataBalance.PreviousDate);

        var ob = currentProject.FinDataOpiu.Table.filter(function(item) {
            return item.VarName == 'NetProfit';
        });

        currentProject.FinDataCrossChecking.NetProfitAvg = ob[0].Avg;


        currentProject.FinDataCrossChecking.ActualSK = currentProject.FinDataBalance.Equity2;

        currentProject.FinDataCrossChecking.ExpectedIncreaseSK = currentProject.FinDataCrossChecking.DeltaMonths * currentProject.FinDataCrossChecking.NetProfitAvg - currentProject.FinDataCrossChecking.PaidInterest;


    }



    return crossCheckCalculatorFactory;

}]);