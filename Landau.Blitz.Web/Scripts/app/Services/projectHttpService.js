blitzApp.service('projectHttpService', function() {

    this.getToProjectById = function($http, $scope, usSpinnerService, projectId) {
        var url = $$ApiUrl + "/projects";
        $scope.currentProject = {};

        usSpinnerService.spin("spinner-1");

        $http.get(url, {
            params: { id: projectId }
        })

        .then(function(response) {
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


    //add or Edit company
    this.manageProject = function($http, $scope, usSpinnerService, currentProject, reload) {
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
            .then(function(response) {
                    $scope.loadData = false;
                    if (reload) {
                        $scope.init();
                        $scope.currentProject = JSON.parse(response.data);
                    }
                    usSpinnerService.stop('spinner-1');

                },
                function(response) { // optional
                    // failed
                    usSpinnerService.stop('spinner-1');
                    showNotify("Ошибка", "Ошибка при работе с проектом", "danger");
                });
    }
});