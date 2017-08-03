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

        currentProject.FinDataBalance.TotalCash2 =
            currentProject.FinDataBalance.CashInAccounts2 +
            currentProject.FinDataBalance.CashInHands2 +
            currentProject.FinDataBalance.CashSavings2 +
            currentProject.FinDataBalance.CashInBankAccounts2 +
            currentProject.FinDataBalance.CashInBankCurrencyAccounts2 +
            currentProject.FinDataBalance.CashInCompanyDeposits2 +
            currentProject.FinDataBalance.CashInOwnerDeposits2;

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

        currentProject.FinDataBalance.TotalDebt2 =
            currentProject.FinDataBalance.ReceivablesPrepaymentsToSuppliers2 +
            currentProject.FinDataBalance.ReceivablesGoodsOnSale2 +
            currentProject.FinDataBalance.ReceivablesGoodsOnConsignment2 +
            currentProject.FinDataBalance.ReceivablesPrepaymentsForExpenses2 +
            currentProject.FinDataBalance.ReceivablesLoansGranted2 +
            currentProject.FinDataBalance.ReceivablesDebtBuyers2;

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

        currentProject.FinDataBalance.TotalTMZ2 =
            currentProject.FinDataBalance.TMZProducts2 +
            currentProject.FinDataBalance.TMZRawMaterials2 +
            currentProject.FinDataBalance.TMZSemifinishedProducts2 +
            currentProject.FinDataBalance.TMZFinishedProducts2 +
            currentProject.FinDataBalance.TMZConsumables2 +
            currentProject.FinDataBalance.TMZFeed2 +
            currentProject.FinDataBalance.TMZSeeds2 +
            currentProject.FinDataBalance.TMZHerdOnFattening2;

    };


    var calculateBalanceTotalCurrentAssets = function(currentProject) {
        //var totalCurrentAssets = 
        currentProject.FinDataBalance.TotalCurrentAssets =
            currentProject.FinDataBalance.TotalCash +
            currentProject.FinDataBalance.TotalDebt +
            currentProject.FinDataBalance.TotalTMZ;

        currentProject.FinDataBalance.TotalCurrentAssets2 =
            currentProject.FinDataBalance.TotalCash2 +
            currentProject.FinDataBalance.TotalDebt2 +
            currentProject.FinDataBalance.TotalTMZ2;

    };

    var calculateBalanceTotalEquipment = function(currentProject) {
        //var totalCurrentAssets = 
        currentProject.FinDataBalance.TotalEquipment =
            currentProject.FinDataBalance.ProductionEquipment +
            currentProject.FinDataBalance.RetailEquipment +
            currentProject.FinDataBalance.Furniture +
            currentProject.FinDataBalance.OfficeEquipment +
            currentProject.FinDataBalance.OtherEquipment;

        currentProject.FinDataBalance.TotalEquipment2 =
            currentProject.FinDataBalance.ProductionEquipment2 +
            currentProject.FinDataBalance.RetailEquipment2 +
            currentProject.FinDataBalance.Furniture2 +
            currentProject.FinDataBalance.OfficeEquipment2 +
            currentProject.FinDataBalance.OtherEquipment2
    };

    var calculateBalanceTotalTransport = function(currentProject) {
        //var totalCurrentAssets = 
        currentProject.FinDataBalance.TotalTransport =
            currentProject.FinDataBalance.PassengerTransport +
            currentProject.FinDataBalance.FreightTransport +
            currentProject.FinDataBalance.SpecialMachinery +
            currentProject.FinDataBalance.OtherTransport;

        currentProject.FinDataBalance.TotalTransport2 =
            currentProject.FinDataBalance.PassengerTransport2 +
            currentProject.FinDataBalance.FreightTransport2 +
            currentProject.FinDataBalance.SpecialMachinery2 +
            currentProject.FinDataBalance.OtherTransport2;
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

        currentProject.FinDataBalance.TotalBuildings2 =
            currentProject.FinDataBalance.Offices2 +
            currentProject.FinDataBalance.RetailPremises2 +
            currentProject.FinDataBalance.Caffees2 +
            currentProject.FinDataBalance.IndustrialPremises2 +
            currentProject.FinDataBalance.Warehouses2 +
            currentProject.FinDataBalance.Buildings2 +
            currentProject.FinDataBalance.Territory2 +
            currentProject.FinDataBalance.ProductionComplexes2;
    };

    var calculateBalanceTotalFixedAssets = function(currentProject) {
        //var totalCurrentAssets = 
        currentProject.FinDataBalance.TotalFixedAssets =
            currentProject.FinDataBalance.TotalEquipment +
            currentProject.FinDataBalance.TotalTransport +
            currentProject.FinDataBalance.TotalBuildings;


        currentProject.FinDataBalance.TotalFixedAssets2 =
            currentProject.FinDataBalance.TotalEquipment2 +
            currentProject.FinDataBalance.TotalTransport2 +
            currentProject.FinDataBalance.TotalBuildings2;

    };


    var calculateBalanceTotalActive = function(currentProject) {
        //var totalCurrentAssets = 
        currentProject.FinDataBalance.TotalActive =
            currentProject.FinDataBalance.TotalFixedAssets +
            currentProject.FinDataBalance.TotalCurrentAssets +
            currentProject.FinDataBalance.TotalInvestment;


        currentProject.FinDataBalance.TotalActive2 =
            currentProject.FinDataBalance.TotalFixedAssets2 +
            currentProject.FinDataBalance.TotalCurrentAssets2 +
            currentProject.FinDataBalance.TotalInvestment2;

    };


    var calculateBalanceTotalInvestment = function(currentProject) {
        //var totalCurrentAssets = 
        currentProject.FinDataBalance.TotalInvestment =
            currentProject.FinDataBalance.PrepaymentsForFixedAssets +
            currentProject.FinDataBalance.UnfinishedObjects +
            currentProject.FinDataBalance.FixedAssetsTempNotInBusiness +
            currentProject.FinDataBalance.CapitalCostsInUncompletedWork;


        currentProject.FinDataBalance.TotalInvestment2 =
            currentProject.FinDataBalance.PrepaymentsForFixedAssets2 +
            currentProject.FinDataBalance.UnfinishedObjects2 +
            currentProject.FinDataBalance.FixedAssetsTempNotInBusiness2 +
            currentProject.FinDataBalance.CapitalCostsInUncompletedWork2;

    };


    var calculateBalanceTotalShortAccountsPayable = function(currentProject) {
        //var totalCurrentAssets = 
        currentProject.FinDataBalance.TotalShortAccountsPayable =
            currentProject.FinDataBalance.IndebtednessToSuppliers +
            currentProject.FinDataBalance.IndebtednessBuyers +
            currentProject.FinDataBalance.IndebtednessForExpenses +
            currentProject.FinDataBalance.CreditLoans;

        currentProject.FinDataBalance.TotalShortAccountsPayable2 =
            currentProject.FinDataBalance.IndebtednessToSuppliers2 +
            currentProject.FinDataBalance.IndebtednessBuyers2 +
            currentProject.FinDataBalance.IndebtednessForExpenses2 +
            currentProject.FinDataBalance.CreditLoans2;

    };


    var calculateBalanceTotalLongAccountsPayable = function(currentProject) {
        //var totalCurrentAssets = 
        currentProject.FinDataBalance.TotalLongAccountsPayable =
            currentProject.FinDataBalance.BankLoans +
            currentProject.FinDataBalance.Leasing +
            currentProject.FinDataBalance.CommercialMortgage +
            currentProject.FinDataBalance.PrivateLoans;

        currentProject.FinDataBalance.TotalLongAccountsPayable2 =
            currentProject.FinDataBalance.BankLoans2 +
            currentProject.FinDataBalance.Leasing2 +
            currentProject.FinDataBalance.CommercialMortgage2 +
            currentProject.FinDataBalance.PrivateLoans2;

    };

    var calculateBalanceTotalPassive = function(currentProject) {
        //var totalCurrentAssets = 
        currentProject.FinDataBalance.TotalPassive =
            currentProject.FinDataBalance.TotalShortAccountsPayable +
            currentProject.FinDataBalance.TotalLongAccountsPayable;


        currentProject.FinDataBalance.TotalPassive2 =
            currentProject.FinDataBalance.TotalShortAccountsPayable2 +
            currentProject.FinDataBalance.TotalLongAccountsPayable2;


    };
    var calculateBalanceDesignValue = function(currentProject) {

        currentProject.FinDataBalance.Equity = +((currentProject.FinDataBalance.TotalActive - currentProject.FinDataBalance.TotalShortAccountsPayable).toFixed(2));
        currentProject.FinDataBalance.CoefficientOfLiquidity = +((currentProject.FinDataBalance.TotalShortAccountsPayable / currentProject.FinDataBalance.TotalCurrentAssets * 100).toFixed(2));
        currentProject.FinDataBalance.CapitalAdequacyRatio = +((currentProject.FinDataBalance.Equity / currentProject.FinDataBalance.TotalActive * 100).toFixed(2));

        currentProject.FinDataBalance.Equity2 = +((currentProject.FinDataBalance.TotalActive2 - currentProject.FinDataBalance.TotalShortAccountsPayable2).toFixed(2));
        currentProject.FinDataBalance.CoefficientOfLiquidity2 = +((currentProject.FinDataBalance.TotalShortAccountsPayable2 / currentProject.FinDataBalance.TotalCurrentAssets2 * 100).toFixed(2));
        currentProject.FinDataBalance.CapitalAdequacyRatio2 = +((currentProject.FinDataBalance.Equity2 / currentProject.FinDataBalance.TotalActive2 * 100).toFixed(2));

    }

    function isBigEnough(value) {
        if (value == undefined) {
            value = 0;
        }
        // return value >= 10;
    }
    balanceCalculatorFactory.calculateData = function(currentProject) {



        calculateBalanceTotalCash(currentProject);
        calculateBalanceTotalDebt(currentProject);
        calculateBalanceTotalTMZ(currentProject);
        calculateBalanceTotalCurrentAssets(currentProject);

        calculateBalanceTotalEquipment(currentProject);
        calculateBalanceTotalTransport(currentProject);
        calculateBalanceTotalBuildings(currentProject);
        calculateBalanceTotalFixedAssets(currentProject);
        calculateBalanceTotalInvestment(currentProject);
        calculateBalanceTotalActive(currentProject);
        calculateBalanceTotalShortAccountsPayable(currentProject);
        calculateBalanceTotalLongAccountsPayable(currentProject);
        calculateBalanceTotalPassive(currentProject);
        calculateBalanceDesignValue(currentProject);
    }



    return balanceCalculatorFactory;

}]);