$(function() {
    $('.order_list').hide(0)
    $('.order_section').hide(0);

    $('.navbar .orders').click(() => {
        if ($.cookie('username') == 'null' || $.cookie('username') == undefined) {
            alert("Please log in first!");
            $('.nav_option .logout span').trigger("click");
        } else {
            //show order list
            $('.order_section').hide(0);
            $('.order_list').stop().effect('slide', 1400)
            setTimeout(() => { $(".hide_order").show(0) }, 1400);
            setTimeout(() => {
                // get all orders of current users' 
                $.ajax({
                    url: "../php/getOrderInfo.php",
                    data: {
                        username: $.cookie('username')
                    },
                    method: 'POST',
                    success: function (result) {
                        $('.order_list').html(result);
                        $('.order_section').hide(0);
                        $('.order_section').slideDown(1400, "easeInOutCubic")
                        $('.order_alert').hide(0)
                        $('.cancel_alert').hide(0)
                        
                        $(".hide_order").click(
                            () => {
                                $(".hide_order").hide(0)
                                $('.order_section').stop().slideUp(1000, "easeInOutCubic")
                                setTimeout(() => { $('.order_list').stop().effect('fold', 1600) }, 800);   
                            }
                        )

                        $(".order_cancel")
                        .hover(
                            (e) => {
                                $(e.target).stop().animate({backgroundColor: jQuery.Color( "rgb(139, 0, 0)" )}, 250)
                                $(e.target).css("text-decoration", "line-through")
                            },
                            (e) => {
                                $(e.target).stop().animate({backgroundColor: jQuery.Color( "transparent" )}, 250)
                                $(e.target).css("text-decoration", "none")
                            })
                        .click((e) => {
                            var currentTime = Date.now();
                            var interval = (currentTime - Date.parse($(e.target).siblings(".order_date").children("div").html())) / (1000 * 60 * 60);
                            
                            // alert user if the order has exceed 24h
                            if (interval > 24.00 && $(e.target).siblings('.order_status').html() == "<span>STATUS - </span>processing" ) {
                                $(e.target).siblings('.order_alert').html("Sorry!<br /> This order has exceeded 24 hours, you can no more cancel it.<br /><br /><br /><br /> <span class='hide_alert'>&#x29CB;</span>")
                                $(e.target).siblings('.order_alert').stop().slideDown(1400, "easeInOutCubic")
                                $('.hide_alert').click((ev) => {
                                    $(ev.target).parent().stop().effect('fold', 1400)
                                })
                            } else if ($(e.target).siblings('.order_status').html() == "<span>STATUS - </span>cancelled" ||
                                    $(e.target).siblings('.order_status').html() == "<span>STATUS - </span>cancelled by user" ||
                                    $(e.target).siblings('.order_status').html() == "<span>STATUS - </span>cancelled by rep") {
                                $(e.target).siblings('.order_alert').html("Sorry!<br /> This order has been cancelled.<br /><br /><br /><br /> <span class='hide_alert'>&#x29CB;</span>")
                                $(e.target).siblings('.order_alert').stop().slideDown(1400, "easeInOutCubic")
                                $('.hide_alert').click((ev) => {
                                    $(ev.target).parent().stop().effect('fold', 1400)
                                })
                            } else if ($(e.target).siblings('.order_status').html() == "<span>STATUS - </span>completed") {
                                $(e.target).siblings('.order_alert').html("Sorry!<br /> This order has been completed.<br /><br /><br /><br /> <span class='hide_alert'>&#x29CB;</span>")
                                $(e.target).siblings('.order_alert').stop().slideDown(1400, "easeInOutCubic")
                                $('.hide_alert').click((ev) => {
                                    $(ev.target).parent().stop().effect('fold', 1400)
                                })
                            } else {
                                //alert user for futher confirmation
                                $(e.target).siblings('.cancel_alert').stop().slideDown(1400, "easeInOutCubic")
                                
                                //if yes
                                $('.cancel_alert .yes').click((ev) => {
                                
                                    //cancel selected order
                                    $.ajax({
                                        url: "../php/cancelOrderByUser.php",
                                        data: {
                                            order_ID: $(ev.target).parent().siblings('.order_ID').html().substring(25)
                                        },
                                        method: 'POST',
                                        success: function (result) {
                                            //refresh order list
                                            $('.navbar .orders').trigger('click')
                                        }, 
                                        error: function (msg) {alert(msg);}
                                    })
                                })
                                //else
                                $('.cancel_alert .no').click((ev) => {
                                    $(ev.target).parent().stop().effect('fold', 1400)
                                })
                                
                            }  
                        })
                    },
                    error: function (msg) {alert(msg);}
                })
            }, 1400);  
        }
    })

})