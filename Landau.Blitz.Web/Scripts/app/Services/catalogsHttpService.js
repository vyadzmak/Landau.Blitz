blitzApp.service('catalogsHttpService', function() {
    //добавляем данные
    function addData(catalog) {
        var dElement = {};
        dElement.catalogId = catalog.Id;
        dElement.catalogName = catalog.Name;
        dElement.catalogSystemName = catalog.SystemName;
        dElement.catalogContent = catalog.Content;

        return dElement;
    }


    //get to clients list
    this.getToCatalogsList = function($http, $scope, $state, data, url, usSpinnerService) {
        $scope.catalogs = [];
        usSpinnerService.spin("spinner-1");
        $scope.loading = true;

        $http.get(url).then(function(response) {
                var cs = JSON.parse(response.data);
                for (var i = 0; i < cs.length; i++) {
                    var catalog = {};
                    catalog.Id = cs[i].Id;
                    catalog.Name = cs[i].Name;
                    catalog.SystemName = cs[i].SystemName;
                    catalog.Content = cs[i].Content;
                    $scope.catalogs.push(catalog);


                    $scope.loading = true;
                    var dElement = addData(catalog);
                    data.push(dElement);


                }
                $('#catalogTable').bootstrapTable({
                    data: data,
                    height: '100%',
                    sortName: 'catalogId',
                    sortOrder: 'desc',
                    onPostBody: function() {
                        $('#catalogTable').bootstrapTable('resetView');
                    }

                });

                $('[data-toggle="tooltip"]').tooltip()

                var $result = $('#eventsResult');

                $('#catalogTable').on('all.bs.table', function(e, name, args) {
                        // console.log('Event:', name, ', data:', args);
                    })
                    .on('click-row.bs.table', function(e, row, $element) {

                        console.log('Event: click-row.bs.table' + JSON.stringify(row.catalogId));
                        var catalogId = row.catalogId;
                        var currentIndex = $element.context.cellIndex;
                        var totalCount = $element.context.parentElement.cells.length;

                        if (totalCount - currentIndex > 1) {
                            $state.go("main.dashboard.catalogFieldDetails", { 'catalogId': catalogId })
                        }
                        //$result.text('Event: click-row.bs.table'+ JSON.stringify(row.userName));
                    })

                $('#catalogTable').bootstrapTable('resetWidth');
                usSpinnerService.stop('spinner-1');
                $scope.loading = false;
                window.scope = $scope;
            },
            function(response) {
                showNotify("Error", "Ошибка при загрузке справочников", "danger");
                $('#catalogTable').bootstrapTable('resetWidth');
                usSpinnerService.stop('spinner-1');
                $scope.loading = false;
                window.scope = $scope;
            });
    }

    //add or Edit company
    this.manageCatalog = function($http, $scope, data, url, usSpinnerService, isEdit) {
        usSpinnerService.spin("spinner-1");
        var methodType = "POST";
        if (isEdit) {
            methodType = "PUT";
        }

        $http({
                url: url,
                method: methodType,
                contentType: "application/json",
                data: JSON.stringify($scope.catalog)
            })
            .then(function(response) {
                    $scope.loadData = false;
                    console.log(JSON.stringify(response.data));
                    var catalog = JSON.parse(response.data);
                    var dElement = addData(catalog);
                    if (!isEdit) {
                        data.push(dElement);
                        $scope.catalogs.push(catalog);
                    } else {
                        for (var i = 0; i < data.length; i++) {
                            var obj = data[i];
                            if (obj.catalogId == dElement.catalogId) {
                                data[i] = dElement;
                                break;
                            }
                        }
                        for (var j = 0; j < $scope.catalogs.length; j++) {
                            if (catalog.Id == $scope.catalogs[j].Id) {
                                $scope.catalogs[j] = catalog;
                                break;
                            }
                        }
                    }
                    $('#catalogTable').bootstrapTable('load', data);
                    usSpinnerService.stop('spinner-1');
                    var notificationT = "добавлена";
                    if (isEdit) notificationT = "обновлена";

                    showNotify("Успех", "Справочник " + $scope.catalog.Name + " успешно был " + notificationT, "success");
                    $('#catalogTable').bootstrapTable('resetWidth');
                    // success
                },
                function(response) { // optional
                    // failed
                    usSpinnerService.stop('spinner-1');
                    showNotify("Успех", "Ошибка при добавлении каталога", "danger");
                    $('#catalogTable').bootstrapTable('resetWidth');
                });
        $('#catalogTable').bootstrapTable('resetWidth');
    }
});