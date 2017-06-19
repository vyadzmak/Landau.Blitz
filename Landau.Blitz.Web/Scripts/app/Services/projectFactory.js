blitzApp.factory('projectFactory', ['$rootScope', 'clientDataInitializer', 'dataInitializer', function($rootScope, clientDataInitializer, dataInitilizer) {
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
    //------end views data ---//
    function initLine(title, varName) {
        var line = {};
        line.Title = title;

        var calc = false;
        if (varName.indexOf("!") != -1) {
            calc = true;
            varName = varName.replace('!', '');
        }

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
    }

    function initOpiu() {

        var lines = [];

        var positions = [
            'Выручка',
            'Себестоимость прод. товаров',
            'Маржа',
            'Валовая прибыль',
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
            'Другое',
            'Прочие доходы',
            'Зарплата членов семьи',
            'Доход от сдачи в аренду недвижимсти',
            'Доход от неосновной деятельности клиента',
            'Другое',
            'Чистая прибыль',
            'Взнос по займу',
            'Соотношение взнос/прибыль',
            'Скорость товарооборота',
            'Рентабельность продаж'

        ]


        var vNames = [
            'Revenues',
            'CostOfGoods',
            '!Margin',
            '!GrossProfit',
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
            '!SpeedOfTurnover',
            '!ProfitabilityOfSales'
        ]
        for (var i = 0; i < positions.length; i++) {
            lines.push(initLine(positions[i], vNames[i]));
        }

        return lines;
    }

    //-------------------------------init functions --------------------------------------//
    projectFactory.initProject = function() {
        currentProject = {};
        currentProject.Id = -1;
        currentProject.Name = "";
        currentProject.CreatorId = 1;
        currentProject.ClientData = {};
        //clientDataInitializer.setClientData(currentProject);
        currentProject.CreditData = {};
        currentProject.FinancePlanning = {};
        currentProject.ProjectAnalysis = {};
        currentProject.BusinessInfo = {};
        currentProject.FinDataBalance = {};
        currentProject.FinDataCrossChecking = {};
        currentProject.FinDataOpiu = {};
        currentProject.FinDataOdds = {};
        currentProject.LargeExpenses = {};
        currentProject.Provision = {};
        currentProject.DataDamu = {};
        currentProject.Conclusion = {};

        dataInitilizer.setBalanceData(currentProject);
        //currentProject.ProjectContent = JSON.stringify(currentProject);
        this.currentProject = currentProject;
        return currentProject;
    }

    projectFactory.setData = function(currentProject) {

        currentProject.ClientData = currentProject.ProjectContent.ClientData;
        currentProject.ClientData.RegistrationDate = new Date(currentProject.ProjectContent.ClientData.RegistrationDate);
        currentProject.ClientData.ReRegistrationDate = new Date(currentProject.ProjectContent.ClientData.ReRegistrationDate);

        currentProject.CreditData = currentProject.ProjectContent.CreditData;;
        currentProject.FinancePlanning = currentProject.ProjectContent.FinancePlanning;
        currentProject.ProjectAnalysis = currentProject.ProjectContent.ProjectAnalysis;
        currentProject.BusinessInfo = currentProject.ProjectContent.BusinessInfo;
        currentProject.FinDataBalance = currentProject.ProjectContent.FinDataBalance;
        currentProject.FinDataBalance.Date = new Date(currentProject.FinDataBalance.Date);
        currentProject.FinDataBalance.PreviousDate = new Date(currentProject.FinDataBalance.PreviousDate);

        currentProject.FinDataCrossChecking = currentProject.ProjectContent.FinDataCrossChecking;
        currentProject.FinDataOpiu = currentProject.ProjectContent.FinDataOpiu;
        //alert(JSON.stringify(currentProject.FinDataOpiu));
        if (JSON.stringify(currentProject.FinDataOpiu) == '{}') {
            currentProject.FinDataOpiu.Table = initOpiu();
        };
        currentProject.FinDataOdds = currentProject.ProjectContent.FinDataOdds;
        currentProject.LargeExpenses = currentProject.ProjectContent.LargeExpenses;
        currentProject.Provision = currentProject.ProjectContent.Provision;
        currentProject.DataDamu = currentProject.ProjectContent.DataDamu;
        currentProject.Conclusion = currentProject.ProjectContent.Conclusion;

        currentProject.ProjectContent = {};
        this.currentProject = currentProject;
        return currentProject;
    }

    projectFactory.initClientData = function() {
        currentProject.ClientData = {};
    }

    projectFactory.getToCurrentProject = function() {
            return this.currentProject;
        }
        //-------------------------------end init functions ---------------------------------//

    return projectFactory;

}]);