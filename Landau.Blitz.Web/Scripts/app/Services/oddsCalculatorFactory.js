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
    
    oddsCalculatorFactory.calculateData = function(currentProject) {

        // calculate values
        angular.forEach(sumsValues, function (tSumV, tSumKey) {
            var totalValue = getVarArrayByName(currentProject.FinDataOdds.Odds, tSumV.TotalName);


            angular.forEach(currentProject.FinDataOdds.Odds.Header, function (month, mKey) {
                totalValue[month.VarName] = 0;
                angular.forEach(tSumV.SubValues, function (subValue, sKey) {
                    var sSubValue = getVarArrayByName(currentProject.FinDataOdds.Odds, subValue);
                    totalValue[month.VarName] += mathFactory.getFloat(sSubValue[month.VarName]);
                });
            });
        });

        // calculate startPeriod and endPeriod values
        var startPeriod = getVarArrayByName(currentProject.FinDataOdds.Odds, 'StartPeriod');
        var endPeriod = getVarArrayByName(currentProject.FinDataOdds.Odds, 'EndPeriod');
        var endMonth = getVarArrayByName(currentProject.FinDataOdds.Odds, 'EndMonth');
        var currentBalance = currentProject.ConsolidatedBalance
            .CompanyBalances[currentProject.ConsolidatedBalance.CompanyBalances.length - 1];
        startPeriod.M0 = mathFactory.getFloat(currentBalance.ConsLiquidAssetsWoDeposit);
        endPeriod.m0 = startPeriod.M0;
        startPeriod.m0 = endPeriod.m0 + mathFactory.getFloat(endMonth.m0);
        for (let i = 1; i <= currentProject.FinDataOdds.Odds.MonthsBefore; i++) {
            endPeriod['m' + i] = startPeriod['m' + (i - 1)];
            startPeriod['m' + i] = endPeriod['m' + i] + mathFactory.getFloat(endMonth['m' + i]);
        }
        endPeriod.M0 = startPeriod.M0 + mathFactory.getFloat(endMonth.M0);
        for (let i = 1; i <= currentProject.FinDataOdds.Odds.MonthsAfter; i++) {
            startPeriod['M' + i] = endPeriod['M' + (i - 1)];
            endPeriod['M' + i] = startPeriod['M' + i] + mathFactory.getFloat(endMonth['M' + i]);
        }
        return currentProject;
    }

    return oddsCalculatorFactory;

}]);