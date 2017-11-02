blitzApp.factory('calculatorFactory', ['$rootScope', 'balanceCalculatorFactory', 'opiuCalculatorFactory', 'oddsCalculatorFactory', 'crossCheckCalculatorFactory', 'financePlanningCalculatorFactory', 'analyzeProjectCalculatorFactory', 'projectFactory', function ($rootScope, balanceCalculatorFactory, opiuCalculatorFactory, oddsCalculatorFactory, crossCheckCalculatorFactory, financePlanningCalculatorFactory, analyzeProjectCalculatorFactory, projectFactory) {
    var calculatorFactory = {};

    calculatorFactory.getFloat = function (value) {
        if (!isNaN(parseFloat(value)) && isFinite(value)) {
            return parseFloat(value);
        } else {
            return 0;
        }
    }

    calculatorFactory.calculateBalanceData = function (currentProject, balanceId, companyBalanceId) {
        currentProject = balanceCalculatorFactory.calculateData(currentProject, balanceId, companyBalanceId);
        currentProject = balanceCalculatorFactory.calculateConsolidatedBalance(currentProject);
        currentProject = crossCheckCalculatorFactory.calculateData(currentProject);
        projectFactory.setProject(currentProject);
    };

    calculatorFactory.calculateOpiuData = function (currentProject, opiu) {
        currentProject = opiuCalculatorFactory.calculateData(currentProject, opiu);
        currentProject = opiuCalculatorFactory.calculateConsolidatedData(currentProject);
        currentProject = crossCheckCalculatorFactory.calculateData(currentProject);
        projectFactory.setProject(currentProject);
    };

    calculatorFactory.calculateOddsData = function (currentProject) {
        oddsCalculatorFactory.calculateData(currentProject);
        projectFactory.setProject(currentProject);
    };

    calculatorFactory.calculateCrossCheckData = function (currentProject) {
        currentProject = crossCheckCalculatorFactory.calculateData(currentProject);
        projectFactory.setProject(currentProject);
    };

    calculatorFactory.calculateFinancePlanningData = function (currentProject) {
        currentProject = financePlanningCalculatorFactory.calculateData(currentProject);
        projectFactory.setProject(currentProject);
    };

    calculatorFactory.calculateCreditData = function (currentProject) {
        currentProject = financePlanningCalculatorFactory.calculateCreditData(currentProject);
        projectFactory.setProject(currentProject);
    };

    calculatorFactory.calculateProjectAnalyzeData = function (currentProject) {
        currentProject = analyzeProjectCalculatorFactory.calculateData(currentProject);
        projectFactory.setProject(currentProject);
    };

    calculatorFactory.calculateData = function (currentProject) {
        console.log(currentProject);
    }

    return calculatorFactory;

}]);