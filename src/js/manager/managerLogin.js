$(function () { 
    $('.login').hide(0)
    // update all order status and post status every time a customer/ rep/ manager logging in
    $.ajax({
        url: "../php/updateOrders.php",
        method: 'POST',
        error: function (msg) {alert(msg);}        
    })                


    $(".alert").hide(0);
    $('.login_button').click(() => {
        if ($('.manager_username').val() == 'manager' && $('.manager_password').val() == 'password' ) {
            $.cookie('manager_login', true, {expire: 1})

            $(".alert").slideUp();  
            $(".alert").html('Logging..').slideDown();
            
            setTimeout(() => {
                $(".login_section").slideUp(1400, 'easeInOutCubic')}, 1400);
            setTimeout(() => {
                $(".login").fadeOut(1400, 'easeInOutCubic')}, 1000);
        } else {
            $.cookie('manager_login', false, {expire: 1})
            $(".alert").slideUp();  
            $(".alert")
            .html("Sorry, user name or password incorrect, please kindly check again.<br />Hint: <br />1. User name can only be within 4-16 alphanumeric characters. <br />2. Password can only be within 6-32 alphanumeric characters. ")
            .slideDown();
        }
    })

    // check if logged already, if yes, move to home page.
    if ($.cookie('manager_login') == 'true') {
        $(".login_section").slideUp(1400, 'easeInOutCubic')
        setTimeout(() => {
            $(".login").fadeOut(1400, 'easeInOutCubic')}
        , 1000);
    }
        
    // switch btw login and logout
    $('.navbar .logout').click( () => {
        $.cookie('manager_login', false, {expire: 1})
        
        $(".login_section").slideDown(2000, 'easeInOutCubic');
        setTimeout(() => {
            $(".login").fadeIn(1400, 'easeInOutCubic')
        }, 1400);
    })
})