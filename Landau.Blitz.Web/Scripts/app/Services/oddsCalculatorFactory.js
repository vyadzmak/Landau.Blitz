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
        }
        //,
        //{
        //    TotalName: 'EndMonth',
        //    SubValues: [
        //        'Income',
        //        'Expenses'
        //    ]
        //}
    ];

    var getVarArrayByName = function (odds, name) {
        var ob = odds.Table.filter(function (item) {
            return item.VarName === name;
        });
        if (ob == undefined || ob.length === 0) return null;
        return ob[0];
    }

    var calculateSubrows = function (rows, varName) {
        angular.forEach(rows, function (row, rKey) {
            if (row.Rows && row.Rows.length > 0) {
                row[varName] = 0;
                angular.forEach(row.Rows, function (subRow, sKey) {
                    row[varName] += mathFactory.getFloat(subRow[varName]);
                });
                row[varName] = mathFactory.round(row[varName], 2);
            }
        });
    }

    var calculatePredictionValues = function (odds) {
        angular.forEach(sumsValues, function (tSumV, tSumKey) {
            if (tSumV.TotalName === 'TotalIncome' || tSumV.TotalName === 'TotalOutOperationsIncome') {
                angular.forEach(tSumV.SubValues, function (subValue, sKey) {
                    var sSubValue = getVarArrayByName(odds, subValue);
                    if (sSubValue.Rows && sSubValue.Rows.length > 0) {
                        sSubValue.Prediction = 0;
                        angular.forEach(sSubValue.Rows, function (subRow, sKey) {
                            sSubValue.Prediction += mathFactory.getFloat(subRow.Prediction);
                        });
                        sSubValue.Prediction = mathFactory.round(sSubValue.Prediction, 2);
                    }
                });
            } else if (tSumV.TotalName === 'TotalExpensesForBusiness' || tSumV.TotalName === 'TotalExpensesOutBusiness') {

                var totalValue = getVarArrayByName(odds, tSumV.TotalName);
                totalValue.Prediction = 0;
                angular.forEach(tSumV.SubValues, function (subValue, sKey) {
                    var sSubValue = getVarArrayByName(odds, subValue);
                    if (sSubValue.Rows && sSubValue.Rows.length > 0) {
                        sSubValue.Prediction = 0;
                        angular.forEach(sSubValue.Rows, function (subRow, sKey) {
                            sSubValue.Prediction += mathFactory.getFloat(subRow.Prediction);
                        });
                        sSubValue.Prediction = mathFactory.round(sSubValue.Prediction, 2);
                    }
                    totalValue.Prediction += mathFactory.getFloat(sSubValue.Prediction);
                });
            } else if (tSumV.TotalName === 'Income') {

                var totalValue = getVarArrayByName(odds, tSumV.TotalName);
                totalValue.Prediction = 0;
                angular.forEach(tSumV.SubValues, function (subValue, sKey) {
                    var sSubValue = getVarArrayByName(odds, subValue);
                    totalValue.Prediction += mathFactory.getFloat(sSubValue.Prediction);
                });
            }
        });
    }

    var calculateValues = function (currentProject, startVarSymbol) {
        angular.forEach(currentProject.FinDataOdds.Odds.Header, function (month, mKey) {
            if (month.VarName.indexOf(startVarSymbol) === 0) {
                // calculate subrows
                calculateSubrows(currentProject.FinDataOdds.Odds.Table, month.VarName);
                // calculate sums
                angular.forEach(sumsValues, function (tSumV, tSumKey) {
                    var totalValue = getVarArrayByName(currentProject.FinDataOdds.Odds, tSumV.TotalName);
                    totalValue[month.VarName] = 0;

                    angular.forEach(tSumV.SubValues, function (subValue, sKey) {
                        var sSubValue = getVarArrayByName(currentProject.FinDataOdds.Odds, subValue);
                        totalValue[month.VarName] += mathFactory.getFloat(sSubValue[month.VarName]);
                    });
                    totalValue[month.VarName] = mathFactory.round(totalValue[month.VarName], 2);
                });
                var endMonth = getVarArrayByName(currentProject.FinDataOdds.Odds, 'EndMonth');
                var income = getVarArrayByName(currentProject.FinDataOdds.Odds, 'Income');
                var expenses = getVarArrayByName(currentProject.FinDataOdds.Odds, 'Expenses');
                endMonth[month.VarName] = mathFactory.getFloat(income[month.VarName]) - mathFactory.getFloat(expenses[month.VarName]);
                endMonth[month.VarName] = mathFactory.round(endMonth[month.VarName], 2);
            }
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
        var balanceDate = moment(currentProject.FinDataBalance.CurrentFinAnalysisDate);
        var monthsQuantity = currentProject.FinDataOdds.Odds.MonthsBefore +
            balanceDate.date() / balanceDate.daysInMonth();
        result = result / monthsQuantity;
        return mathFactory.round(result,2);
    }

    var expensesRowPercentage = function (row, avgHistoricalIncome, months, monthsBefore) {
        var totalSubValue = 0;
        angular.forEach(months, function (month, mKey) {
            if (month.VarName[0] === 'm') {
                totalSubValue += mathFactory.getFloat(row[month.VarName]);
            }
        });
        row.Prediction = mathFactory.round(totalSubValue / monthsBefore / avgHistoricalIncome * 100, 2);
    }

    var calculateExpensesForBusinessPercentage = function (currentProject, avgHistoricalIncome) {
        angular.forEach(sumsValues, function (tSumV, tSumKey) {

            if (tSumV.TotalName === 'TotalExpensesForBusiness') {
                angular.forEach(tSumV.SubValues, function (subValue, sKey) {
                    var sSubValue = getVarArrayByName(currentProject.FinDataOdds.Odds, subValue);
                    if (sSubValue.Rows && sSubValue.Rows.length > 0) {
                        angular.forEach(sSubValue.Rows, function(subRow, subRowKey) {
                            expensesRowPercentage(subRow, avgHistoricalIncome, currentProject.FinDataOdds.Odds.Header, currentProject.FinDataOdds.Odds.MonthsBefore);
                        });
                    }
                    expensesRowPercentage(sSubValue, avgHistoricalIncome, currentProject.FinDataOdds.Odds.Header, currentProject.FinDataOdds.Odds.MonthsBefore);
                });
            }
        });
    }

    var populateSubrows = function(subRows, prediciton, varName) {
        if (subRows && subRows.length > 0) {
            angular.forEach(subRows, function (subRow, subRowKey) {
                subRow[varName] = mathFactory.getFloat(prediciton) * subRow.Prediction / 100;
                subRow[varName] = mathFactory.round(subRow[varName], 2);
            });
        }
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
                            // populating subrows
                            populateSubrows(sSubValue.Rows, totalIncome.Prediction, month.VarName);
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
                            // populating subrows
                            populateSubrows(sSubValue.Rows, totalIncome.Prediction, month.VarName);
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
                            // populating subrows
                            populateSubrows(sSubValue.Rows, totalIncome.Prediction, month.VarName);
                            sSubValue[month.VarName] = mathFactory.getFloat(totalIncome.Prediction) * sSubValue.Prediction / 100;
                            sSubValue[month.VarName] = mathFactory.round(sSubValue[month.VarName], 2);
                        }
                    });
                });
            }
        });
    }

    oddsCalculatorFactory.calculateData = function (currentProject) {
        try {
            if (!currentProject.FinDataOdds.Odds || !currentProject.FinDataOdds.Odds.Header || !currentProject.FinDataOdds.Odds.Table) {
                return currentProject;
            }
            // calculate historical values
            calculateValues(currentProject, 'm');

            var avgHistoricalIncome = calculateAvgHistoricalIncome(currentProject);

            calculateExpensesForBusinessPercentage(currentProject, avgHistoricalIncome);

            calculatePredictionValues(currentProject.FinDataOdds.Odds);

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
            startPeriod.M0 = mathFactory.round(consLiquidAssetsWoDepoit, 2);
            startPeriod.Prediction = startPeriod.M0;
            endPeriod.m0 = startPeriod.M0;
            startPeriod.m0 = mathFactory.round(endPeriod.m0 - mathFactory.getFloat(endMonth.m0), 2);
            for (let i = 1; i <= currentProject.FinDataOdds.Odds.MonthsBefore; i++) {
                endPeriod['m' + i] = startPeriod['m' + (i - 1)];
                startPeriod['m' + i] = endPeriod['m' + i] - mathFactory.getFloat(endMonth['m' + i]);
                startPeriod['m' + i] = mathFactory.round(startPeriod['m' + i], 2);
            }
            endPeriod.M0 = startPeriod.M0 + mathFactory.getFloat(endMonth.M0);
            endPeriod.M0 = mathFactory.round(endPeriod.M0, 2);
            for (let i = 1; i <= currentProject.FinDataOdds.Odds.MonthsAfter; i++) {
                startPeriod['M' + i] = endPeriod['M' + (i - 1)];
                endPeriod['M' + i] = startPeriod['M' + i] + mathFactory.getFloat(endMonth['M' + i]);
                endPeriod['M' + i] = mathFactory.round(endPeriod['M' + i], 2);
            }
        } catch (except) {
            console.log(except);
        }
        return currentProject;
    }

    return oddsCalculatorFactory;

}]);