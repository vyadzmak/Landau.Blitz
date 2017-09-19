var dashBoardController = function($scope, $http, $location, $state, $rootScope, $window, $cookies, usSpinnerService, Idle, Keepalive, $uibModal, projectHttpService, promiseUtils, httpService, projectFactory) {
    $scope.showProjectMenu = true;
    $scope.profileShowing = false;
    var dash = function() {
        // $scope.serviceStateId = 1;
        $scope.userData = JSON.parse($window.sessionStorage.getItem("UserData"));
        //console.log(JSON.stringify($scope.userData));
        switch ($scope.userData.UserRoleId) {
            case 1:
                $state.go("main.dashboard.companies");
                break;

                // case 2:

            case 2:
                $state.go("main.dashboard.companies");
                break;

            case 3:
                $state.go("main.dashboard.projects");
                break;

            default:
                $state.go("main.login");
                break;
        }
        $scope.loadData = false;

    };
    dash();

    $scope.loadDocument = function() {
        projectHttpService.getDocumentByProjectId($http, $scope, usSpinnerService, $rootScope.currentProjectId, false);
    }

    $scope.exportDocument = function() {
        projectHttpService.manageProject($http, $scope, usSpinnerService, projectFactory.getToCurrentProject(), false);
        console.log("Save project before export");
        //export function

        var url = $$ApiUrl + "/exportProject";
        $http({
            method: 'GET',
            url: url,
            params: { id: projectFactory.getToCurrentProject().Id },
            responseType: 'arraybuffer'
        }).success(function(data, status, headers) {
            headers = headers();

            var filename = headers['x-filename'];
            var contentType = headers['content-type'];

            var linkElement = document.createElement('a');
            try {
                var blob = new Blob([data], { type: contentType });
                var url = window.URL.createObjectURL(blob);

                linkElement.setAttribute('href', url);
                linkElement.setAttribute("download", filename);

                var clickEvent = new MouseEvent("click", {
                    "view": window,
                    "bubbles": true,
                    "cancelable": false
                });
                linkElement.dispatchEvent(clickEvent);
            } catch (ex) {
                console.log(ex);
            }
        }).error(function(data) {
            console.log(data);
        });
    }
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



};


blitzApp.controller("dashBoardController", ["$scope", "$http", "$location", "$state", "$rootScope", "$window", "$cookies", "usSpinnerService", "Idle", "Keepalive", "$uibModal", "projectHttpService", "promiseUtils", "httpService", "projectFactory", dashBoardController]);