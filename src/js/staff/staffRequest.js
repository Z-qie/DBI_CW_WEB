$(() => {
    $('.request_confirm').hide(0)
    $('.request_section').hide(0)

    $('.staff_navbar .request').click(() => {

        $('.staff_navbar .request').css('font-weight', '900')
        $('.staff_navbar .request').css('text-shadow', '0 0 5px white')

        $.ajax({
            url: "../php/staff/staffRequest.php",
            data: {
                username: $.cookie('rep_username')
            },
            method: 'POST',
            success: function (result) {
                $('.request_section').html(result); 
                $('.request_confirm').hide(0)
                $('.request_section').slideDown(1400, "easeInOutCubic");

                $(".hide_request").click(
                    () => {
                        $('.staff_navbar .request').css('font-weight', '100')
                        $('.staff_navbar .request').css('text-shadow', 'none')
                        $('.request_section').effect('blind', 1400)
                })

                $(".quota_quantity input").blur(() => {
                    if (!(/^[0-9]+$/).test($(".quota_quantity input").val())) {
                        alert("Please enter ingeter input as quantity!");
                        $(".quota_quantity input").val(1000);
                    }
                })
                
                $('.request_option').click(() => {
                    $.ajax({
                        url: "../php/staff/sendStaffRequest.php",
                        data: {
                            username: $.cookie('rep_username'),
                            quota_quantity: $(".quota_quantity input").val()
                        },
                        method: 'POST',
                        success: function (result) {
                            $('.request_confirm').html(result)
                            $('.request_confirm').slideDown(1400, "easeInOutCubic")
                            $('.hide_request_confirm').click(() => {
                                $('.request_confirm').effect('blind', 1400)
                            })
                        },
                        error: function (msg) {alert(msg);}        
                    })
                })

            },
            error: function (msg) {alert(msg);}        
        })
        
        


    })



})