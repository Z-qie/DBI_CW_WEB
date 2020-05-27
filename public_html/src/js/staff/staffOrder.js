$(() => {
    $('.order_section').hide(0);
    $('.order_detail').hide(0);

     
    $('.staff_navbar .orders').click(() => {

        var detail_show;
        $('.staff_navbar .orders').css('font-weight', '900')
        $('.staff_navbar .orders').css('text-shadow', '0 0 5px white')


        $('.order_section').effect('slide', 1400)
      
        if (detail_show == true) {
            $(".hide_detail").trigger('click')
        }
        setTimeout(() => {
            $.ajax({
                url: "../php/staff/getStaffOrder.php",
                data: {
                    username: $.cookie('rep_username')
                },
                method: 'POST',
                success: function (result) {
                    $('.order_section').html(result);
                    $('.order_list').hide(0);
                    $('.order_list').effect('slide', 1400)

                    // hide all alert
                    $('.delete_alert, .delete_refuse, .complete_confirm, .complete_refuse').hide(0)
                   

                    $(".hide_order").click(
                        () => {
                            if (detail_show == true) {
                                $(".hide_detail").trigger('click')
                            }
                            $('.staff_navbar .orders').css('font-weight', '100')
                            $('.staff_navbar .orders').css('text-shadow', 'none')
                            $('.order_list').effect('fold', 1400)
                            setTimeout(() => { $('.order_section').effect('fold', 1600) }, 800);   
                        }
                    )
                        
                    $(".hide_detail").click(
                        () => {
                            $('.order_info').effect('drop', 1400)
                            setTimeout(() => { $('.order_detail').effect('fold', 1600) }, 800);   
                            detail_show = false;
                        }
                    )

                    $('.order_list .detail').click((e) => {
                        detail_show = true;
                        $('.order_info').html('');
                        $('.order_detail').stop().effect('slide', 1400)
                        setTimeout(() => {
                            $.ajax({
                                url: "../php/staff/getStaffOrderInfo.php",
                                data: {
                                    order_ID: parseInt($(e.target).siblings('.title').html().substring(4))
                                },
                                method: 'POST',
                                success: function (result) {
                                    $('.order_info').hide(0);
                                    $('.order_info').html(result);
                                    $('.order_info').stop().effect('slide', 1400)
                                },
                                error: function (msg) {alert(msg);}
                            })    
                        }, 1400);
                    })

                    $('.order_list .delete').click((e) => {
                        //alert user for futher confirmation
                        $(e.target).siblings('.delete_alert').slideDown(1400, "easeInOutCubic")
                    })
                    
                    $('.delete_alert .no').click((ev) => {
                        $(ev.target).parent().effect('fold', 1400)
                    })

                    $('.delete_alert .yes').click((e) => {
                        $(e.target).parent().stop().effect('fold', 1400)
                        setTimeout(() => {
                            $.ajax({
                                url: "../php/staff/cancelOrderByRep.php",
                                data: {
                                    order_ID: parseInt($(e.target).parent().siblings('.title').html().substring(4)),
                                    username: $.cookie('rep_username')
                                },
                                method: 'POST',
                                success: function (result) {
                                    if (result.trim() == 'completed') {
                                        $(e.target).parent().siblings('.delete_refuse')
                                        .html("Sorry!<br /> This order has been completed, you can no more delete it.<br /><br /><span class='hide_refuse'>&#x29CB;</span></div>")
                                        $(e.target).parent().siblings('.delete_refuse').stop().slideDown(1400, "easeInOutCubic")
                                    }
                                    if (result.trim() == 'alreadyCancelled') { 
                                        $(e.target).parent().siblings('.delete_refuse')
                                        .html("Sorry!<br /> This order has already been cancelled, you can no more delete it.<br /><br /><span class='hide_refuse'>&#x29CB;</span></div>")
                                        $(e.target).parent().siblings('.delete_refuse').stop().slideDown(1400, "easeInOutCubic")
                                    }
                                    if (result.trim() == 'quotaEnough') { 
                                        $(e.target).parent().siblings('.delete_refuse')
                                        .html("Sorry!<br /> Your current quota is enough to complete this order, you have no privilege to delete it.<br /><br /><span class='hide_refuse'>&#x29CB;</span></div>")
                                        $(e.target).parent().siblings('.delete_refuse').stop().slideDown(1400, "easeInOutCubic")
                                    }
                                    if (result.trim() == 'cancelDone') { 
                                        $(e.target).parent().siblings('.delete_refuse')
                                        .html("Deletion done!<br /> You have deleted the order.<br /><br /><span class='hide_refuse'>&#x29CB;</span></div>")
                                        $(e.target).parent().siblings('.delete_refuse').stop().slideDown(1400, "easeInOutCubic")

                                        // update order list
                                        $(e.target).parent().siblings('.description').html('POST-STATUS: NOT SOLD')
                                        $(e.target).parent().siblings('.title').html("ID: " + parseInt($(e.target).parent().siblings('.title').html().substring(4)) + " &nbsp;STATUS: CANCELLED BY REP")
                                    }
                                    $('.hide_refuse').click((ev2) => {
                                        $(ev2.target).parent().stop().effect('fold', 1400)
                                    })  
                                },
                                error: function (msg) {alert(msg);}
                            })  
                        }, 1400); 
                    })

                    $('.order_list .complete').click((e) => {
                        $.ajax({
                            url: "../php/staff/completeOrder.php",
                            data: {
                                order_ID: parseInt($(e.target).siblings('.title').html().substring(4)),
                                username: $.cookie('rep_username')
                            },
                            method: 'POST',
                            success: function (result) {
                                if (result.trim() == 'completed') {
                                    $(e.target).siblings('.complete_refuse')
                                    .html("Sorry!<br /> This order has already been completed.<br /><br /><span class='hide_refuse'>&#x29CB;</span></div>")
                                    $(e.target).siblings('.complete_refuse').stop().slideDown(1400, "easeInOutCubic")
                                }
                                if (result.trim() == 'alreadyCancelled') { 
                                    $(e.target).siblings('.complete_refuse')
                                    .html("Sorry!<br /> This order has been cancelled.<br /><br /><span class='hide_refuse'>&#x29CB;</span></div>")
                                    $(e.target).siblings('.complete_refuse').stop().slideDown(1400, "easeInOutCubic")
                                }
                                if (result.trim() == 'quotaNotEnough') { 
                                    $(e.target).siblings('.complete_refuse')
                                    .html("Sorry!<br /> Your current quota is not enough to complete this order, please send request to manager.<br /><br /><span class='hide_refuse'>&#x29CB;</span></div>")
                                    $(e.target).siblings('.complete_refuse').stop().slideDown(1400, "easeInOutCubic")
                                }
                                if (result.trim() == 'orderCompleted') { 
                                    $(e.target).siblings('.complete_confirm').stop().slideDown(1400, "easeInOutCubic")

                                    // update order list
                                    $(e.target).siblings('.description').html('POST-STATUS: NORMAL')
                                    $(e.target).siblings('.title').html("ID: " + parseInt($(e.target).siblings('.title').html().substring(4)) + " &nbsp;STATUS: COMPLETED")
                                }

                                $('.hide_refuse, .hide_confirm').click((ev2) => {
                                    $(ev2.target).parent().stop().effect('fold', 1400)
                                })  
                            },
                            error: function (msg) {alert(msg);}
                        })  
                    })

                },
                error: function (msg) {alert(msg);}
            })    
        }, 1400);
        

    })
})