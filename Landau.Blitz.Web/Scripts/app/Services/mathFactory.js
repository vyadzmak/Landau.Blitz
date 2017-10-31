blitzApp.factory('mathFactory', ['$rootScope', function ($rootScope) {
    var mathFactory = {};

    mathFactory.getFloat = function (value) {
        if (!isNaN(parseFloat(value)) && isFinite(value)) {
            return parseFloat(value);
        } else {
            return 0;
        }
    }
    
    return mathFactory;

}]);