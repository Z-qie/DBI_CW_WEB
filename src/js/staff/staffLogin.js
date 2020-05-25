$(function () { 

    // update all order status and post status every time a customer/ rep/ manager logging in
    $.ajax({
        url: "../php/updateOrders.php",
        method: 'POST',
        error: function (msg) {alert(msg);}        
    })                
    
    $(".alert").hide(0);
    $('.login_button').click(() => {
        $.ajax({
            url: "../php/staff/staffLogin.php",
            method: 'POST',
            data: {
                username: $('.rep_username').val(),
                password: $('.rep_password').val()
            },
            success: function (result) {
                if (result.trim() == "Logging..") {
                    // set username cookie
                    $.cookie('rep_username', $('.rep_username').val(), {expire: 1});

                    $(".alert").slideUp();  
                    $(".alert").html(result).slideDown();
                    
                    setTimeout(() => {
                        $(".login_section").slideUp(1400, 'easeInOutCubic');}, 1400);
                    setTimeout(() => {
                        $(".login").fadeOut(1400, 'easeInOutCubic');}, 1000);
                } else {
                    // set login cookie
                    $.cookie('rep_username', null, {expire: 1});
                    // prompt confirm msg and refresh all data from input text if error.
                    $(".alert").slideUp();  
                    $(".alert").html(result).slideDown();
                }
            },
            error: function (msg) {
                // if system error, alert.
                alert(msg);
            }
        })
    })

    // check if logged already, if yes, move to home page.
    if ($.cookie('rep_username') != 'null' && $.cookie('rep_username') != undefined) {
        $(".login_section").slideUp(1400, 'easeInOutCubic');
        setTimeout(() => {
            $(".login").fadeOut(1400, 'easeInOutCubic');}
        , 1000);
    }
        
    // switch btw login and logout
    $('.staff_navbar .logout').click( () => {
        $.cookie('rep_username', null, {expire: 1});
        
        $(".login_section").slideDown(2000, 'easeInOutCubic');
        setTimeout(() => {
            $(".login").fadeIn(1400, 'easeInOutCubic');}, 1400);
        setTimeout(() => {
            $('.request_confirm').hide(0)
            $('.request_section').hide(0)
            $('.order_section').hide(0)
            $('.order_detail').hide(0)
            $('.staff_navbar .orders').css('font-weight', '100')
            $('.staff_navbar .orders').css('text-shadow', 'none')
            $('.staff_navbar .request').css('font-weight', '100')
            $('.staff_navbar .request').css('text-shadow', 'none')
        }, 3000)
    
    })
})