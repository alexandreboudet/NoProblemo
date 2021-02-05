$(document).ready(() => {

    // Submit

    $("#personalComputercheckAnswer").click(() => {
        let personalComputerDznData = [
            [], // Monitor_dzn
            [], // Processor_dzn
            [], // Hard_disk_dzn
            [] // Price_dzn
        ];

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 5; j++) {
                let tempInd = personalComputerGlobalData[i].findIndex((element) => element == personalComputerOutputData[j][i]);
                if(tempInd >= 0){
                    personalComputerDznData[i].push(tempInd+1);
                } else {
                    personalComputerDznData[i].push("_");
                }
            }
        }
        
        var data = {
            array: personalComputerDznData 
        }
        
        $.post("http://localhost:3000/checkAnswer", data, function(res, status) {
            $('.alert').remove();
            if(res.substr(0,4) == 'True') {
                $('body').prepend(successAlert);
            } else {
                $('body').prepend(errorAlert);
            }
        })
    });

    $("#movieBuffcheckAnswer").click(() => {
        let movieBuffDznData = [
            [], // Personne_dzn
            [], // Film_dzn
            [], // Jour_dzn
            [] // Horaire_dzn
        ];

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 5; j++) {
                let tempInd = movieBuffGlobalData[i].findIndex((element) => element == movieBuffOutputData[j][i]);
                if(tempInd >= 0){
                    if(i == 3) {
                        switch(tempInd) {
                            case 0: 
                                movieBuffDznData[i].push(735);
                            break;
                            case 1: 
                                movieBuffDznData[i].push(740);
                            break;
                            case 2: 
                                movieBuffDznData[i].push(820);
                            break;
                            case 3: 
                                movieBuffDznData[i].push(830);
                            break;
                            case 4: 
                                movieBuffDznData[i].push(845);
                            break;
                        }
                    } else {
                        movieBuffDznData[i].push(tempInd+1);
                    }
                } else {
                    movieBuffDznData[i].push("_");
                }
            }
        }

        var data = {
            array: movieBuffDznData 
        }
        
        $.post("http://localhost:3000/checkAnswerAlPacino", data, function(res, status) {
            $('.alert').remove();
            if(res.substr(0,4) == 'True') {
                $('body').prepend(successAlert);
            } else {
                $('body').prepend(errorAlert);
            }
        })
    });

    $("#pastaWinecheckAnswer").click(() => {
        let pastaWineDznData = [
            [], // Shirt
            [], // Name
            [], // Surname
            [], // Pasta
            [], // Wine
            []  // Age
        ];


        $("select").each(function(rowIndex) {
            pastaWineDznData[rowIndex % 6].push("_");
        });
        $("select").each(function(rowIndex) {
            if($(this).val() != -1) {
                pastaWineDznData[rowIndex % 6][$(this).val()] = Math.floor(rowIndex/6)+1;
            }
        });

        console.table(pastaWineDznData);
        
        var data = {
            array: pastaWineDznData 
        }
        
        $.post("http://localhost:3000/checkAnswerPastaWine", data, function(res, status) {
            $('.alert').remove();
            if(res.substr(0,4) == 'True') {
                $('body').prepend(successAlert);
            } else {
                $('body').prepend(errorAlert);
            }
        })
    });

    // Navbar

    $("#personalComputerButton").click(function () {
        document.getElementById('personalComputer').style.display = 'block';
        document.getElementById('movieBuff').style.display = 'none';
        document.getElementById('pastaWine').style.display = 'none';
    });
    $("#movieBuffButton").click(function () {
        document.getElementById('personalComputer').style.display = 'none';
        document.getElementById('movieBuff').style.display = 'block';
        document.getElementById('pastaWine').style.display = 'none';
    });
    $("#pastaWineButton").click(function () {
        document.getElementById('personalComputer').style.display = 'none';
        document.getElementById('movieBuff').style.display = 'none';
        document.getElementById('pastaWine').style.display = 'block';
    });


    // Init


    const errorAlert = 
    "<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">\n" +
    "        <strong>Erreur !</strong> Solution insatisfiable.\n" +
    "        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
    "            <span aria-hidden=\"true\">&times;</span>\n" +
    "        </button>\n" +
    "    </div>";
    const successAlert = 
    "    <div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\">\n" +
    "        <strong>Félicitations !</strong> Puzzle résolu.\n" +
    "        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
    "            <span aria-hidden=\"true\">&times;</span>\n" +
    "        </button>\n" +
    "    </div>";

    let personalComputerOutputData = [
        ["13\'","","",""],
        ["15\'","","",""],
        ["15\'6","","",""],
        ["21\'5","","",""],
        ["27\'","","",""]
    ];

    let movieBuffOutputData = [
        ["Jessica","","",""],
        ["Laurie","","",""],
        ["Mark","","",""],
        ["Mary","","",""],
        ["Sally","","",""]
    ];


    const monitorHeader = {
        title : "Monitor",
        labelList : ["13\'","15\'","15\'6","21\'5","27\'"]
    }
    const processorHeader = {
        title : "Processor",
        labelList : ["2.0 MHz","2.3 MHz","2.5 MHz","2.7 MHz","3.1 MHz"]
    }
    const hardDiskHeader = {
        title : "Hard Disk",
        labelList : ["250 Gb","320 Gb","500 Gb","750 Gb","1024 Gb"]
    }
    const priceHeader = {
        title : "Price",
        labelList : ["$ 699,00","$ 999,00","$ 1.149,00","$ 1.349,00","$ 1.649,00"]
    }


    const personalComputerGlobalData = [
        monitorHeader.labelList,
        processorHeader.labelList,
        hardDiskHeader.labelList,
        priceHeader.labelList,
    ]


    const filmHeader = {
        title : "Film",
        labelList : ["88 Minutes","Donnie Brasco","Scarecrow","Scarface","The Recruit"]
    }
    const dayHeader = {
        title : "Day",
        labelList : ["Monday","Tuesday","Wednesday","Thursday","Friday"]
    }
    const timeHeader = {
        title : "Time",
        labelList : ["7:35pm","7:40pm","8:20pm","8:30pm","8:45pm"]
    }
    const nameHeader = {
        title : "Name",
        labelList : ["Jessica","Laurie","Mark","Mary","Sally",]
    }


    const movieBuffGlobalData = [
        nameHeader.labelList,
        filmHeader.labelList,
        dayHeader.labelList,
        timeHeader.labelList,
    ]

    const generateFiveByFiveEmptyTab = () => [
        [false,false,false,false,false],
        [false,false,false,false,false],
        [false,false,false,false,false],
        [false,false,false,false,false],
        [false,false,false,false,false]
    ]; 

    const generateRowHeaderTable = (headerData) => {
        let generatedTable = "<table class=\"top-table\"><tbody><tr><td colspan=\"5\">"+headerData.title+"</td></tr>";
        headerData.labelList.forEach((label) => {
            generatedTable += "<td class='stickLeft'><div class=\"vertical\">"+label+"</div></td>";
        })
        generatedTable += "</tr></tbody></table>";
        return generatedTable;
    }

    const generateColumnHeaderTable = (headerData) => {
        let generatedTable = "<table class=\"side-table\"><tbody><tr><td rowspan=\"5\"><div class=\"vertical\">"+headerData.title+"</div></td><td>"+headerData.labelList[0]+"</td></tr>";
        headerData.labelList.forEach((label,index) => {
            if(index>0)
                generatedTable += "<tr><td>"+label+"</td></tr>";
        })
        generatedTable += "</tbody></table>";
        return generatedTable;
    }

    const generateInnerFiveByFiveTable = (parentIndex, childIndex) => {
        let generatedTable = "<table class=\"middle-table\"><tbody>";
        personalComputerStructureData[parentIndex][childIndex].centerDatatable.valueList.forEach((row, rowIndex)=> {
            generatedTable += "<tr>";
            row.forEach((cell, cellIndex) => {
                generatedTable += "<td colspan=\"1\" tableRowIndex='"+parentIndex+"' tableColumnIndex='"+childIndex+"' cellRowIndex='"+rowIndex+"' cellColumnIndex='"+cellIndex+"'  style='text-align: center;'></td>";
            })
            generatedTable += "</tr>";
        });
        generatedTable += "</tbody></table>";
        return generatedTable;
    }

    const personalComputerStructureData = [
        [
            {
                leftPane : monitorHeader,
                upperPane : processorHeader,
                centerDatatable : {
                    valueList : generateFiveByFiveEmptyTab()
                }
            },
            {
                leftPane : monitorHeader,
                upperPane : hardDiskHeader,
                centerDatatable : {
                    valueList : generateFiveByFiveEmptyTab()
                }
            },
            {
                leftPane : monitorHeader,
                upperPane : priceHeader,
                centerDatatable : {
                    valueList : generateFiveByFiveEmptyTab()
                }
            },
        ],
        [
            {
                leftPane : priceHeader,
                upperPane : processorHeader,
                centerDatatable : {
                    valueList : generateFiveByFiveEmptyTab()
                }
            },
            {
                leftPane : priceHeader,
                upperPane : hardDiskHeader,
                centerDatatable : {
                    valueList : generateFiveByFiveEmptyTab()
                }
            },
        ],
        [
            {
                leftPane : hardDiskHeader,
                upperPane : processorHeader,
                centerDatatable : {
                    valueList : generateFiveByFiveEmptyTab()
                }
            },
        ]
    ]
    const movieBuffStructureData = [
        [
            {
                leftPane : nameHeader,
                upperPane : filmHeader,
                centerDatatable : {
                    valueList : generateFiveByFiveEmptyTab()
                }
            },
            {
                leftPane : nameHeader,
                upperPane : dayHeader,
                centerDatatable : {
                    valueList : generateFiveByFiveEmptyTab()
                }
            },
            {
                leftPane : nameHeader,
                upperPane : timeHeader,
                centerDatatable : {
                    valueList : generateFiveByFiveEmptyTab()
                }
            },
        ],
        [
            {
                leftPane : timeHeader,
                upperPane : filmHeader,
                centerDatatable : {
                    valueList : generateFiveByFiveEmptyTab()
                }
            },
            {
                leftPane : timeHeader,
                upperPane : dayHeader,
                centerDatatable : {
                    valueList : generateFiveByFiveEmptyTab()
                }
            },
        ],
        [
            {
                leftPane : dayHeader,
                upperPane : filmHeader,
                centerDatatable : {
                    valueList : generateFiveByFiveEmptyTab()
                }
            },
        ]
    ]


    $("#personalComputerPuzzle,#movieBuffPuzzle").append(
        "<table>"+
            "<tbody class='fixedCell'>"+
                "<tr>"+
                    "<td></td>"+
                    "<td></td>"+
                    "<td></td>"+
                    "<td></td>"+
                "</tr>"+
                "<tr>"+
                    "<td></td>"+
                    "<td></td>"+
                    "<td></td>"+
                    "<td></td>"+
                "</tr>"+
                "<tr>"+
                    "<td></td>"+
                    "<td></td>"+
                    "<td></td>"+
                "</tr>"+
                "<tr>"+
                    "<td></td>"+
                    "<td></td>"+
                "</tr>"+
            "</tbody>"+
        "</table>"
    );

    $("#personalComputerResult").append(
        "<table class='table table-bordered table-sm'>"+
            "<thead>"+
                "<tr>"+
                    "<th>Monitor</th>"+
                    "<th>Processor</th>"+
                    "<th>Hard Disk</th>"+
                    "<th>Price</th>"+
                "</tr>"+
            "</thead>"+
            "<tbody>"+
                "<tr>"+
                    "<td></td>"+
                    "<td></td>"+
                    "<td></td>"+
                    "<td></td>"+
                "</tr>"+
                "<tr>"+
                    "<td></td>"+
                    "<td></td>"+
                    "<td></td>"+
                    "<td></td>"+
                "</tr>"+
                "<tr>"+
                    "<td></td>"+
                    "<td></td>"+
                    "<td></td>"+
                    "<td></td>"+
                "</tr>"+
                "<tr>"+
                    "<td></td>"+
                    "<td></td>"+
                    "<td></td>"+
                    "<td></td>"+
                "</tr>"+
                "<tr>"+
                    "<td></td>"+
                    "<td></td>"+
                    "<td></td>"+
                    "<td></td>"+
                "</tr>"+
            "</tbody>"+
        "</table>"
    );

    $("#movieBuffResult").append(
        "<table class='table table-bordered table-sm'>"+
            "<thead>"+
                "<tr>"+
                    "<th>Name</th>"+
                    "<th>Film</th>"+
                    "<th>Day</th>"+
                    "<th>Time</th>"+
                "</tr>"+
            "</thead>"+
            "<tbody>"+
                "<tr>"+
                    "<td></td>"+
                    "<td></td>"+
                    "<td></td>"+
                    "<td></td>"+
                "</tr>"+
                "<tr>"+
                    "<td></td>"+
                    "<td></td>"+
                    "<td></td>"+
                    "<td></td>"+
                "</tr>"+
                "<tr>"+
                    "<td></td>"+
                    "<td></td>"+
                    "<td></td>"+
                    "<td></td>"+
                "</tr>"+
                "<tr>"+
                    "<td></td>"+
                    "<td></td>"+
                    "<td></td>"+
                    "<td></td>"+
                "</tr>"+
                "<tr>"+
                    "<td></td>"+
                    "<td></td>"+
                    "<td></td>"+
                    "<td></td>"+
                "</tr>"+
            "</tbody>"+
        "</table>"
    );

    $("div#personalComputerPuzzle > table > tbody > tr").each(function (parentIndex) {
        $(this).children().each(function (childIndex) {
            if(parentIndex == 0) { // Upper row
                if(childIndex == 0) { // First Cell -> To be empty
                    $(this).css("border","0")
                } else {
                    $(this).append(generateRowHeaderTable(personalComputerStructureData[0][childIndex-1].upperPane));
                }
            } else if(childIndex == 0) { // Left Column excepting upper left one
                $(this).append(generateColumnHeaderTable(personalComputerStructureData[parentIndex-1][0].leftPane));
            } else { // inner Table
                $(this).append(generateInnerFiveByFiveTable(parentIndex-1,childIndex-1));
            }
        });
    });

    $("div#movieBuffPuzzle > table > tbody > tr").each(function (parentIndex) {
        $(this).children().each(function (childIndex) {
            if(parentIndex == 0) { // Upper row
                if(childIndex == 0) { // First Cell -> To be empty
                    $(this).css("border","0")
                } else {
                    $(this).append(generateRowHeaderTable(movieBuffStructureData[0][childIndex-1].upperPane));
                }
            } else if(childIndex == 0) { // Left Column excepting upper left one
                $(this).append(generateColumnHeaderTable(movieBuffStructureData[parentIndex-1][0].leftPane));
            } else { // inner Table
                $(this).append(generateInnerFiveByFiveTable(parentIndex-1,childIndex-1));
            }
        });
    });
    
    const personalComputerRefreshFinalMatrix = () => {
        $("div#personalComputerResult > table > tbody > tr").each(function (parentIndex) {
            $(this).children().each(function (childIndex) {
                $(this).html(personalComputerOutputData[parentIndex][childIndex]);
            });
        });

    }
    personalComputerRefreshFinalMatrix();
    
    const movieBuffRefreshFinalMatrix = () => {
        $("div#movieBuffResult > table > tbody > tr").each(function (parentIndex) {
            $(this).children().each(function (childIndex) {
                $(this).html(movieBuffOutputData[parentIndex][childIndex]);
            });
        });

    }
    movieBuffRefreshFinalMatrix();

    // Data Processing

    const correct = '<i class="fas fa-check green"></i>';
    const wrong = '<i class="fas fa-times red"></i>';

    $('div#personalComputerPuzzle > table > tbody > tr > td > table > tbody > tr > td[tableRowIndex]').click(function () {
        const tableRowIndex = $(this).attr("tableRowIndex");
        const tableColumnIndex = $(this).attr("tableColumnIndex");
        const cellRowIndex = $(this).attr("cellRowIndex");
        const cellColumnIndex =  $(this).attr("cellColumnIndex");
        currentDataTable = personalComputerStructureData[tableRowIndex][tableColumnIndex].centerDatatable;
        if(!$(this).html()) {
            $(this).html(wrong);
            currentDataTable.valueList[cellRowIndex][cellColumnIndex] = false;
        } else if($(this).html() == wrong){
            $("div#personalComputerPuzzle > table > tbody > tr > td > table > tbody > tr > td[tableRowIndex='"+tableRowIndex+"'][tableColumnIndex='"+tableColumnIndex+"'][cellRowIndex='"+cellRowIndex+"']").each(function () {
                $(this).html(wrong);
            });
            $("div#personalComputerPuzzle > table > tbody > tr > td > table > tbody > tr > td[tableRowIndex='"+tableRowIndex+"'][tableColumnIndex='"+tableColumnIndex+"'][cellColumnIndex='"+cellColumnIndex+"']").each(function () {
                $(this).html(wrong);
            });
            currentDataTable.valueList.forEach((row) => {row[cellColumnIndex] = false;})
            for(let index in currentDataTable.valueList[cellRowIndex]) {
                currentDataTable.valueList[cellRowIndex][index] = false;
            }
            $(this).html(correct);
            currentDataTable.valueList[cellRowIndex][cellColumnIndex] = true;
        } else {
            $("div#personalComputerPuzzle > table > tbody > tr > td > table > tbody > tr > td[tableRowIndex='"+tableRowIndex+"'][tableColumnIndex='"+tableColumnIndex+"'][cellRowIndex='"+cellRowIndex+"']").each(function () {
                $(this).html("");
            });
            $("div#personalComputerPuzzle > table > tbody > tr > td > table > tbody > tr > td[tableRowIndex='"+tableRowIndex+"'][tableColumnIndex='"+tableColumnIndex+"'][cellColumnIndex='"+cellColumnIndex+"']").each(function () {
                $(this).html("");
            });
            currentDataTable.valueList.forEach((row) => {row[cellColumnIndex] = false;})
            for(let index in currentDataTable.valueList[cellRowIndex]) {
                currentDataTable.valueList[cellRowIndex][index] = false;
            }
        }

        if(tableRowIndex == 0) {
            personalComputerOutputData = [
                ["13\'","","",""],
                ["15\'","","",""],
                ["15\'6","","",""],
                ["21\'5","","",""],
                ["27\'","","",""]
            ];
            personalComputerStructureData[tableRowIndex].forEach((category, categoryIndex) => {
                category.centerDatatable.valueList.forEach((valueList, valueIndex) => {
                    let hasLink = valueList.findIndex(item => item==true);
                    if(hasLink >= 0) {
                        personalComputerOutputData[valueIndex][categoryIndex+1] = personalComputerStructureData[tableRowIndex][categoryIndex].upperPane.labelList[hasLink];
                    }
                })
            })
            personalComputerRefreshFinalMatrix();
        }
    });



    $('div#movieBuffPuzzle > table > tbody > tr > td > table > tbody > tr > td[tableRowIndex]').click(function () {
        const tableRowIndex = $(this).attr("tableRowIndex");
        const tableColumnIndex = $(this).attr("tableColumnIndex");
        const cellRowIndex = $(this).attr("cellRowIndex");
        const cellColumnIndex =  $(this).attr("cellColumnIndex");
        currentDataTable = movieBuffStructureData[tableRowIndex][tableColumnIndex].centerDatatable;
        if(!$(this).html()) {
            $(this).html(wrong);
            currentDataTable.valueList[cellRowIndex][cellColumnIndex] = false;
        } else if($(this).html() == wrong){
            $("div#movieBuffPuzzle > table > tbody > tr > td > table > tbody > tr > td[tableRowIndex='"+tableRowIndex+"'][tableColumnIndex='"+tableColumnIndex+"'][cellRowIndex='"+cellRowIndex+"']").each(function () {
                $(this).html(wrong);
            });
            $("div#movieBuffPuzzle > table > tbody > tr > td > table > tbody > tr > td[tableRowIndex='"+tableRowIndex+"'][tableColumnIndex='"+tableColumnIndex+"'][cellColumnIndex='"+cellColumnIndex+"']").each(function () {
                $(this).html(wrong);
            });
            currentDataTable.valueList.forEach((row) => {row[cellColumnIndex] = false;})
            for(let index in currentDataTable.valueList[cellRowIndex]) {
                currentDataTable.valueList[cellRowIndex][index] = false;
            }
            $(this).html(correct);
            currentDataTable.valueList[cellRowIndex][cellColumnIndex] = true;
        } else {
            $("div#movieBuffPuzzle > table > tbody > tr > td > table > tbody > tr > td[tableRowIndex='"+tableRowIndex+"'][tableColumnIndex='"+tableColumnIndex+"'][cellRowIndex='"+cellRowIndex+"']").each(function () {
                $(this).html("");
            });
            $("div#movieBuffPuzzle > table > tbody > tr > td > table > tbody > tr > td[tableRowIndex='"+tableRowIndex+"'][tableColumnIndex='"+tableColumnIndex+"'][cellColumnIndex='"+cellColumnIndex+"']").each(function () {
                $(this).html("");
            });
            currentDataTable.valueList.forEach((row) => {row[cellColumnIndex] = false;})
            for(let index in currentDataTable.valueList[cellRowIndex]) {
                currentDataTable.valueList[cellRowIndex][index] = false;
            }
        }

        if(tableRowIndex == 0) {
            movieBuffOutputData = [
                ["Jessica","","",""],
                ["Laurie","","",""],
                ["Mark","","",""],
                ["Mary","","",""],
                ["Sally","","",""]
            ];
            movieBuffStructureData[tableRowIndex].forEach((category, categoryIndex) => {
                category.centerDatatable.valueList.forEach((valueList, valueIndex) => {
                    let hasLink = valueList.findIndex(item => item==true);
                    if(hasLink >= 0) {
                        movieBuffOutputData[valueIndex][categoryIndex+1] = movieBuffStructureData[tableRowIndex][categoryIndex].upperPane.labelList[hasLink];
                    }
                })
            })
            movieBuffRefreshFinalMatrix();
        }
    });


    
    const shirtData = ['blue','green','red','white','yellow'];
    const nameData = ['Andrea','Holly','Julie','Leslie','Victoria'];
    const surnameData = ['Brown','Davis','Lopes','Miller','Wilson'];
    const pastaData = ['farfalle','lasagne','penne','spaghetti','ravioli'];
    const wineData = ['Australian','Argentine','Chilean','French','Italian'];
    const ageData = ['30 years','35 years','40 years','45 years','50 years'];

    const globalPastaWineData = [
        shirtData,
        nameData,
        surnameData,
        pastaData,
        wineData,
        ageData
    ]
    const globalPastaWineDataName = [
        'shirtData',
        'nameData',
        'surnameData',
        'pastaData',
        'wineData',
        'ageData'
    ]

    
    const generateSelect = (rowIndex,columnIndex) => {
        let generatedTable = "<li><select selectIndex=\""+columnIndex+"\" dataName=\""+globalPastaWineDataName[rowIndex]+"\" class=\"form-control mb-2\"><option value=\"-1\"></option>";
        globalPastaWineData[rowIndex].forEach((item, itemIndex) => {
            generatedTable += "<option value=\""+itemIndex+"\">"+item+"</option>";
        })
        generatedTable += "</select></li>";
        return generatedTable;
    }

    $("div.pastaWineTables > ul").each(function (columnIndex) {
        for(let rowIndex = 0; rowIndex < 6; rowIndex++) {
            $(this).append(generateSelect(rowIndex,columnIndex));
        }
    });

    var previous;
    $("select").on('focus', function () {
        previous =  $(this).val();
    }).change(function() {
        const currentSelectIndex = $(this).attr("selectIndex");
        if($(this).val() != -1) {
            const newSelectedValue = $(this).val();
            $("select[dataName=\""+$(this).attr('dataName')+"\"]").each(function (parentIndex) {
                if(currentSelectIndex != parentIndex) {
                    $(this).children().each(function (childIndex) {
                        if(newSelectedValue == $(this).val()) {
                            $(this).attr('disabled','true');
                        }
                    })
                }
            })  
        }
        $("select[dataName=\""+$(this).attr('dataName')+"\"]").each(function (parentIndex) {
                if(currentSelectIndex != parentIndex) {
                    $(this).children().each(function (childIndex) {
                        if(previous == $(this).val()) {
                            $(this).removeAttr('disabled');
                        }
                    })
                }
            }) 
    });

});