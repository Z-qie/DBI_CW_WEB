$(() => {
    $('.navbar2 .request span').click(() => {
        $.ajax({
            url: "../php/manager/getRequestList.php",
            method: 'POST',
            success: function (result) {
                $('.request_section').html(result)
                $('.request_confrim').hide(0)

                $('.request_section').animate({right: 0}, 1400, 'easeInOutCubic')
                

                $('.grant').click((e) => {
                    $.ajax({
                        url: "../php/manager/handleRequest.php",
                        method: 'POST',
                        data: {                           
                            option: $(e.target).html(),
                            request_ID: parseInt($(e.target).siblings('.description').html().substring(12))
                        },
                        success: function (result) {
                           
                           
                            $(e.target).siblings('.status').css('color', 'white')
                            $(e.target).siblings('.status').css('text-shadow', 'none')

                            if ($(e.target).html() == 'UPDATE') {
                                $(e.target).siblings('.status').html('STATUS: updated')
                            } else if ($(e.target).html() == 'REGRANT') {
                                $(e.target).siblings('.status').html('STATUS: regranted')
                            }
                            
                            $(e.target).siblings('.request_confrim').html("Success!<br />The sale rep request has been granted!<br /><br /><div class='hide_request_confirm'>&#x29CB;</div>")

                            $(e.target).siblings('.request_confrim').slideDown();(1400, 'easeInOutCubic')
                            $(e.target).siblings('.request_confrim').find('.hide_request_confirm').click((ev) => {
                                $(ev.target).parent().effect('fold', 1400)
                            })

                            $(e.target).siblings('.refuse_request').remove()
                            $(e.target).remove()

                        },
                        error: function (msg) {alert(msg);}
                    })
                })

                $('.refuse_request').click((e) => {
                    $.ajax({
                        url: "../php/manager/handleRequest.php",
                        method: 'POST',
                        data: {                           
                            option: $(e.target).html(),
                            request_ID: parseInt($(e.target).siblings('.description').html().substring(12))
                        },
                        success: function (result) {             

                            $(e.target).siblings('.status').css('color', 'white')
                            $(e.target).siblings('.status').css('text-shadow', 'none')
                            $(e.target).siblings('.status').html('STATUS: refused')
                            $(e.target).siblings('.request_confrim').html("Success!<br />The sale rep request has been refused!<br /><br /><div class='hide_request_confirm'>&#x29CB;</div>")

                            $(e.target).siblings('.request_confrim').slideDown();(1400, 'easeInOutCubic')
                            $(e.target).siblings('.request_confrim').find('.hide_request_confirm').click((ev) => {
                                $(ev.target).parent().effect('fold', 1400)
                            })
                            $(e.target).siblings('.grant').remove()
                            $(e.target).remove()
                        },
                        error: function (msg) {alert(msg);}
                    })
                })
                
                $('.hide_request_section').click(() => {
                    $('.request_section').animate({right: '-30%'}, 1400, 'easeInOutCubic')
                })

            }, 
            error: function (msg) {alert(msg);}
        })
    })

})