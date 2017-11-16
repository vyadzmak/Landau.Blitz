blitzApp.factory('analyzeProjectCalculatorFactory', ['$rootScope', 'mathFactory', function ($rootScope, mathFactory) {
    var analyzeProjectCalculatorFactory = {};




    analyzeProjectCalculatorFactory.calculateData = function (currentProject) {
        // calculating costPrice for Expected Revenues
        var totalCostPrice = 0;
        var totalRevenue = 0;
        var maxReachTerm = 0;
        angular.forEach(currentProject.ProjectAnalysis.ExcpectedRevenues, function (rev, revKey) {
            if (mathFactory.getFloat(rev.Markup) > 0) {
                rev.Costprice = mathFactory.getFloat(rev.Revenue) / (100 + (mathFactory.getFloat(rev.Markup))) * 100;
            } else {
                rev.Costprice = 0;
            }
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
        currentProject.ProjectAnalysis.SSK = mathFactory.round(currentProject.ProjectAnalysis.SSK, 2);
        // calculating total expenses
        var totalVarExpenses = 0;
        var totalConstExpenses = 0;
        if (currentProject.ProjectAnalysis.VarExpenses) {
            for (let i = 0; i < currentProject.ProjectAnalysis.VarExpenses.length; i++) {
                totalVarExpenses += mathFactory.getFloat(currentProject.ProjectAnalysis.VarExpenses[i].Sum);
            }
        }
        if (currentProject.ProjectAnalysis.ConstExpenses) {
            for (let i = 0; i < currentProject.ProjectAnalysis.ConstExpenses.length; i++) {
                totalConstExpenses += mathFactory.getFloat(currentProject.ProjectAnalysis.ConstExpenses[i].Sum);
            }
        }
        currentProject.ProjectAnalysis.TotalExpenses = totalVarExpenses + totalConstExpenses;

        currentProject.ProjectAnalysis.ProfitForTheProject = totalRevenue - totalCostPrice -
            mathFactory.getFloat(currentProject.ProjectAnalysis.TotalExpenses);
        currentProject.ProjectAnalysis.ProfitForTheProject = mathFactory.round(currentProject.ProjectAnalysis.ProfitForTheProject, 2);
        currentProject.ProjectAnalysis.ExpectedRevenue = mathFactory.round(totalRevenue, 2);
        currentProject.ProjectAnalysis
            .SalesProfitability = currentProject.ProjectAnalysis.ProfitForTheProject / totalRevenue * 100;
        currentProject.ProjectAnalysis.SalesProfitability = mathFactory.round(currentProject.ProjectAnalysis.SalesProfitability, 2);


        currentProject.ProjectAnalysis.PaybackPeriod = currentProject.FinancePlanning.WoPosTotalResources /
            currentProject.ProjectAnalysis.ProfitForTheProject;
        currentProject.ProjectAnalysis.PaybackPeriod = mathFactory.round(currentProject.ProjectAnalysis.PaybackPeriod, 1);
        // finding min date in finance planning
        var minDate;
        angular.forEach(currentProject.FinancePlanning.Plans, function (tRow, pKey) {
            if (!minDate || minDate > tRow.Date) {
                minDate = tRow.Date;
            }
        });

        minDate = moment(minDate, 'DD.MM.YYYY').isValid
            ? moment(minDate, 'DD.MM.YYYY')
            : moment(minDate).isValid ? moment(minDate) : null;
        var projectStartDate = moment(currentProject.ProjectAnalysis.ProjectTerms).isValid ? moment(currentProject.ProjectAnalysis.ProjectTerms) : null;
        var monthBeforeProjectStarts = 0;
        if (projectStartDate && minDate && projectStartDate > minDate) {
            monthBeforeProjectStarts = projectStartDate.diff(minDate, 'months', true);
        }

        currentProject.ProjectAnalysis.InvestmentBackPeriod = monthBeforeProjectStarts +
            maxReachTerm +
            mathFactory.getFloat(currentProject.ProjectAnalysis.PaybackPeriod);
        currentProject.ProjectAnalysis.InvestmentBackPeriod = mathFactory.round(currentProject.ProjectAnalysis.InvestmentBackPeriod, 1);
        currentProject.ProjectAnalysis.ARR = currentProject.ProjectAnalysis.ProfitForTheProject *
            12 /
            currentProject.FinancePlanning.WoPosTotalResources *
            100;
        currentProject.ProjectAnalysis.ARR = mathFactory.round(currentProject.ProjectAnalysis.ARR, 2);
        currentProject.ProjectAnalysis.BreakevenPoint = (totalRevenue * totalConstExpenses) /
            (totalRevenue - totalVarExpenses - totalCostPrice);
        currentProject.ProjectAnalysis.BreakevenPoint = mathFactory.round(currentProject.ProjectAnalysis.BreakevenPoint, 2);
        currentProject.ProjectAnalysis.MarginOfSafety = (totalRevenue -
                mathFactory.getFloat(currentProject.ProjectAnalysis.BreakevenPoint)) /
            totalRevenue *
            100;
        currentProject.ProjectAnalysis.MarginOfSafety = mathFactory.round(currentProject.ProjectAnalysis.MarginOfSafety, 2);
        return currentProject;
    }



    return analyzeProjectCalculatorFactory;

}]);