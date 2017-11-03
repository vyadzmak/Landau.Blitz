blitzApp.factory('oddsCalculatorFactory', ['$rootScope', 'mathFactory', function ($rootScope, mathFactory) {

    var oddsCalculatorFactory = {};

    var sumsValues = [
        {
            TotalName: 'TotalIncome',
            SubValues: [
                'RevenuesIncome',
                'PrepaidIncome',
                'ReturnIncome',
                'OtherIncome'
            ]
        },
        {
            TotalName: 'TotalOutOperationsIncome',
            SubValues: [
                'CreditIncome',
            'SalesIncome',
            'SponsorshipIncome',
            'OtherOutOperationsIncome'
            ]
        },
        {
            TotalName: 'TotalExpensesForBusiness',
            SubValues: [
                'Purchase',
            'Wage',
            'Rent',
            'Storage',
            'Fuels',
            'Waybill',
            'Advertising',
            'Customs',
            'DeliveryOfGoods',
            'Fare',
            'Taxes',
            'Utilities',
            'Security',
            'Hospitality',
            'LoanInterestPayment',
            'MarriageDamageCancellation',
            'BankServices',
            'OtherBusinessExpenses'
            ]
        },
        {
            TotalName: 'TotalExpensesOutBusiness',
            SubValues: [
                'AutoLoanRepayment',
            'LoanRepayment',
            'ExpectedLoanRepayment',
            'FamilyExpenses',
            'InvestmentExpenses',
            'FixedAssetsPurchase',
            'DividendExpenses',
            'AssistanceExpenses',
            'OtherExpenses'
            ]
        },
        {
            TotalName: 'Income',
            SubValues: [
                'TotalIncome',
                'TotalOutOperationsIncome'
            ]
        },
        {
            TotalName: 'Expenses',
            SubValues: [
                'TotalExpensesOutBusiness',
                'TotalExpensesForBusiness'
            ]
        },
        {
            TotalName: 'EndMonth',
            SubValues: [
                'Income',
                'Expenses'
            ]
        }
    ];

    var getVarArrayByName = function (odds, name) {
        var ob = odds.Table.filter(function (item) {
            return item.VarName === name;
        });
        if (ob == undefined || ob.length === 0) return null;
        return ob[0];
    }

    var calculateValues = function (currentProject, startVarSymbol) {
        angular.forEach(sumsValues, function (tSumV, tSumKey) {
            var totalValue = getVarArrayByName(currentProject.FinDataOdds.Odds, tSumV.TotalName);


            angular.forEach(currentProject.FinDataOdds.Odds.Header, function (month, mKey) {
                if (month.VarName[0] === startVarSymbol) {
                    totalValue[month.VarName] = 0;

                    angular.forEach(tSumV.SubValues, function (subValue, sKey) {
                        var sSubValue = getVarArrayByName(currentProject.FinDataOdds.Odds, subValue);
                        totalValue[month.VarName] += mathFactory.getFloat(sSubValue[month.VarName]);
                    });
                    totalValue[month.VarName] = mathFactory.round(totalValue[month.VarName], 2);
                }
            });
        });
    }

    var calculateAvgHistoricalIncome = function (currentProject) {
        var result = 0;
        var totalIncome = getVarArrayByName(currentProject.FinDataOdds.Odds, 'TotalIncome');
        angular.forEach(currentProject.FinDataOdds.Odds.Header, function (month, mKey) {
            if (month.VarName[0] === 'm') {
                result += mathFactory.getFloat(totalIncome[month.VarName]);
            }
        });
        result = result / currentProject.FinDataOdds.Odds.MonthsBefore;
        return result;
    }

    var calculateExpensesForBusinessPercentage = function (currentProject, avgHistoricalIncome) {
        angular.forEach(sumsValues, function (tSumV, tSumKey) {

            if (tSumV.TotalName === 'TotalExpensesForBusiness') {
                angular.forEach(tSumV.SubValues, function (subValue, sKey) {
                    var sSubValue = getVarArrayByName(currentProject.FinDataOdds.Odds, subValue);
                    var totalSubValue = 0;
                    angular.forEach(currentProject.FinDataOdds.Odds.Header, function (month, mKey) {
                        if (month.VarName[0] === 'm') {
                            totalSubValue += mathFactory.getFloat(sSubValue[month.VarName]);
                        }
                    });
                    sSubValue.Prediction = mathFactory.round(totalSubValue / currentProject.FinDataOdds.Odds.MonthsBefore / avgHistoricalIncome * 100, 2);
                });
            }
        });
    }

    var populatingPredictionData = function (currentProject) {
        var totalIncome = getVarArrayByName(currentProject.FinDataOdds.Odds, 'TotalIncome');
        var totalOutOperationsIncome = getVarArrayByName(currentProject.FinDataOdds.Odds, 'TotalOutOperationsIncome');

        angular.forEach(sumsValues, function (tSumV, tSumKey) {
            if (tSumV.TotalName === 'TotalIncome') {
                angular.forEach(tSumV.SubValues, function (subValue, sKey) {
                    var sSubValue = getVarArrayByName(currentProject.FinDataOdds.Odds, subValue);
                    angular.forEach(currentProject.FinDataOdds.Odds.Header, function (month, mKey) {
                        if (month.VarName[0] === 'M') {
                            sSubValue[month.VarName] = mathFactory.getFloat(totalIncome.Prediction) * sSubValue.Prediction / 100;
                            sSubValue[month.VarName] = mathFactory.round(sSubValue[month.VarName], 2);
                        }
                    });
                });
            }
            if (tSumV.TotalName === 'TotalOutOperationsIncome') {
                angular.forEach(tSumV.SubValues, function (subValue, sKey) {
                    var sSubValue = getVarArrayByName(currentProject.FinDataOdds.Odds, subValue);
                    angular.forEach(currentProject.FinDataOdds.Odds.Header, function (month, mKey) {
                        if (month.VarName[0] === 'M') {
                            sSubValue[month.VarName] = mathFactory.getFloat(totalOutOperationsIncome.Prediction) * sSubValue.Prediction / 100;
                            sSubValue[month.VarName] = mathFactory.round(sSubValue[month.VarName], 2);
                        }
                    });
                });
            }
            if (tSumV.TotalName === 'TotalExpensesForBusiness') {
                angular.forEach(tSumV.SubValues, function (subValue, sKey) {
                    var sSubValue = getVarArrayByName(currentProject.FinDataOdds.Odds, subValue);
                    angular.forEach(currentProject.FinDataOdds.Odds.Header, function (month, mKey) {
                        if (month.VarName[0] === 'M') {
                            sSubValue[month.VarName] = mathFactory.getFloat(totalIncome.Prediction) * sSubValue.Prediction / 100;
                            sSubValue[month.VarName] = mathFactory.round(sSubValue[month.VarName], 2);
                        }
                    });
                });
            }
        });
    }

    oddsCalculatorFactory.calculateData = function (currentProject) {

        // calculate historical values
        calculateValues(currentProject, 'm');

        var avgHistoricalIncome = calculateAvgHistoricalIncome(currentProject);

        calculateExpensesForBusinessPercentage(currentProject, avgHistoricalIncome);

        populatingPredictionData(currentProject);

        calculateValues(currentProject, 'M');

        // calculate startPeriod and endPeriod values
        var startPeriod = getVarArrayByName(currentProject.FinDataOdds.Odds, 'StartPeriod');
        var endPeriod = getVarArrayByName(currentProject.FinDataOdds.Odds, 'EndPeriod');
        var endMonth = getVarArrayByName(currentProject.FinDataOdds.Odds, 'EndMonth');
        var currentBalance = currentProject.ConsolidatedBalance
            .CompanyBalances[currentProject.ConsolidatedBalance.CompanyBalances.length - 1];
        var consLiquidAssetsWoDepoit = mathFactory.getFloat(currentBalance.Assets.Checkout.ConsTotal) +
            mathFactory.getFloat(currentBalance.Assets.Savings.ConsTotal) +
            mathFactory.getFloat(currentBalance.Assets.CurrentAccount.ConsTotal);
        startPeriod.M0 = mathFactory.round(consLiquidAssetsWoDepoit,2);
        endPeriod.m0 = startPeriod.M0;
        startPeriod.m0 = mathFactory.round(endPeriod.m0 + mathFactory.getFloat(endMonth.m0),2);
        for (let i = 1; i <= currentProject.FinDataOdds.Odds.MonthsBefore; i++) {
            endPeriod['m' + i] = startPeriod['m' + (i - 1)];
            startPeriod['m' + i] = endPeriod['m' + i] + mathFactory.getFloat(endMonth['m' + i]);
            startPeriod['m' + i] = mathFactory.round(startPeriod['m' + i], 2);
        }
        endPeriod.M0 = startPeriod.M0 + mathFactory.getFloat(endMonth.M0);
        endPeriod.M0 = mathFactory.round(endPeriod.M0, 2);
        for (let i = 1; i <= currentProject.FinDataOdds.Odds.MonthsAfter; i++) {
            startPeriod['M' + i] = endPeriod['M' + (i - 1)];
            endPeriod['M' + i] = startPeriod['M' + i] + mathFactory.getFloat(endMonth['M' + i]);
            endPeriod['M' + i] = mathFactory.round(endPeriod['M' + i], 2);
        }
        return currentProject;
    }

    return oddsCalculatorFactory;

}]);