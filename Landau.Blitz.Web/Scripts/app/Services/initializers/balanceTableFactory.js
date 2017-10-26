blitzApp.factory('balanceTableFactory', ['$rootScope', 'balanceCalculatorFactory', function($rootScope, balanceCalculatorFactory) {
    var balanceTableFactory = {};
    var balanceTable = {};

    function initSingleLine(aName, title1, val1, pName, title2, val2, bold = false) {
        var line = {};
        line.Active = title1;
        line.ActiveDate1 = val1;
        line.Passive = title2;
        line.PassiveDate1 = val2;
        line.ActiveName = aName;
        line.PassiveName = pName;
        line.Bold = bold;
        return line;
    }

        function initMultiLine(aName, title1, val1, val12, pName, title2, val2, val22, bold = false) {
            var line = {};
            line.Active = title1;
            line.ActiveDate1 = val1;
            line.ActiveDate2 = val12;
            line.Passive = title2;
            line.PassiveDate1 = val2;
            line.PassiveDate2 = val22;
            line.ActiveName = aName;
            line.PassiveName = pName;
            line.Bold = bold;
            return line;
        }

            balanceTableFactory.setDataToBalance = function(currentProject) {

                this.balanceTable.forEach(function(element) {
                    // alert(JSON.stringify(element))
                    var activeName = element.ActiveName;
                    var activeValue = element.ActiveDate1;
                    var passiveName = element.PassiveName;
                    var passiveValue = element.PassiveDate1;

                    if (activeValue == "") activeValue = 0;
                    if (passiveValue == "") passiveValue = 0;

                    if (activeName != "") {

                        var lngt = Object.keys(currentProject.FinDataBalance).length;
                        var vIndex = -1;
                        for (var i = 0; i < lngt; i++) {
                            if (Object.keys(currentProject.FinDataBalance)[i] == activeName) {
                                vIndex = i;
                                break;
                            }
                        }

                        if (vIndex != -1) {
                            var tb = Object.keys(currentProject.FinDataBalance)[vIndex];
                            var tv = Object.values(currentProject.FinDataBalance)[vIndex];
                            currentProject.FinDataBalance[activeName] = +(activeValue);

                        };
                    }

                    if (passiveName != "") {

                        var lngt = Object.keys(currentProject.FinDataBalance).length;
                        var vIndex = -1;
                        for (var i = 0; i < lngt; i++) {
                            if (Object.keys(currentProject.FinDataBalance)[i] == passiveName) {
                                vIndex = i;
                                break;
                            }
                        }

                        if (vIndex != -1) {
                            var tb = Object.keys(currentProject.FinDataBalance)[vIndex];
                            var tv = Object.values(currentProject.FinDataBalance)[vIndex];
                            currentProject.FinDataBalance[passiveName] = +(passiveValue);

                        };
                    }

                }, this);


                if (currentProject.ParentExists) {
                    this.balanceTable.forEach(function(element) {
                        // alert(JSON.stringify(element))
                        var activeName = element.ActiveName;
                        var activeValue = element.ActiveDate2;
                        var passiveName = element.PassiveName;
                        var passiveValue = element.PassiveDate2;

                        if (activeValue == "") activeValue = 0;
                        if (passiveValue == "") passiveValue = 0;

                        if (activeName != "") {

                            var lngt = Object.keys(currentProject.FinDataBalance).length;
                            var vIndex = -1;
                            for (var i = 0; i < lngt; i++) {
                                if (Object.keys(currentProject.FinDataBalance)[i] == activeName) {
                                    vIndex = i;
                                    break;
                                }
                            }

                            if (vIndex != -1) {
                                var tb = Object.keys(currentProject.FinDataBalance)[vIndex];
                                var tv = Object.values(currentProject.FinDataBalance)[vIndex];
                                currentProject.FinDataBalance[activeName] = +(activeValue);

                            };
                        }

                        if (passiveName != "") {

                            var lngt = Object.keys(currentProject.FinDataBalance).length;
                            var vIndex = -1;
                            for (var i = 0; i < lngt; i++) {
                                if (Object.keys(currentProject.FinDataBalance)[i] == passiveName) {
                                    vIndex = i;
                                    break;
                                }
                            }

                            if (vIndex != -1) {
                                var tb = Object.keys(currentProject.FinDataBalance)[vIndex];
                                var tv = Object.values(currentProject.FinDataBalance)[vIndex];
                                currentProject.FinDataBalance[passiveName] = +(passiveValue);

                            };
                        }

                    }, this);

                }
                balanceCalculatorFactory.calculateData(currentProject);

            }

            function initSinglePeriodProject() {
                var table = {};

                var arr = [];
                var lines = [];
                //первый блок
                arr.push(initSingleLine("", "Денежные средства", "", "", "Краткосрочная кредиторская задолженность", "", true))
                arr.push(initSingleLine("CashInAccounts2", "Наличные денежные средства в кассе (-ах) компании на момент ФА", "0", "IndebtednessToSuppliers2", "Задолженности поставщикам", "0"))
                arr.push(initSingleLine("CashInHands2", "Наличные денежные средства на руках Клиента (выручка предыдущих дней)", "0", "IndebtednessBuyers2", "Задолженность покупателям (предоплаты)", "0"))
                arr.push(initSingleLine("CashSavings2", "Наличные денежные средства в сейфе/хранилище/ячейке (накопления предыдущих периодов)", "0", "IndebtednessForExpenses2", "Задолженность по расходам", "0"))
                arr.push(initSingleLine("CashInBankAccounts2", "Денежные средства на Р/С компании", "0", "CreditLoans2", "Кредиты/займы", "0"))
                arr.push(initSingleLine("CashInBankCurrencyAccounts2", "Денежные средства на валютных счетах компании", "0", "", "", ""))

                arr.push(initSingleLine("CashInCompanyDeposits2", "Денежные средства на депозите, оформленном на компанию", "0", "", "", ""))
                arr.push(initSingleLine("CashInOwnerDeposits2", "Денежные средства на депозите, оформленном на собственника/другое лицо", "0", "", "", ""))
                arr.push(initSingleLine("TotalCash2", "Итого Денежные Средства", "0", "TotalShortAccountsPayable2", "Итого краткосрочная КЗ", "0", true))

                //второй блок
                arr.push(initSingleLine("", "Дебиторская задолженность", "", "", "Долгосрочные кредиты и займы", "0", true))
                arr.push(initSingleLine("ReceivablesPrepaymentsToSuppliers2", "Предоплаты поставщикам", "0", "BankLoans2", "Банковчкие займы", "0"))
                arr.push(initSingleLine("FinDataBalance.ReceivablesGoodsOnSale2", "Товар на реализации", "0", "Leasing2", "Лизинг", "0"))
                arr.push(initSingleLine("ReceivablesGoodsOnConsignment2", "Товар на консигнации", "0", "CommercialMortgage2", "Коммерческая ипотека", "0"))
                arr.push(initSingleLine("ReceivablesPrepaymentsForExpenses2", "Предоплаты по расходам", "0", "PrivateLoans2", "Частные займы", "0"))
                arr.push(initSingleLine("ReceivablesLoansGranted2", "Авансы/займы выданные", "0", "", "", ""))
                arr.push(initSingleLine("ReceivablesDebtBuyers2", "Задолженность покупателей", "0", "", "", ""))
                arr.push(initSingleLine("TotalDebt2", "Итого Дебиторская задолженность", "0", "TotalLongAccountsPayable2", "Итоговое значение по всем статьям имеющейся задолженности сроком свыше 1 года", "0", true))

                //третий блок
                arr.push(initSingleLine("", "ТМЗ", "", "", "", "", true))
                //TMZ
                arr.push(initSingleLine("TMZProducts2", "Товары", "0", "", "", ""))
                arr.push(initSingleLine("TMZRawMaterials2", "Сырье", "0", "", "", ""))
                arr.push(initSingleLine("TMZSemifinishedProducts2", "Полуфабрикаты", "0", "", "", ""))
                arr.push(initSingleLine("TMZFinishedProducts2", "Готовая продукция", "0", "", "", ""))
                arr.push(initSingleLine("TMZConsumables2", "Расходные материалы", "0", "", "", ""))
                arr.push(initSingleLine("TMZFeed2", "Корма", "0", "", "", ""))
                arr.push(initSingleLine("TMZSeeds2", "Семена", "0", "", "", ""))
                arr.push(initSingleLine("TMZHerdOnFattening2", "Стадо на откорме", "0", "", "", ""))
                arr.push(initSingleLine("TotalTMZ2", "Итого ТМЗ", "0", "", "", "", true))
                arr.push(initSingleLine("TotalCurrentAssets2", "Итого Оборотных средств", "0", "", "", "", true))

                //четвертый блок
                //оборудование
                arr.push(initSingleLine("", "Оборудование", "", "", "", "", true))
                //расшифровка
                arr.push(initSingleLine("ProductionEquipment2", "Производственное оборудование", "0", "", "", ""))
                arr.push(initSingleLine("RetailEquipment2", "Торговое оборудование", "0", "", "", ""))
                arr.push(initSingleLine("Furniture2", "Мебель", "0", "", "", ""))
                arr.push(initSingleLine("OfficeEquipment2", "Оргтехника", "0", "", "", ""))
                arr.push(initSingleLine("OtherEquipment2", "Прочее оборудование", "0", "", "", ""))
                arr.push(initSingleLine("TotalEquipment2", "Итого оборудование", "0", "", "", "", true))

                //5 блок автотранспорт
                arr.push(initSingleLine("", "Автотранспорт", "", "", "", "", true))

                //расшифровка
                arr.push(initSingleLine("PassengerTransport2", "Легковой автотранспорт", "0", "", "", ""))
                arr.push(initSingleLine("FreightTransport2", "Грузовой автотранспорт", "0", "", "", ""))
                arr.push(initSingleLine("SpecialMachinery2", "Спецтехника", "0", "", "", ""))
                arr.push(initSingleLine("OtherTransport2", "Прочее", "0", "", "", ""))
                arr.push(initSingleLine("TotalTransport2", "Итого автотранспорт", "0", "", "", "", true))

                //6-й блок  недвижимость
                arr.push(initSingleLine("", "Недвижимость", "", "", "", "", true))

                //расшифровка
                arr.push(initSingleLine("Offices2", "Офисы", "0", "", "", ""))
                arr.push(initSingleLine("RetailPremises2", "Торговые помещения", "0", "", "", ""))
                arr.push(initSingleLine("Caffees2", "Кафе, рестораны и т.п. заведения", "0", "", "", ""))
                arr.push(initSingleLine("IndustrialPremises2", "Производственные помещения", "0", "", "", ""))
                arr.push(initSingleLine("Warehouses2", "Складские помещения", "0", "", "", ""))
                arr.push(initSingleLine("Buildings2", "Здания и сооружения", "0", "", "", ""))
                arr.push(initSingleLine("Territory2", "Земля", "0", "", "", ""))
                arr.push(initSingleLine("ProductionComplexes2", "Производственные комплексы", "0", "", "", ""))
                arr.push(initSingleLine("TotalBuildings2", "Итого недвижимость", "0", "", "", "", true))
                arr.push(initSingleLine("TotalFixedAssets2", "Итого Основных средств", "0", "", "", "", true))

                //инвестиции
                arr.push(initSingleLine("", "Инвестиции", "", "", "Собственный капитал", "", true))
                //расшифровка
                arr.push(initSingleLine("PrepaymentsForFixedAssets2", "Предоплаты за основные средства", "0", "OwnCash2", "Собственный капитал", "0"))
                arr.push(initSingleLine("UnfinishedObjects2", "Недостроенные объекты", "0", "", "", ""))
                arr.push(initSingleLine("FixedAssetsTempNotInBusiness2", "Основные     средства, временно не участвующие в бизнесе", "0", "", "", ""))
                arr.push(initSingleLine("CapitalCostsInUncompletedWork2", "Капитальные затраты в основные средства на стадии не завершенных работ ", "0", "", "", ""))
                arr.push(initSingleLine("TotalInvestment2", "Итого инвестиции", "0", "TotalOwnCash2", "Итого собственный капитал", "0", true))

                //итого актив/пасив
                arr.push(initSingleLine("TotalActive2", "Итого актив", "0", "TotalPassive2", "Итого пассив", "0", true))
                //результат
                table = arr;
                return table;
            }



            function initMultiPeriodProject(currentProject) {
                var table = {};

                var arr = [];
                var lines = [];
                //первый блок
                arr.push(initMultiLine("", "Денежные средства", "", "", "", "Краткосрочная кредиторская задолженность", "", "", true))
                arr.push(initMultiLine("CashInAccounts2", "Наличные денежные средства в кассе (-ах) компании на момент ФА", currentProject.FinDataBalance.CashInAccounts, "0", "IndebtednessToSuppliers2", "Задолженности поставщикам", currentProject.FinDataBalance.IndebtednessToSuppliers, "0"))
                arr.push(initMultiLine("CashInHands2", "Наличные денежные средства на руках Клиента (выручка предыдущих дней)", currentProject.FinDataBalance.CashInHands, "0", "IndebtednessBuyers2", "Задолженность покупателям (предоплаты)", currentProject.FinDataBalance.IndebtednessBuyers, "0"))
                arr.push(initMultiLine("CashSavings2", "Наличные денежные средства в сейфе/хранилище/ячейке (накопления предыдущих периодов)", currentProject.FinDataBalance.CashSavings, "0", "IndebtednessForExpenses2", "Задолженность по расходам", currentProject.FinDataBalance.IndebtednessForExpenses, "0"))
                arr.push(initMultiLine("CashInBankAccounts2", "Денежные средства на Р/С компании", currentProject.FinDataBalance.CashInBankAccounts, "0", "CreditLoans2", "Кредиты/займы", currentProject.FinDataBalance.CreditLoans, "0"))
                arr.push(initMultiLine("CashInBankCurrencyAccounts2", "Денежные средства на валютных счетах компании", currentProject.FinDataBalance.CashInBankCurrencyAccounts, "0", "", "", "", ""))

                arr.push(initMultiLine("CashInCompanyDeposits2", "Денежные средства на депозите, оформленном на компанию", currentProject.FinDataBalance.CashInCompanyDeposits, "0", "", "", "", ""))
                arr.push(initMultiLine("CashInOwnerDeposits2", "Денежные средства на депозите, оформленном на собственника/другое лицо", currentProject.FinDataBalance.CashInOwnerDeposits, "0", "", "", "", ""))
                arr.push(initMultiLine("TotalCash2", "Итого Денежные Средства", currentProject.FinDataBalance.TotalCash, "0", "TotalShortAccountsPayable2", "Итого краткосрочная КЗ", currentProject.FinDataBalance.TotalShortAccountsPayable, "0", true))

                //второй блок
                arr.push(initMultiLine("", "Дебиторская задолженность", "", "", "", "Долгосрочные кредиты и займы", "", "", true))
                arr.push(initMultiLine("ReceivablesPrepaymentsToSuppliers2", "Предоплаты поставщикам", currentProject.FinDataBalance.ReceivablesPrepaymentsToSuppliers, "0", "BankLoans2", "Банковcкие займы", currentProject.FinDataBalance.BankLoans, "0"))
                arr.push(initMultiLine("ReceivablesGoodsOnSale2", "Товар на реализации", currentProject.FinDataBalance.ReceivablesGoodsOnSale, "0", "Leasing2", "Лизинг", currentProject.FinDataBalance.Leasing, "0"))
                arr.push(initMultiLine("ReceivablesGoodsOnConsignment2", "Товар на консигнации", currentProject.FinDataBalance.ReceivablesGoodsOnConsignment, "0", "CommercialMortgage2", "Коммерческая ипотека", currentProject.FinDataBalance.CommercialMortgage, "0"))
                arr.push(initMultiLine("ReceivablesPrepaymentsForExpenses2", "Предоплаты по расходам", currentProject.FinDataBalance.ReceivablesPrepaymentsForExpenses, "0", "PrivateLoans2", "Частные займы", currentProject.FinDataBalance.PrivateLoans, "0"))
                arr.push(initMultiLine("ReceivablesLoansGranted2", "Авансы/займы выданные", currentProject.FinDataBalance.ReceivablesLoansGranted, "0", "", "", "", ""))
                arr.push(initMultiLine("ReceivablesDebtBuyers2", "Задолженность покупателей", currentProject.FinDataBalance.ReceivablesDebtBuyers, "0", "", "", "", ""))
                arr.push(initMultiLine("TotalDebt2", "Итого Дебиторская задолженность", currentProject.FinDataBalance.TotalDebt, "0", "TotalLongAccountsPayable2", "Итоговое значение по всем статьям имеющейся задолженности сроком свыше 1 года", currentProject.FinDataBalance.TotalLongAccountsPayable, "0", true))

                //третий блок
                arr.push(initMultiLine("", "ТМЗ", "", "", "", "", "", "", true))
                //TMZ
                arr.push(initMultiLine("TMZProducts2", "Товары", currentProject.FinDataBalance.TMZProducts, "0", "", "", "", ""))
                arr.push(initMultiLine("TMZRawMaterials2", "Сырье", currentProject.FinDataBalance.TMZRawMaterials, "0", "", "", "", ""))
                arr.push(initMultiLine("TMZSemifinishedProducts2", "Полуфабрикаты", currentProject.FinDataBalance.TMZSemifinishedProducts, "0", "", "", "", ""))
                arr.push(initMultiLine("TMZFinishedProducts2", "Готовая продукция", currentProject.FinDataBalance.TMZFinishedProducts, "0", "", "", "", ""))
                arr.push(initMultiLine("TMZConsumables2", "Расходные материалы", currentProject.FinDataBalance.TMZConsumables, "0", "", "", "", ""))
                arr.push(initMultiLine("TMZFeed2", "Корма", currentProject.FinDataBalance.TMZFeed, "0", "", "", "", ""))
                arr.push(initMultiLine("TMZSeeds2", "Семена", currentProject.FinDataBalance.TMZSeeds, "0", "", "", "", ""))
                arr.push(initMultiLine("TMZHerdOnFattening2", "Стадо на откорме", currentProject.FinDataBalance.TMZHerdOnFattening, "0", "", "", "", ""))
                arr.push(initMultiLine("TotalTMZ2", "Итого ТМЗ", currentProject.FinDataBalance.TotalTMZ, "0", "", "", "", "", true))
                arr.push(initMultiLine("TotalCurrentAssets2", "Итого Оборотных средств", currentProject.FinDataBalance.TotalCurrentAssets, "0", "", "", "", "", true))

                //четвертый блок
                //оборудование
                arr.push(initMultiLine("", "Оборудование", "", "", "", "", "", "", true))
                //расшифровка
                arr.push(initMultiLine("ProductionEquipment2", "Производственное оборудование", currentProject.FinDataBalance.ProductionEquipment, "0", "", "", "", ""))
                arr.push(initMultiLine("RetailEquipment2", "Торговое оборудование", currentProject.FinDataBalance.RetailEquipment, "0", "", "", "", ""))
                arr.push(initMultiLine("Furniture2", "Мебель", currentProject.FinDataBalance.Furniture, "0", "", "", "", ""))
                arr.push(initMultiLine("OfficeEquipment2", "Оргтехника", currentProject.FinDataBalance.OfficeEquipment, "0", "", "", "", ""))
                arr.push(initMultiLine("OtherEquipment2", "Прочее оборудование", currentProject.FinDataBalance.OtherEquipment, "0", "", "", "", ""))
                arr.push(initMultiLine("TotalEquipment2", "Итого оборудование", currentProject.FinDataBalance.TotalEquipment, "0", "", "", "", "", true))

                //5 блок автотранспорт
                arr.push(initMultiLine("", "Автотранспорт", "", "", "", "", "", "", true))

                //расшифровка
                arr.push(initMultiLine("PassengerTransport2", "Легковой автотранспорт", currentProject.FinDataBalance.PassengerTransport, "0", "", "", "", ""))
                arr.push(initMultiLine("FreightTransport2", "Грузовой автотранспорт", currentProject.FinDataBalance.FreightTransport, "0", "", "", "", ""))
                arr.push(initMultiLine("SpecialMachinery2", "Спецтехника", currentProject.FinDataBalance.SpecialMachinery, "0", "", "", "", ""))
                arr.push(initMultiLine("OtherTransport2", "Прочее", currentProject.FinDataBalance.OtherTransport, "0", "", "", "", ""))
                arr.push(initMultiLine("TotalTransport2", "Итого автотранспорт", currentProject.FinDataBalance.TotalTransport, "0", "", "", "", "", true))

                //6-й блок  недвижимость
                arr.push(initMultiLine("", "Недвижимость", "", "", "", "", "", "", true))

                //расшифровка
                arr.push(initMultiLine("Offices2", "Офисы", currentProject.FinDataBalance.Offices, "0", "", "", "", ""))
                arr.push(initMultiLine("RetailPremises2", "Торговые помещения", currentProject.FinDataBalance.RetailPremises, "0", "", "", "", ""))
                arr.push(initMultiLine("Caffees2", "Кафе, рестораны и т.п. заведения", currentProject.FinDataBalance.Caffees, "0", "", "", "", ""))
                arr.push(initMultiLine("IndustrialPremises2", "Производственные помещения", currentProject.FinDataBalance.IndustrialPremises, "0", "", "", "", ""))
                arr.push(initMultiLine("Warehouses2", "Складские помещения", currentProject.FinDataBalance.Warehouses, "0", "", "", "", ""))
                arr.push(initMultiLine("Buildings2", "Здания и сооружения", currentProject.FinDataBalance.Buildings, "0", "", "", "", ""))
                arr.push(initMultiLine("Territory2", "Земля", currentProject.FinDataBalance.Territory, "0", "", "", "", ""))
                arr.push(initMultiLine("ProductionComplexes2", "Производственные комплексы", currentProject.FinDataBalance.ProductionComplexes, "0", "", "", "", ""))
                arr.push(initMultiLine("TotalBuildings2", "Итого недвижимость", currentProject.FinDataBalance.TotalBuildings, "0", "", "", "", "", true))
                arr.push(initMultiLine("TotalFixedAssets2", "Итого Основных средств", currentProject.FinDataBalance.TotalFixedAssets, "0", "", "", "", "", true))

                //инвестиции
                arr.push(initMultiLine("", "Инвестиции", "", "", "", "Собственный капитал", "", "", true))
                //расшифровка
                arr.push(initMultiLine("PrepaymentsForFixedAssets2", "Предоплаты за основные средства", currentProject.FinDataBalance.PrepaymentsForFixedAssets, "0", "OwnCash2", "Собственный капитал", currentProject.FinDataBalance.OwnCash, "0"))
                arr.push(initMultiLine("UnfinishedObjects2", "Недостроенные объекты", currentProject.FinDataBalance.UnfinishedObjects, "0", "", "", "", ""))
                arr.push(initMultiLine("FixedAssetsTempNotInBusiness2", "Основные     средства, временно не участвующие в бизнесе", currentProject.FinDataBalance.FixedAssetsTempNotInBusiness, "0", "", "", "", ""))
                arr.push(initMultiLine("CapitalCostsInUncompletedWork2", "Капитальные затраты в основные средства на стадии не завершенных работ ", currentProject.FinDataBalance.CapitalCostsInUncompletedWork, "0", "", "", "", ""))
                arr.push(initMultiLine("TotalInvestment2", "Итого инвестиции", currentProject.FinDataBalance.TotalInvestment, "0", "TotalOwnCash2", "Итого собственный капитал", currentProject.FinDataBalance.TotalOwnCash, "0", true))

                //итого актив/пасив
                arr.push(initMultiLine("TotalActive2", "Итого актив", currentProject.FinDataBalance.TotalActive, "0", "TotalPassive2", "Итого пассив", currentProject.FinDataBalance.TotalPassive, "0", true))
                //результат
                table = arr;
                return table;
            }

            function initAssets() {
                var assets = {};
                var assetsNames = [
                    'Checkout',
                    'CurrentAccount',
                    'Savings',
                    'Deposit',
                    'RecievableAccounts',
                    'TransitGoods',
                    'SuppliersPrepayment',
                    'OtherRecievables',
                    'Inventories',
                    'FinishedGoods',
                    'RawMaterials',
                    'SemiProducts',
                    'ForSaleGoods',
                    'Hardware',
                    'MotorTransport',
                    'RealEstate',
                    'Investments'
                ];

                angular.forEach(assetsNames, function(value, key) {
                    assets[value]= {
                        Total: 0,
                        Rows:[]
                    }
                    if (value === 'MotorTransport' || value === 'Hardware') {
                        assets[value].OwnRows = [];
                    }
                });

                return assets;
            }

            function initLiabilities() {
                var liabilities = {};
                var liabilitiesNames = [
                    'BudgetSettlements',
                    'RentalsArrears',
                    'ShortTermDebt',
                    'PayableAccounts',
                    'CommodityLoan',
                    'CustomersPrepayment',
                    'ShortPrivateLoans',
                    'ShortWorkingCapitalCredit',
                    'ShortFixedAssetsCredit',
                    'OtherCurrentDebt',
                    'LongPrivateLoans',
                    'LongWorkingCapitalCredit',
                    'LongFixedAssetsCredit',
                    'OtherLiabilities'
                ];
                angular.forEach(liabilitiesNames, function(value, key) {
                    liabilities[value]= {
                        Total: 0,
                        Rows:[]
                    }
                });
                return liabilities;
            }

            balanceTableFactory.setSinglePeriodProject = function(currentProject) {
                this.balanceTable = currentProject.FinDataBalance.Table;
            }

            //-------------------------------init functions --------------------------------------//
            balanceTableFactory.initBalanceTable = function(currentProject) {

                if (!currentProject.ParentExists) {
                    balanceTable = initSinglePeriodProject();
                } else {
                    balanceTable = initMultiPeriodProject(currentProject);
                }
                this.balanceTable = balanceTable;
                //alert(JSON.stringify(currentProject));
                return balanceTable;
            }

            
            balanceTableFactory.initBalances = function(companies) {
                var balances = [];
                angular.forEach(companies, function(company, key) {
                    var balance = {
                        Id: key+1,
                        CompanyName: company.Name,
                        CompanyBalances: []
                    }
                    angular.forEach(company.BalanceDates, function(bDate, key) {
                        var cBalance = {
                            Id:key+1,
                            Name: 'Баланс от '+moment(bDate.Date).format('DD.MM.YY'),
                            Date: bDate.Date
                        }
                        cBalance.Assets = initAssets();
                        cBalance.Liabilities = initLiabilities();

                        cBalance.LiquidAssets = 0;
                        cBalance.Receivables = 0;
                        cBalance.Inventories = 0;
                        cBalance.TotalCurrentAssets = 0;
                        cBalance.TotalFixedAssets = 0;
                        cBalance.TotalAssets = 0;

                        cBalance.TotalShortTermDebt = 0;
                        cBalance.TotalLongTermDebt = 0;
                        cBalance.TotalLongAccountsPayable = 0;
                        cBalance.Equity = 0;
                        cBalance.TotalLiabilities = 0;

                        balance.CompanyBalances.push(cBalance);
                    });
                    balances.push(balance);
                });

                return balances;
            }

            return balanceTableFactory;

        }]);