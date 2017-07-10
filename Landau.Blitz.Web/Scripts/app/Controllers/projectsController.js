function projectFormatter(value, row, index) {
    var projectId = row.projectId;
    return [
        '<button class="btn btn-info orange-tooltip edit-project" href="javascript:void(0)" title="Редактировать" style=" text-align: center;" ',
        'data-toggle="tooltip" title="Редактировать проект"  data-placement="bottom">',
        '<i class="glyphicon glyphicon-edit"></i>',
        '</button>'
    ].join('');
}

function projectDeleteFormatter(value, row, index) {
    var projectId = row.projectId;
    return [
        '<button class="btn btn-danger orange-tooltip delete-project" href="javascript:void(0)" title="Удалить" style=" text-align: center;" ',
        'data-toggle="tooltip" title="Удалить проект"  data-placement="bottom">',
        '<i class="glyphicon glyphicon-remove"></i>',
        '</button>'
    ].join('');
}

var projectsController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, promiseUtils, httpService) {


    var url = $$ApiUrl + "/userprojects";
    $scope.projects = [];

    $scope.deleteProject = function(projectId) {
        var rParams = { id: projectId };
        promiseUtils.getPromiseHttpResult(httpService.deleteRequest($http, $scope, usSpinnerService, url, rParams)).then(function(result) {

            //alert(result);

            if (result == "OK") {
                var ob = $scope.projects.filter(function(item) {
                    return item.Id == projectId;
                });

                if (ob.length > 0) {
                    var dElement = ob[0];
                    var index = $scope.projects.indexOf(dElement);

                    if (index != -1) {
                        $scope.projects.splice(index, 1);
                    }
                }
            }
            $('#projectTable').bootstrapTable('load', $scope.projects);
            $('#projectTable').bootstrapTable('resetView');

        })
    }

    var rParams = { 'userId': $scope.userData.UserId };
    promiseUtils.getPromiseHttpResult(httpService.getRequestById($http, $scope, usSpinnerService, url, rParams)).then(function(result) {
        // alert(result);
        $scope.projects = JSON.parse(result);
        $scope.projects.forEach(function(element) {
            element.Content = JSON.parse(element.Content);
        }, this);
        //alert($scope.projects[0].Content.ClientData.RegistrationName)
        $window.operateEvents = {
            'click .edit-project': function(e, value, row, index) {
                var ob = $scope.projects.filter(function(item) {
                    return item.Id == row.Id;
                });
                var editElement = ob;
                var modalView = 'PartialViews/Modals/Project/ProjectModal.html';
                var modalController = manageProjectController;

                if ($scope.projects == undefined) {
                    $scope.projects = [];
                }
                $scope.mElement = ob[0];
                $scope.addNewModal(modalView, modalController, $scope.mElement, $scope.projects, $scope.mElement);

            },

            'click .delete-project': function(e, value, row, index) {
                var id = row.Id;
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
                            $scope.deleteProject(id);
                        }
                    }
                });
                dialog.setSize(BootstrapDialog.SIZE_SMALL);
            }
        };

        $('#projectTable').bootstrapTable({
            idField: 'Id',
            pagination: true,
            search: true,
            data: $scope.projects,
            showColumns: true,
            columns: [{
                    field: 'Id',
                    title: 'Id',
                    sortable: true
                }, {
                    field: 'Name',
                    title: 'Наименование',
                    sortable: true
                }, {
                    field: 'Content.ClientData.OrganizationName',
                    title: 'Клиент',
                    sortable: true
                },
                {
                    field: 'CreatorName',
                    title: 'Пользователь',
                    sortable: true
                },
                {
                    field: 'CreationDate',
                    title: 'Дата создания',
                    sortable: true
                }, {
                    field: 'edit',
                    title: '',
                    formatter: 'projectFormatter',
                    events: 'operateEvents'
                }, {
                    field: 'delete',
                    title: '',
                    formatter: 'projectDeleteFormatter',
                    events: 'operateEvents'
                }
            ]
        });


        var $result = $('#eventsResult');

        $('#projectTable')
            .on('click-row.bs.table', function(e, row, $element) {
                //state go

                var currentIndex = $element.context.cellIndex;
                var totalCount = $element.context.parentElement.cells.length;
                if (totalCount - currentIndex > 2) {
                    $state.go('main.dashboard.project', { projectId: row.Id });
                    console.log('Event: click-row.bs.table' + JSON.stringify(row.Id));
                }
            })
    })


    //------------------БЛОК ДЛЯ РАБОТЫ С МОДАЛЬНЫМИ ОКНАМИ---------------------------//
    //add new user btn event
    //имя вьюхи, контроллер, пустой элемент, куда пишем, что пишем
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
            var rParams = {
                data: $scope.mElement,
                config: { contentType: "application/json" }
            };

            if (JSON.stringify(element) == "{}") {


                promiseUtils.getPromiseHttpResult(httpService.postRequest($http, $scope, usSpinnerService, url, rParams)).then(function(result) {

                    $scope.mElement.Id = JSON.parse(result).Id;
                    //$scope.mElement.ClientTypeName = $scope.mElement.CurrentClientType.Description;
                    //$scope.mElement.RegistrationDate = JSON.parse(result).RegistrationDate;
                    elements.push($scope.mElement);
                    $scope.mElement = {};
                    $('#projectTable').bootstrapTable('load', $scope.projects);
                    $('#projectTable').bootstrapTable('resetView');

                })


                //send request to POST


            } else {
                //send request to PUT
                promiseUtils.getPromiseHttpResult(httpService.putRequest($http, $scope, usSpinnerService, url, rParams)).then(function(result) {

                    var ob = $scope.projects.filter(function(item) {
                        return item.Id == $scope.mElement.Id;
                    });

                    if (ob.length > 0) {
                        var dElement = ob[0];
                        var index = $scope.projects.indexOf(dElement);

                        if (index != -1) {
                            $scope.projects[index] = JSON.parse(result);
                            //  $scope.projects[index].ClientTypeName = JSON.parse(result).CurrentClientType.Description;
                        }
                    }
                    $scope.mElement = {};
                    $('#projectTable').bootstrapTable('load', $scope.projects);
                    $('#projectTable').bootstrapTable('resetView');


                })
            }



        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    //-----------КОНЕЦ БЛОКА ДЛЯ РАБОТЫ С МОДАЛЬНЫМИ ОКНАМИ---------------------------//


    $scope.showProjectModal = function() {


        var modalView = 'PartialViews/Modals/Project/ProjectModal.html';
        var modalController = manageProjectController;

        if ($scope.projects == undefined) {
            $scope.projects = [];
        }
        $scope.mElement = {};
        $scope.addNewModal(modalView, modalController, $scope.mElement, $scope.projects);
    }

};
blitzApp.controller("projectsController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "promiseUtils", "httpService", projectsController]);