blitzApp.factory('opiuCalculatorFactory', ['$rootScope', function($rootScope) {
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
        'LoanInterestPayment',
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

    opiuCalculatorFactory.calculateData = function (currentProject, opiu) {


        var totalExpenses = getVarArrayByName(opiu, "TotalExpensesForBusiness");
        var totalAddPayments = getVarArrayByName(opiu, "AdditionalPayment");
        angular.forEach(opiu.Months, function (month, mKey) {
            totalExpenses['M' + month.Id] = 0;
            totalAddPayments['M' + month.Id] = 0;
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
                    totalExpenses['M' + month.Id] += +tRow['M' + month.Id];
                });
            }
            else if (!tRow.Calculate && additionalPayments.indexOf(tRow.VarName) !== -1) {
                angular.forEach(opiu.Months, function (month, mKey) {
                    totalAddPayments['M' + month.Id] += +tRow['M' + month.Id];
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
                margin['M' + month.Id] = +revenues['M' + month.Id] / +costOfGoods['M' + month.Id] - 1;
                grossProfit['M' + month.Id] = +revenues['M' + month.Id] - +costOfGoods['M' + month.Id];
                profitOnBusiness['M' + month.Id] = +grossProfit['M' + month.Id] - +totalExpenses['M' + month.Id];
                netProfit['M' + month.Id] = +profitOnBusiness['M' + month.Id] + +otherIncome['M' + month.Id] - +otherExpenses['M' + month.Id];
                netLoanBalance['M' + month.Id] = +netProfit['M' + month.Id] - +loanPayment['M' + month.Id];

                margin['M' + month.Id] = margin['M' + month.Id].toFixed(2);
                grossProfit['M' + month.Id] = grossProfit['M' + month.Id].toFixed(2);
                profitOnBusiness['M' + month.Id] = profitOnBusiness['M' + month.Id].toFixed(2);
                netProfit['M' + month.Id] = netProfit['M' + month.Id].toFixed(2);
                netLoanBalance['M' + month.Id] = netLoanBalance['M' + month.Id].toFixed(2);
            });
        });

        //calculate average for all rows
        angular.forEach(opiu.Table, function (tRow, rKey) {
            var totalByMonths = 0;
            angular.forEach(opiu.Months, function (month, mKey) {
                totalByMonths += +tRow['M' + month.Id];
            });
            tRow.Avg = totalByMonths / opiu.Months.length;
        });

        return currentProject;
    };
    
    return opiuCalculatorFactory;

}]);