blitzApp.factory('financePlanningCalculatorFactory', ['$rootScope', 'mathFactory', function ($rootScope, mathFactory) {
    var financePlanningCalculatorFactory = {};

    financePlanningCalculatorFactory.calculateData = function (currentProject) {

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
        var preferentialTerm = mathFactory
            .getFloat(currentProject.FinancePlanning.PreferentialTerm);
        var proposedDelay = mathFactory
            .getFloat(currentProject.FinancePlanning.ProposedDelay);
        var proposedRate = mathFactory
            .getFloat(currentProject.FinancePlanning.ProposedRate);
        if (currentProject.FinancePlanning.IsAnnuity) {
            currentProject.FinancePlanning.MonthlyFee =
                (Math.pow(1 + proposedRate / 12 / 100, (proposedTerm - preferentialTerm)) * proposedRate / 12 / 100) /
                (Math.pow(1 + proposedRate / 12 / 100, (proposedTerm - preferentialTerm)) - 1) *
                proposedSum;
        } else {
            currentProject.FinancePlanning
                .MonthlyFee = proposedSum / (proposedTerm - preferentialTerm) + proposedRate/12 * proposedSum / 100;
        }
        currentProject.FinancePlanning.MonthlyFee = mathFactory.round(currentProject.FinancePlanning.MonthlyFee, 2);

        currentProject.FinancePlanning.Schedule = [];
        currentProject.FinancePlanning.CreditInterestTotal = 0;
        var remainingDebt = angular.copy(proposedSum);
        for (var i = 0; i < proposedTerm; i++) {
            var payment = {Id: i+1};
            if (i < preferentialTerm) {
                payment.Interest = proposedRate / 12 / 100 * proposedSum;
                payment.Interest = mathFactory.round(payment.Interest, 2);
                payment.Debt = 0;
                payment.Total = payment.Interest + payment.Debt;
                payment.RemainingDebt = remainingDebt;
            } else {
                if (currentProject.FinancePlanning.IsAnnuity) {
                    payment.Total = currentProject.FinancePlanning.MonthlyFee;
                    payment.Interest = remainingDebt * proposedRate / 12 / 100;
                    payment.Interest = mathFactory.round(payment.Interest, 2);
                    payment.Debt = payment.Total - payment.Interest;
                    payment.Debt = mathFactory.round(payment.Debt, 2);
                    remainingDebt = mathFactory.round(remainingDebt - payment.Debt, 2);
                    payment.RemainingDebt = remainingDebt;
                } else {
                    payment.Debt = mathFactory.round(proposedSum / (proposedTerm - preferentialTerm), 2);
                    payment.Interest = mathFactory.round((remainingDebt * proposedRate / 12 / 100), 2);
                    remainingDebt = mathFactory.round(remainingDebt - payment.Debt, 2);
                    payment.Total = payment.Debt + payment.Interest;
                    payment.RemainingDebt = remainingDebt;
                }
            }
            if (i === proposedTerm-1) {
                payment.Total += remainingDebt;
                payment.Debt += remainingDebt;
                payment.RemainingDebt = 0;
            }
            currentProject.FinancePlanning.CreditInterestTotal += payment.Interest;
            currentProject.FinancePlanning.Schedule.push(payment);
        }
        currentProject.FinancePlanning.CreditTotal = currentProject.FinancePlanning.CreditInterestTotal + proposedSum;

        return currentProject;
    }

    return financePlanningCalculatorFactory;

}]);