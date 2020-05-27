$(function () {
      {// purchase section ----------------------------------------------------------------------------------------
        $(".purchase_hover").stop().animate({width: 0}, 1000, "easeInOutCubic")
        
        $(".cart .purchase_bar").hover(
            () => {
                $(".cart .purchase_bar > span").css("text-decoration", "line-through")
                $(".purchase_hover").stop().animate({width: "100%"}, 1000, "easeInOutCubic")
            },
            () => {
                $(".cart .purchase_bar > span").css("text-decoration", "none"),
                $(".purchase_hover").stop().animate({width: 0}, 1000, "easeInOutCubic")
            }
        )
        .click(
            () => {
                $('.cart_item .total span').html('TOTAL: $' + 
                (+$('.item_price1').html().substring(1) * +$(".item_button1 input").val()
                + +$('.item_price2').html().substring(1) * +$(".item_button2 input").val()
                + +$('.item_price3').html().substring(1) * +$(".item_button3 input").val()
                ).toFixed(2))

                $(".cart").stop().animate({bottom: 0}, 1400, "easeInOutCubic");
                $(".appoint").stop().animate({bottom: 0}, 1400, "easeInOutCubic");
                $(".confirmation").stop().animate({bottom: 0}, 1400, "easeInOutCubic");
                $(".hide_cart").show();
            }
        )
        $(".hide_cart").hide(1);
        $(".hide_cart").click(
            () => {
                $('.confirm_select').stop().animate({bottom: '-9%'}, 800) 
                $(".appoint").stop().animate({right: 0}, 1000, "easeInOutCubic");
                setTimeout(() => {
                    $(".cart").stop().animate({bottom: "-72%"}, 1000, "easeInOutCubic");
                    $(".appoint").stop().animate({bottom: "-72%"}, 1000, "easeInOutCubic");
                }, 800);
                $('.select_rep, .rep_info').hide(1);
                $(".hide_cart").hide(2000);
            }
        )

        $(".cart_item .total div").hover(
            () => {
                $(".cart_item .total div").stop().animate({backgroundColor: jQuery.Color( "rgb(139, 0, 0)" )}, 250)
                $(".cart_item .total div").css("text-decoration", "line-through")
            },
            () => {
                $(".cart_item .total div").stop().animate({backgroundColor: jQuery.Color( "transparent" )}, 250)
                $(".cart_item .total div").css("text-decoration", "none")
            }
        )
    }

    {//button 1
    $(".item_button1 span:first-child").click(() => {
        if (+$(".item_button1 input").val() > 0 ) {
            $(".item_button1 input").val($(".item_button1 input").val() - 1);
        }   
    })   
    $(".item_button1 span:last-child").click(() => {
        $(".item_button1 input").val(+$(".item_button1 input").val() + 1);
    })   
    $(".item_button1 input").blur(() => {
        if (!(/^[0-9]+$/).test($(".item_button1 input").val())) {
            alert("Please enter ingeter input as quantity!");
            $(".item_button1 input").val(0);
        }
    })
    //button 2
    $(".item_button2 span:first-child").click(() => {
        if (+$(".item_button2 input").val() > 0 ) {
            $(".item_button2 input").val($(".item_button2 input").val() - 1);
        }   
    })   
    $(".item_button2 span:last-child").click(() => {
        $(".item_button2 input").val(+$(".item_button2 input").val() + 1);
    })   
    $(".item_button2 input").blur(() => {
        if (!(/^[0-9]+$/).test($(".item_button2 input").val())) {
            alert("Please enter ingeter input as quantity!");
            $(".item_button2 input").val(0);
        }
    })

    //button 3
    $(".item_button3 span:first-child").click(() => {
        if (+$(".item_button3 input").val() > 0 ) {
            $(".item_button3 input").val($(".item_button3 input").val() - 1);
        }   
    })   
    $(".item_button3 span:last-child").click(() => {
        $(".item_button3 input").val(+$(".item_button3 input").val() + 1);
    })   
    $(".item_button3 input").blur(() => {
        if (!(/^[0-9]+$/).test($(".item_button3 input").val())) {
            alert("Please enter ingeter input as quantity!");
            $(".item_button3 input").val(0);
        }     
    })}

    // sync all current mask unit price from database.
    $.ajax ({
        url: "../php/unitPrice.php",
        method: 'POST',
        success: function (result) {
            var unit_price = result.trim().split(' ');
            $('.item_price1').html('$' + unit_price[0]);
            $('.item_price2').html('$' + unit_price[1]);
            $('.item_price3').html('$' + unit_price[2]);   
        }, 
        error: function (msg) {alert(msg);}
    })

    // automatically calculating in purchase cart section.
    // 1. when text change by typing in
    $(".cart_item input").change(() => {
        $('.cart_item .total span').html('TOTAL: $' + 
            (+$('.item_price1').html().substring(1) * +$(".item_button1 input").val()
            + +$('.item_price2').html().substring(1) * +$(".item_button2 input").val()
            + +$('.item_price3').html().substring(1) * +$(".item_button3 input").val()
            ).toFixed(2)
        )
    })
    // 2. when text change by clicking '+' / '-' button.
    $(".cart_item").click(() => {
        $('.cart_item .total span').html('TOTAL: $' + 
            (+$('.item_price1').html().substring(1) * +$(".item_button1 input").val()
            + +$('.item_price2').html().substring(1) * +$(".item_button2 input").val()
            + +$('.item_price3').html().substring(1) * +$(".item_button3 input").val()
            ).toFixed(2)
        )
    })


    
})