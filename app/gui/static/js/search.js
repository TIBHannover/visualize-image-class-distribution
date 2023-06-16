function addBezug() {
    var target;
    target = document.getElementById("bezugsInput");
    text = target.value
    if (text) {
        imgRef.push(text);
        localStorage.setItem("queryRef", imgRef);
        $("#localRef").text(imgRef);
        $('<span class="click-me">x</span>').appendTo('#localRef').click(remove);
        slideDown();
    }
}

function addSearch() {
    
    var currentKeyWordFilter = $('[id^="searchbar"]:last').get(0);
    // Retrieve ID and increase by 1
    var num = parseInt(currentKeyWordFilter.id.match(/\d+/g), 10) + 1;
    
    console.log(currentKeyWordFilter +"/"+ num)
    
    $('[id^="minus"]:first').css('display', 'none');
    
    // clone last keyword filter, reset inputs and insert into DOM
    var clone = currentKeyWordFilter.cloneNode(true);
    
    //change previous  
    $('[id^="add"]:last').css('display', 'none');
    $('[id^="boolean"]:last').css('display', 'inline');
    //new one
    currentKeyWordFilter.after(clone);
    $('[id^="minus"]:last').css('display', 'inline-block');
    //up to 10
    if(num>9){
        $('[id^="add"]:last').css('display', 'none');
    }
    // Set ID for all nodes
    clone.id = "searchbar" + num;
    $('[id^="searchinput"]:last').val("");
    $('[id^="add"]:last').attr('id', 'add' + num);
    $('[id^="minus"]:last').attr('id', 'minus' + num);
    $('[id^="boolean"]:last').attr('id', 'boolean' + num);
    $('[id^="searchinput"]:last').attr('id', 'searchinput' + num);
    $('[id^="keyword-dropdown-"]:last').attr('id', 'keyword-dropdown-' + num);
    queryChanged();
}

function deleteSearch(e) {
    currentButtonId = parseInt(e.id.match(/\d+/g), 10);
    $('#searchbar' + currentButtonId).remove();

    var currentKeyWordFilter = $('[id^="searchbar"]:last').get(0);
    // Retrieve ID and increase by 1
    var num = parseInt(currentKeyWordFilter.id.match(/\d+/g), 10) + 1;

     for(let i = currentButtonId+1; i<num; i++ ){
        $('#add'+ i ).attr('id', 'add' + (i-1));
        $('#minus' + i ).attr('id', 'minus' + (i-1));
        $('#boolean' + i ).attr('id', 'boolean' + (i-1));
        $('#searchinput' + i ).attr('id', 'searchinput' + (i-1));
        $('#keyword-dropdown' + i ).attr('id', 'keyword-dropdown' + (i-1));

        $('#searchbar' + i ).attr( 'id' , "searchbar" + (i-1));
    }
    $('[id^="add"]:last').css('display', 'inline-block');
    $('[id^="boolean"]:last').css('display', 'none');
    if ($('[id^="searchbar"]').length == 1) {
        $('[id^="minus"]:last').css('display', 'none');
    }
    queryChanged();
}

function queryChanged() {
    var query = "";
    $('.searchbar').each(function (i, obj) {
        // get all three input elements
        var keywordDropdown = $(this).find('.keyword-dropdown');
        var searchinput = $(this).find('.searchinput');
        var boolean = $(this).find('.boolean');
        if (keywordDropdown.val() != null) {
            query += keywordDropdown.val();
            query += '=';
        }
        query += '"';
        query += searchinput.val();
        query += '" ';
        if (boolean.css('display') != 'none')
            query += boolean.val();
        query += " ";

    })
    if (query == "") {
        query = "Nothing selected yet";
    }
    $('#currentInput').text(query);
    localStorage.setItem("queryInput", query);
    localInput = localStorage.getItem("queryInput");
    $("#localInput").text(localInput);
}

function FilterChanged() {
    var filterString = "";
    var publicationDate = [];
    var selectedFilters = [];

    $('.display-filter').each(function (i, obj) {
        var filterName = $(this).find('.filter-name');
        var filterForm = $(this).find('.filter-form');
        filterForm.each(function () {
            $(this).find(':input').each(function () {
                if ($(this).prop('checked')) {
                    selectedFilters.push($(this).val());
                } else if ($(this).attr('type') == 'text') {
                    if ($(this).val() != "") publicationDate.push($(this).val());
                }
            });
        })
    })
    // There are selected checkboxes
    if (selectedFilters.length != 0) {
        $('.delete-filter').show();
        filterString += selectedFilters.join(', ');
    }
    if (filterString != "") filterString += ", ";
    if (publicationDate.length != 0) {
        filterString += publicationDate.join(" - ");
        $('.delete-filter').show();
    }
    if (filterString == "") {
        filterString = "No filter selected";
        $('.delete-filter').hide();
    }
    $('#filterInput').html(filterString);
    localStorage.setItem("queryFilter", filterString);
    localFilter = localStorage.getItem("queryFilter");
    $("#localFilter").text(localFilter);
}


function unsetAllCheckboxes() {
    $('input[type=checkbox]').prop('checked', false);
    $('.year-input-from').val("");
    $('.year-input-to').val("");
    $('.delete-filter').hide();
    $('#filterInput').html("No filter selected");
    FilterChanged();

}

var getQueryImagebased = function(dataDict){
    var xhr = new XMLHttpRequest();
    var url = window.location.origin + window.location.pathname + "/get_query_image_based";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            console.log("response: ",json);
        }
    };
    xhr.send(JSON.stringify(dataDict));
};
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

$(document).ready(function () {
    showSpinner();
    $('.fbtn').click(function () {
        $('.sub_container').show();
    }),
        $(".menuburger").click(function () {
            $(".fix").toggle("400", "swing")
        }),
        $('.sub_container').click(function () {
            $('.sub_container').hide();
        }),
        $('.backbtn').click(function () {
            $(".sub_container").hide();
        }),
        $("#gfbtn").click(function () {
            $("#generalFilter").toggle("400", "swing");
            $("#gfbtn").toggleClass("active");
            $("#gfbtn").toggleClass("select-arrow-active");

        }),
        $("#ibtn").click(function () {
            $("#ifilter").toggle("400", "swing");
            $("#ibtn").toggleClass("select-arrow-active");
            $("#ibtn").toggleClass("active");
        }),

        $("#uploadButton").click(function () {
            $("#fileUpload").trigger("click");
        });

    $("#register").on("click", function (event) {
        $("#register-modal").addClass("show");
    }),

        $("body").on("click", ".close", function (event) {
            $("#register-modal").removeClass("show");
        }),

        $("body").on("click", ".register-dialog-btn", function (event) {
            $("#register-modal").removeClass("show");
        }),

        checkIfLoggedIn();

    $('.filter').bind('change', function () {
        FilterChanged();
    }),
        $('.yearinput').bind('change', function () {
            FilterChanged();
        });

    var dropzone = document.getElementById('dropzone');
    // Optional.   Show the copy icon when dragging over.  Seems to only work for chrome.
    dropzone.addEventListener('dragover', function (e) {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    });

    // Get file data on drop
    dropzone.addEventListener('drop', function (e) {
        showSpinner();
        e.stopPropagation();
        e.preventDefault();
        var files = e.dataTransfer.files; // Array of all files
        console.log(files)
        for (var i = 0, file; file = files[i]; i++) 
        {
            if (file.type.match(/image.*/)) {
                imagesArraytemp.push(files[i])

            }
        }
        displayImages();
        console.log("select " + selectedImageIndex);
        hideSpinner();
    });
    
      
    
    
    $("#fileUpload").change(function (e) 
    {
        console.log("fileUpload");

        // $("#localImg")[0].firstChild.nodeValue = "";

        for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {

            var file = e.originalEvent.srcElement.files[i];
            if (file.type.match(/image.*/)) 
            {
                imagesArraytemp.push(file)
            }
        }
        displayImages();
        console.log("select " + selectedImageIndex);
        
    });

    // loadImagesFromLocalstorage();
    hideSpinner();
});

function deleteThisImage(index) {
    imagesArraytemp.splice(index, 1)
    // select 0 if removed image is selected
    if(index==selectedImageIndex){
        selectedImageIndex=0
    }
    displayImages()
}


var selectedImage;
var selectedImageIndex = 0;

function selectThisImage(index) {

    console.log(imagesArraytemp[index]);
    selectedImage = imagesArraytemp[index];

    elementtoselect = document.getElementById('searchimage' + index)
    // if the selected image get removed
    try {
        elementtoselectID = elementtoselect.id;
    }
    catch (TypeError) {
        console.log("nothing to select")
        // select 0
        selectedImageIndex = 0
        elementtoselect = document.getElementById('searchimage0')
        // if not exist
        if(elementtoselect==null)
        {
            return;
        }
        
        elementtoselectID = elementtoselect.id;
    }
        console.log(elementtoselectID);

        selectedelement = document.getElementsByClassName('searchImage selected');

        if (selectedelement.length == 0) {
            elementtoselect.classList.toggle("selected");

        }
        else {
            selectedelementID = selectedelement[0].id;
            console.log(selectedelementID)
            if (selectedelementID == elementtoselectID)
                elementtoselect.classList.toggle("selected");
            else {
                selectedelement[0].classList.remove("selected");
                elementtoselect.classList.add("selected");
            }
        }
        // keep in mind the index of selection
        selectedImageIndex = index;
    
    
      
    
}

function unselectall() {
    imagesArraytemp.forEach((image, index) => {
        try{
      document.getElementById('searchimage'+index).classList.remove("selected");
        }
        catch(e)
        {}
    })
}

let imagesArraytemp = []

function deleteEntriesFromLocalstorage()
{
    for (var i = 0; i<10; i++) 
    {
        localStorage.removeItem("searchimage"+i)
    }
}

function loadImagesFromLocalstorage()
{
    let i=0
    image = localStorage.getItem("searchimage"+i)
    
    while(image)
    {
        console.log(image);
        imagesArraytemp.push(image)
        i=i+1;
        image = localStorage.getItem("searchimage"+i)
    }
    displayImages();
}

function displayImages() {
    showSpinner();
    deleteEntriesFromLocalstorage();
    let images = ""
    imagesArraytemp.forEach((image, index) => {
      images += `<div class="image">
                  <img src="${URL.createObjectURL(image)}" class="searchImage" id="searchimage${index}" alt="image" onclick="selectThisImage(${index})">
                
                <button type="button" class="btn-close" aria-label="Close" onclick="deleteThisImage(${index})"></button>
                <p>
                ${image.name}
                </p>
                </div>`
        console.log(image)         
        localStorage.setItem("searchimage"+index , image);
    })
    document.getElementById('search-image-container').innerHTML = images
   
    selectThisImage(selectedImageIndex);
    hideSpinner();
}

function showSpinner(){
    $('body').addClass('busy');
}

function hideSpinner(){
    $('body').removeClass('busy');
}