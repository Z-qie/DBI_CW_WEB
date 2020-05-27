$(() => {
    $('.country_assign_confirm').hide(0)
    $('.status_assign_confirm').hide(0)

    $('.country_assign').hide(0)
    $('.working_status_assign').hide(0)
    
    $('.navbar2 .rep_info span').click(() => {
        $('.sale_rep_des').hide(0)
        $('#rep_quantity_chart').hide(0)
        $('#rep_revenue_chart').hide(0)
        $('#rep_order_chart').hide(0)
        $('.country_assign').hide(0)
        $('.working_status_assign').hide(0)
        // get rep name
        $.ajax({
            url: "../php/manager/getRepName.php",
            method: 'POST',
            success: function (result) {
                $('#rep_selecting').html(result);
                $('.sale_rep_section').animate({right: 0}, 1400, 'easeInOutCubic')
            }, 
            error: function (msg) {alert(msg);}
        })
    })

    $('#rep_selecting').change(() => { 
        if ( $('#rep_selecting').val() != '') {
            $('.sale_rep_des').hide(0)
            $('#rep_quantity_chart').hide(0)
            $('#rep_revenue_chart').hide(0)
            $('#rep_order_chart').hide(0)
            //get rep info
            $.ajax({
                url: "../php/manager/getRepInfo.php",
                method: 'POST',
                data: { rep_username: $('#rep_selecting').val() },
                success: function (result) {
                    // set up rep info
                    $('.sale_rep_des').html(result)
                    
                },
                error: function (msg) {alert(msg)}        
            })
            //get rep region
            $.ajax({
                url: "../php/manager/getRepRegion.php",
                method: 'POST',
                data: { rep_username: $('#rep_selecting').val() },
                success: function (result) {
                    // set up rep info
                    $('.current_country').html(result)
                },
                error: function (msg) {alert(msg)}        
            })
            //get rep working status
            $.ajax({
                url: "../php/manager/getRepWorkingStatus.php",
                method: 'POST',
                data: { rep_username: $('#rep_selecting').val() },
                success: function (result) {
                    // set up rep info
                    $('.current_status').html(result)
                },
                error: function (msg) {alert(msg)}        
            })

            //get info by order status
            $.ajax({
                url: "../php/manager/getRepOrderInfo.php",
                method: 'POST',
                data: { rep_username: $('#rep_selecting').val() },
                success: function (result) {
                    var dataArray = result.split(' ')
                    var revenue_data1 = [dataArray[0], dataArray[6], dataArray[12], dataArray[18]]
                    var revenue_data2 = [dataArray[1], dataArray[7], dataArray[13], dataArray[19]]
                    var revenue_data3 = [dataArray[2], dataArray[8], dataArray[14], dataArray[20]]
                    var quantity_data1 = [dataArray[3], dataArray[9], dataArray[15], dataArray[21]]
                    var quantity_data2 = [dataArray[4], dataArray[10], dataArray[16], dataArray[22]]
                    var quantity_data3 = [dataArray[5], dataArray[11], dataArray[17], dataArray[23]]
                    var order_data = [dataArray[24], dataArray[25], dataArray[26], dataArray[27]]
                    
                    //====================== total order count =============================================
                    // create bar
                    var rep_order_chart = echarts.init(document.getElementById('rep_order_chart'))
                    rep_order_chart.setOption({
                        color: 'white',
                        title: {
                            left: '-5%',
                            top: '10%',
                            show: true,
                            text: 'Total Order: ' + (parseInt(dataArray[24]) + parseInt(dataArray[25]) +parseInt(dataArray[26]) + parseInt(dataArray[27])),
                            textStyle: {
                                fontSize: 9,
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
                            width: '70%',
                            height: '50%',
                            top: '25%',
                            left: '0%'
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
                            name:'Order Count',
                            type:'bar',
                            stack:'sum',
                            barWidth : 10,
                            data: order_data
                        }]
                    });
                    //====================== total revenue =============================================
                    // create bar
                    var total_revenue = parseFloat(dataArray[12]) +parseFloat(dataArray[13]) +parseFloat(dataArray[14]) + parseFloat(dataArray[18]) +parseFloat(dataArray[19]) +parseFloat(dataArray[20]);

                    var rep_revenue_chart = echarts.init(document.getElementById('rep_revenue_chart'))
                    rep_revenue_chart.setOption({
                        color: 'white',
                        title: {
                            left: '-5%',
                            top: '10%',
                            show: true,
                            text: 'Total Sale: $' + total_revenue.toFixed(2)+ "\n(completed)",
                            textStyle: {
                                fontSize: 9,
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
                            width: '70%',
                            height: '50%',
                            top: '25%',
                            left: '0%'
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
                    var total_quantity = parseInt(dataArray[15]) + parseInt(dataArray[16]) + parseInt(dataArray[17]) + parseInt(dataArray[21]) + parseInt(dataArray[22]) + parseInt(dataArray[23]);
                   
                    // create bar
                    var rep_quantity_chart = echarts.init(document.getElementById('rep_quantity_chart'))
                    rep_quantity_chart.setOption({
                            color: 'white',
                            title: {
                                left: '-5%',
                                top: '10%',
                                show: true,
                                text: 'Total Quantity: ' + total_quantity + "\n(completed)",
                                textStyle: {
                                    fontSize: 9,
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
                                width: '70%',
                                height: '50%',
                                top: '25%',
                                left: '0%'
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
                    window.onresize = rep_quantity_chart.resize
                    window.onresize = rep_revenue_chart.resize
                    window.onresize = rep_order_chart.resize
                },
                error: function (msg) {alert(msg)}        
            })
            $('.sale_rep_des').fadeIn(1400, 'easeInOutCubic')
            $('#rep_quantity_chart').fadeIn(1400, 'easeInOutCubic')
            $('#rep_revenue_chart').fadeIn(1400, 'easeInOutCubic')
            $('#rep_order_chart').fadeIn(1400, 'easeInOutCubic')
            $('.country_assign').fadeIn(1400, 'easeInOutCubic')
            $('.working_status_assign').fadeIn(1400, 'easeInOutCubic')
        } 
        else {
            $('.sale_rep_des').fadeOut(1400, 'easeInOutCubic')
            $('#rep_quantity_chart').fadeOut(1400, 'easeInOutCubic')
            $('#rep_revenue_chart').fadeOut(1400, 'easeInOutCubic')
            $('#rep_order_chart').fadeOut(1400, 'easeInOutCubic')
            $('.country_assign').fadeOut(1400, 'easeInOutCubic')
            $('.working_status_assign').fadeOut(1400, 'easeInOutCubic')

        }
    })

    $('.country_confirm').click((e) => {
        if ($(e.target).siblings('.country_selecting').find("#country_selecting" ).val() == '' ) {
            $('.country_assign_confirm').html("SORRY!<br />Please select a country.<br /><br /><div class='hide_request_confirm'>&#x29CB;</div>")
            $('.country_assign_confirm').slideDown();(1400, 'easeInOutCubic')
            $('.country_assign_confirm .hide_request_confirm').click(() => {
                $('.country_assign_confirm').effect('fold', 1400)
            })
        } else {
            $.ajax({
                url: "../php/manager/setRepRegion.php",
                method: 'POST',
                data: { 
                    rep_username: $('#rep_selecting').val(),
                    country: $(e.target).siblings('.country_selecting').find("#country_selecting" ).val()
                },
                success: function () {
                    $('.country_assign_confirm').html("Congrats!<br />The sale has been reassigned!.<br /><br /><div class='hide_request_confirm'>&#x29CB;</div>")
                    $('.country_assign_confirm').slideDown();(1400, 'easeInOutCubic')

                    $('.current_country').html('<span>Current working region: </span>' + $(e.target).siblings('.country_selecting').find("#country_selecting" ).val())
                    
                    $('.country_assign_confirm .hide_request_confirm').click(() => {
                        $('.country_assign_confirm').effect('fold', 1400)
                    })
                }, 
                error: function (msg) {alert(msg);}
            })
        }
    })

    $('.status_confirm').click((e) => {
        if ($(e.target).siblings('.status_selecting').find("#status_selecting" ).val() == '' ) {
            $('.status_assign_confirm').html("SORRY!<br />Please select a status.<br /><br /><div class='hide_request_confirm'>&#x29CB;</div>")
            $('.status_assign_confirm').slideDown();(1400, 'easeInOutCubic')
            $('.status_assign_confirm .hide_request_confirm').click(() => {
                $('.status_assign_confirm').effect('fold', 1400)
            })
        } else {
            $.ajax({
                url: "../php/manager/setRepStatus.php",
                method: 'POST',
                data: { 
                    rep_username: $('#rep_selecting').val(),
                    status: $(e.target).siblings('.status_selecting').find("#status_selecting" ).val()
                },
                success: function () {
                    $('.status_assign_confirm').html("Congrats!<br />The sale rep status has been updated!.<br /><br /><div class='hide_request_confirm'>&#x29CB;</div>")
                    $('.status_assign_confirm').slideDown();(1400, 'easeInOutCubic')

                    $('.current_status').html('<span>Current working status: </span>' + $(e.target).siblings('.status_selecting').find("#status_selecting" ).val())
                    
                    $('.status_assign_confirm .hide_request_confirm').click(() => {
                        $('.status_assign_confirm').effect('fold', 1400)
                    })
                   
                },
                error: function (msg) {alert(msg);}
            })
        }
    })

    $('.hide_rep_section').click(() => {
        $('.sale_rep_section').animate({right: '-30%'}, 1400, 'easeInOutCubic')
    })
})
