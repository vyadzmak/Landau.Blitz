blitzApp.factory('balanceCoefsCalculatorFactory', ['$rootScope', 'mathFactory', function ($rootScope, mathFactory) {
    var balanceCoefsCalculatorFactory = {};

    var getVarArrayByName = function (opiu, name) {
        var ob = opiu.Table.filter(function (item) {
            return item.VarName == name;
        });
        if (ob == undefined || ob.length === 0) return null;
        return ob[0];
    }

    var calculateCoefsData = function(balance, opiu, borrowedResources) {
        var currentBalance = balance.CompanyBalances[balance.CompanyBalances.length - 1];
        var costOfGoodsAvg = getVarArrayByName(opiu, 'CostOfGoods').Avg;
        balance.CurrentLiquidityCoef =
            mathFactory.getFloat(currentBalance.TotalCurrentAssets) /
            mathFactory.getFloat(currentBalance.TotalShortTermDebt);
        balance.TurnoverSpeedCoef =
            mathFactory.getFloat(currentBalance.Inventories) /
            mathFactory.getFloat(costOfGoodsAvg) * 30;
        balance.TurnoverInventoryCoef =
            mathFactory.getFloat(costOfGoodsAvg) /
            mathFactory.getFloat(currentBalance.Inventories);
        balance.AutonomyCoef =
            mathFactory.getFloat(currentBalance.Equity) /
            mathFactory.getFloat(currentBalance.TotalLiabilities);
        balance.Equity1Coef =
            mathFactory.getFloat(borrowedResources) /
            mathFactory.getFloat(currentBalance.Equity);
    }

    balanceCoefsCalculatorFactory.calculateData = function (currentProject) {
        try {
            angular.forEach(currentProject.FinDataBalance.Balances, function(balance, bKey) {
                angular.forEach(currentProject.FinDataOpiu.Opius, function(opiu, oKey) {
                    if (bKey === oKey) {
                        calculateCoefsData(balance, opiu, currentProject.FinancePlanning.BorrowedResources);
                    }
                });
            });
            calculateCoefsData(currentProject.ConsolidatedBalance,
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