blitzApp.factory('opiuCalculatorFactory', ['$rootScope', 'mathFactory', function ($rootScope, mathFactory) {
    var opiuCalculatorFactory = {};
    var expenses = [
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
        'LoanInterest',
        'MarriageDamageCancellation',
        'BankServices',
        'OtherBusinessExpenses'
    ];
    var additionalPayments = [
        'StandardAddPayment',
        'InvestmentAddPayment',
        'TurnoverAddPayment'
    ];


    var calculateSubRowTotals = function (rows, months) {
        if (months && months.length > 0) {
            angular.forEach(months, function (month, mkey) {
                angular.forEach(rows, function (row, rkey) {
                    if (row.Rows) {
                        row['M' + month.Id] = 0;
                        row['AvgPrediction'] = 0;
                        angular.forEach(row.Rows, function (subRow, skey) {
                            row['M' + month.Id] += mathFactory.getFloat(subRow['M' + month.Id]);
                            row['AvgPrediction'] += mathFactory.getFloat(subRow['AvgPrediction']);
                        });
                    }
                });
            });
        } else { 
            angular.forEach(rows, function (row, rkey) {
                if (row.Rows) {
                    row['AvgPrediction'] = 0;
                    angular.forEach(row.Rows, function (subRow, skey) {
                        row['AvgPrediction'] += mathFactory.getFloat(subRow['AvgPrediction']);
                    });
                }
            });
        }
    }

    var calculateAverageValue = function (row, months) {
        var totalByMonths = 0;
        for (var i = 1; i <= months; i++) {
            totalByMonths += mathFactory.getFloat(row['M' + i]);
        }
        row.Avg = mathFactory.round((totalByMonths / months), 2);
    }

    var calculateMargin = function (margin, costOfGoods, revenues, marginCalcType, varName) {
        if (marginCalcType === 3) {
            margin[varName] = null;
            costOfGoods[varName] = null;
        } else if (marginCalcType === 1 || marginCalcType === 2) {
            margin[varName] = 100 * (mathFactory.getFloat(revenues[varName]) / mathFactory.getFloat(costOfGoods[varName]) - 1);
            margin[varName] = mathFactory.round(margin[varName], 2);
        } if (marginCalcType === 4 || marginCalcType === 5 || marginCalcType === 6) {
            costOfGoods[varName] = mathFactory.getFloat(revenues[varName]) / (100 + mathFactory.getFloat(margin[varName])) * 100;
            costOfGoods[varName] = mathFactory.round(costOfGoods[varName], 2);
        }
    }

    var calculateValues = function (totalExpenses, revenues, costOfGoods, grossProfit, profitOnBusiness, otherIncome,
                otherExpenses, netProfit, loanPayment, netLoanBalance, varName) {
        grossProfit[varName] = mathFactory.getFloat(revenues[varName]) - mathFactory.getFloat(costOfGoods[varName]);
        profitOnBusiness[varName] = mathFactory.getFloat(grossProfit[varName]) - mathFactory.getFloat(totalExpenses[varName]);
        netProfit[varName] = mathFactory.getFloat(profitOnBusiness[varName]) + mathFactory.getFloat(otherIncome[varName]) - mathFactory.getFloat(otherExpenses[varName]);
        netLoanBalance[varName] = mathFactory.getFloat(netProfit[varName]) - mathFactory.getFloat(loanPayment[varName]);

        grossProfit[varName] = mathFactory.round(grossProfit[varName], 2);
        profitOnBusiness[varName] = mathFactory.round(profitOnBusiness[varName], 2);
        netProfit[varName] = mathFactory.round(netProfit[varName], 2);
        netLoanBalance[varName] = mathFactory.round(netLoanBalance[varName], 2);
    }
    var calculateLoanContributionDetails = function (loan) {
        loan.TotalPrincipal = 0;
        loan.TotalFee = 0;
        loan.TotalForOpiu = 0;
        angular.forEach(loan.Rows, function (item, itemKey) {
            loan.TotalPrincipal += mathFactory.getFloat(item.Principal);
            loan.TotalFee += mathFactory.getFloat(item.Fee);
            if (item.IsPrincipal) {
                item.ForOpiu = mathFactory.getFloat(item.Principal) + mathFactory.getFloat(item.Fee);
            } else {
                item.ForOpiu = mathFactory.getFloat(item.Fee);
            }
            loan.TotalForOpiu += item.ForOpiu;
        });
        return loan;
    }

    var calculateRelatedCompanyRevenues = function (opiu) {
        opiu.TotalRealtedCompanyRevenue.Avg = 0;

        angular.forEach(opiu.RelatedCompanyRevenues, function (revenue, rKey) {
            var total = 0;
            angular.forEach(opiu.Months, function (month, mKey) {
                opiu.TotalRealtedCompanyRevenue['M' + month.Id] += mathFactory.getFloat(revenue['M' + month.Id]);
                total += mathFactory.getFloat(revenue['M' + month.Id]);
            });
            revenue.Avg = total / opiu.Months.length;
            opiu.TotalRealtedCompanyRevenue.Avg += revenue.Avg;
        });
        return opiu;
    }

    var calculateOpiu = function (opiu) {
        // finding variables
        var margin,
            revenues,
            costOfGoods,
            grossProfit,
            profitOnBusiness,
            otherIncome,
            otherExpenses,
            netProfit,
            loanPayment,
            netLoanBalance,
            totalExpenses,
            totalAddPayments;

        angular.forEach(opiu.Table, function (tRow, rKey) {
            switch (tRow.VarName) {
                case "CostOfGoods": costOfGoods = tRow; break;
                case "Revenues": revenues = tRow; break;
                case "Margin": margin = tRow; break;
                case "GrossProfit": grossProfit = tRow; break;
                case "ProfitOnBusiness": profitOnBusiness = tRow; break;
                case "OtherIncome": otherIncome = tRow; break;
                case "OtherExpenses": otherExpenses = tRow; break;
                case "NetProfit": netProfit = tRow; break;
                case "LoanPayment": loanPayment = tRow; break;
                case "NetLoanBalance": netLoanBalance = tRow; break;
                case "TotalExpensesForBusiness": totalExpenses = tRow; break;
                case "AdditionalPayment": totalAddPayments = tRow; break;
            }
        });

        angular.forEach(opiu.Months, function (month, mKey) {
            if (margin.Rows && margin.Rows.length > 0) {
                angular.forEach(margin.Rows, function (subRow, skey) {
                    angular.forEach(month.Rows, function (rvalue, rkey) {
                        if (rvalue.Id === subRow.Id) {
                            calculateMargin(subRow, costOfGoods.Rows[skey], revenues.Rows[skey], rvalue.MarginCalcType, 'M' + month.Id);
                        }
                    });
                });
            }
            totalExpenses['M' + month.Id] = 0;
            totalAddPayments['M' + month.Id] = 0;
            // make 0 related company revenues totals
            opiu.TotalRealtedCompanyRevenue['M' + month.Id] = 0;
        });

        totalExpenses['Avg'] = 0;
        totalAddPayments['Avg'] = 0;
        totalExpenses['AvgPrediction'] = 0;
        totalAddPayments['AvgPrediction'] = 0;
        // calculating totals for the table rows that have subRows
        calculateSubRowTotals(opiu.Table, opiu.Months);

        // calculating totalExpenses and total addPayments
        angular.forEach(opiu.Table, function (tRow, rKey) {
            if (!tRow.Calculate && expenses.indexOf(tRow.VarName) !== -1) {
                angular.forEach(opiu.Months, function (month, mKey) {
                    totalExpenses['M' + month.Id] += mathFactory.getFloat(tRow['M' + month.Id]);
                });
                totalExpenses['AvgPrediction'] += mathFactory.getFloat(tRow['AvgPrediction']);
            }
            else if (!tRow.Calculate && additionalPayments.indexOf(tRow.VarName) !== -1) {
                angular.forEach(opiu.Months, function (month, mKey) {
                    totalAddPayments['M' + month.Id] += mathFactory.getFloat(tRow['M' + month.Id]);
                });
                totalAddPayments['AvgPrediction'] += mathFactory.getFloat(tRow['AvgPrediction']);
            }
        });

        // calculate values
        angular.forEach(opiu.Months, function (month, mKey) {
            calculateMargin(margin, costOfGoods, revenues, month.MarginCalcType, 'M' + month.Id);

            calculateValues(totalExpenses, revenues, costOfGoods, grossProfit, profitOnBusiness, otherIncome,
                otherExpenses, netProfit, loanPayment, netLoanBalance, 'M' + month.Id);
        });

        calculateMargin(margin, costOfGoods, revenues, costOfGoods['AvgPrediction'] ? 1 : 4, 'AvgPrediction');

        calculateValues(totalExpenses, revenues, costOfGoods, grossProfit, profitOnBusiness, otherIncome,
            otherExpenses, netProfit, loanPayment, netLoanBalance, 'AvgPrediction');

        //calculate average for all rows
        angular.forEach(opiu.Table, function (tRow, rKey) {
            if (tRow.VarName !== 'LoanPayment') {
                calculateAverageValue(tRow, opiu.Months.length);
                if (tRow.Rows && tRow.Rows.length > 0) {
                    angular.forEach(tRow.Rows, function (subRow, sKey) {
                        calculateAverageValue(subRow, opiu.Months.length);
                    });
                }
            }
        });

        netLoanBalance.Avg = mathFactory.round((mathFactory.getFloat(netProfit.Avg) - mathFactory.getFloat(loanPayment.Avg)), 2);

        return opiu;
    }

    opiuCalculatorFactory.calculateData = function (currentProject, opiu) {
        try {
            if (!currentProject.FinDataOpiu.Opius || currentProject.FinDataOpiu.Opius.length === 0) {
                return currentProject;
            }

            opiu = calculateOpiu(opiu);

            opiu.LoanContributionDetails = calculateLoanContributionDetails(opiu.LoanContributionDetails);
            opiu = calculateRelatedCompanyRevenues(opiu);
        } catch (except) {
            console.log(except);
        }
        return currentProject;
    };

    opiuCalculatorFactory.calculateConsolidatedData = function (currentProject) {
        try {
            var maxMonthsIndex = 0;
            var maxMonths = 0;
            for (var i = 0; i < currentProject.FinDataOpiu.Opius.length; i++) {
                if (maxMonths < currentProject.FinDataOpiu.Opius[i].Months.length) {
                    maxMonths = currentProject.FinDataOpiu.Opius[i].Months.length;
                    maxMonthsIndex = i;
                }
            }
            currentProject.ConsolidatedOpiu.Opiu = angular.copy(currentProject.FinDataOpiu.Opius[maxMonthsIndex]);

            // make all data as numbers and consolidate this opiu, which is main
            angular.forEach(currentProject.ConsolidatedOpiu.Opiu.Table, function (row, rKey) {
                row.Avg = mathFactory.getFloat(row.Avg);
                row.AvgPrediction = mathFactory.getFloat(row.AvgPrediction);
                angular.forEach(currentProject.ConsolidatedOpiu.Opiu.Months, function (month, mKey) {
                    row['M' + month.Id] = mathFactory.getFloat(row['M' + month.Id]);
                    if (row.VarName === 'Revenues' || row.VarName === 'CostOfGoods') {
                        row['M' + month.Id] -= mathFactory.getFloat(currentProject.ConsolidatedOpiu.Opiu.TotalRealtedCompanyRevenue['M' + month.Id]);
                    }
                });
            });

            // consolidating all other opius and simply adding cells
            angular.forEach(currentProject.FinDataOpiu.Opius, function (opiu, oKey) {
                if (oKey !== maxMonthsIndex) {
                    var monthsDiff = maxMonths - opiu.Months.length;
                    angular.forEach(opiu.Table, function (row, rKey) {
                        angular.forEach(opiu.Months, function (month, mKey) {
                            if (row.VarName === 'Revenues' || row.VarName === 'CostOfGoods') {
                                var consOpiuRev = mathFactory.getFloat(row['M' + month.Id]) -
                                    mathFactory.getFloat(opiu.TotalRealtedCompanyRevenue['M' + month.Id]);
                                currentProject.ConsolidatedOpiu.Opiu
                                    .Table[rKey]['M' + (month.Id + monthsDiff)] += consOpiuRev;
                            } else {
                                currentProject.ConsolidatedOpiu.Opiu
                                    .Table[rKey]['M' + (month.Id + monthsDiff)] += mathFactory.getFloat(row['M' + month.Id]);
                            }
                        });
                        currentProject.ConsolidatedOpiu.Opiu
                                    .Table[rKey].AvgPrediction += mathFactory.getFloat(row.AvgPrediction);
                    });
                }
            });

            //counting refined opiu 
            currentProject.ConsolidatedOpiu.Opiu = calculateOpiu(currentProject.ConsolidatedOpiu.Opiu);
        } catch (except) {
            console.log(except);
        }
        return currentProject;
    }

    return opiuCalculatorFactory;

}]);