blitzApp.factory('projectFactory', ['$rootScope', 'clientDataInitializer', 'dataInitializer', 'balanceTableFactory', function ($rootScope, clientDataInitializer, dataInitilizer, balanceTableFactory) {
    var projectFactory = {};
    var currentProject = {};

    //---views data-----//
    var currentClientData = {};
    var currentCreditData = {};
    var currentFinancePlanning = {};
    var currentProjectAnalysis = {};
    var currentBusinessInfo = {};
    var currentFinDataBalance = {};
    var currentFinDataCrossChecking = {};
    var currentFinDataOpiu = {};
    var currentFinDataOdds = {};
    var currentLargeExpenses = {};
    var currentProvision = {};
    var currentDataDamu = {};
    var currentConclusion = {};

    function checkAdd(varName) {
        //услуги
        if ((varName == 'RevenuesService' || varName == 'CostOfGoodsService' || varName == 'MarginService' || varName == 'GrossProfitService' || varName == 'SpeedOfTurnoverService' || varName == 'ProfitabilityOfSalesService') && currentProject.ActivityService) {
            return true;
        } else if ((varName == 'RevenuesService' || varName == 'CostOfGoodsService' || varName == 'MarginService' || varName == 'GrossProfitService' || varName == 'SpeedOfTurnoverService' || varName == 'ProfitabilityOfSalesService') && !currentProject.ActivityService) {
            return false;
        }

        if ((varName == 'RevenuesTrade' || varName == 'CostOfGoodsTrade' || varName == 'MarginTrade' || varName == 'GrossProfitTrade' || varName == 'SpeedOfTurnoverTrade' || varName == 'ProfitabilityOfSalesTrade') && currentProject.ActivityTrade) {
            return true;
        } else if ((varName == 'RevenuesTrade' || varName == 'CostOfGoodsTrade' || varName == 'MarginTrade' || varName == 'GrossProfitTrade' || varName == 'SpeedOfTurnoverTrade' || varName == 'ProfitabilityOfSalesTrade') && !currentProject.ActivityTrade) {
            return false;
        }

        if ((varName == 'RevenuesAgriculture' || varName == 'CostOfGoodsAgriculture' || varName == 'MarginAgriculture' || varName == 'GrossProfitAgriculture' || varName == 'SpeedOfTurnoverAgriculture' || varName == 'ProfitabilityOfSalesAgriculture') && currentProject.ActivityAgriculture) {
            return true;
        } else if ((varName == 'RevenuesAgriculture' || varName == 'CostOfGoodsAgriculture' || varName == 'MarginAgriculture' || varName == 'GrossProfitAgriculture' || varName == 'SpeedOfTurnoverAgriculture' || varName == 'ProfitabilityOfSalesAgriculture') && !currentProject.ActivityAgriculture) {
            return false;
        }

        if ((varName == 'RevenuesProduction' || varName == 'CostOfGoodsProduction' || varName == 'MarginProduction' || varName == 'GrossProfitProduction' || varName == 'SpeedOfTurnoverProduction' || varName == 'ProfitabilityOfSalesProduction') && currentProject.ActivityProduction) {
            return true;
        } else if ((varName == 'RevenuesProduction' || varName == 'CostOfGoodsProduction' || varName == 'MarginProduction' || varName == 'GrossProfitProduction' || varName == 'SpeedOfTurnoverProduction' || varName == 'ProfitabilityOfSalesProduction') && !currentProject.ActivityProduction) {
            return false;
        }

        return true;
    }

    //------end views data ---//
    function initLine(title, varName) {


        var calc = false;
        if (varName.indexOf("!") != -1) {
            calc = true;
            varName = varName.replace('!', '');
        }


        if (checkAdd(varName)) {
            var line = {};
            line.Title = title;
            line.Calculate = calc;
            line.VarName = varName;
            line.M1 = 0;
            line.M2 = 0;
            line.M3 = 0;
            line.M4 = 0;
            line.M5 = 0;
            line.M6 = 0;
            line.Avg = 0;
            line.AvgPrognose = 0;
            return line;
        } else {
            return undefined;
        }

    }

    function initLineOpiu(title, varName, activity) {

        var months = activity.Seasonality ? 12 : (activity.OpiuMonthsQuantity > 24 ? 24 : activity.OpiuMonthsQuantity);

        var calc = false;
        if (varName.indexOf("!") != -1) {
            calc = true;
            varName = varName.replace('!', '');
        }


        if (checkAdd(varName)) {
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
        } else {
            return undefined;
        }

    }


    function initOdds() {

        var lines = [];

        var positions = [
            'Итого Выручка',
            'Выручка (Услуги)',
            'Выручка (Торговля)',
            'Выручка (С/Х)',
            'Выручка (Производство)',
            'Прочие поступления',
            'Доходы из статьи ОПиУ',
            'Разовые доходы от продажи основных средств',
            'Разовые поступления в виде спонсорской помощи',
            'Кредиты/Займы',
            'Кредиты банков',
            'Частные займы',
            'Финансовая помощь',
            'Затраты денежных средств',
            'Заработная плата',
            'Доставка товаров/сырья',
            'Транспортные расходы',
            'Командировочные расходы',
            'Аренда',
            'Коммунальные услуги',
            'Налоги',
            'Услуги связи',
            'Текущий ремонт',
            'Реклама',
            'Расходный материал',
            'Представительские расходы',
            'Брак/порча/списания',
            'Спонсорские/благотворительные расходы',
            'Прочие расходы по бизнесу',
            'Капитальные затраты',
            'Строительство, ремонт',
            'Покупка основных средств',
            'Затраты вне бизнеса',
            'Погашение кредитов',
            'Результат месяца'
        ]


        var vNames = [
            '!TotalRevenues',
            '!RevenuesService',
            '!RevenuesTrade',
            '!RevenuesAgriculture',
            '!RevenuesProduction',
            '!OtherSupply',
            '!IncomeFromOPIU',
            'SingleIncome',
            'IncomeFromSponsorship',
            '!Loans',
            'BankLoans',
            'PrivateLoans',
            'FinancialAid',
            '!CostOfMoney',
            'Wage',
            'DeliveryOfGoods',
            'Fare',
            'TravelExpenses',
            'Rent',
            'Utilities',
            'Taxes',
            'CommunicationServices',
            'Maintenance',
            'Advertising',
            'Consumables',
            'Hospitality',
            'MarriageDamageCancellation',
            'SponsorshipCharitableExpenses',
            'OtherBusinessExpenses',
            '!CapitalExpenditures',
            'ConstructionRepair',
            'PurchaseOfFixedAssets',
            'CostsOutOfBusiness',
            'RepaymentOfLoans',
            '!ResultOfTheMonth'
        ]
        for (var i = 0; i < positions.length; i++) {
            var l = initLine(positions[i], vNames[i]);
            if (l != undefined)
                lines.push(l);
        }

        return lines;
    }

    function initOpiu() {

        var lines = [];

        var positions = [
            'Выручка (Услуги)',
            'Себестоимость прод. товаров (Услуги)',
            'Маржа (Услуги)',
            'Валовая прибыль (Услуги)',

            'Выручка (Торговля)',
            'Себестоимость прод. товаров (Торговля)',
            'Маржа (Торговля)',
            'Валовая прибыль (Торговля)',

            'Выручка (С/Х)',
            'Себестоимость прод. товаров (С/Х)',
            'Маржа (С/Х)',
            'Валовая прибыль (С/Х)',

            'Выручка (Производство)',
            'Себестоимость прод. товаров (Производство)',
            'Маржа (Производство)',
            'Валовая прибыль (Производство)',

            'Итого Выручка',
            'Итого Валовая прибыль',
            'Итого расходы по бизнесу',
            'Заработная плата',
            'Доставка товаров/сырья',
            'Транспортные расходы',
            'Командировочные расходы',
            'Аренда',
            'Коммунальные услуги',
            'Налоги',
            'Услуги связи',
            'Текущий ремонт',
            'Реклама',
            'Расходный материал',
            'Представительские расходы',
            'Брак/порча/списания',
            'Спонсорские/благотворительные расходы',
            'Прочие расходы по бизнесу',
            'Прибыль по бизнесу',
            'Прочие расходы',
            'Семейные',
            'Оплата за обучение детей',
            'Помощь родителям/детям',
            'Посещение мероприятий',
            'Хобби/увлечения',
            'Путешествия семьей',
            'Выплата дивидендов',
            'Другое (расход)',
            'Прочие доходы',
            'Зарплата членов семьи',
            'Доход от сдачи в аренду недвижимсти',
            'Доход от неосновной деятельности клиента',
            'Другое (доход)',
            'Чистая прибыль',
            'Взнос по займу',
            'Соотношение взнос/прибыль',
            'Скорость товарооборота (Услуги)',
            'Скорость товарооборота (Торговля)',
            'Скорость товарооборота (С/Х)',
            'Скорость товарооборота (Производство)',
            'Рентабельность продаж (Услуги)',
            'Рентабельность продаж (Торговля)',
            'Рентабельность продаж (С/Х)',
            'Рентабельность продаж (Производство)',
        ]


        var vNames = [
            'RevenuesService',
            'CostOfGoodsService',
            '!MarginService',
            '!GrossProfitService',

            'RevenuesTrade',
            'CostOfGoodsTrade',
            '!MarginTrade',
            '!GrossProfitTrade',

            'RevenuesAgriculture',
            'CostOfGoodsAgriculture',
            '!MarginAgriculture',
            '!GrossProfitAgriculture',

            'RevenuesProduction',
            'CostOfGoodsProduction',
            '!MarginProduction',
            '!GrossProfitProduction',


            '!TotalRevenues',
            '!TotalGrossProfit',
            '!TotalExpensesForBusiness',
            'Wage',
            'DeliveryOfGoods',
            'Fare',
            'TravelExpenses',
            'Rent',
            'Utilities',
            'Taxes',
            'CommunicationServices',
            'Maintenance',
            'Advertising',
            'Consumables',
            'Hospitality',
            'MarriageDamageCancellation',
            'SponsorshipCharitableExpenses',
            'OtherBusinessExpenses',
            '!ProfitOnBusiness',
            '!OtherExpenses',
            'FamilyExpenses',
            'PaymentForTheEducationOfChildren',
            'AssistanceToParentsChildren',
            'AttendanceEvents',
            'Hobbies',
            'TravelingFamily',
            'DividendPayment',
            'OtherFamilyExpenses',
            '!OtherIncome',
            'SalaryOfFamilyMembers',
            'IncomeFromTheRentalOfImmovableProperty',
            "IncomeFromNonCoreActivitiesOfTheClient",
            'OtherIncomeOut',
            '!NetProfit',
            '!LoanPayment',
            '!ValueOfContributionProfit',
            '!SpeedOfTurnoverService',
            '!SpeedOfTurnoverTrade',
            '!SpeedOfTurnoverAgriculture',
            '!SpeedOfTurnoverProduction',
            '!ProfitabilityOfSalesService',
            '!ProfitabilityOfSalesTrade',
            '!ProfitabilityOfSalesAgriculture',
            '!ProfitabilityOfSalesProduction',
        ]
        for (var i = 0; i < positions.length; i++) {

            var l = initLine(positions[i], vNames[i]);
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


            //'Выручка',
            //'Себестоимость прод. товаров',
            //'Маржа',
            //'Валовая прибыль',
            //'Итого Выручка',
            //'Итого Валовая прибыль',
            //'Итого расходы по бизнесу',
            //'Заработная плата',
            //'Доставка товаров/сырья',
            //'Транспортные расходы',
            //'Командировочные расходы',
            //'Аренда',
            //'Коммунальные услуги',
            //'Налоги',
            //'Услуги связи',
            //'Текущий ремонт',
            //'Реклама',
            //'Расходный материал',
            //'Представительские расходы',
            //'Брак/порча/списания',
            //'Спонсорские/благотворительные расходы',
            //'Прочие расходы по бизнесу',
            //'Прибыль по бизнесу',
            //'Прочие расходы',
            //'Семейные',
            //'Оплата за обучение детей',
            //'Помощь родителям/детям',
            //'Посещение мероприятий',
            //'Хобби/увлечения',
            //'Путешествия семьей',
            //'Выплата дивидендов',
            //'Другое (расход)',
            //'Прочие доходы',
            //'Зарплата членов семьи',
            //'Доход от сдачи в аренду недвижимсти',
            //'Доход от неосновной деятельности клиента',
            //'Другое (доход)',
            //'Чистая прибыль',
            //'Взнос по займу',
            //'Соотношение взнос/прибыль',
            //'Скорость товарооборота',
            //'Рентабельность продаж'
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



            //'Revenues',
            //'CostOfGoods',
            //'!Margin',
            //'!GrossProfit',
            //'!TotalRevenues',
            //'!TotalGrossProfit',
            //'!TotalExpensesForBusiness',
            //'Wage',
            //'DeliveryOfGoods',
            //'Fare',
            //'TravelExpenses',
            //'Rent',
            //'Utilities',
            //'Taxes',
            //'CommunicationServices',
            //'Maintenance',
            //'Advertising',
            //'Consumables',
            //'Hospitality',
            //'MarriageDamageCancellation',
            //'SponsorshipCharitableExpenses',
            //'OtherBusinessExpenses',
            //'!ProfitOnBusiness',
            //'!OtherExpenses',
            //'FamilyExpenses',
            //'PaymentForTheEducationOfChildren',
            //'AssistanceToParentsChildren',
            //'AttendanceEvents',
            //'Hobbies',
            //'TravelingFamily',
            //'DividendPayment',
            //'OtherFamilyExpenses',
            //'!OtherIncome',
            //'SalaryOfFamilyMembers',
            //'IncomeFromTheRentalOfImmovableProperty',
            //"IncomeFromNonCoreActivitiesOfTheClient",
            //'OtherIncomeOut',
            //'!NetProfit',
            //'!LoanPayment',
            //'!ValueOfContributionProfit',
            //'!SpeedOfTurnover',
            //'!ProfitabilityOfSales'
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
        currentProject.CreditData = {};
        currentProject.FinancePlanning = {};
        currentProject.ProjectAnalysis = {};
        currentProject.ContractAnalysis = {};
        currentProject.BusinessInfo = {};
        currentProject.FinDataBalance = {};
        currentProject.FinDataCrossChecking = {};
        currentProject.FinDataOpiu = {};
        currentProject.FinDataOdds = {};
        currentProject.LargeExpenses = {};
        currentProject.Provision = {};
        currentProject.DataDamu = {};
        currentProject.Appendix = {};
        currentProject.Conclusion = {};
        currentProject.FinDataBalance.Table = {};
        //currentProject.FinDataBalance.Date = currentProject.ProjectContent.BalanceDate;
        dataInitilizer.setBalanceData(currentProject);
        //currentProject.ProjectContent = JSON.stringify(currentProject);
        this.currentProject = currentProject;
        return currentProject;
    }

    projectFactory.initProjectData = function (currentProject) {
        //var currentProject = this.currentProject;
        if (currentProject.ParentExists) {
            currentProject.ClientData = angular.copy(currentProject.ParentProject.ClientData);
            currentProject.CreditData = {};
            currentProject.FinancePlanning = {};
            currentProject.ProjectAnalysis = {};
            currentProject.ContractAnalysis = angular.copy(currentProject.ParentProject.ContractAnalysis);;
            currentProject.BusinessInfo = angular.copy(currentProject.ParentProject.BusinessInfo);
            currentProject.FinDataBalance = {};
            currentProject.FinDataCrossChecking = {};
            currentProject.FinDataOpiu = {};
            currentProject.FinDataOdds = {};
            currentProject.LargeExpenses = angular.copy(currentProject.ParentProject.LargeExpenses);
            currentProject.Provision = angular.copy(currentProject.ParentProject.Provision);
            currentProject.DataDamu = angular.copy(currentProject.ParentProject.DataDamu);
            currentProject.Conclusion = angular.copy(currentProject.ParentProject.ClientData);
        }
        dataInitilizer.setBalanceData(currentProject);

        this.currentProject = currentProject;
        return currentProject;
    }

    projectFactory.setData = function (currentProject) {

        currentProject.ClientData = currentProject.ProjectContent.ClientData;
        currentProject.ClientData.RegistrationDate = new Date(currentProject.ProjectContent.ClientData.RegistrationDate);
        currentProject.ClientData.ReRegistrationDate = new Date(currentProject.ProjectContent.ClientData.ReRegistrationDate);
        currentProject.ParentProject = currentProject.ProjectContent.ParentProject;
        currentProject.ParentExists = currentProject.ProjectContent.ParentExists;
        // alert(currentProject.ParentExists);
        currentProject.CreditData = currentProject.ProjectContent.CreditData;
        currentProject.FinancePlanning = currentProject.ProjectContent.FinancePlanning;
        currentProject.ProjectAnalysis = currentProject.ProjectContent.ProjectAnalysis;
        currentProject.BusinessInfo = currentProject.ProjectContent.BusinessInfo;
        currentProject.FinDataBalance = currentProject.ProjectContent.FinDataBalance;
        currentProject.FinDataBalance.Date = new Date(currentProject.FinDataBalance.Date);

        if (currentProject.ParentExists) {
            currentProject.FinDataBalance.PreviousDate = new Date(currentProject.ParentProject.FinDataBalance.Date);
        }

        currentProject.FinDataCrossChecking = currentProject.ProjectContent.FinDataCrossChecking;
        currentProject.FinDataOpiu = currentProject.ProjectContent.FinDataOpiu;
        //alert(JSON.stringify(currentProject.FinDataOpiu));
        if (JSON.stringify(currentProject.FinDataOpiu) == '{}') {
            currentProject.FinDataOpiu.Table = initOpiu();
        };
        currentProject.FinDataOdds = currentProject.ProjectContent.FinDataOdds;

        if (JSON.stringify(currentProject.FinDataOdds) == '{}') {
            currentProject.FinDataOdds.Table = initOdds();
        };

        if (JSON.stringify(currentProject.FinDataBalance.Table) == '{}') {
            currentProject.FinDataBalance.Table = balanceTableFactory.initBalanceTable(currentProject);
        };

        currentProject.LargeExpenses = currentProject.ProjectContent.LargeExpenses;
        currentProject.Provision = currentProject.ProjectContent.Provision;
        currentProject.DataDamu = currentProject.ProjectContent.DataDamu;
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

    projectFactory.initBalances = function (companies) {

        this.currentProject.FinDataBalance.Balances = balanceTableFactory.initBalances(companies);
    }


    projectFactory.setBalancesBalance = function(balance, companyId) {
        this.currentProject.FinDataBalance.Balances[companyId - 1].CompanyBalances[balance.Id - 1] = balance;
    }

    projectFactory.getActiveCompanyBalance = function (companyId) {
        return this.currentProject.FinDataBalance.Balances[companyId - 1];
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