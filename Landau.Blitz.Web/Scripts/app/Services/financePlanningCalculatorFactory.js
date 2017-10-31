blitzApp.factory('financePlanningCalculatorFactory', ['$rootScope', 'mathFactory', function ($rootScope, mathFactory) {
    var financePlanningCalculatorFactory = {};

    financePlanningCalculatorFactory.calculateData = function(currentProject) {

        var ownFunds = 0;
        var borrowedFunds = 0;
        var totalFunds;

        var woPosOwnFunds = 0;
        var woPosBorrowedFunds = 0;
        var woPosTotalFunds;

        angular.forEach(currentProject.FinancePlanning.Plans, function (tRow, pKey) {
            if (tRow.Source.Id === 1) {
                ownFunds += mathFactory.getFloat(tRow.Sum);
                if (tRow.Expenditure.Id !== 1 && tRow.Expenditure.Id !== 2) {
                    woPosOwnFunds += mathFactory.getFloat(tRow.Sum);
                }
            } else {
                borrowedFunds += mathFactory.getFloat(tRow.Sum);
                if (tRow.Expenditure.Id !== 1 && tRow.Expenditure.Id !== 2) {
                    woPosBorrowedFunds += mathFactory.getFloat(tRow.Sum);
                }
            }
        });

        totalFunds = borrowedFunds + ownFunds;
        woPosTotalFunds = woPosOwnFunds + woPosBorrowedFunds;

        currentProject.FinancePlanning.OwnResources = ownFunds;
        currentProject.FinancePlanning.BorrowedResources = borrowedFunds;
        currentProject.FinancePlanning.TotalResources = totalFunds;
        currentProject.FinancePlanning.WoPosOwnResources = woPosOwnFunds;
        currentProject.FinancePlanning.WoPosBorrowedResources = woPosBorrowedFunds;
        currentProject.FinancePlanning.WoPosTotalResources = woPosTotalFunds;

        return currentProject;
    }

    financePlanningCalculatorFactory.calculateCreditData = function (currentProject) {

        var proposedSum = mathFactory
            .getFloat(currentProject.FinancePlanning.ProposedSum);
        var proposedCashSum = mathFactory
            .getFloat(currentProject.FinancePlanning.ProposedCashSum);
        currentProject.FinancePlanning.ProposedCashlessSum = proposedSum - proposedCashSum;
        var proposedTerm = mathFactory
            .getFloat(currentProject.FinancePlanning.ProposedTerm);
        var proposedRate = mathFactory
            .getFloat(currentProject.FinancePlanning.ProposedRate);
        currentProject.FinancePlanning
            .MonthlyFee = (proposedSum + proposedTerm / 12 * proposedRate * proposedSum / 100) / proposedTerm;

        return currentProject;
    }
    
    return financePlanningCalculatorFactory;

}]);