$(() => {
    
    // processing orderes ==========================================================================================
    $.ajax({
        url: "../php/manager/getProcessingOrder.php",
        method: 'POST',
        success: function (result) {
            $('.processing').html(result)
            $('.order_list .check_detail').click((e) => {
                $('.order_detail').fadeOut(1200, 'easeInOutCubic')
                setTimeout(() => {
                    $.ajax({
                        url: "../php/manager/getOrderInfo.php",
                        data: {
                            order_ID: parseInt($(e.target).siblings('.description').html().substring(4))
                        },
                        method: 'POST',
                        success: function (result) {
                            $('.info_des').html(result)

                            $.ajax({
                                url: "../php/manager/getOrderChart.php",
                                data: {
                                    order_ID: parseInt($(e.target).siblings('.description').html().substring(4))
                                },
                                method: 'POST',
                                success: function (result) {
                                    var dataArray = result.split(' ')
                            
                                    // create amount bar
                                    var order_detail_chart1 = echarts.init(document.getElementById('order_detail_chart1'))
                                    order_detail_chart1.setOption({
                                        color: 'white',
                                        tooltip : {
                                            trigger: 'axis',
                                            axisPointer : {          
                                                type : 'shadow'     
                                            },
                                            textStyle: {
                                                fontSize: 10,
                                            },
                                            position: ['0%', '40%']
                                        },
                                        textStyle: {
                                            color: 'white',
                                            fontFamily: "'Gill Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serifs",
                                        },
                                        grid: {
                                            width: '68%',
                                            height: '20%',
                                            top: '30%',
                                            left: '2%'
                                        },
                                        xAxis: {     
                                            axisPointer: {
                                                show: true,
                                                snap: true,
                                            },
                                            axisLabel: {
                                                textStyle: {
                                                fontSize: 8
                                                }
                                            }
                                        },
                                        yAxis: {
                                            position: 'right',
                                            type: 'category',
                                            data : ['TOTAL AMOUNT'],
                                            axisLabel: {
                                                textStyle: {
                                                fontSize: 8
                                                }
                                            }
                                        },
                                        series: [{
                                            name:'N95 RESPIRATOR',
                                            type:'bar',
                                            stack:'sum',
                                            barWidth : 10,
                                            data: [dataArray[0]]
                                        },
                                        {
                                            name:'SURGICAL MASK',
                                            type:'bar',
                                            stack:'sum',
                                            barWidth : 10,
                                            itemStyle:{
                                                normal:{
                                                    color:'#9f9f9f'
                                                }
                                            },
                                            data: [dataArray[1]]
                                        },
                                        {
                                            name:'SURGICAL-N95-RESPIRATOR',
                                            type:'bar',
                                            stack:'sum',
                                            barWidth : 10,
                                            itemStyle:{
                                                normal:{
                                                    color:'#545454'
                                                }
                                            },
                                            data: [dataArray[2]]
                                        }]
                                    });

                                    // create quantity bar
                                    var order_detail_chart2 = echarts.init(document.getElementById('order_detail_chart2'))
                                    order_detail_chart2.setOption({
                                        color: 'white',
                                        tooltip : {
                                            trigger: 'axis',
                                            axisPointer : {          
                                                type : 'shadow'     
                                            },
                                            textStyle: {
                                                fontSize: 10,
                                            },
                                            position: ['0%', '40%']
                                        },
                                        textStyle: {
                                            color: 'white',
                                            fontFamily: "'Gill Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serifs",
                                        },
                                        grid: {
                                            width: '68%',
                                            height: '20%',
                                            top: '30%',
                                            left: '2%'
                                        },
                                        xAxis: {     
                                            axisPointer: {
                                                show: true,
                                                snap: true,
                                            },
                                            axisLabel: {
                                                textStyle: {
                                                fontSize: 8
                                                }
                                            }
                                        },
                                        yAxis: {
                                            position: 'right',
                                            type: 'category',
                                            data : ['TOTAL QUANTITY'],
                                            axisLabel: {
                                                textStyle: {
                                                fontSize: 8
                                                }
                                            }
                                        },
                                        series: [{
                                            name:'N95 RESPIRATOR',
                                            type:'bar',
                                            stack:'sum',
                                            barWidth : 10,
                                            data: [dataArray[3]]
                                        },
                                        {
                                            name:'SURGICAL MASK',
                                            type:'bar',
                                            stack:'sum',
                                            barWidth : 10,
                                            itemStyle:{
                                                normal:{
                                                    color:'#9f9f9f'
                                                }
                                            },
                                            data: [dataArray[4]]
                                        },
                                        {
                                            name:'SURGICAL-N95-RESPIRATOR',
                                            type:'bar',
                                            stack:'sum',
                                            barWidth : 10,
                                            itemStyle:{
                                                normal:{
                                                    color:'#545454'
                                                }
                                            },
                                            data: [dataArray[5]]
                                        }]
                                    });
                            
                            

                                    
                                    $('.order_detail').fadeIn(1400, 'easeInOutCubic')
                                },
                                error: function (msg) {alert(msg)}
                            })    




                            $('.order_detail').fadeIn(1400, 'easeInOutCubic')
                        },
                        error: function (msg) {alert(msg)}
                    })    
                }, 1200)
            })
        },  
        error: function (msg) {alert(msg)}
    })    

    // cancelled orderes ==========================================================================================
    $.ajax({
        url: "../php/manager/getCancelledOrder.php",
        method: 'POST',
        success: function (result) {
            $('.cancelled').html(result)
            $('.order_list .check_detail').click((e) => {
                $('.order_detail').fadeOut(1200, 'easeInOutCubic')
                setTimeout(() => {
                    $.ajax({
                        url: "../php/manager/getOrderInfo.php",
                        data: {
                            order_ID: parseInt($(e.target).siblings('.description').html().substring(4))
                        },
                        method: 'POST',
                        success: function (result) {
                            $('.info_des').html(result)

                            $.ajax({
                                url: "../php/manager/getOrderChart.php",
                                data: {
                                    order_ID: parseInt($(e.target).siblings('.description').html().substring(4))
                                },
                                method: 'POST',
                                success: function (result) {
                                    var dataArray = result.split(' ')
                            
                                    // create amount bar
                                    var order_detail_chart1 = echarts.init(document.getElementById('order_detail_chart1'))
                                    order_detail_chart1.setOption({
                                        color: 'white',
                                        tooltip : {
                                            trigger: 'axis',
                                            axisPointer : {          
                                                type : 'shadow'     
                                            },
                                            textStyle: {
                                                fontSize: 10,
                                            },
                                            position: ['0%', '40%']
                                        },
                                        textStyle: {
                                            color: 'white',
                                            fontFamily: "'Gill Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serifs",
                                        },
                                        grid: {
                                            width: '68%',
                                            height: '20%',
                                            top: '30%',
                                            left: '2%'
                                        },
                                        xAxis: {     
                                            axisPointer: {
                                                show: true,
                                                snap: true,
                                            },
                                            axisLabel: {
                                                textStyle: {
                                                fontSize: 8
                                                }
                                            }
                                        },
                                        yAxis: {
                                            position: 'right',
                                            type: 'category',
                                            data : ['TOTAL AMOUNT'],
                                            axisLabel: {
                                                textStyle: {
                                                fontSize: 8
                                                }
                                            }
                                        },
                                        series: [{
                                            name:'N95 RESPIRATOR',
                                            type:'bar',
                                            stack:'sum',
                                            barWidth : 10,
                                            data: [dataArray[0]]
                                        },
                                        {
                                            name:'SURGICAL MASK',
                                            type:'bar',
                                            stack:'sum',
                                            barWidth : 10,
                                            itemStyle:{
                                                normal:{
                                                    color:'#9f9f9f'
                                                }
                                            },
                                            data: [dataArray[1]]
                                        },
                                        {
                                            name:'SURGICAL-N95-RESPIRATOR',
                                            type:'bar',
                                            stack:'sum',
                                            barWidth : 10,
                                            itemStyle:{
                                                normal:{
                                                    color:'#545454'
                                                }
                                            },
                                            data: [dataArray[2]]
                                        }]
                                    });

                                    // create quantity bar
                                    var order_detail_chart2 = echarts.init(document.getElementById('order_detail_chart2'))
                                    order_detail_chart2.setOption({
                                        color: 'white',
                                        tooltip : {
                                            trigger: 'axis',
                                            axisPointer : {          
                                                type : 'shadow'     
                                            },
                                            textStyle: {
                                                fontSize: 10,
                                            },
                                            position: ['0%', '40%']
                                        },
                                        textStyle: {
                                            color: 'white',
                                            fontFamily: "'Gill Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serifs",
                                        },
                                        grid: {
                                            width: '68%',
                                            height: '20%',
                                            top: '30%',
                                            left: '2%'
                                        },
                                        xAxis: {     
                                            axisPointer: {
                                                show: true,
                                                snap: true,
                                            },
                                            axisLabel: {
                                                textStyle: {
                                                fontSize: 8
                                                }
                                            }
                                        },
                                        yAxis: {
                                            position: 'right',
                                            type: 'category',
                                            data : ['TOTAL QUANTITY'],
                                            axisLabel: {
                                                textStyle: {
                                                fontSize: 8
                                                }
                                            }
                                        },
                                        series: [{
                                            name:'N95 RESPIRATOR',
                                            type:'bar',
                                            stack:'sum',
                                            barWidth : 10,
                                            data: [dataArray[3]]
                                        },
                                        {
                                            name:'SURGICAL MASK',
                                            type:'bar',
                                            stack:'sum',
                                            barWidth : 10,
                                            itemStyle:{
                                                normal:{
                                                    color:'#9f9f9f'
                                                }
                                            },
                                            data: [dataArray[4]]
                                        },
                                        {
                                            name:'SURGICAL-N95-RESPIRATOR',
                                            type:'bar',
                                            stack:'sum',
                                            barWidth : 10,
                                            itemStyle:{
                                                normal:{
                                                    color:'#545454'
                                                }
                                            },
                                            data: [dataArray[5]]
                                        }]
                                    });
                            
                            

                                    
                                    $('.order_detail').fadeIn(1400, 'easeInOutCubic')
                                },
                                error: function (msg) {alert(msg)}
                            })    




                            $('.order_detail').fadeIn(1400, 'easeInOutCubic')
                        },
                        error: function (msg) {alert(msg)}
                    })    
                }, 1200)
            })
        },  
        error: function (msg) {alert(msg)}
    })    

    // normal orderes ==========================================================================================
    $.ajax({
        url: "../php/manager/getNormalOrder.php",
        method: 'POST',
        success: function (result) {
            $('.normal').html(result)
            $('.order_list .check_detail').click((e) => {
                $('.order_detail').fadeOut(1200, 'easeInOutCubic')
                setTimeout(() => {
                    $.ajax({
                        url: "../php/manager/getOrderInfo.php",
                        data: {
                            order_ID: parseInt($(e.target).siblings('.description').html().substring(4))
                        },
                        method: 'POST',
                        success: function (result) {
                            $('.info_des').html(result)

                            $.ajax({
                                url: "../php/manager/getOrderChart.php",
                                data: {
                                    order_ID: parseInt($(e.target).siblings('.description').html().substring(4))
                                },
                                method: 'POST',
                                success: function (result) {
                                    var dataArray = result.split(' ')
                            
                                    // create amount bar
                                    var order_detail_chart1 = echarts.init(document.getElementById('order_detail_chart1'))
                                    order_detail_chart1.setOption({
                                        color: 'white',
                                        tooltip : {
                                            trigger: 'axis',
                                            axisPointer : {          
                                                type : 'shadow'     
                                            },
                                            textStyle: {
                                                fontSize: 10,
                                            },
                                            position: ['0%', '40%']
                                        },
                                        textStyle: {
                                            color: 'white',
                                            fontFamily: "'Gill Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serifs",
                                        },
                                        grid: {
                                            width: '68%',
                                            height: '20%',
                                            top: '30%',
                                            left: '2%'
                                        },
                                        xAxis: {     
                                            axisPointer: {
                                                show: true,
                                                snap: true,
                                            },
                                            axisLabel: {
                                                textStyle: {
                                                fontSize: 8
                                                }
                                            }
                                        },
                                        yAxis: {
                                            position: 'right',
                                            type: 'category',
                                            data : ['TOTAL AMOUNT'],
                                            axisLabel: {
                                                textStyle: {
                                                fontSize: 8
                                                }
                                            }
                                        },
                                        series: [{
                                            name:'N95 RESPIRATOR',
                                            type:'bar',
                                            stack:'sum',
                                            barWidth : 10,
                                            data: [dataArray[0]]
                                        },
                                        {
                                            name:'SURGICAL MASK',
                                            type:'bar',
                                            stack:'sum',
                                            barWidth : 10,
                                            itemStyle:{
                                                normal:{
                                                    color:'#9f9f9f'
                                                }
                                            },
                                            data: [dataArray[1]]
                                        },
                                        {
                                            name:'SURGICAL-N95-RESPIRATOR',
                                            type:'bar',
                                            stack:'sum',
                                            barWidth : 10,
                                            itemStyle:{
                                                normal:{
                                                    color:'#545454'
                                                }
                                            },
                                            data: [dataArray[2]]
                                        }]
                                    });

                                    // create quantity bar
                                    var order_detail_chart2 = echarts.init(document.getElementById('order_detail_chart2'))
                                    order_detail_chart2.setOption({
                                        color: 'white',
                                        tooltip : {
                                            trigger: 'axis',
                                            axisPointer : {          
                                                type : 'shadow'     
                                            },
                                            textStyle: {
                                                fontSize: 10,
                                            },
                                            position: ['0%', '40%']
                                        },
                                        textStyle: {
                                            color: 'white',
                                            fontFamily: "'Gill Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serifs",
                                        },
                                        grid: {
                                            width: '68%',
                                            height: '20%',
                                            top: '30%',
                                            left: '2%'
                                        },
                                        xAxis: {     
                                            axisPointer: {
                                                show: true,
                                                snap: true,
                                            },
                                            axisLabel: {
                                                textStyle: {
                                                fontSize: 8
                                                }
                                            }
                                        },
                                        yAxis: {
                                            position: 'right',
                                            type: 'category',
                                            data : ['TOTAL QUANTITY'],
                                            axisLabel: {
                                                textStyle: {
                                                fontSize: 8
                                                }
                                            }
                                        },
                                        series: [{
                                            name:'N95 RESPIRATOR',
                                            type:'bar',
                                            stack:'sum',
                                            barWidth : 10,
                                            data: [dataArray[3]]
                                        },
                                        {
                                            name:'SURGICAL MASK',
                                            type:'bar',
                                            stack:'sum',
                                            barWidth : 10,
                                            itemStyle:{
                                                normal:{
                                                    color:'#9f9f9f'
                                                }
                                            },
                                            data: [dataArray[4]]
                                        },
                                        {
                                            name:'SURGICAL-N95-RESPIRATOR',
                                            type:'bar',
                                            stack:'sum',
                                            barWidth : 10,
                                            itemStyle:{
                                                normal:{
                                                    color:'#545454'
                                                }
                                            },
                                            data: [dataArray[5]]
                                        }]
                                    });
                            
                            

                                    
                                    $('.order_detail').fadeIn(1400, 'easeInOutCubic')
                                },
                                error: function (msg) {alert(msg)}
                            })    




                            $('.order_detail').fadeIn(1400, 'easeInOutCubic')
                        },
                        error: function (msg) {alert(msg)}
                    })    
                }, 1200)
            })
        },  
        error: function (msg) {alert(msg)}
    })    

    // abnormal orderes ==========================================================================================
    $.ajax({
        url: "../php/manager/getAbormalOrder.php",
        method: 'POST',
        success: function (result) {
            $('.abnormal').html(result)
            $('.order_list .check_detail').click((e) => {
                // check if abnormal order selected is not yet reviewed by manager
                if ($(e.target).siblings('.status').html() == 'abnormal to be reviewed' ) {
                    $.ajax({
                        url: "../php/manager/resetAbnormalOrder.php",
                        data: {
                            order_ID: parseInt($(e.target).siblings('.description').html().substring(4))
                        },
                        method: 'POST',
                        success: function (result) {
                            $(e.target).siblings('.status').remove()
                        },
                        error: function (msg) {alert(msg)}
                    })
                }

                $('.order_detail').fadeOut(1200, 'easeInOutCubic')
                setTimeout(() => {
                    $.ajax({
                        url: "../php/manager/getOrderInfo.php",
                        data: {
                            order_ID: parseInt($(e.target).siblings('.description').html().substring(4))
                        },
                        method: 'POST',
                        success: function (result) {
                            $('.info_des').html(result)

                            $.ajax({
                                url: "../php/manager/getOrderChart.php",
                                data: {
                                    order_ID: parseInt($(e.target).siblings('.description').html().substring(4))
                                },
                                method: 'POST',
                                success: function (result) {
                                    var dataArray = result.split(' ')
                            
                                    // create amount bar
                                    var order_detail_chart1 = echarts.init(document.getElementById('order_detail_chart1'))
                                    order_detail_chart1.setOption({
                                        color: 'white',
                                        tooltip : {
                                            trigger: 'axis',
                                            axisPointer : {          
                                                type : 'shadow'     
                                            },
                                            textStyle: {
                                                fontSize: 10,
                                            },
                                            position: ['0%', '40%']
                                        },
                                        textStyle: {
                                            color: 'white',
                                            fontFamily: "'Gill Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serifs",
                                        },
                                        grid: {
                                            width: '68%',
                                            height: '20%',
                                            top: '30%',
                                            left: '2%'
                                        },
                                        xAxis: {     
                                            axisPointer: {
                                                show: true,
                                                snap: true,
                                            },
                                            axisLabel: {
                                                textStyle: {
                                                fontSize: 8
                                                }
                                            }
                                        },
                                        yAxis: {
                                            position: 'right',
                                            type: 'category',
                                            data : ['TOTAL AMOUNT'],
                                            axisLabel: {
                                                textStyle: {
                                                fontSize: 8
                                                }
                                            }
                                        },
                                        series: [{
                                            name:'N95 RESPIRATOR',
                                            type:'bar',
                                            stack:'sum',
                                            barWidth : 10,
                                            data: [dataArray[0]]
                                        },
                                        {
                                            name:'SURGICAL MASK',
                                            type:'bar',
                                            stack:'sum',
                                            barWidth : 10,
                                            itemStyle:{
                                                normal:{
                                                    color:'#9f9f9f'
                                                }
                                            },
                                            data: [dataArray[1]]
                                        },
                                        {
                                            name:'SURGICAL-N95-RESPIRATOR',
                                            type:'bar',
                                            stack:'sum',
                                            barWidth : 10,
                                            itemStyle:{
                                                normal:{
                                                    color:'#545454'
                                                }
                                            },
                                            data: [dataArray[2]]
                                        }]
                                    });

                                    // create quantity bar
                                    var order_detail_chart2 = echarts.init(document.getElementById('order_detail_chart2'))
                                    order_detail_chart2.setOption({
                                        color: 'white',
                                        tooltip : {
                                            trigger: 'axis',
                                            axisPointer : {          
                                                type : 'shadow'     
                                            },
                                            textStyle: {
                                                fontSize: 10,
                                            },
                                            position: ['0%', '40%']
                                        },
                                        textStyle: {
                                            color: 'white',
                                            fontFamily: "'Gill Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serifs",
                                        },
                                        grid: {
                                            width: '68%',
                                            height: '20%',
                                            top: '30%',
                                            left: '2%'
                                        },
                                        xAxis: {     
                                            axisPointer: {
                                                show: true,
                                                snap: true,
                                            },
                                            axisLabel: {
                                                textStyle: {
                                                fontSize: 8
                                                }
                                            }
                                        },
                                        yAxis: {
                                            position: 'right',
                                            type: 'category',
                                            data : ['TOTAL QUANTITY'],
                                            axisLabel: {
                                                textStyle: {
                                                fontSize: 8
                                                }
                                            }
                                        },
                                        series: [{
                                            name:'N95 RESPIRATOR',
                                            type:'bar',
                                            stack:'sum',
                                            barWidth : 10,
                                            data: [dataArray[3]]
                                        },
                                        {
                                            name:'SURGICAL MASK',
                                            type:'bar',
                                            stack:'sum',
                                            barWidth : 10,
                                            itemStyle:{
                                                normal:{
                                                    color:'#9f9f9f'
                                                }
                                            },
                                            data: [dataArray[4]]
                                        },
                                        {
                                            name:'SURGICAL-N95-RESPIRATOR',
                                            type:'bar',
                                            stack:'sum',
                                            barWidth : 10,
                                            itemStyle:{
                                                normal:{
                                                    color:'#545454'
                                                }
                                            },
                                            data: [dataArray[5]]
                                        }]
                                    });
                                             
                                    $('.order_detail').fadeIn(1400, 'easeInOutCubic')
                                },
                                error: function (msg) {alert(msg)}
                            })    
                            $('.order_detail').fadeIn(1400, 'easeInOutCubic')
                        },
                        error: function (msg) {alert(msg)}
                    })    
                }, 1200)
            })
        },  
        error: function (msg) {alert(msg)}
    })    

})
    