function userFormatter(value, row, index) {
    var userId = row.userId;
    return [
        '<button class="btn btn-info orange-tooltip edit-user" href="javascript:void(0)" title="Редактировать" style=" text-align: center;" ',
        'data-toggle="tooltip" title="Редактировать компанию"  data-placement="bottom">',
        '<i class="glyphicon glyphicon-edit"></i>',
        '</button>'
    ].join('');
}

function userDeleteFormatter(value, row, index) {
    var userId = row.userId;
    return [
        '<button class="btn btn-danger orange-tooltip delete-user" href="javascript:void(0)" title="Удалить" style=" text-align: center;" ',
        'data-toggle="tooltip" title="Удалить компанию"  data-placement="bottom">',
        '<i class="glyphicon glyphicon-remove"></i>',
        '</button>'
    ].join('');
}

var usersController = function($scope, $stateParams, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, promiseUtils, httpService) {
    var companyId = $stateParams.companyId;
    //lert(companyId);
    var url = $$ApiUrl + "/clientUsers";
    $scope.companies = [];
    var rParams = {
        id: companyId,
        userId: $scope.userData.UserId
    }
    promiseUtils.getPromiseHttpResult(httpService.getRequestById($http, $scope, usSpinnerService, url, rParams)).then(function(result) {
        $scope.users = JSON.parse(result);
        $scope.deleteUser = function(userId) {
                var rParams = { id: userId, userId: $scope.userData.UserId };
                var url = $$ApiUrl + "/users";

                promiseUtils.getPromiseHttpResult(httpService.deleteRequest($http, $scope, usSpinnerService, url, rParams)).then(function(result) {

                    //alert(result);

                    if (result == "OK") {
                        var ob = $scope.users.filter(function(item) {
                            return item.Id == userId;
                        });

                        if (ob.length > 0) {
                            var dElement = ob[0];
                            var index = $scope.users.indexOf(dElement);

                            if (index != -1) {
                                $scope.users.splice(index, 1);
                            }
                        }
                    }
                    $('#userTable').bootstrapTable('load', $scope.users);
                    $('#userTable').bootstrapTable('resetView');

                })
            }
            //alert(JSON.stringify($scope.users));
        $window.operateEvents = {
            'click .edit-user': function(e, value, row, index) {
                var ob = $scope.users.filter(function(item) {
                    return item.Id == row.Id;
                });
                var editElement = ob;
                var modalView = 'PartialViews/Modals/User/UserModal.html';
                var modalController = manageUserController;

                if ($scope.users == undefined) {
                    $scope.users = [];
                }
                $scope.mElement = ob[0];
                $scope.mElement.Login.UserPassword = $scope.mElement.Login.DecryptedPassword;
                //$scope.showuserModal($scope.mElement);
                //$scope.mElement.ClientTypeId = 1;
                $scope.addNewModal(modalView, modalController, $scope.mElement, $scope.users, $scope.mElement);

            },

            'click .delete-user': function(e, value, row, index) {
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
                            $scope.deleteUser(id);
                        }
                    }
                });
                dialog.setSize(BootstrapDialog.SIZE_SMALL);
            }
        };

        $('#userTable').bootstrapTable({
            idField: 'Id',
            pagination: true,
            search: true,
            data: $scope.users,
            showColumns: true,
            columns: [{
                    field: 'Id',
                    title: 'Id',
                    sortable: true
                }, {
                    field: 'FirstName',
                    title: 'Имя',
                    sortable: true
                },
                {
                    field: 'LastName',
                    title: 'Фамилия',
                    sortable: true
                },
                {
                    field: 'Email',
                    title: 'Email',
                    sortable: true
                },
                {
                    field: 'PhoneNumber',
                    title: '№ тел',
                    sortable: true
                },
                {
                    field: 'Login.LastLoginDate',
                    title: 'Последняя авторизация',
                    sortable: true
                },
                {
                    field: 'Login.RegistrationDate',
                    title: 'Дата регистрации',
                    sortable: true
                },
                {
                    field: 'edit',
                    title: '',
                    formatter: 'userFormatter',
                    events: 'operateEvents'
                }, {
                    field: 'delete',
                    title: '',
                    formatter: 'userDeleteFormatter',
                    events: 'operateEvents'
                }
            ]
        });


        var $result = $('#eventsResult');

        $('#userTable').on('all.bs.table', function(e, name, args) {})
            .on('click-row.bs.table', function(e, row, $element) {
                //state go
                //$state.go('main.dashboard.userUsers', { userId: row.Id });
                //console.log('Event: click-row.bs.table' + JSON.stringify(row.Id));
            })
    })

    $scope.generatePassword = function() {
        var passwd = '';
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        for (i = 0; i < 6; i++) {
            var c = Math.floor(Math.random() * chars.length + 1);
            passwd += chars.charAt(c)
        }
        $scope.mElement.Login.UserPassword = passwd;
        return passwd;

    }

    //------------------БЛОК ДЛЯ РАБОТЫ С МОДАЛЬНЫМИ ОКНАМИ---------------------------//
    //add new user btn event
    //имя вьюхи, контроллер, пустой элемент, куда пишем, что пишем
    $scope.addNewModal = function(modalView, modalCtrl, currentElement, elements, element = {}) {
        var url = $$ApiUrl + "/users";

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
            $scope.mElement.Login.UserLogin = $scope.mElement.Email;
            //var url = $$ApiUrl + "/users";

            var rParams = {
                data: $scope.mElement,
                config: { contentType: "application/json" }
            };

            if (JSON.stringify(element) == "{}") {

                promiseUtils.getPromiseHttpResult(httpService.postRequest($http, $scope, usSpinnerService, url, rParams)).then(function(result) {

                    if (result == "Error") {
                        alert("Error");
                    } else {

                        $scope.mElement.Id = JSON.parse(result).Id;
                        elements.push($scope.mElement);
                        $scope.mElement = {};
                        $('#userTable').bootstrapTable('load', $scope.users);
                        $('#userTable').bootstrapTable('resetView');
                    }
                })


                //send request to POST


            } else {
                //send request to PUT
                promiseUtils.getPromiseHttpResult(httpService.putRequest($http, $scope, usSpinnerService, url, rParams)).then(function(result) {

                    var ob = $scope.users.filter(function(item) {
                        return item.Id == $scope.mElement.Id;
                    });

                    if (ob.length > 0) {
                        var dElement = ob[0];
                        var index = $scope.users.indexOf(dElement);

                        if (index != -1) {
                            $scope.users[index] = JSON.parse(result);
                            // $scope.users[index].ClientTypeName = JSON.parse(result).CurrentClientType.Description;
                        }
                    }
                    $scope.mElement = {};
                    $('#userTable').bootstrapTable('load', $scope.users);
                    $('#userTable').bootstrapTable('resetView');


                })
            }



        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    //-----------КОНЕЦ БЛОКА ДЛЯ РАБОТЫ С МОДАЛЬНЫМИ ОКНАМИ---------------------------//


    $scope.showUserModal = function() {
        var url = $$ApiUrl + "/users";
        var rParams = {
            id: -1,
            userId: $scope.userData.UserId
        };

        promiseUtils.getPromiseHttpResult(httpService.getRequestById($http, $scope, usSpinnerService, url, rParams)).then(function(result) {

            // alert(result);
            var user = JSON.parse(result);

            var modalView = 'PartialViews/Modals/User/userModal.html';
            var modalController = manageUserController;

            if ($scope.users == undefined) {
                $scope.users = [];
            }
            $scope.mElement = {};
            user.ClientId = $stateParams.companyId;
            $scope.mElement = user;
            $scope.generatePassword();
            $scope.addNewModal(modalView, modalController, $scope.mElement, $scope.users);
        })
    }

};
blitzApp.controller("usersController", ["$scope", "$stateParams", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "promiseUtils", "httpService", usersController]);