﻿(function() {
    var loginController = function($scope, $http, $location, $state, $rootScope, $window, usSpinnerService, $cookies) {
        var url = $$ApiUrl + "/login";
        $scope.rememberMe = false;

        // $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
        $scope.loadData = false;
        $scope.loginUser = function() {
            if ($scope.loginForm.$invalid) {
                $scope.submitted = true;
                return;
            }
            //$state.go("main.dashboard");

            usSpinnerService.spin('spinner-1');

            // $scope.loadData = true;

            $scope.model = {};
            $scope.model.Id = -1;
            $scope.model.UserId = -1;
            $scope.model.UserLogin = $scope.Login;
            $scope.model.UserPassword = $scope.Password;
            $scope.loadData = false;

            $http({
                    url: url,
                    method: 'POST',
                    //headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    data: $scope.model
                })
                .then(function(response) {
                        usSpinnerService.stop('spinner-1');
                        $scope.loadData = false;

                        var authModel = JSON.parse(response.data);
                        console.log(JSON.stringify(authModel));
                        if (authModel.Error != null) {

                            var dialog = new BootstrapDialog({
                                type: BootstrapDialog.TYPE_DANGER,
                                size: BootstrapDialog.SIZE_SMALL,
                                title: authModel.Error.InnerException,
                                message: "<div style='text-align:center'>" + authModel.Error.Exception + "</br>" + authModel.Error.InnerException + "</div>"
                            });
                            dialog.setSize(BootstrapDialog.SIZE_SMALL);
                            dialog.open();
                        } else if (authModel.UserLoginStateId == 3) {
                            var dialog = new BootstrapDialog({
                                type: BootstrapDialog.TYPE_WARNING,
                                size: BootstrapDialog.SIZE_SMALL,
                                title: "Пользователь заблокирован",
                                message: "<div style='text-align:center'>Данный пользователь заблокирован. За более подробной информацией обратитесь к администратору.</div>"
                            });
                            dialog.setSize(BootstrapDialog.SIZE_SMALL);
                            dialog.open();
                        } else {
                            if ($scope.rememberMe) {
                                var expireDate = new Date();
                                expireDate.setDate(expireDate.getDate() + 10);
                                $cookies.putObject("UserData", authModel, { expires: expireDate, path: "/" });
                            }
                            $window.sessionStorage.setItem("UserData", JSON.stringify(authModel));

                            $state.go("main.dashboard");

                        }

                        // success
                    },
                    function(response) { // optional
                        // failed
                    });


        };


        setTimeout(function() {
                $("#password")
                    .keypress(function(e) {
                        if (e.charCode == 13) {
                            $scope.loginUser();
                        }
                    });
            },
            250);

        $scope.restoreUser = function() {
            $state.go("main.restore");
        }

        $scope.registrationUser = function() {
            $state.go("main.registration");
        }
    };



    blitzApp.controller("loginController", ["$scope", "$http", "$location", "$state", "$rootScope", "$window", "usSpinnerService", "$cookies", loginController]);
}())