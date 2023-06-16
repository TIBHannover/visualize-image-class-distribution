$(document).ready(function () {

  $('#select-all-checkbox').click(function (event) {
    if (this.checked) {
      $('.select-result').prop('checked', true);
    } else {
      $('.select-result').prop('checked', false);
    }
  });

  setRowNumbering();

  $("body").on("click", ".register-btn", function (event) {
    $("#register-modal").addClass("show");
  });

  $("body").on("click", ".close", function (event) {
    $("#register-modal").removeClass("show");
  })

  $("body").on("click", ".register-dialog-btn", function (event) {
    $("#register-modal").removeClass("show");
  })
  sortGridRel();

  $("#ibtn").click(function () {
    $("#ifilter").toggle("400", "swing");
    $("#ibtn").toggleClass("select-arrow-active");
    $("#ibtn").toggleClass("active");
  });

  $("#gfbtn").click(function () {
    $("#generalFilter").toggle("400", "swing");
    $("#gfbtn").toggleClass("select-arrow-active");
    $("#gfbtn").toggleClass("active");
  });

  $(".menuburger").click(function () {
    $(".fix").toggle("400", "swing")
  }),
    //$(".gridItem").attr('data-gallery', 'photoviewer');

    $("button.search").click(function () {
      window.location.href = window.location.origin + window.location.pathname + "/get_search_ui?name=test_user1";
    })

  $("button.grid").click(function () {
    $(".resultsGrid").show()
    $(".resultsList").hide()
  })

  $("button.list").click(function () {
    $(".resultsGrid").hide()
    $(".resultsList").show()
  })

  $("#savelist").click(function () {
    tableToCSV();
  });

  var i = 0;
  $(".loadButton").mouseenter(function () {
    i++
    var rotate = "rotate(" + i * 360 + "deg)"
    $(".loadButton svg").css("transform", `${rotate}`);

  })
  checkIfLoggedIn();

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
        document.getElementById('myInputResult').value = '';

        "Figure" == this.innerText ? $("#myInputResult").autocomplete({
          source: numAuto
        }) : "RefNr" == this.innerText ? $("#myInputResult").autocomplete({
          source: uniqueNumLst
        }) : "RefName" == this.innerText && $("#myInputResult").autocomplete({
          source: uniqueTxtLst
        });
        $(".ui-widget").click(function () {
          searchList();
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


});

function searchInList() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('filterSearchCountry');
  filter = input.value.toUpperCase();
  ul = document.getElementById("filtercountry");
  li = ul.getElementsByTagName('a');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("label")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

function register() {
  var inputUsername = document.getElementById("username");
  localStorage.setItem("username", inputUsername.value);
  localStorage.setItem("loggedin", 1);
  checkIfLoggedIn();
  console.log("registered");
}

function checkIfLoggedIn() {
  var username = localStorage.getItem("username");
  var loggedin = localStorage.getItem("loggedin");
  if (username != null && loggedin == 1) {
    $("#login-dropdown").addClass("hide-dropdown");
    $("#login-dropdown").removeClass("dropdown");
    $("#user-settings-dropdown").addClass("dropdown");
    $("#user-settings-dropdown").removeClass("hide-dropdown");
    $("#user-settings-dropdown-button").text(username);
    console.log(username);
  }
}

function login() {
  var inputUsernameLogin = document.getElementById("username-login");
  console.log("logged in");
  if (localStorage.getItem("username") == inputUsernameLogin.value) {
    localStorage.setItem("loggedin", 1);
    checkIfLoggedIn();
  }
}

function logout() {
  localStorage.setItem("loggedin", 0);
  $("#user-settings-dropdown").removeClass("dropdown");
  $("#user-settings-dropdown").addClass("hide-dropdown");
  $("#login-dropdown").removeClass("hide-dropdown");
  $("#login-dropdown").addClass("dropdown");
  $("#user-settings-dropdown-button").text(username);
}

function setRowNumbering() {
  var i = 1;
  $('tbody').children().each(function () {
    $(this).children().first().text(i + ".");
    i++;
  })
}

function setGridNumbering() {
  var i = 1;
  $(".resultsGrid").children().each(function () {
    $(this).children().children().first().text(i + ".");
    i++;
  })
}

function countResults() {

  showResults(0);
}

function nextResults() {
  currentpage = localStorage.getItem("currentResultPage");
  console.log(currentpage)
  if (currentpage == nrofpages) {
    return;
  }
  else {
    newcurrentpage = (parseInt(currentpage)) * 10
    console.log(newcurrentpage)
    showResults(newcurrentpage);
  }

}

// nr of pages (10 items per page)
var nrofpages;

var imagesArray = new Array();
var scoresArray = new Array();

// fill the result list
function showResults(min) {
  //document.getElementById("showResultNumb").innerHTML = document.getElementById("showResultNumb").innerHTML + document.querySelectorAll('tbody > tr ').length;
  //table view
  tablebody = document.getElementById("resultstablebody")
  tablebody.replaceChildren();
  //imagegrid view
  imagegridbody = document.getElementById("image_results_grid")
  imagegridbody.replaceChildren();

  if (localStorage) {
    // Store data
    // Retrieve data
    //    item = document.getElementById("result0");
    nrofresults = localStorage.getItem("nrofresults");

    console.log("nrofresults:" + nrofresults)

    // last page maybe has less than 10
    resultsonlastpage = nrofresults % 10;
    nrofpages = (nrofresults - resultsonlastpage) / 10;
    if (resultsonlastpage > 0) {
      nrofpages += 1;
    }

    console.log("nrofpages:" + nrofpages)
    currentpage = min / 10 + 1
    localStorage.setItem("currentResultPage", currentpage)
    document.getElementById("resultpage" + currentpage).classList.remove("hide-navigation-item");

    // navigation on bottom
    for (j = 1; j <= nrofpages; j++) {
      document.getElementById("resultpage" + j).classList.remove("hide-navigation-item");
      if (j != currentpage) {
        document.getElementById("resultpage" + j).classList.remove("selected");
      }
      else {
        document.getElementById("resultpage" + j).classList.add("selected");
      }

    }
    if (nrofpages > 1) {
      document.getElementById("resultpagenext").classList.remove("hide-navigation-item");
    }

    document.getElementById("showResultNumb").innerHTML = nrofresults;
    if (nrofresults > 10) {
      max = min + 10;
      // last page
      if (min == (nrofpages - 1) * 10) {
        max = min + resultsonlastpage;
      }

    }
    else //only one page
    {
      max = nrofresults;
    }

    previewdiv = document.getElementById("collapsePreview");
    //Schleife ueber Ergebnisliste
    for (var i = min; i < max; ++i) {
      //Erzeugen der Spalten für eine Zeile in der Listenansicht
      var row = document.createElement("tr");
      //Spalte 1
      col = document.createElement("td");
      col.setAttribute("class", "colNumber");
      col.innerHTML = i + 1;
      row.appendChild(col);

      //Spalte 2
      //<td><input type="checkbox" class=""></td>
      col = document.createElement("td");
      //col.setAttribute("class", "colNumber");
      inp = document.createElement("input");
      inp.setAttribute("type", "checkbox");
      inp.setAttribute("class", "select-result");
      col.appendChild(inp);

      row.appendChild(col);

      //Spalte 3
      //<td class="colRel">99%</td>
      col = document.createElement("td");
      col.setAttribute("class", "colRel");
      col.setAttribute("id", "similarity" + i);
      col.innerHTML = "";

      row.appendChild(col);

      //Spalte 4
      //<td id="result0" class="colPubNr"><a href="einzelansicht.html">18395602938597604</a></td>
      col = document.createElement("td");
      col.setAttribute("class", "colPubNr");
      col.setAttribute("id", "result" + i);

      row.appendChild(col);

      //Spalte 5
      //<td id="title0" class="colTitle"> <a href="einzelansicht.html">VERTICAL SHAFT WINDMILL</a></td>
      col = document.createElement("td");
      col.setAttribute("class", "colTitle");
      col.setAttribute("id", "title" + i);

      row.appendChild(col);

      //Spalte 6
      //<td id="pubdate0" class="colYear">2012</td>
      col = document.createElement("td");
      col.setAttribute("class", "colYear");
      col.setAttribute("id", "pubdate" + i);

      row.appendChild(col);

      //Spalte 7
      //<td id="inventor0" class="colInventor">SUGISAKI KEN [JP]</td>
      col = document.createElement("td");
      col.setAttribute("class", "colInventor");
      col.setAttribute("id", "inventor" + i);

      row.appendChild(col);

      //Spalte 8
      //<td id="mainpicture0" class="colPic"><img class="resultTableDrawing" onclick="largeImgOpen(this.src)" src="images/windmill-part.png" alt="first drawing windmill patent"></td>
      col = document.createElement("td");
      col.setAttribute("class", "colPic");
      col.setAttribute("id", "mainpicture" + i);

      row.appendChild(col);

      //Einfuegen der Zeile in die Liste (Tabelle)
      tablebody.appendChild(row);

      //Fuellen der Tabelle
      item = document.getElementById("result" + i);
      //hier link zusammenbauen
      var ali = document.createElement('a')
      var patentlink = localStorage.getItem("link" + i);

      //TODO
      patentid = localStorage.getItem("result" + i)

      // console.log(localStorage.getItem("result" + i))
      //console.log(patentlink);

      ali.setAttribute('href', patentlink);
      ali.setAttribute('target', "_blank");
      // Create the text node for anchor element.
      var linktext = document.createTextNode(patentid);

      // Append the text node to anchor element.
      ali.appendChild(linktext);

      // Set the title.
      ali.title = localStorage.getItem("result" + i);
      //ali.appendChild(item);
      item.innerHTML = ""
      item.appendChild(ali)
      item.nextElementSibling.innerHTML = localStorage.getItem("doctitle" + i);

      //item.innerHTML = ali; //localStorage.getItem("result" + i);

      item = document.getElementById("title" + i);
      //item.innerHTML = ""
      item.innerHTML = localStorage.getItem("title" + i);

      item = document.getElementById("similarity" + i);
      //item.innerHTML = ""
      item.innerHTML = localStorage.getItem("similarity" + i);

      if (item.textContent == "0.00%") {
        item.textContent = ""
      }

      item = document.getElementById("pubdate" + i);
      //item.innerHTML = ""
      item.innerHTML = localStorage.getItem("pubdate" + i);

      item = document.getElementById("inventor" + i);
      //item.innerHTML = ""
      item.innerHTML = localStorage.getItem("inventor" + i);

      item = document.getElementById("mainpicture" + i);
      item.innerHTML = ""
      //item.innerHTML = localStorage.getItem("mainpicture" + i);

      //! "/static/PATENTS" refers to the temporary symlink in /static, but we have already defined a route in flask
      imagepath = "/static/PATENTS/"

      // patentpath = patentlink.replace("/index.html", "/")

      try {
        var mimg = imagepath + localStorage.getItem("mainpicture" + i).replace("./", "")
        var mainimage = document.createElement('img')
        //TODO

        //mainimage.setAttribute('src', imagepath + "/" + mimg);

        ///////////// Added by Junaid for deployment : works with all images for whole data///////////////////

        mainimage.setAttribute('src', document.getElementById("serverUrlBase").value + mimg);
        mainimage.setAttribute("index", i);
        //////////////////////////////////////////////////////////////////////////////////////////////////////

        // mainimage.setAttribute('height', '100');
        //<td id="mainpicture0" class="colPic"><img class="resultTableDrawing" onclick="largeImgOpen(this.src)" src="images/windmill-part.png" alt="first drawing windmill patent"></td>
        //mainimage.setAttribute('onclick', 'largeImgOpen(this.src)');
        var imgview = document.createElement('figure');
        imgview.setAttribute("data-gallery", "photoviewer")

        imgview.appendChild(mainimage)
        // <figure data-gallery="photoviewer" id="f0001" num="1"></figure>
        item.appendChild(imgview)
      }
      catch (TypeError) {
        console.log("kein mainimage bei " + i);
      }
      //list end

      //***************************************************************** */


      //Erzeugen der divs für eine Bildanzeige in der Gridansicht
      //<div class="gridItem" data-score="82">
      var divelement = document.createElement("div");
      // divelement.setAttribute("class", "gridItem");
      divelement.setAttribute("class", "card text-center");
      divelement.setAttribute("data-score", "82");
      divelement.setAttribute("style", "max-width: 24rem;");


      //<first><number></number><input type="checkbox" class="select-result"></first>
      var headerelement = document.createElement("div");
      headerelement.setAttribute("class", "card-header")



      inpdiv = document.createElement("div");
      inpdiv.setAttribute("class", "form-check");
      inp = document.createElement("input");
      inp.setAttribute("class", "form-check-input");
      inp.setAttribute("type", "checkbox");
      inp.setAttribute("value", "");
      inp.setAttribute("id", "id_" + patentid);
      inpdiv.appendChild(inp)

      inplabel = document.createElement("label");
      inplabel.setAttribute("class", "h5 form-check-label");
      inplabel.setAttribute("for", "flexCheckDefault");

      inplabel.appendChild(ali.cloneNode(true))
      inpdiv.appendChild(inplabel)

      headerelement.appendChild(inpdiv);

      var footerelement = document.createElement("div");
      footerelement.setAttribute("class", "card-footer text-muted")
      footersymbols = document.createElement("div");
      footerelement.appendChild(footersymbols);
      moreimages = document.createElement("i");
      moreimages.setAttribute("class", "bi bi-images");
      moreimages.setAttribute("onclick", "showMoreimages(" + i + ")");

      footersymbols.appendChild(moreimages);

      //  firstelement.appendChild(ali.cloneNode(true))

      // var numberelement = document.createElement("number");
      // firstelement.appendChild(numberelement);

      divelement.appendChild(headerelement);


      bodyelement = document.createElement("div");
      bodyelement.setAttribute("class", "card-body");

      //<relevance>82%</relevance>
      var relevanceelement = document.createElement("relevance");

      relevanceelement.innerHTML = localStorage.getItem("similarity" + i);
      // console.log(relevanceelement.textContent)
      if (relevanceelement.textContent == "0.00%") {
        relevanceelement.textContent = ""

      }
      relevanceelement.setAttribute("class", "relevance-text");
      headerelement.appendChild(relevanceelement);

      titleelement = document.createElement("p");
      titleelement.setAttribute("class", "card-text");
      titleelement.innerHTML = localStorage.getItem("title" + i);
      bodyelement.appendChild(titleelement);


      //<fig data-gallery='photoviewer' num="">
      var figelement = document.createElement("figure");
      figelement.setAttribute("data-gallery", "photoviewer");
      figelement.setAttribute("num", "");


      //<img text_lst="asasas" src="../images/imgf0024.png">
      var imgelement = document.createElement("img");
      imgelement.setAttribute("class", "card-img-top");
      imgelement.setAttribute("index", i);

      imgelement.setAttribute("text_lst", "Referencen nicht gefunden");
      //imgelement.setAttribute("src", imagepath + "/" + mimg);

      //////////// Added by Junaid for deployment : works with all images for whole data///////////////////
      imgelement.setAttribute('src', document.getElementById("serverUrlBase").value + mimg);
      //////////////////////////////////////////////////////////////////////////////////////////////////////

      figelement.appendChild(imgelement)
      // figelement.appendChild(imgelement);
      divelement.appendChild(figelement);

      //abstract
      var abstractelement = document.createElement("abstract");
      abstractelement.innerHTML = "";

      bodyelement.appendChild(abstractelement);
      divelement.appendChild(bodyelement);
      imagegridbody.appendChild(divelement);

      divelement.appendChild(footerelement);

      // images score list
      imgscorelist = document.createElement("div");
      imgscorelist.setAttribute("id", "imageswithscore" + i);
      imgscorelist.setAttribute("class", "imagepreviewdiv");
      // imgelement.setAttribute("index", i);
      // image views
      ii = 0
      // imagesArraytemp = new Array();
      // scoresArraytemp = new Array();
      nrofimageswithscore = localStorage.getItem("nrofimageswithscore" + i);

      for (let ii = 0; ii < nrofimageswithscore; ii++) {
        images_key = "images" + i + "_" + ii
        scores_key = "score" + i + "_" + ii
        console.log(images_key);
        // imagesArraytemp.push( localStorage.getItem(images_key) )
        // scoresArraytemp.push( localStorage.getItem(scores_key) )

        var imgscoreelement = document.createElement("img");
        imgscoreelement.setAttribute("class", "imagepreview");
        // imgscoreelement.setAttribute("text_lst", "Referencen nicht gefunden");
        //imgelement.setAttribute("src", imagepath + "/" + mimg);

        //////////// Added by Junaid for deployment : works with all images for whole data///////////////////
        imgpath = document.getElementById("serverUrlBase").value + mimg;
        // imagepath + patentid + "/images/" + localStorage.getItem(images_key) + ".png");
        var the_arr = imgpath.split('/');
        the_arr.pop();
        imgpath = the_arr.join('/');

        scoredivelement = document.createElement("div");
        similarity = "0.00%"
        try {
          f = parseFloat(localStorage.getItem(scores_key))
          similarity = Math.round(f * 10000) / 100;

        }
        catch (error) {
          console.log(error);
        }
        scoredivelement.innerHTML = localStorage.getItem(images_key) + ": " + similarity + "%";

        imgscoreelement.setAttribute('src', imgpath + "/" + localStorage.getItem(images_key) + ".png");

        onemorediv = document.createElement("div");
        onemorediv.setAttribute("class", "imgscoreelement");
        onemorediv.appendChild(scoredivelement);
        onemorediv.appendChild(imgscoreelement);

        imgscorelist.appendChild(onemorediv);

      }


      // imagesArray[i] = imagesArraytemp;
      // scoresArray[i] = scoresArraytemp;
      // console.log(imagesArray[i]);
      // console.log(scoresArray[i]);

      previewdiv.appendChild(imgscorelist);



    }



    if (localStorage.getItem("resultmode") != "image") {
      showList();
    }
    else {
      showGrid();
    }
    activatePhotoviewer(min);
  } else {
    alert("Sorry, your browser do not support local storage.");
  }
  showMoreimages(0);
}

function sortGridRel() {
  var dropdown = document.getElementById("sort-by");
  var selection = dropdown.value;
  var gI = $(".gridItem");
  if (selection === "relevance") {
    gI.sort(function (b, a) { return $(a).data("score") - $(b).data("score") });
    $(".resultsGrid").append(gI);
    setGridNumbering();
  }
}

function sortTable() {
  var abc = $(".resultsList")[0].style.display;

  if (abc = "block") {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("tableR");
    switching = true;
    var dropdown = document.getElementById("sort-by");
    var selection = dropdown.value;
    var tagIndex = 2;
    if (selection === "ascending" || selection === "descending") {
      tagIndex = 5;
    }
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[tagIndex];
        x_value = parseInt(x.innerHTML.toLowerCase().replace("%", ""));
        y = rows[i + 1].getElementsByTagName("TD")[tagIndex];
        y_value = parseInt(y.innerHTML.toLowerCase().replace("%", ""));
        if (selection !== "ascending") {
          if (x_value < y_value) {
            shouldSwitch = true;
            break;
          }
        } else if (selection === "ascending" && x_value > y_value) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  } if (abc = "none") {
    sortGridRel();
  } else {

  }

  setRowNumbering();
}

function showGrid() {
  $(".resultsGrid").show()
  $(".resultsList").hide()
  localStorage.setItem("resultmode", "image")
}

function showList() {
  $(".resultsGrid").hide()
  $(".resultsList").show()
  localStorage.setItem("resultmode", "text")
}

function tableToCSV() {

  // Variable to store the final csv data
  var csv_data = [];

  // Get each row data
  var rows = document.getElementsByTagName('tr');
  for (var i = 0; i < rows.length; i++) {

    // Get each column data
    var cols = rows[i].querySelectorAll('td,th');

    // Stores each csv row data
    var csvrow = [];
    for (var j = 2; j < cols.length; j++) {

      // Get the text data of each cell
      // of a row and push it to csvrow
      // csvrow.push(cols[j].innerHTML);
      content = cols[j].textContent;
      // quote title and authors in "..."
      if (j == 4 || j == 6) {
        content = '"' + content + '"';
      }
      csvrow.push(content);
    }

    // Combine each column value with comma
    csv_data.push(csvrow.join(","));
  }

  // Combine each row data with new line character
  csv_data = csv_data.join('\n');

  // Call this function to download csv file 
  downloadCSVFile(csv_data);

}

function downloadCSVFile(csv_data) {

  // Create CSV file object and feed
  // our csv_data into it
  CSVFile = new Blob([csv_data], {
    type: "text/csv"
  });

  // Create to temporary link to initiate
  // download process
  var temp_link = document.createElement('a');

  // Download csv file
  temp_link.download = "results.csv";
  var url = window.URL.createObjectURL(CSVFile);
  temp_link.href = url;

  // This link should not be displayed
  temp_link.style.display = "none";
  document.body.appendChild(temp_link);

  // Automatically click the link to
  // trigger download
  temp_link.click();
  document.body.removeChild(temp_link);
}

function activatePhotoviewer(offset) {

  // initialize manually with a list of links
  $('figure, .zoomIn').click(function (e) {
    console.log("figure zoomIn");
    e.preventDefault();

    var items = [],
      options = {
        // index: $(this).index(),
        index: $('img', this).attr('index') - offset,
        resizable: true,
        initMaximized: false,
        headerToolbar: ['caption', 'addToSearch', 'maximize', 'close'],
      };

    /*Übergabe des Bildes und des Titels*/
    $('[data-gallery=photoviewer]').each(function () {
      items.push({
        src: $('img', this).attr('src'),
        text_lst: $('img', this).attr('text_lst'),
        title: "FIG" + ": " + $(this).attr('num'),
        legend: $('img', this).attr('text_lst')
      });
    })

    /*Initialisierung des Imageviewers*/
    console.log(options);
    new PhotoViewer(items, options);
  });

  // If Photoviewer gets maximized the scroll of the body gets disabled to prevent unwanted scrolling Line 1341 
  $(".photoviewer-button.photoviewer-button-maximize").on("click", function () {
    if ($("header").css("display") == "none") {
      $("header").css("display", "block"),
        $("body").css("overflow", "scroll");
    } else {
      $(".photoviewer-button.photoviewer-button-close").css("border-top-right-radius", "0px"),
        $("body").css("overflow", "hidden");
    }
  }),

    $("button.addToSearchI").click(function (e) {
      e.stopPropagation();
      var input, target, n, t, s;
      input = document.getElementById('myInputDesc');
      try {
        target = $(this).closest("b").prev("p")[0].innerText.trim();
        input.value = target;
        n = $("#section_description").offset().top
        s = (n);
        $(".photoviewer-modal").remove();
        $('html, body').animate({ scrollTop: `${s}` }, "fast");
        $(".select-selected")[0].innerText = "RefName"
        searchMeDesc();
      }
      catch (e) { console.log(e); }
    });

  // Nur aktivieren, wenn die Initialisierung im Fullscreen erfolgt, weil dann der Body weiterhin scrollbar bleibt. Line 1341 
  $(".photoviewer-button.photoviewer-button-close").on("click", function () {
    $(".photoviewer-button.photoviewer-button-close").css("border-top-right-radius", "5px"),
      $("header").css("display", "block"),
      $("body").css("overflow", "scroll"),
      $("#legend").css("display", "none");
  });
}

function showMoreimages(nr) {
  $('.imagepreviewdiv').css('display', 'none');
  $('#imageswithscore' + nr).css('display', 'block');;
  pid = localStorage.getItem("result" + nr);
  document.getElementById("previewCaption").innerHTML = pid;
  // $('#collapsePreview').collapse("show");


}