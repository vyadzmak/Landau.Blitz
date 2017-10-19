blitzApp.factory('opiuCalculatorFactory', ['$rootScope', function($rootScope) {

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
    var opiuCalculatorFactory = {};
    var months = ["M1", "M2", "M3", "M4", "M5", "M6"];

    function getVarArrayByName(currentProject, name) {
        var result = [];
        var ob = currentProject.FinDataOpiu.Table.filter(function(item) {
            return item.VarName == name;
        });
        if (ob == undefined || ob.length == 0) return;
        for (var z = 0; z < months.length; z++) {
            result.push(Number(ob[0][months[z]]));
        }

        return result;
    }

    function setVarArrayByName(currentProject, name, values) {
        var result = [];
        var ob = currentProject.FinDataOpiu.Table.filter(function(item) {
            return item.VarName == name;
        });
        if (ob == undefined || values == undefined) return;

        for (var z = 0; z < months.length; z++) {
            ob[0][months[z]] = values[z];
        }

        return result;
    }

    function calculateAvgData(currentProject) {
        //alert("OK");

        //alert(JSON.stringify(currentProject.FinDataOpiu.Table));

        //for (var i = 0; i < currentProject.FinDataOpiu.Table.length; i++) {
        //    //if (i == 0)

        //    for (var j = 0; j < currentProject.FinDataOpiu.Table.length; j++) {
        //        var ob = currentProject.FinDataOpiu.Table[j];
        //        //                var sum = Number(ob.M1) + Number(ob.M2) + Number(ob.M3) + Number(ob.M4) + Number(ob.M5) + Number(ob.M6);
        //        var sum = 0;
        //        for (var z = 0; z < months.length; z++) {
        //            sum += Number(ob[months[z]]);
        //        }
        //        //Number(ob.M1) + Number(ob.M2) + Number(ob.M3) + Number(ob.M4) + Number(ob.M5) + Number(ob.M6);

        //        var avg = Number((sum / 6).toFixed(2));
        //        ob.Avg = avg;
        //        //alert(currentProject.FinDataOpiu.Table[i])
        //    }
        //    //alert(JSON.stringify(currentProject.FinDataOpiu.Table[i]));
        //}

        //$('#opiuTable').bootstrapTable('load', currentProject.FinDataOpiu.Table);
        //$('#opiuTable').bootstrapTable('resetView');
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

    function calculateMargin(currentProject, service) {
        var revenues = getVarArrayByName(currentProject, "Revenues" + service);
        var costOfGoods = getVarArrayByName(currentProject, "CostOfGoods" + service);;
        var margins = [];
        for (var i = 0; i < revenues.length; i++) {
            var r = revenues[i];
            var c = costOfGoods[i];
            var m = 0;
            if (c != 0) {
                m = Number((r / c - 1) * 100).toFixed(2);
            }
            margins.push(m);;
        }
        setVarArrayByName(currentProject, "Margin" + service, margins);

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
        setVarArrayByName(currentProject, "TotalExpensesForBusiness", totalExpensesForBusiness);

    }

    function calculateProfitOnBusiness(currentProject) {

        var ent = ["TotalGrossProfit", 'TotalExpensesForBusiness'];
        var calc = [];
        ent.forEach(function(element) {
            calc.push(getVarArrayByName(currentProject, element))
        }, this);
        var profitOnBusiness = deltaArrays(calc);
        setVarArrayByName(currentProject, "ProfitOnBusiness", profitOnBusiness);

    }

    function calculateGrossProfit(currentProject, service) {
        var revenues = getVarArrayByName(currentProject, "Revenues" + service);
        var costOfGoods = getVarArrayByName(currentProject, "CostOfGoods" + service);;
        var margins = [];
        var calc = [revenues, costOfGoods];
        var grossProfit = deltaArrays(calc);
        setVarArrayByName(currentProject, "GrossProfit" + service, grossProfit);
        //alert(margins);

    }

    function calculateTotalGrossProfit(currentProject) {
        var gProfitService = getVarArrayByName(currentProject, "GrossProfitService");
        var gProfitTrade = getVarArrayByName(currentProject, "GrossProfitTrade");
        var gAgriculture = getVarArrayByName(currentProject, "GrossProfitAgriculture");
        var gProduction = getVarArrayByName(currentProject, "GrossProfitProduction");;

        var margins = [];
        var calc = [];
        if (currentProject.ProjectAnalysis.ActivityService) calc.push(gProfitService);
        if (currentProject.ProjectAnalysis.ActivityTrade) calc.push(gProfitTrade);
        if (currentProject.ProjectAnalysis.ActivityAgriculture) calc.push(gAgriculture);
        if (currentProject.ProjectAnalysis.ActivityProduction) calc.push(gProduction);

        var grossProfit = sumArrays(calc);
        setVarArrayByName(currentProject, "TotalGrossProfit", grossProfit);
        //alert(margins);

    }


    function calculateTotalRevenues(currentProject) {
        var revenuesService = getVarArrayByName(currentProject, "RevenuesService");
        var revenuesTrade = getVarArrayByName(currentProject, "RevenuesTrade");
        var revenuesAgriculture = getVarArrayByName(currentProject, "RevenuesAgriculture");
        var revenuesProduction = getVarArrayByName(currentProject, "RevenuesProduction");;

        var margins = [];
        var calc = [];
        if (currentProject.ProjectAnalysis.ActivityService) calc.push(revenuesService);
        if (currentProject.ProjectAnalysis.ActivityTrade) calc.push(revenuesTrade);
        if (currentProject.ProjectAnalysis.ActivityAgriculture) calc.push(revenuesAgriculture);
        if (currentProject.ProjectAnalysis.ActivityProduction) calc.push(revenuesProduction);

        var totalRevenues = sumArrays(calc);
        setVarArrayByName(currentProject, "TotalRevenues", totalRevenues);
        //alert(margins);

    }


    function calculateOtherExpenses(currentProject) {

        var ent = ['FamilyExpenses',
            'PaymentForTheEducationOfChildren',
            'AssistanceToParentsChildren',
            'AttendanceEvents',
            'Hobbies',
            'TravelingFamily',
            'DividendPayment',
            'OtherFamilyExpenses'
        ];
        var calc = [];
        ent.forEach(function(element) {
            calc.push(getVarArrayByName(currentProject, element))
        }, this);
        var otherExpenses = sumArrays(calc);
        setVarArrayByName(currentProject, "OtherExpenses", otherExpenses);

    }

    function calculateOtherIncome(currentProject) {

        var ent = ['SalaryOfFamilyMembers',
            'IncomeFromTheRentalOfImmovableProperty',
            "IncomeFromNonCoreActivitiesOfTheClient",
            'OtherIncomeOut'
        ];
        var calc = [];
        ent.forEach(function(element) {
            calc.push(getVarArrayByName(currentProject, element))
        }, this);
        var otherIncome = sumArrays(calc);
        setVarArrayByName(currentProject, "OtherIncome", otherIncome);

    }

    function calculateNetProfit(currentProject) {

        var entSum = ['ProfitOnBusiness',
            'OtherIncome'

        ];
        var calc = [];
        entSum.forEach(function(element) {
            calc.push(getVarArrayByName(currentProject, element))
        }, this);
        var sum = sumArrays(calc);
        var _calc = [];
        _calc.push(sum);
        var entDelta = ['OtherExpenses'];

        entDelta.forEach(function(element) {
            _calc.push(getVarArrayByName(currentProject, element))
        }, this);

        var netProfit = deltaArrays(_calc);
        setVarArrayByName(currentProject, "NetProfit", netProfit);

    }


    function calculateValueOfContributionProfit(currentProject) {

        var ent = ["NetProfit", 'LoanPayment'];
        var calc = [];
        ent.forEach(function(element) {
            calc.push(getVarArrayByName(currentProject, element))
        }, this);
        var valueOfContributionProfit = divArrays(calc);
        setVarArrayByName(currentProject, "ValueOfContributionProfit", valueOfContributionProfit);

    }

    function calculateValueOfContributionProfit(currentProject) {

        var ent = ['LoanPayment', "NetProfit"];
        var calc = [];
        ent.forEach(function(element) {
            calc.push(getVarArrayByName(currentProject, element))
        }, this);
        var valueOfContributionProfit = divArrays(calc);
        setVarArrayByName(currentProject, "ValueOfContributionProfit", valueOfContributionProfit);

    }

    function calculateSpeedOfTurnover(currentProject, service) {

        var ent = ["CostOfGoods" + service];
        var tmz = [];
        for (var i = 0; i < months.length; i++) {
            tmz.push(currentProject.FinDataBalance.TotalTMZ);
        };
        var calc = [];
        calc.push(tmz);
        ent.forEach(function(element) {
            calc.push(getVarArrayByName(currentProject, element))
        }, this);
        var speedOfTurnover = divArrays(calc);
        setVarArrayByName(currentProject, "SpeedOfTurnover" + service, speedOfTurnover);

    }


    function calculateProfitabilityOfSales(currentProject, service) {

        var ent = ["ProfitOnBusiness", "Revenues" + service];
        var calc = [];
        ent.forEach(function(element) {
            calc.push(getVarArrayByName(currentProject, element))
        }, this);


        var _calc = divArrays(calc);
        var resc = [];
        resc.push(_calc);
        var perc = [];
        for (var i = 0; i < months.length; i++) {
            perc.push(100);
        };
        resc.push(perc);
        var profitabilityOfSales = multArrays(resc);

        setVarArrayByName(currentProject, "ProfitabilityOfSales" + service, profitabilityOfSales);

    }

    function calculateInternalVarsByMonths(currentProject) {
        if (currentProject.ProjectAnalysis.ActivityService) {
            calculateMargin(currentProject, "Service");
            calculateGrossProfit(currentProject, "Service");
        }

        if (currentProject.ProjectAnalysis.ActivityTrade) {
            calculateMargin(currentProject, "Trade");
            calculateGrossProfit(currentProject, "Trade");
        }

        if (currentProject.ProjectAnalysis.ActivityAgriculture) {
            calculateMargin(currentProject, "Agriculture");
            calculateGrossProfit(currentProject, "Agriculture");
        }

        if (currentProject.ProjectAnalysis.ActivityProduction) {
            calculateMargin(currentProject, "Production");
            calculateGrossProfit(currentProject, "Production");
        }
        calculateTotalRevenues(currentProject);
        calculateTotalGrossProfit(currentProject);
        // if (currentProject.ActivityService) calc.push(gProfitService);
        // if (currentProject.ActivityTrade) calc.push(gProfitTrade);
        // if (currentProject.ActivityAgriculture) calc.push(gAgriculture);
        // if (currentProject.ActivityProduction) calc.push(gProduction);

        calculateTotalExpensesForBusiness(currentProject);
        calculateProfitOnBusiness(currentProject);
        calculateOtherExpenses(currentProject);
        calculateOtherIncome(currentProject);
        calculateNetProfit(currentProject);
        calculateValueOfContributionProfit(currentProject);

        if (currentProject.ProjectAnalysis.ActivityService) {
            calculateSpeedOfTurnover(currentProject, "Service");
            calculateProfitabilityOfSales(currentProject, "Service");
        }


        if (currentProject.ProjectAnalysis.ActivityTrade) {
            calculateSpeedOfTurnover(currentProject, "Trade");
            calculateProfitabilityOfSales(currentProject, "Trade");
        }

        if (currentProject.ProjectAnalysis.ActivityAgriculture) {
            calculateSpeedOfTurnover(currentProject, "Agriculture");
            calculateProfitabilityOfSales(currentProject, "Agriculture");
        }

        if (currentProject.ProjectAnalysis.ActivityProduction) {
            calculateSpeedOfTurnover(currentProject, "Production");
            calculateProfitabilityOfSales(currentProject, "Production");
        }
        //currentProject.FinDataBalance.TotalTMZ
        //ProfitabilityOfSales
    }

    opiuCalculatorFactory.calculateData = function(currentProject) {
        calculateAvgData(currentProject);
        calculateInternalVarsByMonths(currentProject);

    }



    return opiuCalculatorFactory;

}]);