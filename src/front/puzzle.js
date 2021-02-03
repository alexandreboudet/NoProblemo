$(document).ready(() => {

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

    let personalComputerStructureData = [
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
        {
            leftPane : hardDiskHeader,
            upperPane : processorHeader,
            centerDatatable : {
                valueList : generateFiveByFiveEmptyTab()
            }
        },
    ]


    $("#personalComputerPuzzle").append(
        "<table>"+
            "<tbody>"+
                "<tr id='firstRow'>"+
                    "<td class='1'></td>"+
                    "<td class='2'></td>"+
                    "<td class='3'></td>"+
                    "<td class='4'></td>"+
                "</tr>"+
                "<tr id='secondRow'>"+
                    "<td class='1'></td>"+
                    "<td class='2'></td>"+
                    "<td class='3'></td>"+
                    "<td class='4'></td>"+
                "</tr>"+
                "<tr id='thirdRow'>"+
                    "<td class='1'></td>"+
                    "<td class='2'></td>"+
                    "<td class='3'></td>"+
                "</tr>"+
                "<tr id='fourthRow'>"+
                    "<td class='1'></td>"+
                    "<td class='2'></td>"+
                "</tr>"+
            "</tbody>"+
        "</table>"
    );
    $("div#personalComputerPuzzle > table > tbody > tr").each(function (parentIndex) {
        $(this).children().each(function (childIndex) {
            console.log("chained index : "+parentIndex+"-"+childIndex);
            $(this).append($(this).attr('class'));
        });
    });
    

});