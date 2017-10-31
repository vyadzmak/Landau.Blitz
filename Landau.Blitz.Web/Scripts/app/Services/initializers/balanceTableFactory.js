blitzApp.factory('balanceTableFactory', ['$rootScope', 'balanceCalculatorFactory', function($rootScope, balanceCalculatorFactory) {
    var balanceTableFactory = {};
    
            function initAssets() {
                var assets = {};
                var assetsNames = [
                    'Checkout',
                    'CurrentAccount',
                    'Savings',
                    'Deposit',
                    'RecievableAccounts',
                    'TransitGoods',
                    'SuppliersPrepayment',
                    'OtherRecievables',
                    'Inventories',
                    'FinishedGoods',
                    'RawMaterials',
                    'SemiProducts',
                    'ForSaleGoods',
                    'Hardware',
                    'MotorTransport',
                    'RealEstate',
                    'Investments'
                ];

                angular.forEach(assetsNames, function(value, key) {
                    assets[value]= {
                        Total: 0,
                        OutTotal: 0,
                        ConsTotal: 0,
                        Rows:[]
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
                    'BudgetSettlements',
                    'RentalsArrears',
                    'ShortTermDebt',
                    'PayableAccounts',
                    'CommodityLoan',
                    'CustomersPrepayment',
                    'ShortPrivateLoans',
                    'ShortWorkingCapitalCredit',
                    'ShortFixedAssetsCredit',
                    'OtherCurrentDebt',
                    'LongPrivateLoans',
                    'LongWorkingCapitalCredit',
                    'LongFixedAssetsCredit',
                    'OtherLiabilities'
                ];
                angular.forEach(liabilitiesNames, function(value, key) {
                    liabilities[value] = {
                        Total: 0,
                        OutTotal: 0,
                        ConsTotal: 0,
                        Rows:[]
                    }
                });
                return liabilities;
            }

           balanceTableFactory.initBalances = function(companies) {
                var balances = [];
                angular.forEach(companies, function(company, key) {
                    var balance = {
                        Id: key+1,
                        CompanyName: company.Name,
                        CompanyBalances: []
                    }
                    angular.forEach(company.BalanceDates, function(bDate, key) {
                        var cBalance = {
                            Id:key+1,
                            Name: 'Баланс от '+moment(bDate.Date).format('DD.MM.YY'),
                            Date: bDate.Date
                        }
                        cBalance.Assets = initAssets();
                        cBalance.Liabilities = initLiabilities();

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

            return balanceTableFactory;

        }]);