blitzApp.service('dataInitializer', ['$rootScope', function($rootScope) {
    this.setBalanceData = function(currentProject) {
        currentProject.FinDataBalance.TotalCash = 0;
        currentProject.FinDataBalance.CashInAccounts = 0;
        currentProject.FinDataBalance.CashInHands = 0;
        currentProject.FinDataBalance.CashSavings = 0;
        currentProject.FinDataBalance.CashInBankAccounts = 0;
        currentProject.FinDataBalance.CashInBankCurrencyAccounts = 0;
        currentProject.FinDataBalance.CashInCompanyDeposits = 0;
        currentProject.FinDataBalance.CashInOwnerDeposits = 0;

        currentProject.FinDataBalance.TotalCash2 = 0;
        currentProject.FinDataBalance.CashInAccounts2 = 0;
        currentProject.FinDataBalance.CashInHands2 = 0;
        currentProject.FinDataBalance.CashSavings2 = 0;
        currentProject.FinDataBalance.CashInBankAccounts2 = 0;
        currentProject.FinDataBalance.CashInBankCurrencyAccounts2 = 0;
        currentProject.FinDataBalance.CashInCompanyDeposits2 = 0;
        currentProject.FinDataBalance.CashInOwnerDeposits2 = 0;

        currentProject.FinDataBalance.TotalDebt = 0;
        currentProject.FinDataBalance.ReceivablesPrepaymentsToSuppliers = 0;
        currentProject.FinDataBalance.ReceivablesGoodsOnSale = 0;
        currentProject.FinDataBalance.ReceivablesGoodsOnConsignment = 0;
        currentProject.FinDataBalance.ReceivablesPrepaymentsForExpenses = 0;
        currentProject.FinDataBalance.ReceivablesLoansGranted = 0;
        currentProject.FinDataBalance.ReceivablesDebtBuyers = 0;

        currentProject.FinDataBalance.TotalDebt2 = 0;
        currentProject.FinDataBalance.ReceivablesPrepaymentsToSuppliers2 = 0;
        currentProject.FinDataBalance.ReceivablesGoodsOnSale2 = 0;
        currentProject.FinDataBalance.ReceivablesGoodsOnConsignment2 = 0;
        currentProject.FinDataBalance.ReceivablesPrepaymentsForExpenses2 = 0;
        currentProject.FinDataBalance.ReceivablesLoansGranted2 = 0;
        currentProject.FinDataBalance.ReceivablesDebtBuyers2 = 0;

        currentProject.FinDataBalance.TotalTMZ = 0;
        currentProject.FinDataBalance.TMZProducts = 0;
        currentProject.FinDataBalance.TMZRawMaterials = 0;
        currentProject.FinDataBalance.TMZSemifinishedProducts = 0;
        currentProject.FinDataBalance.TMZFinishedProducts = 0;
        currentProject.FinDataBalance.TMZConsumables = 0;
        currentProject.FinDataBalance.TMZFeed = 0;
        currentProject.FinDataBalance.TMZSeeds = 0;
        currentProject.FinDataBalance.TMZHerdOnFattening = 0;

        currentProject.FinDataBalance.TotalTMZ2 = 0;
        currentProject.FinDataBalance.TMZProducts2 = 0;
        currentProject.FinDataBalance.TMZRawMaterials2 = 0;
        currentProject.FinDataBalance.TMZSemifinishedProducts2 = 0;
        currentProject.FinDataBalance.TMZFinishedProducts2 = 0;
        currentProject.FinDataBalance.TMZConsumables2 = 0;
        currentProject.FinDataBalance.TMZFeed2 = 0;
        currentProject.FinDataBalance.TMZSeeds2 = 0;
        currentProject.FinDataBalance.TMZHerdOnFattening2 = 0;

        currentProject.FinDataBalance.TotalCurrentAssets = 0;
        currentProject.FinDataBalance.TotalCash = 0;
        currentProject.FinDataBalance.TotalDebt = 0;
        currentProject.FinDataBalance.TotalTMZ = 0;

        currentProject.FinDataBalance.TotalCurrentAssets2 = 0;
        currentProject.FinDataBalance.TotalCash2 = 0;
        currentProject.FinDataBalance.TotalDebt2 = 0;
        currentProject.FinDataBalance.TotalTMZ2 = 0;

        currentProject.FinDataBalance.TotalEquipment = 0;
        currentProject.FinDataBalance.ProductionEquipment = 0;
        currentProject.FinDataBalance.RetailEquipment = 0;
        currentProject.FinDataBalance.Furniture = 0;
        currentProject.FinDataBalance.OfficeEquipment = 0;
        currentProject.FinDataBalance.OtherEquipment = 0;

        currentProject.FinDataBalance.TotalEquipment2 = 0;
        currentProject.FinDataBalance.ProductionEquipment2 = 0;
        currentProject.FinDataBalance.RetailEquipment2 = 0;
        currentProject.FinDataBalance.Furniture2 = 0;
        currentProject.FinDataBalance.OfficeEquipment2 = 0;
        currentProject.FinDataBalance.OtherEquipment2 = 0;

        currentProject.FinDataBalance.TotalTransport = 0;
        currentProject.FinDataBalance.PassengerTransport = 0;
        currentProject.FinDataBalance.FreightTransport = 0;
        currentProject.FinDataBalance.SpecialMachinery = 0;
        currentProject.FinDataBalance.OtherTransport = 0;

        currentProject.FinDataBalance.TotalTransport2 = 0;
        currentProject.FinDataBalance.PassengerTransport2 = 0;
        currentProject.FinDataBalance.FreightTransport2 = 0;
        currentProject.FinDataBalance.SpecialMachinery2 = 0;
        currentProject.FinDataBalance.OtherTransport2 = 0;;

        currentProject.FinDataBalance.TotalBuildings = 0;
        currentProject.FinDataBalance.Offices = 0;
        currentProject.FinDataBalance.RetailPremises = 0;
        currentProject.FinDataBalance.Caffees = 0;
        currentProject.FinDataBalance.IndustrialPremises = 0;
        currentProject.FinDataBalance.Warehouses = 0;
        currentProject.FinDataBalance.Buildings = 0;
        currentProject.FinDataBalance.Territory = 0;
        currentProject.FinDataBalance.ProductionComplexes = 0;

        currentProject.FinDataBalance.TotalBuildings = 0;
        currentProject.FinDataBalance.Offices2 = 0;
        currentProject.FinDataBalance.RetailPremises2 = 0;
        currentProject.FinDataBalance.Caffees2 = 0;
        currentProject.FinDataBalance.IndustrialPremises2 = 0;
        currentProject.FinDataBalance.Warehouses2 = 0;
        currentProject.FinDataBalance.Buildings2 = 0;
        currentProject.FinDataBalance.Territory2 = 0;
        currentProject.FinDataBalance.ProductionComplexes2 = 0;

        currentProject.FinDataBalance.TotalFixedAssets = 0;
        currentProject.FinDataBalance.TotalEquipment = 0;
        currentProject.FinDataBalance.TotalTransport = 0;
        currentProject.FinDataBalance.TotalBuildings = 0;


        currentProject.FinDataBalance.TotalFixedAssets2 = 0;
        currentProject.FinDataBalance.TotalEquipment2 = 0;
        currentProject.FinDataBalance.TotalTransport2 = 0;
        currentProject.FinDataBalance.TotalBuildings2 = 0;;

        currentProject.FinDataBalance.TotalActive = 0;
        currentProject.FinDataBalance.PrepaymentsForFixedAssets = 0;
        currentProject.FinDataBalance.UnfinishedObjects = 0;
        currentProject.FinDataBalance.FixedAssetsTempNotInBusiness = 0;
        currentProject.FinDataBalance.CapitalCostsInUncompletedWork = 0;;


        currentProject.FinDataBalance.TotalActive2 = 0;
        currentProject.FinDataBalance.PrepaymentsForFixedAssets2 = 0;
        currentProject.FinDataBalance.UnfinishedObjects2 = 0;
        currentProject.FinDataBalance.FixedAssetsTempNotInBusiness2 = 0;
        currentProject.FinDataBalance.CapitalCostsInUncompletedWork2 = 0;

        currentProject.FinDataBalance.TotalShortAccountsPayable = 0;
        currentProject.FinDataBalance.IndebtednessToSuppliers = 0;
        currentProject.FinDataBalance.IndebtednessBuyers = 0;
        currentProject.FinDataBalance.IndebtednessForExpenses = 0;
        currentProject.FinDataBalance.CreditLoans = 0;

        currentProject.FinDataBalance.TotalShortAccountsPayable2 = 0;
        currentProject.FinDataBalance.IndebtednessToSuppliers2 = 0;
        currentProject.FinDataBalance.IndebtednessBuyers2 = 0;
        currentProject.FinDataBalance.IndebtednessForExpenses2 = 0;
        currentProject.FinDataBalance.CreditLoans2 = 0;

        currentProject.FinDataBalance.TotalLongAccountsPayable = 0;
        currentProject.FinDataBalance.BankLoans = 0;
        currentProject.FinDataBalance.Leasing = 0;
        currentProject.FinDataBalance.CommercialMortgage = 0;
        currentProject.FinDataBalance.PrivateLoans = 0;

        currentProject.FinDataBalance.TotalLongAccountsPayable2 = 0;
        currentProject.FinDataBalance.BankLoans2 = 0;
        currentProject.FinDataBalance.Leasing2 = 0;
        currentProject.FinDataBalance.CommercialMortgage2 = 0;
        currentProject.FinDataBalance.PrivateLoans2 = 0;


    }
}]);