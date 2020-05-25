$(function () {
    $(".register_form > *").val("");
    $(".register_button").val("\u21e0");


    $('.navbar2 .add_rep span').click(() => {
        $('.add_section').animate({right: '0%'}, 1400, 'easeInOutCubic')
    })
    
//============================================= register =============================================
    // client-side validation in registration:
    // User name can only be within 4-16 alphanumeric characters.
    // set all kinds of input error sa true.
    $(".alerts *").hide(0);
    $(".register_confirm").hide(0);
    error_register = [true, true, true, true, true, true, true, true, true];

    $(".a_username").blur(function () {
        if (!(/^[0-9a-zA-Z]{4,16}$/).test($(this).val())){
            $(".alert_username").slideDown(1400);
            error_register[0] = true;
        } else {
            $(".alert_username").slideUp(1400);
            error_register[0] = false;
        }
     })
    // Password can only be within 6-32 alphanumeric characters.
    $(".a_password").blur(function () {
        if (!(/^[0-9a-zA-Z]{6,32}$/).test($(this).val())) {
            $(".alert_password").slideDown(1400);
            error_register[1] = true;
        } else {
            $(".alert_password").slideUp(1400);
            error_register[1] = false;
        }
    })    
    // First name with 1-45 alphabetic characters only.
    $(".a_first_name").blur(function () {
        if (!(/^[a-zA-Z]{1,45}$/).test($(this).val())) {
            $(".alert_first_name").slideDown(1400);
            error_register[2] = true;
        } else {
            $(".alert_first_name").slideUp(1400);
            error_register[2] = false;
        }
    })    
    // Last name with 1-45 alphabetic characters only.
    $(".a_last_name").blur(function () {
        if (!(/^[a-zA-Z]{1,45}$/).test($(this).val())) {
            $(".alert_last_name").slideDown(1400);
            error_register[3] = true;
        } else {
            $(".alert_last_name").slideUp(1400);
            error_register[3] = false;
        }
    })    
    // Country code with 1-10 numeric characters for telephone number.
    $(".a_country_code").blur(function () {
        if (!(/^[0-9]{1,10}$/).test($(this).val())) {
            $(".alert_country_code").slideDown(1400);
            error_register[4] = true;
        } else {
            $(".alert_country_code").slideUp(1400);
            error_register[4] = false;
        }
    })    
    // Telephone number with 8-30 numeric characters containing area code(if any) and tel number.
    $(".a_telephone_number").blur(function () {
        if (!(/^[0-9]{8,30}$/).test($(this).val())) {
            $(".alert_telephone_number").slideDown(1400);
            error_register[5] = true;
        } else {
            $(".alert_telephone_number").slideUp(1400);
            error_register[5] = false;
        }
    })    
    // automatically validated by email input
    $(".a_email").blur(function () {
        if (!(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test($(this).val())) {
            $(".alert_email").slideDown(1400);
            error_register[6] = true;
        } else {
            $(".alert_email").slideUp(1400);
            error_register[6] = false;
        }
    })    
    //  Initial quota must be non-positive integer.
    $(".a_quota").blur(function () {
        if (!(/^[0-9]{1,10}$/).test($(this).val())) {
            $(".alert_quota").slideDown(1400);
            error_register[7] = true;
        } else {
            $(".alert_quota").slideUp(1400);
            error_register[7] = false;
        }
    })    
    // country selection
    $('#add_country_selecting').change(function () {
        if ($('#add_country_selecting').val() == '') {
            $(".alert_country").slideDown(1400);
            error_register[8] = true;
        } else {
            $(".alert_country").slideUp(1400);
            error_register[8] = false;
        }
    })    
    
    // implement serve-side validation by ajax.
    $(".register_button").click(function () {
        // if error, propmt user to fill up all information correctly!
        if ($.inArray(true, error_register) != -1) {
            $(".register_confirm").slideUp();  
            $(".register_confirm").html("Please fill up all information correctly!").slideDown();
        } else { // else, send data to validate.
            $.ajax({
                url: "../php/manager/AddNewRep.php",
                method: 'POST',
                data: {
                    username: $('.a_username').val(),
                    password: $('.a_password').val(),
                    first_name: $('.a_first_name').val(),
                    last_name: $('.a_last_name').val(),
                    // telephone format as : (xxxxx)xxxxxxxx
                    telephone: '(' + $('.a_country_code').val() + ')' + $('.a_telephone_number').val(),
                    email: $('.a_email').val(),
                    quota: $('.a_quota').val(),
                    country: $('#add_country_selecting').val(),
                },
                success: function (result) {

                     // prompt confirm msg and refresh all data from input text.
                     $(".register_confirm").slideUp();  
                     $(".register_confirm").html(result).slideDown();
                     $(".register_form > *").val("");
                     $(".register_button").val("\u21e0");
 
                }, 
                error: function (msg) {
                    // if system error, alert.
                    alert(msg);
                }
            })
        }
    })


    $('.hide_add_section').click(() => {
        $('.add_section').animate({right: '-30%'}, 1400, 'easeInOutCubic')
    })


})