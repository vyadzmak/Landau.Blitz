blitzApp.factory('crossCheckCalculatorFactory', ['$rootScope', 'mathFactory', function ($rootScope, mathFactory) {
    var crossCheckCalculatorFactory = {};

    crossCheckCalculatorFactory.calculateData = function (currentProject) {

        try {
            var len = currentProject.ConsolidatedBalance.length;
            if(length>1){
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