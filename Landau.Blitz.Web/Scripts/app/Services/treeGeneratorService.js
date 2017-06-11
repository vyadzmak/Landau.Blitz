blitzApp.service('treeGeneratorService', ['navigatorService', function(navigatorService) {
    function addChild(rootElement, childElements) {
        rootElement.push(childElements);
    }

    this.generateTreeStructure = function($scope, $state, template, go) {

        var rootElement = {};


        rootElement.label = template.Name;
        rootElement.id = "t" + template.Id;
        rootElement.children = [];
        rootElement.collapsed = true;
        rootElement.type = "Шаблон";

        for (var sheetIndex = 0; sheetIndex < template.Content.Sheets.length; sheetIndex++) {
            var cSheet = template.Content.Sheets[sheetIndex];
            var sheetElement = {};
            sheetElement.label = cSheet.Name;
            sheetElement.id = "s" + cSheet.Id;
            sheetElement.children = [];
            sheetElement.collapsed = true;
            sheetElement.type = "Страница";

            if (cSheet.Blocks != undefined)
            //blocks
                for (var blockIndex = 0; blockIndex < cSheet.Blocks.length; blockIndex++) {
                var cBlock = cSheet.Blocks[blockIndex];
                var blockElement = {};
                blockElement.label = cBlock.Name;
                blockElement.id = "b" + cBlock.Id;
                blockElement.children = [];
                blockElement.collapsed = true;
                blockElement.type = "Блок";

                if (cBlock.Questions != undefined)
                //questions
                    for (var questionIndex = 0; questionIndex < cBlock.Questions.length; questionIndex++) {
                    var cQuestion = cBlock.Questions[questionIndex];
                    var questionElement = {};
                    questionElement.label = cQuestion.Name;
                    questionElement.id = "q" + cQuestion.Id;
                    questionElement.children = [];
                    questionElement.collapsed = true;
                    questionElement.type = "Вопрос";

                    if (cQuestion.Fields != undefined)

                    //fields
                        for (var fieldIndex = 0; fieldIndex < cQuestion.Fields.length; fieldIndex++) {
                        var cField = cQuestion.Fields[fieldIndex];
                        var fieldElement = {};
                        fieldElement.label = cField.Name;
                        fieldElement.id = "f" + cField.Id;
                        fieldElement.children = [];
                        fieldElement.collapsed = true;
                        fieldElement.type = "Поле";

                        if (cField.Elements != undefined)

                        //elements
                            for (var elementIndex = 0; elementIndex < cField.Elements.length; elementIndex++) {
                            var cElement = cField.Elements[elementIndex];
                            var element = {};
                            element.label = cElement.Name;
                            element.id = "e" + cElement.Id;
                            element.children = [];
                            element.collapsed = true;
                            element.type = "Элемент";



                            addChild(fieldElement.children, element);
                        }

                        addChild(questionElement.children, fieldElement);
                    }


                    addChild(blockElement.children, questionElement);
                }

                addChild(sheetElement.children, blockElement);
            }

            addChild(rootElement.children, sheetElement);
        }
        var scope = navigatorService.getScope();
        scope.dataForTheTree = [];
        scope.dataForTheTree.push(rootElement);

        navigatorService.setDataForTheTree(scope.dataForTheTree);

        scope.selected = scope.dataForTheTree[0];

        if (go)
            $state.go("main.dashboard.editor.templateDetails");
    }

}]);