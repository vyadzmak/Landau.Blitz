function settingFormatter(value, row, index) {
    var settingId = row.settingId;
    return [
        '<button class="btn btn-info orange-tooltip edit-setting" href="javascript:void(0)" title="Редактировать" style=" text-align: center;" ',
        'data-toggle="tooltip" title="Редактировать компанию"  data-placement="bottom">',
        '<i class="glyphicon glyphicon-edit"></i>',
        '</button>'
    ].join('');
}

function settingDeleteFormatter(value, row, index) {
    var settingId = row.settingId;
    return [
        '<button class="btn btn-danger orange-tooltip delete-setting" href="javascript:void(0)" title="Удалить" style=" text-align: center;" ',
        'data-toggle="tooltip" title="Удалить компанию"  data-placement="bottom">',
        '<i class="glyphicon glyphicon-remove"></i>',
        '</button>'
    ].join('');
}

var settingsController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, promiseUtils, httpService) {


    var url = $$ApiUrl + "/settings";
    $scope.settings = [];

    $scope.deleteSetting = function(settingId) {
        var rParams = { id: settingId };
        promiseUtils.getPromiseHttpResult(httpService.deleteRequest($http, $scope, usSpinnerService, url, rParams)).then(function(result) {

            //alert(result);

            if (result == "OK") {
                var ob = $scope.settings.filter(function(item) {
                    return item.Id == settingId;
                });

                if (ob.length > 0) {
                    var dElement = ob[0];
                    var index = $scope.settings.indexOf(dElement);

                    if (index != -1) {
                        $scope.settings.splice(index, 1);
                    }
                }
            }
            $('#settingTable').bootstrapTable('load', $scope.settings);
            $('#settingTable').bootstrapTable('resetView');

        })
    }

    promiseUtils.getPromiseHttpResult(httpService.getRequestList($http, $scope, usSpinnerService, url)).then(function(result) {
        $scope.settings = JSON.parse(result);
        $window.operateEvents = {
            'click .edit-setting': function(e, value, row, index) {
                var ob = $scope.settings.filter(function(item) {
                    return item.Id == row.Id;
                });
                var editElement = ob;
                var modalView = 'PartialViews/Modals/Setting/SettingModal.html';
                var modalController = manageSettingController;

                if ($scope.settings == undefined) {
                    $scope.settings = [];
                }
                $scope.mElement = ob[0];
                //$scope.showsettingModal($scope.mElement);

                $scope.addNewModal(modalView, modalController, $scope.mElement, $scope.settings, $scope.mElement);

            },

            'click .delete-setting': function(e, value, row, index) {
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
                            $scope.deleteSetting(id);
                        }
                    }
                });
                dialog.setSize(BootstrapDialog.SIZE_SMALL);
            }
        };

        $('#settingTable').bootstrapTable({
            idField: 'Id',
            pagination: true,
            search: true,
            data: $scope.settings,
            showColumns: true,
            columns: [{
                    field: 'Id',
                    title: 'Id',
                    sortable: true
                }, {
                    field: 'SettingName',
                    title: 'Имя',
                    sortable: true
                },
                {
                    field: 'SettingValue',
                    title: 'Значение',
                    sortable: true
                }, {
                    field: 'edit',
                    title: '',
                    formatter: 'settingFormatter',
                    events: 'operateEvents'
                }, {
                    field: 'delete',
                    title: '',
                    formatter: 'settingDeleteFormatter',
                    events: 'operateEvents'
                }
            ]
        });


        var $result = $('#eventsResult');
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
                    elements.push($scope.mElement);
                    $scope.mElement = {};
                    $('#settingTable').bootstrapTable('load', $scope.settings);
                    $('#settingTable').bootstrapTable('resetView');

                })


                //send request to POST


            } else {
                //send request to PUT
                promiseUtils.getPromiseHttpResult(httpService.putRequest($http, $scope, usSpinnerService, url, rParams)).then(function(result) {

                    var ob = $scope.settings.filter(function(item) {
                        return item.Id == $scope.mElement.Id;
                    });

                    if (ob.length > 0) {
                        var dElement = ob[0];
                        var index = $scope.settings.indexOf(dElement);

                        if (index != -1) {
                            var o = JSON.parse(result);
                            $scope.settings[index] = o;
                        }
                    }
                    $scope.mElement = {};
                    $('#settingTable').bootstrapTable('load', $scope.settings);
                    $('#settingTable').bootstrapTable('resetView');


                })
            }



        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    //-----------КОНЕЦ БЛОКА ДЛЯ РАБОТЫ С МОДАЛЬНЫМИ ОКНАМИ---------------------------//


    $scope.showSettingModal = function() {
        var url = $$ApiUrl + "/clientType";
        promiseUtils.getPromiseHttpResult(httpService.getRequestList($http, $scope, usSpinnerService, url)).then(function(result) {

            var types = JSON.parse(result);

            var modalView = 'PartialViews/Modals/Setting/SettingModal.html';
            var modalController = manageSettingController;

            if ($scope.settings == undefined) {
                $scope.settings = [];
            }
            $scope.mElement = {};
            $scope.addNewModal(modalView, modalController, $scope.mElement, $scope.settings);
        })
    }

};
blitzApp.controller("settingsController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "promiseUtils", "httpService", settingsController]);