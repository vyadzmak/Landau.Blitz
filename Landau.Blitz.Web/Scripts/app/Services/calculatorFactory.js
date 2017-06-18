blitzApp.factory('calculatorFactory', ['$rootScope', 'balanceCalculatorFactory', function($rootScope, balanceCalculatorFactory) {
    var calculatorFactory = {};
    var currentProject = {};

    var calculateBalanceData = function(currentProject) {
        balanceCalculatorFactory.calculateData(currentProject);

    };

    calculatorFactory.calculateData = function(currentProject) {
        calculateBalanceData(currentProject);
    }



    return calculatorFactory;

}]);