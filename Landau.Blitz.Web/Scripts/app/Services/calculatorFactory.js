blitzApp.factory('calculatorFactory', ['$rootScope', 'balanceCalculatorFactory', 'opiuCalculatorFactory', 'oddsCalculatorFactory', 'crossCheckCalculatorFactory', 'financePlanningCalculatorFactory', 'analyzeProjectCalculatorFactory', function($rootScope, balanceCalculatorFactory, opiuCalculatorFactory, oddsCalculatorFactory, crossCheckCalculatorFactory, financePlanningCalculatorFactory, analyzeProjectCalculatorFactory) {
    var calculatorFactory = {};
    var currentProject = {};

    var calculateBalanceData = function(currentProject) {
        balanceCalculatorFactory.calculateData(currentProject);

    };

    var calculateOpiuData = function(currentProject) {
        opiuCalculatorFactory.calculateData(currentProject);

    };

    var calculateOddsData = function(currentProject) {
        oddsCalculatorFactory.calculateData(currentProject);

    };

    var calculateCrossCheckData = function(currentProject) {
        crossCheckCalculatorFactory.calculateData(currentProject);

    };

    var calculateFinancePlanningData = function(currentProject) {
        financePlanningCalculatorFactory.calculateData(currentProject);

    };

    var calculateProjectAnalyzeData = function(currentProject) {
        analyzeProjectCalculatorFactory.calculateData(currentProject);

    };

    calculatorFactory.calculateData = function(currentProject) {
        calculateBalanceData(currentProject);
        calculateOpiuData(currentProject);
        calculateOddsData(currentProject);
        calculateCrossCheckData(currentProject);
        calculateFinancePlanningData(currentProject);
        calculateProjectAnalyzeData(currentProject);
    }



    return calculatorFactory;

}]);