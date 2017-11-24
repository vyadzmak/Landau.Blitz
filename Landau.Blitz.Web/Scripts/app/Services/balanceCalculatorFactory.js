blitzApp.factory('balanceCalculatorFactory', ['$rootScope', 'mathFactory', function ($rootScope, mathFactory) {
    var balanceCalculatorFactory = {};

    balanceCalculatorFactory.calculateData = function (currentProject, balanceId, companyBalanceId) {
        try {
            var balance = currentProject.FinDataBalance.Balances[balanceId - 1].CompanyBalances[companyBalanceId - 1];

            // null assets
            balance.LiquidAssets = 0;
            balance.Receivables = 0;
            balance.Inventories = 0;
            balance.TotalCurrentAssets = 0;
            balance.TotalFixedAssets = 0;
            balance.TotalAssets = 0;
            // null liabilities
            balance.TotalShortTermDebt = 0;
            balance.TotalLongTermDebt = 0;
            balance.TotalLongAccountsPayable = 0;
            balance.Equity = 0;
            balance.TotalLiabilities = 0;
            //outbalance
            balance.OutLiquidAssets = 0;
            balance.OutReceivables = 0;
            balance.OutInventories = 0;
            balance.OutTotalCurrentAssets = 0;
            balance.OutTotalFixedAssets = 0;
            balance.OutTotalAssets = 0;
            balance.OutTotalShortTermDebt = 0;
            balance.OutTotalLongTermDebt = 0;
            balance.OutTotalLongAccountsPayable = 0;
            balance.OutEquity = 0;
            balance.OutTotalLiabilities = 0;
            //consbalance
            balance.ConsLiquidAssets = 0;
            balance.ConsReceivables = 0;
            balance.ConsInventories = 0;
            balance.ConsTotalCurrentAssets = 0;
            balance.ConsTotalFixedAssets = 0;
            balance.ConsTotalAssets = 0;
            balance.ConsTotalShortTermDebt = 0;
            balance.ConsTotalLongTermDebt = 0;
            balance.ConsTotalLongAccountsPayable = 0;
            balance.ConsEquity = 0;
            balance.ConsTotalLiabilities = 0;
            // calculating liabilities
            var shortTermLiabilities = [
                //'BudgetSettlements',
                //'RentalsArrears',
                //'ShortTermDebt',
                'PayableAccounts',
                //'CommodityLoan',
                //'CustomersPrepayment',
                'ShortPrivateLoans',
                'ShortCredit',
                //'ShortFixedAssetsCredit',
                'OtherCurrentDebt'
            ];

            var longTermLiabilities = [
                'LongPrivateLoans',
                'LongCredit',
                //'LongFixedAssetsCredit',
                'OtherLiabilities'
            ];

            angular.forEach(shortTermLiabilities,
                function (varName, varKey) {
                    balance.Liabilities[varName].Total = 0;
                    balance.Liabilities[varName].ConsTotal = 0;
                    balance.Liabilities[varName].OutTotal = 0;
                    angular.forEach(balance.Liabilities[varName].Rows,
                        function (tRow, tKey) {

                            if (!tRow.IsRelatedCompany) {
                                balance.Liabilities[varName].ConsTotal += mathFactory.getFloat(tRow.Sum);
                            }

                            balance.Liabilities[varName].Total += mathFactory.getFloat(tRow.Sum);
                        });
                    balance.TotalShortTermDebt += balance.Liabilities[varName].Total;
                    balance.OutTotalShortTermDebt += balance.Liabilities[varName].OutTotal;
                    balance.ConsTotalShortTermDebt += balance.Liabilities[varName].ConsTotal;
                });


            angular.forEach(longTermLiabilities,
                function (varName, varKey) {
                    balance.Liabilities[varName].Total = 0;
                    balance.Liabilities[varName].ConsTotal = 0;
                    balance.Liabilities[varName].OutTotal = 0;

                    angular.forEach(balance.Liabilities[varName].Rows,
                        function (tRow, tKey) {
                            if (!tRow.IsRelatedCompany) {
                                balance.Liabilities[varName].ConsTotal += mathFactory.getFloat(tRow.Sum);
                            }
                            balance.Liabilities[varName].Total += mathFactory.getFloat(tRow.Sum);
                        });
                    balance.TotalLongTermDebt += balance.Liabilities[varName].Total;
                    balance.OutTotalLongTermDebt += balance.Liabilities[varName].OutTotal;
                    balance.ConsTotalLongTermDebt += balance.Liabilities[varName].ConsTotal;
                });

            balance.TotalLongAccountsPayable = balance.TotalShortTermDebt + balance.TotalLongTermDebt;
            balance.OutTotalLongAccountsPayable = balance.OutTotalShortTermDebt + balance.OutTotalLongTermDebt;
            balance.ConsTotalLongAccountsPayable = balance.ConsTotalShortTermDebt + balance.ConsTotalLongTermDebt;

            // calculating assets
            // liquids
            var liqs = [
                'Checkout',
                'Savings',
                'Deposit'
            ];

            angular.forEach(liqs,
                function (varName, varKey) {
                    balance.Assets[varName].Total = 0;
                    balance.Assets[varName].ConsTotal = 0;
                    balance.Assets[varName].OutTotal = 0;

                    angular.forEach(balance.Assets[varName].Rows,
                        function (tRow, tKey) {
                            var totalOut = mathFactory.getFloat(tRow.NotConfirmed) +
                                mathFactory.getFloat(tRow.OutBusiness);
                            balance.Assets[varName].OutTotal += totalOut;
                            balance.Assets[varName].Total += mathFactory.getFloat(tRow.Sum) - totalOut;
                            balance.Assets[varName].ConsTotal += mathFactory.getFloat(tRow.Sum) - totalOut;
                        });
                    balance.LiquidAssets += balance.Assets[varName].Total;
                    balance.ConsLiquidAssets += balance.Assets[varName].ConsTotal;
                    balance.OutLiquidAssets += balance.Assets[varName].OutTotal;
                });

            balance.Assets.CurrentAccount.ConsTotal = 0;
            balance.Assets.CurrentAccount.OutTotal = 0;
            balance.Assets.CurrentAccount.Total = 0;
            angular.forEach(balance.Assets.CurrentAccount.Rows,
                function (tRow, tKey) {
                    balance.Assets.CurrentAccount.Total += mathFactory.getFloat(tRow.Sum);
                    balance.Assets.CurrentAccount.ConsTotal += mathFactory.getFloat(tRow.Sum);
                });
            balance.LiquidAssets += balance.Assets.CurrentAccount.Total;
            balance.ConsLiquidAssets += balance.Assets.CurrentAccount.ConsTotal;
            balance.OutLiquidAssets += balance.Assets.CurrentAccount.OutTotal;

            // debt recievables
            //'RecievableAccounts','OtherRecievables',
            var recvbls = ['Recievables', 'OtherRecievables'];
            angular.forEach(recvbls,
                function (varName, varKey) {
                    balance.Assets[varName].Total = 0;
                    balance.Assets[varName].ConsTotal = 0;
                    balance.Assets[varName].OutTotal = 0;

                    angular.forEach(balance.Assets[varName].Rows,
                        function (tRow, tKey) {
                            var sum = mathFactory.getFloat(tRow.Sum);
                            if (!tRow.IsRelatedCompany) {
                                balance.Assets[varName].ConsTotal += sum;
                            }
                            if (tRow.NoReturn) {
                                balance.Assets[varName].OutTotal += sum;
                            } else {
                                balance.Assets[varName].Total += sum;
                            }
                        });
                    balance.Receivables += balance.Assets[varName].Total;
                    balance.ConsReceivables += balance.Assets[varName].ConsTotal;
                    balance.OutReceivables += balance.Assets[varName].OutTotal;
                });
            //'TransitGoods','SuppliersPrepayment',
            //var tgsps = ['TransitGoods', 'SuppliersPrepayment'];
            //angular.forEach(tgsps,
            //    function (varName, varKey) {
            //        balance.Assets[varName].Total = 0;
            //        balance.Assets[varName].ConsTotal = 0;
            //        balance.Assets[varName].OutTotal = 0;

            //        angular.forEach(balance.Assets[varName].Rows,
            //            function (tRow, tKey) {
            //                var sum = mathFactory.getFloat(tRow.Sum);
            //                balance.Assets[varName].Total += sum;
            //                balance.Assets[varName].ConsTotal += sum;
            //            });
            //        balance.Receivables += balance.Assets[varName].Total;
            //        balance.ConsReceivables += balance.Assets[varName].ConsTotal;
            //        balance.OutReceivables += balance.Assets[varName].OutTotal;
            //    });

            // TMZ
            // 'Inventories','FinishedGoods','RawMaterials','SemiProducts',
            var ifrss = ['Inventories'];
            angular.forEach(ifrss,
                function (varName, varKey) {
                    balance.Assets[varName].Total = 0;
                    balance.Assets[varName].ConsTotal = 0;
                    balance.Assets[varName].OutTotal = 0;

                    angular.forEach(balance.Assets[varName].Rows,
                        function (tRow, tKey) {
                            var quantity = mathFactory.getFloat(tRow.Quantity);
                            var costPU = mathFactory.getFloat(tRow.CostPerUnit);
                            tRow.Sum = (quantity * costPU).toFixed(2);
                            balance.Assets[varName].Total += mathFactory.getFloat(tRow.Sum);
                            balance.Assets[varName].ConsTotal += mathFactory.getFloat(tRow.Sum);
                        });
                    balance.Inventories += balance.Assets[varName].Total;
                    balance.ConsInventories += balance.Assets[varName].ConsTotal;
                    balance.OutInventories += balance.Assets[varName].OutTotal;
                });
            // ForSaleGoods
            //balance.Assets.ForSaleGoods.ConsTotal = 0;
            //balance.Assets.ForSaleGoods.OutTotal = 0;
            //balance.Assets.ForSaleGoods.Total = 0;
            //angular.forEach(balance.Assets.ForSaleGoods.Rows,
            //    function (tRow, tKey) {
            //        balance.Assets.ForSaleGoods.Total += mathFactory.getFloat(tRow.Sum);
            //        balance.Assets.ForSaleGoods.ConsTotal += mathFactory.getFloat(tRow.Sum);
            //    });
            //balance.Inventories += balance.Assets.ForSaleGoods.Total;
            //balance.ConsInventories += balance.Assets.ForSaleGoods.ConsTotal;
            //balance.OutInventories += balance.Assets.ForSaleGoods.OutTotal;

            //TotalCurrentAssets
            balance.TotalCurrentAssets = balance.Inventories + balance.LiquidAssets + balance.Receivables;
            balance.OutTotalCurrentAssets = balance.OutInventories + balance.OutLiquidAssets + balance.OutReceivables;
            balance.ConsTotalCurrentAssets = balance.ConsInventories + balance.ConsLiquidAssets + balance.ConsReceivables;

            //FixedAssets
            //Hardware, MotorTransport
            var hmts = ['Hardware', 'MotorTransport'];
            angular.forEach(hmts,
                function (varName, varKey) {
                    balance.Assets[varName].Total = 0;
                    balance.Assets[varName].ConsTotal = 0;
                    balance.Assets[varName].OutTotal = 0;

                    angular.forEach(balance.Assets[varName].Rows,
                        function (tRow, tKey) {
                            var quantity = mathFactory.getFloat(tRow.Quantity);
                            var costB1 = mathFactory.getFloat(tRow.CostB1);
                            var costB2 = mathFactory.getFloat(tRow.CostB2);
                            if (costB1 > 0) {
                                tRow.Revalue = (costB2 - costB1).toFixed(2);
                            }
                            balance.Assets[varName].Total += (costB2 * quantity);
                            balance.Assets[varName].ConsTotal += (costB2 * quantity);
                        });
                    angular.forEach(balance.Assets[varName].OwnRows,
                        function (tRow, tKey) {
                            var quantity = mathFactory.getFloat(tRow.Quantity);
                            var costB1 = mathFactory.getFloat(tRow.CostBuy);
                            var costB2 = mathFactory.getFloat(tRow.CostB2);
                            if (costB1 > 0) {
                                tRow.CostDiff = (costB2 - costB1).toFixed(2);
                            }
                            balance.Assets[varName].Total += (costB2 * quantity);
                            balance.Assets[varName].ConsTotal += (costB2 * quantity);
                        });
                    balance.TotalFixedAssets += balance.Assets[varName].Total;
                    balance.ConsTotalFixedAssets += balance.Assets[varName].ConsTotal;
                    balance.OutTotalFixedAssets += balance.Assets[varName].OutTotal;
                });
            // RealEstate
            balance.Assets.RealEstate.ConsTotal = 0;
            balance.Assets.RealEstate.OutTotal = 0;
            balance.Assets.RealEstate.Total = 0;
            angular.forEach(balance.Assets.RealEstate.Rows,
                function (tRow, tKey) {
                    var costB1 = mathFactory.getFloat(tRow.CostB1);
                    var costB2 = mathFactory.getFloat(tRow.CostB2);
                    if (costB1 > 0) {
                        tRow.Revalue = (costB2 - costB1).toFixed(2);
                    }
                    balance.Assets.RealEstate.Total += (costB2);
                    balance.Assets.RealEstate.ConsTotal += (costB2);
                });
            balance.TotalFixedAssets += balance.Assets.RealEstate.Total;
            balance.ConsTotalFixedAssets += balance.Assets.RealEstate.ConsTotal;
            balance.OutTotalFixedAssets += balance.Assets.RealEstate.OutTotal;

            //Investments
            balance.Assets.Investments.ConsTotal = 0;
            balance.Assets.Investments.OutTotal = 0;
            balance.Assets.Investments.Total = 0;
            angular.forEach(balance.Assets.Investments.Rows,
                function (tRow, tKey) {
                    balance.Assets.Investments.Total += mathFactory.getFloat(tRow.Sum);
                    balance.Assets.Investments.ConsTotal += mathFactory.getFloat(tRow.Sum);
                });


            //TotalAssets
            balance.TotalAssets =
                mathFactory.getFloat(balance.TotalCurrentAssets) +
                mathFactory.getFloat(balance.TotalFixedAssets) +
                mathFactory.getFloat(balance.Assets.Investments.Total);

            balance.OutTotalAssets =
                mathFactory.getFloat(balance.OutTotalCurrentAssets) +
                mathFactory.getFloat(balance.OutTotalFixedAssets) +
                mathFactory.getFloat(balance.Assets.Investments.OutTotal);

            balance.ConsTotalAssets =
                mathFactory.getFloat(balance.ConsTotalCurrentAssets) +
                mathFactory.getFloat(balance.ConsTotalFixedAssets) +
                mathFactory.getFloat(balance.Assets.Investments.ConsTotal);

            balance.Equity = balance.TotalAssets - balance.TotalLongAccountsPayable;
            balance.OutEquity = balance.OutTotalAssets - balance.OutTotalLongAccountsPayable;
            balance.ConsEquity = balance.ConsTotalAssets - balance.ConsTotalLongAccountsPayable;
            balance.TotalLiabilities = balance.Equity + balance.TotalLongAccountsPayable;
            balance.OutTotalLiabilities = balance.OutTotalLongAccountsPayable;
            balance.ConsTotalLiabilities = balance.ConsEquity + balance.ConsTotalLongAccountsPayable;

            angular.forEach(balance.OutAssets, function(value, key) {
                balance.OutTotalAssets += mathFactory.getFloat(value.Sum);
            });
            angular.forEach(balance.OutLiabilities, function (value, key) {
                balance.OutTotalLiabilities += mathFactory.getFloat(value.Sum);
            });
            balance.OutTotalAssets = mathFactory.round(balance.OutTotalAssets, 2);
            balance.OutTotalLiabilities = mathFactory.round(balance.OutTotalLiabilities, 2);
        } catch (except) {
            console.log(except);
        }
        return currentProject;
    }


    var assetsNames = [
                    'Checkout',
                    'CurrentAccount',
                    'Savings',
                    'Deposit',
                    'Recievables',
                    //'RecievableAccounts',
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

    var liabilitiesNames = [
                    //'BudgetSettlements',
                    //'RentalsArrears',
                    //'ShortTermDebt',
                    'PayableAccounts',
                    //'CommodityLoan',
                    //'CustomersPrepayment',
                    'ShortPrivateLoans',
                    'ShortCredit',
                    //'ShortFixedAssetsCredit',
                    'OtherCurrentDebt',
                    'LongPrivateLoans',
                    'LongCredit',
                    //'LongFixedAssetsCredit',
                    'OtherLiabilities'
    ];

    var totalNames = [
                    "ConsLiquidAssets",
					"ConsReceivables",
					"ConsInventories",
					"ConsTotalCurrentAssets",
					"ConsTotalFixedAssets",
					"ConsTotalAssets",
					"ConsTotalShortTermDebt",
					"ConsTotalLongTermDebt",
					"ConsTotalLongAccountsPayable",
					"ConsEquity",
					"ConsTotalLiabilities"
    ];

    balanceCalculatorFactory.calculateConsolidatedBalance = function (currentProject) {
        try {
            currentProject.ConsolidatedBalance.CompanyBalances = angular
                .copy(currentProject.FinDataBalance.Balances[0].CompanyBalances);

            angular.forEach(currentProject.FinDataBalance.Balances, function (comp, compKey) {
                if (compKey > 0) {
                    angular.forEach(comp.CompanyBalances, function (compBalance, bKey) {
                        angular.forEach(currentProject.ConsolidatedBalance.CompanyBalances, function (consBalance, cbKey) {
                            if (moment(consBalance.Date).isSame(compBalance.Date, 'day')) {
                                angular.forEach(assetsNames, function (assetName, abKey) {
                                    consBalance.Assets[assetName].ConsTotal = mathFactory.getFloat(consBalance.Assets[assetName].ConsTotal) + mathFactory.getFloat(compBalance.Assets[assetName].ConsTotal);
                                });
                                angular.forEach(liabilitiesNames, function (liabilityName, lbKey) {
                                    consBalance.Liabilities[liabilityName].ConsTotal = mathFactory.getFloat(consBalance.Liabilities[liabilityName].ConsTotal) + mathFactory.getFloat(compBalance.Liabilities[liabilityName].ConsTotal);
                                });
                                angular.forEach(totalNames, function (totalName, tbKey) {
                                    consBalance[totalName] = mathFactory.getFloat(consBalance[totalName]) + mathFactory.getFloat(compBalance[totalName]);
                                });
                            }
                        });
                    });
                }
            });
        } catch (except) {
            console.log(except);
        }
        return currentProject;
    }

    return balanceCalculatorFactory;

}]);