blitzApp.factory('oddsCalculatorFactory', ['$rootScope', function($rootScope) {

    Array.prototype.SumArray = function(arr) {
        var sum = [];
        if (arr != null && this.length == arr.length) {
            for (var i = 0; i < arr.length; i++) {
                sum.push(this[i] + arr[i]);
            }
        }

        return sum;
    }

    Array.prototype.DeltaArray = function(arr) {
        var sum = [];
        if (arr != null && this.length == arr.length) {
            for (var i = 0; i < arr.length; i++) {
                sum.push(this[i] - arr[i]);
            }
        }

        return sum;
    }

    Array.prototype.MultArray = function(arr) {
        var sum = [];
        if (arr != null && this.length == arr.length) {
            for (var i = 0; i < arr.length; i++) {
                var d = (this[i] * arr[i]).toFixed(2);
                sum.push(d);
            }
        }

        return sum;
    }

    Array.prototype.DivArray = function(arr) {
        var sum = [];
        if (arr != null && this.length == arr.length) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] != 0) {

                    var d = (this[i] / arr[i]).toFixed(2);
                    sum.push(d);
                } else {
                    sum.push(0);
                }
            }
        }

        return sum;
    }
    var oddsCalculatorFactory = {};
    var months = ["M1", "M2", "M3", "M4", "M5", "M6"];

    function getVarArrayByName(currentProject, name) {
        var result = [];
        var ob = currentProject.FinDataOdds.Table.filter(function(item) {
            return item.VarName == name;
        });

        for (var z = 0; z < months.length; z++) {
            result.push(Number(ob[0][months[z]]));
        }

        return result;
    }

    function setVarArrayByName(currentProject, name, values) {
        var result = [];
        var ob = currentProject.FinDataOdds.Table.filter(function(item) {
            return item.VarName == name;
        });

        for (var z = 0; z < months.length; z++) {
            ob[0][months[z]] = values[z];
        }

        return result;
    }

    function calculateAvgData(currentProject) {
        //alert("OK");

        //alert(JSON.stringify(currentProject.FinDataOpiu.Table));

        for (var i = 0; i < currentProject.FinDataOdds.Table.length; i++) {
            //if (i == 0)

            for (var j = 0; j < currentProject.FinDataOdds.Table.length; j++) {
                var ob = currentProject.FinDataOdds.Table[j];
                //                var sum = Number(ob.M1) + Number(ob.M2) + Number(ob.M3) + Number(ob.M4) + Number(ob.M5) + Number(ob.M6);
                var sum = 0;
                for (var z = 0; z < months.length; z++) {
                    sum += Number(ob[months[z]]);
                }
                //Number(ob.M1) + Number(ob.M2) + Number(ob.M3) + Number(ob.M4) + Number(ob.M5) + Number(ob.M6);

                var avg = Number((sum / 6).toFixed(2));
                ob.Avg = avg;
                //alert(currentProject.FinDataOpiu.Table[i])
            }
            //alert(JSON.stringify(currentProject.FinDataOpiu.Table[i]));
        }

        $('#oddsTable').bootstrapTable('load', currentProject.FinDataOdds.Table);
        $('#oddsTable').bootstrapTable('resetView');
    }

    function sumArrays(data) {
        var sData = [];
        sData = data;
        var resultData = data[0];
        for (var i = 1; i < sData.length; i++) {
            var currentArray = sData[i];
            resultData = resultData.SumArray(currentArray);
        }
        return resultData;
    }



    function deltaArrays(data) {
        var sData = [];
        sData = data;
        var resultData = data[0];
        for (var i = 1; i < sData.length; i++) {
            var currentArray = sData[i];
            resultData = resultData.DeltaArray(currentArray);
        }
        return resultData;
    }

    function divArrays(data) {
        var sData = [];
        sData = data;
        var resultData = data[0];
        for (var i = 1; i < sData.length; i++) {
            var currentArray = sData[i];
            resultData = resultData.DivArray(currentArray);
        }
        return resultData;
    }


    function multArrays(data) {
        var sData = [];
        sData = data;
        var resultData = data[0];
        for (var i = 1; i < sData.length; i++) {
            var currentArray = sData[i];
            resultData = resultData.MultArray(currentArray);
        }
        return resultData;
    }




    function calculateTotalExpensesForBusiness(currentProject) {

        var ent = ['Wage',
            'DeliveryOfGoods',
            'Fare',
            'TravelExpenses',
            'Rent',
            'Utilities',
            'Taxes',
            'CommunicationServices',
            'Maintenance',
            'Advertising',
            'Consumables',
            'Hospitality',
            'MarriageDamageCancellation',
            'SponsorshipCharitableExpenses',
            'OtherBusinessExpenses'
        ];
        var calc = [];
        ent.forEach(function(element) {
            calc.push(getVarArrayByName(currentProject, element))
        }, this);
        var totalExpensesForBusiness = sumArrays(calc);
        setVarArrayByName(currentProject, "CostOfMoney", totalExpensesForBusiness);

    }

    function calculateOtherSupply(currentProject) {

        var ent = ['IncomeFromOPIU',
            'SingleIncome',
            'IncomeFromSponsorship'
        ];
        var calc = [];
        ent.forEach(function(element) {
            calc.push(getVarArrayByName(currentProject, element))
        }, this);
        var otherSupply = sumArrays(calc);
        setVarArrayByName(currentProject, "OtherSupply", otherSupply);

    }

    function calculateLoans(currentProject) {
        var ent = ['BankLoans',
            'PrivateLoans',
            'FinancialAid'
        ];
        var calc = [];
        ent.forEach(function(element) {
            calc.push(getVarArrayByName(currentProject, element))
        }, this);
        var loans = sumArrays(calc);
        setVarArrayByName(currentProject, "Loans", loans);

    }


    function calculateCapitalExpenditures(currentProject) {

        var ent = ['ConstructionRepair',
            'PurchaseOfFixedAssets',
            'CostsOutOfBusiness',
            'RepaymentOfLoans'
        ];
        var calc = [];
        ent.forEach(function(element) {
            calc.push(getVarArrayByName(currentProject, element))
        }, this);
        var capitalExpenditures = sumArrays(calc);
        setVarArrayByName(currentProject, "CapitalExpenditures", capitalExpenditures);

    }

    function calculateResultOfTheMonth(currentProject) {

        var ent = ['OtherSupply',
            'CostOfMoney',
            "CapitalExpenditures",

        ];
        var calc = [];
        ent.forEach(function(element) {
            calc.push(getVarArrayByName(currentProject, element))
        }, this);
        var resultOfTheMonth = deltaArrays(calc);
        setVarArrayByName(currentProject, "ResultOfTheMonth", resultOfTheMonth);

    }





    function getRevenueFromOpiu(currentProject) {
        var result = [];
        var ob = currentProject.FinDataOpiu.Table.filter(function(item) {
            return item.VarName == "Revenues";
        });

        for (var z = 0; z < months.length; z++) {
            result.push(ob[0][months[z]]);
        }
        setVarArrayByName(currentProject, "Revenues", result);
        //return result;
    }


    function getRevenueOtherIncome(currentProject) {
        var result = [];
        var ob = currentProject.FinDataOpiu.Table.filter(function(item) {
            return item.VarName == "OtherIncome";
        });

        for (var z = 0; z < months.length; z++) {
            result.push(ob[0][months[z]]);
        }
        setVarArrayByName(currentProject, "IncomeFromOPIU", result);
        //return result;
    }

    function calculateInternalVarsByMonths(currentProject) {
        getRevenueFromOpiu(currentProject);
        getRevenueOtherIncome(currentProject);
        calculateOtherSupply(currentProject)
        calculateTotalExpensesForBusiness(currentProject);
        calculateLoans(currentProject);
        calculateCapitalExpenditures(currentProject);
        calculateResultOfTheMonth(currentProject)
    }

    oddsCalculatorFactory.calculateData = function(currentProject) {
        calculateAvgData(currentProject);
        calculateInternalVarsByMonths(currentProject);

    }



    return oddsCalculatorFactory;

}]);