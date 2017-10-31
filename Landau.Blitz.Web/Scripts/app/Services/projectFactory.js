blitzApp.factory('projectFactory', ['$rootScope', 'clientDataInitializer', 'dataInitializer', 'balanceTableFactory', function ($rootScope, clientDataInitializer, dataInitilizer, balanceTableFactory) {
    var projectFactory = {};
    var currentProject = {};

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
            line.AvgPrognose = 0.0;
            return line;

    }

    function initLineOdds(title, varName, headers) {

        

        var calc = false;
        if (varName.indexOf("!") != -1) {
            calc = true;
            varName = varName.replace('!', '');
        }


        
            var line = {};
            line.Title = title;
            line.Calculate = calc;
            line.VarName = varName;
            for (var i = 1; i <= headers; i++) {
                line[headers[i].VarName] = 0.0;
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
            'StartPeriod',
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
            'LoanInterestPayment',
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

    function initOpiuMonth(startMonth, monthsQuantity) {
        var months = [];
        for (var i = 0; i < monthsQuantity; i++) {
            var startDate = moment(startMonth);
            months.push({
                Id: i + 1,
                Name: startDate.add(i, 'months').format('MM.YY')
            });
        }
        return months;
    }

    //-------------------------------init functions --------------------------------------//
    projectFactory.initProject = function () {
        currentProject = {};
        currentProject.Id = -1;
        currentProject.ParentProject = {};
        currentProject.ParentExists = false;
        currentProject.Name = "";
        currentProject.ClientData = {};
        currentProject.FinancePlanning = {};
        currentProject.ProjectAnalysis = {};
        currentProject.ContractAnalysis = {};
        currentProject.BusinessInfo = {};
        currentProject.FinDataBalance = {};
        currentProject.FinDataCrossChecking = {};
        currentProject.FinDataOpiu = {};
        currentProject.FinDataOdds = {};
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

        if (currentProject.ParentExists) {
            currentProject.FinDataBalance.PreviousDate = new Date();// указать дату б2
        }

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
        angular.forEach(currentProject.FinDataOpiu.Companies, function (company, companyKey) {
            if (company.MultipleActivities && company.ActivitiesQuantity > 1) {
                angular.forEach(company.Activities,
                    function (activity, activityKey) {
                        var aTable = {
                            Name: company.Name + " (" + activity.Name + ")",
                            StartMonth: activity.OpiuStartMonth,
                            OpiuMonthsQuantity: activity.Seasonality ? 12 : activity.OpiuMonthsQuantity > 24 ? 24 : activity.OpiuMonthsQuantity,
                        }

                        aTable.Months = initOpiuMonth(aTable.StartMonth, aTable.OpiuMonthsQuantity);
                        aTable.Table = initTableOpiu(activity);

                        currentProject.FinDataOpiu.Opius.push(aTable);
                    });
            } else {
                var aTable = {
                    Name: company.Name,
                    StartMonth: company.OpiuStartMonth,
                    OpiuMonthsQuantity: company.Seasonality ? 12 : company.OpiuMonthsQuantity > 24 ? 24 : company.OpiuMonthsQuantity,
                }

                aTable.Months = initOpiuMonth(aTable.StartMonth, aTable.OpiuMonthsQuantity);
                aTable.Table = initTableOpiu(company);

                currentProject.FinDataOpiu.Opius.push(aTable);
            }
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
                VarName:'m'+i
            });
        }
        currentProject.FinDataOdds.Odds.Header.push({
            Name: startDate.format('MM.YY'),
            VarName: 'm' + 0
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

        this.currentProject.FinDataBalance.Balances = balanceTableFactory.initBalances(companies);
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

    projectFactory.setCrossChecking= function(finDataCrossChecking) {
        this.currentProject.FinDataCrossChecking = finDataCrossChecking;
    }

    projectFactory.getToCurrentProject = function () {
        angular.forEach(this.currentProject.ClientData.DirectorInfos, function (value, key) {
            value.DateOfBirth = new Date(value.DateOfBirth);
        });

        return this.currentProject;
    }
    //-------------------------------end init functions ---------------------------------//

    return projectFactory;

}]);