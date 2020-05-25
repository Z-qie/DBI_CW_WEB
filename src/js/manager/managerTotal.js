$(() => {
    $('.dashboard_section').hide(0)
    
    $('.navbar2 .dashboard span').click(() => {
        // get all rep names==========================================================================================
        $.ajax({
            url: "../php/manager/getRepName.php",
            method: 'POST',
            success: function (result) {
                $('#rep-select ').html(result);
            }, 
            error: function (msg) {alert(msg);}
        })
        // get all info==========================================================================================
        $.ajax({
            url: "../php/manager/getTotal.php",
            method: 'POST',
            success: function (result) {
                var dataArray = result.split(' ')
                //====================== total revenue =============================================
                // create bar
                var total_revenue_chart = echarts.init(document.getElementById('total_revenue_chart'))
                total_revenue_chart.setOption({
                    color: 'white',
                    title: {
                        left: '8%',
                        top: '20%',
                        show: true,
                        text: '$ ' + (parseFloat(dataArray[3]) + parseFloat(dataArray[3]) + parseFloat(dataArray[3])).toFixed(2), // total revenue
                        textStyle: {
                            fontSize: 12,
                            color: 'white',
                            fontFamily: "'Gill Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serifs",
                        },
                    },
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
                        width: '45%',
                        height: '40%',
                        top: '38%',
                        left: '10%'
                    },
                    dataset: {
                        source: [
                            ['amount', 'type'],        
                            [dataArray[5], 'SURGICAL-N95-RESPIRATOR'],
                            [dataArray[4], 'SURGICAL MASK'],
                            [dataArray[3], 'N95 RESPIRATOR']
                        ]
                    },
                    xAxis: {
                        axisPointer: {
                            show: true,
                            snap: true,
                        
                        },
                        axisLabel: {
                            rotate: -45,
                            textStyle: {
                            fontSize: 8
                            }
                        }
                    },
                    yAxis: {
                        position: 'right',
                        type: 'category',
                        axisLabel: {
                            textStyle: {
                            fontSize: 8
                            }
                        }
                    },
                    series: [{
                        type: 'bar',
                        barMaxWidth: '40%',
                        encode: {
                            x: 'amount',
                            y: 'type'
                        }
                    }]
                });
                
                //====================== total quantity =============================================
                // create bar
                var total_quantity_chart = echarts.init(document.getElementById('total_quantity_chart'))
                total_quantity_chart.setOption({
                    color: 'white',
                    title: {
                        left: '8%',
                        top: '20%',
                        show: true,
                        text: 'Num:  ' + (parseFloat(dataArray[0]) + parseFloat(dataArray[1]) + parseFloat(dataArray[2])), // total revenue
                        textStyle: {
                            fontSize: 12,
                            color: 'white',
                            fontFamily: "'Gill Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serifs",
                        },
                    },
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
                        width: '45%',
                        height: '40%',
                        top: '38%',
                        left: '10%'
                    },
                    dataset: {
                        source: [
                            ['amount', 'type'],        
                            [dataArray[2], 'SURGICAL-N95-RESPIRATOR'],
                            [dataArray[1], 'SURGICAL MASK'],
                            [dataArray[0], 'N95 RESPIRATOR']
                        ]
                    },
                    xAxis: {
                        axisPointer: {
                            show: true,
                            snap: true,
                        
                        },
                        axisLabel: {
                            rotate: -45,
                            textStyle: {
                            fontSize: 8
                            }
                        }
                    },
                    yAxis: {
                        position: 'right',
                        type: 'category',
                        axisLabel: {
                            textStyle: {
                            fontSize: 8
                            }
                        }
                    },
                    series: [{
                        type: 'bar',
                        barMaxWidth: '40%',
                        encode: {
                            x: 'amount',
                            y: 'type'
                        }
                    }]
                })
                window.onresize = total_revenue_chart.resize
                window.onresize = total_quantity_chart.resize
            },
            error: function (msg) {alert(msg)}        
        })
        // get info by order status==========================================================================================
        $.ajax({
            url: "../php/manager/getTotalByOrder.php",
            method: 'POST',
            success: function (result) {
                var dataArray = result.split(' ')
                var revenue_data1 = [dataArray[0], dataArray[6], dataArray[12], dataArray[18]]
                var revenue_data2 = [dataArray[1], dataArray[7], dataArray[13], dataArray[19]]
                var revenue_data3 = [dataArray[2], dataArray[8], dataArray[14], dataArray[20]]
                var quantity_data1 = [dataArray[3], dataArray[9], dataArray[15], dataArray[21]]
                var quantity_data2 = [dataArray[4], dataArray[10], dataArray[16], dataArray[22]]
                var quantity_data3 = [dataArray[5], dataArray[11], dataArray[17], dataArray[23]]
                $('.total_order_des').html(
                    "<span>PROCESSING ORDERS&nbsp;&nbsp;-&nbsp;&nbsp;Total Amount: $</span>" + (parseFloat(dataArray[0]) + parseFloat(dataArray[1]) + parseFloat(dataArray[2])).toFixed(2) +
                    "&nbsp;&nbsp;-&nbsp;&nbsp;Quantity: " + (parseFloat(dataArray[3]) + parseFloat(dataArray[4]) + parseFloat(dataArray[5])) +
                    "<br /><span>CANCELLED ORDERS&nbsp;&nbsp;-&nbsp;&nbsp;Total Amount: $</span>" + (parseFloat(dataArray[6]) + parseFloat(dataArray[7]) + parseFloat(dataArray[8])).toFixed(2) +
                    "&nbsp;&nbsp;-&nbsp;&nbsp;Quantity: " + (parseFloat(dataArray[9]) + parseFloat(dataArray[10]) + parseFloat(dataArray[11])) +
                    "<br /><span>NORMAL ORDERS&nbsp;&nbsp;-&nbsp;&nbsp;Total Amount: $</span>" +(parseFloat(dataArray[12]) + parseFloat(dataArray[13]) + parseFloat(dataArray[14])).toFixed(2) +
                    "&nbsp;&nbsp;-&nbsp;&nbsp;Quantity: " + (parseFloat(dataArray[15]) + parseFloat(dataArray[16]) + parseFloat(dataArray[17])) +
                    "<br /><span>ABNORMAL ORDERS&nbsp;&nbsp;-&nbsp;&nbsp;Total Amount: $</span>" + (parseFloat(dataArray[18]) + parseFloat(dataArray[19]) + parseFloat(dataArray[20])).toFixed(2) +
                    "&nbsp;&nbsp;-&nbsp;&nbsp;Quantity: " + (parseFloat(dataArray[21]) + parseFloat(dataArray[22]) + parseFloat(dataArray[23])))
                    


                //====================== total revenue =============================================
                // create bar
                var total_revenue_order = echarts.init(document.getElementById('total_revenue_order'))
                total_revenue_order.setOption({
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
                        width: '55%',
                        height: '50%',
                        top: '35%',
                        left: '18%'
                    },
                    xAxis: {     
                        type: 'category',
                        data : ['PROCESSING', 'CANCELLED', 'NORMAL', 'ABNORMAL'],
                        axisLabel: {
                            rotate: -45,
                            textStyle: {
                            fontSize: 8
                            }
                        }
                    },
                    yAxis: {
                        position: 'right',
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
                    series: [{
                        name:'N95 RESPIRATOR',
                        type:'bar',
                        stack:'sum',
                        barWidth : 10,
                        data: revenue_data1
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
                        data: revenue_data2
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
                        data: revenue_data3
                    }]
                });
                
                //====================== total quantity =============================================
                // create bar
                var total_quantity_order = echarts.init(document.getElementById('total_quantity_order'))
                total_quantity_order.setOption({
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
                            width: '55%',
                            height: '50%',
                            top: '35%',
                            left: '10%'
                        },
                        xAxis: {     
                            type: 'category',
                            data : ['PROCESSING', 'CANCELLED', 'NORMAL', 'ABNORMAL'],
                            axisLabel: {
                                rotate: -45,
                                textStyle: {
                                fontSize: 8
                                }
                            }
                        },
                        yAxis: {
                            position: 'right',
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
                        series: [{
                            name:'N95 RESPIRATOR',
                            type:'bar',
                            stack:'sum',
                            barWidth : 10,
                            data: quantity_data1
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
                            data: quantity_data2
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
                            data: quantity_data3
                        }]
                    });
                window.onresize = total_revenue_order.resize
                window.onresize = total_quantity_order.resize
            },
            error: function (msg) {alert(msg)}        
        })
        $('.dashboard_section').fadeIn(2000, 'easeInOutCubic')
    })

   
    $('#rep-select').change(() => { 
        if ( $('#rep-select').val() != '') {
            $.ajax({
                url: "../php/manager/getTotalByRep.php",
                method: 'POST',
                data: { rep_username: $('#rep-select').val() },
                success: function (result) {
                    var dataArray = result.split(' ')
                    // set up rep info
                    $('.rep_des').html(
                        "<span>REP ID: </span>" + dataArray[0] + 
                        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>WORKING STATUS: </span>" + dataArray[1] + 
                        "<br /><span>TOTAL CUSTOMER: </span>" + dataArray[2] + 
                        "<br /><span>TOTAL ORDER: </span>" + dataArray[3] + 
                        "<br /><span>NORMAL ORDER: </span>" + dataArray[4] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>ABNORMAL ORDER: </span>" + dataArray[5])

                    //====================== total revenue =============================================
                    // create bar
                    var rep_total_revenue_chart = echarts.init(document.getElementById('rep_total_revenue_chart'))
                    rep_total_revenue_chart.setOption({
                        color: 'white',
                        title: {
                            left: '16%',
                            top: '0%',
                            show: true,
                            text: 'TOTAL SALES: $ ' + (parseFloat(dataArray[9]) + parseFloat(dataArray[10]) + parseFloat(dataArray[11])).toFixed(2), // total revenue
                            textStyle: {
                                fontSize: 8,
                                color: 'white',
                                fontFamily: "'Gill Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serifs",
                            },
                        },
                        textStyle: {
                            color: 'white',
                            fontFamily: "'Gill Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serifs",
                        },
                        grid: {
                            width: '100%',
                            height: '100%',
                            top: '0%',
                            left: '20%'
                        },
                        tooltip: {
                            show: true,
                            trigger: 'item',
                            formatter: "{b}: {c} ({d}%)",
                            textStyle: {
                                fontSize: 10,
                            },
                            position: ['0%', '50%']
                            
                        },
                        series: [{
                            type: 'pie',
                            radius: '60%',
                            selectedMode: 'single',
                            label: { 
                                show: true,
                                fontSize: 8,
                                align: 'left',
                            },
                            itemStyle: {
                                normal: {
                                    color: 'white',
                                    shadowBlur: 80,
                                    shadowColor: 'black'
                                }
                            },
                            data:[
                                {value: dataArray[9], name:'N95 RESPIRATOR'},
                                {value: dataArray[10], name:'SURGICAL MASK'},
                                {value: dataArray[11], name:'SURGICAL-N95-RESPIRATOR'},
                            ],
                            roseType: 'angle'
                           
                        }]
                    });
                    
                      //====================== total quantity =============================================
                    // create bar
                    var rep_total_quantity_chart = echarts.init(document.getElementById('rep_total_quantity_chart'))
                    rep_total_quantity_chart.setOption({
                        color: 'white',
                        title: {
                            left: '16%',
                            top: '0%',
                            show: true,
                            text: 'TOTAL QUANTITY: ' + (parseFloat(dataArray[6]) + parseFloat(dataArray[7]) + parseFloat(dataArray[8])), // total quantity
                            textStyle: {
                                fontSize: 8,
                                color: 'white',
                                fontFamily: "'Gill Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serifs",
                            },
                        },
                        textStyle: {
                            color: 'white',
                            fontFamily: "'Gill Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serifs",
                        },
                        grid: {
                            width: '100%',
                            height: '100%',
                            top: '10%',
                            left: '20%'
                        },
                        tooltip: {
                            show: true,
                            trigger: 'item',
                            formatter: "{b}: {c} ({d}%)",
                            textStyle: {
                                fontSize: 10,
                            },
                            position: ['-15%', '50%']
                        },
                        series: [{
                            type: 'pie',
                            radius: '60%',
                            selectedMode: 'single',
                            label: { 
                                show: true,
                                fontSize: 8,
                                align: 'left',
                            },
                            itemStyle: {
                                normal: {
                                    color: 'white',
                                    shadowBlur: 80,
                                    shadowColor: 'black'
                                }
                            },
                            data:[
                                {value: dataArray[6], name:'N95 RESPIRATOR'},
                                {value: dataArray[7], name:'SURGICAL MASK'},
                                {value: dataArray[8], name:'SURGICAL-N95-RESPIRATOR'},
                            ],
                            roseType: 'angle'
                        }]
                    });
                    window.onresize = rep_total_revenue_chart.resize
                    window.onresize = rep_total_quantity_chart.resize      
                },
                error: function (msg) {alert(msg)}        
            })
        }
    })

    $('#region-select').change(() => { 
        if ( $('#region-select').val() != '') {
            $.ajax({
                url: "../php/manager/getTotalByRegion.php",
                method: 'POST',
                data: { region: $('#region-select').val() },
                success: function (result) {
                    var dataArray = result.split(' ')
                    // set up region info
                    $('.region_des').html(
                        "<span>TOTOL REP: </span>" + dataArray[2] + 
                        "<br /><span>ACTIVE REP: </span>" + dataArray[0] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>LEFT REP: </span>" + dataArray[1] +
                        "<br /><span>TOTAL CUSTOMER: </span>" + dataArray[3] + 
                        "<br /><span>TOTAL ORDER: </span>" + dataArray[6] + 
                        "<br /><span>NORMAL ORDER: </span>" + dataArray[4] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>ABNORMAL ORDER: </span>" + dataArray[5])

                    //====================== total revenue =============================================
                    // create bar
                    var region_total_revenue_chart = echarts.init(document.getElementById('region_total_revenue_chart'))
                    region_total_revenue_chart.setOption({
                        color: 'white',
                        title: {
                            left: '16%',
                            top: '0%',
                            show: true,
                            text: 'TOTAL SALES: $ ' + (parseFloat(dataArray[10]) + parseFloat(dataArray[11]) + parseFloat(dataArray[12])).toFixed(2), // total revenue
                            textStyle: {
                                fontSize: 8,
                                color: 'white',
                                fontFamily: "'Gill Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serifs",
                            },
                        },
                        textStyle: {
                            color: 'white',
                            fontFamily: "'Gill Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serifs",
                        },
                        grid: {
                            width: '100%',
                            height: '100%',
                            top: '0%',
                            left: '20%'
                        },
                        tooltip: {
                            show: true,
                            trigger: 'item',
                            formatter: "{b}: {c} ({d}%)",
                            textStyle: {
                                fontSize: 10,
                            },
                            position: ['0%', '50%']
                        },
                        series: [{
                            type: 'pie',
                            radius: '60%',
                            selectedMode: 'single',
                            label: { 
                                show: true,
                                fontSize: 8,
                                align: 'left',
                            },
                            itemStyle: {
                                normal: {
                                    color: 'white',
                                    shadowBlur: 80,
                                    shadowColor: 'black'
                                }
                            },
                            data:[
                                {value: dataArray[10], name:'N95 RESPIRATOR'},
                                {value: dataArray[11], name:'SURGICAL MASK'},
                                {value: dataArray[12], name:'SURGICAL-N95-RESPIRATOR'},
                            ],
                            roseType: 'angle'
                           
                        }]
                    });
                    
                      //====================== total quantity =============================================
                    // create bar
                    var region_total_quantity_chart = echarts.init(document.getElementById('region_total_quantity_chart'))
                    region_total_quantity_chart.setOption({
                        color: 'white',
                        title: {
                            left: '16%',
                            top: '0%',
                            show: true,
                            text: 'TOTAL QUANTITY: ' + (parseFloat(dataArray[7]) + parseFloat(dataArray[8]) + parseFloat(dataArray[9])), // total quantity
                            textStyle: {
                                fontSize: 8,
                                color: 'white',
                                fontFamily: "'Gill Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serifs",
                            },
                        },
                        textStyle: {
                            color: 'white',
                            fontFamily: "'Gill Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serifs",
                        },
                        grid: {
                            width: '100%',
                            height: '100%',
                            top: '10%',
                            left: '20%'
                        },
                        tooltip: {
                            show: true,
                            trigger: 'item',
                            formatter: "{b}: {c} ({d}%)",
                            textStyle: {
                                fontSize: 10,
                            },
                            position:  ['-15%', '50%']
                        },
                        series: [{
                            type: 'pie',
                            radius: '60%',
                            selectedMode: 'single',
                            label: { 
                                show: true,
                                fontSize: 8,
                                align: 'left',
                            },
                            itemStyle: {
                                normal: {
                                    color: 'white',
                                    shadowBlur: 80,
                                    shadowColor: 'black'
                                }
                            },
                            data:[
                                {value: dataArray[7], name:'N95 RESPIRATOR'},
                                {value: dataArray[8], name:'SURGICAL MASK'},
                                {value: dataArray[9], name:'SURGICAL-N95-RESPIRATOR'},
                            ],
                            roseType: 'angle'
                        }]
                    });
                    window.onresize = region_total_revenue_chart.resize
                    window.onresize = region_total_quantity_chart.resize      
                },
                error: function (msg) {alert(msg)}        
            })
        }
    })

    $('.navbar2 .dashboard span').trigger('click')
})

    






     
