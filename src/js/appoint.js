$(function () {
    $('.select_rep, .rep_info').hide(1);
    $('.promptAppoint').hide(1);
    // ready to appoint.
    $('.pay_button').click(() => {
        //check if user has logged in. If no, alert user and jump to log in section.
        if ($.cookie('username') == 'null' || $.cookie('username') == undefined) {
            alert("Please log in first!");
            $('.nav_option .logout span').trigger("click");
        } else {
            // check if user has select at least 1 commodity
            if ($('.cart_item .total span').html() == 'TOTAL: $0.00') {
                alert('Please select at least 1 commodity!') 
            } else {
                 // if yes, show apointment section
                $('.confirm_select').stop().animate({bottom: '-9%'}, 800) 
                $('.appoint').stop().animate({right: '32%'}, 1400, "easeInOutCubic")
                $('.rep_name, .Tel, .rep_info .email, .quota_remain, .total_orders, #rep-select').stop().animate({right: '-100%'}, 1)
                
                setTimeout(() => { 
                    $('.appoint_hover').stop().animate({width: '100%'}, 1400, "easeInOutCubic") 
                    $('.promptAppoint').stop().slideDown(1000)
                }, 1200)

                // get all reps currently serve the same region as user's for selection bar
                $.ajax({
                    url: "../php/getRepName.php",
                    method: 'POST',
                    data: { username: $.cookie('username')},
                    success: function (result) {
                        $('#rep-select ').html(result);
                    }, 
                    error: function (msg) {alert(msg);}
                })
            }
        }
    })

    // after reading the appointment msg, show selection bar.
    $('.hide_prompt').click(() => { 
        $('.select_rep, .rep_info').show(1);
        $('.promptAppoint').stop().effect("fold", 1000)
        setTimeout(() => {
            $('#rep-select').stop().animate({right: '0'}, 1400, "easeInOutCubic") 
            $('.confirm_select').stop().animate({bottom: '0'}, 1400, "easeInOutCubic") 
        }, 800);
    })

    // after user selecting a rep name, show detail info
    $('#rep-select').change(() => { 
        if ( $('#rep-select').val() != '') {
           
            $('.rep_info').show(1);
            $('.rep_info .rep_name').stop().animate({right: '-100%'}, 500, "easeInOutCubic") 
            $('.rep_info .Tel').stop().animate({right: '-100%'}, 400, "easeInOutCubic") 
            $('.rep_info .email').stop().animate({right: '-100%'}, 300, "easeInOutCubic") 
            $('.rep_info .quota_remain').stop().animate({right: '-100%'}, 200, "easeInOutCubic") 
            $('.rep_info .total_orders').stop().animate({right: '-100%'}, 100, "easeInOutCubic") 
            
            setTimeout(() => {
                $.ajax({
                    url: "../php/getRepInfo.php",
                    method: 'POST',
                    data: { username: $('#rep-select').val() },
                    success: function (result) {
                        $('.rep_info').html(result);
                    }, 
                    error: function (msg) {alert(msg);}
                })
            }, 500); 

           
            setTimeout(() => {
                $('.rep_info .rep_name').stop().animate({right: '0'}, 1400, "easeInOutCubic") 
            }, 600);
            setTimeout(() => {
                $('.rep_info .Tel').stop().animate({right: '0'}, 1400, "easeInOutCubic") 
            }, 900);
            setTimeout(() => {
                $('.rep_info .email').stop().animate({right: '0'}, 1400, "easeInOutCubic") 
            }, 1200);
            setTimeout(() => {
                $('.rep_info .quota_remain').stop().animate({right: '0'}, 1400, "easeInOutCubic") 
            }, 1500);
            setTimeout(() => {
                $('.rep_info .total_orders').stop().animate({right: '0'}, 1400, "easeInOutCubic") 
            }, 1800);
        }
    })

    $('.confirmation_screen').hide(1);
    $('.confirmation').hide(1);

    // ready to confirm the selected rep
    $(".confirm_select span")
    .hover(
        () => {
            $(".confirm_select span").stop().animate({backgroundColor: jQuery.Color( "rgb(139, 0, 0)" )}, 250)
            $(".confirm_select span").css("text-decoration", "line-through")
        },
        () => {
            $(".confirm_select span").stop().animate({backgroundColor: jQuery.Color( "transparent" )}, 250)
            $(".confirm_select span").css("text-decoration", "none")
        }
    )
    .click(() => {
        if ($.cookie('username') == 'null' || $.cookie('username') == undefined) {
            alert("Please log in first!");
            $('.nav_option .logout span').trigger("click");
        } else {
            // check if user has select at least 1 commodity
            if ($('.cart_item .total span').html() == 'TOTAL: $0.00') {
                alert('Please select at least 1 commodity!') 
            } 
            else if ($('.select_rep .custom-select').val() == '') {
                alert('Please select a rep for you!') 
            } else {
                // generate order in database!
                $.ajax({
                    url: "../php/orderGenerating.php",
                    method: 'POST',
                    data: { 
                        customer_username: $.cookie('username'),
                        rep_username: $('#rep-select').val(), 
                        type1_quantity: +$(".item_button1 input").val(),
                        type2_quantity: +$(".item_button2 input").val(),
                        type3_quantity: +$(".item_button3 input").val(),
                        type1_unit_price: +$('.item_price1').html().substring(1),
                        type2_unit_price: +$('.item_price2').html().substring(1),
                        type3_unit_price: +$('.item_price3').html().substring(1)         
                    },
                    success: function (date) {
                         // if yes, show apointment section
                        // get current date
                
                        $('.confirmation').show(1);
                        $('.order_prompt').hide(1);
                        $('.confirm_info').hide(1);
                        $('.order_prompt .repname').html($('.select_rep .custom-select').val())
                        // set order information
                        $('.confirm_info').html(
                                "<span>ORDER INFO</span> " 
                                + "<br /><br /><br /><br /><br /><br />" + "CUSTOMER: " + $.cookie('username') + "<br /> REPRESENTATIVE: " + $('.select_rep .custom-select').val()
                                + "<br /><br /><br /><br /> <span>QUANTITY</span> <br /> <br /> N95 RESPIRATOR: " + +$(".item_button1 input").val() 
                                + "<br /> SURGICAL MASK: " + +$(".item_button2 input").val()
                                + "<br /> SURGICAL-N95-RESPIRATOR: " + +$(".item_button3 input").val()
                                + "<br /><br /><br /><br />" +  $('.cart_item .total span').html()
                                + "<br /><br /> DATE: " + date
                        )
                        $('.confirmation').stop().animate({right: '57%'}, 1400, "easeInOutCubic") 
                        $('.confirmation_screen').stop().fadeIn(1400, "easeInOutCubic");
                        
                        setTimeout(() => { 
                            $('.confirmaiton_hover').stop().animate({width: '100%'}, 2400, "easeInOutCubic") 
                            $('.order_prompt').stop().slideDown(1800, "easeInOutCubic")
                        }, 1200)
                        setTimeout(() => { 
                            $('.confirm_info').stop().slideDown(2000, "easeInOutCubic")
                        }, 2200)
                    }, 
                    error: function (msg) {alert(msg);}
                })
            }
        }
    })
    
    $('.hide_prompt2').click(() => {
        $('.confirmation, .confirmation_screen, .confirmaiton_hover').stop().effect('fold', 1000)
        $('.confirmation').stop().animate({right: '32%'},1)
        $('.confirmaiton_hover').stop().animate({width: '0'}, 1) 
        $('.hide_cart').trigger('click')
    })
    

   
})