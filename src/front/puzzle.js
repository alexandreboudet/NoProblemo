$(document).ready(() => {

    $("#checkAnswer").click(() => {
        // TODO Submit
        console.log("submit");
        console.table(outputData);
    });

    // Init

    let outputData = [
        ["13\'","","",""],
        ["15\'","","",""],
        ["15\'6","","",""],
        ["21\'5","","",""],
        ["27\'","","",""]
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


    $("#personalComputerPuzzle").append(
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
    
    const refreshFinalMatrix = () => {
        $("div#personalComputerResult > table > tbody > tr").each(function (parentIndex) {
            $(this).children().each(function (childIndex) {
                $(this).html(outputData[parentIndex][childIndex]);
            });
        });

    }
    refreshFinalMatrix();

    // Data Processing

    const correct = '<i class="fas fa-check green"></i>';
    const wrong = '<i class="fas fa-times red"></i>';

    $('td[tableRowIndex]').click(function () {
        const tableRowIndex = $(this).attr("tableRowIndex");
        const tableColumnIndex = $(this).attr("tableColumnIndex");
        const cellRowIndex = $(this).attr("cellRowIndex");
        const cellColumnIndex =  $(this).attr("cellColumnIndex");
        currentDataTable = personalComputerStructureData[tableRowIndex][tableColumnIndex].centerDatatable;
        if(!$(this).html()) {
            $(this).html(wrong);
            currentDataTable.valueList[cellRowIndex][cellColumnIndex] = false;
        } else if($(this).html() == wrong){
            $("td[tableRowIndex='"+tableRowIndex+"'][tableColumnIndex='"+tableColumnIndex+"'][cellRowIndex='"+cellRowIndex+"']").each(function () {
                $(this).html(wrong);
            });
            $("td[tableRowIndex='"+tableRowIndex+"'][tableColumnIndex='"+tableColumnIndex+"'][cellColumnIndex='"+cellColumnIndex+"']").each(function () {
                $(this).html(wrong);
            });
            currentDataTable.valueList.forEach((row) => {row[cellColumnIndex] = false;})
            for(let index in currentDataTable.valueList[cellRowIndex]) {
                currentDataTable.valueList[cellRowIndex][index] = false;
            }
            $(this).html(correct);
            currentDataTable.valueList[cellRowIndex][cellColumnIndex] = true;
        } else {
            $("td[tableRowIndex='"+tableRowIndex+"'][tableColumnIndex='"+tableColumnIndex+"'][cellRowIndex='"+cellRowIndex+"']").each(function () {
                $(this).html("");
            });
            $("td[tableRowIndex='"+tableRowIndex+"'][tableColumnIndex='"+tableColumnIndex+"'][cellColumnIndex='"+cellColumnIndex+"']").each(function () {
                $(this).html("");
            });
            currentDataTable.valueList.forEach((row) => {row[cellColumnIndex] = false;})
            for(let index in currentDataTable.valueList[cellRowIndex]) {
                currentDataTable.valueList[cellRowIndex][index] = false;
            }
        }

        if(tableRowIndex == 0) {
            outputData = [
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
                        outputData[valueIndex][categoryIndex+1] = personalComputerStructureData[tableRowIndex][categoryIndex].upperPane.labelList[hasLink];
                    }
                })
            })
            refreshFinalMatrix();
        }
    });

});