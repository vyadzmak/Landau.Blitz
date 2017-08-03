blitzApp.factory('analyzeProjectCalculatorFactory', ['$rootScope', function($rootScope) {
    var analyzeProjectCalculatorFactory = {};




    analyzeProjectCalculatorFactory.calculateData = function(currentProject) {
        currentProject.ProjectAnalysis.FullExpensesExcludePos = +(parseFloat(currentProject.FinancePlanning.TotalExpenses - currentProject.FinancePlanning.TotalPos)).toFixed(2);
        currentProject.ProjectAnalysis.SK = +(parseFloat(currentProject.FinancePlanning.TotalOwnFunds)).toFixed(2);
        currentProject.ProjectAnalysis.ZK = +(parseFloat(currentProject.FinancePlanning.TotalBorrowedFunds)).toFixed(2);

        currentProject.ProjectAnalysis.SKPercent = +(parseFloat(currentProject.FinancePlanning.TotalOwnFunds / currentProject.ProjectAnalysis.FullExpensesExcludePos * 100)).toFixed(2);
        currentProject.ProjectAnalysis.ZKPercent = +(parseFloat(currentProject.FinancePlanning.TotalBorrowedFunds / currentProject.ProjectAnalysis.FullExpensesExcludePos * 100)).toFixed(2);

        currentProject.ProjectAnalysis.SSK = +(parseFloat((currentProject.ProjectAnalysis.AlternativeBid / 100) * currentProject.ProjectAnalysis.SKPercent + (currentProject.ProjectAnalysis.CreditBid / 100) * currentProject.ProjectAnalysis.ZKPercent)).toFixed(2);
        //currentProject.ProjectAnalysis.SSK = Number((currentProject.ProjectAnalysis.AlternativeBid) * currentProject.ProjectAnalysis.SKPercent + (currentProject.ProjectAnalysis.CreditBid) * currentProject.ProjectAnalysis.ZKPercent).toFixed(2);


        //ожидаемая выручка

        //1. Себестоимость = [Ожидаемая выручка (3.2.-42) /(100+m)] х 100 
        currentProject.ProjectAnalysis.SelfCost = +(parseFloat(((currentProject.ProjectAnalysis.ExpectedRevenue / (currentProject.ProjectAnalysis.ExtraCharge + 100) * 100)))).toFixed(2);
        currentProject.ProjectAnalysis.AGrossProfit = +(parseFloat(currentProject.ProjectAnalysis.ExpectedRevenue - currentProject.ProjectAnalysis.SelfCost)).toFixed(2);
        currentProject.ProjectAnalysis.ProfitForTheProject = +(parseFloat(currentProject.ProjectAnalysis.AGrossProfit - currentProject.ProjectAnalysis.VariableCosts - currentProject.ProjectAnalysis.FixedCosts)).toFixed(2);
        currentProject.ProjectAnalysis.SalesProfitability = +(parseFloat((currentProject.ProjectAnalysis.ProfitForTheProject / currentProject.ProjectAnalysis.ExpectedRevenue))).toFixed(2);
        //payback period
        currentProject.ProjectAnalysis.PaybackPeriod = +(parseFloat((currentProject.ProjectAnalysis.FullExpensesExcludePos / currentProject.ProjectAnalysis.ProfitForTheProject))).toFixed(2);
        currentProject.ProjectAnalysis.ARR = +(parseFloat((currentProject.ProjectAnalysis.ProfitForTheProject * 12 / currentProject.ProjectAnalysis.FullExpensesExcludePos))).toFixed(2);
        //breakeven point
        currentProject.ProjectAnalysis.BreakevenPoint = +(parseFloat(((currentProject.ProjectAnalysis.ExpectedRevenue * currentProject.ProjectAnalysis.FixedCosts) / (currentProject.ProjectAnalysis.ExpectedRevenue - currentProject.ProjectAnalysis.SelfCost - currentProject.ProjectAnalysis.VariableCosts)))).toFixed(2);
        //margin of safety
        currentProject.ProjectAnalysis.MarginOfSafety = +(parseFloat(((currentProject.ProjectAnalysis.ExpectedRevenue - currentProject.ProjectAnalysis.BreakevenPoint) / currentProject.ProjectAnalysis.ExpectedRevenue))).toFixed(2);

    }



    return analyzeProjectCalculatorFactory;

}]);