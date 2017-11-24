blitzApp.factory('balanceTableFactory', ['$rootScope', 'balanceCalculatorFactory', function ($rootScope, balanceCalculatorFactory) {
    var balanceTableFactory = {};

    function initAssets() {
        var assets = {};
        var assetsNames = [
            'Checkout',
            'CurrentAccount',
            'Savings',
            'Deposit',
            'Recievables',
            //'RecievableAccounts', changed this with Recievables
            //'TransitGoods',
            //'SuppliersPrepayment',
            'OtherRecievables',
            'Inventories',
            //'FinishedGoods',
            //'RawMaterials',
            //'SemiProducts',
            //'ForSaleGoods',
            'Hardware',
            'MotorTransport',
            'RealEstate',
            'Investments'
        ];

        angular.forEach(assetsNames, function (value, key) {
            assets[value] = {
                Total: 0,
                OutTotal: 0,
                ConsTotal: 0,
                Rows: []
            }
            //if (value === 'MotorTransport' || value === 'Hardware') {
            //    assets[value].OwnRows = [];
            //}
        });

        return assets;
    }

    function initLiabilities() {
        var liabilities = {};
        var liabilitiesNames = [
            //'BudgetSettlements',
            //'RentalsArrears',
            //'ShortTermDebt',
            'PayableAccounts',
            //'CommodityLoan',
            //'CustomersPrepayment',
            'ShortPrivateLoans',
            'ShortCredit',
            //'ShortWorkingCapitalCredit',
            //'ShortFixedAssetsCredit',
            'OtherCurrentDebt',
            'LongPrivateLoans',
            'LongCredit',
            //'LongWorkingCapitalCredit',
            //'LongFixedAssetsCredit',
            'OtherLiabilities'
        ];
        angular.forEach(liabilitiesNames, function (value, key) {
            liabilities[value] = {
                Total: 0,
                OutTotal: 0,
                ConsTotal: 0,
                Rows: []
            }
        });
        return liabilities;
    }

    var changeDate = function (oldDate, currBalances, freshDate) {
        if (moment(oldDate)
                .diff(moment(freshDate), 'days')) {
            _.forEach(currBalances,
                function (balance, bKey) {
                    _.forEach(balance.CompanyBalances, function (cBalance, cKey) {
                        if (!moment(cBalance.Date).diff(oldDate, 'days')) {
                            cBalance.Date = freshDate;
                            cBalance.Name = 'Баланс от ' + moment(freshDate).format('DD.MM.YY');
                        }
                    });
                });
        }
    }

    var updateCompanyBalances = function (updateBalances, sourceBalances) {
        _.forEach(updateBalances, function (uBalance, uKey) {
            _.forEach(sourceBalances, function (sBalance, sKey) {
                if (uBalance.CompanyName === sBalance.CompanyName) {
                    _.forEach(uBalance.CompanyBalances, function (uCompBalance, uCompKey) {
                        _.forEach(sBalance.CompanyBalances, function (sCompBalance, sCompKey) {
                            if (!moment(uCompBalance.Date).diff(sCompBalance.Date, 'days')) {
                                updateBalances[uKey].CompanyBalances[uCompKey] = sCompBalance;
                            }
                        });
                    });
                }
            });
        });
    }

    balanceTableFactory.initBalances = function (companies, currentProject) {
        var balances = [];
        angular.forEach(companies, function (company, key) {
            var balance = {
                Id: key + 1,
                CompanyName: company.Name,
                CompanyBalances: []
            }
            var dates = [];
            if (currentProject.FinDataBalance.PreviousFinAnalysisDate) {
                dates.push(currentProject.FinDataBalance.PreviousFinAnalysisDate);
            }
            dates.push(currentProject.FinDataBalance.CurrentFinAnalysisDate);
            angular.forEach(dates, function (bDate, key) {
                var cBalance = {
                    Id: key + 1,
                    Name: 'Баланс от ' + moment(bDate).format('DD.MM.YY'),
                    Date: bDate
                }
                cBalance.Assets = initAssets();
                cBalance.Liabilities = initLiabilities();
                cBalance.OutAssets = [];
                cBalance.OutLiabilities = [];

                cBalance.LiquidAssets = 0;
                cBalance.Receivables = 0;
                cBalance.Inventories = 0;
                cBalance.TotalCurrentAssets = 0;
                cBalance.TotalFixedAssets = 0;
                cBalance.TotalAssets = 0;

                cBalance.TotalShortTermDebt = 0;
                cBalance.TotalLongTermDebt = 0;
                cBalance.TotalLongAccountsPayable = 0;
                cBalance.Equity = 0;
                cBalance.TotalLiabilities = 0;

                balance.CompanyBalances.push(cBalance);
            });
            balances.push(balance);
        });

        return balances;
    }

    balanceTableFactory.updateBalance = function (finDataBalance, prevFinDataBalance, currentProject) {

        changeDate(currentProject.FinDataBalance.CurrentFinAnalysisDate,
                currentProject.FinDataBalance.Balances, finDataBalance.CurrentFinAnalysisDate);

        if (finDataBalance.PreviousFinAnalysisDate
            && moment(finDataBalance.PreviousFinAnalysisDate).isValid()) {
            if (currentProject.FinDataBalance.PreviousFinAnalysisDate
                && moment(currentProject.FinDataBalance.PreviousFinAnalysisDate).isValid()) {
                changeDate(currentProject.FinDataBalance.PreviousFinAnalysisDate,
                    currentProject.FinDataBalance.Balances,
                    finDataBalance.PreviousFinAnalysisDate);
                currentProject.FinDataBalance.PreviousFinAnalysisDate = finDataBalance.PreviousFinAnalysisDate;
            } else {
                var balancesCopy = _.cloneDeep(currentProject.FinDataBalance.Balances);
                currentProject.FinDataBalance.PreviousFinAnalysisDate = finDataBalance.PreviousFinAnalysisDate;
                currentProject.FinDataBalance.Balances = balanceTableFactory
                    .initBalances(currentProject.FinDataBalance.Companies, currentProject);
                updateCompanyBalances(currentProject.FinDataBalance.Balances, balancesCopy);
            }

            if (prevFinDataBalance) {
                updateCompanyBalances(currentProject.FinDataBalance.Balances, prevFinDataBalance.Balances);
            }

        }
        return currentProject.FinDataBalance.Balances;
    }

    return balanceTableFactory;

}]);