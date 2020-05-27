$(() => {

   
    $('.staff_navbar .account span').click(() => {
        $('.alert_password').hide(0)
        $('.alert_country_code').hide(0)
        $('.alert_telephone_number').hide(0)
        $('.alert_email').hide(0)

        $('.password_confirm').hide(0)
        $('.tel_confirm').hide(0)
        $('.email_confirm').hide(0)


      //get rep info
        $.ajax({
            url: "../php/staff/getRepInfo.php",
            method: 'POST',
            data: { rep_username: $.cookie('rep_username') },
            success: function (result) {
                // set up rep info
                $('.sale_rep_des').html(result)
            },
            error: function (msg) {alert(msg)}        
        })

         //get info by order status
         $.ajax({
            url: "../php/staff/getRepOrderInfo.php",
            method: 'POST',
            data: { rep_username: $.cookie('rep_username') },
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
                        left: '-2%',
                        top: '10%',
                        show: true,
                        text: 'Total Order: ' + (parseInt(dataArray[24]) + parseInt(dataArray[25]) +parseInt(dataArray[26]) + parseInt(dataArray[27])),
                        textStyle: {
                            fontSize: 10,
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
                // total sale of order has been completed.
                var total_revenue = parseFloat(dataArray[12]) +parseFloat(dataArray[13]) +parseFloat(dataArray[14]) + parseFloat(dataArray[18]) +parseFloat(dataArray[19]) +parseFloat(dataArray[20]);


                var rep_revenue_chart = echarts.init(document.getElementById('rep_revenue_chart'))
                rep_revenue_chart.setOption({
                    color: 'white',
                    title: {
                        left: '-2%',
                        top: '10%',
                        show: true,
                        text: 'Total Sale: $' + total_revenue.toFixed(2) + "\n(completed)",
                        textStyle: {
                            fontSize: 10,
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
                var total_quantity =  parseInt(dataArray[15]) + parseInt(dataArray[16]) + parseInt(dataArray[17]) + parseInt(dataArray[21]) + parseInt(dataArray[22]) + parseInt(dataArray[23]);

                // create bar
                var rep_quantity_chart = echarts.init(document.getElementById('rep_quantity_chart'))
                rep_quantity_chart.setOption({
                        color: 'white',
                        title: {
                            left: '-2%',
                            top: '10%',
                            show: true,
                            text: 'Total Quantity: ' + total_quantity+ "\n(completed)",
                            textStyle: {
                                fontSize: 10,
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

        $('.staff_navbar .account').css('font-weight', '900')
        $('.staff_navbar .account').css('text-shadow', '0 0 5px white')
        $('.account_section').animate({right: '0%'}, 1400, 'easeInOutCubic')
    
        $('.hide_account').click(() => {
            $('.account_section').animate({right: '-45%'}, 1400, 'easeInOutCubic')
            $('.staff_navbar .account').css('font-weight', '100')
        $('.staff_navbar .account').css('text-shadow', 'none')
        })



        error_register = [true, true, true, true];

        // Password can only be within 6-32 alphanumeric characters.
        $(".new_password").blur(function () {
            if (!(/^[0-9a-zA-Z]{6,32}$/).test($(this).val())) {
                $(".alert_password").slideDown(1400);
                error_register[0] = true;
            } else {
                $(".alert_password").slideUp(1400);
                error_register[0] = false;
            }
        })    

        // Country code with 1-10 numeric characters for telephone number.
        $(".new_code").blur(function () {
            if (!(/^[0-9]{1,10}$/).test($(this).val())) {
                $(".alert_country_code").slideDown(1400);
                error_register[1] = true;
            } else {
                $(".alert_country_code").slideUp(1400);
                error_register[1] = false;
            }
        })    
        // Telephone number with 8-30 numeric characters containing area code(if any) and tel number.
        $(".new_tel").blur(function () {
            if (!(/^[0-9]{8,30}$/).test($(this).val())) {
                $(".alert_telephone_number").slideDown(1400);
                error_register[2] = true;
            } else {
                $(".alert_telephone_number").slideUp(1400);
                error_register[2] = false;
            }
        })    
        // automatically validated by email input
        $(".new_email").blur(function () {
            if (!(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test($(this).val())) {
                $(".alert_email").slideDown(1400);
                error_register[3] = true;
            } else {
                $(".alert_email").slideUp(1400);
                error_register[3] = false;
            }
        })    

        // implement serve-side validation by ajax.
        $(".password_change .comfirm_button").click(function () {
            // if error, propmt user to fill up all information correctly!
            if (error_register[0] == 1) {
                $(".password_confirm").slideUp();  
                $(".password_confirm").html("Please fill up password information correctly!<div class='hide_change_confirm'>&#x29CB;</div>").slideDown();

            } else { // else, send data to validate.
                $.ajax({
                    url: "../php/staff/changeRepPassword.php",
                    method: 'POST',
                    data: {
                        username:  $.cookie('rep_username'),
                        password: $('.new_password').val(),
                        
                    },
                    success: function () {
                        // prompt confirm msg and refresh all data from input text.
                        $(".password_confirm").slideUp();  
                        $(".password_confirm").html("CHANGING SUCCESS<div class='hide_change_confirm'>&#x29CB;</div>").slideDown();
                        $('.password_confirm .hide_change_confirm').click(() => {
                            $('.password_confirm').slideUp();
                            $('.staff_navbar .account span').trigger('click')
                        })
                        $('.new_password').val('')

                    }, 
                    error: function (msg) {
                        // if system error, alert.
                        alert(msg);
                    }
                })
            }
        
        })
        $(".tel_change .comfirm_button").click(function () {
            // if error, propmt user to fill up all information correctly!
            if (error_register[1] == 1 || error_register[2] == 1) {
                $(".tel_confirm").slideUp();  
                $(".tel_confirm").html("Please fill up tel information correctly!<div class='hide_change_confirm'>&#x29CB;</div>").slideDown();

            } else { // else, send data to validate.
                $.ajax({
                    url: "../php/staff/changeRepTel.php",
                    method: 'POST',
                    data: {
                        username:  $.cookie('rep_username'),
                        telephone: '(' + $('.new_code').val() + ')' + $('.new_tel').val(),
                    },
                    success: function () {
                        // prompt confirm msg and refresh all data from input text.
                        $(".tel_confirm").slideUp();  
                        $(".tel_confirm").html("CHANGING SUCCESS<div class='hide_change_confirm'>&#x29CB;</div>").slideDown();
                        $('.tel_confirm .hide_change_confirm').click(() => {
                            $('.tel_confirm').slideUp();
                            $('.staff_navbar .account span').trigger('click')
                        })
                        $('.new_code').val('')
                        $('.new_tel').val('')

                    }, 
                    error: function (msg) {
                        // if system error, alert.
                        alert(msg);
                    }
                })
            }
        
        })
        
        $(".email_change .comfirm_button").click(function () {
            // if error, propmt user to fill up all information correctly!
            if (error_register[3] == 1) {
                $(".email_confirm").slideUp();  
                $(".email_confirm").html("Please fill up tel information correctly!<div class='hide_change_confirm'>&#x29CB;</div>").slideDown();

            } else { // else, send data to validate.
                $.ajax({
                    url: "../php/staff/changeRepEmail.php",
                    method: 'POST',
                    data: {
                        username:  $.cookie('rep_username'),
                        email: $('.new_email').val()
                    },
                    success: function () {
                        // prompt confirm msg and refresh all data from input text.
                        $(".email_confirm").slideUp();  
                        $(".email_confirm").html("CHANGING SUCCESS<div class='hide_change_confirm'>&#x29CB;</div>").slideDown();
                        $('.email_confirm .hide_change_confirm').click(() => {
                            $('.email_confirm').slideUp();
                            $('.staff_navbar .account span').trigger('click')
                        })
                        $('.new_email').val('')

                    }, 
                    error: function (msg) {
                        // if system error, alert.
                        alert(msg);
                    }
                })
            }
            
        })
    
       

    })


})