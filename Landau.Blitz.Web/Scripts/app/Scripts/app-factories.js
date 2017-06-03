blitzApp.factory('blitzFactory', function($window, $cookies) {
    fData = [];

    if ($cookies.getObject("AuthData")) {
        $window.sessionStorage.setItem("UserData", JSON.stringify($cookies.getObject("UserData")));
        $window.sessionStorage.setItem("AuthData", JSON.stringify($cookies.getObject("AuthData")));
        $window.sessionStorage.setItem("PhoneMask", JSON.stringify($cookies.getObject("PhoneMask")));
    }
    if ($window.sessionStorage.getItem("AuthData")) {
        fData["AuthData"] = JSON.parse($window.sessionStorage.getItem("AuthData"));
        fData["UserData"] = JSON.parse($window.sessionStorage.getItem("UserData"));
        fData["PhoneMask"] = JSON.parse($window.sessionStorage.getItem("PhoneMask"));
    }

    if ($window.sessionStorage.getItem("SightsData")) {
        fData["SightsData"] = JSON.parse($window.sessionStorage.getItem("SightsData"));
    }

    if ($window.sessionStorage.getItem("MenuData")) {
        fData["MenuData"] = JSON.parse($window.sessionStorage.getItem("MenuData"));
    }

    if ($window.sessionStorage.getItem("AdminDishesData")) {
        fData["AdminDishesData"] = JSON.parse($window.sessionStorage.getItem("AdminDishesData"));
    }

    if ($window.sessionStorage.getItem("CurrentOrder")) {
        fData["CurrentOrder"] = JSON.parse($window.sessionStorage.getItem("CurrentOrder"));
    }

    if ($window.sessionStorage.getItem("Orders")) {
        fData["Orders"] = JSON.parse($window.sessionStorage.getItem("Orders"));
    }

    if ($window.sessionStorage.getItem("SightsAddressData")) {
        fData["SightsAddressData"] = JSON.parse($window.sessionStorage.getItem("SightsAddressData"));
    }

    if ($window.sessionStorage.getItem("CurrentMapUnit")) {
        fData["CurrentMapUnit"] = JSON.parse($window.sessionStorage.getItem("CurrentMapUnit"));
    }

    if ($window.sessionStorage.getItem("CurrentCompany")) {
        fData["CurrentCompany"] = JSON.parse($window.sessionStorage.getItem("CurrentCompany"));
    }

    if ($window.sessionStorage.getItem("CurrentShift")) {
        fData["CurrentShift"] = JSON.parse($window.sessionStorage.getItem("CurrentShift"));
    }
    return {
        setItem: function(key, data) {
            fData[key] = data;
            $window.sessionStorage.setItem(key, JSON.stringify(data));
        },
        getItem: function(key) {
            return fData[key];
        }
    }
});