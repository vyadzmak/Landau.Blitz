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
        'MarriageDamageCancellation',
        'BankServices',
        'OtherBusinessExpenses'
    ];
    var additionalPayments = [
        'StandardAddPayment',
        'InvestmentAddPayment',
        'TurnoverAddPayment'
    ];


    var getVarArrayByName = function (opiu, name) {
        var ob = opiu.Table.filter(function (item) {
            return item.VarName == name;
        });
        if (ob == undefined || ob.length === 0) return null;
        return ob[0];
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

    var calculateOpiu = function(opiu) {
        var totalExpenses = getVarArrayByName(opiu, "TotalExpensesForBusiness");
        var totalAddPayments = getVarArrayByName(opiu, "AdditionalPayment");
        angular.forEach(opiu.Months, function (month, mKey) {
            totalExpenses['M' + month.Id] = 0;
            totalAddPayments['M' + month.Id] = 0;
            // make 0 related company revenues totals
            opiu.TotalRealtedCompanyRevenue['M' + month.Id] = 0;
        });
        var margin,
            revenues,
            costOfGoods,
            grossProfit,
            profitOnBusiness,
            otherIncome,
            otherExpenses,
            netProfit,
            loanPayment,
            netLoanBalance;

        // calculating totalExpenses and total addPayments
        angular.forEach(opiu.Table, function (tRow, rKey) {
            if (!tRow.Calculate && expenses.indexOf(tRow.VarName) !== -1) {
                angular.forEach(opiu.Months, function (month, mKey) {
                    totalExpenses['M' + month.Id] += mathFactory.getFloat(tRow['M' + month.Id]);
                });
            }
            else if (!tRow.Calculate && additionalPayments.indexOf(tRow.VarName) !== -1) {
                angular.forEach(opiu.Months, function (month, mKey) {
                    totalAddPayments['M' + month.Id] += mathFactory.getFloat(tRow['M' + month.Id]);
                });
            } else {
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
                }
            }
        });
        // calculate values
        angular.forEach(opiu.Table, function (tRow, rKey) {
            angular.forEach(opiu.Months, function (month, mKey) {
                margin['M' + month.Id] = mathFactory.getFloat(revenues['M' + month.Id]) / mathFactory.getFloat(costOfGoods['M' + month.Id]) - 1;
                grossProfit['M' + month.Id] = mathFactory.getFloat(revenues['M' + month.Id]) - mathFactory.getFloat(costOfGoods['M' + month.Id]);
                profitOnBusiness['M' + month.Id] = mathFactory.getFloat(grossProfit['M' + month.Id]) - mathFactory.getFloat(totalExpenses['M' + month.Id]);
                netProfit['M' + month.Id] = mathFactory.getFloat(profitOnBusiness['M' + month.Id]) + mathFactory.getFloat(otherIncome['M' + month.Id]) - mathFactory.getFloat(otherExpenses['M' + month.Id]);
                netLoanBalance['M' + month.Id] = mathFactory.getFloat(netProfit['M' + month.Id]) - mathFactory.getFloat(loanPayment['M' + month.Id]);

                margin['M' + month.Id] = margin['M' + month.Id].toFixed(2);
                grossProfit['M' + month.Id] = grossProfit['M' + month.Id].toFixed(2);
                profitOnBusiness['M' + month.Id] = profitOnBusiness['M' + month.Id].toFixed(2);
                netProfit['M' + month.Id] = netProfit['M' + month.Id].toFixed(2);
                netLoanBalance['M' + month.Id] = netLoanBalance['M' + month.Id].toFixed(2);
            });
        });

        //calculate average for all rows
        angular.forEach(opiu.Table, function (tRow, rKey) {
            if (tRow.VarName !== 'LoanPayment') {
                var totalByMonths = 0;
                angular.forEach(opiu.Months, function (month, mKey) {
                    totalByMonths += mathFactory.getFloat(tRow['M' + month.Id]);
                });
                tRow.Avg = (totalByMonths / opiu.Months.length).toFixed(2);
            }
        });
        netLoanBalance.Avg = (mathFactory.getFloat(netProfit.Avg) - mathFactory.getFloat(loanPayment.Avg)).toFixed(2);
        return opiu;
    }

    opiuCalculatorFactory.calculateData = function (currentProject, opiu) {


        opiu = calculateOpiu(opiu);

        opiu.LoanContributionDetails = calculateLoanContributionDetails(opiu.LoanContributionDetails);
        opiu = calculateRelatedCompanyRevenues(opiu);

        return currentProject;
    };

    opiuCalculatorFactory.calculateConsolidatedData = function (currentProject) {
        var maxMonthsIndex = -1;
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
            row.AvgPrognose = mathFactory.getFloat(row.AvgPrognose);
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
                                .Table[rKey].AvgPrognose += mathFactory.getFloat(row.AvgPrognose);
                });
            }
        });

        //counting refined opiu 
        currentProject.ConsolidatedOpiu.Opiu = calculateOpiu(currentProject.ConsolidatedOpiu.Opiu);

        return currentProject;
    }

    return opiuCalculatorFactory;

}]);