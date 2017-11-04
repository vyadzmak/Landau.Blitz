
var finDataBalanceTableController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, projectFactory, mathFactory, calculatorFactory, projectHttpService) {
    

    $scope.assets = {
        liquids: [
        {varName:'Savings', name: 'Сбережения'},
        {varName:'Deposit', name: 'Депозит'}],
        raws: [{varName:'Inventories', name:'ТМЗ'},
        {varName:'FinishedGoods', name:'Готовая продукция'},
        {varName:'RawMaterials', name:'Сырье'},
        {varName:'SemiProducts', name:'Полуфабрикаты/материалы'}]
    };
    
    $scope.outBalanceAssets = [{varName:'Checkout', name:'Касса'},
        {varName:'CurrentAccount', name: 'Расчетный счет'},
        {varName:'Savings', name: 'Сбережения'},
        {varName:'Deposit', name: 'Депозит'},
        {varName:'RecievableAccounts', name: 'Счета к получению'},
        {varName:'TransitGoods', name: 'Товары в пути'},
        {varName:'SuppliersPrepayment', name: 'Предоплата поставщиков'},
        {varName:'OtherRecievables', name: 'Проч. деб. задолженность'},
        {varName:'Inventories', name: 'ТМЗ'},
        {varName:'FinishedGoods', name: 'Готовая продукция'},
        {varName:'RawMaterials', name: 'Сырье'},
        {varName:'SemiProducts', name: 'Полуфаб./метариалы'},
        {varName:'ForSaleGoods', name: 'Тов., получ.на реал-ию'},
        {varName:'Hardware', name: 'Обородуование'},
        {varName:'MotorTransport', name: 'Автотранспорт'},
        {varName:'RealEstate', name: 'Недвижимость'},
        {varName:'Investments', name: 'Инвестиции'}];
    
    $scope.outBalanceLiabilities = [{varName:'BudgetSettlements', name:'Расчеты с бюджетом'},
    {varName:'RentalsArrears', name:'Зад-ть по аренде, з/п'},
    {varName:'ShortTermDebt', name:'Проч.краткосроч.зад-ть'},
    {varName:'PayableAccounts', name:'Счета к оплате'},
    {varName:'CommodityLoan', name:'Товарный кредит'},
    {varName:'CustomersPrepayment', name:'Предоплата от покупателей'},
    {varName:'ShortPrivateLoans', name:'Част.займы(мен. 12 мес.)'},
    {varName:'ShortWorkingCapitalCredit', name:'Банк.кр.(мен. 12 мес.) на об/ср'},
    {varName:'ShortFixedAssetsCredit', name:'Банк.кр.(мен. 12 мес.) на осн/ср'},
    {varName:'OtherCurrentDebt', name:'Прочие тек.зад-ти'},
    {varName:'LongPrivateLoans', name:'Част.займы(бол. 12 мес.'},
    {varName:'LongWorkingCapitalCredit', name:'Банк.кр.(бол. 12 мес.) на об/ср'},
    {varName:'LongFixedAssetsCredit', name:'Банк.кр.(бол. 12 мес.) на осн/ср'},
    {varName:'OtherLiabilities', name:'Прочие пассивы'}];

    $scope.initBalance = function() {$scope.currentProject = projectFactory.getToCurrentProject();

        if (!$scope.currentProject.FinDataBalance.Balances ||
            $scope.currentProject.FinDataBalance.Balances.length == 0) {
            if ($scope.currentProject.ClientData.FinAnalysisCompanies &&
                $scope.currentProject.ClientData.FinAnalysisCompanies.length > 0) {

                $scope.currentProject.FinDataBalance.Companies = angular
                    .copy($scope.currentProject.ClientData.FinAnalysisCompanies);

                $scope.mElement = $scope.currentProject.FinDataBalance;
                $scope.addNewModal('PartialViews/Modals/FinDataBalance/BalanceModal.html',
                    manageBalanceController,
                    $scope.mElement,
                    'balanceData',
                    $scope.mElement);

            } else {
                var dialog = new BootstrapDialog({
                    type: BootstrapDialog.TYPE_WARNING,
                    size: BootstrapDialog.SIZE_SMALL,
                    title: "Не указаны данные",
                    message:
                        '<div style="text-align:center">Во вкладке "Данные о клиенте" подпункте "Финансовый анализ компаний" укажите количество компаний и их названия.' +
                            ' По данным компаниям будет проведен финансовый анализ.' +
                            '</div>'
                });
                dialog.setSize(BootstrapDialog.SIZE_SMALL);
                dialog.open();
            }
        } else {
            $scope.activeCompany = projectFactory.getActiveCompanyBalance(1);
            if ($scope.activeCompany.CompanyBalances && $scope.activeCompany.CompanyBalances.length > 0) {
                $scope.activeBalance = projectFactory.getActiveBalance($scope.activeCompany.Id, 1);
            }
        }
    }

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
            if (elements !== 'balanceData') {
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
            } else {
                projectFactory.initBalances($scope.currentProject.FinDataBalance.Companies);
                $scope.currentProject = projectFactory.getToCurrentProject();
                $scope.activeCompany = projectFactory.getActiveCompanyBalance(1);
                if ($scope.activeCompany.CompanyBalances && $scope.activeCompany.CompanyBalances.length > 0) {
                    $scope.activeBalance = projectFactory.getActiveBalance($scope.activeCompany.Id, 1);
                }
            }
            projectHttpService.manageProject($http, $scope, usSpinnerService, projectFactory.getToCurrentProject(), false);

        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });

    };

    $scope.initBalance();
    usSpinnerService.stop("spinner-1");

    $scope.activeBalanceChanged = function() {
        $scope.activeBalance = projectFactory.getActiveBalance($scope.activeCompany.Id, $scope.activeBalance.Id);
    }

    $scope.activeCompanyChangedChanged = function() {
        $scope.activeCompany = projectFactory.getActiveCompanyBalance($scope.activeCompany.Id);
        if ($scope.activeCompany.CompanyBalances && $scope.activeCompany.CompanyBalances.length > 0) {
            $scope.activeBalance = projectFactory.getActiveBalance($scope.activeCompany.Id, 1);
        }
    };

    

    $scope.addNewRow = function(rows) {
        rows.push({Id:rows.length+1});
    }
    
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
        $scope.calculateBalance($scope.activeBalance, $scope.activeCompany.Id);
        projectHttpService.manageProject($http, $scope, usSpinnerService, projectFactory.getToCurrentProject(), false);

    }
    
    $scope.clickRightTableRow = function(rows, rowId) {
        $scope.eIndex = rowId;
        $scope.elements = rows;
    };

    $scope.removeElement = function() {
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
            callback: $scope.removeElement, //function to be called on click  
            disabled: false
        }
    ];

    $scope.calculateBalance = function(balance, companyId) {
        calculatorFactory.calculateBalanceData($scope.currentProject, companyId, $scope.activeBalance.Id);
        $scope.activeBalance = projectFactory.getActiveBalance(companyId, $scope.activeBalance.Id);
    };

    $scope.checkOutAssets = function(value) {
        var found = false;
        if ($scope.activeCompany) {
            angular.forEach($scope.activeCompany.CompanyBalances,
                function(balance, balanceKey) {
                    if (mathFactory.getFloat(balance.Assets[value.varName].OutTotal) > 0) {
                        found = true;
                    }
                });
        }
        return found;
    }

    $scope.checkOutLiabilities = function(value) {
        var found = false;
        if($scope.activeCompany){
            angular.forEach($scope.activeCompany.CompanyBalances, function(balance, balanceKey) {
                if (mathFactory.getFloat(balance.Liabilities[value.varName].OutTotal) > 0) {
                    found = true;
                }
            });
        }
        return found;
    }
};
blitzApp.controller("finDataBalanceTableController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "projectFactory", "mathFactory", "calculatorFactory", "projectHttpService", finDataBalanceTableController]);