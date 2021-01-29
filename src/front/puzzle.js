$(document).ready(() => {

    let monitorHeader = {
        title : "Monitor",
        labelList : ["13\'","15\'","15\'6","21\'5","27\'"]
    }
    let processorHeader = {
        title : "Processor",
        labelList : ["2.0 MHz","2.3 MHz","2.5 MHz","2.7 MHz","3.1 MHz"]
    }
    let hardDiskHeader = {
        title : "Hard Disk",
        labelList : ["250 Gb, 320 Gb, 500 Gb, 750 Gb, 1024 Gb"]
    }
    let priceHeader = {
        title : "Price",
        labelList : ["250 Gb, 320 Gb, 500 Gb, 750 Gb, 1024 Gb"]
    }

    let generateFiveByFiveEmptyTab = () => {
        return [
            [false,false,false,false,false],
            [false,false,false,false,false],
            [false,false,false,false,false],
            [false,false,false,false,false],
            [false,false,false,false,false]
        ] ;
    }

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

});