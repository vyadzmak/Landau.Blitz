blitzApp.factory('financePlanningCalculatorFactory', ['$rootScope', function($rootScope) {
    var financePlaningCalculatorFactory = {};


    financePlaningCalculatorFactory.calculateData = function(currentProject) {


        //currentProject.FinancePlanning.OwnFunds
        currentProject.FinancePlanning.TotalOwnFunds = currentProject.FinancePlanning.OwnFunds;

        currentProject.FinancePlanning.TotalBorrowedFunds = currentProject.FinancePlanning.BankFunds + currentProject.FinancePlanning.PrivateFunds + currentProject.FinancePlanning.ThirdPartyFunds;

        currentProject.FinancePlanning.TotalExpenses = currentProject.FinancePlanning.ExpensesDone + currentProject.FinancePlanning.ExpensesPlanned;

    }



    return financePlaningCalculatorFactory;

}]);