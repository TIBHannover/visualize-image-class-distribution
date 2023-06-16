window.onload = function () {
    myFunction();
    myOtherFunction();
    $(".select-selected").text("select");
};

function myFunction() {

    //Hier wird eine Variable erstellt, die später überprüft wird.
    const value = document.getElementById('ref-ul0001').getElementsByTagName('li')[0].firstChild.id;

    //CREATING THE TABLE FOR THE NON-PATENT LITERATURE         

    //Wenn die erste Listen id "ref-pcit0001" lautet, weiß der Code, dass die normale Reihenfolge (zuerst pcit und dann npcit)
    //beibehalten werden kann. Hier in jedem anderen Fall wird angenommen, dass es keine pcit gibt und die IDs werden dementsprechend angepasst.
    if (value === "ref-pcit0001") {

        const nonPatCit = Array.from(document.getElementById('ref-ul0002')?.getElementsByTagName('li') ?? Array());
        const nonPatCit_tbody = document.querySelector('#non-pat-cit tbody');

        nonPatCit.forEach(
            (nonPatCit) => {
                // a table row for each element 
                const tr = nonPatCit_tbody.appendChild(document.createElement('tr'));

                tr
                    .appendChild(document.createElement('td'))
                    .textContent = Array.from(nonPatCit.querySelectorAll('name'))
                        .map((name) => name.textContent)
                        .join(', ');
                tr
                    .appendChild(document.createElement('td'))
                    .textContent = nonPatCit.querySelector('atl')?.textContent || '';

                tr
                    .appendChild(document.createElement('td'))
                    .textContent = nonPatCit.querySelector('sertitle')?.textContent || '';

                tr
                    .appendChild(document.createElement('td'))
                    .textContent = nonPatCit.querySelector('sdate')?.textContent || '';
                tr
                    .appendChild(document.createElement('td'))
                    .textContent = nonPatCit.querySelector('vid')?.textContent || '';

                tr
                    .appendChild(document.createElement('td'))
                    .textContent = nonPatCit.querySelector('ino')?.textContent || '';

                tr
                    .appendChild(document.createElement('td'))
                    .textContent = nonPatCit.querySelector('ppf')?.textContent || '';

                // multiple authors, map nodes to strings and join them
                tr
                    .appendChild(document.createElement('td'))
                    .textContent = Array.from(nonPatCit.querySelectorAll('crossref'))
                        .map((crossref) => crossref.textContent)
                        .join(', ');
            }
        )

        //CREATING THE TABLE FOR THE PATENT LITERATURE         

        const patCit = Array.from(document.getElementById('ref-ul0001')?.getElementsByTagName('li') ?? Array());
        const patCit_tbody = document.querySelector('#pat-cit tbody');

        patCit.forEach(
            (patCit) => {
                // a table row for each element 
                const tr = patCit_tbody.appendChild(document.createElement('tr'));

                tr
                    .appendChild(document.createElement('td'))
                    .textContent = patCit.querySelector('country')?.textContent || '';
                tr
                    .appendChild(document.createElement('td'))
                    .textContent = patCit.querySelector('doc-number')?.textContent || '';

                tr
                    .appendChild(document.createElement('td'))
                    .textContent = patCit.querySelector('kind')?.textContent || '';

                tr
                    .appendChild(document.createElement('td'))
                    .textContent = Array.from(patCit.querySelectorAll('name'))
                        .map((name) => name.textContent)
                        .join(', ');
                tr
                    .appendChild(document.createElement('td'))
                    .textContent = patCit.querySelector('date')?.textContent || '';

                // multiple authors, map nodes to strings and join them
                tr
                    .appendChild(document.createElement('td'))
                    .textContent = Array.from(patCit.querySelectorAll('crossref'))
                        .map((crossref) => crossref.textContent)
                        .join(', ');
            }
        )

        patCit.forEach(
            (patCit) => {
                // a table row for each element 
                const tr = patCit_tbody.appendChild(document.createElement('tr'));

                tr
                    .appendChild(document.createElement('td'))
                    .textContent = patCit.querySelector('country')?.textContent || '';
                tr
                    .appendChild(document.createElement('td'))
                    .textContent = patCit.querySelector('doc-number')?.textContent || '';

                tr
                    .appendChild(document.createElement('td'))
                    .textContent = patCit.querySelector('kind')?.textContent || '';

                tr
                    .appendChild(document.createElement('td'))
                    .textContent = patCit.querySelector('name')?.textContent || '';
                tr
                    .appendChild(document.createElement('td'))
                    .textContent = patCit.querySelector('date')?.textContent || '';

                // multiple authors, map nodes to strings and join them
                tr
                    .appendChild(document.createElement('td'))
                    .textContent = Array.from(patCit.querySelectorAll('crossref'))
                        .map((crossref) => crossref.textContent)
                        .join(', ');
            }
        )
    }

    else {

        const nonPatCit = Array.from(document.getElementById('ref-ul0001')?.getElementsByTagName('li') ?? Array());
        const nonPatCit_tbody = document.querySelector('#non-pat-cit tbody');

        nonPatCit.forEach(
            (nonPatCit) => {
                // a table row for each element 
                const tr = nonPatCit_tbody.appendChild(document.createElement('tr'));

                tr
                    .appendChild(document.createElement('td'))
                    .textContent = Array.from(nonPatCit.querySelectorAll('name'))
                        .map((name) => name.textContent)
                        .join(', ');
                tr
                    .appendChild(document.createElement('td'))
                    .textContent = nonPatCit.querySelector('atl')?.textContent || '';

                tr
                    .appendChild(document.createElement('td'))
                    .textContent = nonPatCit.querySelector('sertitle')?.textContent || '';

                tr
                    .appendChild(document.createElement('td'))
                    .textContent = nonPatCit.querySelector('sdate')?.textContent || '';
                tr
                    .appendChild(document.createElement('td'))
                    .textContent = nonPatCit.querySelector('vid')?.textContent || '';

                tr
                    .appendChild(document.createElement('td'))
                    .textContent = nonPatCit.querySelector('ino')?.textContent || '';

                tr
                    .appendChild(document.createElement('td'))
                    .textContent = nonPatCit.querySelector('ppf')?.textContent || '';

                // multiple authors, map nodes to strings and join them
                tr
                    .appendChild(document.createElement('td'))
                    .textContent = Array.from(nonPatCit.querySelectorAll('crossref'))
                        .map((crossref) => crossref.textContent)
                        .join(', ');
            }
        )

    }

    //Removing the list after the tables have been created
    $("#ref-list").remove();

    //INITIALIZING VARIABLES TO SORT THE TABLES ACCORDINGLY TO DESC AND ASC ORDER//
    var sortNamePatCit = document.querySelector("#pat-cit thead tr>:nth-child(4)");
    var sortCountryPatCit = document.querySelector("#pat-cit thead tr>:nth-child(1)");
    var sortDatePatCit = document.querySelector("#pat-cit thead tr>:nth-child(5)");
    var sortDateNonPatCit = document.querySelector("#non-pat-cit thead tr>:nth-child(4)");
    var sortNameNonPatCit = document.querySelector("#non-pat-cit thead tr>:nth-child(1)");


    sortNamePatCit.addEventListener('click', function (event) {

        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("pat-cit");
        switching = true;
        dir = "asc";
        /*Make a loop that will continue until
        no switching has been done:*/
        while (switching) {
            //start by saying: no switching is done:
            switching = false;
            rows = table.rows;
            /*Loop through all table rows (except the
            first, which contains table headers):*/
            for (i = 1; i < (rows.length - 1); i++) {
                //start by saying there should be no switching:
                shouldSwitch = false;
                /*Get the two elements you want to compare,
                 one from current row and one from the next:*/
                x = rows[i].querySelector("tbody tr>:nth-child(4)");
                y = rows[i + 1].querySelector("tbody tr>:nth-child(4)");
                //check if the two rows should switch place:
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
                else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }


            if (shouldSwitch) {
                /*If a switch has been marked, make the switch
                and mark that a switch has been done:*/
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchcount++;
            }
            else {
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    });

    sortNameNonPatCit.addEventListener('click', function (event) {

        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("non-pat-cit");
        switching = true;
        dir = "asc";
        /*Make a loop that will continue until
        no switching has been done:*/
        while (switching) {
            //start by saying: no switching is done:
            switching = false;
            rows = table.rows;
            /*Loop through all table rows (except the
            first, which contains table headers):*/
            for (i = 1; i < (rows.length - 1); i++) {
                //start by saying there should be no switching:
                shouldSwitch = false;
                /*Get the two elements you want to compare,
                 one from current row and one from the next:*/
                x = rows[i].querySelector("#non-pat-cit tbody tr>:nth-child(1)");
                y = rows[i + 1].querySelector("#non-pat-cit tbody tr>:nth-child(1)");
                //check if the two rows should switch place:
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
                else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }


            if (shouldSwitch) {
                /*If a switch has been marked, make the switch
                and mark that a switch has been done:*/
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchcount++;
            }
            else {
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    });

    sortCountryPatCit.addEventListener('click', function (event) {

        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("pat-cit");
        switching = true;
        dir = "asc";
        /*Make a loop that will continue until
        no switching has been done:*/
        while (switching) {
            //start by saying: no switching is done:
            switching = false;
            rows = table.rows;
            /*Loop through all table rows (except the
            first, which contains table headers):*/
            for (i = 1; i < (rows.length - 1); i++) {
                //start by saying there should be no switching:
                shouldSwitch = false;
                /*Get the two elements you want to compare,
                 one from current row and one from the next:*/
                x = rows[i].querySelector("tbody tr>:nth-child(1)");
                y = rows[i + 1].querySelector("tbody tr>:nth-child(1)");
                //check if the two rows should switch place:
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
                else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }


            if (shouldSwitch) {
                /*If a switch has been marked, make the switch
                and mark that a switch has been done:*/
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchcount++;
            }
            else {
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    });

    sortDatePatCit.addEventListener('click', function (event) {

        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("pat-cit");
        switching = true;
        dir = "asc";
        /*Make a loop that will continue until
        no switching has been done:*/
        while (switching) {
            //start by saying: no switching is done:
            switching = false;
            rows = [].slice.call(table.rows);
            /*Loop through all table rows (except the
            first, which contains table headers):*/
            for (i = 1; i < (rows.length - 1); i++) {
                //start by saying there should be no switching:
                shouldSwitch = false;
                /*Get the two elements you want to compare,
                 one from current row and one from the next:*/
                x = rows[i].querySelector("tbody tr>:nth-child(5)");
                y = rows[i + 1].querySelector("tbody tr>:nth-child(5)");
                var xContent = (isNaN(x.innerHTML))
                    ? (x.innerHTML.toLowerCase() === '-')
                        ? 0 : x.innerHTML.toLowerCase()
                    : parseFloat(x.innerHTML);
                var yContent = (isNaN(y.innerHTML))
                    ? (y.innerHTML.toLowerCase() === '-')
                        ? 0 : y.innerHTML.toLowerCase()
                    : parseFloat(y.innerHTML);
                if (dir == "asc") {
                    if (xContent > yContent) {
                        shouldSwitch = true;
                        break;
                    }
                }
                else if (dir == "desc") {
                    if (xContent < yContent) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchcount++;
            }
            else {
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    });

    sortDateNonPatCit.addEventListener('click', function (event) {

        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("non-pat-cit");
        switching = true;
        dir = "asc";
        /*Make a loop that will continue until
        no switching has been done:*/
        while (switching) {
            //start by saying: no switching is done:
            switching = false;
            rows = [].slice.call(table.rows);
            /*Loop through all table rows (except the
            first, which contains table headers):*/
            for (i = 1; i < (rows.length - 1); i++) {
                //start by saying there should be no switching:
                shouldSwitch = false;
                /*Get the two elements you want to compare,
                 one from current row and one from the next:*/
                x = rows[i].querySelector("#non-pat-cit tbody tr>:nth-child(4)");
                y = rows[i + 1].querySelector("#non-pat-cit tbody tr>:nth-child(4)");
                var xContent = (isNaN(x.innerHTML))
                    ? (x.innerHTML.toLowerCase() === '-')
                        ? 0 : x.innerHTML.toLowerCase()
                    : parseFloat(x.innerHTML);
                var yContent = (isNaN(y.innerHTML))
                    ? (y.innerHTML.toLowerCase() === '-')
                        ? 0 : y.innerHTML.toLowerCase()
                    : parseFloat(y.innerHTML);
                if (dir == "asc") {
                    if (xContent > yContent) {
                        shouldSwitch = true;
                        break;
                    }
                }
                else if (dir == "desc") {
                    if (xContent < yContent) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchcount++;
            }
            else {
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    });
}

function myOtherFunction() {

    //Changes the date format to Y.M.D . The punctuation allows for better readibility and the YY/MM/DD works with the sort function

    const a = $("#pat-cit tbody tr>:nth-child(5)");

    for (let i = 0; i < a.length; i++) {
        a[i].innerText = a[i].innerText.slice(0, 4) + "." + a[i].innerText.slice(4, 6) + "." + a[i].innerText.slice(6, 8);
    }

    const b = $("#non-pat-cit tbody tr>:nth-child(4)");
    for (let i = 0; i < b.length; i++) {
        b[i].innerText = b[i].innerText.slice(0, 4) + "." + b[i].innerText.slice(4, 6) + "." + b[i].innerText.slice(6, 8);
    }

}