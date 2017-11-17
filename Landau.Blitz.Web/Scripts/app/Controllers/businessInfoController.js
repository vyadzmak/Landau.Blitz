var businessInfoController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, NgTableParams, projectFactory, projectHttpService) {
    usSpinnerService.stop("spinner-1");

    $scope.init = function() {
        $scope.currentProject = projectFactory.getToCurrentProject();
        $scope.files = [];
        var dropZone = document.getElementById('drop-zone');

        $scope.uploadImages = function() {
            if($scope.files.length > 0){
                $scope.showProgressBar = true;
                usSpinnerService.spin('spinner-1');
                var data = new FormData();
                
                for (var i = 0; i<$scope.files.length; i++) {
                    data.append("uploadedFile"+i, $scope.files[i]);
                }
                if (!$scope.currentProject.BusinessInfo.Images) {
                    $scope.currentProject.BusinessInfo.Images = [];
                }

                var fUrl = $$ApiUrl + "/gallery/";
                projectHttpService.uploadImages($http, $scope, $state, fUrl, usSpinnerService, data, $scope.currentProject.BusinessInfo.Images, $scope.files);
            } else{BootstrapDialog.alert({
                title: 'Внимание',
                message: 'Не выбрано ни одного файла!',
                type: BootstrapDialog.TYPE_WARNING,
                closable: true
            });}
        }

        $scope.addThruChoice = function(element){
            $scope.addToScopeFiles(element.files);
        }
        
        $scope.removeFromFiles = function(files, fileName){
            var index = files.findIndex(function(value) {
                return value.name === fileName;
            });
            if(index!==-1){
                files.splice(index,1);
            }
        }

        $scope.addToScopeFiles = function(files){
            $scope.showProgressBar = false;
            document.getElementById("proBar").style.width = "0%";    
            var uploadFiles = files;
            for(var i = 0; i<uploadFiles.length; i++){
                var found = false;
                for(var j=0; j<$scope.files.length; j++){
                    if($scope.files[j].name==uploadFiles[i].name){
                        found = true;
                    }
                }
                if(!found){$scope.files.push(uploadFiles[i]);}
            }
            $scope.$apply();
        }

        //delete images from gallery
        if (!$scope.serverImages) { $scope.serverImages = []; }
        $scope.removeFromServerFiles = function(deleteImages, images){
            if(deleteImages.length > 0){
                for(var i=0; i<deleteImages.length; i++){
                    var index = images.findIndex(function(value) {
                        return value.Id === deleteImages[i];
                    });
                    if(index!==-1){
                        images.splice(index,1);
                    }
                }
                deleteImages.splice(0, deleteImages.length);
            } else{BootstrapDialog.alert({
                title: 'Внимание',
                message: 'Не выбрано ни одного файла!',
                type: BootstrapDialog.TYPE_WARNING,
                closable: true
            });}
        }

        dropZone.ondrop = function (e) {
            e.preventDefault();
            this.className = 'upload-drop-zone';
            var resultFiles = [];
            angular.forEach(e.dataTransfer.files, function(value, key) {
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

    $scope.addNewModal = function(modalView, modalCtrl, currentElement, elements, element = {}) {


        if (element != {}) {
            $scope.isEdit = true;
        }

        currentElement = element;
        var modalInstance = $uibModal.open({
            templateUrl: modalView,
            controller: modalCtrl,
            controllerAs: 'vm',
            scope: $scope

        });

        modalInstance.result.then(function() {
            //alert(JSON.stringify($scope.mElement));
            if ($scope.mElement.Id == -1 || $scope.mElement.Id == undefined) {


                var id = 1;
                if (elements.length > 0) {
                    id = elements[elements.length - 1].Id + 1;
                }
                $scope.mElement.Id = id;
                elements.push($scope.mElement);
                $scope.mElement = {};
            } else {
                var ob = elements.filter(function(item) {
                    return item.Id == $scope.mElement.Id;
                });

                if (ob.length > 0) {
                    var dElement = ob[0];
                    var index = $scope.elements.indexOf(dElement);

                    if (index != -1) {
                        $scope.elements[index] = $scope.mElement;
                    }
                }
                $scope.mElement = {};
            }
            projectHttpService.manageProject($http, $scope, usSpinnerService, projectFactory.getToCurrentProject(), false);

        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.filterFromArray = function(arr, id) {
        var ob = arr.filter(function(item) {
            return item.Id == id;
        });

        return ob[0];
    }
    $scope.clickClientFounderInfo = function(id) {


        $scope.rmIndex = 1;
        $scope.eIndex = id;

        console.log(id);
        $scope.editElement = $scope.filterFromArray($scope.currentProject.BusinessInfo.ClientFounderInfos, $scope.eIndex);

        $scope.modalView = 'PartialViews/Modals/BusinessInfo/ClientFounderInfoModal.html';
        $scope.modalController = manageClientFounderInfoController;

        $scope.mElement = $scope.editElement;
        $scope.elements = $scope.currentProject.BusinessInfo.ClientFounderInfos;
    };

    $scope.clickConsumerStructure = function(id) {


        $scope.rmIndex = 1;
        $scope.eIndex = id;

        console.log(id);
        $scope.editElement = $scope.filterFromArray($scope.currentProject.BusinessInfo.ConsumerStructures, $scope.eIndex);

        $scope.modalView = 'PartialViews/Modals/BusinessInfo/ConsumerStructureModal.html';;
        $scope.modalController = manageConsumerStructureController;

        $scope.mElement = $scope.editElement;
        $scope.elements = $scope.currentProject.BusinessInfo.ConsumerStructures;
    };


    $scope.clickSupplierStructure = function(id) {


        $scope.rmIndex = 1;
        $scope.eIndex = id;

        console.log(id);
        $scope.editElement = $scope.filterFromArray($scope.currentProject.BusinessInfo.SupplierStructures, $scope.eIndex);

        $scope.modalView = 'PartialViews/Modals/BusinessInfo/SupplierStructureModal.html';;
        $scope.modalController = manageSupplierStructureController;

        $scope.mElement = $scope.editElement;
        $scope.elements = $scope.currentProject.BusinessInfo.SupplierStructures;
    };

    $scope.clickPeriodicityProcurements = function(id) {


        $scope.rmIndex = 1;
        $scope.eIndex = id;

        console.log(id);
        $scope.editElement = $scope.filterFromArray($scope.currentProject.BusinessInfo.PeriodicityProcurements, $scope.eIndex);

        $scope.modalView = 'PartialViews/Modals/BusinessInfo/PeriodicityProcurementModal.html';
        $scope.modalController = managePeriodicityProcurementController;

        $scope.mElement = $scope.editElement;
        $scope.elements = $scope.currentProject.BusinessInfo.PeriodicityProcurements;
    };

    $scope.EditElement = function() {

        $scope.addNewModal($scope.modalView, $scope.modalController,
            $scope.mElement, $scope.elements, $scope.mElement);

        //alert("ED Type = " + $scope.rmIndex + " Element Index= " + $scope.eIndex);
    };


    $scope.deleteData = function() {
        var ob = $scope.elements.filter(function(item) {
            return item.Id == $scope.eIndex;
        });

        if (ob.length > 0) {
            var dElement = ob[0];
            var index = $scope.elements.indexOf(dElement);

            if (index != -1) {
                $scope.elements.splice(index, 1);
            }
        }
        $scope.remapIds($scope.elements);
        projectHttpService.manageProject($http, $scope, usSpinnerService, projectFactory.getToCurrentProject(), false);

    }
    
    $scope.remapIds = function(rows) {
        angular.forEach(rows, function(value, key) {
            value.Id = key + 1;
        });
    }
    $scope.RemoveElement = function() {
        //alert("RM Type = " + $scope.rmIndex + " Element Index= " + $scope.eIndex);


        var dialog = BootstrapDialog.confirm({
            title: 'Предупреждение',
            message: 'Вы действительно хотите удалить данные?',
            type: BootstrapDialog.TYPE_WARNING,
            size: BootstrapDialog.SIZE_SMALL,
            closable: true,
            btnCancelLabel: 'Нет',
            btnOKLabel: 'Да',
            btnOKClass: 'btn-warning',
            callback: function(result) {
                if (result) {
                    $scope.deleteData();
                }
            }
        });
        dialog.setSize(BootstrapDialog.SIZE_SMALL);
    };

    $scope.menuItems = [
        {
            text: "Удалить",
            callback: $scope.RemoveElement, //function to be called on click  
            disabled: false
        }
    ];


    $scope.showNewClientFounderInfo = function() {
        if (!$scope.currentProject.BusinessInfo.ClientFounderInfos) {
            $scope.currentProject.BusinessInfo.ClientFounderInfos = [];
        }
        $scope.currentProject.BusinessInfo.ClientFounderInfos.push({});
        $scope.remapIds($scope.currentProject.BusinessInfo.ClientFounderInfos);
        //var modalView = 'PartialViews/Modals/BusinessInfo/ClientFounderInfoModal.html';
        //var modalController = manageClientFounderInfoController;

        //if ($scope.currentProject.BusinessInfo.ClientFounderInfos == undefined) {
        //    $scope.currentProject.BusinessInfo.ClientFounderInfos = [];
        //}
        //$scope.mElement = {};
        //$scope.addNewModal(modalView, modalController, $scope.mElement, $scope.currentProject.BusinessInfo.ClientFounderInfos);
    }

    $scope.showNewConsumerStructure = function() {
        if (!$scope.currentProject.BusinessInfo.ConsumerStructures) {
            $scope.currentProject.BusinessInfo.ConsumerStructures = [];
        }
        $scope.currentProject.BusinessInfo.ConsumerStructures.push({});
        $scope.remapIds($scope.currentProject.BusinessInfo.ConsumerStructures);
        //var modalView = 'PartialViews/Modals/BusinessInfo/ConsumerStructureModal.html';
        //var modalController = manageConsumerStructureController;

        //if ($scope.currentProject.BusinessInfo.ConsumerStructures == undefined) {
        //    $scope.currentProject.BusinessInfo.ConsumerStructures = [];
        //}
        //$scope.mElement = {};
        //$scope.addNewModal(modalView, modalController, $scope.mElement, $scope.currentProject.BusinessInfo.ConsumerStructures);
    }

    $scope.showNewPeriodicityProcurement = function() {
        if (!$scope.currentProject.BusinessInfo.PeriodicityProcurements) {
            $scope.currentProject.BusinessInfo.PeriodicityProcurements = [];
        }
        $scope.currentProject.BusinessInfo.PeriodicityProcurements.push({});
        $scope.remapIds($scope.currentProject.BusinessInfo.PeriodicityProcurements);
        //var modalView = 'PartialViews/Modals/BusinessInfo/PeriodicityProcurementModal.html';
        //var modalController = managePeriodicityProcurementController;

        //if ($scope.currentProject.BusinessInfo.PeriodicityProcurements == undefined) {
        //    $scope.currentProject.BusinessInfo.PeriodicityProcurements = [];
        //}
        //$scope.mElement = {};
        //$scope.addNewModal(modalView, modalController, $scope.mElement, $scope.currentProject.BusinessInfo.PeriodicityProcurements);
    }

    $scope.showNewSupplierStructure = function() {
        if (!$scope.currentProject.BusinessInfo.SupplierStructures) {
            $scope.currentProject.BusinessInfo.SupplierStructures = [];
        }
        $scope.currentProject.BusinessInfo.SupplierStructures.push({});
        $scope.remapIds($scope.currentProject.BusinessInfo.SupplierStructures);
        //var modalView = 'PartialViews/Modals/BusinessInfo/SupplierStructureModal.html';
        //var modalController = manageSupplierStructureController;

        //if ($scope.currentProject.BusinessInfo.SupplierStructures == undefined) {
        //    $scope.currentProject.BusinessInfo.SupplierStructures = [];
        //}
        //$scope.mElement = {};
        //$scope.addNewModal(modalView, modalController, $scope.mElement, $scope.currentProject.BusinessInfo.SupplierStructures);
    }

};
blitzApp.controller("businessInfoController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "NgTableParams", "projectFactory", "projectHttpService", businessInfoController]);