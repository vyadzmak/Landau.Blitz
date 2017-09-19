blitzApp.service('dataInitializer', ['$rootScope', function($rootScope) {
    this.setBalanceData = function(currentProject) {


        var d = new Date(currentProject.BalanceDate);
        var curr_date = d.getDate();
        var curr_month = d.getMonth() + 1;
        var curr_year = d.getFullYear();

        //document.write(curr_year + "-" + curr_month + "-" + curr_date);


        currentProject.FinDataBalance.Date = curr_date + "/" + curr_month + "/" + curr_year;

        //now.format("yyyy-mm-dd");
        //currentProject.FinDataBalance.Date = currentProject.FinDataBalance.Date.format("dd")
        if (currentProject.ParentExists) {

            d = new Date(currentProject.ParentProject.FinDataBalance.Date);
            curr_date = d.getDate();
            curr_month = d.getMonth() + 1;
            curr_year = d.getFullYear();

            currentProject.FinDataBalance.PreviousDate = curr_date + "/" + curr_month + "/" + curr_year;
        }

        currentProject.FinDataBalance.TotalCash = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.TotalCash2 : 0;
        currentProject.FinDataBalance.CashInAccounts = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.CashInAccounts2 : 0;;
        currentProject.FinDataBalance.CashInHands = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.CashInHands2 : 0;;
        currentProject.FinDataBalance.CashSavings = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.CashSavings2 : 0;
        currentProject.FinDataBalance.CashInBankAccounts = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.CashInBankAccounts2 : 0;;
        currentProject.FinDataBalance.CashInBankCurrencyAccounts = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.CashInBankCurrencyAccounts2 : 0;;
        currentProject.FinDataBalance.CashInCompanyDeposits = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.CashInCompanyDeposits2 : 0;;
        currentProject.FinDataBalance.CashInOwnerDeposits = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.CashInOwnerDeposits2 : 0;;

        //var x = y !== undefined ? y : 1;
        currentProject.FinDataBalance.TotalCash2 = 0;
        currentProject.FinDataBalance.CashInAccounts2 = 0;
        currentProject.FinDataBalance.CashInHands2 = 0;
        currentProject.FinDataBalance.CashSavings2 = 0;
        currentProject.FinDataBalance.CashInBankAccounts2 = 0;
        currentProject.FinDataBalance.CashInBankCurrencyAccounts2 = 0;
        currentProject.FinDataBalance.CashInCompanyDeposits2 = 0;
        currentProject.FinDataBalance.CashInOwnerDeposits2 = 0;

        currentProject.FinDataBalance.TotalDebt = 0;
        currentProject.FinDataBalance.ReceivablesPrepaymentsToSuppliers = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.ReceivablesPrepaymentsToSuppliers2 : 0;;
        currentProject.FinDataBalance.ReceivablesGoodsOnSale = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.ReceivablesGoodsOnSale2 : 0;
        currentProject.FinDataBalance.ReceivablesGoodsOnConsignment = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.ReceivablesGoodsOnConsignment2 : 0;
        currentProject.FinDataBalance.ReceivablesPrepaymentsForExpenses = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.ReceivablesPrepaymentsForExpenses2 : 0;
        currentProject.FinDataBalance.ReceivablesLoansGranted = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.ReceivablesLoansGranted2 : 0;
        currentProject.FinDataBalance.ReceivablesDebtBuyers = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.ReceivablesDebtBuyers2 : 0;

        currentProject.FinDataBalance.TotalDebt2 = 0;
        currentProject.FinDataBalance.ReceivablesPrepaymentsToSuppliers2 = 0;
        currentProject.FinDataBalance.ReceivablesGoodsOnSale2 = 0;
        currentProject.FinDataBalance.ReceivablesGoodsOnConsignment2 = 0;
        currentProject.FinDataBalance.ReceivablesPrepaymentsForExpenses2 = 0;
        currentProject.FinDataBalance.ReceivablesLoansGranted2 = 0;
        currentProject.FinDataBalance.ReceivablesDebtBuyers2 = 0;

        currentProject.FinDataBalance.TotalTMZ = 0;
        currentProject.FinDataBalance.TMZProducts = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.TMZProducts2 : 0;
        currentProject.FinDataBalance.TMZRawMaterials = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.TMZRawMaterials2 : 0;
        currentProject.FinDataBalance.TMZSemifinishedProducts = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.TMZSemifinishedProducts2 : 0;
        currentProject.FinDataBalance.TMZFinishedProducts = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.TMZFinishedProducts2 : 0;
        currentProject.FinDataBalance.TMZConsumables = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.TMZConsumables2 : 0;
        currentProject.FinDataBalance.TMZFeed = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.TMZFeed2 : 0;
        currentProject.FinDataBalance.TMZSeeds = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.TMZSeeds2 : 0;
        currentProject.FinDataBalance.TMZHerdOnFattening = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.TMZHerdOnFattening2 : 0;

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
        currentProject.FinDataBalance.TotalCash = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.TotalCash2 : 0;
        currentProject.FinDataBalance.TotalDebt = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.TotalDebt2 : 0;
        currentProject.FinDataBalance.TotalTMZ = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.TotalTMZ2 : 0;

        currentProject.FinDataBalance.TotalCurrentAssets2 = 0;
        currentProject.FinDataBalance.TotalCash2 = 0;
        currentProject.FinDataBalance.TotalDebt2 = 0;
        currentProject.FinDataBalance.TotalTMZ2 = 0;

        currentProject.FinDataBalance.TotalEquipment = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.TotalEquipment2 : 0;
        currentProject.FinDataBalance.ProductionEquipment = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.ProductionEquipment2 : 0;
        currentProject.FinDataBalance.RetailEquipment = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.RetailEquipment2 : 0;
        currentProject.FinDataBalance.Furniture = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.Furniture2 : 0;
        currentProject.FinDataBalance.OfficeEquipment = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.OfficeEquipment2 : 0;
        currentProject.FinDataBalance.OtherEquipment = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.OtherEquipment2 : 0;

        currentProject.FinDataBalance.TotalEquipment2 = 0;
        currentProject.FinDataBalance.ProductionEquipment2 = 0;
        currentProject.FinDataBalance.RetailEquipment2 = 0;
        currentProject.FinDataBalance.Furniture2 = 0;
        currentProject.FinDataBalance.OfficeEquipment2 = 0;
        currentProject.FinDataBalance.OtherEquipment2 = 0;

        currentProject.FinDataBalance.TotalTransport = 0;
        currentProject.FinDataBalance.PassengerTransport = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.PassengerTransport2 : 0;
        currentProject.FinDataBalance.FreightTransport = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.FreightTransport2 : 0;
        currentProject.FinDataBalance.SpecialMachinery = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.SpecialMachinery2 : 0;
        currentProject.FinDataBalance.OtherTransport = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.OtherTransport2 : 0;

        currentProject.FinDataBalance.TotalTransport2 = 0;
        currentProject.FinDataBalance.PassengerTransport2 = 0;
        currentProject.FinDataBalance.FreightTransport2 = 0;
        currentProject.FinDataBalance.SpecialMachinery2 = 0;
        currentProject.FinDataBalance.OtherTransport2 = 0;;

        currentProject.FinDataBalance.TotalBuildings = 0;
        currentProject.FinDataBalance.Offices = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.Offices2 : 0;
        currentProject.FinDataBalance.RetailPremises = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.RetailPremises2 : 0;
        currentProject.FinDataBalance.Caffees = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.Caffees2 : 0;
        currentProject.FinDataBalance.IndustrialPremises = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.IndustrialPremises2 : 0;
        currentProject.FinDataBalance.Warehouses = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.Warehouses2 : 0;
        currentProject.FinDataBalance.Buildings = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.Buildings2 : 0;
        currentProject.FinDataBalance.Territory = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.Territory2 : 0;
        currentProject.FinDataBalance.ProductionComplexes = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.ProductionComplexes2 : 0;

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
        currentProject.FinDataBalance.TotalEquipment = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.TotalEquipment2 : 0;
        currentProject.FinDataBalance.TotalTransport = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.TotalTransport2 : 0;
        currentProject.FinDataBalance.TotalBuildings = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.TotalBuildings2 : 0;


        currentProject.FinDataBalance.TotalFixedAssets2 = 0;
        currentProject.FinDataBalance.TotalEquipment2 = 0;
        currentProject.FinDataBalance.TotalTransport2 = 0;
        currentProject.FinDataBalance.TotalBuildings2 = 0;;


        currentProject.FinDataBalance.TotalInvestment = 0;
        currentProject.FinDataBalance.TotalInvestment2 = 0;

        currentProject.FinDataBalance.TotalActive = 0;
        currentProject.FinDataBalance.PrepaymentsForFixedAssets = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.PrepaymentsForFixedAssets2 : 0;
        currentProject.FinDataBalance.UnfinishedObjects = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.UnfinishedObjects2 : 0;
        currentProject.FinDataBalance.FixedAssetsTempNotInBusiness = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.FixedAssetsTempNotInBusiness2 : 0;
        currentProject.FinDataBalance.CapitalCostsInUncompletedWork = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.CapitalCostsInUncompletedWork2 : 0;


        currentProject.FinDataBalance.TotalActive2 = 0;
        currentProject.FinDataBalance.PrepaymentsForFixedAssets2 = 0;
        currentProject.FinDataBalance.UnfinishedObjects2 = 0;
        currentProject.FinDataBalance.FixedAssetsTempNotInBusiness2 = 0;
        currentProject.FinDataBalance.CapitalCostsInUncompletedWork2 = 0;

        currentProject.FinDataBalance.TotalShortAccountsPayable = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.TotalShortAccountsPayable2 : 0;
        currentProject.FinDataBalance.IndebtednessToSuppliers = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.IndebtednessToSuppliers2 : 0;
        currentProject.FinDataBalance.IndebtednessBuyers = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.IndebtednessBuyers2 : 0;
        currentProject.FinDataBalance.IndebtednessForExpenses = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.IndebtednessForExpenses2 : 0;
        currentProject.FinDataBalance.CreditLoans = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.CreditLoans2 : 0;

        currentProject.FinDataBalance.TotalShortAccountsPayable2 = 0;
        currentProject.FinDataBalance.IndebtednessToSuppliers2 = 0;
        currentProject.FinDataBalance.IndebtednessBuyers2 = 0;
        currentProject.FinDataBalance.IndebtednessForExpenses2 = 0;
        currentProject.FinDataBalance.CreditLoans2 = 0;

        currentProject.FinDataBalance.TotalLongAccountsPayable = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.TotalLongAccountsPayable2 : 0;
        currentProject.FinDataBalance.BankLoans = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.BankLoans2 : 0;
        currentProject.FinDataBalance.Leasing = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.Leasing2 : 0;
        currentProject.FinDataBalance.CommercialMortgage = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.CommercialMortgage2 : 0;
        currentProject.FinDataBalance.PrivateLoans = currentProject.ParentExists ? currentProject.ParentProject.FinDataBalance.PrivateLoans2 : 0;

        currentProject.FinDataBalance.TotalLongAccountsPayable2 = 0;
        currentProject.FinDataBalance.BankLoans2 = 0;
        currentProject.FinDataBalance.Leasing2 = 0;
        currentProject.FinDataBalance.CommercialMortgage2 = 0;
        currentProject.FinDataBalance.PrivateLoans2 = 0;

        currentProject.FinDataBalance.OwnCash = 0;
        currentProject.FinDataBalance.OwnCash2 = 0;
        currentProject.FinDataBalance.TotalOwnCash = 0;
        currentProject.FinDataBalance.TotalOwnCash2 = 0;


    }
}]);