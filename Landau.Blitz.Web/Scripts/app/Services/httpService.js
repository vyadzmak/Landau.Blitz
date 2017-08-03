blitzApp.service('httpService', function($q, $timeout, $http) {

    //single get by ID
    this.getRequestById = function($http, $scope, usSpinnerService, url, rParams) {
        usSpinnerService.spin("spinner-1");

        return $http.get(url, {
                params: rParams
            })
            .success(function(result) {

                usSpinnerService.stop('spinner-1');
                $scope.loading = false;
                return result;
            });
    }

    this.getDRequestById = function($http, $scope, usSpinnerService, url, rParams) {
        usSpinnerService.spin("spinner-1");

        return $http.get(url, {
                params: rParams
            })
            .success(function(data, status, headers) {
                headers = headers();

                var filename = headers['x-file-name'];
                var contentType = headers['content-type'];

                var blob = new Blob([data], { type: contentType });

                //Check if user is using IE
                var ua = window.navigator.userAgent;
                var msie = ua.indexOf("MSIE ");

                if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                    window.navigator.msSaveBlob(blob, filename);
                } else // If another browser, return 0
                {
                    //Create a url to the blob
                    var url = window.URL.createObjectURL(blob);
                    var linkElement = document.createElement('a');
                    linkElement.setAttribute('href', url);
                    linkElement.setAttribute("download", filename);

                    //Force a download
                    var clickEvent = new MouseEvent("click", {
                        "view": window,
                        "bubbles": true,
                        "cancelable": false
                    });
                    linkElement.dispatchEvent(clickEvent);
                }
                usSpinnerService.stop('spinner-1');
                $scope.loading = false;
                return result;
            });
    }

    //get to list
    this.getRequestList = function($http, $scope, usSpinnerService, url) {
        usSpinnerService.spin("spinner-1");
        //$scope.loading = true;

        return $http.get(url).success(function(result) {
                usSpinnerService.stop('spinner-1');
                $scope.loading = false;
                return result;
            },
            function(result) {
                showNotify("Error", "Ошибка при загрузке", "danger");
                usSpinnerService.stop('spinner-1');
                $scope.loading = false;
            });
    }


    //post request
    this.postRequest = function($http, $scope, usSpinnerService, url, rParams) {
        usSpinnerService.spin("spinner-1");
        //$scope.loading = true;

        return $http.post(url, rParams.data, rParams.config).success(function(result) {
                showNotify("Success", "Данные добавлены", "success");
                usSpinnerService.stop('spinner-1');
                $scope.loading = false;
                return result;
            },
            function(result) {
                showNotify("Error", "Ошибка при выполнении POST-запроса", "danger");
                usSpinnerService.stop('spinner-1');
                $scope.loading = false;
            });
    }

    //put request
    this.putRequest = function($http, $scope, usSpinnerService, url, rParams) {
        usSpinnerService.spin("spinner-1");
        //$scope.loading = true;

        return $http.put(url, rParams.data, rParams.config).success(function(result) {
                showNotify("Success", "Данные обновлены", "success");
                usSpinnerService.stop('spinner-1');
                $scope.loading = false;
                return result;
            },
            function(result) {
                showNotify("Error", "Ошибка при выполнении PUT-запроса", "danger");
                usSpinnerService.stop('spinner-1');
                $scope.loading = false;
            });
    }

    //delete by ID
    this.deleteRequest = function($http, $scope, usSpinnerService, url, rParams) {


        usSpinnerService.spin("spinner-1");

        return $http.delete(url, {
                params: rParams
            })
            .success(function(result) {
                    if (result == "OK") {
                        usSpinnerService.stop('spinner-1');
                        showNotify("Success", "Данные удалены", "success");

                        $scope.loading = false;
                        return result;
                    } else {
                        showNotify("Error", "Ошибка при выполнении удаления", "danger");
                        usSpinnerService.stop('spinner-1');
                        $scope.loading = false;
                    }
                },
                function(result) {
                    showNotify("Error", "Ошибка при выполнении удаления", "danger");
                    usSpinnerService.stop('spinner-1');
                    $scope.loading = false;
                });
    }
});