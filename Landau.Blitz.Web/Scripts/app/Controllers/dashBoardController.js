﻿(function() {
    var dashBoardController = function($scope, $http, $location, $state, $rootScope, $window, $cookies, usSpinnerService, Idle, Keepalive, $uibModal) {

        $scope.profileShowing = false;
        var dash = function() {
            // $scope.serviceStateId = 1;
            $scope.userData = JSON.parse($window.sessionStorage.getItem("UserData"));
            console.log(JSON.stringify($scope.userData));
            switch ($scope.userData.UserRoleId) {
                case 1:
                    $state.go("main.dashboard.companies");
                    break;

                    // case 2:
                    // case 3:
                    //     $state.go("main.dashboard.single");
                    //     break;

                default:
                    $state.go("main.login");
                    break;
            }
            $scope.loadData = false;

        };
        dash();

        $scope.exitQuestion = function() {
            var dialog = BootstrapDialog.confirm({
                title: 'Предупреждение',
                message: 'Вы действительно хотите выйти?',
                type: BootstrapDialog.TYPE_WARNING,
                size: BootstrapDialog.SIZE_SMALL,
                closable: true,
                btnCancelLabel: 'Нет',
                btnOKLabel: 'Да',
                btnOKClass: 'btn-warning',
                callback: function(result) {
                    if (result) {
                        $scope.exitApp();
                    }
                }
            });
            dialog.setSize(BootstrapDialog.SIZE_SMALL);
        };

        $scope.exitApp = function() {

                for (var key in $rootScope.sockets) {
                    $rootScope.sockets[key].emit('dis');
                    $rootScope.sockets[key].disconnect(true);
                }

                $rootScope.sockets = undefined;
                $rootScope.socketsActive = false;
                $cookies.remove("UserData", { path: "/" });
                $window.sessionStorage.clear();
                $state.go("main.login");
            }
            /// add a session timeout
        $scope.started = false;

        function closeModals() {
            if ($scope.warning) {
                $scope.warning.close();
                $scope.warning = null;
            }
        }

        $scope.$on('IdleStart', function() {
            closeModals();
            $scope.warning = $uibModal.open({
                templateUrl: 'warning-dialog.html',
                windowClass: 'modal-danger'
            });
        });

        $scope.$on('IdleEnd', function() {
            closeModals();
        });

        $scope.$on('IdleTimeout', function() {
            closeModals();
            $scope.exitApp();
        });

        $scope.start = function() {
            closeModals();
            Idle.watch();
            $scope.started = true;
        };
        $scope.start();

        //     //navigate
        //     $scope.selectService = function(serviceId, anchor, isAvailable) {
        //         if (serviceId == $scope.serviceStateId) return;
        //         if (!isAvailable && serviceId !== 5 && serviceId !== 6) {
        //             serviceId = 6;
        //         }
        //         $scope.serviceStateId = serviceId;
        //         switch (serviceId) {
        //             case 1:
        //                 $state.go("main.dashboard.single");
        //                 break;

        //             case 2:
        //                 $state.go("main.dashboard.batch");
        //                 break;

        //             case 3:
        //                 $state.go("main.dashboard.ftplibrary");
        //                 break;

        //             case 4:
        //                 $state.go("main.dashboard.emaillibrary");
        //                 break;

        //             case 5:
        //                 $state.go("main.dashboard.profile");
        //                 break;

        //             case 6:
        //                 $state.go("main.dashboard.store", { '#': anchor });
        //                 break;

        //         }
        //     };

    };


    blitzApp.controller("dashBoardController", ["$scope", "$http", "$location", "$state", "$rootScope", "$window", "$cookies", "usSpinnerService", "Idle", "Keepalive", "$uibModal", dashBoardController]);
}())