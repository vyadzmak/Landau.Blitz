var appendixController = function ($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, projectFactory, projectHttpService) {
    usSpinnerService.stop("spinner-1");

    $scope.init = function() {
        $scope.currentProject = projectFactory.getToCurrentProject();
        $scope.files = [];
        var dropZone = document.getElementById('drop-zone');

        $scope.uploadImages = function () {
            if ($scope.files.length > 0) {
                $scope.showProgressBar = true;
                usSpinnerService.spin('spinner-1');
                var data = new FormData();

                for (var i = 0; i < $scope.files.length; i++) {
                    data.append("uploadedFile" + i, $scope.files[i]);
                }
                if (!$scope.currentProject.Appendix.Images) {
                    $scope.currentProject.Appendix.Images = [];
                }

                var fUrl = $$ApiUrl + "/gallery/";
                projectHttpService.uploadImages($http, $scope, $state, fUrl, usSpinnerService, data, $scope.currentProject.Appendix.Images, $scope.files);
            } else {
                BootstrapDialog.alert({
                    title: 'Внимание',
                    message: 'Не выбрано ни одного файла!',
                    type: BootstrapDialog.TYPE_WARNING,
                    closable: true
                });
            }
        }

        $scope.addThruChoice = function (element) {
            $scope.addToScopeFiles(element.files);
        }

        $scope.removeFromFiles = function (files, fileName) {
            var index = files.findIndex(function (value) {
                return value.name === fileName;
            });
            if (index !== -1) {
                files.splice(index, 1);
            }
        }

        $scope.addToScopeFiles = function (files) {
            $scope.showProgressBar = false;
            document.getElementById("proBar").style.width = "0%";
            var uploadFiles = files;
            for (var i = 0; i < uploadFiles.length; i++) {
                var found = false;
                for (var j = 0; j < $scope.files.length; j++) {
                    if ($scope.files[j].name == uploadFiles[i].name) {
                        found = true;
                    }
                }
                if (!found) { $scope.files.push(uploadFiles[i]); }
            }
            $scope.$apply();
        }

        //delete images from gallery
        if (!$scope.serverImages) { $scope.serverImages = []; }
        $scope.removeFromServerFiles = function (deleteImages, images) {
            if (deleteImages.length > 0) {
                for (var i = 0; i < deleteImages.length; i++) {
                    var index = images.findIndex(function (value) {
                        return value.Id === deleteImages[i];
                    });
                    if (index !== -1) {
                        images.splice(index, 1);
                    }
                }
                deleteImages.splice(0, deleteImages.length);
            } else {
                BootstrapDialog.alert({
                    title: 'Внимание',
                    message: 'Не выбрано ни одного файла!',
                    type: BootstrapDialog.TYPE_WARNING,
                    closable: true
                });
            }
        }

        dropZone.ondrop = function (e) {
            e.preventDefault();
            this.className = 'upload-drop-zone';
            var resultFiles = [];
            angular.forEach(e.dataTransfer.files, function (value, key) {
                if (value.type.indexOf('image/') === 0) {
                    resultFiles.push(value);
                }
            });
            $scope.addToScopeFiles(resultFiles);
        }

        dropZone.ondragover = function () {
            this.className = 'upload-drop-zone drop';
            return false;
        }

        dropZone.ondragleave = function () {
            this.className = 'upload-drop-zone';
            return false;
        }
    };
    $scope.init();

    $scope.remapIds = function (rows) {
        angular.forEach(rows, function (value, key) {
            value.Id = key + 1;
        });
    }
    
};
blitzApp.controller("appendixController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "projectFactory", "projectHttpService", appendixController]);