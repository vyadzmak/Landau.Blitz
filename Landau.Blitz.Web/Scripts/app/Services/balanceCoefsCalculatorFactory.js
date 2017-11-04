blitzApp.factory('balanceCoefsCalculatorFactory', ['$rootScope', 'mathFactory', function ($rootScope, mathFactory) {
    var balanceCoefsCalculatorFactory = {};

    var getVarArrayByName = function (opiu, name) {
        var ob = opiu.Table.filter(function (item) {
            return item.VarName == name;
        });
        if (ob == undefined || ob.length === 0) return null;
        return ob[0];
    }

    var calculateCoefsData = function (balance, opiu, borrowedResources) {
        var currentBalance = balance.CompanyBalances[1];
        var previousBalance = balance.CompanyBalances[0];
        var currentDate = moment(currentBalance.Date);
        var previousDate = moment(previousBalance.Date);
        var period = currentDate.diff(previousDate, 'days');

        var costOfGoodsAvg = getVarArrayByName(opiu, 'CostOfGoods').Avg;
        var revenuesAvg = getVarArrayByName(opiu, 'Revenues').Avg;
        var grossProfitAvg = getVarArrayByName(opiu, 'GrossProfit').Avg;

        var profitOnBusinessAvg = getVarArrayByName(opiu, 'ProfitOnBusiness').Avg;
        var loanInterstAvg = getVarArrayByName(opiu, 'LoanInterest').Avg;
        var taxesAvg = getVarArrayByName(opiu, 'Taxes').Avg;

        var netProfitAvg = getVarArrayByName(opiu, 'NetProfit').Avg;

        balance.UrgentLiquidityCoef =
            (mathFactory.getFloat(currentBalance.TotalCurrentAssets)
            + mathFactory.getFloat(currentBalance.Assets.RecievableAccounts.Total)) /
            mathFactory.getFloat(currentBalance.TotalShortTermDebt);

        balance.CurrentLiquidityCoef =
            mathFactory.getFloat(currentBalance.TotalCurrentAssets) /
            mathFactory.getFloat(currentBalance.TotalShortTermDebt);

        balance.NetWorkingCapital =
            mathFactory.getFloat(currentBalance.TotalCurrentAssets) -
            mathFactory.getFloat(currentBalance.TotalShortTermDebt);

        balance.DebtorsTurnoverTerm = (mathFactory.getFloat(currentBalance.Assets.RecievableAccounts.Total) +
                mathFactory.getFloat(previousBalance.Assets.RecievableAccounts.Total)) /
            2 * period / mathFactory.getFloat(revenuesAvg);

        balance.InventoriesTurnoverTerm = (mathFactory.getFloat(currentBalance.Inventories) +
                mathFactory.getFloat(previousBalance.Inventories)) /
            2 * period / mathFactory.getFloat(costOfGoodsAvg);

        balance.CreditorsTurnoverTerm = (mathFactory.getFloat(currentBalance.Liabilities.PayableAccounts.Total) +
                mathFactory.getFloat(previousBalance.Liabilities.PayableAccounts.Total)) /
            2 * period / mathFactory.getFloat(costOfGoodsAvg);

        balance.OperationCycle = mathFactory.getFloat(balance.DebtorsTurnoverTerm) +
            mathFactory.getFloat(balance.InventoriesTurnoverTerm);

        balance.FinancialCycle = mathFactory.getFloat(balance.OperationCycle) -
            mathFactory.getFloat(balance.CreditorsTurnoverTerm);

        balance.GrossProfitability = mathFactory.getFloat(grossProfitAvg) /
            mathFactory.getFloat(revenuesAvg);

        balance.NetProfitability = mathFactory.getFloat(netProfitAvg) /
            mathFactory.getFloat(revenuesAvg);

        balance.ProfitabilityBeforeTaxes = (mathFactory.getFloat(profitOnBusinessAvg)
            + mathFactory.getFloat(loanInterstAvg)
            + mathFactory.getFloat(taxesAvg)) /
            mathFactory.getFloat(revenuesAvg);

        balance.CoverageRate = mathFactory.getFloat(netProfitAvg) /
            mathFactory.getFloat(loanInterstAvg);

        balance.ROE = mathFactory.getFloat(netProfitAvg) /
            mathFactory.getFloat(currentBalance.Equity);

        balance.ROA = mathFactory.getFloat(netProfitAvg) /
            mathFactory.getFloat(currentBalance.TotalAssets);

        balance.DebtAssetsRatio = (mathFactory.getFloat(currentBalance.Liabilities.ShortWorkingCapitalCredit.Total)
            + mathFactory.getFloat(currentBalance.Liabilities.ShortFixedAssetsCredit.Total)
            + mathFactory.getFloat(currentBalance.Liabilities.LongWorkingCapitalCredit.Total)
            + mathFactory.getFloat(currentBalance.Liabilities.LongFixedAssetsCredit.Total)) /
            mathFactory.getFloat(currentBalance.TotalAssets);

        balance.AutonomyCoef = mathFactory.getFloat(currentBalance.Equity) /
            mathFactory.getFloat(currentBalance.TotalAssets);

        balance.TurnoverSpeedCoef =
            mathFactory.getFloat(currentBalance.Inventories) /
            mathFactory.getFloat(costOfGoodsAvg) * 30;

        balance.TurnoverInventoryCoef =
            mathFactory.getFloat(costOfGoodsAvg) /
            mathFactory.getFloat(currentBalance.Inventories);

        balance.Equity1Coef =
            mathFactory.getFloat(borrowedResources) /
            mathFactory.getFloat(currentBalance.Equity);
    }

    var calculateConsCoefsData = function (balance, opiu, borrowedResources) {
        var currentBalance = balance.CompanyBalances[1];
        var previousBalance = balance.CompanyBalances[0];
        var currentDate = moment(currentBalance.Date);
        var previousDate = moment(previousBalance.Date);
        var period = currentDate.diff(previousDate, 'days');

        var costOfGoodsAvg = getVarArrayByName(opiu, 'CostOfGoods').Avg;
        var revenuesAvg = getVarArrayByName(opiu, 'Revenues').Avg;
        var grossProfitAvg = getVarArrayByName(opiu, 'GrossProfit').Avg;

        var profitOnBusinessAvg = getVarArrayByName(opiu, 'ProfitOnBusiness').Avg;
        var loanInterstAvg = getVarArrayByName(opiu, 'LoanInterest').Avg;
        var taxesAvg = getVarArrayByName(opiu, 'Taxes').Avg;

        var netProfitAvg = getVarArrayByName(opiu, 'NetProfit').Avg;

        balance.UrgentLiquidityCoef =
            (mathFactory.getFloat(currentBalance.ConsTotalCurrentAssets)
            + mathFactory.getFloat(currentBalance.Assets.RecievableAccounts.ConsTotal)) /
            mathFactory.getFloat(currentBalance.ConsTotalShortTermDebt);

        balance.CurrentLiquidityCoef =
            mathFactory.getFloat(currentBalance.ConsTotalCurrentAssets) /
            mathFactory.getFloat(currentBalance.ConsTotalShortTermDebt);

        balance.NetWorkingCapital =
            mathFactory.getFloat(currentBalance.ConsTotalCurrentAssets) -
            mathFactory.getFloat(currentBalance.ConsTotalShortTermDebt);

        balance.DebtorsTurnoverTerm = (mathFactory.getFloat(currentBalance.Assets.RecievableAccounts.ConsTotal) +
                mathFactory.getFloat(previousBalance.Assets.RecievableAccounts.ConsTotal)) /
            2 * period / mathFactory.getFloat(revenuesAvg);

        balance.InventoriesTurnoverTerm = (mathFactory.getFloat(currentBalance.ConsInventories) +
                mathFactory.getFloat(previousBalance.ConsInventories)) /
            2 * period / mathFactory.getFloat(costOfGoodsAvg);

        balance.CreditorsTurnoverTerm = (mathFactory.getFloat(currentBalance.Liabilities.PayableAccounts.ConsTotal) +
                mathFactory.getFloat(previousBalance.Liabilities.PayableAccounts.ConsTotal)) /
            2 * period / mathFactory.getFloat(costOfGoodsAvg);

        balance.OperationCycle = mathFactory.getFloat(balance.DebtorsTurnoverTerm) +
            mathFactory.getFloat(balance.InventoriesTurnoverTerm);

        balance.FinancialCycle = mathFactory.getFloat(balance.OperationCycle) -
            mathFactory.getFloat(balance.CreditorsTurnoverTerm);

        balance.GrossProfitability = mathFactory.getFloat(grossProfitAvg) /
            mathFactory.getFloat(revenuesAvg);

        balance.NetProfitability = mathFactory.getFloat(netProfitAvg) /
            mathFactory.getFloat(revenuesAvg);

        balance.ProfitabilityBeforeTaxes = (mathFactory.getFloat(profitOnBusinessAvg)
            + mathFactory.getFloat(loanInterstAvg)
            + mathFactory.getFloat(taxesAvg)) /
            mathFactory.getFloat(revenuesAvg);

        balance.CoverageRate = mathFactory.getFloat(netProfitAvg) /
            mathFactory.getFloat(loanInterstAvg);

        balance.ROE = mathFactory.getFloat(netProfitAvg) /
            mathFactory.getFloat(currentBalance.ConsEquity);

        balance.ROA = mathFactory.getFloat(netProfitAvg) /
            mathFactory.getFloat(currentBalance.ConsTotalAssets);

        balance.DebtAssetsRatio = (mathFactory.getFloat(currentBalance.Liabilities.ShortWorkingCapitalCredit.ConsTotal)
            + mathFactory.getFloat(currentBalance.Liabilities.ShortFixedAssetsCredit.ConsTotal)
            + mathFactory.getFloat(currentBalance.Liabilities.LongWorkingCapitalCredit.ConsTotal)
            + mathFactory.getFloat(currentBalance.Liabilities.LongFixedAssetsCredit.ConsTotal)) /
            mathFactory.getFloat(currentBalance.ConsTotalAssets);

        balance.AutonomyCoef = mathFactory.getFloat(currentBalance.ConsEquity) /
            mathFactory.getFloat(currentBalance.ConsTotalAssets);

        balance.TurnoverSpeedCoef =
            mathFactory.getFloat(currentBalance.ConsInventories) /
            mathFactory.getFloat(costOfGoodsAvg) * 30;

        balance.TurnoverInventoryCoef =
            mathFactory.getFloat(costOfGoodsAvg) /
            mathFactory.getFloat(currentBalance.ConsInventories);

        balance.Equity1Coef =
            mathFactory.getFloat(borrowedResources) /
            mathFactory.getFloat(currentBalance.ConsEquity);
    }

    balanceCoefsCalculatorFactory.calculateData = function (currentProject) {
        try {
            angular.forEach(currentProject.FinDataBalance.Balances, function (balance, bKey) {
                angular.forEach(currentProject.FinDataOpiu.Opius, function (opiu, oKey) {
                    if (bKey === oKey) {
                        calculateCoefsData(balance, opiu, currentProject.FinancePlanning.BorrowedResources);
                    }
                });
            });
            calculateConsCoefsData(currentProject.ConsolidatedBalance,
                currentProject.ConsolidatedOpiu.Opiu,
                currentProject.FinancePlanning.BorrowedResources);
        }
        catch (except) {
            console.log(except);
        }
        return currentProject;
    }

    return balanceCoefsCalculatorFactory;

}]);