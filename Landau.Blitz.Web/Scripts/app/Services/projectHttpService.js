blitzApp.service('projectHttpService', function () {

    this.getToProjectById = function ($http, $scope, usSpinnerService, projectId) {
        var url = $$ApiUrl + "/projects";
        $scope.currentProject = {};

        usSpinnerService.spin("spinner-1");

        $http.get(url, {
            params: { id: projectId }
        })

        .then(function (response) {
            // alert(JSON.stringify(response.data));
            $scope.currentProject = null;
            if (JSON.parse(response.data) != null) {
                $scope.currentProject = JSON.parse(response.data);
                $scope.currentProject.ProjectContent = JSON.parse($scope.currentProject.ProjectContent);
            }
            //$scope.user = angular.copy($scope.currentUser);
            usSpinnerService.stop('spinner-1');
            $scope.loading = false;
            window.scope = $scope;
            $scope.setProject();
        });


    }

    this.getDocumentByProjectId = function ($http, $scope, usSpinnerService, projectId, reload) {
        var url = $$ApiUrl + "/document";

        $http.get(url,
        {
            params: { id: projectId }
        }).then(function (response) {
            $scope.loadData = false;
            if (reload) {
                $scope.init();
                $scope.currentProject = JSON.parse(response.data);
            }
            usSpinnerService.stop('spinner-1');

        });
    }



    //add or Edit company
    this.manageProject = function ($http, $scope, usSpinnerService, currentProject, reload) {
        var url = $$ApiUrl + "/projects";

        var pModel = {};
        pModel.Name = currentProject.Name;
        pModel.CreatorId = currentProject.UserId;
        pModel.Content = JSON.stringify(currentProject);
        pModel.Id = currentProject.Id;

        if (reload)
            usSpinnerService.spin("spinner-1");
        var methodType = "POST";
        if (pModel.Id != -1 && pModel.Id != undefined) {
            methodType = "PUT";
        }


        $http({
            url: url,
            method: methodType,
            contentType: "application/json",
            data: pModel
        })
            .then(function (response) {
                $scope.loadData = false;
                if (reload) {
                    $scope.init();
                    $scope.currentProject = JSON.parse(response.data);
                }
                usSpinnerService.stop('spinner-1');

            },
                function (response) { // optional
                    // failed
                    usSpinnerService.stop('spinner-1');
                    showNotify("Ошибка", "Ошибка при работе с проектом", "danger");
                });
    }

    this.uploadImages = function ($http, $scope, $state, fUrl, usSpinnerService, data, fileContainer, files) {

        var objXhr = new XMLHttpRequest();
        objXhr.onreadystatechange = stateChange;
        objXhr.upload.onprogress = updateProgress;


        // SEND FILE DETAILS TO THE API.
        objXhr.open("POST", fUrl);
        objXhr.send(data);

        //statechange listener
        function stateChange() {
            if (objXhr.readyState == 4) {// 4 = "DONE"
                if (objXhr.status == 200) {// 200 = OK
                    if (JSON.parse(objXhr.response) != null) {
                        var responseFiles = JSON.parse(objXhr.response);
                        angular.forEach(responseFiles, function (rFile, rKey) {
                            fileContainer.push(rFile);
                            $scope.remapIds(fileContainer);
                        });
                        files.splice(0, files.length);
                        showNotify("Успех", "Загрузка прошла успешно.", "success");
                    } else {
                        showNotify("Успех", "Ошибка загрузки файлов", "danger");
                    }
                }
                else {
                    showNotify("Успех", "Ошибка сервера. Обратитесь к администратору. Код ошибки: " +
                            objXhr.status + " " + objXhr.statusText, "danger");
                }
                $scope.$apply();
                usSpinnerService.stop('spinner-1');
            }
        }
        function updateProgress(evt) {
            if (evt.lengthComputable) {
                var percentComplete = (evt.loaded / evt.total) * 100;
                document.getElementById("proBar").style.width = percentComplete + "%";
            }
            else { console.log('unable to compute'); }
        }

    }
});