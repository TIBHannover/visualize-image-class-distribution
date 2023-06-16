const linksjson = [];

console.log("sendquery");

function asyncCsv2Array(fileName, separator, callback) {
    // Datei einlesen (benötigt JQuery oder Zepto (bei AppFurnace automatisch enthalten))
    $.get(fileName, function (fileContent) {
        // Array für Ergebnis
        var result = [];
        // Eingelesenen Text in ein Array splitten (\r\n, \n und\r sind die Trennzeichen für verschiedene Betriebssysteme wie Windows, Linux, OS X)
        var textArray = fileContent.split(/(\r\n|\n|\r)/gm);
        // Über alle Zeilen iterieren
        for (var i = 0; i < textArray.length; i++) {
            // Nur wenn die Größe einer Zeile > 1 ist (sonst ist in der Zeile nur das Zeilenumbruch Zeichen drin)
            if (textArray[i].length > 1) {
                // Zeile am Trennzeichen trennen
                var elementArray = textArray[i].split(separator);
                // überflüssiges Element am Ende entfernen - nur notwendig wenn die Zeile mit dem Separator endet
                //elementArray.splice(elementArray.length - 1, 1);
                // Array der Zeile dem Ergebnis hinzufügen
                result.push(elementArray);
                linksjson[elementArray[0]] = elementArray;
                console.log("links= " + linksjson)
            } // Ende if
        } // Ende for
        callback(result);
    }); // Ende von $.get Aufruf
} // Ende function asyncCsv2Array

// Beispielaufruf    
asyncCsv2Array("patentmetadata.csv", ";", function (result) {
    console.log(result);

    console.log(result[0][0]);

    console.log(result[0][1]);

    console.log(linksjson["EP12718588B1"])
});

if (localStorage) {
    localStorage.clear();
}




function sendQuery() {

    // links['EP11871550B1'] = "../Driving - B60W - 25 B1 Patents from 2020/EP11871550NWB1/index.html"
    // links['EP13744623B1'] = "../Driving - B60W - 25 B1 Patents from 2020/EP13744623NWB1/index.html"
    // links['EP14192726B1'] = "../Driving - B60W - 25 B1 Patents from 2020/EP14192726NWB1/index.html"
    // links['EP14792775B1'] = "../Driving - B60W - 25 B1 Patents from 2020/EP14792775NWB1/index.html"
    // links['EP14809459B1'] = "../Driving - B60W - 25 B1 Patents from 2020/EP14809459NWB1/index.html"
    // links['EP15739601B1'] = "../Driving - B60W - 25 B1 Patents from 2020/EP15739601NWB1/index.html"
    // links['EP15886215B1'] = "../Driving - B60W - 25 B1 Patents from 2020/EP15886215NWB1/index.html"
    // links['EP19194761A1'] = "../Driving - B60W - 5 A1B1 Patents Large Datasets from 2020/EP19194761NWA1/index.html"
    // links['EP19194770A1'] = "../Driving - B60W - 5 A1B1 Patents Large Datasets from 2020/EP19194770NWA1/index.html"
    // links['EP19194772A1'] = "../Driving - B60W - 5 A1B1 Patents Large Datasets from 2020/EP19194772NWA1/index.html"

    // Sending a receiving data in JSON format using GET method
    //      {
    //"query_string": "query?q=language:*&q.op=OR&indent=true"
    //} 
    //    var url = 'http://127.0.0.1:8080/query'//?q=title:"energy management"&q.op=OR&indent=true&text=engine"'
    var url = 'http://127.0.0.1:8080/query'//?q=title:"energy management"&q.op=OR&indent=true&text=engine"'
    //var url = 'http://expresvip21.service.tib.eu:8080/query'// ?q=title:"energy management"&q.op=OR&indent=true&text=engine"'
    //var url = "http://127.0.0.1:8983/solr/#/"
    var xhr = new XMLHttpRequest();

    qs = document.getElementById('searchinput1').value;
    console.log(qs)
    if (qs == null)
        qs = "*:*";
    console.log(qs)
    //var params = { "q": "*:*" }
    //var data = JSON.stringify(params)
    // var query_json = { "query_string": qs }
    var query_json = {
        'query_lexicographical': {
            'claims': 'engine',
            'description': 'machine',
            'facet': 'language',
            'sort': 'asc',
            'text': 'handler',
            'title': 'machine'
        }
    }
    data = JSON.stringify(query_json)

    console.log(data)
    //    var url = url + '?q=title:"energy management"&q.op="OR"&indent="true"&text="engine"' //+ encodeURIComponent();
    //var url;// = url + '?q="*:*"' //+ encodeURIComponent();


    // xhr.open("GET", url, true);
    xhr.open("POST", url, true);



    //xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Content-Type", "text/plain");
    //xhr.send()
    var json;
    let online = false;
    xhr.onreadystatechange = function () {

        getData(xhr);

    };

    try {
        xhr.send(data);
    }
    catch (e) {
        console.log(e);
        //getData(xhr);
    }
}

function getData(xhr) {
    console.log(xhr.readyState + "/" + xhr.status)
    if (xhr.status === 200) {
        if (xhr.readyState === 4) {
            json = JSON.parse(xhr.responseText);
            console.log(json);
            online = true
        }
        else
            return

    }
    else {
        //        json = JSON.parse('{"patent_ids":["EP16732695A1","EP13170297B1","EP13170297C1","EP13170297D1","EP13170297E1","EP13170297E1","EP13170297F1","EP13170297A1","EP13170297A1","EP13170297A1"]}');
        //json = JSON.parse('{"patent_ids":["EP13744623B1","EP19194770A1","EP19194772A1","EP19194761A1","EP15739601B1","EP11871550B1","EP14809459B1","EP14192726B1","EP15886215B1","EP14792775B1"]}');
        json = JSON.parse('{"patent_ids":["EP12748188B1","EP10173284B1","EP12824736B1","EP12712694B1","EP11729051B1","EP11871550B1","EP14809459B1","EP14192726B1","EP15886215B1","EP14792775B1"]}');
        console.log("KEINE LIVE DATEN!!)")

    }

    if (localStorage) {
        localStorage.clear();
    }

    var listDiv = document.getElementById('resultlist');
    if (listDiv.firstChild) {
        listDiv.removeChild(listDiv.firstChild)
    }
    var ul = document.createElement('ul');
    if (json) {
        for (var i = 0; i < json.patent_ids.length; ++i) {


            var li = document.createElement('li');
            var ali = document.createElement('a')

            var patentlink = "";

            try {
                var patentlink = linksjson[json.patent_ids[i]][1];
            }
            catch (TypeError) {
                continue;
            }

            // console.log(json.patent_ids[i]);

            // console.log(links[json.patent_ids[i]]);
            ali.setAttribute('href', patentlink);
            ali.setAttribute('target', "_blank");

            ali.appendChild(li);

            li.innerHTML = json.patent_ids[i];   // Use innerHTML to set the text
            ul.appendChild(ali);

            // docTitleLang = document.getElementsByTagName('h1');
            // console.log(docTitleLang[0]);

            // Check if the localStorage object exists
            if (localStorage) {

                // Store data
                // localStorage.setItem("doctit" + i, "Hallo" + 1);
                localStorage.setItem("doctitle" + i, "Title " + i);

                patent_key = "result" + i
                localStorage.setItem(patent_key, json.patent_ids[i]);

                link_key = "link" + i
                localStorage.setItem(link_key, patentlink);

                title_key = "title" + i
                localStorage.setItem(title_key, linksjson[json.patent_ids[i]][2]);

                pubdate_key = "pubdate" + i
                localStorage.setItem(pubdate_key, linksjson[json.patent_ids[i]][3]);

                inventor_key = "inventor" + i
                localStorage.setItem(inventor_key, linksjson[json.patent_ids[i]][4]);

                mainpicture_key = "mainpicture" + i
                console.log(linksjson[json.patent_ids[i]][5])
                localStorage.setItem(mainpicture_key, linksjson[json.patent_ids[i]][5]);


                // Retrieve data
                // alert("Hi, " + localStorage.getItem("first_name"));


            } else {
                alert("Sorry, your browser do not support local storage.");
            }


            listDiv.appendChild(ul);    // Note here
            localStorage.setItem("nrofresults", i + 1);

        }

        //window.location = "results.html";
		debugger;
		window.location = "get_search_result_ui?name=test_user1";
    }
}