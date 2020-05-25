$(function () {
    // home page link
    $(".home_button_bg")
        .hover(() => {
            $(".home_button_bg").add(".home_text").stop().animate({left: 0}, 1000, "easeInOutCubic");
            }, () => {
            $(".home_button_bg").stop().animate({left: "-170px"});
            $(".home_text").stop().animate({left: "-30px"}, 500);
            }
        )
        .click(() => {
            // $(".home_button_bg").off();

            $(".register_box, .login_box").stop().animate({top: "-100%"}, 1200, "easeInOutCubic");
            $(".lid").stop().animate({top: "200%"}, 1200, "easeInOutCubic");
            setTimeout(() => {
                $(".home_button_bg").stop().animate({left: "100%"}, 2000, "easeOutCubic");
                $(".home_page").stop().animate({left: 0}, 2000, "easeOutCubic");
            }, 200);
            
            $(".hide_order").hide(1)
            $('.order_section').hide(1)
            $('.order_list').hide(1)
        });
    // staff page link
    $(".staff_entry")
        .hover(() => {
            $(".staff_entry").add(".staff_text").stop().animate({bottom: 0}, 1000, "easeInOutCubic");
            }, () => {
            $(".staff_entry").stop().animate({bottom: "-180px"});
            }
        )
        .click(() => {
            location.href = 'staff.html';
        });
    
    // registration section button
    $(".register_bar").click(() => {
            $(".register_bar").stop().effect("drop", 600);
            $(".register_form").stop().effect("slide", 1200, "easeInOutCubic");
            $(".login_box").stop().animate({width: 0}, 1200, "easeInOutCubic");
            $(".login_form").hide(1000);
            $(".login_bar").stop().animate({right: "-20px"});
           });
    
    // logging in section 
    $(".login_bar").click(() => {
            $(".login_box").stop().animate({width: "450px"}, 1200, "easeInOutCubic");
            $(".login_form").show(1000); 
            $(".login_bar").stop().animate({right: 0});
            $(".register_bar").stop().effect("slide", 600);
            $(".register_form").stop().effect("drop", 600);
            $(".alert").hide();
            $(".register_confirm").hide();  
            });
    
//============================================= register =============================================
    // client-side validation in registration:
    // User name can only be within 4-16 alphanumeric characters.
    // set all kinds of input error sa true.
    $(".alert").hide();
    $(".register_confirm").hide();
    error_register = [true, true, true, true, true, true, true, true, true];

    $(".register_text[name='username']").blur(function () {
        if (!(/^[0-9a-zA-Z]{4,16}$/).test($(this).val())){
            $(".alert").eq(0).show(500);
            error_register[0] = true;
        } else {
            $(".alert").eq(0).hide(500);
            error_register[0] = false;
        }
    })
    // Password can only be within 6-32 alphanumeric characters.
    $(".register_text[name='password']").blur(function () {
        if (!(/^[0-9a-zA-Z]{6,32}$/).test($(this).val())) {
            $(".alert").eq(1).show(500);
            error_register[1] = true;
        } else {
            $(".alert").eq(1).hide(500);
            error_register[1] = false;
        }
    })    
    // First name with 1-45 alphabetic characters only.
    $(".register_text[name='first_name']").blur(function () {
        if (!(/^[a-zA-Z]{1,45}$/).test($(this).val())) {
            $(".alert").eq(2).show(500);
            error_register[2] = true;
        } else {
            $(".alert").eq(2).hide(500);
            error_register[2] = false;
        }
    })    
    // Last name with 1-45 alphabetic characters only.
    $(".register_text[name='last_name']").blur(function () {
        if (!(/^[a-zA-Z]{1,45}$/).test($(this).val())) {
            $(".alert").eq(3).show(500);
            error_register[3] = true;
        } else {
            $(".alert").eq(3).hide(500);
            error_register[3] = false;
        }
    })    
    // Country code with 1-10 numeric characters for telephone number.
    $(".register_text[name='country_code']").blur(function () {
        if (!(/^[0-9]{1,10}$/).test($(this).val())) {
            $(".alert").eq(4).show(500);
            error_register[4] = true;
        } else {
            $(".alert").eq(4).hide(500);
            error_register[4] = false;
        }
    })    
    // Telephone number with 8-30 numeric characters containing area code(if any) and tel number.
    $(".register_text[name='telephone_number']").blur(function () {
        if (!(/^[0-9]{8,30}$/).test($(this).val())) {
            $(".alert").eq(5).show(500);
            error_register[5] = true;
        } else {
            $(".alert").eq(5).hide(500);
            error_register[5] = false;
        }
    })    
    // automatically validated by email input
    $(".register_text[name='email']").blur(function () {
        if (!(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test($(this).val())) {
            $(".alert").eq(6).show(500);
            error_register[6] = true;
        } else {
            $(".alert").eq(6).hide(500);
            error_register[6] = false;
        }
    })    
    // Passport ID can only be within 6-45 alphanumeric characters. 
    $(".register_text[name='passport_ID']").blur(function () {
        if (!(/^[0-9a-zA-Z]{6,45}$/).test($(this).val())) {
            $(".alert").eq(7).show(500);
            error_register[7] = true;
        } else {
            $(".alert").eq(7).hide(500);
            error_register[7] = false;
        }
    })    
    // country selection
    $("#my-select").blur(function () {
        if ($(this).val() == "Null") {
            $(".alert").eq(8).show(500);
            error_register[8] = true;
        } else {
            $(".alert").eq(8).hide(500);
            error_register[8] = false;
        }
    })    

    // implement serve-side validation by ajax.
    var register_input = document.getElementsByClassName("register_text");
    $(".register_button").click(function () {
        // if error, propmt user to fill up all information correctly!
        if ($.inArray(true, error_register) != -1) {
            $(".register_confirm").slideUp();  
            $(".register_confirm").html("Please fill up all information correctly!").slideDown();
        } else { // else, send data to validate.
            $.ajax({
                url: "../php/register.php",
                method: 'POST',
                data: {
                    username: register_input[0].value,
                    password: register_input[1].value,
                    first_name: register_input[2].value,
                    last_name: register_input[3].value,
                    // telephone format as : (xxxxx)xxxxxxxx
                    telephone: '(' + register_input[4].value + ')' + register_input[5].value,
                    email: register_input[6].value,
                    passport_ID: register_input[7].value,
                    country: $("#my-select").val()
                },
                success: function (result) {
                    // prompt confirm msg and refresh all data from input text.
                    $(".register_confirm").slideUp();  
                    $(".register_confirm").html(result).slideDown();
                    $(".register_text").val("");

                    if (result.trim().substring(0, 4) == "Sign") {
                        // if success, jump to log in section automatically.
                        setTimeout(function () {$(".login_bar").trigger( "click" );}, 1500);
                    }
                }, 
                error: function (msg) {
                    // if system error, alert.
                    alert(msg);
                }
            })
        }
    })

//============================================= log in =============================================
$(".login_confirm").hide();
    // implement serve-side validation by ajax.
    var login_input = document.getElementsByClassName("login_text");
    $(".login_button").click(function () {
        // if error, propmt user to fill up all information correctly!
        $.ajax({
            url: "../php/login.php",
            method: 'POST',
            data: {
                username: login_input[0].value,
                password: login_input[1].value,
            },
            success: function (result) {
                if (result.trim() == "Logging..") {
                    // set username cookie
                    $.cookie('username', login_input[0].value, {expire: 1});
                    // set login cookie
                    $.cookie('is_log', true, {expire: 1});
                    $(".login_confirm").slideUp();  
                    $(".login_confirm").html(result).slideDown();
                    $('.nav_option .logout span').html('LOGOUT');
                    $(".welcome").html("<span>WELCOME</span><br /> " + login_input[0].value);
                    setTimeout(function () {
                        $(".home_button_bg").trigger("click"), 
                        $(".login_confirm").slideUp();  }, 1500);
                    
                } else {
                    // set login cookie
                    $.cookie('is_log', false, {expire: 1});
                    // prompt confirm msg and refresh all data from input text if error.
                    $(".login_confirm").slideUp();  
                    $(".login_confirm").html(result).slideDown();
                    $(".login_text").val("");
                }
            },
            error: function (msg) {
                // if system error, alert.
                alert(msg);
            }
        })
    })

    // check if signed in already, if yes, slide to home page.
    if ($.cookie('username') != 'null' && $.cookie('username') != undefined) {
        $(".welcome").html("<span>WELCOME</span><br /> " + $.cookie('username'));
        setTimeout(function () {$(".home_button_bg").trigger( "click" );}, 0);
        $('.nav_option .logout span').html('LOGOUT');
    } else {
        $('.nav_option .logout span').html('LOGIN');
    }

    // switch btw login and logout
    $('.nav_option .logout span').click( () => {
        $(".register_box, .login_box").stop().animate({top: "0"}, 1200, "easeInOutCubic");
        $(".lid").stop().animate({top: "0"}, 1200, "easeInOutCubic");
        setTimeout(() => {
            $(".home_button_bg").stop().animate({left: "-170px"}, 2000, "easeOutCubic");
            $(".home_page").stop().animate({left: "-100%"}, 2000, "easeOutCubic");
        }, 200);

        if ($('.nav_option .logout span').html() == 'LOGOUT') { 
            $.cookie('is_log', false);
            $.cookie('username', null);
            $('.nav_option .logout span').html('LOGIN'); 
            $(".welcome").html("<span>WELCOME</span><br /> Please Log In!");
        }
    })


})