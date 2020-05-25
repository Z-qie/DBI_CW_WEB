$(function () {
    
    $('.commodity_sec .type2').hide(1)
    $('.commodity_sec .type3').hide(1)
    var i = 1;
    function loop () {
        if (i == 1) {
            i = 2;
            $('.commodity_sec .type1').stop().effect('drop', 2000)
            setTimeout(() => {
                $('.commodity_sec .type2').stop().fadeIn(2000)
            }, 1400);
         
        } else if (i == 2) {
            i = 3;
            $('.commodity_sec .type2').stop().effect('drop', 2000)
            setTimeout(() => {
                $('.commodity_sec .type3').stop().fadeIn(2000)
            }, 1400);
           
        } else if (i == 3) {
            i = 1;
            $('.commodity_sec .type3').stop().effect('drop', 2000)
            setTimeout(() => {
                $('.commodity_sec .type1').stop().fadeIn(2000)
            }, 1400);
        }    
    }
    var myVar = setInterval(loop, 4000)

    $('.commodity1').hover(
        () => {
            clearInterval(myVar);
            $('.commodity_sec .type2').hide(1)
            $('.commodity_sec .type3').hide(1)
            $('.commodity_sec .type1').fadeIn(2000)
        },
        () => {
            i = 1
            myVar = setInterval(loop, 4000)
        }
    )
    $('.commodity2').hover(
        () => {
            clearInterval(myVar);
            $('.commodity_sec .type1').hide(1)
            $('.commodity_sec .type3').hide(1)
            $('.commodity_sec .type2').fadeIn(2000)
        },
        () => {
            i = 2
            myVar = setInterval(loop, 4000)
        }
    )
    $('.commodity3').hover(
        () => {
            clearInterval(myVar);
            $('.commodity_sec .type1').hide(1)
            $('.commodity_sec .type2').hide(1)
            $('.commodity_sec .type3').fadeIn(2000)
        },
        () => {
            i = 3
            myVar = setInterval(loop, 4000)
        }
    )
    
})