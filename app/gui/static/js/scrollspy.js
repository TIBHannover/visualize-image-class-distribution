$(document).ready(function () {


    //Checks for the claims data and removes the navButtons if there is none
    let e = [$("#claims_lang_de").children().length, $("#claims_lang_en").children().length, $("#claims_lang_fr").children().length],
        t = [$("#deNav"), $("#enNav"), $("#frNav")];
    for (let r = 0; r < 3; r++) 0 === e[r] && t[r].remove();

    //Main 
    var pa, h;
    pa = document.getElementsByClassName('panel');
    h = document.getElementsByTagName('heading');

    $("#myInput").keyup(function () {
        if (!$(this).val()) {
            $("figure").css("display", "block");
        }
    });
    $(".menuburger").click(function () {
        $(".fix").toggle("400", "swing")
    }),
        $("#myInputDesc").keyup(function () {
            if (!$(this).val()) {
                $(".panel").removeClass("clicked"),
                    $(".panel").css("display", "block"),
                    $(".panel p").css("display", "block"),
                    $("heading").css("display", "block");
                $(".matches").css("display", "none");
            }
        }),
        $(".select-selected")[0].style.borderRadius = "0px";
    $("heading").click(function () {
        $(this).next().slideToggle("fast", "swing"),
            $(".accordion").toggleClass("active");
    }),
        $(".hideAll").click(function () {
            if (!$("#myInputDesc").val()) {
                $(".panel").slideToggle();
                $(".accordion").toggleClass("active");
            } else {
                $(".panel").each(function () {
                    if ($(this).css("display") == "block") {
                        $(this).slideToggle();
                        $(".accordion").toggleClass("active");
                    } else {
                    }
                });
            }
        });
    for (let i = 0; i < pa.length; i++) {
        if (pa[i].lastElementChild == null) {
            pa[i].remove();
            h[i].remove();
        }
    }

}), $("button.legend").click(function () {
    $("#flexBox, legend").toggleClass("shown")
}), $("description").css("width", "60vw"), $("description").resizable({
    handles: "e"
}), $("body").on("click", "#bookmark", function () {
    $("#bookmark").toggleClass("check")
}), $(".photoviewer-button.photoviewer-button-maximize").on("click", function () {

}), $("#close-modal").click(function () {
    $("#legend").hide("fast")
});

// Make the DIV element draggable:
dragElement(document.getElementById("legend"));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }

}

//Here is the scrollspy
var r = $("a.nav-link");
$(document).scroll(function () {
    if ($("#global_nav").css("background-color") == "rgb(53, 9, 41)") {
        r.each(function () {
            var e = $(this).attr("href"),
                t = $(e).offset().top,
                r = t + $(e).outerHeight(),
                n = $(document).scrollTop();
            n < r - 50 && n >= t - 50 ? $(this).addClass("active") : $(this).removeClass("active")
        })
    } else {
        r.each(function () {
            var e = $(this).attr("href"),
                t = $(e).offset().top,
                r = t + $(e).outerHeight(),
                n = $(document).scrollTop();
            n < r - 185 && n >= t - 185 ? $(this).addClass("active") : $(this).removeClass("active")
        })
    }
});

var position = $(window).scrollTop();

/* $("a.nav-link").click(function () {
    targetX = $(this).attr("value");
    targetY = $("#global_nav a.nav-link.active").attr("value");
    if (targetX > targetY) {
        $('html, body').animate({ scrollTop: '+=150px' }, 800);
    } else if (targetX < targetY) {
        $('html, body').animate({ scrollTop: '-=150px' }, 800);
    } else { }
    console.log(targetX);
    console.log(targetY);

}); */

$(window).scroll(function (e) {

    /* Dieser Code kann benutzt werden, wenn der Header beim scrollen eingeklappt werden soll.
      var scroll = $(window).scrollTop();
      if (scroll > position) {
          $(".headerGrid").slideUp("slow"),
              $("imageViewer").css("top", "calc(25vh - 50px)")
          $("section").css("scroll-margin-top", "49px")
      } else {
          $(".headerGrid").slideDown("slow"),
              $("imageViewer").css("top", "194px")
          $("section").css("scroll-margin-top", "184px")
      }
      */
    e.stopPropagation();
    position = scroll;

    var e = $("#section_drawings").offset(),
        r = $("#section_claims").offset(),
        n = $("#section_description").offset();
    $(this).scrollTop() > r.top - 185 && $(this).scrollTop() < e.top - 400 ? $("#nav").fadeIn("slow") : ($(this).scrollTop(), e.top, $("#nav").fadeOut("slow"));
    $(this).scrollTop() > n.top - 185 && $(this).scrollTop() < r.top - 400 ? ($("#navItems").fadeIn("slow"), $("#imageGallery").css("display", "block"), $("#imageGallery").show("slow")) : ($(this).scrollTop(), r.top, $("#navItems").fadeOut("slow"), $("#imageGallery").fadeOut("slow"))
})
//});