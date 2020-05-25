$(function () {
    { // button design:
        // option section (black nav bar) ----------------------------------------------------------------------------------------
        $(".nav_option .logo").hover(
            () => {
                $(".nav_option .logo").stop().animate({backgroundColor: jQuery.Color( "rgb(255, 253, 248)" )}, 250)
                $(".nav_option .logo > span").stop().animate({color: "rgb(12, 12, 12)"}, 250) 
                $(".nav_option .logo > span").css("text-decoration", "line-through")
            },
            () => {
                $(".nav_option .logo").stop().animate({backgroundColor: jQuery.Color( "rgb(12, 12, 12)" )}, 250)
                $(".nav_option .logo > span").stop().animate({color: "rgb(255, 253, 248)"}, 250) 
                $(".nav_option .logo > span").css("text-decoration", "none")
            }
        )

        $(".nav_option .orders").hover(
            () => {
                $(".nav_option .orders").stop().animate({backgroundColor: jQuery.Color( "rgb(255, 253, 248)" )}, 250)
                $(".nav_option .orders > span").stop().animate({color: "rgb(12, 12, 12)"}, 250) 
                $(".nav_option .orders > span").css("text-decoration", "line-through")
            },
            () => {
                $(".nav_option .orders").stop().animate({backgroundColor: jQuery.Color( "rgb(12, 12, 12)" )}, 250)
                $(".nav_option .orders > span").stop().animate({color: "rgb(255, 253, 248)"}, 250) 
                $(".nav_option .orders > span").css("text-decoration", "none")
            }
        )

        $(".nav_option .account").hover(
            () => {
                $(".nav_option .account").stop().animate({backgroundColor: jQuery.Color( "rgb(255, 253, 248)" )}, 250)
                $(".nav_option .account > span").stop().animate({color: "rgb(12, 12, 12)"}, 250) 
                $(".nav_option .account > span").css("text-decoration", "line-through")
            },
            () => {
                $(".nav_option .account").stop().animate({backgroundColor: jQuery.Color( "rgb(12, 12, 12)" )}, 250)
                $(".nav_option .account > span").stop().animate({color: "rgb(255, 253, 248)"}, 250) 
                $(".nav_option .account > span").css("text-decoration", "none")
            }
        )

        $(".nav_option .logout").hover(
            () => {
                $(".nav_option .logout").stop().animate({backgroundColor: jQuery.Color( "rgb(255, 253, 248)" )}, 250)
                $(".nav_option .logout > span").stop().animate({color: "rgb(12, 12, 12)"}, 250) 
                $(".nav_option .logout > span").css("text-decoration", "line-through")
            },
            () => {
                $(".nav_option .logout").stop().animate({backgroundColor: jQuery.Color( "rgb(12, 12, 12)" )}, 250)
                $(".nav_option .logout > span").stop().animate({color: "rgb(255, 253, 248)"}, 250) 
                $(".nav_option .logout > span").css("text-decoration", "none")
            }
        )
    }
    {// option section (white nav bar) ----------------------------------------------------------------------------------------
        $(".commodity .commodity1").hover(
            () => {
                $(".commodity .commodity1 > span").stop().animate({backgroundColor: jQuery.Color( "rgb(139, 0, 0)" )}, 250) 
                $(".commodity .commodity1 > span").css("text-decoration", "line-through")
                $(".commodity .commodity1 > span").css("color", "white")
            },
            () => {
                $(".commodity .commodity1 > span").stop().animate({backgroundColor: jQuery.Color( "transparent" )}, 250) 
                $(".commodity .commodity1 > span").css("text-decoration", "none")
                $(".commodity .commodity1 > span").css("color", "rgb(12, 12, 12)")
            }
        )

        $(".commodity .commodity2").hover(
            () => {
                $(".commodity .commodity2 > span").stop().animate({backgroundColor: jQuery.Color( "rgb(139, 0, 0)" )}, 250) 
                $(".commodity .commodity2 > span").css("text-decoration", "line-through")
                $(".commodity .commodity2 > span").css("color", "white")
            },
            () => {
                $(".commodity .commodity2 > span").stop().animate({backgroundColor: jQuery.Color( "transparent" )}, 250) 
                $(".commodity .commodity2 > span").css("text-decoration", "none")
                $(".commodity .commodity2 > span").css("color", "rgb(12, 12, 12)")
            }
        )

        $(".commodity .commodity3").hover(
            () => {
                $(".commodity .commodity3 > span").stop().animate({backgroundColor: jQuery.Color( "rgb(139, 0, 0)" )}, 250) 
                $(".commodity .commodity3 > span").css("text-decoration", "line-through")
                $(".commodity .commodity3 > span").css("color", "white")
            },
            () => {
                $(".commodity .commodity3 > span").stop().animate({backgroundColor: jQuery.Color( "transparent" )}, 250) 
                $(".commodity .commodity3 > span").css("text-decoration", "none")
                $(".commodity .commodity3 > span").css("color", "rgb(12, 12, 12)")
            }
        )
    }
  
})