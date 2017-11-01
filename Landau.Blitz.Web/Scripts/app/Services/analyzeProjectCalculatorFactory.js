blitzApp.factory('analyzeProjectCalculatorFactory', ['$rootScope', 'mathFactory', function ($rootScope, mathFactory) {
    var analyzeProjectCalculatorFactory = {};




    analyzeProjectCalculatorFactory.calculateData = function (currentProject) {
        // calculating costPrice for Expected Revenues
        var totalCostPrice = 0;
        var totalRevenue = 0;
        var maxReachTerm = 0;
        angular.forEach(currentProject.ProjectAnalysis.ExcpectedRevenues, function (rev, revKey) {
            rev.Costprice = mathFactory.getFloat(rev.Revenue) / (100
                + (mathFactory.getFloat(rev.Markup))) * 100;
            totalRevenue += mathFactory.getFloat(rev.Revenue);
            totalCostPrice += rev.Costprice;
            maxReachTerm = maxReachTerm > rev.ReachTerm ? maxReachTerm : rev.ReachTerm;
        });
        // calculating SSK
        currentProject.ProjectAnalysis.SSK = currentProject.FinancePlanning.WoPosOwnResources /
            currentProject.FinancePlanning.WoPosTotalResources *
            currentProject.ProjectAnalysis.AlternativeBid +
            currentProject.FinancePlanning.WoPosBorrowedResources /
            currentProject.FinancePlanning.WoPosTotalResources *
            currentProject.ProjectAnalysis.CreditBid;
        // calculating total expenses
        var totalVarExpenses = 0;
        var totalConstExpenses = 0;
        for (let i = 0; i < currentProject.ProjectAnalysis.VarExpenses.length; i++) {
            totalVarExpenses += mathFactory.getFloat(currentProject.ProjectAnalysis.VarExpenses[i].Sum);
        }
        for (let i = 0; i < currentProject.ProjectAnalysis.ConstExpenses.length; i++) {
            totalConstExpenses += mathFactory.getFloat(currentProject.ProjectAnalysis.ConstExpenses[i].Sum);
        }
        currentProject.ProjectAnalysis.TotalExpenses = totalVarExpenses + totalConstExpenses;

        currentProject.ProjectAnalysis.ProfitForTheProject = totalRevenue - totalCostPrice -
            mathFactory.getFloat(currentProject.ProjectAnalysis.TotalExpenses);
        currentProject.ProjectAnalysis.ExpectedRevenue = totalRevenue;
        currentProject.ProjectAnalysis
            .SalesProfitability = currentProject.ProjectAnalysis.ProfitForTheProject / totalRevenue * 100;

        currentProject.ProjectAnalysis.PaybackPeriod = currentProject.FinancePlanning.WoPosTotalResources /
            currentProject.ProjectAnalysis.ProfitForTheProject;

        // finding min date in finance planning
        var minDate;
        angular.forEach(currentProject.FinancePlanning.Plans, function (tRow, pKey) {
            if (!minDate || minDate > tRow.Date) {
                minDate = tRow.Date;
            }
        });

        var monthBeforeProjectStarts = 0;
        if (currentProject.ProjectAnalysis.ProjectTerms &&
            minDate &&
            currentProject.ProjectAnalysis.ProjectTerms > minDate) {
            monthBeforeProjectStarts = currentProject.ProjectAnalysis.ProjectTerms.getMonth() -
                minDate.getMonth() +
                12 * (currentProject.ProjectAnalysis.ProjectTerms.getFullYear() - minDate.getFullYear());
        }

        currentProject.ProjectAnalysis.InvestmentBackPeriod = monthBeforeProjectStarts +
            maxReachTerm +
            mathFactory.getFloat(currentProject.ProjectAnalysis.PaybackPeriod);

        currentProject.ProjectAnalysis.ARR = currentProject.ProjectAnalysis.ProfitForTheProject *
            12 /
            currentProject.FinancePlanning.WoPosTotalResources *
            100;

        currentProject.ProjectAnalysis.BreakevenPoint = (totalRevenue * totalConstExpenses) /
            (totalRevenue - totalVarExpenses - totalCostPrice);

        currentProject.ProjectAnalysis.MarginOfSafety = (totalRevenue -
                mathFactory.getFloat(currentProject.ProjectAnalysis.BreakevenPoint)) /
            totalRevenue *
            100;

        return currentProject;
    }



    return analyzeProjectCalculatorFactory;

}]);