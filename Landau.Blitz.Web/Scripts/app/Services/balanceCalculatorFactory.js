blitzApp.factory('balanceCalculatorFactory', ['$rootScope', function($rootScope) {
    var balanceCalculatorFactory = {};


    var calculateBalanceTotalCash = function(currentProject) {
        //var totalCurrentAssets = 
        currentProject.FinDataBalance.TotalCash =
            currentProject.FinDataBalance.CashInAccounts +
            currentProject.FinDataBalance.CashInHands +
            currentProject.FinDataBalance.CashSavings +
            currentProject.FinDataBalance.CashInBankAccounts +
            currentProject.FinDataBalance.CashInBankCurrencyAccounts +
            currentProject.FinDataBalance.CashInCompanyDeposits +
            currentProject.FinDataBalance.CashInOwnerDeposits;

    };


    var calculateBalanceTotalDebt = function(currentProject) {
        //var totalCurrentAssets = 
        currentProject.FinDataBalance.TotalDebt =
            currentProject.FinDataBalance.ReceivablesPrepaymentsToSuppliers +
            currentProject.FinDataBalance.ReceivablesGoodsOnSale +
            currentProject.FinDataBalance.ReceivablesGoodsOnConsignment +
            currentProject.FinDataBalance.ReceivablesPrepaymentsForExpenses +
            currentProject.FinDataBalance.ReceivablesLoansGranted +
            currentProject.FinDataBalance.ReceivablesDebtBuyers;

    };


    var calculateBalanceTotalTMZ = function(currentProject) {
        //var totalCurrentAssets = 
        currentProject.FinDataBalance.TotalTMZ =
            currentProject.FinDataBalance.TMZProducts +
            currentProject.FinDataBalance.TMZRawMaterials +
            currentProject.FinDataBalance.TMZSemifinishedProducts +
            currentProject.FinDataBalance.TMZFinishedProducts +
            currentProject.FinDataBalance.TMZConsumables +
            currentProject.FinDataBalance.TMZFeed +
            currentProject.FinDataBalance.TMZSeeds +
            currentProject.FinDataBalance.TMZHerdOnFattening;

    };


    var calculateBalanceTotalCurrentAssets = function(currentProject) {
        //var totalCurrentAssets = 
        currentProject.FinDataBalance.TotalCurrentAssets =
            currentProject.FinDataBalance.TotalCash +
            currentProject.FinDataBalance.TotalDebt +
            currentProject.FinDataBalance.TotalTMZ;

    };

    var calculateBalanceTotalEquipment = function(currentProject) {
        //var totalCurrentAssets = 
        currentProject.FinDataBalance.TotalEquipment =
            currentProject.FinDataBalance.ProductionEquipment +
            currentProject.FinDataBalance.RetailEquipment +
            currentProject.FinDataBalance.Furniture +
            currentProject.FinDataBalance.OfficeEquipment +
            currentProject.FinDataBalance.OtherEquipment
    };

    var calculateBalanceTotalTransport = function(currentProject) {
        //var totalCurrentAssets = 
        currentProject.FinDataBalance.TotalTransport =
            currentProject.FinDataBalance.PassengerTransport +
            currentProject.FinDataBalance.FreightTransport +
            currentProject.FinDataBalance.SpecialMachinery +
            currentProject.FinDataBalance.OtherTransport;
    };

    var calculateBalanceTotalBuildings = function(currentProject) {
        //var totalCurrentAssets = 
        currentProject.FinDataBalance.TotalBuildings =
            currentProject.FinDataBalance.Offices +
            currentProject.FinDataBalance.RetailPremises +
            currentProject.FinDataBalance.Caffees +
            currentProject.FinDataBalance.IndustrialPremises +
            currentProject.FinDataBalance.Warehouses +
            currentProject.FinDataBalance.Buildings +
            currentProject.FinDataBalance.Territory +
            currentProject.FinDataBalance.ProductionComplexes;
    };

    var calculateBalanceTotalFixedAssets = function(currentProject) {
        //var totalCurrentAssets = 
        currentProject.FinDataBalance.TotalFixedAssets =
            currentProject.FinDataBalance.TotalEquipment +
            currentProject.FinDataBalance.TotalTransport +
            currentProject.FinDataBalance.TotalBuildings;

    };

    balanceCalculatorFactory.calculateData = function(currentProject) {
        calculateBalanceTotalCash(currentProject);
        calculateBalanceTotalDebt(currentProject);
        calculateBalanceTotalTMZ(currentProject);
        calculateBalanceTotalCurrentAssets(currentProject);

        calculateBalanceTotalEquipment(currentProject);
        calculateBalanceTotalTransport(currentProject);
        calculateBalanceTotalBuildings(currentProject);
        calculateBalanceTotalFixedAssets(currentProject);
    }



    return balanceCalculatorFactory;

}]);