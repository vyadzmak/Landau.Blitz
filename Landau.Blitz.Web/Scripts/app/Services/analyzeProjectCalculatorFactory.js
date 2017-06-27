blitzApp.factory('analyzeProjectCalculatorFactory', ['$rootScope', function($rootScope) {
    var analyzeProjectCalculatorFactory = {};




    analyzeProjectCalculatorFactory.calculateData = function(currentProject) {
        currentProject.ProjectAnalysis.FullExpensesExcludePos = currentProject.FinancePlanning.TotalExpenses - currentProject.FinancePlanning.TotalPos;
        currentProject.ProjectAnalysis.SK = currentProject.FinancePlanning.TotalOwnFunds;
        currentProject.ProjectAnalysis.ZK = currentProject.FinancePlanning.TotalBorrowedFunds;

        currentProject.ProjectAnalysis.SKPercent = Number((currentProject.FinancePlanning.TotalOwnFunds / currentProject.ProjectAnalysis.FullExpensesExcludePos * 100).toFixed(2));;
        currentProject.ProjectAnalysis.ZKPercent = Number((currentProject.FinancePlanning.TotalBorrowedFunds / currentProject.ProjectAnalysis.FullExpensesExcludePos * 100).toFixed(2));

        currentProject.ProjectAnalysis.SSK = currentProject.ProjectAnalysis.AlternativeBid * currentProject.ProjectAnalysis.SKPercent + currentProject.ProjectAnalysis.CreditBid * currentProject.ProjectAnalysis.ZKPercent;


        //ожидаемая выручка
        currentProject.ProjectAnalysis.SelfCost = Number((currentProject.ProjectAnalysis.ExpectedRevenue * 100 / currentProject.ProjectAnalysis.ExtraCharge).toFixed(2))
        currentProject.ProjectAnalysis.AGrossProfit = currentProject.ProjectAnalysis.ExpectedRevenue - currentProject.ProjectAnalysis.SelfCost;
        currentProject.ProjectAnalysis.ProfitForTheProject = currentProject.ProjectAnalysis.AGrossProfit - currentProject.ProjectAnalysis.VariableCosts - currentProject.ProjectAnalysis.FixedCosts;
        currentProject.ProjectAnalysis.SalesProfitability = Number((currentProject.ProjectAnalysis.ProfitForTheProject / currentProject.ProjectAnalysis.ExpectedRevenue).toFixed(2));
        //payback period
        currentProject.ProjectAnalysis.PaybackPeriod = Number((currentProject.ProjectAnalysis.FullExpensesExcludePos / currentProject.ProjectAnalysis.ProfitForTheProject).toFixed(1));
        currentProject.ProjectAnalysis.ARR = Number((currentProject.ProjectAnalysis.ProfitForTheProject * 12 / currentProject.ProjectAnalysis.FullExpensesExcludePos).toFixed(1));
        //breakeven point
        currentProject.ProjectAnalysis.BreakevenPoint = Number(((currentProject.ProjectAnalysis.ExpectedRevenue * currentProject.ProjectAnalysis.FixedCosts) / (currentProject.ProjectAnalysis.ExpectedRevenue - currentProject.ProjectAnalysis.SelfCost - currentProject.ProjectAnalysis.VariableCosts)).toFixed(1));
        //margin of safety
        currentProject.ProjectAnalysis.MarginOfSafety = Number(((currentProject.ProjectAnalysis.ExpectedRevenue - currentProject.ProjectAnalysis.BreakevenPoint) / currentProject.ProjectAnalysis.ExpectedRevenue).toFixed(1));

    }



    return analyzeProjectCalculatorFactory;

}]);