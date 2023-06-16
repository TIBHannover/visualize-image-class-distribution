var x, i, j, l, ll, selElmnt, a, b, c, sb;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");

    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function (e) {
      /* When an item is clicked, update the original select box,
      and the selected item and update the array in wich the autocomplete looks and
      reset the current query*/
      document.getElementById('myInput').value = '';
      document.getElementById('myInputDesc').value = '';

      $("figure").css("display", "");

      "Figure" == this.innerText ? $("#myInput").autocomplete({
        source: numAuto
      }) : "RefNr" == this.innerText ? $("#myInput").autocomplete({
        source: uniqueNumLst
      }) : "RefName" == this.innerText && $("#myInput").autocomplete({
        source: uniqueTxtLst
      });
      $(".ui-widget").click(function () {
        searchMe();
      });

      "Text" == this.innerText ? $("#myInputDesc").autocomplete({
        source: ""
      }) :
        "Figure" == this.innerText ? $("#myInputDesc").autocomplete({
          source: uniqueFigRefLst
        }) : "RefName" == this.innerText && $("#myInputDesc").autocomplete({
          source: uniqueLegendRefLst
        });
      $("#section_description .ui-widget").click(function () {
        searchMeDesc();
      });

      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function (e) {
    /* When the select box is clicked, close any other select boxes,
    open/close the current select box and toggles the 5px border-radius style: */
    e.stopPropagation();
    closeAllSelect(this);

    this.classList.toggle("toggle")
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active", "toggle");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);

var num_lst, text_lst, num, figure, section, legendRefLst, legendRefTxt, figureImg, select, figRef, figRefLst;

num_lstAuto = [];
text_lstAuto = [];
numAuto = [];
legendRefLst = [];
figRefLst = [];

select = document.getElementsByClassName('select-selected') || "";
legendRefTxt = document.getElementsByTagName('legendref') || "";
figure = document.getElementsByTagName('figure') || "";
section = document.getElementById('draw') || "";
figureImg = section.getElementsByTagName('img') || "";
figRef = document.getElementsByTagName('figref') || "";

for (i = 0; i < figRef.length; i++) {
  figRefLst.push(figRef[i].innerText.toUpperCase().trim());
}

for (i = 0; i < legendRefTxt.length; i++) {
  legendRefLst.push(legendRefTxt[i].innerText.trim());
}

for (e = 0; e < figure.length; e++) {
  figNum = figure[e].getAttribute("num")?.split(',') || '';
  figNumLst = figureImg[e].getAttribute("num_lst")?.split(',') || '';
  figTxtLst = figureImg[e].getAttribute("text_lst")?.split(',') || '';

  for (let num of figNum) {

    numAuto.push(num);
  }

  for (let num of figNumLst) {

    num_lstAuto.push(num);
  }

  for (let num of figTxtLst) {

    text_lstAuto.push(num);
  }

}

var uniqueFigRefLst = [];
$.each(figRefLst, function (i, el) {
  if ($.inArray(el, uniqueFigRefLst) === -1) uniqueFigRefLst.push(el);
});
uniqueFigRefLst.sort();
var uniqueLegendRefLst = [];
$.each(legendRefLst, function (i, el) {
  if ($.inArray(el, uniqueLegendRefLst) === -1) uniqueLegendRefLst.push(el);
});
uniqueLegendRefLst.sort();
var uniqueNumLst = [];
$.each(num_lstAuto, function (i, el) {
  if ($.inArray(el, uniqueNumLst) === -1) uniqueNumLst.push(el);
});
uniqueNumLst.sort(function (a, b) { return a - b });
var uniqueTxtLst = [];
$.each(text_lstAuto, function (i, el) {
  if ($.inArray(el, uniqueTxtLst) === -1) uniqueTxtLst.push(el);
});
uniqueTxtLst.sort();


function searchMe() {
  $("figure").css("display", "none");
  //declare all variables needed
  var reg, filter;
  filter = $('#myInput').val().toUpperCase().trim();
  reg = /\d+/;
  //check for the different cases inside the options
  if (select[1].innerText == "Figure") {
    //loop through all the figures
    $("figure").each(function () {
      let txt = $(this).attr("num").split(",");
      for (let num of txt) {
        num = num.trim();
        if (num.replace(/\D+/, '') == filter || num == filter) {
          $(this).css("display", "block")
        }
      }
    });
  } else if (select[1].innerText == "RefName") {
    $("figure").each(function () {
      let txt = $(this).children("img").attr("text_lst") ? $(this).children("img").attr("text_lst").split(",") : [];
      for (let num of txt) {
        num = num.toUpperCase().trim();
        rnum = num.replace(reg, '');
        if (num == filter || rnum.trim() == filter.trim()) {
          $(this).css("display", "block")
        }
      }

    });
  } else if (select[1].innerText == "RefNr") {
    $("figure").each(function () {
      let txt = $(this).children("img").attr("num_lst") ? $(this).children("img").attr("num_lst").split(",") : [];
      for (let num of txt) {
        num = num.trim();
        if (num == filter) {
          $(this).css("display", "block")
        }
      }

    });
  } else { }
}

$("#section_description .select-selected").click(function () {
  $(".matches").css("display", "none"),
    $(".panel").css("display", ""),
    $("heading").css("display", ""),
    $(".panel p").css("display", "");
});

$(".panel").click(function (e) {
  $(this).removeClass("clicked")
});

//Adding the text of figref or legendref onclick to the searchfield
$("e .addToSearchI").click(function (e) {
  e.stopPropagation();
  //Declaring all variables needed
  var input, target, n, t, s;
  //Getting the input field to enter the legendref and the legendref
  input = document.getElementById('myInputDesc');
  target = $(this).parent().parent()[0].firstChild.nodeValue.trim()
  //Toggle clicked for the parent
  $(this).parent().parent().parent().parent().toggleClass("clicked")
  //Set the inputfield value equal to the target
  input.value = target;
  //Getting the scroll position to enable scrolling to the searchfield
  n = $("#section_description").offset().top
  t = $(this).offset().top
  s = (t - n) + "px";
  $('html, body').animate({ scrollTop: `-=${s}` }, "fast");

  //Checking wether figref or legref is clicked to change the select option accordingly
  if ($(this).parent().parent()[0].nodeName == "LEGENDREF") {
    $(".select-selected")[0].innerText = "RefName"
  } else if ($(this).parent().parent()[0].nodeName == "FIGREF") {
    $(".select-selected")[0].innerText = "Figure"
  }

  //Stopping multiple event triggers and triggering the search
  searchMeDesc();
});

$("#myInputDesc").keypress(function (e) {
  e.stopPropagation();
  if (e.which == 13) {
    searchMeDesc();
  }
});

function countOccurences(string, word) {
  return string.split(word).length - 1;
}

function addToSearchI(e) {
  var input, target, n, s;
  input = document.getElementById('myInputDesc');
  target = e.parentElement.previousElementSibling.innerHTML;
  input.value = target;
  n = $("#section_description").offset().top
  s = (n - 190);
  $(".photoviewer-modal").remove();
  $('html, body').animate({ scrollTop: `${s}` }, "fast");
  $(".select-selected")[0].innerText = "RefName"
  searchMeDesc();
}

$("legendref .addToSearchO").click(function (e) {
  var target, newTarget, localRef;
  target = this.parentElement.parentElement.firstChild.nodeValue;
  console.log(target)
  //target = e.parentElement.previousElementSibling.innerHTML;
  reg = /\d+/;
  newTarget = target.replace(reg, '').trim();
  imgRef.push(newTarget)
  localStorage.setItem("queryRef", imgRef);
  localRef = localStorage.getItem("queryRef", imgRef);
  $("#localRef").text(localRef);
  $('<span class="click-me">X</span>').appendTo('#localRef').click(remove);
});

$("figref .addToSearchO").click(function (e) {
  var imgSrc = $("imageViewer img")[0].src;
  var imgTitle = this.parentElement.parentElement.firstChild.nodeValue;
  getImg.push({ url: imgSrc, name: imgTitle });
  var chacheItemString = JSON.stringify(getImg);
  localStorage.setItem("queryImg", chacheItemString)
  var img = document.createElement('img');
  var div = document.createElement("div");
  div.classList.add('data');
  var closeNode = document.createElement('p');
  closeNode.classList.add("delete-image");
  closeNode.innerHTML = 'x';
  closeNode.setAttribute('id', imgTitle);
  closeNode.setAttribute('onClick', 'deleteImage(this)');
  var textNode = document.createElement('p');
  textNode.innerHTML = imgTitle;
  img.src = imgSrc;
  document.getElementById('localImg').appendChild(div);
  div.appendChild(img);
  div.appendChild(textNode);
  div.appendChild(closeNode);
});

//Search for the description of the document
function searchMeDesc() {
  //set all panels and all panel > ps and headings to hide, remove highlights, show matches
  $(".panel, .panel p, heading").css("display", "none"),
    $(".panel").removeClass("clicked"),
    $("figref, legendref").removeClass("highlight"),
    $(".matches").css("display", "flex");


  //declare all variables needed
  var reg, filter, pa, text, count, numItems;
  filter = $('#myInputDesc').val().toUpperCase().trim();
  pa = $(".panel")
  reg = /\d+/;


  if (select[0].innerText == "Figure") {
    //loop through each panel and show it when it machtes the filter. Further do this for each p inside the panels.
    $("figref").each(function () {
      try {
        let txt = $(this)[0].firstChild.nodeValue.toUpperCase().trim();
        if (txt.toUpperCase().replace(/(?<=\d)[A-Z]/g, '').trim() == filter || txt.toUpperCase() == filter) {
          $(this).parent().css("display", "block"),
            $(this).parent().parent().css("display", "block"),
            $(this).parent().parent(".panel").addClass("clicked"),
            $(this).addClass("highlight"),
            $(this).parent().parent().prev("heading").css("display", "block");
        }
      }
      catch (e) { console.log(e); }

    });
  } else if (select[0].innerText == "RefName") {
    $("legendref").each(function () {
      try {
        let txt = $(this)[0].firstChild.nodeValue.toUpperCase().trim();
        rnum = txt.replace(reg, '').trim();
        if (rnum == filter || txt == filter) {
          $(this).parent().css("display", "block"),
            $(this).parent().parent().css("display", "block"),
            $(this).parent().parent(".panel").addClass("clicked"),
            $(this).addClass("highlight"),
            $(this).parent().parent().prev("heading").css("display", "block");
        }
      }
      catch (e) { console.log(e); }
    });
  } else {
    //loop through each panel and show it when it machtes the filter. Further do this for each p inside the panels.
    $(pa).each(function () {
      let txt = $(this)[0].innerText;
      if (txt.toUpperCase().match(filter)) {
        $(this).css("display", "block"),
          $(this).not($(this).children()).addClass("clicked")
        $(this).prev("heading").css("display", "block")
      }
      pt = $(this).children("p");
      $(pt).each(function () {
        let txt = $(this)[0].innerText;
        //andere Methoden indexOf(filter) > -1
        if (txt.toUpperCase().match(filter)) {
          $(this).css("display", "block");
        }
      });
    });
  }
  //Show the number of matches and the number of panels
  text = $("#desc")[0].innerText.toUpperCase();
  count = countOccurences(text, filter); // 2
  numItems = $('.clicked').length
  $("#panels").text("\xa0" + numItems + "\xa0");
  $("#matches").text("\xa0" + count + "\xa0");
}
