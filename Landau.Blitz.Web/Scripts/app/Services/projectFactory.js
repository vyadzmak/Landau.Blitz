blitzApp.factory('projectFactory', ['$rootScope', 'clientDataInitializer', 'dataInitializer', 'balanceTableFactory', function ($rootScope, clientDataInitializer, dataInitilizer, balanceTableFactory) {
    var projectFactory = {};

    function initLineOpiu(title, varName, activity) {

        var months = activity.Seasonality ? 12 : (activity.OpiuMonthsQuantity > 24 ? 24 : activity.OpiuMonthsQuantity);

        var calc = false;
        if (varName.indexOf("!") != -1) {
            calc = true;
            varName = varName.replace('!', '');
        }


        var line = {};
        line.Title = title;
        line.Calculate = calc;
        line.VarName = varName;
        for (var i = 1; i <= months; i++) {
            line['M' + i] = 0.0;
        }
        if (activity.Seasonality) {
            for (var i = 0; i < activity.SeasonMonths.length; i++) {
                line['S' + activity.SeasonMonths[i].Id] = true;
            }
        }
        line.Avg = 0.0;
        line.AvgPrediction = 0.0;
        return line;

    }

    function initLineOdds(title, varName, headers) {

        var isPredefined = [
            'RevenuesIncome',
            'PrepaidIncome',
            'ReturnIncome',
            'OtherIncome',
            'CreditIncome',
            'SalesIncome',
            'SponsorshipIncome',
            'OtherOutOperationsIncome'
        ];


        var calc = false;
        if (varName.indexOf("!") != -1) {
            calc = true;
            varName = varName.replace('!', '');
        }



        var line = {};
        line.Title = title;
        line.Calculate = calc;
        line.VarName = varName;
        for (var i = 0; i < headers.length; i++) {
            if (isPredefined.indexOf(varName) !== -1 && headers[i].VarName === 'Prediction') {
                line[headers[i].VarName] = 25;
            } else {
                line[headers[i].VarName] = 0.0;
            }

        }
        return line;

    }

    function initTableOdds(headers) {

        var lines = [];

        var positions = [
            'ДЕН. СР-ВА НА НАЧАЛО ПЕРИОДА',
            'ПРИХОД ДЕНЕЖНЫХ СРЕДСТВ',
            'Выручка о реализации товаров/работ/услуг',
            'Поступление авансов от покупателей/заказчиков за товары/работы/услуги',
            'Возврат средств, выданных ранее в подотчет',
            'Прочие поступления операционной деятельности',
            'ИТОГО выручка от операционной деятельности по бизнесу',
            'Кредит МСБ',
            'Поступления от реализации долгосрочных активов',
            'Поступление финансовой помощи',
            'Прочие вне операционные поступления',
            'ИТОГО выручка от вне операционной деятельности по бизнесу',
            'РАСХОД ДЕНЕЖНЫХ СРЕДСТВ',
            'Закуп товаров',
            'Заработная плата',
            'Аренда',
            'Камера хранения',
            'ГСМ',
            'Путевка',
            'Реклама',
            'Таможня',
            'Доставка',
            'Транспортные расходы',
            'Налоги, сборы',
            'Коммунальные расходы',
            'Охрана',
            'Представительские расходы',
            'Проценты по кредиту',
            'Списание/брак',
            'Услуги банка',
            'Прочие расходы',
            'ИТОГО операционные расходы по бизнесу:',
            'Погашение по автокредиту',
            'Погашение ОД по кредиту',
            'Погашение по предпологаемому кредиту',
            'Семейные расходы',
            'Инвестиционные расходы',
            'Приобретение основных средств',
            'Выплата дивидендов',
            'Возврат финансовой помощи',
            'Прочие расходы',
            'ИТОГО вне операционные расходы по бизнесу:',
            'ДЕН. СР-ВА НА КОНЕЦ МЕСЯЦА',
            'ДЕН. СР-ВА НА КОНЕЦ ПЕРИОДА'
        ]


        var vNames = [
            '!StartPeriod',
            '!Income',
            'RevenuesIncome',
            'PrepaidIncome',
            'ReturnIncome',
            'OtherIncome',
            '!TotalIncome',
            'CreditIncome',
            'SalesIncome',
            'SponsorshipIncome',
            'OtherOutOperationsIncome',
            '!TotalOutOperationsIncome',
            '!Expenses',
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
            'OtherBusinessExpenses',
            '!TotalExpensesForBusiness',
            'AutoLoanRepayment',
            'LoanRepayment',
            'ExpectedLoanRepayment',
            'FamilyExpenses',
            'InvestmentExpenses',
            'FixedAssetsPurchase',
            'DividendExpenses',
            'AssistanceExpenses',
            'OtherExpenses',
            '!TotalExpensesOutBusiness',
            '!EndMonth',
            '!EndPeriod'
        ];
        for (var i = 0; i < positions.length; i++) {
            var l = initLineOdds(positions[i], vNames[i], headers);
            if (l != undefined)
                lines.push(l);
        }

        return lines;
    }

    function initTableOpiu(activity) {

        var lines = [];

        var positions = [
            'Выручка (доход от реализации)',
            'Себестоимость',
            'Маржа',
            'ВАЛОВАЯ ПРИБЫЛЬ',
            'Заработная плата',
            'Аренда',
            'Камера хранения',
            'ГСМ',
            'Путевка',
            'Реклама',
            'Таможня',
            'Доставка товаров/сырья',
            'Транспортные расходы',
            'Налоги, сборы',
            'Коммунальные расходы',
            'Охрана',
            'Представительские расходы',
            'Проценты по кредиту',
            'Брак/порча/списания',
            'Услуги банка',
            'Прочие расходы',
            'Итого расходы по бизнесу',
            'ПРИБЫЛЬ ПО БИЗНЕСУ',
            'Доходы вне бизнеса',
            'Расходы вне бизнеса',
            'ЧИСТАЯ ПРИБЫЛЬ',
            'Взнос по кредиту',
            'Чистый остаток по кредитам',
            'Максимальный размер возможного дополнительного взноса (в зависимости от цели):',
            '-взнос общий (стандартный)',
            '-взнос на инвестиции',
            '-взнос на пополнение товарооборота'

        ];


        var vNames = [
            'Revenues',
            'CostOfGoods',
            '!Margin',
            '!GrossProfit',
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
            'OtherBusinessExpenses',
            '!TotalExpensesForBusiness',
            '!ProfitOnBusiness',
            'OtherIncome',
            'OtherExpenses',
            '!NetProfit',
            'LoanPayment',
            '!NetLoanBalance',
            '!AdditionalPayment',
            'StandardAddPayment',
            'InvestmentAddPayment',
            'TurnoverAddPayment'
        ];
        for (var i = 0; i < positions.length; i++) {

            var l = initLineOpiu(positions[i], vNames[i], activity);
            if (l != undefined)
                lines.push(l);
        }

        return lines;
    }

    function initOpiuMonth(endMonth, monthsQuantity) {
        var startMonth = moment(endMonth).add(-monthsQuantity, 'months');
        var months = [];
        for (var i = 1; i <= monthsQuantity; i++) {
            var startDate = moment(startMonth);
            months.push({
                Id: i,
                Name: startDate.add(i, 'months').format('MM.YY')
            });
        }
        return months;
    }

    //-------------------------------init functions --------------------------------------//
    projectFactory.initProject = function () {
        var currentProject = {};
        currentProject.Id = -1;
        currentProject.ParentProject = {};
        currentProject.ParentExists = false;
        currentProject.Name = "";
        currentProject.ClientData = {};
        currentProject.FinancePlanning = {};
        currentProject.ProjectAnalysis = {};
        currentProject.ContractAnalysis = {};
        currentProject.BusinessInfo = {};
        currentProject.ConsolidatedBalance = {};
        currentProject.ConsolidatedOpiu = {};
        currentProject.FinDataBalance = {};
        currentProject.FinDataCrossChecking = {};
        currentProject.FinDataOpiu = {};
        currentProject.FinDataOdds = {};
        currentProject.Coefs = {};
        currentProject.Provision = {};
        currentProject.Appendix = {};
        currentProject.Conclusion = {};
        this.currentProject = currentProject;
        return currentProject;
    }

    projectFactory.initProjectData = function (currentProject) {
        if (currentProject.ParentExists) {
            currentProject.ClientData = angular.copy(currentProject.ParentProject.ClientData);
            currentProject.ContractAnalysis = angular.copy(currentProject.ParentProject.ContractAnalysis);;
            currentProject.BusinessInfo = angular.copy(currentProject.ParentProject.BusinessInfo);
            currentProject.Provision = angular.copy(currentProject.ParentProject.Provision);
            currentProject.Conclusion = angular.copy(currentProject.ParentProject.Conclusion);
        }
        this.currentProject = currentProject;
        return currentProject;
    }

    projectFactory.setData = function (currentProject) {

        currentProject.ClientData = currentProject.ProjectContent.ClientData;
        currentProject.ParentProject = currentProject.ProjectContent.ParentProject;
        currentProject.ParentExists = currentProject.ProjectContent.ParentExists;
        currentProject.FinancePlanning = currentProject.ProjectContent.FinancePlanning;
        currentProject.ProjectAnalysis = currentProject.ProjectContent.ProjectAnalysis;
        currentProject.BusinessInfo = currentProject.ProjectContent.BusinessInfo;
        currentProject.FinDataBalance = currentProject.ProjectContent.FinDataBalance;
        currentProject.ConsolidatedBalance = currentProject.ProjectContent.ConsolidatedBalance;
        currentProject.ConsolidatedOpiu = currentProject.ProjectContent.ConsolidatedOpiu;
        currentProject.Coefs = currentProject.ProjectContent.Coefs;

        currentProject.FinDataCrossChecking = currentProject.ProjectContent.FinDataCrossChecking;
        currentProject.FinDataOpiu = currentProject.ProjectContent.FinDataOpiu;

        currentProject.FinDataOdds = currentProject.ProjectContent.FinDataOdds;

        currentProject.Provision = currentProject.ProjectContent.Provision;
        currentProject.Conclusion = currentProject.ProjectContent.Conclusion;
        currentProject.BalanceDate = currentProject.ProjectContent.BalanceDate;

        currentProject.Appendix = currentProject.ProjectContent.Appendix;
        currentProject.ContractAnalysis = currentProject.ProjectContent.ContractAnalysis;

        currentProject.ProjectContent = {};
        this.currentProject = currentProject;
        return currentProject;
    }

    projectFactory.initClientData = function () {
        currentProject.ClientData = {};
    }

    projectFactory.initOpius = function (currentProject) {
        currentProject.FinDataOpiu.Opius = [];
        var counter = 1;
        angular.forEach(currentProject.FinDataOpiu.Companies, function (company, companyKey) {
            //if (company.MultipleActivities && company.ActivitiesQuantity > 1) {
            //    angular.forEach(company.Activities,
            //        function (activity, activityKey) {
            //            var aTable = {
            //                Id: counter,
            //                Name: company.Name + " (" + activity.Name + ")",
            //                StartMonth: activity.OpiuStartMonth,
            //                OpiuMonthsQuantity: activity.Seasonality ? 12 : activity.OpiuMonthsQuantity > 24 ? 24 : activity.OpiuMonthsQuantity,
            //                RelatedCompanyRevenues: [],
            //                TotalRealtedCompanyRevenue: {},
            //                LoanContributionDetails: {Comments:"", Rows:[], TotalPrincipal:0, TotalFee:0, TotalForOpiu:0}
            //            }

            //            aTable.Months = initOpiuMonth(aTable.StartMonth, aTable.OpiuMonthsQuantity);
            //            aTable.Table = initTableOpiu(activity);

            //            currentProject.FinDataOpiu.Opius.push(aTable);
            //            counter++;
            //        });
            //}
            var monthQuantity = company.Seasonality ? 12
                : company.IsStarting ? 0
                : company.OpiuMonthsQuantity > 24 ? 24
                : company.OpiuMonthsQuantity;
            var aTable = {
                Id: counter,
                Name: company.Name,
                BalanceData: currentProject.FinDataBalance.CurrentFinAnalysisDate,
                OpiuMonthsQuantity: monthQuantity,
                RelatedCompanyRevenues: [],
                TotalRealtedCompanyRevenue: {},
                LoanContributionDetails: { Comments: "", Rows: [], TotalPrincipal: 0, TotalFee: 0, TotalForOpiu: 0 }
            }

            aTable.Months = initOpiuMonth(aTable.BalanceData, aTable.OpiuMonthsQuantity);
            aTable.Table = initTableOpiu(company);

            currentProject.FinDataOpiu.Opius.push(aTable);
            counter++;

        });
        this.currentProject = currentProject;
    }

    projectFactory.initOddsData = function (months, currentProject) {

        currentProject.FinDataOdds.Odds = {};
        currentProject.FinDataOdds.Odds.MonthsBefore = months.MonthsBefore;
        currentProject.FinDataOdds.Odds.MonthsAfter = months.MonthsAfter;

        var startDate = currentProject.FinDataBalance.Balances[currentProject.FinDataBalance.Balances.length - 1]
            .CompanyBalances[currentProject.FinDataBalance.Balances[currentProject.FinDataBalance.Balances.length - 1].CompanyBalances.length - 1]
            .Date;

        currentProject.FinDataOdds.Odds.Header = [];

        startDate = moment(startDate);

        for (var i = 1; i <= months.MonthsBefore; i++) {
            var befDate = angular.copy(startDate);
            currentProject.FinDataOdds.Odds.Header.unshift({
                Name: befDate.add(-i, 'months').format('MM.YY'),
                VarName: 'm' + i
            });
        }
        currentProject.FinDataOdds.Odds.Header.push({
            Name: startDate.format('MM.YY'),
            VarName: 'm' + 0
        });
        currentProject.FinDataOdds.Odds.Header.push({
            Name: 'Прогноз',
            VarName: 'Prediction'
        });
        currentProject.FinDataOdds.Odds.Header.push({
            Name: startDate.format('MM.YY'),
            VarName: 'M' + 0
        });

        for (var i = 1; i <= months.MonthsAfter; i++) {
            var aftDate = angular.copy(startDate);
            currentProject.FinDataOdds.Odds.Header.push({
                Name: aftDate.add(i, 'months').format('MM.YY'),
                VarName: 'M' + i
            });
        }

        currentProject.FinDataOdds.Odds.Table = initTableOdds(currentProject.FinDataOdds.Odds.Header);

        console.log(currentProject.FinDataOdds.Odds);
        this.currentProject = currentProject;
    };

    projectFactory.initBalances = function (companies) {

        this.currentProject.FinDataBalance.Balances = balanceTableFactory.initBalances(companies, this.currentProject);
    }


    projectFactory.setBalancesBalance = function (balance, companyId) {
        this.currentProject.FinDataBalance.Balances[companyId - 1].CompanyBalances[balance.Id - 1] = balance;
    }

    projectFactory.getActiveCompanyBalance = function (companyId) {
        return this.currentProject.FinDataBalance.Balances[companyId - 1];
    }

    projectFactory.getActiveBalance = function (companyId, balanceId) {
        return this.currentProject.FinDataBalance.Balances[companyId - 1].CompanyBalances[balanceId - 1];
    }

    projectFactory.getActiveOpiu = function (ind) {
        return this.currentProject.FinDataOpiu.Opius[ind - 1];
    }

    projectFactory.setCrossChecking = function (finDataCrossChecking) {
        this.currentProject.FinDataCrossChecking = finDataCrossChecking;
    }

    projectFactory.getToCurrentProject = function () {
        angular.forEach(this.currentProject.BusinessInfo.ClientFounderInfos, function (value, key) {
            value.DateOfBirth = new Date(value.DateOfBirth);
        });
        angular.forEach(this.currentProject.ClientData.DirectorInfos, function (value, key) {
            value.DateOfBirth = new Date(value.DateOfBirth);
        });
        angular.forEach(this.currentProject.ClientData.RelatedCompanyType, function (value, key) {
            value.DateOfBirth = new Date(value.RegistrationDate);
        });

        this.currentProject.ClientData.RegistrationDate = new Date(this.currentProject.ClientData.RegistrationDate);

        angular.forEach(this.currentProject.ClientData.RelatedCompanyInfos, function (value, key) {
            value.RegistrationDate = new Date(value.RegistrationDate);
        });
        angular.forEach(this.currentProject.ClientData.CreditHistoryInfos, function (value, key) {
            value.DateOfReceiving = new Date(value.DateOfReceiving);
            value.DateOfRepaymentAgreement = new Date(value.DateOfRepaymentAgreement);
            value.DateOfRepaymentFact = new Date(value.DateOfRepaymentFact);
            angular.forEach(value.LoanDetails, function (vDet, vDetKey) {
                vDet.DateOfReceiving = new Date(vDet.DateOfReceiving);
                vDet.DateOfRepaymentAgreement = new Date(vDet.DateOfRepaymentAgreement);
                vDet.DateOfRepaymentFact = new Date(vDet.DateOfRepaymentFact);
            });
        });
        angular.forEach(this.currentProject.ClientData.BankAccountInfos, function (value, key) {
            value.DatePeriodStart = new Date(value.DatePeriodStart);
            value.DatePeriodEnd = new Date(value.DatePeriodEnd);
        });

        angular.forEach(this.currentProject.ContractAnalysis.Sales, function (value, key) {
            value.SignDate = new Date(value.SignDate);
            value.EndDate = new Date(value.EndDate);
        });
        angular.forEach(this.currentProject.ContractAnalysis.Purchases, function (value, key) {
            value.SignDate = new Date(value.SignDate);
            value.EndDate = new Date(value.EndDate);
        });

        this.currentProject.ProjectAnalysis.ProjectTerms = new Date(this.currentProject.ProjectAnalysis.ProjectTerms);

        angular.forEach(this.currentProject.FinDataBalance.Balances, function (balance, balKey) {
            angular.forEach(balance.CompanyBalances, function (compBalance, compBalKey) {
                //angular.forEach(compBalance.Assets.TransitGoods.Rows, function (row, rowKey) {
                //    row.GetDate = new Date(row.GetDate);
                //});
                //angular.forEach(compBalance.Assets.SuppliersPrepayment.Rows, function (row, rowKey) {
                //    row.GetDate = new Date(row.GetDate);
                //});
                angular.forEach(compBalance.Liabilities.ShortCredit.Rows, function (row, rowKey) {
                    row.ArrearsDate = new Date(row.ArrearsDate);
                    row.MaturityDate = new Date(row.MaturityDate);
                });
                //angular.forEach(compBalance.Liabilities.ShortTermDebt.Rows, function (row, rowKey) {
                //    row.ArrearsDate = new Date(row.ArrearsDate);
                //    row.MaturityDate = new Date(row.MaturityDate);
                //});
                angular.forEach(compBalance.Liabilities.ShortPrivateLoans.Rows, function (row, rowKey) {
                    row.ArrearsDate = new Date(row.ArrearsDate);
                    row.MaturityDate = new Date(row.MaturityDate);
                });
                //angular.forEach(compBalance.Liabilities.ShortFixedAssetsCredit.Rows, function (row, rowKey) {
                //    row.ArrearsDate = new Date(row.ArrearsDate);
                //    row.MaturityDate = new Date(row.MaturityDate);
                //});
                //angular.forEach(compBalance.Liabilities.RentalsArrears.Rows, function (row, rowKey) {
                //    row.ArrearsDate = new Date(row.ArrearsDate);
                //    row.MaturityDate = new Date(row.MaturityDate);
                //});
                angular.forEach(compBalance.Assets.Recievables.Rows, function (row, rowKey) {
                    row.OccurDate = new Date(row.OccurDate);
                    row.ReturnDate = new Date(row.ReturnDate);
                });
                angular.forEach(compBalance.Assets.OtherRecievables.Rows, function (row, rowKey) {
                    row.OccurDate = new Date(row.OccurDate);
                    row.ReturnDate = new Date(row.ReturnDate);
                });
                angular.forEach(compBalance.Liabilities.PayableAccounts.Rows, function (row, rowKey) {
                    row.ArrearsDate = new Date(row.ArrearsDate);
                    row.MaturityDate = new Date(row.MaturityDate);
                });
                angular.forEach(compBalance.Liabilities.OtherLiabilities.Rows, function (row, rowKey) {
                    row.ArrearsDate = new Date(row.ArrearsDate);
                    row.MaturityDate = new Date(row.MaturityDate);
                });
                angular.forEach(compBalance.Liabilities.OtherCurrentDebt.Rows, function (row, rowKey) {
                    row.ArrearsDate = new Date(row.ArrearsDate);
                    row.MaturityDate = new Date(row.MaturityDate);
                });
                angular.forEach(compBalance.Liabilities.LongCredit.Rows, function (row, rowKey) {
                    row.ArrearsDate = new Date(row.ArrearsDate);
                    row.MaturityDate = new Date(row.MaturityDate);
                });
                angular.forEach(compBalance.Liabilities.LongPrivateLoans.Rows, function (row, rowKey) {
                    row.ArrearsDate = new Date(row.ArrearsDate);
                    row.MaturityDate = new Date(row.MaturityDate);
                });
                //angular.forEach(compBalance.Liabilities.LongFixedAssetsCredit.Rows, function (row, rowKey) {
                //    row.ArrearsDate = new Date(row.ArrearsDate);
                //    row.MaturityDate = new Date(row.MaturityDate);
                //});
                angular.forEach(compBalance.Assets.Investments.Rows, function (row, rowKey) {
                    row.Date = new Date(row.Date);
                });
                //angular.forEach(compBalance.Assets.ForSaleGoods.Rows, function (row, rowKey) {
                //    row.GetDate = new Date(row.GetDate);
                //});
                //angular.forEach(compBalance.Liabilities.CustomersPrepayment.Rows, function (row, rowKey) {
                //    row.ArrearsDate = new Date(row.ArrearsDate);
                //    row.MaturityDate = new Date(row.MaturityDate);
                //});
                //angular.forEach(compBalance.Liabilities.CommodityLoan.Rows, function (row, rowKey) {
                //    row.ArrearsDate = new Date(row.ArrearsDate);
                //    row.MaturityDate = new Date(row.MaturityDate);
                //});

                //angular.forEach(compBalance.Liabilities.BudgetSettlements.Rows, function (row, rowKey) {
                //    row.ArrearsDate = new Date(row.ArrearsDate);
                //    row.MaturityDate = new Date(row.MaturityDate);
                //});
            });
        });


        angular.forEach(this.currentProject.FinancePlanning.Plans, function (value, key) {
            if(moment(value.Date).isValid() || moment(value.Date, ["DD-MM-YYYY", "DD.MM.YYYY", "DD/MM/YYYY"]).isValid()){
                value.Date = moment(value.Date, ["DD-MM-YYYY", "DD.MM.YYYY", "DD/MM/YYYY"]).format("DD.MM.YYYY");
            } else { value.Date = null}
        });

        return this.currentProject;
    }

    projectFactory.setProject = function (currentProject) {
        this.currentProject = currentProject;
    }
    //-------------------------------end init functions ---------------------------------//

    return projectFactory;

}]);