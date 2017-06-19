blitzApp.factory('calculatorFactory', ['$rootScope', 'balanceCalculatorFactory', 'opiuCalculatorFactory', 'crossCheckCalculatorFactory', 'financePlanningCalculatorFactory', function($rootScope, balanceCalculatorFactory, opiuCalculatorFactory, crossCheckCalculatorFactory, financePlanningCalculatorFactory) {
    var calculatorFactory = {};
    var currentProject = {};

    var calculateBalanceData = function(currentProject) {
        balanceCalculatorFactory.calculateData(currentProject);

    };

    var calculateOpiuData = function(currentProject) {
        opiuCalculatorFactory.calculateData(currentProject);

    };

    var calculateCrossCheckData = function(currentProject) {
        crossCheckCalculatorFactory.calculateData(currentProject);

    };

    var calculateFinancePlanningData = function(currentProject) {
        financePlanningCalculatorFactory.calculateData(currentProject);

    };

    calculatorFactory.calculateData = function(currentProject) {
        calculateBalanceData(currentProject);
        calculateOpiuData(currentProject);
        calculateCrossCheckData(currentProject);
        calculateFinancePlanningData(currentProject);
    }



    return calculatorFactory;

}]);