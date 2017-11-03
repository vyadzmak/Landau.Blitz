blitzApp.factory('mathFactory', ['$rootScope', function ($rootScope) {
    var mathFactory = {};

    mathFactory.getFloat = function (value) {
        if (!isNaN(parseFloat(value)) && isFinite(value)) {
            return parseFloat(value);
        } else {
            return 0;
        }
    }

    mathFactory.round = function (value, precision) {

        var result = Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
        return result;

    }

    return mathFactory;

}]);