const links = [];

//linksjson =

console.log("load sendquery script ");

var searchtabindex = 0;
var searchmode = "lexicographical"
var resultmode = "text"
// if (localStorage) {
//     localStorage.clear();
// }




function sendQuery() {
    console.log("start search...")

    // Sending a receiving data in JSON format using GET method
    //      {
    //"query_string": "query?q=language:*&q.op=OR&indent=true"
    //} 
    //    var url = 'http://127.0.0.1:8080/query'//?q=title:"energy management"&q.op=OR&indent=true&text=engine"'
    //var url = 'http://127.0.0.1:8080/query'//?q=title:"energy management"&q.op=OR&indent=true&text=engine"'
    //var url = 'http://expresvip21.service.tib.eu:8080/query';// ?q=title:"energy management"&q.op=OR&indent=true&text=engine"'
    //var url = "http://127.0.0.1:8983/solr/#/"

    searchtabindex = $('.tab-content .active').attr('tabindex');
    if (searchtabindex == 0)//lexicographical
    {
        searchmode = "lexicographical"
        resultmode = "text"
        sendLexicographicalQuery();

    }
    else {
        searchmode = "semantic"
        resultmode = "text"
        sendSematicalQuery();
    }

}

function sendSematicalQuery() {
    showSpinner();
    var url = window.location.origin + window.location.pathname + "/get_result_query_semantic";

    var xhr = new XMLHttpRequest();

    qs = document.getElementById('semanticsearchinput').value;
    console.log(qs)
    if (qs == "")
        console.log("Query empty")
    console.log(qs)
    //var params = { "q": "*:*" }
    //var data = JSON.stringify(params)
    // var query_json = { "query_string": qs }
    var query_json = {
        "query_semantic": {
            "text": qs,
            "num_of_results": 100,
            "start_row": 0,
            "facet": "section",
            "sections": ["description", "claim"]
        }
    }


    data = JSON.stringify(query_json)

    console.log(data)
    //    var url = url + '?q=title:"energy management"&q.op="OR"&indent="true"&text="engine"' //+ encodeURIComponent();
    //var url;// = url + '?q="*:*"' //+ encodeURIComponent();


    // xhr.open("GET", url, true);
    xhr.open("POST", url, true);



    //xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    //xhr.send()
    var json;
    let online = false;
    xhr.onreadystatechange = function () {

        // getSemanticData(xhr);
        // ***************************
        getData(xhr)

    };

    try {
        xhr.send(data);
    }
    catch (e) {
        console.log(e);
        //getData(xhr);
    }
}

function sendLexicographicalQuery() {
    showSpinner();
    var url = window.location.origin + window.location.pathname + "/get_result_query_lexicographical";

    var xhr = new XMLHttpRequest();

    qs = document.getElementById('searchinput1').value;
    console.log(qs)
    if (qs == "")
        console.log("Query empty")
    console.log(qs)
    var optiondropdown = document.getElementById('keyword-dropdown-1');
    // var name = element.options[element.selectedIndex].text;
    var options = optiondropdown.options[optiondropdown.selectedIndex].value;
    console.log('Options: ' + options);
    var optionlist = options.split("-")
    console.log('Options: ' + optionlist);

    let queryarray = {};
    queryarray["facet"] = "language";
    queryarray["sort"] = "asc";
    queryarray["num_of_results"] = 100;
    // queryarray["text"] = "handler";

    for (const o of optionlist) {
        queryarray[o] = qs;
    }
    // queryarray["description"] = "engine";

    console.log(queryarray)
    // qs_claims ="";
    // qs_title = "";
    // qs_description = qs;

    // var params = { "description": qs_description }
    // var data = JSON.stringify(params)
    var query_json = { "query_lexicographical": queryarray }
    // console.log(JSON.stringify(query_json_test));

    // var query_json1 = {
    //     'query_lexicographical': {

    //         'description': qs_description,
    //         'facet': 'language',
    //         'sort': 'asc',
    //         'text': 'handler'

    //     }   
    // var query_json = {
    //     'query_lexicographical': {
    //         'claims': qs_claims,
    //         'description': qs_description,
    //         'facet': 'language',
    //         'sort': 'asc',
    //         'text': 'handler',
    //         'title': qs_title
    //     }
    // }
    // var query_json = {
    //     'query_lexicographical': {
    //         'claims': 'engine',
    //         'description': 'machine',
    //         'facet': 'language',
    //         'sort': 'asc',
    //         'text': 'handler',
    //         'title': 'machine'
    //     }
    // }
    data = JSON.stringify(query_json)

    console.log(data)
    //    var url = url + '?q=title:"energy management"&q.op="OR"&indent="true"&text="engine"' //+ encodeURIComponent();
    //var url;// = url + '?q="*:*"' //+ encodeURIComponent();


    // xhr.open("GET", url, true);
    xhr.open("POST", url, true);



    //xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
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
            console.log(json.metadata);
            online = true
            // debugger;
            hideSpinner();
            console.log(json);
            // debugger;
        }
        else//wait for readyState
            return

    }
    //offline
    else {
        var json = {
            patent_ids: []
        };

        MAXRESULTS = 20;
        const keys = Object.keys(linksjson);
        for (let m = 0; m < MAXRESULTS; m++) {
            const key = keys[m];
            console.log(key);
            json.patent_ids.push(key);
        }




        //        json = JSON.parse('{"patent_ids":["EP16732695A1","EP13170297B1","EP13170297C1","EP13170297D1","EP13170297E1","EP13170297E1","EP13170297F1","EP13170297A1","EP13170297A1","EP13170297A1"]}');
        //json = JSON.parse('{"patent_ids":["EP13744623B1","EP19194770A1","EP19194772A1","EP19194761A1","EP15739601B1","EP11871550B1","EP14809459B1","EP14192726B1","EP15886215B1","EP14792775B1"]}');
        //json = JSON.parse('{"patent_ids":["EP12748188B1","EP10173284B1","EP12824736B1","EP12712694B1","EP11729051B1","EP03027538B1","EP11382085B1","EP12382395B1"]}');
        console.log("KEINE LIVE DATEN!!)")

    }

    // if (localStorage) {
    //     localStorage.clear();
    // }

    // var listDiv = document.getElementById('resultlist');
    // if (listDiv.firstChild) {
    //     listDiv.removeChild(listDiv.firstChild)
    // }
    // var ul = document.createElement('ul');
    if (json) {
        localStorage.clear()
        localStorage.setItem("searchmode", searchmode)
        localStorage.setItem("resultmode", resultmode)

        i = 0;
        for (var patentid in json.metadata) {

            // debugger;

            // var li = document.createElement('li');
            // var ali = document.createElement('a')

            var patentlink = "";

            try {

                // var patentlink = linksjson[json.patent_ids[i]]["path"];    
                // var patentlink = "http://localhost:5009/get_patent_ui?name=test_user1&patentid=" + linksjson[json.patent_ids[i]]["patentid"];
                // var patentlink = "get_patent_ui?name=test_user1&patentid=" + json.metadata[json.patent_ids[i]]["patentid"];
                var patentlink = "get_patent_ui?name=test_user1&patentid=" + json.metadata[patentid]["patentid"];
            }
            catch (TypeError) {
                console.log("Nicht im Dataset1000: " + json.metadata[patentid])
                continue;
            }

            // Check if the localStorage object exists
            if (localStorage) {

                // Store data
                // localStorage.setItem("doctit" + i, "Hallo" + 1);
                localStorage.setItem("doctitle" + i, "Title " + i);

                patent_key = "result" + i
                // localStorage.setItem(patent_key, json.patent_ids[i]);
                localStorage.setItem(patent_key, json.metadata[patentid]["patentid"]);

                link_key = "link" + i

                patentlink = patentlink.replace("../", "/")
                localStorage.setItem(link_key, patentlink);

                title_key = "title" + i
                //localStorage.setItem(title_key, links[json.patent_ids[i]][2]);
                localStorage.setItem(title_key, json.metadata[patentid]["title"]);

                pubdate_key = "pubdate" + i
                localStorage.setItem(pubdate_key, json.metadata[patentid]["pubdate"]);

                inventor_key = "inventor" + i
                localStorage.setItem(inventor_key, json.metadata[patentid]["inventor"]);

                mainpicture_key = "mainpicture" + i
                console.log(json.metadata[patentid]["mainpicture"])
                localStorage.setItem(mainpicture_key, json.metadata[patentid]["path"] + "/images/" + json.metadata[patentid]["mainpicture"]);

                similarity_key = "similarity" + i
                localStorage.setItem(similarity_key, json.similarityscores[patentid]);

                ii = 0
                try {
                    for (var iimage in json.imageswithscores[patentid]) {
                        images_key = "images" + i + "_" + ii
                        score_key = "score" + i + "_" + ii
                        localStorage.setItem(images_key, json.imageswithscores[patentid][ii]["text"]);
                        localStorage.setItem(score_key, json.imageswithscores[patentid][ii]["score"]);
                        ii = ii + 1

                    }
                    localStorage.setItem("nrofimageswithscore" + i, ii);
                }
                catch (error) {
                    console.log(error);
                }
                // debugger;
                // Retrieve data
                // alert("Hi, " + localStorage.getItem("first_name"));


            } else {
                alert("Sorry, your browser do not support local storage.");
            }


            // listDiv.appendChild(ul);    // Note here
            localStorage.setItem("nrofresults", i + 1);
            i = i + 1

        }
        // window.location.href = window.location.origin + window.location.pathname + "/get_search_result_ui?name=test_user1";
        window.location.href = window.location.origin + window.location.pathname + "/get_search_result_ui?name=test_user1";
        console.log(window.location.origin);
        console.log(window.location.pathname);
        // debugger;

    }
}


async function sendImageQuery() {
    const blobToDataUrl = blob => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
    const blobToBase64 = blob => blobToDataUrl(blob).then(text => text.slice(text.indexOf(",")));

    console.log(selectedImage)
    if (selectedImage == null) {
        console.log("Kein Bild ausgewählt");
        alert("Bitte ein Bild auswählen")
        return;
    }
    const base64 = await blobToBase64(selectedImage);
    // console.log(base64)

    // console.log(base64);
    console.log("start image search...")
    showSpinner();
    searchmode = "image"
    resultmode = "image"

    // xhr.send(JSON.stringify(dataDict));

    searchimage = document.getElementsByClassName('searchImage selected');
    console.log(searchimage)
    if (searchimage.length == 0) {
        console.log("Kein Bild ausgewählt");
        alert("Bitte ein Bild auswählen")
        return;
    }

    dataDict = { "imageb64": base64 }
    // const base64 = await blobToBase64(searchimage[0].src);
    // debugger;
    var xhr = new XMLHttpRequest();
    var url = window.location.origin + window.location.pathname + "/get_query_image_based";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    var json;
    xhr.onreadystatechange = function () {

        // getImageData(xhr);
        // ***********************
        getData(xhr);

    };

    try {
        // xhr.send(data);
        xhr.send(JSON.stringify(dataDict));
    }
    catch (e) {
        console.log(e);
        //getData(xhr);
    }

}

loadLinks(function (resultjson) {
    console.log("loadLinks");
    console.log(resultjson);
    console.log(resultjson["EP12748188B1"]["path"]);


    //  console.log(links["EP12718588B1"])
});
function loadLinks(callback) {
    resultjson = {
        "EP12748188B1": {
            "patentid": "EP12748188B1",
            "path": "EP12748188NWB1",
            "title": "DIRECT-DRIVE WIND TURBINE",
            "pubdate": "20151125",
            "inventor": "PEDERSEN, Bo/DK-7620 Lemvig\u00a0(DK), THOMSEN, Kim/DK-7430 Ikast\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10173284B1": {
            "patentid": "EP10173284B1",
            "path": "EP10173284NWB1",
            "title": "System and method for managing wind turbines and enhanced diagnostics",
            "pubdate": "20150325",
            "inventor": "Jammu, Vinay Bhaskar/560066, Banagalore\u00a0(IN), Madam, Narayanan Urupuniakavu/560066, Bangalore\u00a0(IN), Perla, Ramesh/560066, Bangalore\u00a0(IN), Naithani, Nidhi/560066, Bangalore\u00a0(IN), Morjaria, Mahesh Amritlal/Atlanta, GA 30339\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP12824736B1": {
            "patentid": "EP12824736B1",
            "path": "EP12824736NWB1",
            "title": "ARTIFICIAL TREE FOR GENERATING HYBRID ENERGY",
            "pubdate": "20160810",
            "inventor": "Petrosillo, Piero/72100 Brindisi\u00a0(IT), Leoci, Stefano/72100 Brindisi\u00a0(IT)",
            "mainpicture": "imgf0001.png"
        },
        "EP12712694B1": {
            "patentid": "EP12712694B1",
            "path": "EP12712694NWB1",
            "title": "WIND TURBINE BLADE WITH TAPERING ROOT BUSHINGS",
            "pubdate": "20160210",
            "inventor": "DAHL, Martin/24939 Flensburg\u00a0(DE), MORTENSEN, Bjarne, Krab/DK-7190 Billund\u00a0(DK), HORNBLOW, Benjamin/DK-2100 Copenhagen \u00d8\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11729051B1": {
            "patentid": "EP11729051B1",
            "path": "EP11729051NWB1",
            "title": "WIND TURBINE SYSTEM FOR DETECTION OF BLADE ICING",
            "pubdate": "20150722",
            "inventor": "LAURITSEN, Steen M./DK-8250 Eg\u00e5\u00a0(DK), MIRANDA, Erik Carl Lehnskov/DK-8940 Randers SV\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP03027538B1": {
            "patentid": "EP03027538B1",
            "path": "EP03027538NWB1",
            "title": "Planetengetriebe f\u00fcr eine Windkraftanlage",
            "pubdate": "20150401",
            "inventor": "Hulshof, Frans/7102 KD-Winterswijk\u00a0(NL), Dinter, Ralf, Dr./45888 Gelsenkirchen\u00a0(DE), Jansen, Udo/46397 Bocholt\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11382085B1": {
            "patentid": "EP11382085B1",
            "path": "EP11382085NWB1",
            "title": "Wind turbine with a blade Pitch System with a dual winding drive",
            "pubdate": "20160608",
            "inventor": "PALOMARES RENTERO, Pedro/08005, BARCELONA\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP12382395B1": {
            "patentid": "EP12382395B1",
            "path": "EP12382395NWB1",
            "title": "A blade for a wind turbine, and a servicing unit for a blade",
            "pubdate": "20150506",
            "inventor": "Betran Palomas, Jaume/08172 SANT CUGAT DEL VALL\u00c8S\u00a0(ES), Menasanch de Tobaruela, Jorge/19171 CABANILLAS DEL CAMPO\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP10168229B1": {
            "patentid": "EP10168229B1",
            "path": "EP10168229NWB1",
            "title": "Wind turbine blade repair kit and method",
            "pubdate": "20160330",
            "inventor": "Olson, Steven/Greer, SC 29651-2311\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP12718588B1": {
            "patentid": "EP12718588B1",
            "path": "EP12718588NWB1",
            "title": "IMPROVED WIND TURBINE NOISE CONTROL METHODS",
            "pubdate": "20161005",
            "inventor": "ABDALLAH, Imad/DK-2000 Frederiksberg\u00a0(DK), GODSK, Kristian/DK-8680 Ry\u00a0(DK), ROMBLAD, Jonas/DK-8240 Risskov\u00a0(DK), LIM, Chee Kang/Singapore 259343\u00a0(SG)",
            "mainpicture": "imgf0001.png"
        },
        "EP10193460B1": {
            "patentid": "EP10193460B1",
            "path": "EP10193460NWB1",
            "title": "Offshore wind turbine",
            "pubdate": "20160727",
            "inventor": "Yoshida, Shigeo/Tokyo Tokyo 160-8316\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP03792059B1": {
            "patentid": "EP03792059B1",
            "path": "EP03792059NWB1",
            "title": "VERTICAL AXIS WIND TURBINE",
            "pubdate": "20160810",
            "inventor": "ROWE, John/King City, Ontario L7B 1B6\u00a0(CA)",
            "mainpicture": "imgf0001.png"
        },
        "EP12700088B1": {
            "patentid": "EP12700088B1",
            "path": "EP12700088NWB1",
            "title": "BEFESTIGUNGSSYSTEM F\u00dcR KABEL, INSBESONDERE BEI WINDKRAFTANLAGEN",
            "pubdate": "20150923",
            "inventor": "CASPARI, Jochen/66606 St. Wendel\u00a0(DE), YAGCI, Burhan/66280 Sulzbach\u00a0(DE), MARYNIOK, Peter/66693 Mettlach\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP07717965B1": {
            "patentid": "EP07717965B1",
            "path": "EP07717965NWB1",
            "title": "WIND TURBINE",
            "pubdate": "20170412",
            "inventor": "Williams, Herbert Lehman/East Palatka, FL 32131\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP12740889B1": {
            "patentid": "EP12740889B1",
            "path": "EP12740889NWB1",
            "title": "TEMPERATURUNABH\u00c4NGIGER SCHWINGUNGSTILGER",
            "pubdate": "20150916",
            "inventor": "MITSCH, Franz/64646 Heppenheim\u00a0(DE), D\u00d6RSAM, Mathias/69488 Birkenau\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12194989B1": {
            "patentid": "EP12194989B1",
            "path": "EP12194989NWB1",
            "title": "Eolienne \u00e0 axe vertical",
            "pubdate": "20151014",
            "inventor": "Allot, G\u00e9rard/27370 LA HARENGERE\u00a0(FR)",
            "mainpicture": "imgf0001.png"
        },
        "EP12189966B1": {
            "patentid": "EP12189966B1",
            "path": "EP12189966NWB1",
            "title": "Verfahren zum Betreiben einer elektrischen Schaltung f\u00fcr einen Windpark",
            "pubdate": "20160914",
            "inventor": "Hentschel, Gert/01109 Dresden\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP13168761B1": {
            "patentid": "EP13168761B1",
            "path": "EP13168761NWB1",
            "title": "Airflow control arrangement",
            "pubdate": "20160914",
            "inventor": "Eriksen, Uffe/8700 Horsens\u00a0(DK), Gundtoft, Soeren/7000 Fredericia\u00a0(DK), Soerensen, Peter Hessellund/8740 Br\u00e6dstrup\u00a0(DK), Thygesen, Claus/8670 L\u00e5sby\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12750827B1": {
            "patentid": "EP12750827B1",
            "path": "EP12750827NWB1",
            "title": "TRACK SYSTEM FOR A WIND TURBINE GENERATOR",
            "pubdate": "20150408",
            "inventor": "ISHIMITSU, Keita/Tokyo 108-8215\u00a0(JP), KAMEDA, Takuro/Tokyo 108-8215\u00a0(JP), DUDEN, Heinrich/London, Greater London W1K6WL\u00a0(GB), HILLER, Michael/London, Greater London W1K6WL\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP08722718B1": {
            "patentid": "EP08722718B1",
            "path": "EP08722718NWB1",
            "title": "WIND TURBINE GENERATOR AND ITS CONTROL METHOD",
            "pubdate": "20160810",
            "inventor": "Mitsubishi Heavy Industries, Ltd./Tokyo 108-8215\u00a0(JP), MHI Vestas Offshore Wind A/S/8200 Aarhus N\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12709389B1": {
            "patentid": "EP12709389B1",
            "path": "EP12709389NWB1",
            "title": "WIND TURBINE BLADE FOR A WIND TURBINE",
            "pubdate": "20151216",
            "inventor": "Mitsubishi Heavy Industries, Ltd./Tokyo 108-8215\u00a0(JP), MHI Vestas Offshore Wind A/S/8200 Aarhus N\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP05015960B1": {
            "patentid": "EP05015960B1",
            "path": "EP05015960NWB1",
            "title": "Rettungskapsel f\u00fcr Windenergieanlagen",
            "pubdate": "20150225",
            "inventor": "Friebe, Patrick/25524 Itzehoe\u00a0(DE), Rauschelbach, Andreas/25764 Friedrichsgabekoog\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10154694B1": {
            "patentid": "EP10154694B1",
            "path": "EP10154694NWB1",
            "title": "Rotorblatt f\u00fcr eine Windenergieanlage mit Durchgangsl\u00f6chern zur Handhabung",
            "pubdate": "20160330",
            "inventor": "Der Erfinder hat auf seine Nennung verzichtet.",
            "mainpicture": "imgf0001.png"
        },
        "EP10167128B1": {
            "patentid": "EP10167128B1",
            "path": "EP10167128NWB1",
            "title": "Control system for an electrical generator and method for controlling an electrical generator for a wind turbine",
            "pubdate": "20170308",
            "inventor": "Cao, Shu Yu/640695 Singapore\u00a0(SG), Tripathi, Anshuman/658882 Singapore\u00a0(SG), Sng, Eng Kian Kenneth/597156 Singapore\u00a0(SG), Andersen, Gert Karmisholt/8732 Hovedg\u00e5rd\u00a0(DK), Li, Bing/000179 Singapore\u00a0(SG)",
            "mainpicture": "imgb0001.png"
        },
        "EP10016098B1": {
            "patentid": "EP10016098B1",
            "path": "EP10016098NWB1",
            "title": "Wind power installation with helicopter hoisting platform",
            "pubdate": "20160608",
            "inventor": "K\u00f6hne, Ansgar/27572 Bremerhaven\u00a0(DE), Arndt, Joachim/27612 Loxstedt\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10382322B1": {
            "patentid": "EP10382322B1",
            "path": "EP10382322NWB1",
            "title": "Wind turbine rotor comprising a pitch bearing mechanism and a method of repair therefore",
            "pubdate": "20151007",
            "inventor": "Pasquet, Pierre/08005, Barcelona\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP12787427B1": {
            "patentid": "EP12787427B1",
            "path": "EP12787427NWB1",
            "title": "DISPOSITIF DE RECUPERATION D'ENERGIE A PARTIR D'UN FLUIDE EN MOUVEMENT",
            "pubdate": "20170809",
            "inventor": "BARSACQ, Mathieu/44230 SAINT-SEBASTIEN-SUR-LOIRE\u00a0(FR)",
            "mainpicture": "imgf0001.png"
        },
        "EP08253082B1": {
            "patentid": "EP08253082B1",
            "path": "EP08253082NWB1",
            "title": "A wind park having an auxiliary power supply",
            "pubdate": "20160810",
            "inventor": "Rosenvard, Paw/8883 Gjern\u00a0(DK)",
            "mainpicture": "imgb0001.png"
        },
        "EP08004938B1": {
            "patentid": "EP08004938B1",
            "path": "EP08004938NWB1",
            "title": "Apparatus and method for determining a resonant frequency of a wind turbine tower",
            "pubdate": "20161116",
            "inventor": "Bjerge, Martin/7400 Herning,\u00a0(DK), Egedal, Per/7400 Herning\u00a0(DK)",
            "mainpicture": "imgb0001.png"
        },
        "EP12382236B1": {
            "patentid": "EP12382236B1",
            "path": "EP12382236NWB1",
            "title": "A locking arrangement for wind turbines",
            "pubdate": "20150318",
            "inventor": "CLARAMUNT ESTECHA, Santiago/08028 Barcelona\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP11710666B1": {
            "patentid": "EP11710666B1",
            "path": "EP11710666NWB1",
            "title": "WIND ENERGY POWER PLANT EQUIPPED WITH AN OPTICAL VIBRATION SENSOR",
            "pubdate": "20150624",
            "inventor": "OLESEN, Ib Svend/DK-8930 Randers\u00a0(DK)",
            "mainpicture": "imgb0001.png"
        },
        "EP10701240B1": {
            "patentid": "EP10701240B1",
            "path": "EP10701240NWB1",
            "title": "A SECTIONAL WIND TURBINE BLADE",
            "pubdate": "20150422",
            "inventor": "HIBBARD, Paul/Putney SW15 3HG\u00a0(GB), HANCOCK, Mark/Southampton Hampshire SO15 5HN\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP09801704B1": {
            "patentid": "EP09801704B1",
            "path": "EP09801704NWB1",
            "title": "WIND TURBINE HAVING POWER ELECTRONICS IN THE NACELLE",
            "pubdate": "20160302",
            "inventor": "LARSEN, Gerner/DK-8382 Hinnerup\u00a0(DK), HJORT, Thomas/DK-7120 Vejle \u00d8st\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP06253389B1": {
            "patentid": "EP06253389B1",
            "path": "EP06253389NWB1",
            "title": "System and method for installing a wind turbine at an offshore location",
            "pubdate": "20150603",
            "inventor": "Kothnur, Vasanth Srinivasa/New York 12065\u00a0(US), Zheng, Danian/New York 12065\u00a0(US), Anderson, David Deloyd/New York 12302\u00a0(US), Ali, Mohamed Ahmed/New York 12065\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP12008159B1": {
            "patentid": "EP12008159B1",
            "path": "EP12008159NWB1",
            "title": "Windenergieanlage",
            "pubdate": "20150729",
            "inventor": "Nickel, Viktor/22305 Hamburg\u00a0(DE), Nitzpon, Joachim/18209 Steffenshagen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11732451B1": {
            "patentid": "EP11732451B1",
            "path": "EP11732451NWB1",
            "title": "DOUBLE ROW TAPERED BEARING ASSEMBLY AND WIND TURBINE",
            "pubdate": "20160518",
            "inventor": "STIESDAL, Henrik/DK-5000 Odense C\u00a0(DK)",
            "mainpicture": "imgb0001.png"
        },
        "EP12720086B1": {
            "patentid": "EP12720086B1",
            "path": "EP12720086NWB1",
            "title": "WINDKRAFTANLAGE",
            "pubdate": "20160413",
            "inventor": "Vogel, Werner/19089 Crivitz OT G\u00e4debehn\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11166156B1": {
            "patentid": "EP11166156B1",
            "path": "EP11166156NWB1",
            "title": "Verfahren zur Steuerung eines motorischen Antriebs zum Verstellen des Pitch eines Rotorblattes einer Windkraftanlage",
            "pubdate": "20150624",
            "inventor": "Ladra, Uwe/91056, Erlangen\u00a0(DE), Sch\u00e4fers, Elmar/90763, F\u00fcrth\u00a0(DE), Steinigeweg, Rolf-J\u00fcrgen/91074, Herzogenaurach\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10169066B1": {
            "patentid": "EP10169066B1",
            "path": "EP10169066NWB1",
            "title": "Wind turbine, drive train assembly, wind turbine nacelle system, methods for converting rotational energy and methods for building a nacelle and for re-equipping a wind turbine",
            "pubdate": "20160427",
            "inventor": "Hede, Ivan Arthur/7330, Brande\u00a0(DK), Hohle, Andreas Christian/52477, Alsdorf\u00a0(DE), Hohmann, Christian/45473, M\u00fclheim an der Ruhr\u00a0(DE), Kummer, Claudia/52066, Aachen\u00a0(DE), K\u00f6lpin, Helmut/52499, Baesweiler\u00a0(DE), Li, Ying/52070, Aachen\u00a0(DE), Tchemtchoua, Brice/4850, Montzen\u00a0(BE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11724610B1": {
            "patentid": "EP11724610B1",
            "path": "EP11724610NWB1",
            "title": "AN ASSEMBLY RIG FOR ASSEMBLING A WIND TURBINE TOWER OR WIND TURBINE TOWER SECTIONS",
            "pubdate": "20151028",
            "inventor": "Siemens Aktiengesellschaft/80333 M\u00fcnchen\u00a0(DE), Andresen Towers A/S/5550 Langeskov\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP09014764B1": {
            "patentid": "EP09014764B1",
            "path": "EP09014764NWB1",
            "title": "Brake system with expansion absorbing means, generator and wind turbine",
            "pubdate": "20160615",
            "inventor": "Lind, Soeren Oemann/4700 N\u00e6stve\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12008157B1": {
            "patentid": "EP12008157B1",
            "path": "EP12008157NWB1",
            "title": "Windenergieanlage",
            "pubdate": "20160511",
            "inventor": "Nickel, Viktor/22305 Hamburg\u00a0(DE), Nitzpon, Joachim/18209 Steffenshagen\u00a0(DE), K\u00e4stner, Bernhard/22848 Norderstedt\u00a0(DE), Faber, Axel/22083 Hamburg\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11728694B1": {
            "patentid": "EP11728694B1",
            "path": "EP11728694NWB1",
            "title": "POWER GENERATING APPARATUS OF RENEWABLE ENERGY TYPE AND METHOD OF OPERATING THE SAME",
            "pubdate": "20151028",
            "inventor": "ICHINOSE, Hidekazu/Tokyo 108-8215\u00a0(JP), TSUTSUMI, Kazuhisa/Tokyo 108-8215\u00a0(JP), SHIMIZU, Masayuki/Tokyo 108-8215\u00a0(JP), CALDWELL, Niall/Midlothian Lothian EH20 9TB\u00a0(GB), DUMNOV, Daniil/Midlothian Lothian EH20 9TB\u00a0(GB), RAMPEN, William/Midlothian Lothian EH20 9TB\u00a0(GB), LAIRD, Stephen/Midlothian Lothian EH20 9TB\u00a0(GB), PAPPALA, Venkata/London Greater London W1K 6WL\u00a0(GB)",
            "mainpicture": "imgb0001.png"
        },
        "EP10700993B1": {
            "patentid": "EP10700993B1",
            "path": "EP10700993NWB1",
            "title": "LIGHTNING PROTECTION SYSTEM",
            "pubdate": "20150304",
            "inventor": "LEWKE, Bastian/DK-7400 Herning\u00a0(DK), JENSEN, Martin, Johan, Smith/DK-7080 Borkop\u00a0(DK), OLSEN, Kaj/DK-8240 Riiskov\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP06024888B1": {
            "patentid": "EP06024888B1",
            "path": "EP06024888NWB1",
            "title": "Verfahren zum Betreiben einer Windenergieanlage",
            "pubdate": "20150610",
            "inventor": "Kabatzke, Wolfgang, Dr.-Ing./21502 Geesthacht\u00a0(DE), Richter, Kay/22846 Norderstedt\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP09718043B1": {
            "patentid": "EP09718043B1",
            "path": "EP09718043NWB1",
            "title": "COMPOSITES COMPRISING A MULTI-LAYER COATING SYSTEM",
            "pubdate": "20161221",
            "inventor": "CONNELLY, Bruce A./Gibsonia Pennsylvania 15044\u00a0(US), VALENTA, Jane N./Pittsburgh Pennsylvania 15208\u00a0(US)",
            "mainpicture": "imgb0001.png"
        },
        "EP11702856B1": {
            "patentid": "EP11702856B1",
            "path": "EP11702856NWB1",
            "title": "WIND TURBINE",
            "pubdate": "20160831",
            "inventor": "CASTELL MART\u00cdNEZ, Daniel/E-08005 Barcelona\u00a0(ES), CASANOVAS BERMEJO, Carlos/E-08005 Barcelona\u00a0(ES), CANEDO PARDO, Santiago/08037 Barcelona\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP10711622B1": {
            "patentid": "EP10711622B1",
            "path": "EP10711622NWB1",
            "title": "OFFSHORE WIND PARK",
            "pubdate": "20171220",
            "inventor": "DE BOER, Gerlof Johannes/NL-2171 KG Sassenheim\u00a0(NL)",
            "mainpicture": "imgf0001.png"
        },
        "EP11776075B1": {
            "patentid": "EP11776075B1",
            "path": "EP11776075NWB1",
            "title": "WIND TURBINE POWER TRANSMISSION SYSTEM AND METHOD OF INSTALLING A WIND FARM INCLUDING SAME",
            "pubdate": "20150603",
            "inventor": "R\u00dcSCHOFF, Ralf/45711 Datteln\u00a0(DE), MONGEAU, Peter/Center Conway, NH 03813\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP09771491B1": {
            "patentid": "EP09771491B1",
            "path": "EP09771491NWB1",
            "title": "WIND TURBINE WITH VIBRATION DAMPING SYSTEM AND METHOD",
            "pubdate": "20150701",
            "inventor": "PEDERSEN, Gunnar Kamp Storgaard/DK-6900 Sk ern\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11761492B1": {
            "patentid": "EP11761492B1",
            "path": "EP11761492NWB1",
            "title": "CONVERTIBLE BEARING FOR A WIND TURBINE AND METHOD FOR OPERATING SAME",
            "pubdate": "20160413",
            "inventor": "WADEHN, J\u00f6rg/24109 Melsdorf\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12007019B1": {
            "patentid": "EP12007019B1",
            "path": "EP12007019NWB1",
            "title": "Verfahren zum Betreiben einer Windenergieanlage und Windenergieanlage zur Ausf\u00fchrung des Verfahrens",
            "pubdate": "20170322",
            "inventor": "Tode, Siegfried/20251 Hamburg\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12382077B1": {
            "patentid": "EP12382077B1",
            "path": "EP12382077NWB1",
            "title": "Method of operating a wind turbine",
            "pubdate": "20160824",
            "inventor": "Betran Palomas, Jaume/08172 Sant Cugat Del Vall\u00e8s\u00a0(ES)",
            "mainpicture": "imgb0001.png"
        },
        "EP13151143B1": {
            "patentid": "EP13151143B1",
            "path": "EP13151143NWB1",
            "title": "Wind turbine rotor blade de-icing arrangement",
            "pubdate": "20170517",
            "inventor": "Madsen, Finn Daugaard/7190 Billund\u00a0(DK), Westergaard, Martin/9000 Aalborg\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP13170869B1": {
            "patentid": "EP13170869B1",
            "path": "EP13170869NWB1",
            "title": "Flanschteil f\u00fcr einen Turm einer Windkraftanalge",
            "pubdate": "20171115",
            "inventor": "Wolf, Dietmar/57234 Wilnsdorf\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12724386B1": {
            "patentid": "EP12724386B1",
            "path": "EP12724386NWB1",
            "title": "WIND TURBINE",
            "pubdate": "20150506",
            "inventor": "CASAZZA, Matteo/I-39049 Val Di Vizze\u00a0(IT), PABST, Otto/I-39037 Rio Di Pusteria\u00a0(IT), FASOLO, Alessandro/I-39049 Vipiteno\u00a0(IT)",
            "mainpicture": "imgf0001.png"
        },
        "EP12704037B1": {
            "patentid": "EP12704037B1",
            "path": "EP12704037NWB1",
            "title": "VERFAHREN ZUM BESTIMMEN ENTGANGENER ENERGIE",
            "pubdate": "20161012",
            "inventor": "BOHLEN, Werner Hinrich/26723 Emden\u00a0(DE), BRAGA, Nuno/P-4450-240 Matosinhos\u00a0(PT), SCHMITZ, Andreas/P-4450-349 Leca da Palmeira\u00a0(PT)",
            "mainpicture": "imgb0001.png"
        },
        "EP12724566B1": {
            "patentid": "EP12724566B1",
            "path": "EP12724566NWB1",
            "title": "A WIND FARM AND A METHOD OF OPERATING A WIND FARM",
            "pubdate": "20171011",
            "inventor": "KJ\u00c6R, Martin Ansbjerg/DK-8462 Harlev J\u00a0(DK), ZAIB, Ali/DK-9000 Aalborg\u00a0(DK), MIRANDA, Erik Carl Lehnskov/DK-8940 Randers SV\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP07724417B1": {
            "patentid": "EP07724417B1",
            "path": "EP07724417NWB1",
            "title": "ROTORBLATT MIT EINEM ROTORBLATTANSCHLUSS EINER WINDENERGIEANLAGE",
            "pubdate": "20160831",
            "inventor": "QUELL, Peter/24783 Osterr\u00f6nfeld\u00a0(DE), BENDEL, Urs/24787 Fockbek\u00a0(DE), SCHUBERT, Matthias/24768 Rendsburg\u00a0(DE), EUSTERBARKEY, Carsten/25813 Simonsberg\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP05009780B1": {
            "patentid": "EP05009780B1",
            "path": "EP05009780NWB1",
            "title": "Blattverstellsystem f\u00fcr Windenergieanlage",
            "pubdate": "20151014",
            "inventor": "Schubert, Matthias/24768 Rendsburg\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12183310B1": {
            "patentid": "EP12183310B1",
            "path": "EP12183310NWB1",
            "title": "A transport system for a wind turbine blade",
            "pubdate": "20150617",
            "inventor": "Thomsen, Jens/7330 Brande\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12002404B1": {
            "patentid": "EP12002404B1",
            "path": "EP12002404NWB1",
            "title": "Windkraftanlage",
            "pubdate": "20160608",
            "inventor": "Reitmaier, Marc/33189 Schlangen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP06124287B1": {
            "patentid": "EP06124287B1",
            "path": "EP06124287NWB1",
            "title": "Segment for a tower of a wind energy turbine and method for arranging operating components of a wind energy turbine in a tower thereof",
            "pubdate": "20170222",
            "inventor": "Meiners, Karl-Heinz/48485 Neuenkirchen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11164589B1": {
            "patentid": "EP11164589B1",
            "path": "EP11164589NWB1",
            "title": "Direct drive wind turbine with a thermal control system",
            "pubdate": "20151021",
            "inventor": "Eriksen, Uffe/8700, Horsens\u00a0(DK), Soerensen, Steffen/8382, Hinnerup\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11166240B1": {
            "patentid": "EP11166240B1",
            "path": "EP11166240NWB1",
            "title": "Air bleeding arrangement",
            "pubdate": "20151021",
            "inventor": "Pedersen, Niels Allan/6740, Bramming\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12740417B1": {
            "patentid": "EP12740417B1",
            "path": "EP12740417NWB1",
            "title": "OFFSHORE WIND POWER TURBINE",
            "pubdate": "20160831",
            "inventor": "RYLKE, Antoni/PL-81-425 Gdynia\u00a0(PL), ZAWADZKI, Krzysztof/PL-81-594 Gdynia\u00a0(PL)",
            "mainpicture": "imgf0001.png"
        },
        "EP12828362B1": {
            "patentid": "EP12828362B1",
            "path": "EP12828362NWB1",
            "title": "APPARATUS FOR MAINTAINING WIND TURBINE BLADES",
            "pubdate": "20161207",
            "inventor": "LEE, Byung Kyu/Geoje-si Gyeongsangnam-do 656-779\u00a0(KR), KIM, Hong Gyeoum/Daejeon 306-768\u00a0(KR), LEE, Jong Hwan/Daejeon 305-810\u00a0(KR), CHO, Young Seok/Daejeon 305-810\u00a0(KR), HA, Young Youl/Seoul 135-917\u00a0(KR), HA, In Chul/Geoje-si Gyeongsangnam-do 656-763\u00a0(KR), HAN, Dong Ki/Gwangmyeong-si Gyeonggi-do 423-780\u00a0(KR)",
            "mainpicture": "imgf0001.png"
        },
        "EP11190276B1": {
            "patentid": "EP11190276B1",
            "path": "EP11190276NWB1",
            "title": "A wind turbine blade",
            "pubdate": "20150916",
            "inventor": "Enevoldsen, Peder Bay/7100 Vejle\u00a0(DK), Thrue, Carsten/8740 Braedstrup\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP05447237B1": {
            "patentid": "EP05447237B1",
            "path": "EP05447237NWB1",
            "title": "Device and method for offshore installations",
            "pubdate": "20170510",
            "inventor": "Van den Bergh, Peter/2540 Hove\u00a0(BE), Ockier, Martin/9090 Melle\u00a0(BE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12711622B1": {
            "patentid": "EP12711622B1",
            "path": "EP12711622NWB1",
            "title": "WINDENERGIEANLAGE UND VERFAHREN ZUM BETREIBEN EINER WINDENERGIEANLAGE",
            "pubdate": "20160928",
            "inventor": "BEEKMANN, Alfred/26639 Wiesmoor\u00a0(DE), de Boer, Wolfgang/26802 Moormerland\u00a0(DE)",
            "mainpicture": "imgb0001.png"
        },
        "EP07110196B1": {
            "patentid": "EP07110196B1",
            "path": "EP07110196NWB1",
            "title": "Apparatus for balancing a rotor",
            "pubdate": "20170215",
            "inventor": "Pierce, Kirk Gee/Simpsonville, SC 29681\u00a0(US), Slack, Robert Peter/Greenville, SC 29609\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP13161037B1": {
            "patentid": "EP13161037B1",
            "path": "EP13161037NWB1",
            "title": "A\u00e9rog\u00e9n\u00e9rateur comprenant un ralentisseur \u00e9lectro-magn\u00e9tique pour ralentir la vitesse de rotations des pales",
            "pubdate": "20150715",
            "inventor": "Bousquet, J\u00e9r\u00f4me/85550 La Barre-De-Monts\u00a0(FR), Dybowski, Lionel/77220 Presles En Brie\u00a0(FR)",
            "mainpicture": "imgf0001.png"
        },
        "EP11195353B1": {
            "patentid": "EP11195353B1",
            "path": "EP11195353NWB1",
            "title": "Control system for a wind park",
            "pubdate": "20170614",
            "inventor": "Hansen, Ulrich Vestergaard B./7400 Herning\u00a0(DK), Kulkarni, Vivek/82008 Unterhaching\u00a0(DE), Hoejgaard, Jannik/7330 Brande\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11846474B1": {
            "patentid": "EP11846474B1",
            "path": "EP11846474NWB1",
            "title": "NACELLE ROOF STRUCTURE OF WIND TURBINE GENERATOR",
            "pubdate": "20160511",
            "inventor": "KAMIBAYASHI, Masakazu/Tokyo 108-8215\u00a0(JP), HIRANO, Haruhiko/Tokyo 108-8215\u00a0(JP), NUMAJIRI, Tomohiro/Tokyo 108-8215\u00a0(JP), ITO, Kenji/Yokohama-shi Kanagawa 231-8715\u00a0(JP), HONDA, Ikuo/Yokohama-shi Kanagawa 231-8715\u00a0(JP), FUJIOKA, Yoshihiro/Nagasaki-shi Nagasaki 850-8610\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP08007886B1": {
            "patentid": "EP08007886B1",
            "path": "EP08007886NWB1",
            "title": "Drehzahlbestimmung",
            "pubdate": "20150729",
            "inventor": "Kr\u00fcger, Thomas/24784 Westerr\u00f6nfeld\u00a0(DE)",
            "mainpicture": "imgb0001.png"
        },
        "EP12306302B1": {
            "patentid": "EP12306302B1",
            "path": "EP12306302NWB1",
            "title": "Anordnung zum Schutz von elektrischen Leitungen gegen mechanische Besch\u00e4digungen",
            "pubdate": "20150107",
            "inventor": "Gr\u00f6gl, Ferdinand/90403 N\u00fcrnberg\u00a0(DE), Gemmel, Alfred/90562 Kalchreuth\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP14180214B1": {
            "patentid": "EP14180214B1",
            "path": "EP14180214NWB1",
            "title": "Verfahren zum Errichten eines Turms einer Windenergieanlage",
            "pubdate": "20171227",
            "inventor": "van Ohlen, Hermann/26529 Upgant-Schott\u00a0(DE), H\u00f6lscher, Norbert/26607 Aurich\u00a0(DE), Honczek, Michael/26632 Ihlow\u00a0(DE), Kapitza, Jan/26629 Gro\u00dfefehn\u00a0(DE), Buck, Ralf/26736 Krummh\u00f6rn\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP07702466B1": {
            "patentid": "EP07702466B1",
            "path": "EP07702466NWB1",
            "title": "A WIND TURBINE WITH A DRIVE TRAIN",
            "pubdate": "20160720",
            "inventor": "BECH, Anton/DK-6950 Ringk\u00f8bing\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12810063B1": {
            "patentid": "EP12810063B1",
            "path": "EP12810063NWB1",
            "title": "A RING SHAPED FLANGE FOR ATTACHMENT OF A WIND TURBINE TOWER SECTION TO ANOTHER TOWER SECTION",
            "pubdate": "20151028",
            "inventor": "JENSEN, Michael/DK-6705 Esbjerg \u00d8\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP08784435B1": {
            "patentid": "EP08784435B1",
            "path": "EP08784435NWB1",
            "title": "WIND TURBINE BLADE",
            "pubdate": "20161019",
            "inventor": "FUGLSANG, Peter/DK-7100 Vejle\u00a0(DK), BOVE, Stefano/DK-6640 Lunderskov\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10193679B1": {
            "patentid": "EP10193679B1",
            "path": "EP10193679NWB1",
            "title": "Verfahren zum Betreiben einer Windenergieanlage",
            "pubdate": "20150304",
            "inventor": "Eusterbarkey, Carsten/25813, Simonsberg\u00a0(DE), Altemark, Jens/24768, Rendsburg\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12004208B1": {
            "patentid": "EP12004208B1",
            "path": "EP12004208NWB1",
            "title": "Wind turbine and method to prevent equipment corrosion from humid ambient air entry",
            "pubdate": "20160803",
            "inventor": "Sabhapathy, Peri/23320 Virginia\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP11799223B1": {
            "patentid": "EP11799223B1",
            "path": "EP11799223NWB1",
            "title": "METHOD AND APPARATUS FOR CONTROLLING A POWER CONVERTER DURING LOW (ZERO)-VOLTAGE RIDE-THROUGH CONDITIONS",
            "pubdate": "20171011",
            "inventor": "PETTER, Jeffrey K./Barre, VT 05641\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP11852207B1": {
            "patentid": "EP11852207B1",
            "path": "EP11852207NWB1",
            "title": "WIND TURBINE WITH A MECHANISM FOR SYNCHRONOUSLY VARYING THE PITCH OF A MULTI-BLADE ROTOR",
            "pubdate": "20150527",
            "inventor": "LIU, Jin Peng/Shanghai 201611\u00a0(CN), YUAN, Wei/Shanghai 201611\u00a0(CN), ZHOU, Shao Jun/Shanghai 201611\u00a0(CN)",
            "mainpicture": "imgf0001.png"
        },
        "EP10162100B1": {
            "patentid": "EP10162100B1",
            "path": "EP10162100NWB1",
            "title": "A wind turbine",
            "pubdate": "20151014",
            "inventor": "Gjerl\u00f8v, Christian/DK-8200, \u00c5rhus N\u00a0(DK), Graugaard, Jesper/DK-8920, Randers NV\u00a0(DK), Jakobsen, Aleks Kvartborg/DK-8000, \u00c5rhus C\u00a0(DK), J\u00f8rgensen, Martin/DK-8732, Hovedg\u00e5rd\u00a0(DK), Simonsen, Kenneth/DK-8370, Hadsten\u00a0(DK), Thesbjerg, Leo/DK-6950, Ringk\u00f8bing\u00a0(DK), \u00d8stergaard, Kasper Zinck/8762 Flemming\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10163335B1": {
            "patentid": "EP10163335B1",
            "path": "EP10163335NWB1",
            "title": "Boundary layer fins for wind turbine blade",
            "pubdate": "20161019",
            "inventor": "Anjuri, EswaraRao VSJ/(Dt.) - 531001 Visakhapatnam\u00a0(IN), Herr, Stefan/Greenville, SC 29601\u00a0(US), Vemuri, Tito K./560093 Bangalore\u00a0(IN)",
            "mainpicture": "imgf0001.png"
        },
        "EP11758125B1": {
            "patentid": "EP11758125B1",
            "path": "EP11758125NWB1",
            "title": "BLATTANSCHLUSS EINES ROTORBLATTS EINER WINDENERGIEANLAGE",
            "pubdate": "20151118",
            "inventor": "ZELLER, Lenz, Simon/24242 Felde\u00a0(DE), WERNER, Markus/24103 Kiel\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11776809B1": {
            "patentid": "EP11776809B1",
            "path": "EP11776809NWB1",
            "title": "T\u00dcRVERRIEGELUNG",
            "pubdate": "20160427",
            "inventor": "GEIKEN, Peter/26721 Emden\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11804635B1": {
            "patentid": "EP11804635B1",
            "path": "EP11804635NWB1",
            "title": "METHOD AND APPARATUS FOR HANDLING WIND TURBINE COMPONENTS DURING TRANSPORT AND ASSEMBLY",
            "pubdate": "20170719",
            "inventor": "FRIIS, Jesper Fyhn/DK-6800 Varde\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10194832B1": {
            "patentid": "EP10194832B1",
            "path": "EP10194832NWB1",
            "title": "Rotor blade for use with a wind turbine",
            "pubdate": "20170927",
            "inventor": "Rao, Kavala Venkateswara/560066, Bangalore, Karnataka\u00a0(IN), Sultan, Mohamad/Greenville, SC 29615-4614\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP11709499B1": {
            "patentid": "EP11709499B1",
            "path": "EP11709499NWB1",
            "title": "FLOW CONTROL ON A VERTICAL AXIS WIND TURBINE (VAWT)",
            "pubdate": "20150923",
            "inventor": "GREENBLATT, David/34991 Haifa\u00a0(IL), SASSON, Benyamin/34991 Haifa\u00a0(IL), SCHULMAN, Magen/46151 Herzliya\u00a0(IL)",
            "mainpicture": "imgb0001.png"
        },
        "EP10805664B1": {
            "patentid": "EP10805664B1",
            "path": "EP10805664NWB1",
            "title": "A VARIABLE SPEED WIND TURBINE, AND A METHOD FOR OPERATING THE VARIABLE SPEED WIND TURBINE DURING A POWER IMBALANCE EVENT",
            "pubdate": "20150422",
            "inventor": "GUPTA, Amit Kumar/Singapore 120601\u00a0(SG), OPINA, Gil Jr Lampong/Singapore 737917\u00a0(SG), TRIPATHI, Anshuman/Singapore 658882\u00a0(SG), KARUPPANAN, Yugarajan/Singapore 600224\u00a0(SG), TUMABCAO, Michael Casem/Singapore 730364\u00a0(SG)",
            "mainpicture": "imgf0001.png"
        },
        "EP10760295B1": {
            "patentid": "EP10760295B1",
            "path": "EP10760295NWB1",
            "title": "FOUNDATION STRUCTURE FOR WIND TURBINE",
            "pubdate": "20161102",
            "inventor": "STIESDAL, Henrik/5000 Odense C\u00a0(DK), OESTERGAARD, Thomas/6000 Kolding\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11751807B1": {
            "patentid": "EP11751807B1",
            "path": "EP11751807NWB1",
            "title": "ROTOR BLADE FOR WIND TURBINE WITH MOVABLE CONTROL SURFACE",
            "pubdate": "20151014",
            "inventor": "CHANG, Yun Chong Gabriel/Singapore 682297\u00a0(SG), LOH, Wuh Ken/Singapore 640821\u00a0(SG)",
            "mainpicture": "imgf0001.png"
        },
        "EP08775948B1": {
            "patentid": "EP08775948B1",
            "path": "EP08775948NWB1",
            "title": "VERTICAL AXIS TURBINE",
            "pubdate": "20161123",
            "inventor": "Vince, Dale/Stroud, Gloucestershire GL5 3AP\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP13001038B1": {
            "patentid": "EP13001038B1",
            "path": "EP13001038NWB1",
            "title": "Methods and systems for alleviating loads in off-shore wind turbines",
            "pubdate": "20160831",
            "inventor": "Plano Morillo, Eugenio/48170 Zamudio (Bizkaia)\u00a0(ES), Fernandez Romero, Ignacio/31621 Sarriguren\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP11757958B1": {
            "patentid": "EP11757958B1",
            "path": "EP11757958NWB1",
            "title": "OIL SUPPLY IN RENEWABLE ENERGY TURBINE GENERATOR",
            "pubdate": "20150304",
            "inventor": "STEIN, Uwe/Loanhead, Midlothian, EH20 9TB\u00a0(GB), FOX, Robert/Loanhead, Midlothian, EH20 9TB\u00a0(GB), ROBERTSON, Alasdair/Loanhead, Midlothian, EH20 9TB\u00a0(GB), RAMPEN, William/Loanhead, Midlothian, EH20 9TB\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP12382345B1": {
            "patentid": "EP12382345B1",
            "path": "EP12382345NWB1",
            "title": "Method of operating a wind turbine",
            "pubdate": "20150408",
            "inventor": "Picard, Thomas/08029 Barcelona\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP12183146B1": {
            "patentid": "EP12183146B1",
            "path": "EP12183146NWB1",
            "title": "A braking system",
            "pubdate": "20150506",
            "inventor": "Nielsen, Poul Sejer/5220 Odense S\u00d8\u00a0(DK), Hornskov, Peter/5250 Odense SV\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11008364B1": {
            "patentid": "EP11008364B1",
            "path": "EP11008364NWB1",
            "title": "Wind turbine having an active pitch angle control during idling situation",
            "pubdate": "20160629",
            "inventor": "Gomez De Las Heras Carbonell, Enrique/28043 Madrid\u00a0(ES), Hernandez Mascarell, Octavio/28043 Madrid\u00a0(ES), Suarez Aizpun, Jaime/28043 Madrid\u00a0(ES)",
            "mainpicture": "imgb0001.png"
        },
        "EP10713095B1": {
            "patentid": "EP10713095B1",
            "path": "EP10713095NWB1",
            "title": "SYSTEM AND METHOD FOR UMBRELLA POWER GENERATION",
            "pubdate": "20160316",
            "inventor": "ZHANG, Jianjun/Cupertino, CA 95014\u00a0(US), ZOU, Nanzhi/Fremont, CA 94539\u00a0(US), ZHOU, Wang-Long/Andover, MA 01810\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP10154542B1": {
            "patentid": "EP10154542B1",
            "path": "EP10154542NWB1",
            "title": "A foundation for a wind turbine and a method of making a foundation for a wind turbine",
            "pubdate": "20150722",
            "inventor": "\u00d8llgaard, B\u00f8rge/DK-6700, Esbjerg\u00a0(DK), Jensen, S\u00f8ren Poul/DK-6800, Varde\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12199060B1": {
            "patentid": "EP12199060B1",
            "path": "EP12199060NWB1",
            "title": "Installation apparatus and method of mounting a wind turbine",
            "pubdate": "20151216",
            "inventor": "Poulsen, Henning/6900 Skjern\u00a0(DK), Soeholm, Kristian/7120 Vejle \u00d8st\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11758113B1": {
            "patentid": "EP11758113B1",
            "path": "EP11758113NWB1",
            "title": "An apparatus for and method of mounting wind turbine blades on a wind turbine tower",
            "pubdate": "20151021",
            "inventor": "MORTENSEN, Henning/DK-8960 Randers S\u00d8\u00a0(DK), KRUUSE, S\u00f8ren Hvolgaard/DK-9990 Skagen\u00a0(DK), BOTWRIGHT, Adrian/DK-8471 Sabro\u00a0(DK), PEDERSEN, Gunnar K. Storgaard/DK-6900 Skjern\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10732367B1": {
            "patentid": "EP10732367B1",
            "path": "EP10732367NWB1",
            "title": "WINDKRAFTANLAGE UND VERFAHREN ZUR BETRIEBSSTEUERUNG EINER WINDKRAFTANLAGE",
            "pubdate": "20160907",
            "inventor": "SORG, Johannes/88213 Ravensburg\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11730886B1": {
            "patentid": "EP11730886B1",
            "path": "EP11730886NWB1",
            "title": "APPARATUS AND METHOD FOR REDUCING YAW ERROR IN WIND TURBINES",
            "pubdate": "20170322",
            "inventor": "BOWYER, Robert/London SW6 6LE\u00a0(GB), CREABY, Justin/80021 Broomfield, CO\u00a0(US)",
            "mainpicture": "imgb0001.png"
        },
        "EP12737475B1": {
            "patentid": "EP12737475B1",
            "path": "EP12737475NWB1",
            "title": "CHORDWISE LAY-UP OF FIBRE SHEET MATERIAL FOR TURBINE BLADES",
            "pubdate": "20171018",
            "inventor": "BECH, Anton/DK-6950 Ringk\u00f8bing\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP09715100B1": {
            "patentid": "EP09715100B1",
            "path": "EP09715100NWB1",
            "title": "OFFSHORE WIND AND WAVE  POWER GENERATION SYSTEM AND METHOD THEREOF",
            "pubdate": "20160323",
            "inventor": "WILLE, Hein/F-06360 Eze\u00a0(FR), BOUREAU, Sophie/FR-06000 Nice\u00a0(FR)",
            "mainpicture": "imgf0001.png"
        },
        "EP12856233B1": {
            "patentid": "EP12856233B1",
            "path": "EP12856233NWB1",
            "title": "WIND TURBINE BLADE AND WIND TURBINE GENERATOR",
            "pubdate": "20160120",
            "inventor": "FUJIOKA, Hideyasu/Tokyo 108-8215\u00a0(JP), SHIBATA, Masaaki/Tokyo 108-8215\u00a0(JP), CREMER, Andreas/London, Greater London W1K 6WL\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP09784855B1": {
            "patentid": "EP09784855B1",
            "path": "EP09784855NWB1",
            "title": "METHOD AND APPARATUS FOR TOWING OFFSHORE WIND TURBINES",
            "pubdate": "20150107",
            "inventor": "NIELSEN, FInn, Gunnar/N-5152 B\u00f8nes\u00a0(NO)",
            "mainpicture": "imgb0001.png"
        },
        "EP10158643B1": {
            "patentid": "EP10158643B1",
            "path": "EP10158643NWB1",
            "title": "Wind turbine installation",
            "pubdate": "20160504",
            "inventor": "Stiesdal, Henrik/5000 Odense C\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11730891B1": {
            "patentid": "EP11730891B1",
            "path": "EP11730891NWB1",
            "title": "A WIND TURBINE COMPRISING A DETUNER",
            "pubdate": "20170322",
            "inventor": "MURASZEWSKI, Steffen/19055 Schwerin\u00a0(DE), JAKOBSEN, J\u00f8rgen/DK-9610 N\u00f8rager\u00a0(DK)",
            "mainpicture": "imgb0001.png"
        },
        "EP07764453B1": {
            "patentid": "EP07764453B1",
            "path": "EP07764453NWB1",
            "title": "A HANDLING SYSTEM FOR A WIND TURBINE NACELLE, METHODS FOR TRANSPORT AND VERTICAL DISPLACEMENT OF A WIND TURBINE NACELLE AND A USE OF A HANDLING SYSTEM",
            "pubdate": "20160907",
            "inventor": "PEDERSEN, Gunnar, Kamp, Storgaard/DK-6900 Skjern\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11163609B1": {
            "patentid": "EP11163609B1",
            "path": "EP11163609NWB1",
            "title": "Wind power turbine electric generator, and wind power turbine equipped with such an electric generator",
            "pubdate": "20160601",
            "inventor": "Gelmini, Emmanuele/38100, TRENTO\u00a0(IT)",
            "mainpicture": "imgf0001.png"
        },
        "EP12742905B1": {
            "patentid": "EP12742905B1",
            "path": "EP12742905NWB1",
            "title": "WIND TURBINE BLADE COMPRISING A VORTEX-GENERATOR",
            "pubdate": "20150930",
            "inventor": "KRISTENSEN, Jens J\u00f8rgen \u00d8stergaard/DK-9240 Nibe\u00a0(DK), LAMBORN, Chad/Donnellson, Iowa 52625\u00a0(US), TANGAGER, Kim/DK-9560 Hadsund\u00a0(DK), THRUE, Carsten/DK-8740 Braedstrup\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP06255505B1": {
            "patentid": "EP06255505B1",
            "path": "EP06255505NWB1",
            "title": "Blade for a rotor of a wind energy turbine",
            "pubdate": "20150506",
            "inventor": "Bonnet, Laurent/48432 Mesum\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12709840B1": {
            "patentid": "EP12709840B1",
            "path": "EP12709840NWB1",
            "title": "TRANSPORTGESTELL F\u00dcR DEN TRIEBSTRANG EINER WINDENERGIEANLAGE",
            "pubdate": "20170510",
            "inventor": "SCHULZ, Birger/24986 Satrup\u00a0(DE), L\u00dcTJEN, Jan/25585 L\u00fctjenweststedt\u00a0(DE), GAEDE, Stefan/24109 Kiel\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP06812802B1": {
            "patentid": "EP06812802B1",
            "path": "EP06812802NWB1",
            "title": "A METHOD FOR DAMPING TOWER VIBRATIONS IN A WIND TURBINE INSTALLATION",
            "pubdate": "20151209",
            "inventor": "NIELSEN, Finn, Gunnar/N-5152 B\u00f8nes\u00a0(NO), SKAARE, Bj\u00f8rn/7619 Skogn\u00a0(NO), TANDE, John, Olav, Gi\u00e6ver/7051 Trondheim\u00a0(NO), NORHEIM, Ian/2836 Biri\u00a0(NO), UHLEN, Kjetil/N-7033 Trondheim\u00a0(NO)",
            "mainpicture": "imgb0001.png"
        },
        "EP07722657B1": {
            "patentid": "EP07722657B1",
            "path": "EP07722657NWB1",
            "title": "A WIND TURBINE COMPRISING A DETUNER",
            "pubdate": "20160413",
            "inventor": "SLOTH, Erik Billeskov/8410 R\u00f8nde\u00a0(DK)",
            "mainpicture": "imgb0001.png"
        },
        "EP11726665B1": {
            "patentid": "EP11726665B1",
            "path": "EP11726665NWB1",
            "title": "WIND- UND STRAHLUNGSENERGIE-KOLLEKTOR-ANLAGE",
            "pubdate": "20151104",
            "inventor": "Wohllaib Karl/88453 Erolzheim\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP09749491B1": {
            "patentid": "EP09749491B1",
            "path": "EP09749491NWB1",
            "title": "ROTORBLATT MIT DARIN INTEGRIERTEM RADARABSORBER F\u00dcR EINE WINDKRAFTANLAGE",
            "pubdate": "20171004",
            "inventor": "BETTERMANN, Joachim/27755 Delmenhorst\u00a0(DE), FRYE, Andreas/28816 Stuhr\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12382068B1": {
            "patentid": "EP12382068B1",
            "path": "EP12382068NWB1",
            "title": "Advanced system for the installation of wire-climbing lifting devices on hollow towers",
            "pubdate": "20151014",
            "inventor": "Hoyos Irisarri, Miguel/28010 Madrid\u00a0(ES), Mercado Diez, Luis Ignacio/28010 Madrid\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP12708024B1": {
            "patentid": "EP12708024B1",
            "path": "EP12708024NWB1",
            "title": "WIND TURBINE ROTOR AND METHOD OF MOUNTING",
            "pubdate": "20151021",
            "inventor": "BORGEN, Eystein/N-5239 R\u00e5dal\u00a0(NO), S\u00c6TEN, Bj\u00f8rge/N-5226 Nesttun\u00a0(NO)",
            "mainpicture": "imgf0001.png"
        },
        "EP10182260B1": {
            "patentid": "EP10182260B1",
            "path": "EP10182260NWB1",
            "title": "Turm aus Spannbeton-Fertigteilen",
            "pubdate": "20150909",
            "inventor": "Der Erfinder hat auf seine Nennung verzichtet.",
            "mainpicture": "imgf0001.png"
        },
        "EP11194370B1": {
            "patentid": "EP11194370B1",
            "path": "EP11194370NWB1",
            "title": "Means to rotate the rotor of a wind turbine and method to rotate the rotor",
            "pubdate": "20150401",
            "inventor": "Falkenberg, Peter Loevenskjold/7400 Herning\u00a0(DK), Maj, Karl Aage/8450 Hammel\u00a0(DK), Poulsen, Henning/6900 Skjern\u00a0(DK), Stiesdal, Henrik/5000 Odense C\u00a0(DK), Nielsen, Jacob Blach/7442 Engesvang\u00a0(DK), Rasmussen, Brian/7323 Give\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11002782B1": {
            "patentid": "EP11002782B1",
            "path": "EP11002782NWB1",
            "title": "Antriebssystem f\u00fcr eine Windkraftanlage",
            "pubdate": "20160330",
            "inventor": "Dinter, Ralf Martin, Dr./45868 Gelsenkirchen\u00a0(DE), Klein-Hitpass, Arno/52074 Aachen\u00a0(DE), Reimers, Jan-Dirk/52074 Aachen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11164586B1": {
            "patentid": "EP11164586B1",
            "path": "EP11164586NWB1",
            "title": "Lightning protection system for a wind turbine and method for protecting components of a wind turbine against lightning strikes",
            "pubdate": "20150812",
            "inventor": "Lewke, Bastian/7400, Herning\u00a0(DK), Olsen, Kaj/8240, Riiskov\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12709236B1": {
            "patentid": "EP12709236B1",
            "path": "EP12709236NWB1",
            "title": "COMPOSITE PANEL WITH REINFORCED CORE",
            "pubdate": "20150527",
            "inventor": "DAY, Stephen W./Centerville, Ohio 45458\u00a0(US), SHEPPARD, Michael S./Centerville, Ohio 45459\u00a0(US), JONES, John P./Franklin, Ohio 45005\u00a0(US), EWRY, Thomas J./Trotwood, Ohio 45417\u00a0(US), TILTON, Danny E./Dayton, Ohio 45414\u00a0(US), STOLL, Frederick/West Chester, Ohio 45069\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP12382076B1": {
            "patentid": "EP12382076B1",
            "path": "EP12382076NWB1",
            "title": "wind turbine having a locking arrangement",
            "pubdate": "20160518",
            "inventor": "Cortada Acosta Pere/08195 Sant Cugat Del Vall\u00e8s\u00a0(ES), Ayneto Pou, Jordi/08338 Premi\u00e0 De Dalt\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP12712687B1": {
            "patentid": "EP12712687B1",
            "path": "EP12712687NWB1",
            "title": "WIND TURBINE BLADE HAVING A ROOT REGION WITH ELONGATED FASTENING MEMBERS PROVIDED WITH METAL FIBRES",
            "pubdate": "20150819",
            "inventor": "DAHL, Martin/24939 Flensburg\u00a0(DE), MORTENSEN, Bjarne Krab/DK-7190 Billund\u00a0(DK), HORNBLOW, Benjamin/DK-2100 Copenhagen \u00d8\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11172065B1": {
            "patentid": "EP11172065B1",
            "path": "EP11172065NWB1",
            "title": "Wind turbine blade pitch system",
            "pubdate": "20171220",
            "inventor": "Nielsen, S\u00f8ren/8240 Risskov\u00a0(DK), Nielsen, Jacob/8830 Tjele\u00a0(DK), Nielsen, Jens Bredal/7600 Struer\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP04028311B1": {
            "patentid": "EP04028311B1",
            "path": "EP04028311NWB1",
            "title": "Windenergieanlage",
            "pubdate": "20160803",
            "inventor": "Quell, Peter/24783 Osterr\u00f6nfeld\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12164657B1": {
            "patentid": "EP12164657B1",
            "path": "EP12164657NWB1",
            "title": "Planet pin and planetary gear system",
            "pubdate": "20160406",
            "inventor": "Erno, Daniel Jason/Niskayuna, NY New York 12309\u00a0(US), Lopez, Fulton Jose/Niskayuna, NY New York 12309\u00a0(US)",
            "mainpicture": "imgb0001.png"
        },
        "EP09162627B1": {
            "patentid": "EP09162627B1",
            "path": "EP09162627NWB1",
            "title": "Device and method for offshore mounting for electricity-generating wind-turbine",
            "pubdate": "20160309",
            "inventor": "Van den Bergh, Peter/2540 Hove\u00a0(BE), Ockier, Martin/9090 Melle\u00a0(BE)",
            "mainpicture": "imgf0001.png"
        },
        "EP09178594B1": {
            "patentid": "EP09178594B1",
            "path": "EP09178594NWB1",
            "title": "Method for determining a potential for icing on a wind turbine blade",
            "pubdate": "20150729",
            "inventor": "Ahmann, Udo/48282, Emsdetten\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP06756444B1": {
            "patentid": "EP06756444B1",
            "path": "EP06756444NWB1",
            "title": "HORIZONTAL AXIS WINDMILL",
            "pubdate": "20160817",
            "inventor": "YOSHIDA, Shigeo, c/o FUJI JUKOGYO KABUSHIKI KAISHA/Tokyo 160-8316\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP05815731B1": {
            "patentid": "EP05815731B1",
            "path": "EP05815731NWB1",
            "title": "OMNI-DIRECTIONAL WIND TURBINE",
            "pubdate": "20160727",
            "inventor": "SURESHAN, Vaheisvaran/Baulkham Hills, NSW 2153\u00a0(AU)",
            "mainpicture": "imgf0001.png"
        },
        "EP03026109B1": {
            "patentid": "EP03026109B1",
            "path": "EP03026109NWB1",
            "title": "Wind turbine with laser apparatus for measuring the wind velocity",
            "pubdate": "20161221",
            "inventor": "Yoshida, Yasuo, Mitsubishi Denki K.K./Tokyo 100-8310\u00a0(JP), Jimbo, Hiroshi, Mitsubishi Denki K.K./Tokyo 100-8310\u00a0(JP), Egami, Takatoshi, Mitsubishi Denki K.K./Tokyo 100-8310\u00a0(JP), Hirano, Yoshihito, Mitsubishi Denki K.K./Tokyo 100-8310\u00a0(JP), Ando, Toshiyuki, Mitsubishi Denki K.K./Tokyo 100-8310\u00a0(JP), Nakayama, Hiroshi, Mitsubishi Denki K.K./Tokyo 100-8310\u00a0(JP)",
            "mainpicture": "imgb0001.png"
        },
        "EP12183567B1": {
            "patentid": "EP12183567B1",
            "path": "EP12183567NWB1",
            "title": "Wind turbine sound management",
            "pubdate": "20160629",
            "inventor": "Attia, Sid Ahmed/12159 Berlin\u00a0(DE)",
            "mainpicture": "imgb0001.png"
        },
        "EP10755220B1": {
            "patentid": "EP10755220B1",
            "path": "EP10755220NWB1",
            "title": "FLUID-WORKING MACHINE WITH MULTI-LOBE RING CAM",
            "pubdate": "20150701",
            "inventor": "CALDWELL, Niall, James/Edinburgh EH15 2NH\u00a0(GB), DUMNOV, Daniil Sergeevich/Edinburgh EH3 9HP\u00a0(GB), RAMPEN, William, Hugh, Salvin/Edinburgh EH10 5AN\u00a0(GB), ROBERTSON, Alasdair, Ian, Fletcher/Livingston EH54 9ER\u00a0(GB), STEIN, Uwe, Bernhard, Pascal/Edinburgh EH15 2PT\u00a0(GB), FOX, Robert, George/Peebles EH45 9NA\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP10854039B1": {
            "patentid": "EP10854039B1",
            "path": "EP10854039NWB1",
            "title": "WIND POWER GENERATION SYSTEM AND WIND POWER GENERATION SYSTEM CONTROLLING METHOD",
            "pubdate": "20161102",
            "inventor": "SAKAMOTO, Kiyoshi/Hitachi-shi Ibaraki 317-8511\u00a0(JP), YANAGIBASHI, Takuji/Hitachi-shi Ibaraki 317-8511\u00a0(JP), HASEGAWA, Tsutomu/Hitachi-shi Ibaraki 317-8511\u00a0(JP), ICHINOSE, Masaya/Hitachi-shi Ibaraki 319-1293\u00a0(JP), MATSUNOBU, Takashi/Hitachi-shi Ibaraki 317-8511\u00a0(JP), AZEGAMI, Kenichi/Hitachi-shi Ibaraki 317-8511\u00a0(JP), UCHIYAMA, Noriyuki/Chiyoda-ku, Tokyo 100-8220\u00a0(JP)",
            "mainpicture": "imgb0001.png"
        },
        "EP10732719B1": {
            "patentid": "EP10732719B1",
            "path": "EP10732719NWB1",
            "title": "WIND TURBINE BLADE WITH NARROW SHOULDER AND RELATIVELY THICK AIRFOIL PROFILES",
            "pubdate": "20170104",
            "inventor": "MADSEN, Jesper/DK-6621 Gesten\u00a0(DK), ANDERSEN, Christian, Frank/DK-6000 Kolding\u00a0(DK), FUGLSANG, Peter/DK-7100 Vejle\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP06730421B1": {
            "patentid": "EP06730421B1",
            "path": "EP06730421NWB1",
            "title": "WINDMILL",
            "pubdate": "20170719",
            "inventor": "Zephyr Corporation/Minato-ku, Tokyo 107-0052\u00a0(JP), TORAY INDUSTRIES, INC./Tokyo 103-8666\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP11817458B1": {
            "patentid": "EP11817458B1",
            "path": "EP11817458NWB1",
            "title": "TOWER-INTERNAL-EQUIPMENT BRACKET STRUCTURE AND WIND TURBINE GENERATOR",
            "pubdate": "20170531",
            "inventor": "YOKOYAMA, Hiroaki/Tokyo 108-8215\u00a0(JP), ITOH, Yoshisuke/Tokyo 108-8215\u00a0(JP), KAWABATA, Minoru/Tokyo 108-8215\u00a0(JP), HARAGUCHI, Tsuyoshi/Nagasaki-shi Nagasaki 852-8003\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP13700700B1": {
            "patentid": "EP13700700B1",
            "path": "EP13700700NWB1",
            "title": "WIND TURBINE BLADE HAVING A GEOMETRIC SWEEP",
            "pubdate": "20170308",
            "inventor": "GILLING, Lasse/7100 Vejle\u00a0(DK), HANSEN, Henrik Fredslund/7700 Thisted\u00a0(DK), JOHNSON, Scott , J./Boulder, CO 80301\u00a0(US), OBRECHT, John, M./Louisville, CO 80027\u00a0(US), SIEVERS, Ryan, A./Lyons, CO 80540\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP07111892B1": {
            "patentid": "EP07111892B1",
            "path": "EP07111892NWB1",
            "title": "Apparatus for assembling rotary machines",
            "pubdate": "20170927",
            "inventor": "Rogail, Peter/48488, Emsburen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11807997B1": {
            "patentid": "EP11807997B1",
            "path": "EP11807997NWB1",
            "title": "IMPROVEMENTS IN AND RELATING TO WIND FARMS",
            "pubdate": "20170809",
            "inventor": "TOAL, Daniel/Limerick\u00a0(IE), PICAN, Emmanuel/County Tipperary\u00a0(IE), LEAHY, Martin/Limerick\u00a0(IE)",
            "mainpicture": "imgb0001.png"
        },
        "EP11166985B1": {
            "patentid": "EP11166985B1",
            "path": "EP11166985NWB1",
            "title": "Systems and methods for monitoring a condition of a rotor blade for a wind turbine",
            "pubdate": "20160323",
            "inventor": "Ahmann, Udo/48499, Salzbergen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP01119082B1": {
            "patentid": "EP01119082B1",
            "path": "EP01119082NWB1",
            "title": "Getriebe f\u00fcr Windgeneratoren",
            "pubdate": "20170517",
            "inventor": "H\u00f6sle, Helmut/86420 Diedorf\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12196975B1": {
            "patentid": "EP12196975B1",
            "path": "EP12196975NWB1",
            "title": "A wind turbine nacelle cover and a method for installing a generator on a mainframe in a nacelle",
            "pubdate": "20151028",
            "inventor": "Moestrup, Henning/8800 Viborg\u00a0(DK), Langfeldt, Per/8722 Hedensted\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12178689B1": {
            "patentid": "EP12178689B1",
            "path": "EP12178689NWB1",
            "title": "Wind park control system",
            "pubdate": "20150225",
            "inventor": "Bech, John/8450 Hammel\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12175650B1": {
            "patentid": "EP12175650B1",
            "path": "EP12175650NWB1",
            "title": "A method for manufacturing a wind turbine structure and a wind turbine structure",
            "pubdate": "20170614",
            "inventor": "Stege, Jason/7330 Brande\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP07100766B1": {
            "patentid": "EP07100766B1",
            "path": "EP07100766NWB1",
            "title": "Wind turbine dump load system",
            "pubdate": "20150729",
            "inventor": "Luetze, Henning/48455, Bad Bentheim\u00a0(DE), Edenfeld, Thomas/49082, Osnabruk\u00a0(DE), Gauchel, Peter/48155, Munster\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12809365B1": {
            "patentid": "EP12809365B1",
            "path": "EP12809365NWB1",
            "title": "ACTIVE WINDMILL WITH THE AXIS OF ROTATION TRANSVERSE TO THE DIRECTION OF THE WIND",
            "pubdate": "20160713",
            "inventor": "DOERFFER Piotr/PL-80-461 Gdansk\u00a0(PL)",
            "mainpicture": "imgf0001.png"
        },
        "EP07815993B1": {
            "patentid": "EP07815993B1",
            "path": "EP07815993NWB1",
            "title": "SYST\u00c8ME ET M\u00c9THODE POUR CONTR\u00d4LER UNE \u00c9OLIENNe",
            "pubdate": "20170531",
            "inventor": "GIRARDIN, Hugues/Kingsey Falls, Qu\u00e9bec, J0A 1B0\u00a0(CA)",
            "mainpicture": "imgb0001.png"
        },
        "EP11720971B1": {
            "patentid": "EP11720971B1",
            "path": "EP11720971NWB1",
            "title": "BLADE PITCH CONTROL DEVICE, WIND POWER GENERATOR, AND BLADE PITCH CONTROL METHOD",
            "pubdate": "20151014",
            "inventor": "NAGASAKI, Momoe/Tokyo 108-8215\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP11776410B1": {
            "patentid": "EP11776410B1",
            "path": "EP11776410NWB1",
            "title": "NOTBETRIEBSF\u00c4HIGE PITCHMOTOR-ANTRIEBSSCHALTUNG",
            "pubdate": "20150311",
            "inventor": "B\u00dcNTE, Andreas/33378 Rheda-Wiedenbr\u00fcck\u00a0(DE), WERTZ, Harald/59494 Soest\u00a0(DE), KLEINEN, Christian/58285 Gevelsberg\u00a0(DE), GILL, Harry/58300 Wetter\u00a0(DE)",
            "mainpicture": "imgb0001.png"
        },
        "EP12193586B1": {
            "patentid": "EP12193586B1",
            "path": "EP12193586NWB1",
            "title": "Slipformed concrete tower",
            "pubdate": "20150930",
            "inventor": "Stiesdal, Henrik/5000 Odense C\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12753580B1": {
            "patentid": "EP12753580B1",
            "path": "EP12753580NWB1",
            "title": "TOWER SECTION ALIGNMENT APPARATUS AND SYSTEM",
            "pubdate": "20150603",
            "inventor": "SPENCE, Ross/Aberdeen  Aberdeenshire AB24 1XE\u00a0(GB), RUSSELL, James/Newcastle-upon-Tyne NE3 5RA\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP08852042B1": {
            "patentid": "EP08852042B1",
            "path": "EP08852042NWB1",
            "title": "WIND FARM",
            "pubdate": "20160608",
            "inventor": "ALONSO S\u00c1DABA, Oscar/31621 Sarriguren (Navarra)\u00a0(ES), ROYO GARC\u00cdA, Ricardo/31621 Sarriguren (Navarra)\u00a0(ES), N\u00da\u00d1EZ POLO, Miguel/31621 Sarriguren (Navarra)\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP11713841B1": {
            "patentid": "EP11713841B1",
            "path": "EP11713841NWB1",
            "title": "VERFAHREN ZUM BETREIBEN EINER WINDENERGIEANLAGE",
            "pubdate": "20160921",
            "inventor": "DE BOER, Wolfgang/26802 Moormerland\u00a0(DE), EDEN, Georg/26556 Westerholt\u00a0(DE), BEEKMANN, Alfred/26639 Wiesmoor\u00a0(DE), LENSCHOW, Gerhard/26603 Aurich\u00a0(DE)",
            "mainpicture": "imgb0001.png"
        },
        "EP13168913B1": {
            "patentid": "EP13168913B1",
            "path": "EP13168913NWB1",
            "title": "Trailing edge tape",
            "pubdate": "20170412",
            "inventor": "Grabau, Peter/6000 Kolding\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11194121B1": {
            "patentid": "EP11194121B1",
            "path": "EP11194121NWB1",
            "title": "Methods of manufacturing wind turbine blades",
            "pubdate": "20170719",
            "inventor": "Hancock, Mark/Southampton, Hampshire SO15 5HN\u00a0(GB), Bech, Anton/6950 Ringk\u00f8bing\u00a0(DK), Verhoef, Rens Christiaan/6950 Ringk\u00f8bing\u00a0(DK), Gill, Adrian/East Cowes PO32 6RX\u00a0(GB), Gregory, Karl/Cowes PO31 8JY\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP13002472B1": {
            "patentid": "EP13002472B1",
            "path": "EP13002472NWB1",
            "title": "Wind system for converting energy through a vertical-axis turbine actuated by means of kites",
            "pubdate": "20150916",
            "inventor": "Ippolito, Massimo/I-14020 Berzano di San Pietro (AT)\u00a0(IT), Taddei, Franco/I-23896 Sirtori (LC)\u00a0(IT)",
            "mainpicture": "imgb0001.png"
        },
        "EP05716658B1": {
            "patentid": "EP05716658B1",
            "path": "EP05716658NWB1",
            "title": "ROTORBLATT EINER WINDENERGIEANLAGE",
            "pubdate": "20170809",
            "inventor": "Wobben, Aloys/26607 Aurich\u00a0(DE)",
            "mainpicture": "imgb0001.png"
        },
        "EP11784749B1": {
            "patentid": "EP11784749B1",
            "path": "EP11784749NWB1",
            "title": "CORE FOR A COMPOSITE STRUCTURE AND METHOD OF FABRICATION THEREOF",
            "pubdate": "20150318",
            "inventor": "APPLETON, Steve/GU52 7LU\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP08150513B1": {
            "patentid": "EP08150513B1",
            "path": "EP08150513NWB1",
            "title": "Separable blade for wind turbine",
            "pubdate": "20150923",
            "inventor": "Kita, Masakazu/Shinjuku-ku  Shinjuku-ku Tokyo 160-0023\u00a0(JP), Kominato, Yuki/Shinjuku-ku  Shinjuku-ku Tokyo 160-0023\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP07737403B1": {
            "patentid": "EP07737403B1",
            "path": "EP07737403NWB1",
            "title": "WIND POWER GENERATION SYSTEM, AND CONTROL METHOD THEREFOR",
            "pubdate": "20160914",
            "inventor": "Mitsubishi Heavy Industries, Ltd./Minato-ku Tokyo 108-8215\u00a0(JP), MHI Vestas Offshore Wind A/S/8200 Aarhus N\u00a0(DK)",
            "mainpicture": "imgb0001.png"
        },
        "EP07764452B1": {
            "patentid": "EP07764452B1",
            "path": "EP07764452NWB1",
            "title": "A HANDLING SYSTEM FOR A WIND TURBINE NACELLE, A METHOD FOR VERTICAL DISPLACEMENT OF A WIND TURBINE NACELLE AND A WIND TURBINE NACELLE",
            "pubdate": "20161102",
            "inventor": "PEDERSEN, Gunnar, Kamp, Storgaard/DK-6900 Skjern\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12799130B1": {
            "patentid": "EP12799130B1",
            "path": "EP12799130NWB1",
            "title": "A WIND TURBINE BLADE CONTROL METHOD",
            "pubdate": "20160615",
            "inventor": "B\u00c6K, Peter/DK-6000 Kolding\u00a0(DK), ANDERSEN, Christian Frank/DK-6000 Kolding\u00a0(DK), SLOT, Mark Olaf/DK-8654 Bryrup\u00a0(DK), SKOVBY, Casper/DK-6700 Esbjerg\u00a0(DK), BOJESEN, Simon Berg/DK-6000 Kolding\u00a0(DK), RAVN, Morten/DK-6000 Kolding\u00a0(DK), KLITGAARD, Michael/DK-5260 Odense S\u00a0(DK)",
            "mainpicture": "imgb0001.png"
        },
        "EP11720437B1": {
            "patentid": "EP11720437B1",
            "path": "EP11720437NWB1",
            "title": "VERSTELLPROPELLER ODER -REPELLER",
            "pubdate": "20161130",
            "inventor": "KRACKHARDT, Ernst-Christoph/22869 Schenefeld\u00a0(DE), M\u00dcLLER, Christian Norbert/22969 Witzhave\u00a0(DE), SCHR\u00d6DER, Dierk/24238 Selent\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP14153789B1": {
            "patentid": "EP14153789B1",
            "path": "EP14153789NWB1",
            "title": "Cooling device for a wind turbine generator",
            "pubdate": "20161026",
            "inventor": "Kamibayashi, Masakazu/Tokyo, 108-8215\u00a0(JP), Fujioka, Yoshihiro/Yokohama-shi, 231-8715\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP11009426B1": {
            "patentid": "EP11009426B1",
            "path": "EP11009426NWB1",
            "title": "Verfahren zur \u00dcberwachung einer statischen und/oder dynamischen Stabilit\u00e4t einer Windenergieanlage",
            "pubdate": "20170308",
            "inventor": "Drossel, Detlef/22851 Norderstedt\u00a0(DE), Harms, Ulrich/22399 Hamburg\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12745451B1": {
            "patentid": "EP12745451B1",
            "path": "EP12745451NWB1",
            "title": "ARRETIERUNGSVORRICHTUNG F\u00dcR WINDTURBINEN",
            "pubdate": "20160713",
            "inventor": "FRITZSCHE, Mario/14471 Potsdam\u00a0(DE), SCHORER, Frank/14482 Potsdam\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP06807857B1": {
            "patentid": "EP06807857B1",
            "path": "EP06807857NWB1",
            "title": "METHOD OF MAINTAINING WIND TURBINE COMPONENTS OPERATIONAL AND A TURBINE COMPRISING COMPONENTS SUITABLE FOR OPERATIONAL MAINTENANCE",
            "pubdate": "20150902",
            "inventor": "LLORENTE GONZ\u00c1LEZ, Jos\u00e9 Ignacio, Gamesa Innovation and Technology,S.L./Edificio 100, 48170 Zamudio\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP09167385B1": {
            "patentid": "EP09167385B1",
            "path": "EP09167385NWB1",
            "title": "System and method for damping vibrations in a wind turbine",
            "pubdate": "20160525",
            "inventor": "Rodriguez Tsouroukdissian, Arturo/08011, Barcelona\u00a0(ES)",
            "mainpicture": "imgb0001.png"
        },
        "EP11712289B1": {
            "patentid": "EP11712289B1",
            "path": "EP11712289NWB1",
            "title": "VARIABLE DISPLACEMENT RADIAL PISTON FLUID WORKING MACHINE",
            "pubdate": "20150819",
            "inventor": "SALTER, Stephen, Hugh/Edinburgh EH9 2DT\u00a0(GB), RAMPEN, William, Hugh, Salvin/Edinburgh EH10 5AN\u00a0(GB), STEIN, Uwe, Bernhard, Pascal/Edinburgh EH15 2PT\u00a0(GB), FOX, Robert, George/Peebles EH45 9NA\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP11002097B1": {
            "patentid": "EP11002097B1",
            "path": "EP11002097NWB1",
            "title": "Bogie plate for wind turbine",
            "pubdate": "20150211",
            "inventor": "Saenz de Ugarte Sevilla, Patrick/48170 Zamudio- Bizkaia\u00a0(ES), Zabala Zabala, Jose Maria/20159 Asteasu-Guipuzcoa\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP11176017B1": {
            "patentid": "EP11176017B1",
            "path": "EP11176017NWB1",
            "title": "Wind power generator with hinged wings",
            "pubdate": "20150429",
            "inventor": "Lee, In-nam/Namyangju-Si, Gyeonggi-do 472-908\u00a0(KR)",
            "mainpicture": "imgf0001.png"
        },
        "EP12737707B1": {
            "patentid": "EP12737707B1",
            "path": "EP12737707NWB1",
            "title": "DISABLEMENT OF WIND TURBINES IN A WIND PARK",
            "pubdate": "20170111",
            "inventor": "KJ\u00c6R, Martin Ansbjerg/DK-8462 Harlev J\u00a0(DK), THOMSEN, Jesper Sandberg/DK-8370 Hadsten\u00a0(DK), BRATH, Per/DK-8920 Randers NV\u00a0(DK), DALSGAARD, S\u00f8ren/DK-8370 Hadsten\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP04795549B1": {
            "patentid": "EP04795549B1",
            "path": "EP04795549NWB1",
            "title": "WIND TURBINE SYSTEM CONTROL",
            "pubdate": "20150603",
            "inventor": "MOORE, Gary/Calgary, Alberta T2J 6A1\u00a0(CA), CARDINAL, Mark, Edward/Altamont, NY 12009\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP11009007B1": {
            "patentid": "EP11009007B1",
            "path": "EP11009007NWB1",
            "title": "Verfahren zum Betrieb einer pitchgeregelten Windenergieanlage",
            "pubdate": "20161102",
            "inventor": "Kabatzke, Wolfgang/21502 Geesthacht\u00a0(DE), Rochholz, Hermann/39100 Bozen\u00a0(IT)",
            "mainpicture": "imgb0001.png"
        },
        "EP12172619B1": {
            "patentid": "EP12172619B1",
            "path": "EP12172619NWB1",
            "title": "An improvement for horizontal blade installation for wind turbines",
            "pubdate": "20160413",
            "inventor": "Baun, Torben Friis/8200 \u00c5rhus N\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12810052B1": {
            "patentid": "EP12810052B1",
            "path": "EP12810052NWB1",
            "title": "A WIND TURBINE AND A METHOD FOR DETERMINING THE PRESENCE AND/OR THICKNESS OF AN ICE LAYER ON A BLADE BODY OF A WIND TURBINE",
            "pubdate": "20160309",
            "inventor": "KIM, Whye Ghee/Singapore 640443\u00a0(SG), CHONG, Kok Leong/Singapore 460047\u00a0(SG), CHANG, Yun Chong Gabriel/Singapore 640635\u00a0(SG), LIM, Li Hong Idris/Singapore 760801\u00a0(SG)",
            "mainpicture": "imgf0001.png"
        },
        "EP10188346B1": {
            "patentid": "EP10188346B1",
            "path": "EP10188346NWB1",
            "title": "Method to retrofit a blade of a wind turbine",
            "pubdate": "20161019",
            "inventor": "Kristensen, Jens J\u00f8rgen \u00d8stergaard/9240, Nibe\u00a0(DK), Thrue, Carsten/8740, Braedstrup\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP09756146B1": {
            "patentid": "EP09756146B1",
            "path": "EP09756146NWB1",
            "title": "Method for optimising the shape of an aerofoil and corresponding aerofoil",
            "pubdate": "20150826",
            "inventor": "LUNG, Hang Wai/Derby, DE24 8BJ\u00a0(GB), GOODHAND, Martin Neil/Derby, DE24 8BJ\u00a0(GB), MILLER, Robert John/Derby, DE24 8BJ\u00a0(GB), HOWARD, Michael Arthur/Derby, DE24 8BJ\u00a0(GB)",
            "mainpicture": "imgb0001.png"
        },
        "EP11151812B1": {
            "patentid": "EP11151812B1",
            "path": "EP11151812NWB1",
            "title": "Method for determining a pitch angle offset signal and for controlling a rotor frequency of a wind turbine for speed avoidance control",
            "pubdate": "20170628",
            "inventor": "Esbensen, Thomas/7400, Herning\u00a0(DK), Hoegh, Gustav/7400, Herning\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10710921B1": {
            "patentid": "EP10710921B1",
            "path": "EP10710921NWB1",
            "title": "A WIND TURBINE AND A DIRECT-DRIVE GENERATOR",
            "pubdate": "20170503",
            "inventor": "VERSTEEGH, Cornelis Johannes Antonius/1217 PP Hilversum\u00a0(NL)",
            "mainpicture": "imgf0001.png"
        },
        "EP12153679B1": {
            "patentid": "EP12153679B1",
            "path": "EP12153679NWB1",
            "title": "Rotor hub for a wind turbine",
            "pubdate": "20150624",
            "inventor": "Laursen, Christian/8722 Hedensted\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11841763B1": {
            "patentid": "EP11841763B1",
            "path": "EP11841763NWB1",
            "title": "SHIP FOR INSTALLING OFFSHORE WIND TURBINES, AND METHOD FOR INSTALLING OFFSHORE WIND TURBINES USING SAME",
            "pubdate": "20160330",
            "inventor": "SAWAI, Takayuki/Tokyo 108-8215\u00a0(JP), KUMAMOTO, Hitoshi/Tokyo 108-8215\u00a0(JP), WATANABE, Tomonori/Tokyo 108-8215\u00a0(JP), FUJITA, Shigetomo/Tokyo 108-8215\u00a0(JP), TSUKAMOTO, Izumi/Tokyo 108-8215\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP11006392B1": {
            "patentid": "EP11006392B1",
            "path": "EP11006392NWB1",
            "title": "A gearbox comprising a stationary gear component formed on the basis of variable flank profiles of gear teeth",
            "pubdate": "20150916",
            "inventor": "Nazifi, Khashayar/44789 Bochum\u00a0(DE), Enting, Andreas/58730 Fr\u00f6ndenberg\u00a0(DE)",
            "mainpicture": "imgb0001.png"
        },
        "EP12724865B1": {
            "patentid": "EP12724865B1",
            "path": "EP12724865NWB1",
            "title": "VERFAHREN ZUR GEWINNUNG VON WINDENERGIE UND UMWANDLUNG DERSELBEN IN ANDERE ENERGIEFORMEN UND WINDKRAFTANLAGE ZUR DURCHF\u00dcHRUNG DIESES VERFAHRENS",
            "pubdate": "20150722",
            "inventor": "BYCHKOV, Yury/Moskau 125466\u00a0(RU)",
            "mainpicture": "imgf0001.png"
        },
        "EP11704599B1": {
            "patentid": "EP11704599B1",
            "path": "EP11704599NWB1",
            "title": "WIND TURBINE",
            "pubdate": "20160907",
            "inventor": "CASTELL MART\u00cdNEZ, Daniel/E-08005 Barcelona\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP12166157B1": {
            "patentid": "EP12166157B1",
            "path": "EP12166157NWB1",
            "title": "Test rig for a back-to-back test of a turbine",
            "pubdate": "20150225",
            "inventor": "Andersen, Christian Buchhave/8654 Bryrup\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11152546B1": {
            "patentid": "EP11152546B1",
            "path": "EP11152546NWB1",
            "title": "Verfahren zum Betreiben einer Windenergieanlage in einem Radarwirkungsbereich",
            "pubdate": "20150826",
            "inventor": "Steinmetz, Guillaume/93210 La Plaine Saint-Denis\u00a0(FR), Harms, Ulrich/22399 Hamburg\u00a0(DE), Arlt, Volker/27299 Langwedel\u00a0(DE), Hose, Gerd/24211 Preetz\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP09161179B1": {
            "patentid": "EP09161179B1",
            "path": "EP09161179NWB1",
            "title": "Foundation comprising a fixture for locating wind turbine equipment on the foundation",
            "pubdate": "20160810",
            "inventor": "Lyness, Thomas E./Greer, SC 29650\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP11172419B1": {
            "patentid": "EP11172419B1",
            "path": "EP11172419NWB1",
            "title": "A wind turbine comprising a detuner",
            "pubdate": "20160420",
            "inventor": "Sloth, Erik Billeskov/8410 R\u00f8nde\u00a0(DK)",
            "mainpicture": "imgb0001.png"
        },
        "EP05102275B1": {
            "patentid": "EP05102275B1",
            "path": "EP05102275NWB1",
            "title": "Windpark zum Schutz eines innerhalb des Windparks liegenden Geb\u00e4udes",
            "pubdate": "20170118",
            "inventor": "Wobben, Aloys/26607 Aurich\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11709100B1": {
            "patentid": "EP11709100B1",
            "path": "EP11709100NWB1",
            "title": "DIRECT DRIVE WIND TURBINE, TRANSPORT SYSTEM AND METHOD OF CONSTRUCTION OF A DIRECT DRIVE WIND TURBINE",
            "pubdate": "20160928",
            "inventor": "KJAERGAARD, Finn/DK-8680 Ry\u00a0(DK), MUNCH, Jesper/DK-7100 Vejle\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12711555B1": {
            "patentid": "EP12711555B1",
            "path": "EP12711555NWB1",
            "title": "APPARATUS FOR ACCESSING THE NACELLE OF A WIND TURBINE AND ASSOCIATED METHODS",
            "pubdate": "20160914",
            "inventor": "ABOLFAZLIAN, Mazyar/DK-8220 Brabrand\u00a0(DK), MOGENSEN, Morten/DK-8200 Aarhus N\u00a0(DK), BOVBJERG, Jan, Riis/DK-8220 Brabrand\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP07734701B1": {
            "patentid": "EP07734701B1",
            "path": "EP07734701NWB1",
            "title": "METHOD FOR IMPLEMENTING WIND ENERGY CONVERTING SYSTEMS",
            "pubdate": "20161019",
            "inventor": "BATTISTI, Lorenzo/38100 Trento\u00a0(IT)",
            "mainpicture": "imgf0001.png"
        },
        "EP12721002B1": {
            "patentid": "EP12721002B1",
            "path": "EP12721002NWB1",
            "title": "ASSEMBLY OF AIR AND PNEUMATIC DEVICES",
            "pubdate": "20160518",
            "inventor": "Piskorz, Waldemar/21-509 Koden\u00a0(PL), Piskorz, Tomasz Tadeusz/21-509 Koden\u00a0(PL)",
            "mainpicture": "imgf0001.png"
        },
        "EP12711557B1": {
            "patentid": "EP12711557B1",
            "path": "EP12711557NWB1",
            "title": "A HUB FOR A WIND TURBINE",
            "pubdate": "20170712",
            "inventor": "BITSCH, Michael Lundgaard/DK-8860 Ulstrup\u00a0(DK), ANDERSEN, Jesper Lykkegaard/DK-8543 Hornslet\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11743184B1": {
            "patentid": "EP11743184B1",
            "path": "EP11743184NWB1",
            "title": "DISCHARGE APPARATUS FOR A WIND TURBINE",
            "pubdate": "20170531",
            "inventor": "LYNGBY, Claus Gr\u00f8n/DK-8740 Br\u00e6dstrup\u00a0(DK), ERICHSEN, Hans V./DK-8210 \u00c5rhus V\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12721281B1": {
            "patentid": "EP12721281B1",
            "path": "EP12721281NWB1",
            "title": "WIND TURBINE BLADE WITH NOISE REDUCTION DEVICES AND RELATED METHOD",
            "pubdate": "20161207",
            "inventor": "YAO, Qingshan/DK-2942 Skodsborg\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12165721B1": {
            "patentid": "EP12165721B1",
            "path": "EP12165721NWB1",
            "title": "Wind turbine",
            "pubdate": "20150617",
            "inventor": "Ebbesen, Henning/6900 Skjern\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10160555B1": {
            "patentid": "EP10160555B1",
            "path": "EP10160555NWB1",
            "title": "Wall section for a wind turbine tower and wind turbine tower",
            "pubdate": "20160928",
            "inventor": "Amdaa, Abderrahim/7330, Brande\u00a0(DK), Jacobsen, Jan/6700, Ebsjerg\u00a0(DK), Jensen, Steen Kirkegaard/8660, Skanderborg\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10803532B1": {
            "patentid": "EP10803532B1",
            "path": "EP10803532NWB1",
            "title": "METHOD OF FORMING A SHEET MOLDING COMPOUND WITH CORES",
            "pubdate": "20151216",
            "inventor": "ROBBINS, Jeffrey, R./Ann Arbor, MI 48103\u00a0(US), PANASIEWICZ, Jeremy, Alan/Macomb, MI 48044\u00a0(US), DODYK, Louis/Marion, IN 46592\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP04018496B1": {
            "patentid": "EP04018496B1",
            "path": "EP04018496NWB1",
            "title": "Method for yawing horizontal axis wind turbine",
            "pubdate": "20170222",
            "inventor": "Yoshida, Shigeo Fuji Jukogyo K. K./Tokyo 160-8316\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP09760777B1": {
            "patentid": "EP09760777B1",
            "path": "EP09760777NWB1",
            "title": "WIND TURBINE CONTROL SURFACE HINGE",
            "pubdate": "20150318",
            "inventor": "WESTERGAARD, Carsten Hein/77010 Houston TX\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP11195347B1": {
            "patentid": "EP11195347B1",
            "path": "EP11195347NWB1",
            "title": "Method for operating a wind turbine",
            "pubdate": "20150812",
            "inventor": "Pedersen, Bo/7620 Lemvig\u00a0(DK), Thomsen, Kim/7430 Ikast\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12725852B1": {
            "patentid": "EP12725852B1",
            "path": "EP12725852NWB1",
            "title": "WINDENERGIEANLAGEN-TURM",
            "pubdate": "20150819",
            "inventor": "BRENNER, Albrecht/26607 Aurich\u00a0(DE), MERTENS, Rene/16515 Oranienburg\u00a0(DE), PAPADOPOULOS, Panos/26603 Aurich\u00a0(DE), KERSTEN, Roy/39291 Hohenwarthe\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12713713B1": {
            "patentid": "EP12713713B1",
            "path": "EP12713713NWB1",
            "title": "LEISTUNGSSCHALTSCHRANK EINER VORRICHTUNG ZUR ERZEUGUNG ELEKTRISCHER ENERGIE",
            "pubdate": "20160316",
            "inventor": "EICHLER, Markus/47906 Kempen\u00a0(DE), NOWAK, Hans-Georg/41238 M\u00f6nchengladbach\u00a0(DE), HITPA\u00df, Marianne/47800 Krefeld\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10156339B1": {
            "patentid": "EP10156339B1",
            "path": "EP10156339NWB1",
            "title": "Arrangement and method to retrofit a wind turbine",
            "pubdate": "20160504",
            "inventor": "Stege, Jason/7330 Brande\u00a0(DK), Stiedsal, Henrik/5000 Odense C\u00a0(DK), Winther-Jensen, Martin/4690 Haslev\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP02008952B1": {
            "patentid": "EP02008952B1",
            "path": "EP02008952NWB1",
            "title": "Wellenkopplungsvorrichtung f\u00fcr eine Windkraftanlage",
            "pubdate": "20170111",
            "inventor": "Becker, Markus/48149 M\u00fcnster\u00a0(DE), Weitkamp, Roland/49191 Belm-Icker\u00a0(DE), Schellings, Vincent/7511 Enschede\u00a0(NL)",
            "mainpicture": "imgf0001.png"
        },
        "EP14175560B1": {
            "patentid": "EP14175560B1",
            "path": "EP14175560NWB1",
            "title": "Windenergieanlage",
            "pubdate": "20170906",
            "inventor": "Fricke, Werner/26605 Aurich\u00a0(DE), Sartorius, Florian/26789 Leer\u00a0(DE), Baumg\u00e4rtel, Christian/26605 Aurich\u00a0(DE), Hildebrand, Arno/26409 Wittmund\u00a0(DE), Gudewer, Wilko/26506 Norden\u00a0(DE), Geiken, Peter/26721 Emden\u00a0(DE), R\u00f6er, Jochen/27777 Ganderkesee\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP09775217B1": {
            "patentid": "EP09775217B1",
            "path": "EP09775217NWB1",
            "title": "WIND TURBINE AND METHOD FOR MONITORING THE GAP LENGTH BETWEEN A ROTOR AND A STATOR OF THE WIND TURBINE GENERATOR",
            "pubdate": "20160914",
            "inventor": "DAMEN, Michiel, Eduard, Cornelis/NL-2522 XH Den Haag\u00a0(NL), LUIMES, Herman/NL-6951MJ Dieren\u00a0(NL)",
            "mainpicture": "imgf0001.png"
        },
        "EP07120763B1": {
            "patentid": "EP07120763B1",
            "path": "EP07120763NWB1",
            "title": "Excitation voltage supply for synchronous generator used in a wind turbine, and method of starting a wind turbine having such excitation voltage supply",
            "pubdate": "20170913",
            "inventor": "Edenfeld, Thomas/49082 Osnabr\u00fcck\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP09753124B1": {
            "patentid": "EP09753124B1",
            "path": "EP09753124NWB1",
            "title": "POLRAD EINER WINDENERGIEANLAGE",
            "pubdate": "20161109",
            "inventor": "LANGE, Detlef/46147 Oberhausen\u00a0(DE), RUPPRICH, Dieter/48465 Ohne\u00a0(DE), BODENSTEIN, Klaus/Hong Kong\u00a0(CN)",
            "mainpicture": "imgf0001.png"
        },
        "EP12806193B1": {
            "patentid": "EP12806193B1",
            "path": "EP12806193NWB1",
            "title": "FLUID TURBINE LIGHTNING PROTECTION SYSTEM",
            "pubdate": "20160608",
            "inventor": "JENSEN, Rasmus, Peter/DK-8883 Gjern\u00a0(DK), HJORT, Soren/DK-8600 Silkeborg\u00a0(DK)",
            "mainpicture": "imgb0001.png"
        },
        "EP11728693B1": {
            "patentid": "EP11728693B1",
            "path": "EP11728693NWB1",
            "title": "POWER GENERATING APPARATUS OF RENEWABLE ENERGY TYPE",
            "pubdate": "20151028",
            "inventor": "TSUTSUMI, Kazuhisa/Tokyo 108-8215\u00a0(JP), SHIMIZU, Masayuki/Tokyo 108-8215\u00a0(JP), MAEKAWA, Atsushi/Tokyo 108-8215\u00a0(JP), NOGUCHI, Toshihide/Tokyo 108-8215\u00a0(JP), KOREMATSU, Yasuhiro/Tokyo 108-8215\u00a0(JP), CALDWELL, Niall/Midlothian Lothian EH20 9TB\u00a0(GB), DUMNOV, Daniil/Midlothian Lothian EH20 9TB\u00a0(GB), SALTER, Stephen/Midlothian Lothian EH20 9TB\u00a0(GB), STEIN, Uwe/Midlothian Lothian EH20 9TB\u00a0(GB), RAMPEN, William/Midlothian Lothian EH20 9TB\u00a0(GB), FOX, Robert/Midlothian Lothian EH20 9TB\u00a0(GB), ROBERTSON, Alasdair/Midlothian Lothian EH20 9TB\u00a0(GB), LAIRD, Stephen/Midlothian Lothian EH20 9TB\u00a0(GB), KARSTENS, Hauke/London Greater London W1K 6WL\u00a0(GB), PAPPALA, Venkata/London Greater London W1K 6WL\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP10861524B1": {
            "patentid": "EP10861524B1",
            "path": "EP10861524NWB1",
            "title": "SYSTEM, DEVICE, AND METHOD FOR ADJUSTING WIND TURBINE COMPONENT WORKLOAD",
            "pubdate": "20160420",
            "inventor": "ZHU, Wei/Shanghai\u00a0(CN)",
            "mainpicture": "imgb0001.png"
        },
        "EP07110882B1": {
            "patentid": "EP07110882B1",
            "path": "EP07110882NWB1",
            "title": "Cooling device",
            "pubdate": "20150429",
            "inventor": "Nies, Jacob/8042, HA Zwolle\u00a0(NL)",
            "mainpicture": "imgf0001.png"
        },
        "EP10153278B1": {
            "patentid": "EP10153278B1",
            "path": "EP10153278NWB1",
            "title": "Wind turbine control method to dampen vibrations",
            "pubdate": "20160921",
            "inventor": "Arlab\u00e1n Gabeiras, Teresa/31621, Sarriguren (Navarra)\u00a0(ES), Alonso S\u00e1daba, Oscar/31621, Sarriguren (Navarra)\u00a0(ES), Garcia Barace, Alberto/31621, Sarriguren (Navarra)\u00a0(ES), Royo Garc\u00eda, Ricardo/31621, Sarriguren (Navarra)\u00a0(ES), Tonks, Stephen/Sarriguren (Navarra), 31621\u00a0(ES), Garc\u00eda Say\u00e9s, Jose Miguel/31621, Sarriguren (Navarra)\u00a0(ES), Nu\u00f1ez Polo, Miguel/31621, Sarriguren (Navarra)\u00a0(ES)",
            "mainpicture": "imgb0001.png"
        },
        "EP10158285B1": {
            "patentid": "EP10158285B1",
            "path": "EP10158285NWB1",
            "title": "Transport system for transportation of a spar",
            "pubdate": "20161012",
            "inventor": "J\u00f8rgensen, Henning/6950 Ringk\u00f8bing\u00a0(DK), Hansen, Jens Jessen/8200 \u00c5rhus N\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP09160614B1": {
            "patentid": "EP09160614B1",
            "path": "EP09160614NWB1",
            "title": "Method for increasing energy capture in a wind turbine",
            "pubdate": "20171011",
            "inventor": "Wittekind, Lothar/24103 Kiel\u00a0(DE), Viripullan, Renjith/Bangalore\u00a0(IN), Staedler, Martin/10439 Berlin\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12305281B1": {
            "patentid": "EP12305281B1",
            "path": "EP12305281NWB1",
            "title": "Renfort m\u00e9canique pour pi\u00e9ce en mat\u00e9riau composite, notamment pour une pale d'\u00e9olienne de grandes dimensions",
            "pubdate": "20160810",
            "inventor": "Lull, St\u00e9phane/33990 HOURTIN\u00a0(FR), Ferrer, Denis/33180 VERTHEUIL\u00a0(FR), Portoles, Jos\u00e9/33340 QUEYRAC\u00a0(FR)",
            "mainpicture": "imgf0001.png"
        },
        "EP02799741B1": {
            "patentid": "EP02799741B1",
            "path": "EP02799741NWB1",
            "title": "VERFAHREN ZUM ERMITTELN DER AUSLENKUNG EINES ROTORBLATTS EINER WINDENERGIEANLAGE",
            "pubdate": "20150624",
            "inventor": "Aloys Wobben/26607 Aurich\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP08171280B1": {
            "patentid": "EP08171280B1",
            "path": "EP08171280NWB1",
            "title": "Wind turbine, wind turbine controller and method for controlling a wind turbine",
            "pubdate": "20160518",
            "inventor": "Menke, Detlef/49505, Lotte\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP09823373B1": {
            "patentid": "EP09823373B1",
            "path": "EP09823373NWB1",
            "title": "WIND POWER GENERATOR, AND CONTROL METHOD THEREFOR",
            "pubdate": "20170531",
            "inventor": "FUKAMI, Koji/Nagasaki-shi Nagasaki 851-0392\u00a0(JP), MATSUO, Atsushi/Nagasaki-shi Nagasaki 851-0392\u00a0(JP)",
            "mainpicture": "imgb0001.png"
        },
        "EP13161084B1": {
            "patentid": "EP13161084B1",
            "path": "EP13161084NWB1",
            "title": "Verfahren zur Stromregelung",
            "pubdate": "20160713",
            "inventor": "Feltes, Dr. Christian/22453 Hamburg\u00a0(DE), Runge, Dr. J\u00f6rn/22297 Hamburg\u00a0(DE), Koch, Dr. Friedrich/47623 Kevelaer\u00a0(DE)",
            "mainpicture": "imgb0001.png"
        },
        "EP10193906B1": {
            "patentid": "EP10193906B1",
            "path": "EP10193906NWB1",
            "title": "Systems For Operating A Wind Turbine",
            "pubdate": "20170927",
            "inventor": "Larsen, Einar Vaughn/Schenectady, NY 12345\u00a0(US), Klodowski, Anthony Michael/Salem, VA 24153\u00a0(US), Barker, Sidney/Salem, VA 24153\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP11804948B1": {
            "patentid": "EP11804948B1",
            "path": "EP11804948NWB1",
            "title": "A METHOD OF OPERATING A WIND TURBINE AS WELL AS A SYSTEM SUITABLE THEREFORE",
            "pubdate": "20160309",
            "inventor": "GUPTA, Amit Kumar/Singapore 120601\u00a0(SG), TRIPATHI, Anshuman/Singapore 658882\u00a0(SG)",
            "mainpicture": "imgb0001.png"
        },
        "EP09163240B1": {
            "patentid": "EP09163240B1",
            "path": "EP09163240NWB1",
            "title": "Optimizing converter protection for wind turbine generators",
            "pubdate": "20160810",
            "inventor": "Wagoner, Robert G./Roanoke, VA 24018\u00a0(US), Ritter, Allen M./Roanoke, VA 24014\u00a0(US), Klodowski, Anthony M./Hardy, VA 24101\u00a0(US), Frame, Scott C./Boones Mill, VA 24065\u00a0(US), Sutherland, Steven W./Roanoke, VA 24018\u00a0(US), Barker, Sidney A./Troutville, VA 24175\u00a0(US), Barton, Werner/48712, Gescher\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10188626B1": {
            "patentid": "EP10188626B1",
            "path": "EP10188626NWB1",
            "title": "System to facilitate maintenance on a wind turbine",
            "pubdate": "20150415",
            "inventor": "Niehues, Thomas/48485, Neuenkichen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12704666B1": {
            "patentid": "EP12704666B1",
            "path": "EP12704666NWB1",
            "title": "ROTORLAGER F\u00dcR EINE WINDKRAFTANLAGE",
            "pubdate": "20171206",
            "inventor": "FRANK, Hubertus/91351 H\u00f6chstadt\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11757168B1": {
            "patentid": "EP11757168B1",
            "path": "EP11757168NWB1",
            "title": "HYDRAULISCHE BREMSEINRICHTUNG F\u00dcR EINE WINDENERGIEANLAGE",
            "pubdate": "20170315",
            "inventor": "WARFEN, Karsten/23795 S\u00f6hren\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP09805999B1": {
            "patentid": "EP09805999B1",
            "path": "EP09805999NWB1",
            "title": "MASCHINENTR\u00c4GER ZUR AUFNAHME EINER ROTOR-/GENERATORBAUGRUPPE EINER GETRIEBELOSEN WINDENERGIEANLAGE",
            "pubdate": "20150218",
            "inventor": "MASCIONI, Andreas/66346 P\u00fcttlingen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP09768888B1": {
            "patentid": "EP09768888B1",
            "path": "EP09768888NWB1",
            "title": "TURM EINER WINDENERGIEANLAGE",
            "pubdate": "20150909",
            "inventor": "TREDE, Alf/25885 Immenstedt\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12001508B1": {
            "patentid": "EP12001508B1",
            "path": "EP12001508NWB1",
            "title": "Windenergieanlage sowie Verfahren zum Beheizen einer Komponente in einer Windenergieanlage",
            "pubdate": "20150826",
            "inventor": "Dreher, Moritz/22397 Hamburg\u00a0(DE), Scheibig, Lars/22397 Hamburg\u00a0(DE), Radou, Frederic/25486 Alveslohe\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11778836B1": {
            "patentid": "EP11778836B1",
            "path": "EP11778836NWB1",
            "title": "TOWER SECTION TRANSPORT DEVICE",
            "pubdate": "20150318",
            "inventor": "PETERSON, Eric M./Boston, MA 02210\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP11728692B1": {
            "patentid": "EP11728692B1",
            "path": "EP11728692NWB1",
            "title": "POWER GENERATING APPARATUS OF RENEWABLE ENERGY TYPE AND METHOD OF OPERATING THE SAME",
            "pubdate": "20151028",
            "inventor": "ICHINOSE, Hidekazu/Tokyo 108-8215\u00a0(JP), TSUTSUMI, Kazuhisa/Tokyo 108-8215\u00a0(JP), SHIMIZU, Masayuki/Tokyo 108-8215\u00a0(JP), CALDWELL, Niall/Midlothian Lothian EH20 9TB\u00a0(GB), DUMNOV, Daniil/Midlothian Lothian EH20 9TB\u00a0(GB), RAMPEN, William/Midlothian Lothian EH20 9TB\u00a0(GB), LAIRD, Stephen/Midlothian Lothian EH20 9TB\u00a0(GB), PAPPALA, Venkata/London Greater London W1K 6WL\u00a0(GB)",
            "mainpicture": "imgb0001.png"
        },
        "EP11776079B1": {
            "patentid": "EP11776079B1",
            "path": "EP11776079NWB1",
            "title": "A METHOD OF CONTROLLING A WIND TURBINE",
            "pubdate": "20150415",
            "inventor": "GOODMAN, Jenny/Ashtead Surrey KT21 2NS1\u00a0(GB), HALES, Kelvin/Egham Surrey TW20 9NB\u00a0(GB)",
            "mainpicture": "imgb0001.png"
        },
        "EP10824505B1": {
            "patentid": "EP10824505B1",
            "path": "EP10824505NWB1",
            "title": "WIND-TURBINE CONTROL METHODS FOR IMPROVING POWER PRODUCTION",
            "pubdate": "20170802",
            "inventor": "GARCIA ANDUJAR, Juan Carlos/E-28043 Madrid\u00a0(ES), LOPEZ RUBIO, Jose Maria/E-28043 Madrid\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP12182635B1": {
            "patentid": "EP12182635B1",
            "path": "EP12182635NWB1",
            "title": "Verfahren und Vorrichtung zur thermischen \u00dcberpr\u00fcfung des Bauzustandes von Windkraftanlagen",
            "pubdate": "20150624",
            "inventor": "Zell, Horst/45481 M\u00fchlheim\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11804759B1": {
            "patentid": "EP11804759B1",
            "path": "EP11804759NWB1",
            "title": "WIND TURBINE BLADE BEARING REMOVAL APPARATUS AND METHOD",
            "pubdate": "20150930",
            "inventor": "HANCOCK, Mark/Hampshire SO15 5HN\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP09163982B1": {
            "patentid": "EP09163982B1",
            "path": "EP09163982NWB1",
            "title": "Lightning protection mesh",
            "pubdate": "20151125",
            "inventor": "Hibbard, Paul/Putney, SW15 3HG\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP12168992B1": {
            "patentid": "EP12168992B1",
            "path": "EP12168992NWB1",
            "title": "Rotorblatt einer Windenergieanlage und entsprechendes Verfahren",
            "pubdate": "20150701",
            "inventor": "BayWa r.e. Rotor Service GmbH/27432 Basdahl\u00a0(DE), Spitzner Engineers GmbH/21129 Hamburg\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12382332B1": {
            "patentid": "EP12382332B1",
            "path": "EP12382332NWB1",
            "title": "Angular positioning system for a wind turbine",
            "pubdate": "20160803",
            "inventor": "Betran Palomas, Jaume/08172 SANT CUGAT DEL VALL\u00c8S\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP12154064B1": {
            "patentid": "EP12154064B1",
            "path": "EP12154064NWB1",
            "title": "Wind turbine",
            "pubdate": "20150401",
            "inventor": "Nielsen, Jacob Blach/7442 Engesvang\u00a0(DK), Munk-Hansen, Thorkil/7323 Give\u00a0(DK), Thomsen, Thyge Skovbjerg/7400 Herning\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11749872B1": {
            "patentid": "EP11749872B1",
            "path": "EP11749872NWB1",
            "title": "SUPPORT STRUCTURE FOR AN OFFSHORE WIND TURBINE",
            "pubdate": "20151028",
            "inventor": "FYFE, Alexander John/Twickenham, Middlesex TW1 4RU\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP11801863B1": {
            "patentid": "EP11801863B1",
            "path": "EP11801863NWB1",
            "title": "WIND TURBINE BLADE",
            "pubdate": "20160323",
            "inventor": "MITSUBISHI HEAVY INDUSTRIES, Ltd./Tokyo 108-8215\u00a0(JP), Euros Entwicklungsgesellschaft f\u00fcr  Windkraftanlagen mbH/13088 Berlin\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11183465B1": {
            "patentid": "EP11183465B1",
            "path": "EP11183465NWB1",
            "title": "Wind turbine tower",
            "pubdate": "20150826",
            "inventor": "Schibsbye, Karsten/7000 Fredericia\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10784806B1": {
            "patentid": "EP10784806B1",
            "path": "EP10784806NWB1",
            "title": "A WIND TURBINE NACELLE COMPRISING A HEAT EXCHANGER ASSEMBLY",
            "pubdate": "20160601",
            "inventor": "WONG, Voon Hon/Singapore 248358\u00a0(SG), KANDASAMY, Ravi/Singapore 730679\u00a0(SG), NARASIMALU, Srikanth/Singapore 535206\u00a0(SG), LARSEN, Gerner/DK-8382 Hinnerup\u00a0(DK), ABEYASEKERA, Tusitha/DK-8200 \u00c5rhus N\u00a0(DK), KNUDSEN, Peter, C./DK-8940 Randers\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP13153789B1": {
            "patentid": "EP13153789B1",
            "path": "EP13153789NWB1",
            "title": "Shipping fixture and method for transporting rotor blades",
            "pubdate": "20171129",
            "inventor": "Johnson, Stephen Bertram/Greenville, SC South Carolina 29615\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP12713730B1": {
            "patentid": "EP12713730B1",
            "path": "EP12713730NWB1",
            "title": "A WIND TURBINE BLADE COMPRISING METAL FIBRES AND A TRANSITION REGION",
            "pubdate": "20160713",
            "inventor": "DAHL, Martin/24939 Flensburg\u00a0(DE), MORTENSEN, Bjarne Krab/DK-7190 Billund\u00a0(DK), HORNBLOW, Benjamin/DK-2100 Copenhagen \u00d8\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11173160B1": {
            "patentid": "EP11173160B1",
            "path": "EP11173160NWB1",
            "title": "Methof of welding at least two workpieces by double hybrid laser arc welding",
            "pubdate": "20150909",
            "inventor": "Nowak, Daniel Anthony/Greenville, SC South Carolina 29615\u00a0(US), Kottilingam, Srikanth Chandrudu/Simpsonville, SC South Carolina 29615\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP09005310B1": {
            "patentid": "EP09005310B1",
            "path": "EP09005310NWB1",
            "title": "Verfahren zum Betreiben einer Windenergieanlage",
            "pubdate": "20151104",
            "inventor": "v. Mutius, Martin/24358 Ascheffel\u00a0(DE), Weitkamp, Roland/49191 Belm\u00a0(DE), Anem\u00fcller, Jochen/49205 Hasbergen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP13168207B1": {
            "patentid": "EP13168207B1",
            "path": "EP13168207NWB1",
            "title": "Damping wind turbine tower oscillations using gyroscopic forces",
            "pubdate": "20150902",
            "inventor": "Esbensen, Thomas/7400 Herning\u00a0(DK), Hoegh, Gustav/7400 Herning\u00a0(DK), Holm-Joergensen, Kristian/7100 Vejle\u00a0(DK)",
            "mainpicture": "imgb0001.png"
        },
        "EP05255846B1": {
            "patentid": "EP05255846B1",
            "path": "EP05255846NWB1",
            "title": "Electrical machine with double-sided stator",
            "pubdate": "20150722",
            "inventor": "Jansen, Patrick Lee/Alplaus New York 12008\u00a0(US), Carl, Ralph James Jr.,/Clifton Park New York 12065\u00a0(US), Fogarty, James Michael/Schenectady New York 12309\u00a0(US), Lyons, James Patrick/Niskayuna New York 12309\u00a0(US), Qu, Ronghai/Clifton Park New York 12065\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP12153781B1": {
            "patentid": "EP12153781B1",
            "path": "EP12153781NWB1",
            "title": "Method and controller for turning a hub of a wind turbine",
            "pubdate": "20171101",
            "inventor": "Deng, Heng/7330 Brande\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10805229B1": {
            "patentid": "EP10805229B1",
            "path": "EP10805229NWB1",
            "title": "METHOD AND APPARATUS FOR PROTECTING WIND TURBINES FROM DAMAGE",
            "pubdate": "20170125",
            "inventor": "BOWYER, Robert/DK-8940 Randers SV\u00a0(DK), SPRUCE, Christopher/DK-8940 Randers SV\u00a0(DK), CREABY, Justin/DK-8940 Randers SV\u00a0(DK), WEDEL-HEINEN, Jens, Jakob/DK-2920 Charlottenlund\u00a0(DK)",
            "mainpicture": "imgb0001.png"
        },
        "EP10733019B1": {
            "patentid": "EP10733019B1",
            "path": "EP10733019NWB1",
            "title": "ELECTRICITY GENERATION SYSTEM THAT WITHSTANDS VOLTAGE DIPS",
            "pubdate": "20171220",
            "inventor": "MAYOR LUSARRETA, Jes\u00fas/E-31621 Sarriguren (Navarra)\u00a0(ES), C\u00c1RCAR MAYOR, Ainhoa/E-31621 Sarriguren (Navarra)\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP11799063B1": {
            "patentid": "EP11799063B1",
            "path": "EP11799063NWB1",
            "title": "CONTROL DEVICE FOR WIND POWER PLANT AND CONTROL METHOD FOR WIND POWER PLANT",
            "pubdate": "20160420",
            "inventor": "YASUGI, Akira/Tokyo 108-8215\u00a0(JP)",
            "mainpicture": "imgb0001.png"
        },
        "EP09163969B1": {
            "patentid": "EP09163969B1",
            "path": "EP09163969NWB1",
            "title": "Wind turbine providing grid support",
            "pubdate": "20160113",
            "inventor": "Tarnowski, Germ\u00e1n Claudio/1370 K\u00f8benhavn K\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP13003020B1": {
            "patentid": "EP13003020B1",
            "path": "EP13003020NWB1",
            "title": "Wind turbine blades",
            "pubdate": "20150603",
            "inventor": "Fixter, Greg Peter Wade/Farnborough, Hampshire GU14 0LX\u00a0(GB), Spooner, Christopher Douglas James/Farnborough, Hampshire GU14 0LX\u00a0(GB), Perry, Christopher James/Farnborough, Hampshire GU14 0LX\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP10729779B1": {
            "patentid": "EP10729779B1",
            "path": "EP10729779NWB1",
            "title": "VORRICHTUNG UND VERFAHREN ZUR HERSTELLUNG VON OFFSHORE-WINDENERGIEANLAGEN",
            "pubdate": "20150729",
            "inventor": "MAYER, Timo/73728 Esslingen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP09727458B1": {
            "patentid": "EP09727458B1",
            "path": "EP09727458NWB1",
            "title": "Verfahren zum Errichten eines Windenergieanlagen-Turms",
            "pubdate": "20160106",
            "inventor": "H\u00d6LSCHER, Norbert/26607 Aurich\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10164556B1": {
            "patentid": "EP10164556B1",
            "path": "EP10164556NWB1",
            "title": "Wind power installation",
            "pubdate": "20160727",
            "inventor": "Eurlings, Robert Maria Joseph Hubert/6417 CP, HEERLEN\u00a0(NL)",
            "mainpicture": "imgf0001.png"
        },
        "EP09808941B1": {
            "patentid": "EP09808941B1",
            "path": "EP09808941NWB1",
            "title": "ELECTRICAL INTERCONNECTION SYSTEM BETWEEN AT LEAST ONE ELECTRICITY GENERATOR AND ONE ELECTRICITY TRANSFER SYSTEM, IN A MARINE ENVIRONMENT",
            "pubdate": "20150603",
            "inventor": "IBA\u00d1EZ ERE\u00d1O, Pedro/E-48170 Zamudio (Vizcaya)\u00a0(ES), RICCI, Pierpaolo/E-48170 Zamudio (Vizcaya)\u00a0(ES), PEREZ MORAN, Germ\u00e1n/E-48170 Zamudio (Vizcaya)\u00a0(ES), MARINO BILBAO, Iker/E-48170 Zamudio (Vizcaya)\u00a0(ES), VILLATE MARTINEZ, Jos\u00e9, Luis/E-48170 Zamudio (Vizcaya)\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP11007396B1": {
            "patentid": "EP11007396B1",
            "path": "EP11007396NWB1",
            "title": "Windenergieanlage mit versenkbarem Wettermast",
            "pubdate": "20161102",
            "inventor": "Wackrow, Torsten/18055 Rostock\u00a0(DE), Koop, Karsten/18057 Rostock\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10814323B1": {
            "patentid": "EP10814323B1",
            "path": "EP10814323NWB1",
            "title": "HYBRID MULTI- ELEMENT TAPERED ROTATING TOWER",
            "pubdate": "20150527",
            "inventor": "Zuteck, Michael D./Clear Lake Shores, TX 77565\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP11707143B1": {
            "patentid": "EP11707143B1",
            "path": "EP11707143NWB1",
            "title": "REDUNDANTES PITCHSYSTEM",
            "pubdate": "20160817",
            "inventor": "BERTOLOTTI, Fabio/48455 Bad Bentheim\u00a0(DE), KESTERMANN, Hermann/48432 Rheine\u00a0(DE), VAN SCHELVE, Jens/D- 28195  Bremen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12718050B1": {
            "patentid": "EP12718050B1",
            "path": "EP12718050NWB1",
            "title": "REDUNDANT POWER SUPPLY ARCHITECTURE",
            "pubdate": "20170503",
            "inventor": "DANIELSEN, Niels Erik/DK-8220 Brabrand\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11726117B1": {
            "patentid": "EP11726117B1",
            "path": "EP11726117NWB1",
            "title": "POWER OSCILLATION DAMPING CONTROLLER",
            "pubdate": "20160817",
            "inventor": "KN\u00dcPPEL, Thyge/DK-2200 Copenhagen N\u00a0(DK), KUMAR, Sathees/DK-7400 Herning\u00a0(DK), THURING, Patrik/S-211 21 Malmoe\u00a0(SE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11382297B1": {
            "patentid": "EP11382297B1",
            "path": "EP11382297NWB1",
            "title": "Convertible wind turbine nacelle cover",
            "pubdate": "20150121",
            "inventor": "Mercado Diez, Luis Ignacio/27002 Lugo\u00a0(ES), Hoyos Irisarri, Jose Miguel/27002 Lugo\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP12188543B1": {
            "patentid": "EP12188543B1",
            "path": "EP12188543NWB1",
            "title": "Estimation of Wind Properties Using a Light Detection and Ranging Device",
            "pubdate": "20170823",
            "inventor": "Couchman, Ian/London, SW19 8NS\u00a0(GB), Bowyer, Robert/London, SW16 6LE\u00a0(GB), Hales, Kelvin/Egham, TW20 9NB\u00a0(GB), Palmer, Christopher/London, SW19 8NS\u00a0(GB)",
            "mainpicture": "imgb0001.png"
        },
        "EP12730380B1": {
            "patentid": "EP12730380B1",
            "path": "EP12730380NWB1",
            "title": "LASTHANDHABUNGSVORRICHTUNG ZUM ANHEBEN UND VERFAHREN ZUR MONTAGE VON ROTORBL\u00c4TTERN EINER WINDENERGIEANLAGE",
            "pubdate": "20150812",
            "inventor": "EDELMANN, Ulf/24598 Boostedt\u00a0(DE), LEHMANN, Sven/24787 Fockbek\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP02790815B1": {
            "patentid": "EP02790815B1",
            "path": "EP02790815NWB1",
            "title": "PERMANENT MAGNET TYPE DYNAMO-ELECTRIC MACHINE AND WIND POWER GENERATION-USE PERMANENT MAGNET TYPE SYNCHRONOUS GENERATOR",
            "pubdate": "20170301",
            "inventor": "MITSUBISHI DENKI KABUSHIKI KAISHA/Chiyoda-ku Tokyo 100-8310\u00a0(JP), Toshiba Mitsubishi-Electric Industrial Systems  Corporation/Minato-ku, Tokyo 108-0073\u00a0(JP)",
            "mainpicture": "imgb0001.png"
        },
        "EP10000318B1": {
            "patentid": "EP10000318B1",
            "path": "EP10000318NWB1",
            "title": "Gear assembly and wind turbine",
            "pubdate": "20151202",
            "inventor": "K\u00f6lpin, Helmut/52499 Baesweiler\u00a0(DE), Wohlleb, Matthias/52064 Aachen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11171291B1": {
            "patentid": "EP11171291B1",
            "path": "EP11171291NWB1",
            "title": "Method of hybrid laser arc welding at least two workpieces with two laser beams",
            "pubdate": "20151007",
            "inventor": "Nowak, Daniel Anthony/Greenville, SC South Carolina 29615\u00a0(US), Dimascio, Paul Stephen/Greenville, SC South Carolina 29615\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP10780138B1": {
            "patentid": "EP10780138B1",
            "path": "EP10780138NWB1",
            "title": "TWO-BLADED VERTICAL AXIS WIND TURBINES",
            "pubdate": "20170712",
            "inventor": "FARB, Daniel/99190 Beit Shemesh\u00a0(IL), FARKASH, Avner/99190 Beit Shemesh\u00a0(IL), HARELI, Gadi/99190 Beit Shemesh\u00a0(IL), VAN ZWAREN, Joe/99190 Beit Shemesh\u00a0(IL), KOLMAN, Ken/99190 Beit Shemesh\u00a0(IL)",
            "mainpicture": "imgb0001.png"
        },
        "EP13701227B1": {
            "patentid": "EP13701227B1",
            "path": "EP13701227NWB1",
            "title": "WIND TURBINE ROTOR",
            "pubdate": "20170315",
            "inventor": "ROHDEN, Rolf/26607 Aurich\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP06251329B1": {
            "patentid": "EP06251329B1",
            "path": "EP06251329NWB1",
            "title": "Methods and apparatus for pitch control power conversion",
            "pubdate": "20150513",
            "inventor": "Harbourt, Cyrus David/Roanoke, VA 24014\u00a0(US), Mulius, Jeffrey Alan/Roanoke, VA 24018\u00a0(US), Ridenour, Amy Marlene/Salem, VA 24153\u00a0(US), Wanner, David Gerard, Jr./Roanoke, VA 24018\u00a0(US), Edmunds, Howard Ross/Roanoke, VA 24019\u00a0(US), Wilkinson, Andrew Scott/Roanoke, VA 24018\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP12724565B1": {
            "patentid": "EP12724565B1",
            "path": "EP12724565NWB1",
            "title": "APPARATUS FOR MANIPULATING A WIND TURBINE BLADE AND METHOD OF BLADE HANDLING",
            "pubdate": "20151104",
            "inventor": "HANCOCK, Mark/Southampton  Hampshire SO15 5HN\u00a0(GB), BECH, Anton/DK-6950 Ringk\u00f8bing\u00a0(DK), THOMSEN, Peter Frans/DK-6950 Ringk\u00f8bing\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12008158B1": {
            "patentid": "EP12008158B1",
            "path": "EP12008158NWB1",
            "title": "Windenergieanlage",
            "pubdate": "20150729",
            "inventor": "Nickel, Viktor/22305 Hamburg\u00a0(DE), Springer, Alexander/18233 Neubukow\u00a0(DE), Faber, Axel/22083 Hamburg\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12703452B1": {
            "patentid": "EP12703452B1",
            "path": "EP12703452NWB1",
            "title": "VERFAHREN ZUM BETREIBEN EINER WINDENERGIEANLAGE UND WINDENERGIEANLAGE",
            "pubdate": "20160420",
            "inventor": "SIEVERS, Oliver/24787 Fockbek\u00a0(DE), WARFEN, Karsten/23795 S\u00f6hren\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10706654B1": {
            "patentid": "EP10706654B1",
            "path": "EP10706654NWB1",
            "title": "A WIND TURBINE PROVIDING INCREASED POWER OUTPUT",
            "pubdate": "20161012",
            "inventor": "ROMBLAD, Jonas/DK-8240 Risskov\u00a0(DK), GODSK, Kristian Balschmidt/DK-2200 Copenhagen N\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12722674B1": {
            "patentid": "EP12722674B1",
            "path": "EP12722674NWB1",
            "title": "METHOD AND APPARATUS FOR PROTECTING WIND TURBINES FROM EXTREME EVENTS",
            "pubdate": "20170322",
            "inventor": "SPRUCE, Chris/Leatherhead Surrey KT23 4PD\u00a0(GB), BOWYER, Robert/London SW6 6LE\u00a0(GB), PALMER, Christopher/Surrey KT24 5NR\u00a0(GB)",
            "mainpicture": "imgb0001.png"
        },
        "EP08012746B1": {
            "patentid": "EP08012746B1",
            "path": "EP08012746NWB1",
            "title": "Verfahren und Vorrichtung zum Bestimmen einer Kennlinie f\u00fcr eine elektrische Gr\u00f6\u00dfe einer Windenergieanlage",
            "pubdate": "20150603",
            "inventor": "Jurkat, Mark/22844 Norderstedt\u00a0(DE), Harms, Ulrich/22399 Hamburg\u00a0(DE)",
            "mainpicture": "imgb0001.png"
        },
        "EP10709686B1": {
            "patentid": "EP10709686B1",
            "path": "EP10709686NWB1",
            "title": "SCHEIBENBREMSE F\u00dcR EINEN AZIMUTANTRIEB EINER WINDKRAFTANLAGE",
            "pubdate": "20151202",
            "inventor": "B\u00d6HM, Peter/59423 Unna\u00a0(DE), UHLING, Daniela/59423 Unna\u00a0(DE), MIKOLAJCZYK, Olaf/59425 Unna\u00a0(DE), GEOFFROY, Bruno/58000 Nevers\u00a0(FR)",
            "mainpicture": "imgf0001.png"
        },
        "EP07117674B1": {
            "patentid": "EP07117674B1",
            "path": "EP07117674NWB1",
            "title": "Apparatus for evaluating sensors and/or for controlling operation of an apparatus that includes a sensor",
            "pubdate": "20150909",
            "inventor": "Nies, Jaco Johannes/8042 HA, Zwolle\u00a0(NL)",
            "mainpicture": "imgf0001.png"
        },
        "EP10161946B1": {
            "patentid": "EP10161946B1",
            "path": "EP10161946NWB1",
            "title": "Steel tower for a wind turbine",
            "pubdate": "20170913",
            "inventor": "Rasmussen, Anders Nygaard/2200 K\u00f8benhavn\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11186609B1": {
            "patentid": "EP11186609B1",
            "path": "EP11186609NWB1",
            "title": "Rotorblatt einer Windenergieanlage",
            "pubdate": "20170412",
            "inventor": "Wobben, Aloys/26607 Aurich\u00a0(DE)",
            "mainpicture": "imgb0001.png"
        },
        "EP14165651B1": {
            "patentid": "EP14165651B1",
            "path": "EP14165651NWB1",
            "title": "Method for attachment of wind turbine vortex generators",
            "pubdate": "20160907",
            "inventor": "Riddell, Scott Gabell/Greenville, SC South Carolina 29615\u00a0(US), Booth, Michael Christopher/Greenville, SC South Carolina 29615-4614\u00a0(US), Tobin, James Robert/Greenville, SC South Carolina 29615-4614\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP11728804B1": {
            "patentid": "EP11728804B1",
            "path": "EP11728804NWB1",
            "title": "ARBEITSB\u00dcHNE UND LIFT F\u00dcR WINDTURBINE",
            "pubdate": "20160413",
            "inventor": "M\u00dcLLER, Johann/26607 Aurich\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP09749313B1": {
            "patentid": "EP09749313B1",
            "path": "EP09749313NWB1",
            "title": "WIND TURBINE GENERATOR AND CONTROL METHOD THEREOF",
            "pubdate": "20160413",
            "inventor": "YASUGI, Akira/Nagasaki-shi Nagasaki 850-8610\u00a0(JP)",
            "mainpicture": "imgb0001.png"
        },
        "EP12768771B1": {
            "patentid": "EP12768771B1",
            "path": "EP12768771NWB1",
            "title": "AIR COOLING OF WIND TURBINE GENERATOR",
            "pubdate": "20151216",
            "inventor": "BORGEN, Eystein/N-5239 R\u00e5dal\u00a0(NO)",
            "mainpicture": "imgf0001.png"
        },
        "EP08103651B1": {
            "patentid": "EP08103651B1",
            "path": "EP08103651NWB1",
            "title": "Wind turbine",
            "pubdate": "20150930",
            "inventor": "Versteegh, Cornelus Johannes Antonius/1217 PP Hilversum\u00a0(NL)",
            "mainpicture": "imgf0001.png"
        },
        "EP11713499B1": {
            "patentid": "EP11713499B1",
            "path": "EP11713499NWB1",
            "title": "WIND TURBINE SYSTEM",
            "pubdate": "20151014",
            "inventor": "Rodway, Giles Henry/Caine, Wiltshire SN11 8DJ\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP10723479B1": {
            "patentid": "EP10723479B1",
            "path": "EP10723479NWB1",
            "title": "WINDENERGIEANLAGE MIT \u00dcBERWACHUNGSSENSOREN",
            "pubdate": "20161109",
            "inventor": "BECKER, Edwin/48734 Reken\u00a0(DE), LOESL, Johann/84172 Buch am Erlbach\u00a0(DE), KENZLER, Marcel/15711 K\u00f6nigs Wusterhausen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP09175411B1": {
            "patentid": "EP09175411B1",
            "path": "EP09175411NWB1",
            "title": "A foundation and a method for forming a mono pile foundation",
            "pubdate": "20161228",
            "inventor": "Kristensen, Jonas/6900, Skjern\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12753194B1": {
            "patentid": "EP12753194B1",
            "path": "EP12753194NWB1",
            "title": "TURBINE BLADE",
            "pubdate": "20161012",
            "inventor": "Abu Al-Rubb, Khalil/Doha\u00a0(QA)",
            "mainpicture": "imgf0001.png"
        },
        "EP12827620B1": {
            "patentid": "EP12827620B1",
            "path": "EP12827620NWB1",
            "title": "DRIVE UNIT, ELEVATOR, AND A METHOD FOR DRIVING AN ELEVATOR",
            "pubdate": "20171004",
            "inventor": "TALONEN, Tapani/FI-12400 Tervakoski\u00a0(FI)",
            "mainpicture": "imgf0001.png"
        },
        "EP12194991B1": {
            "patentid": "EP12194991B1",
            "path": "EP12194991NWB1",
            "title": "Lifter for handling a rotor blade of a wind turbine and method of operating the same",
            "pubdate": "20170517",
            "inventor": "Monux Belloso, Oscar/28205 Bremen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12855550B1": {
            "patentid": "EP12855550B1",
            "path": "EP12855550NWB1",
            "title": "FLOATING TYPE WIND TURBINE GENERATION APPARATUS AND MOORING METHOD THEREOF",
            "pubdate": "20160928",
            "inventor": "KOMATSU, Masao/Tokyo 108-8215\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP12798144B1": {
            "patentid": "EP12798144B1",
            "path": "EP12798144NWB1",
            "title": "METHODS AND SYSTEMS FOR WARNING A WIND TURBINE GENERATOR IN A WIND PARK OF AN EXTREME WIND EVENT",
            "pubdate": "20171025",
            "inventor": "KJ\u00c6R, Martin Ansbjerg/DK-8462 Harlev J\u00a0(DK), BRATH, Per/DK-8920 Randers NV\u00a0(DK), THOMSEN, Jesper Sandberg/DK-8370 Hadsten\u00a0(DK), DALSGAARD, S\u00f8ren/DK-8370 Hadsten\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12794171B1": {
            "patentid": "EP12794171B1",
            "path": "EP12794171NWB1",
            "title": "A SHUTDOWN CONTROLLER FOR A WIND TURBINE AND A METHOD OF SHUTTING DOWN A WIND TURBINE",
            "pubdate": "20170412",
            "inventor": "HAMMERUM, Keld/DK-8370 Hadsten\u00a0(DK)",
            "mainpicture": "imgb0001.png"
        },
        "EP12735253B1": {
            "patentid": "EP12735253B1",
            "path": "EP12735253NWB1",
            "title": "VERFAHREN UND VORRICHTUNG ZUR STEUERUNG EINES GEFESSELTEN FLUGELEMENTS",
            "pubdate": "20151216",
            "inventor": "ERHARD, Michael/22761 Hamburg\u00a0(DE), PAULIG, Xaver/22769 Hamburg\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP05708811B1": {
            "patentid": "EP05708811B1",
            "path": "EP05708811NWB1",
            "title": "WIND TURBINE BLADE",
            "pubdate": "20170405",
            "inventor": "GODSK, Kristian Balschmidt/DK-2200 Copenhagen N.\u00a0(DK), NIELSEN, Thomas S. Bjertrup/8900 Randers\u00a0(DK)",
            "mainpicture": "imgb0001.png"
        },
        "EP13002475B1": {
            "patentid": "EP13002475B1",
            "path": "EP13002475NWB1",
            "title": "Wind energy converter using kites",
            "pubdate": "20150805",
            "inventor": "Ippolito, Massimo/I-14020 Berzano di San Pietro (AT)\u00a0(IT), Taddei, Franco/I-23896 Sirtori (LC)\u00a0(IT)",
            "mainpicture": "imgb0001.png"
        },
        "EP11719614B1": {
            "patentid": "EP11719614B1",
            "path": "EP11719614NWB1",
            "title": "IMPROVEMENTS RELATING TO WIND TURBINES",
            "pubdate": "20151104",
            "inventor": "APPLETON, Steve/Fleet Hampshire GU52 7LU\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP12851585B1": {
            "patentid": "EP12851585B1",
            "path": "EP12851585NWB1",
            "title": "A METHOD AND AN ARRANGEMENT FOR MONITORING THE CONDITION OF A ROTATING SYSTEM",
            "pubdate": "20160706",
            "inventor": "BANKESTR\u00d6M, Olle/S-426 68 V\u00e4stra Fr\u00f6lunda\u00a0(SE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11150106B1": {
            "patentid": "EP11150106B1",
            "path": "EP11150106NWB1",
            "title": "Repository for a lubricant",
            "pubdate": "20160629",
            "inventor": "Bauer, Oto/7330 Brande\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP08761475B1": {
            "patentid": "EP08761475B1",
            "path": "EP08761475NWB1",
            "title": "PRODUCTION SYSTEM FOR ELECTRIC ENERGY AND HYDROGEN",
            "pubdate": "20171220",
            "inventor": "Acciona Energ\u00eda, S.A./31621 Sarriguren (Navarra)\u00a0(ES), Ingeteam Power Technology, S.A./48170 Zamudio (Bizkaia)\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP06807858B1": {
            "patentid": "EP06807858B1",
            "path": "EP06807858NWB1",
            "title": "LIGHTNING PROTECTION SYSTEM FOR WIND GENERATORS",
            "pubdate": "20160518",
            "inventor": "LLORENTE GONZ\u00c1LEZ, Jos\u00e9 Ignacio/E-31013 Pamplona\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP10152958B1": {
            "patentid": "EP10152958B1",
            "path": "EP10152958NWB1",
            "title": "Elastic element, suspension arrangement and wind turbine with suspension arrangement",
            "pubdate": "20150415",
            "inventor": "R\u00fcschoff, Ralf/45711 Datteln\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10785305B1": {
            "patentid": "EP10785305B1",
            "path": "EP10785305NWB1",
            "title": "HYDRAULIC PUMP STRUCTURE FOR WIND TURBINE GENERATOR OR TIDAL CURRENT GENERATOR AND METHOD OF MOUNTING HYDRAULIC PUMP",
            "pubdate": "20150617",
            "inventor": "TSUTSUMI, Kazuhisa/Tokyo 108-8215\u00a0(JP), NOGUCHI, Toshihide/Tokyo 108-8215\u00a0(JP), KOREMATSU, Yasuhiro/Tokyo 108-8215\u00a0(JP), SHIMIZU, Masayuki/Tokyo 108-8215\u00a0(JP), ROBERTSON, Alasdair/Midlothian Lothian EH20 9TB\u00a0(GB), STEIN, Uwe/Midlothian Lothian EH20-9TB\u00a0(GB), KARSTENS, Hauke/London Greater London W1K 6WL\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP12737899B1": {
            "patentid": "EP12737899B1",
            "path": "EP12737899NWB1",
            "title": "HYDRAULIC MOTOR OR PUMP AND WIND TURBINE GENERATOR",
            "pubdate": "20150812",
            "inventor": "NISHIDA, Hideaki/Tokyo 108-8215\u00a0(JP), OCHIAI, Hiroyasu/Tokyo 108-8215\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP12799089B1": {
            "patentid": "EP12799089B1",
            "path": "EP12799089NWB1",
            "title": "A WIND TURBINE BLADE HAVING A CONDUCTIVE ROOT BUSHING",
            "pubdate": "20160420",
            "inventor": "HANSEN, Lars, Bo/DK-6534 Agerskov\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP13176679B1": {
            "patentid": "EP13176679B1",
            "path": "EP13176679NWB1",
            "title": "Architecture de montage de rotor de type Darrieus ou Savonius permettant de charger les roulements",
            "pubdate": "20151118",
            "inventor": "Hesnard, Renaud/92310 S\u00e8vres\u00a0(FR)",
            "mainpicture": "imgf0001.png"
        },
        "EP09003009B1": {
            "patentid": "EP09003009B1",
            "path": "EP09003009NWB1",
            "title": "Verfahren zum Betreiben einer Windenergieanlage und Windenergieanlage",
            "pubdate": "20150225",
            "inventor": "Steudel, Dirk/24116 Kiel\u00a0(DE), Von Mutius, Martin/24358 Ascheffel\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP08853819B1": {
            "patentid": "EP08853819B1",
            "path": "EP08853819NWB1",
            "title": "VERFAHREN UND SYSTEM ZUR MESSUNG EINER AUSLENKUNG EINES HOHLBAUTEILS EINER WINDENERGIEANLAGE AUS EINER NORMALPOSITION",
            "pubdate": "20170823",
            "inventor": "LUCKS, Christoph/20146 Hamburg\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10166739B1": {
            "patentid": "EP10166739B1",
            "path": "EP10166739NWB1",
            "title": "Wind turbine acoustic emission control system and method",
            "pubdate": "20170412",
            "inventor": "Kinzie, Kevin/Moore, SC 29369\u00a0(US), Herr, Stefan/Greenville, SC 29601\u00a0(US), Petitjean, Beniot/Greer, SC 29560\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP12184761B1": {
            "patentid": "EP12184761B1",
            "path": "EP12184761NWB1",
            "title": "Device for spacing a hub flange and a blade flange, system comprising a rotor hub, a rotor blade and a device for spacing and method of installing a rotor blade on a rotor hub",
            "pubdate": "20160113",
            "inventor": "Wagner, Raimund/22391 Hamburg\u00a0(DE), Monux Belloso, Oscar/28205 Bremen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10745282B1": {
            "patentid": "EP10745282B1",
            "path": "EP10745282NWB1",
            "title": "WIND TURBINE DATA ACQUISITION SYSTEM",
            "pubdate": "20170308",
            "inventor": "MILO, Anders, Holm/DK-8320 Maarslet\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10157977B1": {
            "patentid": "EP10157977B1",
            "path": "EP10157977NWB1",
            "title": "Arrangement for directing a lightning current within a wind turbine",
            "pubdate": "20160511",
            "inventor": "Munk-Hansen, Thorkil/7323, Give\u00a0(DK), Nielsen, Rune/8600, Silkeborg\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12759159B1": {
            "patentid": "EP12759159B1",
            "path": "EP12759159NWB1",
            "title": "DISPOSITIF DE LIAISON DE TRON\u00c7ONS D'AILES ET PROC\u00c9D\u00c9 D'ASSEMBLAGE DE TELS TRON\u00c7ONS",
            "pubdate": "20171115",
            "inventor": "CUSSAC, David/33160 Saint Medard En Jalles\u00a0(FR), HUMBLOT, Antoine/33160 Saint Medard En Jalles\u00a0(FR)",
            "mainpicture": "imgf0001.png"
        },
        "EP10709569B1": {
            "patentid": "EP10709569B1",
            "path": "EP10709569NWB1",
            "title": "A HINGED CONNECTION APPARATUS FOR SECURING A FIRST WIND TURBINE COMPONENT TO A SECOND",
            "pubdate": "20150422",
            "inventor": "WESTERGAARD, Carsten, Hein/Houston TX 77010\u00a0(US), HANCOCK, Mark/Hampshire SO15 5HN\u00a0(GB), NARASIMALU, Srikanth/535206 Singapore\u00a0(SG)",
            "mainpicture": "imgf0001.png"
        },
        "EP13004184B1": {
            "patentid": "EP13004184B1",
            "path": "EP13004184NWB1",
            "title": "Verfahren zur Verlegung eines Kabels im Offshore-Bereich von einer Windenergieanlage zu einem Zielort und Windenergieanlage zur Anordnung im Offshore-Bereich",
            "pubdate": "20150506",
            "inventor": "Weber, Klaus, Dr./72366 Balingen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12746039B1": {
            "patentid": "EP12746039B1",
            "path": "EP12746039NWB1",
            "title": "WIND POWER STATION",
            "pubdate": "20161012",
            "inventor": "LERWE, Olaf/16269 Wriezen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP03773586B1": {
            "patentid": "EP03773586B1",
            "path": "EP03773586NWB1",
            "title": "LIGHTNING PROTECTION SYSTEM FOR A WIND TURBINE, METHOD AND USE THEREOF",
            "pubdate": "20170726",
            "inventor": "MOLBECH, Allan, Laursen/DK-6940 Lem St\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12157146B1": {
            "patentid": "EP12157146B1",
            "path": "EP12157146NWB1",
            "title": "Roller bearing, cage segment and main-shaft support structure for wind-driven generator",
            "pubdate": "20150408",
            "inventor": "Omoto, Tatsuya/Kuwana-shi, Mie 511-0811\u00a0(JP), Hioki, Shoichi/Kuwana-shi, Mie 511-0811\u00a0(JP), Sasabe, Mitsuo/Kuwana-shi, Mie 511-0811\u00a0(JP), Nakamizo, Eiichi/Kuwana-shi, Mie 511-0811\u00a0(JP), Sakaguchi, Tomoya/Kuwana-shi, Mie 511-0811\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP10720638B1": {
            "patentid": "EP10720638B1",
            "path": "EP10720638NWB1",
            "title": "A WIND POWER PLANT AND A METHOD OF OPERATING A WIND POWER PLANT",
            "pubdate": "20150401",
            "inventor": "WICKSTROM, Anders/S-652 24 Karlstad\u00a0(SE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10707045B1": {
            "patentid": "EP10707045B1",
            "path": "EP10707045NWB1",
            "title": "WIND TURBINE BLADE WITH A LIGHTNING PROTECTION SYSTEM AND RETROFITTING METHOD",
            "pubdate": "20170712",
            "inventor": "HANSEN, Lars Bo/DK-6534 Agerskov\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10717729B1": {
            "patentid": "EP10717729B1",
            "path": "EP10717729NWB1",
            "title": "EXTRACTING WAVE ENERGY IN A WIND TURBINE INSTALLATION",
            "pubdate": "20160608",
            "inventor": "SKAARE, Bj\u00d8rn/N-7619 Skogn\u00a0(NO)",
            "mainpicture": "imgb0001.png"
        },
        "EP13163123B1": {
            "patentid": "EP13163123B1",
            "path": "EP13163123NWB1",
            "title": "Turmkopf einer Windenergieanlage",
            "pubdate": "20150415",
            "inventor": "Klinger, Prof. Dr.-Ing. Friedrich/66119 Saarbr\u00fccken\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12738029B1": {
            "patentid": "EP12738029B1",
            "path": "EP12738029NWB1",
            "title": "ROTORFL\u00dcGEL F\u00dcR WINDKRAFTWERKE",
            "pubdate": "20161221",
            "inventor": "AL-SHEYYAB, Ahmad/95111 Rehau\u00a0(DE), MICHELS, Peter/95028 Hof\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11743424B1": {
            "patentid": "EP11743424B1",
            "path": "EP11743424NWB1",
            "title": "ROTOR BLADE FOR A WIND TURBINE AND METHOD OF MAKING SAME",
            "pubdate": "20151216",
            "inventor": "VUILLAUME, Amaury/Cowes Isle of Wight PO31 8JY\u00a0(GB), PAYNE, Chris/Bristol BS21 5BY\u00a0(GB), HAHN, Frank, Hoelgaard/DK-6950 Ringk\u00f8bing\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11735920B1": {
            "patentid": "EP11735920B1",
            "path": "EP11735920NWB1",
            "title": "ENERGY EXTRACTION DEVICE, GROUP OF ENERGY EXTRACTION DEVICES AND OPERATING METHODS",
            "pubdate": "20160316",
            "inventor": "CALDWELL, Niall/Loanhead Midlothian Lothian EH20 9TB\u00a0(GB), DUMNOV, Daniil/Loanhead Midlothian Lothian EH20 9TB\u00a0(GB), FIELDING, Michael/Loanhead Midlothian Lothian EH20 9TB\u00a0(GB), LAIRD, Stephen/Loanhead Midlothian Lothian EH20 9TB\u00a0(GB), STEIN, Uwe/EH209TBLoanhead Midlothian Lothian EH20 9TB\u00a0(GB), TAYLOR, Jamie/Loanhead Midlothian Lothian EH20 9TB\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP09755879B1": {
            "patentid": "EP09755879B1",
            "path": "EP09755879NWB1",
            "title": "DEVICE FOR ADJUSTMENT OF A ROTOR BLADE, WIND ENERGY CONVERTER, AND METHOD FOR ADJUSTING A ROTOR BLADE",
            "pubdate": "20150812",
            "inventor": "WOLF, Anton/A-9073 Viktring\u00a0(AT)",
            "mainpicture": "imgf0001.png"
        },
        "EP09811935B1": {
            "patentid": "EP09811935B1",
            "path": "EP09811935NWB1",
            "title": "FLUID TURBINE SYSTEMS",
            "pubdate": "20161116",
            "inventor": "DERUYTER, William/Norco CA 92680\u00a0(US), ALLAWOS, Michael/Glendora CA 91741\u00a0(US), COYE, Peter, L./Claremont CA 91711\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP12172274B1": {
            "patentid": "EP12172274B1",
            "path": "EP12172274NWB1",
            "title": "Windnachf\u00fchrungsanordnung einer Windenergieanlage.",
            "pubdate": "20160608",
            "inventor": "Feddersen, Lorenz-Theo/48429 Rheine\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11168880B1": {
            "patentid": "EP11168880B1",
            "path": "EP11168880NWB1",
            "title": "Method of modifying the surface shape of a wind turbine rotor blade",
            "pubdate": "20161116",
            "inventor": "Stege, Jason/7330 Brande\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP05254010B1": {
            "patentid": "EP05254010B1",
            "path": "EP05254010NWB1",
            "title": "Electrical machine with double-sided rotor",
            "pubdate": "20170405",
            "inventor": "Jansen, Patrick Lee/Alplaus New York 12008\u00a0(US), Carl Jr, Ralph James/Clifton Park New York 12065\u00a0(US), Fogarty, James Michael/Schenectady New York 12309\u00a0(US), Lyons, James Patrick/Niskayuna New York 12309\u00a0(US), Qu, Ronghai/Clifton Park New York 12065\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP12000120B1": {
            "patentid": "EP12000120B1",
            "path": "EP12000120NWB1",
            "title": "Verfahren zum Betreiben einer Windenergieanlage, bei dem auf Grundlage meteorologischer Daten eine Vereisungsgefahr ermittelt wird, und Windenergieanlage zur Ausf\u00fchrung des Verfahrens",
            "pubdate": "20150805",
            "inventor": "Renschler, Oskar/22941 Delingsdorf\u00a0(DE), L\u00f6we, Astrid/22301 Hamburg\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP04806227B1": {
            "patentid": "EP04806227B1",
            "path": "EP04806227NWB1",
            "title": "METHOD OF MANUFACTURING A WIND TURBINE BLADE SHELL MEMBER WITH A FASTENING MEMBER AND A WIND TURBINE BLADE WITH A FASTENING MEMBER",
            "pubdate": "20160629",
            "inventor": "HANCOCK, Mark/Southampton SO15 5HN\u00a0(GB), BECH, Anton/DK-6950 Ringk\u00f8bing\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12161675B1": {
            "patentid": "EP12161675B1",
            "path": "EP12161675NWB1",
            "title": "System and method for operating capacitor banks",
            "pubdate": "20161026",
            "inventor": "Krok, Michael Joseph/Niskayuna, NY 12309\u00a0(US), Genc, Sahika/Niskayuna, NY 12309\u00a0(US)",
            "mainpicture": "imgb0001.png"
        },
        "EP09730751B1": {
            "patentid": "EP09730751B1",
            "path": "EP09730751NWB1",
            "title": "DISPOSITIF DE ROULEMENT POUR NACELLE D'EOLIENNE",
            "pubdate": "20150429",
            "inventor": "CANINI, Jean Marc/F-59149 Aibes\u00a0(FR), LHENRY, Bernard Claude/F-71200 Le Creusot\u00a0(FR)",
            "mainpicture": "imgf0001.png"
        },
        "EP13002499B1": {
            "patentid": "EP13002499B1",
            "path": "EP13002499NWB1",
            "title": "Wind energy converter using kites",
            "pubdate": "20150506",
            "inventor": "Ippolito, Massimo/I-14020 Berzano di San Pietro (AT)\u00a0(IT), Taddei, Franco/I-23896 Sirtori (LC)\u00a0(IT)",
            "mainpicture": "imgb0001.png"
        },
        "EP11195653B1": {
            "patentid": "EP11195653B1",
            "path": "EP11195653NWB1",
            "title": "A wind turbine maintenance system and a method of maintenance therein",
            "pubdate": "20150422",
            "inventor": "Xia, Qinghua/680233 Singapore\u00a0(SG), Zhang, Tieling/120708 Singapore\u00a0(SG), Liew, Adrian/737893 Singapore\u00a0(SG)",
            "mainpicture": "imgf0001.png"
        },
        "EP12740717B1": {
            "patentid": "EP12740717B1",
            "path": "EP12740717NWB1",
            "title": "FLUID WORKING MACHINE AND WIND TURBINE GENERATOR",
            "pubdate": "20150805",
            "inventor": "NISHIDA, Hideaki/Tokyo 108-8215\u00a0(JP), OCHIAI, Hiroyasu/Tokyo 108-8215\u00a0(JP), UCHIDA, Michiya/Tokyo 108-8215\u00a0(JP), DODSON, Henry/Midlothian, Lothian EH20 9TB\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP11193848B1": {
            "patentid": "EP11193848B1",
            "path": "EP11193848NWB1",
            "title": "System of anchoring and mooring of floating wind turbine towers and corresponding methods for towing and erecting thereof",
            "pubdate": "20150218",
            "inventor": "Graf, Andreas/2542 Pieterlen\u00a0(CH)",
            "mainpicture": "imgf0001.png"
        },
        "EP11804630B1": {
            "patentid": "EP11804630B1",
            "path": "EP11804630NWB1",
            "title": "WIND TURBINE COMPONENT HAVING A CORROSION PROTECTION STRUCTURE, AND WIND TURBINE HAVING THE SAME",
            "pubdate": "20151014",
            "inventor": "LUND, Lars/DK-7500 Holstebro\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP14166104B1": {
            "patentid": "EP14166104B1",
            "path": "EP14166104NWB1",
            "title": "Airflow modifying assembly for a rotor blade of a wind turbine",
            "pubdate": "20151014",
            "inventor": "Riddell, Scott Gabell/Greenville, SC 29615\u00a0(US), Booth, Michael Christopher/Greenville, SC 29615\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP10764015B1": {
            "patentid": "EP10764015B1",
            "path": "EP10764015NWB1",
            "title": "WIND TURBINE BLADE AND METHOD OF CONSTRUCTING SAME",
            "pubdate": "20160309",
            "inventor": "VASUDEVA, Kailash/Waterloo, Ontario N2J 4G8\u00a0(CA), BEDI, Sanjeev/Waterloo, Ontario N2T 1P9\u00a0(CA)",
            "mainpicture": "imgf0001.png"
        },
        "EP10163393B1": {
            "patentid": "EP10163393B1",
            "path": "EP10163393NWB1",
            "title": "Method of moulding a wind turbine blade using a release film, and said film",
            "pubdate": "20160831",
            "inventor": "Schibsbye, Karsten/7000 Fredericia\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12737898B1": {
            "patentid": "EP12737898B1",
            "path": "EP12737898NWB1",
            "title": "POWER GENERATING APPARATUS OF RENEWABLE ENERGY AND METHOD OF ATTACHING A HYDRAULIC PUMP THEREOF",
            "pubdate": "20150107",
            "inventor": "KAMEDA, Takuro/Tokyo 108-8215\u00a0(JP), FURUKAWA, Syogo/Tokyo 108-8215\u00a0(JP), ROBERTSON, Alasdair/Loanhead Midlothian Lothian EH20 9TB\u00a0(GB), STEIN, Uwe/Loanhead Midlothian Lothian EH20 9TB\u00a0(GB), DODSON, Henry/Loanhead Midlothian Lothian EH20 9TB\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP05252587B1": {
            "patentid": "EP05252587B1",
            "path": "EP05252587NWB1",
            "title": "Methods and apparatus for reduction of asymmetric rotor loads in wind turbines",
            "pubdate": "20150318",
            "inventor": "Moroz, Emilian Mieczyslaw/San Diego California 92127\u00a0(US), Pierce, Kirk Gee/Simpsonville South Carolina 29681\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP10729165B1": {
            "patentid": "EP10729165B1",
            "path": "EP10729165NWB1",
            "title": "SYSTEM FOR CONTROL OF WIND POWER ELECTRICITY GENERATION ACCUMULATOR AND METHOD OF CONTROL THEREOF",
            "pubdate": "20170517",
            "inventor": "ABE, Keiko/Hitachi-shi Ibaraki 319-1292\u00a0(JP), WATANABE, Masahiro/Hitachi-shi Ibaraki 319-1292\u00a0(JP), KOBAYASHI, Yasuhiro/Hitachi-shi Ibaraki 319-1292\u00a0(JP), FURUKAWA, Toshiyuki/Hitachi-shi Ibaraki 319-1292\u00a0(JP), TAKABAYASHI, Hisaaki/Tokyo 104-0044\u00a0(JP), HIROSE, Yoshikazu/Tokyo 104-0044\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP10191829B1": {
            "patentid": "EP10191829B1",
            "path": "EP10191829NWB1",
            "title": "Rotor blade of a wind turbine",
            "pubdate": "20170222",
            "inventor": "Babu, Achuthan/560066 Bangalore,  Karnataka\u00a0(IN), Tripathi, Sachin K./560066 Bangalore,  Karnataka\u00a0(IN), Akhtar, Afroz/560066 Bangalore,  Karnataka\u00a0(IN)",
            "mainpicture": "imgf0001.png"
        },
        "EP10810274B1": {
            "patentid": "EP10810274B1",
            "path": "EP10810274NWB1",
            "title": "POWER GENERATION SYSTEM AND METHOD",
            "pubdate": "20171213",
            "inventor": "Gerard, Henry M./Capistrano Beach, CA 92624\u00a0(US)",
            "mainpicture": "imgb0001.png"
        },
        "EP12714265B1": {
            "patentid": "EP12714265B1",
            "path": "EP12714265NWB1",
            "title": "A METHOD OF OBTAINING VERTICAL ALIGNMENT OF A TOWER",
            "pubdate": "20150527",
            "inventor": "RAMSLIE, Sigurd/Quinns Rocks Western Australia 6030\u00a0(AU), NODBERG, Trond, Kjetil/N-3400 Lier\u00a0(NO)",
            "mainpicture": "imgf0001.png"
        },
        "EP11191274B1": {
            "patentid": "EP11191274B1",
            "path": "EP11191274NWB1",
            "title": "Wind turbine control system",
            "pubdate": "20151028",
            "inventor": "Hansen, Ulrich Vestergaard B./7400 Herning\u00a0(DK), Hoejgaard, Jannik/7330 Brande\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10790628B1": {
            "patentid": "EP10790628B1",
            "path": "EP10790628NWB1",
            "title": "Wind turbine blade provided with optical wind velocity measurement system",
            "pubdate": "20170301",
            "inventor": "FUGLSANG, Peter/DK-7100 Vejle\u00a0(DK), FUGLSANG, Lars/DK-5260 Odense S\u00a0(DK), HAMMER, Lars Christian Hvidegaard/DK-7000 Fredericia\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11779337B1": {
            "patentid": "EP11779337B1",
            "path": "EP11779337NWB1",
            "title": "Wind turbine system and method using voltage generating material",
            "pubdate": "20160113",
            "inventor": "HJORT, Thomas/DK-7120 Vejle \u00d8st\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP08776077B1": {
            "patentid": "EP08776077B1",
            "path": "EP08776077NWB1",
            "title": "A ROOT END JOINT FOR A WIND TURBINE BLADE",
            "pubdate": "20170517",
            "inventor": "RUDLING, Paul/Calbourne P030 4JE Isle of Wight\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP11182332B1": {
            "patentid": "EP11182332B1",
            "path": "EP11182332NWB1",
            "title": "Nacelle for a wind turbine",
            "pubdate": "20160525",
            "inventor": "Munk-Hansen, Thorkil/7323 Give\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP09250462B1": {
            "patentid": "EP09250462B1",
            "path": "EP09250462NWB1",
            "title": "Method for operating a wind turbine plant during high wind conditions",
            "pubdate": "20150909",
            "inventor": "Cardinal, Mark E./Altamont New York 12009\u00a0(US), Pierce, Kirk Gee/Simpsonville South Carolina 29681\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP11714522B1": {
            "patentid": "EP11714522B1",
            "path": "EP11714522NWB1",
            "title": "DYNAMISCHE TR\u00c4GHEITSREGELUNG",
            "pubdate": "20171122",
            "inventor": "KR\u00dcGER, Thomas/DK-8381 Tilst\u00a0(DK), GEISLER, Jens/24768 Rendsburg\u00a0(DE), SCHRADER, Stefan/24106 Kiel\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12833851B1": {
            "patentid": "EP12833851B1",
            "path": "EP12833851NWB1",
            "title": "Power generating apparatus of renewable energy type",
            "pubdate": "20160817",
            "inventor": "KAMEDA, Takuro/Tokyo 108-8215\u00a0(JP), FURUKAWA, Syogo/Tokyo 108-8215\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP12151192B1": {
            "patentid": "EP12151192B1",
            "path": "EP12151192NWB1",
            "title": "Modular tower and methods of assembling same",
            "pubdate": "20160413",
            "inventor": "Haridasu, Balaji/560066 Bangalore\u00a0(IN), Fang, Biao/Schenectady, NY New York 12345\u00a0(US), Zheng, Danian/Greenville, SC South Carolina 29615\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP10726800B1": {
            "patentid": "EP10726800B1",
            "path": "EP10726800NWB1",
            "title": "METHOD FOR CONTROLLING A WIND TURBINE GENERATING DEVICE",
            "pubdate": "20161005",
            "inventor": "TOYOHARA, Takashi/Nagasaki-shi Nagasaki 851-0392\u00a0(JP), HASHIMOTO, Masayuki/Nagasaki-shi Nagasaki 851-0392\u00a0(JP), MATSUSHITA, Takatoshi/Nagasaki-shi Nagasaki 850-8610\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP12169733B1": {
            "patentid": "EP12169733B1",
            "path": "EP12169733NWB1",
            "title": "System and methods for monitoring oil conditions of a wind turbine gearbox",
            "pubdate": "20150304",
            "inventor": "Davis, John Paul/Schenectady, NY New York 12345\u00a0(US), Mazzaro, Maria Cecilia/Greenville, SC South Carolina 29615\u00a0(US), Oates, Jack Darrin/Greenville, SC South Carolina 29615\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP13165754B1": {
            "patentid": "EP13165754B1",
            "path": "EP13165754NWB1",
            "title": "Wind turbine rotor with pitch brake",
            "pubdate": "20150603",
            "inventor": "Pasquet, Pierre/08328 ALELLA\u00a0(ES), Canedo Pardo, Santiago/08037 BARCELONA\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP10704777B1": {
            "patentid": "EP10704777B1",
            "path": "EP10704777NWB1",
            "title": "BLATTWINKELVERSTELLANTRIEB F\u00dcR EINE WINDKRAFTANLAGE",
            "pubdate": "20170104",
            "inventor": "WIBBEN, Norbert/48499 Salzbergen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP14166097B1": {
            "patentid": "EP14166097B1",
            "path": "EP14166097NWB1",
            "title": "Rotor blade assembly having vortex generators for wind turbine",
            "pubdate": "20160907",
            "inventor": "Wilson, Megan Michela/Greenville, SC 29615-4614\u00a0(US), Herr, Stefan/Greenville, SC 29615\u00a0(US), Vedula, Ramesh/560066 Bangalore\u00a0(IN), Luedke, Jonathan Glenn/Greenville, SC 29615\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP11801966B1": {
            "patentid": "EP11801966B1",
            "path": "EP11801966NWB1",
            "title": "Transportation of drive train components in a wind turbine nacelle",
            "pubdate": "20160323",
            "inventor": "BITSCH, Michael Lundgaard/DK-8860 Ulstrup\u00a0(DK), MOGENSEN, Morten/DK-8520 Lystrup\u00a0(DK), MAZYAR, Abolfazlian/DK-8220 Brabrand\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10194783B1": {
            "patentid": "EP10194783B1",
            "path": "EP10194783NWB1",
            "title": "A fluid turbine blade and method of providing the same",
            "pubdate": "20161102",
            "inventor": "Yerramalli, Chandra Sekher/Niskayuna, NY 12309\u00a0(US), Quek, Shu Ching Nmn/Niskayuna, NY 12309\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP10179277B1": {
            "patentid": "EP10179277B1",
            "path": "EP10179277NWB1",
            "title": "Wind turbine component handling apparatus",
            "pubdate": "20151028",
            "inventor": "Tehrani, Ashkan Vaziri/8000 Aarhus\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11009769B1": {
            "patentid": "EP11009769B1",
            "path": "EP11009769NWB1",
            "title": "Windkraft-Hybridrotor",
            "pubdate": "20151014",
            "inventor": "Seifert, Jost/81927 M\u00fcnchen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12008532B1": {
            "patentid": "EP12008532B1",
            "path": "EP12008532NWB1",
            "title": "Schwingungstilgeranordnurg",
            "pubdate": "20151118",
            "inventor": "Engelhardt, J\u00fcrgen/97249 Eisingen\u00a0(DE), Katz, Sebastian/97082 W\u00fcrzburg\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10013342B1": {
            "patentid": "EP10013342B1",
            "path": "EP10013342NWB1",
            "title": "AUXILIARY REFRIGERATION SYSTEM AND OPERATING METHOD",
            "pubdate": "20160413",
            "inventor": "Alcalde Ayala, Ricardo/31621 Sarriguren\u00a0(ES), Brito Garcia, Carlos/31621 Sarriguren\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP13155820B1": {
            "patentid": "EP13155820B1",
            "path": "EP13155820NWB1",
            "title": "Flange assistant for connecting adjacent tower sections",
            "pubdate": "20150729",
            "inventor": "Lam, Johnny Steven/8543 Hornslet\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP08856521B1": {
            "patentid": "EP08856521B1",
            "path": "EP08856521NWB1",
            "title": "COMPENSATION SYSTEM FOR A ROTOR",
            "pubdate": "20160608",
            "inventor": "LEITHEAD, William, E/Bridge of Weir PA11 3JD\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP12187963B1": {
            "patentid": "EP12187963B1",
            "path": "EP12187963NWB1",
            "title": "Power Generator",
            "pubdate": "20170329",
            "inventor": "Miyamoto, Yasuhiro/Kitakyushu-shi, Fukuoka 806-0004\u00a0(JP), Nishi, Shinichi/Kitakyushu-shi, Fukuoka 806-0004\u00a0(JP), Utsunomiya, Masayuki/Kitakyushu-shi, Fukuoka 806-0004\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP10168614B1": {
            "patentid": "EP10168614B1",
            "path": "EP10168614NWB1",
            "title": "Wind turbine aerodynamic separation control",
            "pubdate": "20160907",
            "inventor": "Eggleston, Eric/Tehachapi, CA 93561\u00a0(US), Wolfe, Christopher/Niskayuna, NY 12309\u00a0(US), Ruggiero, Eric John/Rensselaer, NY 12144\u00a0(US), Simpson, Alexander/80803, Munchen\u00a0(DE), Rodriguez-Erdmenger, Rodrigo/80804, Munich, Bavaria\u00a0(DE), Pannekeet, Robbert/80796, Munich, Bavaria\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11726060B1": {
            "patentid": "EP11726060B1",
            "path": "EP11726060NWB1",
            "title": "CONTROL METHOD FOR A WIND TURBINE",
            "pubdate": "20160727",
            "inventor": "DALSGAARD, S\u00f8ren/DK-8370 Hadsten\u00a0(DK), RISAGER, Lars/DK-8680 Ry\u00a0(DK)",
            "mainpicture": "imgb0001.png"
        },
        "EP11799348B1": {
            "patentid": "EP11799348B1",
            "path": "EP11799348NWB1",
            "title": "A METHOD OF OPERATING A WIND TURBINE AS WELL AS A SYSTEM SUITABLE THEREFORE",
            "pubdate": "20160323",
            "inventor": "GUPTA, Amit Kumar/Singapore 120601\u00a0(SG), TRIPATHI, Anshuman/Singapore 658882\u00a0(SG), STYHM, Ove/DK-8370 Hadsten\u00a0(DK), HELLE, Lars/DK-9541 Suldrup\u00a0(DK), KARUPPANAN, Yugarajan/Singapore 600224\u00a0(SG), OPINA, Gil Jr Lampong/Singapore 738082\u00a0(SG)",
            "mainpicture": "imgf0001.png"
        },
        "EP12816357B1": {
            "patentid": "EP12816357B1",
            "path": "EP12816357NWB1",
            "title": "WIND TURBINE GENERATOR",
            "pubdate": "20151028",
            "inventor": "LAVENDER, Jack/Loanhead, EH20 9TB\u00a0(GB), NISHIDA, Hideaki/Tokyo, 108-8215\u00a0(JP), OCHIAI, Hiroyasu/Tokyo, 108-8215\u00a0(JP), VOLLER, Gordon/Loanhead, EH20 9TB\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP12701250B1": {
            "patentid": "EP12701250B1",
            "path": "EP12701250NWB1",
            "title": "WIND PARK WITH REAL TIME WIND SPEED MEASUREMENTS",
            "pubdate": "20160406",
            "inventor": "MARINOPOULOS, Antonis/S-722 28 V\u00e4ster\u00e5s\u00a0(SE), LENDENMANN, Heinz/S-722 18 V\u00e4ster\u00e5s\u00a0(SE), PAN, Jiuping/Raleigh, North Carolina 27606\u00a0(US), SRIVASTAVA, Kailash/S-722 28 V\u00e4ster\u00e5s\u00a0(SE), ZARGHAMI, Mahyar/Raleigh, CA 95618\u00a0(US), REZA, Muhamad/S-723 44 V\u00e4ster\u00e5s\u00a0(SE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11729306B1": {
            "patentid": "EP11729306B1",
            "path": "EP11729306NWB1",
            "title": "Wind turbine blade for a rotor of a wind turbine",
            "pubdate": "20150225",
            "inventor": "QUIRING, Peter/DK-6620 R\u00f8dding\u00a0(DK), PRETE, Rocco/DK-6000 Kolding\u00a0(DK), LINDBY, Torben/DK-6621 Gesten\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12735444B1": {
            "patentid": "EP12735444B1",
            "path": "EP12735444NWB1",
            "title": "POWER GENERATION SYSTEM AND METHOD FOR OPERATING A POWER GENERATION SYSTEM",
            "pubdate": "20151014",
            "inventor": "NIELSEN, John Godsk/DK-8543 Hornslet\u00a0(DK), STYHM, Ove/DK-8370 Hadsten\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP08011573B1": {
            "patentid": "EP08011573B1",
            "path": "EP08011573NWB1",
            "title": "Offshore-Plattform",
            "pubdate": "20160824",
            "inventor": "Bilfinger Marine & Offshore Systems GmbH/22085 Hamburg\u00a0(DE), Per Aarsleff A/S/8230 Abyhoj\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10161037B1": {
            "patentid": "EP10161037B1",
            "path": "EP10161037NWB1",
            "title": "A method and a system for controlling operation of a wind turbine",
            "pubdate": "20160525",
            "inventor": "Zhang, Tie Ling/138632 Singapore\u00a0(SG), Zhou, Yu/138632 Singapore\u00a0(SG), Lim, Khoon Peng/138632 Singapore\u00a0(SG), Chin, Bung Chai/138632 Singapore\u00a0(SG), Siew, Pey Yen/138632 Singapore\u00a0(SG), Ho, Jiann Yi/138632 Singapore\u00a0(SG), Chen, Wan Ying/138632 Singapore\u00a0(SG), Ong, Jiun Keat/138632 Singapore\u00a0(SG), Nandedkar, Kiran Kishan Rao/138632 Singapore\u00a0(SG)",
            "mainpicture": "imgb0001.png"
        },
        "EP07764463B1": {
            "patentid": "EP07764463B1",
            "path": "EP07764463NWB1",
            "title": "A TEST BENCH AND A METHOD FOR TESTING WIND TURBINE EQUIPMENT",
            "pubdate": "20170614",
            "inventor": "JENSEN, Jan, Bisgaard/8800 Viborg\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11869763B1": {
            "patentid": "EP11869763B1",
            "path": "EP11869763NWB1",
            "title": "RENEWABLE ENERGY POWER GENERATION DEVICE AND METHOD FOR DETECTING OIL LEAKAGE OF THE SAME",
            "pubdate": "20160706",
            "inventor": "TSUTSUMI, Kazuhisa/Tokyo 108-8215\u00a0(JP)",
            "mainpicture": "imgb0001.png"
        },
        "EP09716992B1": {
            "patentid": "EP09716992B1",
            "path": "EP09716992NWB1",
            "title": "A CONTROL SYSTEM AND A METHOD FOR REDUNDANT CONTROL OF A WIND TURBINE",
            "pubdate": "20170823",
            "inventor": "ORMEL, Frank/DK-8560 Kolind\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP07022879B1": {
            "patentid": "EP07022879B1",
            "path": "EP07022879NWB1",
            "title": "Method of damping tower vibrations of a wind turbine and inclination control system",
            "pubdate": "20150812",
            "inventor": "Egedal, Per/7400 Herning\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12750828B1": {
            "patentid": "EP12750828B1",
            "path": "EP12750828NWB1",
            "title": "WIND TURBINE WITH VENTILATION ARRANGEMENT",
            "pubdate": "20150408",
            "inventor": "AKASHI, Yu/Tokyo 108-8215\u00a0(JP), ZAEHR, Matthias/London, Greater London W1K 6WL\u00a0(GB), HILLER, Michael/London, Greater London W1K 6WL\u00a0(GB), DUDEN, Heinrich/London, Greater London W1K 6WL\u00a0(GB), GLINDEMANN, Henning/London, Greater London W1K 6WL\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP10779684B1": {
            "patentid": "EP10779684B1",
            "path": "EP10779684NWB1",
            "title": "IMPROVED CONTROL OF WIND TURBINE BLADE LIFT REGULATING MEANS",
            "pubdate": "20160504",
            "inventor": "BEHRENS, Tim/DK-2300 K\u00f8benhavn S\u00a0(DK), LIM, Li Hong Idris/821612 Singapore\u00a0(SG), LIM, Tian/357916 Singapore\u00a0(SG), LIM, Chee Kang/259343 Singapore\u00a0(SG), LIM, Teck Bin Arthur/370053 Singapore\u00a0(SG), CHONG, Kok, Leong/753357 Singapore\u00a0(SG), KIM, Whye Ghee/640443 Singapore\u00a0(SG), CHANG, Yun Chong Gabriel/640635 Singapore\u00a0(SG), KEN, Loh Wuh/640821 Singapore\u00a0(SG)",
            "mainpicture": "imgf0001.png"
        },
        "EP10718579B1": {
            "patentid": "EP10718579B1",
            "path": "EP10718579NWB1",
            "title": "VERFAHREN ZUM ERRICHTEN EINES TURMES UND TURM",
            "pubdate": "20160504",
            "inventor": "VOGEL, Markus/26121 Oldenburg\u00a0(DE), HOFMANN, Jens/39175 Biederitz\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12724861B1": {
            "patentid": "EP12724861B1",
            "path": "EP12724861NWB1",
            "title": "WINDENERGIEANLAGE MIT HAUBENBLATTROTOR",
            "pubdate": "20170607",
            "inventor": "AHLRICHS, Ewald/26419 Schortens\u00a0(DE)",
            "mainpicture": "imgb0001.png"
        },
        "EP10785308B1": {
            "patentid": "EP10785308B1",
            "path": "EP10785308NWB1",
            "title": "WIND TURBINE GENERATOR AND TIDAL CURRENT GENERATOR",
            "pubdate": "20150527",
            "inventor": "MAEKAWA, Atsushi/1088215 Tokyo\u00a0(JP), SHIMIZU, Masayuki/1088215 Tokyo\u00a0(JP), SALTER, Stephen/Lothian EH209TB\u00a0(GB), STEIN, Uwe/Lothian EH209TB\u00a0(GB), RAMPEN, William/Lothian EH209TB\u00a0(GB), FOX, Robert/Lothian EH209TB\u00a0(GB), KARSTENS, Hauke/London, Greater London W1K6WL\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP11733561B1": {
            "patentid": "EP11733561B1",
            "path": "EP11733561NWB1",
            "title": "METHOD AND SYSTEM FOR MONITORING BENDING STRAIN ON WIND TURBINE BLADES",
            "pubdate": "20160629",
            "inventor": "OLESEN, Ib Svend/DK-8930 Randers\u00a0(DK)",
            "mainpicture": "imgb0001.png"
        },
        "EP11869762B1": {
            "patentid": "EP11869762B1",
            "path": "EP11869762NWB1",
            "title": "RENEWABLE ENERGY-TYPE ELECTRIC POWER GENERATION DEVICE AND ROTOR AFFIXATION METHOD FOR SAME",
            "pubdate": "20160330",
            "inventor": "HAMANO, Fumio/Tokyo 108-8215\u00a0(JP)",
            "mainpicture": "imgb0001.png"
        },
        "EP05803712B1": {
            "patentid": "EP05803712B1",
            "path": "EP05803712NWB1",
            "title": "VERTICAL AXIS TURBINE APPARATUS",
            "pubdate": "20150715",
            "inventor": "SHARPE, David John/Westcliff-on-Sea, Essex SS0 7TB\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP12758751B1": {
            "patentid": "EP12758751B1",
            "path": "EP12758751NWB1",
            "title": "VERFAHREN UND SYSTEM ZUR ENTEISUNG EINER WINDENERGIEANLAGE",
            "pubdate": "20150701",
            "inventor": "BRANDT, Karsten/24214 Altwittenbek\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10820947B1": {
            "patentid": "EP10820947B1",
            "path": "EP10820947NWB1",
            "title": "COMPOSITE CORES AND PANELS",
            "pubdate": "20160817",
            "inventor": "DAY, Stephen W./Centerville Ohio 45458\u00a0(US), SHEPPARD, Michael S./Centerville OH 45459\u00a0(US), STOLL, Frederick/West Chester Ohio 45069\u00a0(US), TILTON, Danny/Burnside Kentucky\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP11007098B1": {
            "patentid": "EP11007098B1",
            "path": "EP11007098NWB1",
            "title": "Rotorblatt oder Rotorblattsegment f\u00fcr eine Windenergieanlage",
            "pubdate": "20151028",
            "inventor": "Klein, Hendrik/18057 Rostock\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12182003B1": {
            "patentid": "EP12182003B1",
            "path": "EP12182003NWB1",
            "title": "Pitch lock system",
            "pubdate": "20170726",
            "inventor": "S\u00f8rensen, Carsten Bendix/8270 H\u00f8jbjerg\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11776207B1": {
            "patentid": "EP11776207B1",
            "path": "EP11776207NWB1",
            "title": "ROTORBLATT MIT HEIZVORRICHTUNG F\u00dcR EINE WINDENERGIEANLAGE",
            "pubdate": "20150513",
            "inventor": "LENSCHOW, Gerhard/26603 Aurich\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12460095B1": {
            "patentid": "EP12460095B1",
            "path": "EP12460095NWB1",
            "title": "Wind turbine with vertical rotation axis",
            "pubdate": "20151223",
            "inventor": "Koltuniewicz, Piotr/37-200 Przeworsk\u00a0(PL)",
            "mainpicture": "imgf0001.png"
        },
        "EP10194271B1": {
            "patentid": "EP10194271B1",
            "path": "EP10194271NWB1",
            "title": "Modular life extension kit for a wind turbine generator support frame",
            "pubdate": "20150415",
            "inventor": "Davis, John P./Greenville, SC 29615\u00a0(US), Antalek, James/Schenectady, NY 12345\u00a0(US), Conrad, Chad Robert/Greenville, SC 29615\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP10802737B1": {
            "patentid": "EP10802737B1",
            "path": "EP10802737NWB1",
            "title": "GENERATING ELECTRICAL POWER UTILIZING SURFACE-LEVEL HOT AIR AS THE HEAT SOURCE, HIGH ATMOSPHERE AS THE HEAT SINK AND A MICROWAVE BEAM TO INITIATE AND CONTROL AIR UPDRAFT",
            "pubdate": "20160420",
            "inventor": "Tepic, Slobodan/Boston, Massachusetts 02128\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP13306596B1": {
            "patentid": "EP13306596B1",
            "path": "EP13306596NWB1",
            "title": "\u00c9olienne offshore sur support flottant d\u00e9sax\u00e9",
            "pubdate": "20170816",
            "inventor": "Mabile, Claude/92140 Clamart\u00a0(FR), Gilloteaux, Jean-Christophe/92500 Rueil Malmaison\u00a0(FR)",
            "mainpicture": "imgb0001.png"
        },
        "EP11009623B1": {
            "patentid": "EP11009623B1",
            "path": "EP11009623NWB1",
            "title": "Verfahren zum Betrieb einer pitchgeregelten Windenergieanlage",
            "pubdate": "20171115",
            "inventor": "Kabatzke, Wolfgang/21502 Geesthacht\u00a0(DE), Rochholz, Hermann/39100 Bozen\u00a0(IT), Birkemeyer, Jochen/22848 Norderstedt\u00a0(DE)",
            "mainpicture": "imgb0001.png"
        },
        "EP11776074B1": {
            "patentid": "EP11776074B1",
            "path": "EP11776074NWB1",
            "title": "WIND TURBINE POWER TRANSMISSION SYSTEM",
            "pubdate": "20150429",
            "inventor": "MONGEAU, Peter/Center Conway, NH 03813\u00a0(US), ASHAR, Siddharth/80339 Munich\u00a0(DE), DEMTR\u00d6DER, Jens/DK-8410 R\u00f8nde\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11171158B1": {
            "patentid": "EP11171158B1",
            "path": "EP11171158NWB1",
            "title": "Method for monitoring a proximity sensor of a wind turbine",
            "pubdate": "20160810",
            "inventor": "Menke, Detlef/49505 Lotte\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11168377B1": {
            "patentid": "EP11168377B1",
            "path": "EP11168377NWB1",
            "title": "Horizontal axis wind turbine",
            "pubdate": "20170125",
            "inventor": "Yoshida, Shigeo/Tokyo, 160-8316\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP11250339B1": {
            "patentid": "EP11250339B1",
            "path": "EP11250339NWB1",
            "title": "Hybrid ram air turbine",
            "pubdate": "20161116",
            "inventor": "Russ, David Everett/Illinois 61108\u00a0(US), Larson, Michael E. JR/il 61109\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP11722706B1": {
            "patentid": "EP11722706B1",
            "path": "EP11722706NWB1",
            "title": "LAGERELEMENT",
            "pubdate": "20161109",
            "inventor": "KARI, Alexander/A-5330 Fuschl am See\u00a0(AT), FORSTNER, Christian/A-4810 Gmunden\u00a0(AT)",
            "mainpicture": "imgf0001.png"
        },
        "EP13174308B1": {
            "patentid": "EP13174308B1",
            "path": "EP13174308NWB1",
            "title": "Wind turbine blade and deicing method for the same",
            "pubdate": "20160629",
            "inventor": "MITSUBISHI HEAVY INDUSTRIES, LTD./Tokyo 108-8215\u00a0(JP), I.R.C.A. S.p.a. Industria Resistenze  Corazzate e Affini/31020 San Vendemiano (Treviso)\u00a0(IT)",
            "mainpicture": "imgf0001.png"
        },
        "EP13166543B1": {
            "patentid": "EP13166543B1",
            "path": "EP13166543NWB1",
            "title": "Wind turbine generator, and control unit and control method of the same",
            "pubdate": "20161109",
            "inventor": "Wakasa, Tsuyoshi/Tokyo, 108-8215\u00a0(JP), Iwasaki, Satoshi/Tokyo, 108-8215\u00a0(JP), Yamashita, Yukio/Tokyo, 108-8215\u00a0(JP), Hayashi, Yoshiyuki/Tokyo, 108-8215\u00a0(JP)",
            "mainpicture": "imgb0001.png"
        },
        "EP11772430B1": {
            "patentid": "EP11772430B1",
            "path": "EP11772430NWB1",
            "title": "VERTICAL AXIS WIND TURBINE",
            "pubdate": "20160601",
            "inventor": "HAAR, Jonathan/Cambridge MA 02140\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP11733560B1": {
            "patentid": "EP11733560B1",
            "path": "EP11733560NWB1",
            "title": "ICE DETECTION METHOD AND SYSTEM FOR WIND TURBINE BLADES",
            "pubdate": "20170308",
            "inventor": "OLESEN, Ib Svend/DK-8930 Randers\u00a0(DK)",
            "mainpicture": "imgb0001.png"
        },
        "EP10774461B1": {
            "patentid": "EP10774461B1",
            "path": "EP10774461NWB1",
            "title": "MAST ASSEMBLY FOR WIND TURBINE",
            "pubdate": "20160323",
            "inventor": "GRANT, Christopher, Bernard/Long Sault Ontario K0C 1P0\u00a0(CA)",
            "mainpicture": "imgf0001.png"
        },
        "EP07010505B1": {
            "patentid": "EP07010505B1",
            "path": "EP07010505NWB1",
            "title": "Device for the adjustment of the pitch of a rotor blade of a wind turbine",
            "pubdate": "20160420",
            "inventor": "Munch, Jesper/7100 Vejle\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11769785B1": {
            "patentid": "EP11769785B1",
            "path": "EP11769785NWB1",
            "title": "FERTIGUNG EINES ROTORBLATTES EINER WINDENERGIEANLAGE",
            "pubdate": "20160817",
            "inventor": "ZELLER, Lenz, Simon/24242 Felde\u00a0(DE), G\u00dcNTHER, Maik/06567 Bad Frankenhausen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11162976B1": {
            "patentid": "EP11162976B1",
            "path": "EP11162976NWB1",
            "title": "Spoiler for a wind turbine rotor blade",
            "pubdate": "20170913",
            "inventor": "Enevoldsen, Peder Bay/7100, Vejle\u00a0(DK), Kristensen, Jens J\u00f8rgen \u00d8stergaard/9240, Nibe\u00a0(DK), Stege, Jason/7330, Brande\u00a0(DK), Thrue, Carsten/8740, Braedstrup\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10767608B1": {
            "patentid": "EP10767608B1",
            "path": "EP10767608NWB1",
            "title": "FLOATING WIND TURBINE WITH TURBINE ANCHOR",
            "pubdate": "20161228",
            "inventor": "Barber, Gerald L./Greenville, SC 29615-3333\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP12707864B1": {
            "patentid": "EP12707864B1",
            "path": "EP12707864NWB1",
            "title": "COMPLEXE MULTICOUCHE ET SON UTILISATION POUR LA FABRICATION DE PIECES EN MATERIAU COMPOSITE.",
            "pubdate": "20160420",
            "inventor": "DE MULATIER, Bernard/F-69007 Lyon\u00a0(FR)",
            "mainpicture": "imgf0001.png"
        },
        "EP12766867B1": {
            "patentid": "EP12766867B1",
            "path": "EP12766867NWB1",
            "title": "AUFFANGVORRICHTUNG SOWIE VERFAHREN DAMIT",
            "pubdate": "20150513",
            "inventor": "Schr\u00f6der, Christian/21698 Harsefeld\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP06125799B1": {
            "patentid": "EP06125799B1",
            "path": "EP06125799NWB1",
            "title": "System for testing a wind turbine",
            "pubdate": "20150415",
            "inventor": "HORNEMANN, Michael Ulfert/Bozeman, MT 59715\u00a0(US), GALLOWAY, Steven/Tehachapi, CA 93561\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP07121058B1": {
            "patentid": "EP07121058B1",
            "path": "EP07121058NWB1",
            "title": "Hub for a horizontal axis wind turbine",
            "pubdate": "20160629",
            "inventor": "Masakazu, Kita/Shinjuku-ku Tokyo 160-0023\u00a0(JP), Ikuo, Tobinaga/Shinjuku-ku Tokyo 160-0023\u00a0(JP), Atsuki, Tomizawa/Shinjuku-ku Tokyo 160-0023\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP11190482B1": {
            "patentid": "EP11190482B1",
            "path": "EP11190482NWB1",
            "title": "Pilot circuitry for controlling the emergency feathering of a wind turbine",
            "pubdate": "20160706",
            "inventor": "Andersen, Jesper Lykkegaard/8543 Hornslet\u00a0(DK), Madsen, Jens Bay/8000 Aarhus\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11725210B1": {
            "patentid": "EP11725210B1",
            "path": "EP11725210NWB1",
            "title": "WIND TURBINE WITH A CENTRIFUGAL FORCE DRIVEN ADJUSTABLE PITCH ANGLE AND BLADES RETAINED BY CABLES",
            "pubdate": "20160907",
            "inventor": "MERTENS, Sander/NL-2275 CJ Voorburg\u00a0(NL), MERTENS, Eline, Maria/NL-2275 CJ Voorburg\u00a0(NL)",
            "mainpicture": "imgf0001.png"
        },
        "EP03772742B1": {
            "patentid": "EP03772742B1",
            "path": "EP03772742NWB1",
            "title": "WIND POWER GENERATOR",
            "pubdate": "20171108",
            "inventor": "ITO, Ryosuke/Suginami-ku, Tokyo 168-0065\u00a0(JP), SATO, Kiyoshi/Setagaya-ku, Tokyo 156-0043\u00a0(JP), TAMURA, Hideaki/Inagi-shi, Tokyo 206-0822\u00a0(JP), KAWAKAMI, Katsushi/Ichikawa-shi, Chiba 272-0015\u00a0(JP)",
            "mainpicture": "imgb0001.png"
        },
        "EP11193711B1": {
            "patentid": "EP11193711B1",
            "path": "EP11193711NWB1",
            "title": "Offshore wind turbine and method of operating same",
            "pubdate": "20161214",
            "inventor": "Scholte-Wassink, Hartmut/49828 Lage\u00a0(DE), Wickstroem, Anders/65224 Karlstad\u00a0(SE), Essing, Martin/48485 Neuenkirchen\u00a0(DE)",
            "mainpicture": "imgb0001.png"
        },
        "EP09008094B1": {
            "patentid": "EP09008094B1",
            "path": "EP09008094NWB1",
            "title": "Rotorwelle f\u00fcr eine Windenergieanlage",
            "pubdate": "20160727",
            "inventor": "G\u00f6pfert, Ulf/18057 Rostock\u00a0(DE), Kaiser, Uwe/18055 Rostock\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11790557B1": {
            "patentid": "EP11790557B1",
            "path": "EP11790557NWB1",
            "title": "LONG FIBRE OPTIC SENSOR SYSTEM IN A WIND TURBINE COMPONENT",
            "pubdate": "20150304",
            "inventor": "GLAVIND, Lars/DK-8900 Randers C\u00a0(DK), HJORT, Thomas/DK-7120 Vejle \u00d8st\u00a0(DK), OLESEN, Ib Svend/DK-8930 Randers\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12748061B1": {
            "patentid": "EP12748061B1",
            "path": "EP12748061NWB1",
            "title": "CRANE ARRANGEMENT",
            "pubdate": "20150408",
            "inventor": "ZAEHR, Matthias/London, Greater London W1K6WL\u00a0(GB), HILLER, Michael/London, Greater London W1K6WL\u00a0(GB), DUDEN, Heinrich/London, Greater London W1K6WL\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP11161910B1": {
            "patentid": "EP11161910B1",
            "path": "EP11161910NWB1",
            "title": "Method of controling a wind turbine generator",
            "pubdate": "20161019",
            "inventor": "Br\u00f6ndum, Larsen Kim/9560, Hadsund\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12755789B1": {
            "patentid": "EP12755789B1",
            "path": "EP12755789NWB1",
            "title": "TRANSITION STRUCTURE FOR A WIND TURBINE TOWER",
            "pubdate": "20150812",
            "inventor": "LARSEN, Gerner/DK-8382 Hinnerup\u00a0(DK), OLSEN, Niels Christian/DK-8830 Tjele\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10169781B1": {
            "patentid": "EP10169781B1",
            "path": "EP10169781NWB1",
            "title": "Tower with a guide system for power modules",
            "pubdate": "20150506",
            "inventor": "Meiners, Karl-Heinz/48485, Neuenkirchen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12382095B1": {
            "patentid": "EP12382095B1",
            "path": "EP12382095NWB1",
            "title": "An offshore wind turbine",
            "pubdate": "20171213",
            "inventor": "Men\u00e9dez  \u00c1lvarez, Elena/08005 BARCELONA\u00a0(ES)",
            "mainpicture": "imgb0001.png"
        },
        "EP06818138B1": {
            "patentid": "EP06818138B1",
            "path": "EP06818138NWB1",
            "title": "LIGHTNING PROTECTION SYSTEM FOR A WIND TURBINE BLADE",
            "pubdate": "20170531",
            "inventor": "HANSEN, Lars, Bo/DK-6534 Agerskov\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12707978B1": {
            "patentid": "EP12707978B1",
            "path": "EP12707978NWB1",
            "title": "WINDENERGIEANLAGE MIT EINEM ROTORBLATT UND EINEM BLITZABLEITER",
            "pubdate": "20150401",
            "inventor": "MAGNUS, Stefan/22941 Delingsdorf\u00a0(DE), THIEL, Enrico/18057 Rostock\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11811010B1": {
            "patentid": "EP11811010B1",
            "path": "EP11811010NWB1",
            "title": "BLATT- ODER MASCHINENHAUSLAGER EINER WINDKRAFTANLAGE",
            "pubdate": "20160727",
            "inventor": "FRANK, Hubertus/91315 H\u00f6chstadt\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12785662B1": {
            "patentid": "EP12785662B1",
            "path": "EP12785662NWB1",
            "title": "Connection system for connecting component sections of wind turbine blades",
            "pubdate": "20160831",
            "inventor": "MONTEJO YUSTE, Roberto/E-31006 Pamplona (Navarra)\u00a0(ES), AMEZQUETA PUEYO, Carlos/E-31006 Pamplona (Navarra)\u00a0(ES), LAHUERATA CALAHORRA, Francisco/E-31006 Pamplona (Navarra)\u00a0(ES), NUIN MARTINEZ DE LAGOS, I\u00f1aki/E-31006 Pamplona (Navarra)\u00a0(ES), GUELBENZU BLASCO, Javier/E-31006 Pamplona (Navarra)\u00a0(ES), SANZ MILLAN, Mercedes/E-31006 Pamplona (Navarra)\u00a0(ES), DEL RIO CARBAJO, Marcos/E-31006 Pamplona (Navarra)\u00a0(ES), FARI\u00d1AS CASTA\u00d1O, Ana Belen/E-31006 Pamplona (Navarra)\u00a0(ES), SAENZ MORE, Ernesto/E-31006 Pamplona (Navarra)\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP08014876B1": {
            "patentid": "EP08014876B1",
            "path": "EP08014876NWB1",
            "title": "Blade section for a wind turbine blade",
            "pubdate": "20170614",
            "inventor": "Rajkumar, Rajamani/Coimbatore Tamilnadu 641003\u00a0(IN)",
            "mainpicture": "imgf0001.png"
        },
        "EP10166738B1": {
            "patentid": "EP10166738B1",
            "path": "EP10166738NWB1",
            "title": "Method and system for noise controlled operation of a wind turbine",
            "pubdate": "20160518",
            "inventor": "Kinzie, Kevin/Moore, SC 29369\u00a0(US), Herr, Stefan/Greenville, SC 29601\u00a0(US), Petitjean, Beniot/Greer, SC 29560\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP11723238B1": {
            "patentid": "EP11723238B1",
            "path": "EP11723238NWB1",
            "title": "A METHOD FOR OPERATING A WIND TURBINE AT IMPROVED POWER OUTPUT",
            "pubdate": "20160629",
            "inventor": "ABDALLAH, Imad/DK-800 \u00c5rhus N\u00a0(DK), MIRANDA, Erik Carl Lehnskov/DK-8940 Randers SV\u00a0(DK), ZAIB, Ali/DK-9000 Aalborg\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10159807B1": {
            "patentid": "EP10159807B1",
            "path": "EP10159807NWB1",
            "title": "Offshore wind turbine installation",
            "pubdate": "20171011",
            "inventor": "Keppel Fels Ltd/Singapore 629351\u00a0(SG), Offshore Technology Development Pte Ltd/Singapore 629351\u00a0(SG), Keppel Offshore & Marine Technology Centre Pte Ltd/Singapore 629351\u00a0(SG)",
            "mainpicture": "imgf0001.png"
        },
        "EP12179571B1": {
            "patentid": "EP12179571B1",
            "path": "EP12179571NWB1",
            "title": "Fotovoltaik-Kraftwerk",
            "pubdate": "20150107",
            "inventor": "Blacha, Norbert/59581 Warstein\u00a0(DE), Kempen, Stefan/59821 Arnsberg\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12716206B1": {
            "patentid": "EP12716206B1",
            "path": "EP12716206NWB1",
            "title": "A TRANSPORT SYSTEM FOR LARGE ITEMS AND ASSEMBLY THEREWITH",
            "pubdate": "20161019",
            "inventor": "JESPERSEN, Viggo/DK-5881 Skaarup\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12752960B1": {
            "patentid": "EP12752960B1",
            "path": "EP12752960NWB1",
            "title": "METHOD FOR DESIGNING A WIND TURBINE BLADE COMPRISING A WINGLET",
            "pubdate": "20170927",
            "inventor": "FUKAMI, Koji/Tokyo 108-8215\u00a0(JP)",
            "mainpicture": "imgb0001.png"
        },
        "EP11006947B1": {
            "patentid": "EP11006947B1",
            "path": "EP11006947NWB1",
            "title": "Nabe einer Windkraftanlage und Vorrichtung zur Verstellung mehrerer Elemente relativ zueinander",
            "pubdate": "20150415",
            "inventor": "Hubertus, Frank/91315 H\u00f6chstadt\u00a0(DE)",
            "mainpicture": "imgb0001.png"
        },
        "EP14180218B1": {
            "patentid": "EP14180218B1",
            "path": "EP14180218NWB1",
            "title": "W\u00e4rmevorrichtung",
            "pubdate": "20161012",
            "inventor": "van Ohlen, Hermann/26529 Upgant-Schott\u00a0(DE), H\u00f6lscher, Norbert/26607 Aurich\u00a0(DE), Honczek, Michael/26632 Ihlow\u00a0(DE), Kapitza, Jan/26629 Gro\u00dfefehn\u00a0(DE), Buck, Ralf/26736 Krummh\u00f6rn\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP09175698B1": {
            "patentid": "EP09175698B1",
            "path": "EP09175698NWB1",
            "title": "Wind turbine drive shaft connection arrangement",
            "pubdate": "20160413",
            "inventor": "Hidding, Edwin/46414, Rhede\u00a0(DE), Becker, Christian/48499 Salzbergen\u00a0(DE), Blokhuis, Yvo/7481 EG, Haaksbergen\u00a0(NL), Thomason, Scott/Greer, SC 29650\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP05700564B1": {
            "patentid": "EP05700564B1",
            "path": "EP05700564NWB1",
            "title": "A METHOD OF MANUFACTURING  A BLADE FOR A WIND TURBINE AND BLADE COMPRISING SEGMENTED CONDUCTOR MEANS",
            "pubdate": "20171220",
            "inventor": "DAHL, Morten/DK-6000 Kolding\u00a0(DK), LILLEHEDEN, Lars, Tilsted/DK-6000 Kolding\u00a0(DK), HANSEN, Lars, Bo/DK-6534 Agerskov\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11192207B1": {
            "patentid": "EP11192207B1",
            "path": "EP11192207NWB1",
            "title": "Mounting arrangement for pitch gear",
            "pubdate": "20170125",
            "inventor": "Neubauer, Jesper Lykkegaard/8543 Hornslet\u00a0(DK), Bech, Anton/6950 Ringk\u00f8bing\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP07856198B1": {
            "patentid": "EP07856198B1",
            "path": "EP07856198NWB1",
            "title": "WINDENERGIEANLAGE MIT GEGENSYSTEMREGELUNG UND BETRIEBSVERFAHREN",
            "pubdate": "20170111",
            "inventor": "FORTMANN, Jens/13156 Berlin\u00a0(DE), LETAS, Heinz-Hermann/Gross Meinsdorf 23701 S\u00fcsel\u00a0(DE)",
            "mainpicture": "imgb0001.png"
        },
        "EP12008055B1": {
            "patentid": "EP12008055B1",
            "path": "EP12008055NWB1",
            "title": "Windenergieanlagenrotorblatt mit einem elektrischen Heizelement",
            "pubdate": "20160518",
            "inventor": "Rautmann, Christof/22303 Hamburg\u00a0(DE), Schmidt, Thorsten/22419 Hamburg\u00a0(DE)",
            "mainpicture": "imgb0001.png"
        },
        "EP11817197B1": {
            "patentid": "EP11817197B1",
            "path": "EP11817197NWB1",
            "title": "ROTOR-BLADE ATTACHMENT METHOD FOR RENEWABLE ENERGY POWER GENERATION DEVICE",
            "pubdate": "20150708",
            "inventor": "AMANO, Yoshiyuki/Tokyo 108-8215\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP11728206B1": {
            "patentid": "EP11728206B1",
            "path": "EP11728206NWB1",
            "title": "VERFAHREN UND VORRICHTUNG ZUM REPARIEREN ODER AUSTAUSCHEN VON STROMSCHIENEN AN WINDKRAFTANLAGEN",
            "pubdate": "20141231",
            "inventor": "WIECHERS, J\u00f6rg/25485 Bilsen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11702190B1": {
            "patentid": "EP11702190B1",
            "path": "EP11702190NWB1",
            "title": "METHOD OF OPERATING A WIND POWER PLANT",
            "pubdate": "20160427",
            "inventor": "ZHOU, Yu/Singapore 650216\u00a0(SG), HERBSLEB, Eik/DK-8300 Odder\u00a0(DK), SPRUCE, Chris/Leatherhead KT23 4PD\u00a0(GB), HALES, Kelvin/Egham TW20 9NB\u00a0(GB)",
            "mainpicture": "imgb0001.png"
        },
        "EP09779894B1": {
            "patentid": "EP09779894B1",
            "path": "EP09779894NWB1",
            "title": "A METHOD FOR EVALUATING PERFORMANCE OF A SYSTEM FOR CONTROLLING PITCH OF A SET OF BLADES OF A WIND TURBINE",
            "pubdate": "20160427",
            "inventor": "MIRANDA, Erik Carl Lehnskov/DK-8940 Randers SV\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11193470B1": {
            "patentid": "EP11193470B1",
            "path": "EP11193470NWB1",
            "title": "Systems and methods for monitoring a condition of a rotor blade for a wind turbine",
            "pubdate": "20171011",
            "inventor": "Cribbs, Timothy Botsford/Salem, VA 24153\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP12305590B1": {
            "patentid": "EP12305590B1",
            "path": "EP12305590NWB1",
            "title": "Propeller blade",
            "pubdate": "20161116",
            "inventor": "Petallaz, Bruno/46100 B\u00e9duer\u00a0(FR)",
            "mainpicture": "imgf0001.png"
        },
        "EP10008969B1": {
            "patentid": "EP10008969B1",
            "path": "EP10008969NWB1",
            "title": "Device and method for detecting the loading of pivoted rotor blades",
            "pubdate": "20160518",
            "inventor": "L\u00f6sl, Johann/84172 Buch am Erlbach\u00a0(DE), Becker, Edwin/48734 Reken\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12778222B1": {
            "patentid": "EP12778222B1",
            "path": "EP12778222NWB1",
            "title": "MULTI BANDWIDTH VOLTAGE CONTROLLERS FOR A WIND POWER PLANT",
            "pubdate": "20170111",
            "inventor": "SAHUKARI, Sridhar/Houston, TX 77002\u00a0(US), NAYEBI, Kouroush/DK-7430 Ikast\u00a0(DK), MAYER, Peter Frederick/Singapore 118172\u00a0(SG)",
            "mainpicture": "imgf0001.png"
        },
        "EP11193932B1": {
            "patentid": "EP11193932B1",
            "path": "EP11193932NWB1",
            "title": "System And Method For Controlling Wind Turbine Power Output",
            "pubdate": "20160706",
            "inventor": "Miller, Nicholas Wright/Schenectady, NY New York 12345\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP12734882B1": {
            "patentid": "EP12734882B1",
            "path": "EP12734882NWB1",
            "title": "UMFORMVERFAHREN ZUM WARMUMFORMEN EINES STAHLBLECHS EINES HERZUSTELLENDEN ROTORBLATTES EINER WINDENERGIEANLAGE",
            "pubdate": "20150909",
            "inventor": "VOIGT, Burkhard/39108 Magdeburg\u00a0(DE), LABS, Oliver/39108 Magdeburg\u00a0(DE), KERSTEN, Roy/39291 Hohenwarthe\u00a0(DE)",
            "mainpicture": "imgb0001.png"
        },
        "EP09157298B1": {
            "patentid": "EP09157298B1",
            "path": "EP09157298NWB1",
            "title": "Wind farm island operation",
            "pubdate": "20161221",
            "inventor": "Strik, Franciscus Leonardus Hendricus/3958 DH, Amerongen\u00a0(NL), Bodewes, Florentius Joannes/3315 JK, Dordrecht\u00a0(NL)",
            "mainpicture": "imgf0001.png"
        },
        "EP04739009B1": {
            "patentid": "EP04739009B1",
            "path": "EP04739009NWB1",
            "title": "METHOD AND CONTROL SYSTEM OF CONTROLLING A WIND TURBINE BLADE DURING THE STOPPING PROCESS OF THE ROTOR",
            "pubdate": "20170329",
            "inventor": "JEPPESEN, Ole, M\u00f8lgaard/DK-8240 Risskov\u00a0(DK), BENGTSON, John/DK-8270 H\u00f8jbjerg\u00a0(DK), HANSEN, Torben, M\u00f8ller/DK-8543 Hornslet\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12382251B1": {
            "patentid": "EP12382251B1",
            "path": "EP12382251NWB1",
            "title": "Wind turbine with a rotating assembly",
            "pubdate": "20170201",
            "inventor": "Canedo Pardo, Santiago/08037 Barcelona\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP12809100B1": {
            "patentid": "EP12809100B1",
            "path": "EP12809100NWB1",
            "title": "A METHOD OF CONTROLLING A WIND TURBINE, AND A WIND TURBINE",
            "pubdate": "20170208",
            "inventor": "ZHOU, Yu/Singapore 589645\u00a0(SG), CHEN, Wanying/Singapore 680133\u00a0(SG), K.J., Karthik/Trivandrum 695002\u00a0(IN), KALYANI, Amit/South Kasaba Maharashtra 413007\u00a0(IN), LIM, Khoon Peng/Singapore 751351\u00a0(SG), SIEW, Pey Yen/Singapore 550325\u00a0(SG)",
            "mainpicture": "imgf0001.png"
        },
        "EP11817189B1": {
            "patentid": "EP11817189B1",
            "path": "EP11817189NWB1",
            "title": "WIND POWER GENERATION APPARATUS",
            "pubdate": "20160928",
            "inventor": "AKASHI, Yu/Tokyo 1088215\u00a0(JP), MATSUO, Takeshi/Tokyo 1088215\u00a0(JP), SATO, Shinsuke/Tokyo 1088215\u00a0(JP), KAMEDA, Takuro/Tokyo 1088215\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP11155995B1": {
            "patentid": "EP11155995B1",
            "path": "EP11155995NWB1",
            "title": "Vertical axis wind turbine with a planetary position transmission mechanism for the blades",
            "pubdate": "20150819",
            "inventor": "Fan, Nai-Wen/220, New Taipei City\u00a0(TW)",
            "mainpicture": "imgf0001.png"
        },
        "EP10195387B1": {
            "patentid": "EP10195387B1",
            "path": "EP10195387NWB1",
            "title": "Method for operating a power dissipating unit in a wind turbine",
            "pubdate": "20150617",
            "inventor": "Gupta, Amit Kumar/138632, Singapore\u00a0(SG), Sahukari, Sridhar/138632, Singapore\u00a0(SG)",
            "mainpicture": "imgb0001.png"
        },
        "EP11761333B1": {
            "patentid": "EP11761333B1",
            "path": "EP11761333NWB1",
            "title": "ELEKTRISCHES VERBINDUNGSSYSTEM EINER ENERGIEGEWINNUNGSEINRICHTUNG",
            "pubdate": "20170412",
            "inventor": "GOTTSCHLICH, Heinz-Georg/41812 Erkelenz\u00a0(DE), SCHLOMS, Martin/52070 Aachen\u00a0(DE), LIETZ, Franz-Josef/46049 Oberhausen-Lirich\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12170512B1": {
            "patentid": "EP12170512B1",
            "path": "EP12170512NWB1",
            "title": "Transportation and stacking of curved blades lying oppositely and above each other",
            "pubdate": "20151125",
            "inventor": "Lieberknecht, Kim/8200 \u00c5rhus N\u00a0(DK), Svinth, Kenneth Helligsoe/7400 Herning\u00a0(DK), Wieland, Maja Rose/8220 Brabrand\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12152691B1": {
            "patentid": "EP12152691B1",
            "path": "EP12152691NWB1",
            "title": "Holding system for blades of a wind turbine and method of transporting blades of a wind turbine therewith",
            "pubdate": "20160106",
            "inventor": "Poulsen, Henning/6900 Skjern\u00a0(DK), Westergaard, Jan Emil/7330 Brande\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11801864B1": {
            "patentid": "EP11801864B1",
            "path": "EP11801864NWB1",
            "title": "METHOD OF MANUFACTURING A WIND TURBINE BLADE AND A WIND TURBINE BLADE",
            "pubdate": "20170412",
            "inventor": "JENZEWSKI, Dominique/13088 Berlin\u00a0(DE), CREMER, Andreas/London Greater London W1K 6WL\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP10771725B1": {
            "patentid": "EP10771725B1",
            "path": "EP10771725NWB1",
            "title": "A WIND TURBINE AND A MOUNTING METHOD THEREOF",
            "pubdate": "20150318",
            "inventor": "HAAKON \u00c0 PORTA, Peter/DK-9000 Aalborg\u00a0(DK), TRAN, (Yu) Phu Du/DK-8381 Tilst\u00a0(DK), BJ\u00d8RN, Hans Kristian/DK-9500 Hobro\u00a0(DK), MADSEN, Steffen Henrik/DK-8960 Randers S\u00d8\u00a0(DK), MARKUSSEN, Erik/6920 Videb\u00e6k\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10195041B1": {
            "patentid": "EP10195041B1",
            "path": "EP10195041NWB1",
            "title": "System for wind turbine electrical control and operation",
            "pubdate": "20160525",
            "inventor": "Ritter, Allen Michael/Salem, VA 24153\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP10250350B1": {
            "patentid": "EP10250350B1",
            "path": "EP10250350NWB1",
            "title": "Balancing a ram air turbine",
            "pubdate": "20150429",
            "inventor": "Bannon, David J./Rockford, Illinois 61107\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP08761554B1": {
            "patentid": "EP08761554B1",
            "path": "EP08761554NWB1",
            "title": "RIGID SAIL WITH CONFIGURABLE PROFILE",
            "pubdate": "20150729",
            "inventor": "Berm\u00fadez S\u00e1nchez, Ignacio/08784-Piera (Barcelona)\u00a0(ES), Bermudez Miquel, Jose Miguel/08784-Piera (Barcelona)\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP11156800B1": {
            "patentid": "EP11156800B1",
            "path": "EP11156800NWB1",
            "title": "Verfahren zur Bremszustandsermittlung und Windenergieanlage zum Durchf\u00fchren des Verfahrens",
            "pubdate": "20160127",
            "inventor": "Altemark, Jens/24768, Rendsburg\u00a0(DE), Br\u00fcckner, Matthias/24768, Rendsburg\u00a0(DE)",
            "mainpicture": "imgb0001.png"
        },
        "EP11382363B1": {
            "patentid": "EP11382363B1",
            "path": "EP11382363NWB1",
            "title": "Wind turbine rotor",
            "pubdate": "20151111",
            "inventor": "Pasquet, Pierre/08328 Alella\u00a0(ES), Cavall\u00e9, Marc/08006 Barcelona\u00a0(ES), Canedo Pardo, Santiago/08037 Barcelona\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP11163282B1": {
            "patentid": "EP11163282B1",
            "path": "EP11163282NWB1",
            "title": "Tilt adjustment system",
            "pubdate": "20170614",
            "inventor": "Nies, Jacob Johannes/8042 HA, Zwolle\u00a0(NL), Subramanian, Shanmuga-Priyan/48429, Rheine\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10787412B1": {
            "patentid": "EP10787412B1",
            "path": "EP10787412NWB1",
            "title": "SECTIONAL WIND TURBINE BLADE",
            "pubdate": "20150218",
            "inventor": "HIBBARD, Paul/Singapore 169586\u00a0(SG), HANCOCK, Mark/Hampshire SO15 5HN\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP12737573B1": {
            "patentid": "EP12737573B1",
            "path": "EP12737573NWB1",
            "title": "WIND TURBINE BLADE COMPRISING VORTEX GENERATORS",
            "pubdate": "20170614",
            "inventor": "MADSEN, Jesper/DK-6621 Gesten\u00a0(DK), W\u00dcRTH, Ines/D-71634 Ludwigsburg\u00a0(DE), HANSEN, Rolf/DK-6000 Kolding\u00a0(DK), M\u00dcLLER, Olaf/DK-6000 Kolding\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11817193B1": {
            "patentid": "EP11817193B1",
            "path": "EP11817193NWB1",
            "title": "WIND TURBINE BLADE, WIND POWER GENERATION DEVICE PROVIDED WITH SAME, AND DESIGN METHOD FOR WIND TURBINE BLADE",
            "pubdate": "20160427",
            "inventor": "Mitsubishi Heavy Industries, Ltd./Tokyo 108-8215\u00a0(JP), MHI Vestas Offshore Wind A/S/8200 Aarhus N\u00a0(DK)",
            "mainpicture": "imgb0001.png"
        },
        "EP12794167B1": {
            "patentid": "EP12794167B1",
            "path": "EP12794167NWB1",
            "title": "A TOOL AND A METHOD FOR MOVING A WIND TURBINE DRIVETRAIN COMPONENT",
            "pubdate": "20170118",
            "inventor": "HANSEN, Erland Falk/DK-8544 M\u00f8rke\u00a0(DK), MOGENSEN, Morten/DK-2650 Hvidovre\u00a0(DK), DAMGAARD, Mads/DK-8520 Lystrup\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP09165852B1": {
            "patentid": "EP09165852B1",
            "path": "EP09165852NWB1",
            "title": "Verfahren zum Betrieb einer Windenergieanlage",
            "pubdate": "20160224",
            "inventor": "Der Erfinder hat auf seine Nennung verzichtet.",
            "mainpicture": "imgf0001.png"
        },
        "EP11805438B1": {
            "patentid": "EP11805438B1",
            "path": "EP11805438NWB1",
            "title": "VERFAHREN UND VORRICHTUNG ZUR WANDLUNG VON ENERGIE DURCH ELEKTROAKTIVE POLYMER",
            "pubdate": "20170419",
            "inventor": "GUYENOT, Michael/71638 Ludwigsburg\u00a0(DE), MICHALKE, Gabriele/70195 Stuttgart\u00a0(DE), HAGEMANN, Benjamin/70839 Gerlingen\u00a0(DE), GRAUER, Matthias/97072 Wuerzburg\u00a0(DE), DENES, Istvan/71336 Waiblinge/Hohenacker\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12193247B1": {
            "patentid": "EP12193247B1",
            "path": "EP12193247NWB1",
            "title": "Blade-pitch-angle control device and wind power generator",
            "pubdate": "20160106",
            "inventor": "Ide, Kazunari/Nagasaki-shi, Nagasaki-ken, 851-0392\u00a0(JP), Hayashi, Yoshiyuki/Nagasaki-shi, Nagasaki-ken, 851-0392\u00a0(JP), Shibata, Masaaki/Nagasaki-shi, Nagasaki-ken, 850-8610\u00a0(JP)",
            "mainpicture": "imgb0001.png"
        },
        "EP10161543B1": {
            "patentid": "EP10161543B1",
            "path": "EP10161543NWB1",
            "title": "Cooling system and wind turbine incorporating same",
            "pubdate": "20170628",
            "inventor": "Jansen, Patrick L./Scotia, NY 12302\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP12792254B1": {
            "patentid": "EP12792254B1",
            "path": "EP12792254NWB1",
            "title": "NODES IN A TRUSS WORK OR A TRUSS WORK LIKE STRUCTURE",
            "pubdate": "20160525",
            "inventor": "FOSS, Gunnar/NL-2566 JE Den Haag\u00a0(NL)",
            "mainpicture": "imgf0001.png"
        },
        "EP04786200B1": {
            "patentid": "EP04786200B1",
            "path": "EP04786200NWB1",
            "title": "GR\u00dcNDUNG F\u00dcR EINE OFFSHORE-WINDKRAFTANLAGE",
            "pubdate": "20151209",
            "inventor": "BEKKER, Arngolt/28355 Bremen\u00a0(DE), BARAEV, Anton/Moskau 115682\u00a0(RU)",
            "mainpicture": "imgf0001.png"
        },
        "EP13163749B1": {
            "patentid": "EP13163749B1",
            "path": "EP13163749NWB1",
            "title": "Wind turbine with a primary and a secondary generator and method of operating such wind turbine",
            "pubdate": "20170712",
            "inventor": "Zhu, Hongdong/8600 Silkeborg\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP07801371B1": {
            "patentid": "EP07801371B1",
            "path": "EP07801371NWB1",
            "title": "A WIND TURBINE AND A METHOD FOR DAMPING EDGEWISE OSCILLATIONS IN ONE OR MORE BLADES OF A WIND TURBINE BY CHANGING THE BLADE PITCH",
            "pubdate": "20170809",
            "inventor": "NIELSEN, Thomas, Steiniche, Bjertrup/DK-8900 Randers\u00a0(DK), SPRUCE, Christopher, John/Surrey KT23 4PD\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP13382120B1": {
            "patentid": "EP13382120B1",
            "path": "EP13382120NWB1",
            "title": "Method of operating a wind turbine",
            "pubdate": "20160831",
            "inventor": "Canal Vila, Marc/08037 BARCELONA\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP12166371B1": {
            "patentid": "EP12166371B1",
            "path": "EP12166371NWB1",
            "title": "Methods and apparatus for controlling wind turbine thrust",
            "pubdate": "20151014",
            "inventor": "Hoffmann, Till/48499 Salzbergen\u00a0(DE), Scholte-Wassink, Hartmut Andreas/48499 Salzbergen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10707975B1": {
            "patentid": "EP10707975B1",
            "path": "EP10707975NWB1",
            "title": "TROPOSPHERIC AEOLIAN GENERATOR COMPRISING A TETHER",
            "pubdate": "20150617",
            "inventor": "IPPOLITO, Massimo/I-14020 Berzano Di San Pietro (AT)\u00a0(IT)",
            "mainpicture": "imgf0001.png"
        },
        "EP11382089B1": {
            "patentid": "EP11382089B1",
            "path": "EP11382089NWB1",
            "title": "Wind turbine",
            "pubdate": "20151125",
            "inventor": "Valero Lafuente, Sebastian/08005, Barcelona\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP12816237B1": {
            "patentid": "EP12816237B1",
            "path": "EP12816237NWB1",
            "title": "BLADE BEARING WITH SUPPORT STRUCTURE HAVING NON-UNIFORM STIFFNESS AND METHOD OF MANUFACTURE",
            "pubdate": "20171213",
            "inventor": "LINDHOLST, Peter/DK-8382 Hinnerup\u00a0(DK), NEUBAUER, Jesper Lykkegaard/DK-8543 Hornslet\u00a0(DK), M\u00d8LGAARD JEPPESEN, Ole/DK-6900 Skjern\u00a0(DK), BAUN, Torben Ladegaard/DK-8541 Skodstrup\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10718950B1": {
            "patentid": "EP10718950B1",
            "path": "EP10718950NWB1",
            "title": "NETWORK IN WIND TURBINE",
            "pubdate": "20150325",
            "inventor": "ZAPATA, Roberto/DK-8200 \u00c5rhus N\u00a0(DK), KRISTENSEN, Tage/DK-8200 \u00c5rhus N\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11155931B1": {
            "patentid": "EP11155931B1",
            "path": "EP11155931NWB1",
            "title": "Wind turbine",
            "pubdate": "20170412",
            "inventor": "Groendahl, Erik/8653 Them\u00a0(DK), Thougaard, Hans-Joergen/8600 Silkeborg\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11156523B1": {
            "patentid": "EP11156523B1",
            "path": "EP11156523NWB1",
            "title": "Vorrichtung und Teilform f\u00fcr die Herstellung von Rotorbl\u00e4ttern f\u00fcr Windenergieanlagen und Herstellungsverfahren",
            "pubdate": "20160706",
            "inventor": "Kulenkampff, Jens/24103 Kiel\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP13382009B1": {
            "patentid": "EP13382009B1",
            "path": "EP13382009NWB1",
            "title": "Method of operating a wind turbine rotational system and wind turbine rotational system",
            "pubdate": "20160106",
            "inventor": "Palomares Rentero, Pedro/08005 BARCELONA\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP07022883B1": {
            "patentid": "EP07022883B1",
            "path": "EP07022883NWB1",
            "title": "Arrangement for a direct drive generator, direct drive generator, wind turbine and method for the assembly of a generator",
            "pubdate": "20160914",
            "inventor": "Stiesdal, Henrik/5000 Odense C\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10831171B1": {
            "patentid": "EP10831171B1",
            "path": "EP10831171NWB1",
            "title": "WIND TURBINE WITH INTERNAL TRANSPORT DEVICES",
            "pubdate": "20150610",
            "inventor": "AARHUS, Karl/DK-8600-Silkeborg\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP13156541B1": {
            "patentid": "EP13156541B1",
            "path": "EP13156541NWB1",
            "title": "Verfahren zur \u00dcberpr\u00fcfung des baulichen Zustands von Windkraftanlagen",
            "pubdate": "20170823",
            "inventor": "Zell, Horst/45481 M\u00fchlheim\u00a0(DE)",
            "mainpicture": "imgb0001.png"
        },
        "EP12002904B1": {
            "patentid": "EP12002904B1",
            "path": "EP12002904NWB1",
            "title": "Str\u00f6mungskraftwerkspark und Verfahren f\u00fcr dessen Erstellung",
            "pubdate": "20150408",
            "inventor": "Arlitt, Raphael/89077 Ulm\u00a0(DE), Perner, Norman/89233 Neu-Ulm\u00a0(DE), Biskup, Frank/73527 Schw\u00e4bisch Gm\u00fcnd\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10760384B1": {
            "patentid": "EP10760384B1",
            "path": "EP10760384NWB1",
            "title": "WIND TURBINE COMPOSITE STRUCTURES",
            "pubdate": "20171108",
            "inventor": "APPLETON, Steve/Fleet, Hampshire GU52 7LU\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP08251253B1": {
            "patentid": "EP08251253B1",
            "path": "EP08251253NWB1",
            "title": "Teeter-restraint device for wind turbines",
            "pubdate": "20150617",
            "inventor": "Bertolotti, Fabio P/South Windsor CT 06074\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP10172602B1": {
            "patentid": "EP10172602B1",
            "path": "EP10172602NWB1",
            "title": "Transportation and storage system for wind turbine blades",
            "pubdate": "20160406",
            "inventor": "Frederiksen, Henrik/6000, Kolding\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12720580B1": {
            "patentid": "EP12720580B1",
            "path": "EP12720580NWB1",
            "title": "SYSTEM FOR CONVERTING WIND ENERGY INTO ELECTRICAL ENERGY THROUGH THE FLIGHT OF POWER WING PROFILES TETHERED TO THE GROUND BY CABLES OF A FIXED LENGTH, WITHOUT PASSIVE PHASES, AND WITH AUTOMATIC ADAPTATION TO WIND CONDITIONS",
            "pubdate": "20161221",
            "inventor": "FAGIANO, Lorenzo/I-10144 Torino\u00a0(IT), MILANESE, Mario/I-10144 Torino\u00a0(IT)",
            "mainpicture": "imgf0001.png"
        },
        "EP08774205B1": {
            "patentid": "EP08774205B1",
            "path": "EP08774205NWB1",
            "title": "MONITORING OF BLADE FREQUENCIES OF A WIND TURBINE",
            "pubdate": "20170426",
            "inventor": "BIRKEMOSE, Bo/DK-7330 Brande\u00a0(DK), EGEDAL, Per/DK-7400 Herning\u00a0(DK)",
            "mainpicture": "imgb0001.png"
        },
        "EP04707228B1": {
            "patentid": "EP04707228B1",
            "path": "EP04707228NWB1",
            "title": "VERFAHREN ZUR ERRICHTUNG EINER WINDENERGIEANLAGE SOWIE WINDENERGIEANLAGE",
            "pubdate": "20151014",
            "inventor": "Aloys Wobben/26607 Aurich\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11193710B1": {
            "patentid": "EP11193710B1",
            "path": "EP11193710NWB1",
            "title": "System and method for detecting anomalies in wind turbines",
            "pubdate": "20160706",
            "inventor": "Mihok, John/Schenectady, NY New York 12345\u00a0(US), Salem, Sameh R./Schenectady, NY New York 12345\u00a0(US), Bhalodia, Dhaval/Schenectady, NY New York 12345\u00a0(US), Korim, David/Schenectady, NY New York 12345\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP10173576B1": {
            "patentid": "EP10173576B1",
            "path": "EP10173576NWB1",
            "title": "Line side crowbar for energy converter",
            "pubdate": "20150325",
            "inventor": "Ritter, Allen Michael/Salem, VA 24153\u00a0(US), Bedia, Rafael Ignacio/Salem, VA 24153\u00a0(US), Harbourt, Cyrus David/Salem, VA 24153\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP11175585B1": {
            "patentid": "EP11175585B1",
            "path": "EP11175585NWB1",
            "title": "Optimisation of a wind turbine",
            "pubdate": "20150826",
            "inventor": "Laurberg, Hans/8000 \u00c5rhus C\u00a0(DK), Rasmussen, Anders Nygaard/2200 Kobenhavn\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12836928B1": {
            "patentid": "EP12836928B1",
            "path": "EP12836928NWB1",
            "title": "FLOATING WIND TURBINE",
            "pubdate": "20160601",
            "inventor": "TOLO, Magne/N-4070 Randaberg\u00a0(NO)",
            "mainpicture": "imgf0001.png"
        },
        "EP10841233B1": {
            "patentid": "EP10841233B1",
            "path": "EP10841233NWB1",
            "title": "WIND TURBINE",
            "pubdate": "20160608",
            "inventor": "Yoon, Jeen Mok/Incheon 403-082\u00a0(KR)",
            "mainpicture": "imgf0001.png"
        },
        "EP12732957B1": {
            "patentid": "EP12732957B1",
            "path": "EP12732957NWB1",
            "title": "SYSTEM AND METHOD FOR CONTROLLING POWER OUTPUT FROM A WIND TURBINE OR WIND POWER PLANT",
            "pubdate": "20160727",
            "inventor": "BOWYER, Robert/London SW6 6LE\u00a0(GB), PALMER, Christopher/Wimbledon SW19 5NS\u00a0(GB), SPRUCE, Chris/Leatherhead  Surrey KT23 4PD\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP11784751B1": {
            "patentid": "EP11784751B1",
            "path": "EP11784751NWB1",
            "title": "IMPROVEMENTS IN OR RELATING TO COMPOSITE STRUCTURES",
            "pubdate": "20161207",
            "inventor": "APPLETON, Steve/Hampshire GU52 7LU\u00a0(GB), FORREST, Mark/East Cowes Isle of Wight PO32 6LG\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP12195653B1": {
            "patentid": "EP12195653B1",
            "path": "EP12195653NWB1",
            "title": "Verfahren und Vorrichtung zum Betreiben einer Windenergieanlage",
            "pubdate": "20161026",
            "inventor": "Gessert, Malte/22397 Hamburg\u00a0(DE), J\u00f6hnke, Ulf/20253 Hamburg\u00a0(DE), Jurkat, Mark/22844 Norderstedt\u00a0(DE), Baumg\u00e4rtner, Meinrad/20259 Hamburg\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12382008B1": {
            "patentid": "EP12382008B1",
            "path": "EP12382008NWB1",
            "title": "Calibration of blade load sensors",
            "pubdate": "20141231",
            "inventor": "Garate \u00c1lvaro, Jos\u00e9 Miguel/08012 Barcelona\u00a0(ES), Pineda Amo, Isaac/08172 Sant Cugat Del Vall\u00e8s\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP12382034B1": {
            "patentid": "EP12382034B1",
            "path": "EP12382034NWB1",
            "title": "A method for dampening oscillations in a wind turbine",
            "pubdate": "20160127",
            "inventor": "Pineda Amo, Isaac/08172 Sant Cugat Del Vall\u00e8s\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP08869837B1": {
            "patentid": "EP08869837B1",
            "path": "EP08869837NWB1",
            "title": "WINDKRAFTANLAGE",
            "pubdate": "20150422",
            "inventor": "Patrick Richter/8053 Z\u00fcrich\u00a0(CH), Karl Bahnm\u00fcller/8953 Dietikon\u00a0(CH)",
            "mainpicture": "imgf0001.png"
        },
        "EP12707985B1": {
            "patentid": "EP12707985B1",
            "path": "EP12707985NWB1",
            "title": "PUMPSPEICHERKRAFTWERK",
            "pubdate": "20151014",
            "inventor": "SCHMIDT-B\u00d6CKING, Horst/65779 Kelkheim-Ruppertshain\u00a0(DE), LUTHER, Gerhard/66119 Saarbr\u00fccken\u00a0(DE)",
            "mainpicture": "imgb0001.png"
        },
        "EP11007254B1": {
            "patentid": "EP11007254B1",
            "path": "EP11007254NWB1",
            "title": "Windenergieanlage mit einer auf einem Turm angeordneten Gondel mit einem \u00dcbergang vom Dach der Gondel in den Rotor",
            "pubdate": "20151223",
            "inventor": "Steitz, Sebastian/71726 Benningen\u00a0(DE), Kath\u00f6fer, Sebastian/17168 Gro\u00df W\u00fcstenfelde\u00a0(DE), Hahn, Martin/18069 Rostock\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12724387B1": {
            "patentid": "EP12724387B1",
            "path": "EP12724387NWB1",
            "title": "FLUID-COOLED WIND TURBINE",
            "pubdate": "20150506",
            "inventor": "CASAZZA, Matteo/I-39049 Val Di Vizze\u00a0(IT), FOLIE, Georg/I-39026 Prato Allo Stelvio\u00a0(IT), GELMINI, Emmanuele/I-38100 Trento\u00a0(IT)",
            "mainpicture": "imgf0001.png"
        },
        "EP12305006B1": {
            "patentid": "EP12305006B1",
            "path": "EP12305006NWB1",
            "title": "Support flottant pour structure offshore de type \u00e9olienne",
            "pubdate": "20151230",
            "inventor": "Thieffry, Philippe/56260 Larmor Plage\u00a0(FR), Moiret, Cyrille, Jacques/56600 Lanester\u00a0(FR), Saint-Orens, Thierry/29260 Le Folgoet\u00a0(FR)",
            "mainpicture": "imgf0001.png"
        },
        "EP12879819B1": {
            "patentid": "EP12879819B1",
            "path": "EP12879819NWB1",
            "title": "METHOD FOR ASSEMBLING SHAFTING OF REGENERATED ENERGY POWER GENERATION DEVICE, AND TOOL FOR ASSEMBLING SHAFTING",
            "pubdate": "20160309",
            "inventor": "KAMEDA, Takuro/Tokyo 108-8215\u00a0(JP), FURUKAWA, Syogo/Tokyo 108-8215\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP10013933B1": {
            "patentid": "EP10013933B1",
            "path": "EP10013933NWB1",
            "title": "Method for establishing a wind turbine generator with one or more permanent magnet (pm) rotors, wind turbine nacelle and wind turbine",
            "pubdate": "20150513",
            "inventor": "Helle, Lars/9541 Suldrup\u00a0(DK), Kjaer, Philip Richard Jacobsen/8000 \u00c5rhus C\u00a0(DK), Lindholm, Morten/8270 H\u00f8jbjerg\u00a0(DK), Bendixen, Flemming Buus/9500 Hobro\u00a0(DK), Boldea, Ion/Timisoara\u00a0(RO)",
            "mainpicture": "imgf0001.png"
        },
        "EP10709788B1": {
            "patentid": "EP10709788B1",
            "path": "EP10709788NWB1",
            "title": "WIND POWER GENERATION APPARATUS AND METHOD FOR ACTIVATING SAME",
            "pubdate": "20170301",
            "inventor": "BABA, Mitsuya/Tokyo 108-8215\u00a0(JP)",
            "mainpicture": "imgb0001.png"
        },
        "EP11191603B1": {
            "patentid": "EP11191603B1",
            "path": "EP11191603NWB1",
            "title": "System and method for measuring shaft deflection in a wind turbine",
            "pubdate": "20170524",
            "inventor": "Madge, James Henry/Greenville, SC South Carolina 29615\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP12000836B1": {
            "patentid": "EP12000836B1",
            "path": "EP12000836NWB1",
            "title": "Verfahren zum Betreiben einer Windenergieanlage, bei dem auf Grundlage meteorologischer Daten eine Vereisungsgefahr ermittelt wird, und Windenergieanlage zur Ausf\u00fchrung des Verfahrens",
            "pubdate": "20150902",
            "inventor": "Renschler, Oskar/22941 Delingsdorf\u00a0(DE), Stock, Melanie/22083 Hamburg\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12003593B1": {
            "patentid": "EP12003593B1",
            "path": "EP12003593NWB1",
            "title": "Testing methods for wind turbine blades",
            "pubdate": "20171213",
            "inventor": "Riezu Corpas, Miguel/31621 Sarriguren\u00a0(ES), Rojas Diaz, Ramon/31621 Sarriguren\u00a0(ES), Saavedra Bao, Ruben/31621 Sarriguren\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP11758112B1": {
            "patentid": "EP11758112B1",
            "path": "EP11758112NWB1",
            "title": "An apparatus for and method of mounting wind turbine blades on a wind turbine tower",
            "pubdate": "20151021",
            "inventor": "BITSCH, Michael Lundgaard/DK-8860 Ulstrup\u00a0(DK), BAUN, Torben Friis/DK-8200 \u00c5rhus N\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP04822594B1": {
            "patentid": "EP04822594B1",
            "path": "EP04822594NWB1",
            "title": "WIND TURBINE COMPRISING A MULTIPLIED REDUNDANCY CONTROL SYSTEM AND METHOD OF CONTROLLING A WIND TURBINE",
            "pubdate": "20151014",
            "inventor": "JEPPESEN, Ole, M\u00f8lgaard/DK-8240 Risskov\u00a0(DK), BENGTSON, John/DK-8270 H\u00f8jbjerg\u00a0(DK), HANSEN, Torben, M\u00f8ller/DK-8543 Hornslet\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP09015592B1": {
            "patentid": "EP09015592B1",
            "path": "EP09015592NWB1",
            "title": "Verfahren zum Betrieb einer Windenergieanlage mit einem leistungsreduzierten Betriebsmodus",
            "pubdate": "20150325",
            "inventor": "Steinmetz, Guillaume/93210 La Plaine Saint Denis\u00a0(FR), Fonio, Joseph/92300 Levallois-Perret\u00a0(FR)",
            "mainpicture": "imgf0001.png"
        },
        "EP10784654B1": {
            "patentid": "EP10784654B1",
            "path": "EP10784654NWB1",
            "title": "WIND POWER GENERATION APPARATUS AND OUTPUT CONTROL METHOD",
            "pubdate": "20160810",
            "inventor": "YASUGI, Akira/Tokyo 1088215\u00a0(JP)",
            "mainpicture": "imgb0001.png"
        },
        "EP11152375B1": {
            "patentid": "EP11152375B1",
            "path": "EP11152375NWB1",
            "title": "Rotorblatt f\u00fcr eine Windenergieanlage, Windenergieanlage und Verfahren zum Herstellen eines Rotorblatts",
            "pubdate": "20150318",
            "inventor": "Bendel, Urs/24787 Fockbek\u00a0(DE), Eyb, Enno/24116 Kiel\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12382112B1": {
            "patentid": "EP12382112B1",
            "path": "EP12382112NWB1",
            "title": "Detecting a wake situation in a wind farm",
            "pubdate": "20150513",
            "inventor": "M\u00e9rida, Sara/08007 BARCELONA\u00a0(ES), Men\u00e9ndez \u00c1lvarez, Elena/08005 BARCELONA\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP11191607B1": {
            "patentid": "EP11191607B1",
            "path": "EP11191607NWB1",
            "title": "Method to determine the yaw angle of a component of a wind turbine",
            "pubdate": "20160406",
            "inventor": "Esbensen, Thomas/7400 Herning\u00a0(DK), Hoegh, Gustav/7400 Herning\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP09729586B1": {
            "patentid": "EP09729586B1",
            "path": "EP09729586NWB1",
            "title": "A WIND TURBINE, A BLADE THEREFOR AND A METHOD OF PROCESSING SIGNALS REFLECTED THEREFROM",
            "pubdate": "20150729",
            "inventor": "Bond, Philip Charles/London W4 1NA\u00a0(GB)",
            "mainpicture": "imgb0001.png"
        },
        "EP12158421B1": {
            "patentid": "EP12158421B1",
            "path": "EP12158421NWB1",
            "title": "Method to control the operation of a wind turbine",
            "pubdate": "20160831",
            "inventor": "Bjerge, Martin Huus/6933 Kib\u00e6k\u00a0(DK), Esbensen, Thomas/7400 Herning\u00a0(DK), Petersen, Jesper Elliot/6870 Olgod\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP09768397B1": {
            "patentid": "EP09768397B1",
            "path": "EP09768397NWB1",
            "title": "WIND TURBINE COMPRISING A COOLING CIRCUIT",
            "pubdate": "20170208",
            "inventor": "PASTEUNING, Jan Willem/NL-5076 CB Haaren\u00a0(NL), VERSTEEGH, Cornelus Johannes Antonius/NL-1217 PP Hilversum\u00a0(NL)",
            "mainpicture": "imgf0001.png"
        },
        "EP10773663B1": {
            "patentid": "EP10773663B1",
            "path": "EP10773663NWB1",
            "title": "ROTOR SYSTEM FOR A WIND TURBINE",
            "pubdate": "20170329",
            "inventor": "SAEED, Osman/Chak Shehzad, Islamabad 44000\u00a0(PK)",
            "mainpicture": "imgf0001.png"
        },
        "EP09837697B1": {
            "patentid": "EP09837697B1",
            "path": "EP09837697NWB1",
            "title": "ORTHOGONALE TURBINE F\u00dcR NIEDRIGE F\u00d6RDERH\u00d6HE",
            "pubdate": "20151202",
            "inventor": "SHPOLIANSKIY, Yuliy Borisovitch/Moscow, 125040\u00a0(RU), ISTORIK, Boris Lvovitch/Moscow, 103006\u00a0(RU)",
            "mainpicture": "imgf0001.png"
        },
        "EP10163692B1": {
            "patentid": "EP10163692B1",
            "path": "EP10163692NWB1",
            "title": "System and method for wind turbine noise control and damage detection",
            "pubdate": "20150805",
            "inventor": "Xiong, Wei/201203, Pudong Shanghai\u00a0(CN)",
            "mainpicture": "imgb0001.png"
        },
        "EP08749275B1": {
            "patentid": "EP08749275B1",
            "path": "EP08749275NWB1",
            "title": "VERKLEIDUNG EINER GONDEL EINER WINDENERGIEANLAGE",
            "pubdate": "20151202",
            "inventor": "DE BUHR, Ingo/26789 Leer\u00a0(DE), LEHNHOFF, Martin/24678 RENDSBURG\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11194124B1": {
            "patentid": "EP11194124B1",
            "path": "EP11194124NWB1",
            "title": "A wind turbine and a method for powering one or more hydraulic pitch actuators",
            "pubdate": "20170802",
            "inventor": "Andersen, Jesper Lykkegaard/8543 Hornslet\u00a0(DK), Madsen, Jens Bay/8000 Aarhus\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11743428B1": {
            "patentid": "EP11743428B1",
            "path": "EP11743428NWB1",
            "title": "Wind-power production with reduced power fluctuations",
            "pubdate": "20150408",
            "inventor": "TARNOWSKI, Germ\u00e1n, Claudio/3350 Ap\u00f3stoles, Misiones\u00a0(AR)",
            "mainpicture": "imgb0001.png"
        },
        "EP12778453B1": {
            "patentid": "EP12778453B1",
            "path": "EP12778453NWB1",
            "title": "POWER GENERATING APPARATUS OF A RENEWABLE ENERGY TYPE HAVING HYDRAULIC PUMP ALSO OPERABLE IN MOTORING MODE",
            "pubdate": "20150610",
            "inventor": "TSUTSUMI, Kazuhisa/Tokyo 108-8215\u00a0(JP), CALDWELL, Niall/Loanhead, Midlothian, Lothian EH209TB\u00a0(GB), ROBERTSON, Alasdair/Loanhead, Midlothian, Lothian EH209TB\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP10728622B1": {
            "patentid": "EP10728622B1",
            "path": "EP10728622NWB1",
            "title": "WALL PORTION FOR A TOWER OF A WIND TURBINE",
            "pubdate": "20150729",
            "inventor": "Siemens Aktiengesellschaft/80333 M\u00fcnchen\u00a0(DE), Andresen Towers A/S/5550 Langeskov\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP07120659B1": {
            "patentid": "EP07120659B1",
            "path": "EP07120659NWB1",
            "title": "Verfahren zur Errichtung einer Windenergieanlage, Windenergieanlage",
            "pubdate": "20161109",
            "inventor": "Wobben, Aloys/26607 Aurich\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12153797B1": {
            "patentid": "EP12153797B1",
            "path": "EP12153797NWB1",
            "title": "Access apparatus for a wind turbine and method of using same",
            "pubdate": "20160720",
            "inventor": "Andersen, Jesper Lykkegaard/8543 Hornslet\u00a0(DK), Olesen, Kennet Ryan/8370 Hadsten\u00a0(DK), Baun, Torben Friis/8200 \u00c5rhus N\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11730317B1": {
            "patentid": "EP11730317B1",
            "path": "EP11730317NWB1",
            "title": "NOTCH-REDUCED COMPOSITE JOINT",
            "pubdate": "20161005",
            "inventor": "NIELSEN, Lars/DK-8860 Skanderborg\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12810221B1": {
            "patentid": "EP12810221B1",
            "path": "EP12810221NWB1",
            "title": "VERFAHREN UND VORRICHTUNG ZUM MONTIEREN EINER ROTORNABE EINER WINDENERGIEANLAGE",
            "pubdate": "20160316",
            "inventor": "KNOOP, Frank/26607 Aurich\u00a0(DE), KUIPER, Gerrit/26607 Aurich\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP07013159B1": {
            "patentid": "EP07013159B1",
            "path": "EP07013159NWB1",
            "title": "Vertical axis wind turbine",
            "pubdate": "20160928",
            "inventor": "Vucak, Aleksandar/80939 M\u00fcnchen\u00a0(DE), Tesic, Nenad/78220 Kotor Varos\u00a0(BA), Tesic, Dragan/78220 Kotor Varos\u00a0(BA), Tesic, Miroslav/78220 Kotor Varos\u00a0(BA)",
            "mainpicture": "imgb0001.png"
        },
        "EP12173269B1": {
            "patentid": "EP12173269B1",
            "path": "EP12173269NWB1",
            "title": "Unterirdisches Pumpspeicherkraftwerk",
            "pubdate": "20160518",
            "inventor": "Windoffer, Ralf/49832 Andervenne\u00a0(DE), Klaus, Ernst/30177 Hannover\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP09780886B1": {
            "patentid": "EP09780886B1",
            "path": "EP09780886NWB1",
            "title": "ADJUSTABLE CONSTRAINING ARRANGEMENT FOR WIND TURBINE TOWERS",
            "pubdate": "20160217",
            "inventor": "\u00d8LLGAARD, B\u00f8rge/DK-6700 Esbjerg\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP09000081B1": {
            "patentid": "EP09000081B1",
            "path": "EP09000081NWB1",
            "title": "Verfahren zum Betrieb einer Windenergieanlage",
            "pubdate": "20150520",
            "inventor": "Schmidt, Gunnar/27404 Elsdorf\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10000313B1": {
            "patentid": "EP10000313B1",
            "path": "EP10000313NWB1",
            "title": "Parametrisierung von Windenergieanlagen",
            "pubdate": "20151014",
            "inventor": "Altemark, Jens/24768 Rendsburg\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP08758269B1": {
            "patentid": "EP08758269B1",
            "path": "EP08758269NWB1",
            "title": "CONTROL OF ROTOR DURING A STOP PROCESS OF A WIND TURBINE",
            "pubdate": "20151021",
            "inventor": "RISAGER, Lars/DK-8680 Rye\u00a0(DK), HAMMERUM, Keld/DK-8370 Hadsten\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12382386B1": {
            "patentid": "EP12382386B1",
            "path": "EP12382386NWB1",
            "title": "Wind turbine blade and methods of operating it",
            "pubdate": "20150624",
            "inventor": "Canal Vila, MARC/08037 BARCELONA\u00a0(ES), Miguel Alfaro, DANIEL/08174 SANT CUGAT DEL VALL\u00c8S\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP13187135B1": {
            "patentid": "EP13187135B1",
            "path": "EP13187135NWB1",
            "title": "Rotorblatt, Rotorblattelement und Herstellverfahren",
            "pubdate": "20170628",
            "inventor": "Muschke, Sven/26419 Schortens\u00a0(DE), Link, Torsten/26506 Norden\u00a0(DE)",
            "mainpicture": ""
        },
        "EP12787645B1": {
            "patentid": "EP12787645B1",
            "path": "EP12787645NWB1",
            "title": "A wind turbine comprising a blade pitch system",
            "pubdate": "20160406",
            "inventor": "NEUBAUER, Jesper Lykkegaard/DK-8543 Hornslet\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP09001056B1": {
            "patentid": "EP09001056B1",
            "path": "EP09001056NWB1",
            "title": "Regler f\u00fcr einen Blatteinstellwinkel mindestens eines Rotorblatts einer Windenergieanlage",
            "pubdate": "20160127",
            "inventor": "Kabatzke, Wolfgang/21502 Geesthacht\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP09162784B1": {
            "patentid": "EP09162784B1",
            "path": "EP09162784NWB1",
            "title": "Wind power plant equipped with generator cooling system",
            "pubdate": "20170823",
            "inventor": "Pabst, Otto/39037 Rio di Pusteria\u00a0(IT), Folie, Georg/39026 Prato Allo Stelvio\u00a0(IT), Casazza, Matteo/39049 Vipiteno\u00a0(IT), Bustreo, Paolo/39049 Vipiteno\u00a0(IT), Gebhard, Peter/39040 Velturno\u00a0(IT)",
            "mainpicture": "imgf0001.png"
        },
        "EP06771758B1": {
            "patentid": "EP06771758B1",
            "path": "EP06771758NWB1",
            "title": "TRANSFER OF KINETIC ENERGY TO AND FROM FLUIDS",
            "pubdate": "20141231",
            "inventor": "Kerr, Colin C./Burlington VT 05402-1604\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP06254721B1": {
            "patentid": "EP06254721B1",
            "path": "EP06254721NWB1",
            "title": "Method and apparatus for wind turbine braking",
            "pubdate": "20160817",
            "inventor": "Barbu, Corneliu/Guilderland, NY 12084\u00a0(US), Teichmann, Ralph/Cohoes, NY 12047\u00a0(US), Avagliano, Aaron/Niskayuna, NY 12309\u00a0(US), Kammer, Leonardo Cesar/Niskayuna, NY 12309\u00a0(US), Pierce, Kirk Gee/Simpsonville, SC 29681\u00a0(US), Pesetsky, David Samuel/Greenville, SC 29615\u00a0(US), Gauchel, Peter/48155 M\u00fcnster\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12744020B1": {
            "patentid": "EP12744020B1",
            "path": "EP12744020NWB1",
            "title": "BAUTEIL EINER WINDKRAFTANLAGE MIT EINER AUFNAHME ZUR HANDHABUNG DES BAUTEILS SOWIE TRAGBALKEN ZUR HANDHABUNG VON BAUTEILEN EINER WINDKRAFTANLAGE",
            "pubdate": "20170927",
            "inventor": "B\u00d6GL, Johann/92369 Sengenthal\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10158264B1": {
            "patentid": "EP10158264B1",
            "path": "EP10158264NWB1",
            "title": "Wind turbine",
            "pubdate": "20160113",
            "inventor": "Castell Mart\u00ednez, Daniel/08005, Barcelona\u00a0(ES), Rom\u00e1n Mallada, Jos\u00e9 Luis/08005, Barcelona\u00a0(ES), Colom Quetglas, Miquel \u00c0ngel/08005, Barcelona\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP08855563B1": {
            "patentid": "EP08855563B1",
            "path": "EP08855563NWB1",
            "title": "A WIND TURBINE, A METHOD FOR CONTROLLING A WIND TURBINE AND USE THEREOF",
            "pubdate": "20170927",
            "inventor": "NIELSEN, Thomas Steiniche Bjertrup/DK-8900 Randers\u00a0(DK), PEDERSEN, Bo, Juul/DK-8370 Hadsten\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11730894B1": {
            "patentid": "EP11730894B1",
            "path": "EP11730894NWB1",
            "title": "TURBINE BLADE TEMPERATURE MEASUREMENT SYSTEM AND METHOD OF MANUFACTURE OF TURBINE BLADES",
            "pubdate": "20170315",
            "inventor": "OLESEN, Ib Svend/8930 Randers\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12714205B1": {
            "patentid": "EP12714205B1",
            "path": "EP12714205NWB1",
            "title": "Wind turbine control system with decentralized voting",
            "pubdate": "20160323",
            "inventor": "BENGTSON, John/DK-8270 H\u00f8jbjerg\u00a0(DK), DONESCU, Victor/Westford Massachusetts 01886\u00a0(US), KJ\u00c6R, Philip Carne/DK-8000 Aarhus\u00a0(DK), SKAUG, Kenneth/DK-8330 Beder\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11784750B1": {
            "patentid": "EP11784750B1",
            "path": "EP11784750NWB1",
            "title": "WIND TURBINE COMPONENT COMPRISING RADAR -ABSORBING MATERIAL AND METHOD OF MANUFACTURING SAME",
            "pubdate": "20151216",
            "inventor": "APPLETON, Steve/Hampshire GU52 7LU\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP11774475B1": {
            "patentid": "EP11774475B1",
            "path": "EP11774475NWB1",
            "title": "METHOD FOR ASSEMBLING A WIND TURBINE TOWER ON AN ERECTION FOUNDATION AND A DEVICE",
            "pubdate": "20170301",
            "inventor": "J\u00c4RVI, Jouko/FI-02200 Espoo\u00a0(FI), KANKKUNEN, Heikki/FI-01690 Vantaa\u00a0(FI)",
            "mainpicture": "imgf0001.png"
        },
        "EP10739826B1": {
            "patentid": "EP10739826B1",
            "path": "EP10739826NWB1",
            "title": "MONITORING/CONTROL DEVICE AND METHOD AND WIND FARM PROVIDED THEREWITH",
            "pubdate": "20160113",
            "inventor": "WAKATA, Daisuke/Tokyo 108-8215\u00a0(JP), YASUGI, Akira/Tokyo 108-8215\u00a0(JP)",
            "mainpicture": "imgb0001.png"
        },
        "EP08101196B1": {
            "patentid": "EP08101196B1",
            "path": "EP08101196NWB1",
            "title": "Method for optimizing the operation of a wind turbine",
            "pubdate": "20170503",
            "inventor": "Ormel, Frank T./7558 BE, Hengelo\u00a0(NL), Hoffmann, Till/49078, Osnabruck\u00a0(DE), Kooijman, Henk-Jan/NL 7535, Al Enschede\u00a0(NL), Riesberg, Andre/49134, Wallenhorst\u00a0(DE), Wesselink, Jean Louis/7603, WR Almelo\u00a0(NL)",
            "mainpicture": "imgb0001.png"
        },
        "EP13197473B1": {
            "patentid": "EP13197473B1",
            "path": "EP13197473NWB1",
            "title": "Precast concrete dowel, wind turbine tower comprising said dowel, wind turbine comprising said tower and method for assembling said wind turbine",
            "pubdate": "20150729",
            "inventor": "Nu\u00f1ez Polo, Miguel/31621 Sarriguren (NAVARRA)\u00a0(ES), Arlab\u00e1n Gabeiras, Teresa/31621 Sarriguren (NAVARRA)\u00a0(ES), Ruiz Aldama, Alfonso/31621 Sarriguren (NAVARRA)\u00a0(ES), Sanz Corretge, Francisto Javier/31621 Sarriguren (NAVARRA)\u00a0(ES), Garcia Sayes, Jos\u00e9 Miguel/31621 Sarriguren (NAVARRA)\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP11730191B1": {
            "patentid": "EP11730191B1",
            "path": "EP11730191NWB1",
            "title": "SCHWENKTRIEB",
            "pubdate": "20150107",
            "inventor": "V\u00d6LLNER, Martin/91315 H\u00f6chstadt\u00a0(DE), FRANK, Hubertus/91315 H\u00f6chstadt\u00a0(DE), KLINNER, Uwe/91301 Forchheim\u00a0(DE)",
            "mainpicture": "imgb0001.png"
        },
        "EP10743045B1": {
            "patentid": "EP10743045B1",
            "path": "EP10743045NWB1",
            "title": "WINDENERGIEANLAGE MIT EINSTELLBARER LEISTUNGSRESERVE",
            "pubdate": "20170329",
            "inventor": "KR\u00dcGER, Thomas/24784 Westerr\u00f6nfeld\u00a0(DE)",
            "mainpicture": "imgb0001.png"
        },
        "EP12704498B1": {
            "patentid": "EP12704498B1",
            "path": "EP12704498NWB1",
            "title": "WIND TURBINE HAVING HELIPLATFORM ARRANGEMENT AND METHOD OF USING SAME",
            "pubdate": "20171025",
            "inventor": "ABOLFAZLIAN, Mazyar/DK-8220 Brabrand\u00a0(DK), MOGENSEN, Morten/DK-8520 Lystrup\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12710367B1": {
            "patentid": "EP12710367B1",
            "path": "EP12710367NWB1",
            "title": "POWER GENERATING APPARATUS OF RENEWABLE ENERGY TYPE AND OPERATION METHOD THEREOF",
            "pubdate": "20160518",
            "inventor": "HAMANO, Fumio/Tokyo 108-8215\u00a0(JP), HOKAZONO, Shigeru/Tokyo 108-8215\u00a0(JP), NAKAYAMA, Ken/Tokyo 108-8215\u00a0(JP), TSUTSUMI, Kazuhisa/Tokyo 108-8215\u00a0(JP), BALDINI, Francesco/London Greater London W1K 6WL\u00a0(GB), CALDWELL, Niall/Loanhead Midlothian EH20 9TB\u00a0(GB), DUMNOV, Daniil/Loanhead Midlothian EH20 9TB\u00a0(GB), ABRAHAMS, Daniel/Loanhead Midlothian EH20 9TB\u00a0(GB), LAIRD, Stephen/Loanhead Midlothian EH20 9TB\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP08715599B1": {
            "patentid": "EP08715599B1",
            "path": "EP08715599NWB1",
            "title": "WIND TURBINE WITH PITCH CONTROL",
            "pubdate": "20151014",
            "inventor": "RISAGER, Lars/DK-8680 Ry\u00a0(DK), SVENDSEN, Rasmus/DK-8900 Randers\u00a0(DK), MIRANDA, Erik, Carl/DK-8900 Randers\u00a0(DK)",
            "mainpicture": "imgb0001.png"
        },
        "EP13194515B1": {
            "patentid": "EP13194515B1",
            "path": "EP13194515NWB1",
            "title": "WIND AND WAVE POWER GENERATION SYSTEM",
            "pubdate": "20170920",
            "inventor": "Wille, Hein/F-06360 Eze\u00a0(FR), Boureau, Sophie/FR-06000 Nice\u00a0(FR)",
            "mainpicture": "imgf0001.png"
        },
        "EP10167623B1": {
            "patentid": "EP10167623B1",
            "path": "EP10167623NWB1",
            "title": "Wind turbine yaw system and method of controlling the same",
            "pubdate": "20160803",
            "inventor": "Andersen, Kurt/6623, Vorbasse\u00a0(DK)",
            "mainpicture": "imgb0001.png"
        },
        "EP11713172B1": {
            "patentid": "EP11713172B1",
            "path": "EP11713172NWB1",
            "title": "METHOD OF OPERATING A WIND TURBINE, WIND TURBINE, WIND TURBINE CONTROLLING SYSTEM, AND PROCESSING SYSTEM",
            "pubdate": "20161228",
            "inventor": "LI, Bing/Singapore 600278/SG\u00a0(SG), TRIPATHI, Anshuman/Singapore 658882\u00a0(SG), CAO, Shu, Yu/Singapore 986575/SG\u00a0(SG), GUPTA, Amit, Kumar/Singapore 120601\u00a0(SG), SNG, Eng, Kian, Kenneth/Singapore 597156\u00a0(SG), HELLE, Lars/DK-9541 Suldrup\u00a0(DK)",
            "mainpicture": "imgb0001.png"
        },
        "EP10177850B1": {
            "patentid": "EP10177850B1",
            "path": "EP10177850NWB1",
            "title": "Mould for manufacturing of wind turbine blades",
            "pubdate": "20160615",
            "inventor": "Rajasingam, Damien/West Medina Mills,  Stag Lane, Newport, Isle of Wight\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP10825883B1": {
            "patentid": "EP10825883B1",
            "path": "EP10825883NWB1",
            "title": "LIFT-TYPE VERTICAL AXIS TURBINE",
            "pubdate": "20150722",
            "inventor": "Lux, Glenn Raymond/Saskatoon, SK S7N 0C2\u00a0(CA)",
            "mainpicture": "imgf0001.png"
        },
        "EP12801794B1": {
            "patentid": "EP12801794B1",
            "path": "EP12801794NWB1",
            "title": "RENEWABLE ENERGY TYPE ELECTRIC POWER GENERATION DEVICE",
            "pubdate": "20160420",
            "inventor": "AKASHI, Yu/Tokyo 108-8215\u00a0(JP), MATSUO, Takeshi/Tokyo 108-8215\u00a0(JP), SATO, Shinsuke/Tokyo 108-8215\u00a0(JP), KAMEDA, Takuro/Tokyo 108-8215\u00a0(JP), BALDINI, Francesco/London Greater London W1K6WL\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP10166804B1": {
            "patentid": "EP10166804B1",
            "path": "EP10166804NWB1",
            "title": "A method and a system for controlling operation of a wind turbine",
            "pubdate": "20160113",
            "inventor": "Ong, Jiun Keat/138632, Singapore\u00a0(SG), Zhang, Tie Ling/138632, Singapore\u00a0(SG), Zhou, Yu/138632, Singapore\u00a0(SG), Lim, Khoon Peng/138632, Singapore\u00a0(SG), Chen, Wan Ying/138632, Singapore\u00a0(SG), Siew, Pey Yen/138632, Singapore\u00a0(SG), Nandedkar, Kiran Kishan Rao/138632, Singapore\u00a0(SG), Ho, Jiann Yi/138632, Singapore\u00a0(SG), Chin, Bung Chai/138632, Singapore\u00a0(SG)",
            "mainpicture": "imgb0001.png"
        },
        "EP07104479B1": {
            "patentid": "EP07104479B1",
            "path": "EP07104479NWB1",
            "title": "Method for controlling operation of an electrical power generation system",
            "pubdate": "20160914",
            "inventor": "Delmerico, Robert/Clifton Park, NY 12065\u00a0(US), Cardinal, Marc/Altamont, NY 12009\u00a0(US), Miller, Nicholas/Delmar, NY 12054\u00a0(US), Liu, Dapeng/200125, Shanghai\u00a0(CN), Ye, Zhihong/Austin, TX 78759\u00a0(US)",
            "mainpicture": "imgb0001.png"
        },
        "EP12003739B1": {
            "patentid": "EP12003739B1",
            "path": "EP12003739NWB1",
            "title": "A bonding method for a wind turbine multi-panel blade",
            "pubdate": "20150902",
            "inventor": "Velez Oria, Sergio/48170 Zamuido - Bizkaia\u00a0(ES), Zugasti Paramo, Amaia/31621 Sarriguren\u00a0(ES), Marin Martinez, Francisco Javier/31621 Sarriguren\u00a0(ES), Rodriguez Saiz, Emilio/31621 Sarriguren\u00a0(ES), Arocena De La Rua, Ion/31621 Sarriguren\u00a0(ES), Sanz Pascual, Eneko/31621 Sarriguren\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP04803071B1": {
            "patentid": "EP04803071B1",
            "path": "EP04803071NWB1",
            "title": "METHOD OF CONTROLLING A WIND TURBINE CONNECTED TO AN ELECTRIC UTILITY GRID",
            "pubdate": "20170719",
            "inventor": "ESBENSEN, Claus/8382 Hinnerup\u00a0(DK), NIELSEN, John Godsk/8543 Hornslet\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12881137B1": {
            "patentid": "EP12881137B1",
            "path": "EP12881137NWB1",
            "title": "WIND FARM OUTPUT CONTROL DEVICE AND OUTPUT CONTROL METHOD",
            "pubdate": "20160413",
            "inventor": "YASUGI, Akira/Tokyo 108-8215\u00a0(JP), KII, Tsutomu/Tokyo 108-8215\u00a0(JP), BABA, Mitsuya/Tokyo 108-8215\u00a0(JP), HORI, Yoshiaki/Tokyo 108-8215\u00a0(JP)",
            "mainpicture": "imgb0001.png"
        },
        "EP09801390B1": {
            "patentid": "EP09801390B1",
            "path": "EP09801390NWB1",
            "title": "PITCH CONTROL OF A WIND TURBINE",
            "pubdate": "20151014",
            "inventor": "BRATH, Per/DK-8920 Randers NV\u00a0(DK), \u00d8STERGAARD, Kasper, Zinck/DK-8762 Flemming\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10163694B1": {
            "patentid": "EP10163694B1",
            "path": "EP10163694NWB1",
            "title": "Load identification system for a wind turbine",
            "pubdate": "20170215",
            "inventor": "Schulten, Cristoph/48499, Salzbergen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP13160517B1": {
            "patentid": "EP13160517B1",
            "path": "EP13160517NWB1",
            "title": "Power generating apparatus of renewable energy type",
            "pubdate": "20150902",
            "inventor": "Kameda, Takuro/Tokyo 108-8215\u00a0(JP), Robertson, Alasdair/Midlothian, Lothian EH209TB\u00a0(GB), Dodson, Henry/Midlothian, Lothian EH209TB\u00a0(GB), Stein, Uwe/Midlothian, Lothian EH209TB\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP12165650B1": {
            "patentid": "EP12165650B1",
            "path": "EP12165650NWB1",
            "title": "Method, system and computer program product for dynamic rule engine for a wind turbine farm",
            "pubdate": "20160713",
            "inventor": "Vasudevarao, Asha/Hyderabad\u00a0(IN), Vidiyala, Sandeep Kumar/Hyderabad\u00a0(IN), Bk, Savitha/Hyderabad\u00a0(IN)",
            "mainpicture": "imgf0001.png"
        },
        "EP13157905B1": {
            "patentid": "EP13157905B1",
            "path": "EP13157905NWB1",
            "title": "Schwingungsentkoppler f\u00fcr Str\u00f6mungsenergiewandler",
            "pubdate": "20160720",
            "inventor": "Banzhaf, Hans/92715 P\u00fcchersreuth\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11749720B1": {
            "patentid": "EP11749720B1",
            "path": "EP11749720NWB1",
            "title": "METHOD OF OPERATING A WIND TURBINE AND WIND TURBINE",
            "pubdate": "20170621",
            "inventor": "BRATH, Per/DK-8920 Randers NV\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP09163678B1": {
            "patentid": "EP09163678B1",
            "path": "EP09163678NWB1",
            "title": "Cleaning device for wind turbine blades",
            "pubdate": "20151021",
            "inventor": "Siebers, Thomas/48485, Neuenkirchen\u00a0(DE), Arelt, Rainer/91792, Ellingen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP13182936B1": {
            "patentid": "EP13182936B1",
            "path": "EP13182936NWB1",
            "title": "Turbine and control system of the over-power of said turbine",
            "pubdate": "20151223",
            "inventor": "Cattano, Aldo/37030 Badia Calavena (VR)\u00a0(IT)",
            "mainpicture": "imgf0001.png"
        },
        "EP12169956B1": {
            "patentid": "EP12169956B1",
            "path": "EP12169956NWB1",
            "title": "Verfahren zum Betreiben einer Windenergieanlage und Windenergieanlage",
            "pubdate": "20160720",
            "inventor": "Steiner, Stefan/24943 Flensburg\u00a0(DE), Von Mutius, Martin/24358 Ascheffel\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11793649B1": {
            "patentid": "EP11793649B1",
            "path": "EP11793649NWB1",
            "title": "A TOOL AND A METHOD FOR MOVING A WIND TURBINE DRIVETRAIN COMPONENT",
            "pubdate": "20160824",
            "inventor": "MOGENSEN, Morten/DK-8520 Lystrup\u00a0(DK), H\u00d8EG, Bendt/DK-8464 Galten\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10169343B1": {
            "patentid": "EP10169343B1",
            "path": "EP10169343NWB1",
            "title": "Wind turbine blade inspection and cleaning system",
            "pubdate": "20160907",
            "inventor": "Eggleston, Eric/Tehachapi, CA 93561\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP12783869B1": {
            "patentid": "EP12783869B1",
            "path": "EP12783869NWB1",
            "title": "WIND TURBINE BLADE AND METHOD PROVIDING PASSIVE CONTROL FOR REDUCING AERODYNAMIC BLADE LOADING",
            "pubdate": "20170510",
            "inventor": "MORAN, Garrett/Houston, TX 77062\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP12816612B1": {
            "patentid": "EP12816612B1",
            "path": "EP12816612NWB1",
            "title": "METHOD FOR ROBUST WIRELESS WIND TURBINE CONDITION MONITORING",
            "pubdate": "20150923",
            "inventor": "LANG, Christoph/Sunnyvale, CA 94087-4420\u00a0(US), VOLKMER, Peter/01109 Dresden\u00a0(DE), SENEL, Murat/San Mateo, CA 94403\u00a0(US), JAIN, Vivek/Sunnyvale, CA 94087-2323\u00a0(US), VENKATRAMAN, Lakshmi/Moutain View, CA 94043\u00a0(US), LEE, Huang/Mountain View, CA 94040\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP11797243B1": {
            "patentid": "EP11797243B1",
            "path": "EP11797243NWB1",
            "title": "WINDKRAFTANLAGE",
            "pubdate": "20151209",
            "inventor": "DERRER, Siegfried/91315 H\u00f6chstadt\u00a0(DE), PICKEL, Edgar/97334 Sommerach\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11186413B1": {
            "patentid": "EP11186413B1",
            "path": "EP11186413NWB1",
            "title": "Working platform for an offshore wind energy plant and method for manufacturing the same",
            "pubdate": "20150909",
            "inventor": "Kramer, Thomas/26919 Brake\u00a0(DE), Gennrich, Michael/28844 Weyhe\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11753388B1": {
            "patentid": "EP11753388B1",
            "path": "EP11753388NWB1",
            "title": "ABRASION DETECTION DEVICE, WIND POWER GENERATOR EQUIPPED THEREWITH, AND ABRASION DETECTION METHOD",
            "pubdate": "20150520",
            "inventor": "SAKAGUCHI, Tomoya/Kuwana-shi Mie 511-0867\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP09006677B1": {
            "patentid": "EP09006677B1",
            "path": "EP09006677NWB1",
            "title": "Signaleinrichtung f\u00fcr Offshore-Windpark",
            "pubdate": "20170329",
            "inventor": "Carstensen, Lorenz-Heinrich/25855 Haselund\u00a0(DE), Altemark, Jens/24768 Rendsburg\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP09764604B1": {
            "patentid": "EP09764604B1",
            "path": "EP09764604NWB1",
            "title": "ENERGY CONVERSION ASSEMBLY",
            "pubdate": "20160608",
            "inventor": "Bolelli, Roberto/40020 Casalfiumanese\u00a0(IT)",
            "mainpicture": "imgf0001.png"
        },
        "EP05739534B1": {
            "patentid": "EP05739534B1",
            "path": "EP05739534NWB1",
            "title": "A PITCH CONTROLLED WIND TURBINE BLADE HAVING TURBULENCE GENERATING MEANS, A WIND TURBINE AND USE THEREOF",
            "pubdate": "20170510",
            "inventor": "GODSK, Kristian, Balschmidt/2200 Kobenhavn\u00a0(DK), NIELSEN, Thomas, Steiniche, Bjertrup/DK-8900 Randers\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10192749B1": {
            "patentid": "EP10192749B1",
            "path": "EP10192749NWB1",
            "title": "Method and system for controlling an electric device of a wind turbine",
            "pubdate": "20161019",
            "inventor": "Bager, Troels/8800, Viborg\u00a0(DK), Nielsen, Kaj Skov/Issaquah WA, 98027\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP10834605B1": {
            "patentid": "EP10834605B1",
            "path": "EP10834605NWB1",
            "title": "WELDED STRUCTURE WITH A BUTT-WELDED JOINT, AND METHOD OF MANUFACTURING THE SAME",
            "pubdate": "20150708",
            "inventor": "ISHIKAWA, Tadashi/Tokyo 100-8071\u00a0(JP), HONMA, Ryuichi/Tokyo 100-8071\u00a0(JP), ICHIKAWA, Kazutoshi/Tokyo 100-8071\u00a0(JP)",
            "mainpicture": "imgb0001.png"
        },
        "EP10732248B1": {
            "patentid": "EP10732248B1",
            "path": "EP10732248NWB1",
            "title": "DIFFERENZIALGETRIEBE F\u00dcR ENERGIEGEWINNUNGSANLAGE UND VERFAHREN ZUM BETREIBEN",
            "pubdate": "20150826",
            "inventor": "Hehenberger, Gerald/9020 Klagenfurt\u00a0(AT)",
            "mainpicture": "imgb0001.png"
        },
        "EP12810047B1": {
            "patentid": "EP12810047B1",
            "path": "EP12810047NWB1",
            "title": "QUICK START-UP OF WIND TURBINE GENERATORS",
            "pubdate": "20170503",
            "inventor": "TRIPATHI, Anshuman/Singapore 658882\u00a0(SG), YU, Weifu/Singapore 643681\u00a0(SG), KARUPPANAN, Yugarajan/Singapore 600224\u00a0(SG)",
            "mainpicture": "imgf0001.png"
        },
        "EP09784298B1": {
            "patentid": "EP09784298B1",
            "path": "EP09784298NWB1",
            "title": "GENERATEUR D'ENERGIE",
            "pubdate": "20160713",
            "inventor": "Drevet, Jean Baptiste/75005 Paris\u00a0(FR)",
            "mainpicture": "imgf0001.png"
        },
        "EP13382118B1": {
            "patentid": "EP13382118B1",
            "path": "EP13382118NWB1",
            "title": "Method of operating a wind turbine",
            "pubdate": "20161102",
            "inventor": "Pineda Amo, Isaac/08172 SANT CUGAT DEL VALL\u00c8S\u00a0(ES)",
            "mainpicture": "imgb0001.png"
        },
        "EP05815151B1": {
            "patentid": "EP05815151B1",
            "path": "EP05815151NWB1",
            "title": "LIGHTNING CONDUCTOR SYSTEM FOR WIND GENERATOR BLADES COMPRISING CARBON FIBRE LAMINATES",
            "pubdate": "20160824",
            "inventor": "LLORENTE GONZALEZ, J.I., Gamesa Innovation & Tech./31013 PAMPLONA\u00a0(ES), VELEZ ORIA, Sergio, Gamesa Innovation & Tech./31013 PAMPLONA\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP06255504B1": {
            "patentid": "EP06255504B1",
            "path": "EP06255504NWB1",
            "title": "Method of manufacturing a wind turbine rotor blade",
            "pubdate": "20150624",
            "inventor": "Bakhuis, Jan Willem/7443 JR Niverjal\u00a0(NL), Billen, Andrew/7687 BH Daarlerveen\u00a0(NL), Breugel, Sjef/7511 HD Enschede\u00a0(NL), Livingston, Jamie/Pensacola, Florida 32514\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP08841482B1": {
            "patentid": "EP08841482B1",
            "path": "EP08841482NWB1",
            "title": "WIND TURBINE BLADE, WIND TURBINE AND METHOD FOR MANUFACTURING A WIND TURBINE BLADE",
            "pubdate": "20171213",
            "inventor": "NIEUWENHUIZEN, John Johannes Mathias Hubertus/DK-8700 Horsens\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12850438B1": {
            "patentid": "EP12850438B1",
            "path": "EP12850438NWB1",
            "title": "A WIND POWER PLANT FOR CONVERTING WIND ENERGY TO ELECTRICAL ENERGY AT SEA",
            "pubdate": "20160907",
            "inventor": "MORITZ, Bertil/SE-723 48 V\u00e4steras\u00a0(SE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12170522B1": {
            "patentid": "EP12170522B1",
            "path": "EP12170522NWB1",
            "title": "Method and system for controlling a generator",
            "pubdate": "20170913",
            "inventor": "Deng, Heng/7330 Brande\u00a0(DK), Esbensen, Thomas/7400 Herning\u00a0(DK), Hoegh, Gustav/7400 Herning\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12707028B1": {
            "patentid": "EP12707028B1",
            "path": "EP12707028NWB1",
            "title": "SEALING SYSTEM AND METHOD OF MAINTAINING A CLEAN ENVIRONMENT IN A WIND TURBINE BY ABSORBING LUBRICANT USED IN THE PITCH OR YAW BEARINGS.",
            "pubdate": "20170726",
            "inventor": "BAUN, Torben Friis/DK-8200 \u00c5rhus N\u00a0(DK), ROWNTREE, Robert/Comberbach Cheshire CW9 6BS\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP11758110B1": {
            "patentid": "EP11758110B1",
            "path": "EP11758110NWB1",
            "title": "METHOD AND IMPLEMENTATION OF A FAST REAL-TIME ESTIMATOR FOR REMAINING BATTERY LIFE FOR WIND ENERGY APPLICATIONS",
            "pubdate": "20161026",
            "inventor": "HOFFMAN, Jason/Breinigsville Pennsylvania 18031\u00a0(US), ZHANG, Jianhui/Houston Texas 77081\u00a0(US), VIASSOLO, Daniel/Katy Texas 77494\u00a0(US)",
            "mainpicture": "imgb0001.png"
        },
        "EP11167472B1": {
            "patentid": "EP11167472B1",
            "path": "EP11167472NWB1",
            "title": "Configuration of a wind turbine nacelle for transportation",
            "pubdate": "20150506",
            "inventor": "Stam, Ronald Eduard/48499, Salzbergen\u00a0(DE), Leland, Kenneth Bradley/Greenville, SC 29615\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP11787901B1": {
            "patentid": "EP11787901B1",
            "path": "EP11787901NWB1",
            "title": "VERFAHREN ZUM BETREIBEN EINER WINDENERGIEANLAGE",
            "pubdate": "20150225",
            "inventor": "EDEN, Georg/26556 Westerholt\u00a0(DE)",
            "mainpicture": "imgb0001.png"
        },
        "EP12727584B1": {
            "patentid": "EP12727584B1",
            "path": "EP12727584NWB1",
            "title": "LIFTING DEVICE FOR CONNECTING TWO ROTOR BLADE SEGMENTS OF A WIND TURBINE",
            "pubdate": "20170726",
            "inventor": "TEICHERT, Paul/DK-6470 Sydals\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP09180859B1": {
            "patentid": "EP09180859B1",
            "path": "EP09180859NWB1",
            "title": "Blade for a wind turbine rotor",
            "pubdate": "20171206",
            "inventor": "Grabau, Peter/6000, Kolding\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10776268B1": {
            "patentid": "EP10776268B1",
            "path": "EP10776268NWB1",
            "title": "HYDROSTATISCHER ANTRIEB EINER WINDENERGIEANLAGE",
            "pubdate": "20160921",
            "inventor": "MEUSER, Peter/17036 Neubrandenburg\u00a0(DE), T\u00dcRK, Manfred/17036 Neubrandenburg\u00a0(DE), PLEIKIS, Torsten/17036 Neubrandenburg\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10010007B1": {
            "patentid": "EP10010007B1",
            "path": "EP10010007NWB1",
            "title": "Windturbine mit Kupplung mit \u00dcberlasteinheit und Verfahren",
            "pubdate": "20170118",
            "inventor": "Exner, Jochen/53773 Hennef\u00a0(DE), Schulze, Hans Ullrich/04736 Waldheim\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11787781B1": {
            "patentid": "EP11787781B1",
            "path": "EP11787781NWB1",
            "title": "METHOD FOR CRANELESS WIND TURBINE BLADE HANDLING VIA A TURBINE HUB",
            "pubdate": "20160127",
            "inventor": "HVID NIELSEN, Kennet/DK-8920 Randers NV\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP08718404B1": {
            "patentid": "EP08718404B1",
            "path": "EP08718404NWB1",
            "title": "BLADE FOR WIND TURBINE",
            "pubdate": "20160608",
            "inventor": "Petri Larrea, Guillermo/31002 Pamplona Navarra\u00a0(ES), Sancho Rodriguez, Jos\u00e9/31192 Multiva Alta Navarra\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP13150999B1": {
            "patentid": "EP13150999B1",
            "path": "EP13150999NWB1",
            "title": "Method for operating wind farm and operation control system for wind farm",
            "pubdate": "20170308",
            "inventor": "Nakamura, Shigeaki/MINATO-KU, TOKYO, 108-8215\u00a0(JP), Minami, Tohru/MINATO-KU, TOKYO, 108-8215\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP13176703B1": {
            "patentid": "EP13176703B1",
            "path": "EP13176703NWB1",
            "title": "Methods and systems for use in monitoring a tachometer of a wind turbine",
            "pubdate": "20150923",
            "inventor": "Smith, David/Salem, VA Virginia 24153\u00a0(US), Li, Huimin/Salem, VA Virginia 24153\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP11178063B1": {
            "patentid": "EP11178063B1",
            "path": "EP11178063NWB1",
            "title": "Offshore-Fundament f\u00fcr Windenergieanlagen",
            "pubdate": "20170405",
            "inventor": "Reales Bertomeo, Emilio/27753 Delmenhorst\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12778627B1": {
            "patentid": "EP12778627B1",
            "path": "EP12778627NWB1",
            "title": "GETRIEBE F\u00dcR INDUSTRIELLE ANWENDUNGEN ODER WINDKRAFTANLAGEN",
            "pubdate": "20161221",
            "inventor": "DINTER, Ralf Martin/45888 Gelsenkirchen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP08865259B1": {
            "patentid": "EP08865259B1",
            "path": "EP08865259NWB1",
            "title": "A DRIVE TRAIN FOR A WIND TURBINE",
            "pubdate": "20151104",
            "inventor": "ANDERSEN, Carsten Bruun/DK-8210 \u00c5rhus V\u00a0(DK), S\u00d8RENSEN, Steffen Haslev/DK-8382 Hinnerup\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12168844B1": {
            "patentid": "EP12168844B1",
            "path": "EP12168844NWB1",
            "title": "A set of multiple aligning tools in the field of wind turbines for aligning tower and base",
            "pubdate": "20150225",
            "inventor": "Jensen, Martin Johan Smith/7080 B\u00f8rkop\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP09172032B1": {
            "patentid": "EP09172032B1",
            "path": "EP09172032NWB1",
            "title": "Hatch stop for wind turbines",
            "pubdate": "20150805",
            "inventor": "Li, Rui/200136, Pudong\u00a0(CN), Yan, Hua/201206, Pudong\u00a0(CN), Han, JianHua/Hebel R.P.\u00a0(CN)",
            "mainpicture": "imgf0001.png"
        },
        "EP11743423B1": {
            "patentid": "EP11743423B1",
            "path": "EP11743423NWB1",
            "title": "Apparatus and method for forming a trailing edge of a wind turbine blade and trailing edge component.",
            "pubdate": "20160504",
            "inventor": "RAJASINGAM, Damien/Cowes PO31 7PL\u00a0(GB), EVANS, Richard/Cowes PO31 8HQ\u00a0(GB), DAVIS, Olav/Hamble SO31 4HP\u00a0(GB), SANDERCOCK, Stephen/Ryde PO33 1LG\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP12175747B1": {
            "patentid": "EP12175747B1",
            "path": "EP12175747NWB1",
            "title": "Base frame structure for a wind turbine",
            "pubdate": "20150401",
            "inventor": "Andersen, Mads Peter Zippor Leth/8670 L\u00e5sby\u00a0(DK), Brown, Mark/8850 Bjerringbro\u00a0(DK), Nielsen, Jacob Blach/7442 Engesvang\u00a0(DK), Stiesdal, Henrik/5000 Odense C\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP09169328B1": {
            "patentid": "EP09169328B1",
            "path": "EP09169328NWB1",
            "title": "Wind turbine comprising a system for controlling vibrations",
            "pubdate": "20160413",
            "inventor": "Garrido, Alvaro Calle/28032, Madrid\u00a0(ES), Yegro, Eugenio/28979, Madrid\u00a0(ES), Crespo, Manuel Huerta/28300, Aranjuez\u00a0(ES), Benito, Pedro L./48429, Rheine\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11799623B1": {
            "patentid": "EP11799623B1",
            "path": "EP11799623NWB1",
            "title": "METHOD AND APPARATUS FOR PROTECTING WIND TURBINES FROM EXTREME EVENTS",
            "pubdate": "20160413",
            "inventor": "Vestas Wind Systems A/S/8200 Aarhus N\u00a0(DK), Creaby, Justin/Broomfield, CO 80020\u00a0(US)",
            "mainpicture": "imgb0001.png"
        },
        "EP13382109B1": {
            "patentid": "EP13382109B1",
            "path": "EP13382109NWB1",
            "title": "Wind turbine tower section, a wind turbine having such tower section and method for forming such tower section",
            "pubdate": "20171122",
            "inventor": "Jan\u00e9 Pa\u00f1ella, Xavier/08210 BARBER\u00c0 DEL VALL\u00c8S\u00a0(ES), Rom\u00e1n Mallada, Jos\u00e9 Luis/08960 SANT JUST DESVERN\u00a0(ES), Gonz\u00e1lez del Egido, Alberto/08018 BARCELONA\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP11797019B1": {
            "patentid": "EP11797019B1",
            "path": "EP11797019NWB1",
            "title": "KLEBSTOFF F\u00dcR DAS VERF\u00dcLLEN VON FUGEN UND SPALTEN IN ROTORBL\u00c4TTERN F\u00dcR WINDKRAFTANLAGEN",
            "pubdate": "20160420",
            "inventor": "PIND, Martin/Suzhou Industrial Park Suzhou 215121\u00a0(CN), OLSEN, Bodil/DK-3320 Skaevinge\u00a0(DK)",
            "mainpicture": "imgb0001.png"
        },
        "EP10194838B1": {
            "patentid": "EP10194838B1",
            "path": "EP10194838NWB1",
            "title": "Apparatus for increasing lift on wind turbine blade",
            "pubdate": "20160608",
            "inventor": "Mohammed, Omer/560066, Bangalore\u00a0(IN), Herr, Stefan/Greenville, SC 29615\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP06018665B1": {
            "patentid": "EP06018665B1",
            "path": "EP06018665NWB1",
            "title": "Wind turbine blade",
            "pubdate": "20160420",
            "inventor": "Gunneskov, Ole/8370 Hadsten\u00a0(DK), Barlow, Nicholas, Dudley/Southampton SO19 9BL\u00a0(GB), Hancock, Mark/Southampton SO 15 5HN\u00a0(GB), Vronsky, Tomas/Woolston Southampton SO19 9FR\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP10856497B1": {
            "patentid": "EP10856497B1",
            "path": "EP10856497NWB1",
            "title": "VERTICAL AXIS TURBINE",
            "pubdate": "20151014",
            "inventor": "Vaz, Guy Andrew/Singapore 519227\u00a0(SG)",
            "mainpicture": "imgf0001.png"
        },
        "EP11752470B1": {
            "patentid": "EP11752470B1",
            "path": "EP11752470NWB1",
            "title": "IR-GEFAHRENFEUER",
            "pubdate": "20151014",
            "inventor": "QUELL, Peter/24783 Osterr\u00f6nfeld\u00a0(DE), BOLZ, Detlef/23627 Gross-Gr\u00f6nau\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12382388B1": {
            "patentid": "EP12382388B1",
            "path": "EP12382388NWB1",
            "title": "Method of monitoring a wind turbine",
            "pubdate": "20170726",
            "inventor": "Prats Mustar\u00f3s, JOSEP/08001 Barcelona\u00a0(ES)",
            "mainpicture": "imgb0001.png"
        },
        "EP07736828B1": {
            "patentid": "EP07736828B1",
            "path": "EP07736828NWB1",
            "title": "AUTOMATIC CONTROL SYSTEM AND PROCESS FOR THE FLIGHT OF KITES",
            "pubdate": "20150218",
            "inventor": "MILANESE, Mario/10138 Torino\u00a0(IT), IPPOLITO, Massimo/10023 Chieri (TO)\u00a0(IT)",
            "mainpicture": "imgb0001.png"
        },
        "EP10764007B1": {
            "patentid": "EP10764007B1",
            "path": "EP10764007NWB1",
            "title": "HORIZONTAL WIND POWERED TURBINE",
            "pubdate": "20160406",
            "inventor": "Quintal, R\u00e9jean/Qu\u00e9bec J4X 4V4\u00a0(CA)",
            "mainpicture": "imgf0001.png"
        },
        "EP12164297B1": {
            "patentid": "EP12164297B1",
            "path": "EP12164297NWB1",
            "title": "Installation/dismounting of a hub to/from a nacelle of a wind turbine by using a blade pitch angle adjustment device of the hub for orientating the hub",
            "pubdate": "20150916",
            "inventor": "Falkenberg, Peter Loevenskjold/7400 Herning\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11700019B1": {
            "patentid": "EP11700019B1",
            "path": "EP11700019NWB1",
            "title": "A WIND TURBINE GENERATOR WITH FLUID FILM BEARING UNITS",
            "pubdate": "20170315",
            "inventor": "STAGH\u00d8J, Michael/DK-8680 Ry\u00a0(DK), LARSEN, Gerner/DK-8382 Hinnerup\u00a0(DK), OLSEN, Niels Christian/DK-8830 Tjele\u00a0(DK), HANSEN, Frank M\u00f8ller/DK-9510 Arden\u00a0(DK), WADEHN, J\u00f6rg/24109 Melsdorf\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12766099B1": {
            "patentid": "EP12766099B1",
            "path": "EP12766099NWB1",
            "title": "BLADE FOR WIND TURBINE AND METHOD OF ASSEMBLY OF THE BLADE",
            "pubdate": "20160316",
            "inventor": "LA PEGNA, Luigi/00198 Roma\u00a0(IT), PIANO, Renzo/00198 Roma\u00a0(IT)",
            "mainpicture": "imgf0001.png"
        },
        "EP11770683B1": {
            "patentid": "EP11770683B1",
            "path": "EP11770683NWB1",
            "title": "WIND TURBINE WITH BEARING SUPPORT",
            "pubdate": "20151021",
            "inventor": "DEMTR\u00d6DER, Jens/DK-8410 R\u00f8nde\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12826549B1": {
            "patentid": "EP12826549B1",
            "path": "EP12826549NWB1",
            "title": "WIND POWER TURBINE FOR GENERATING ELECTRIC ENERGY",
            "pubdate": "20160302",
            "inventor": "CASAZZA, Matteo/I-39049 Val Di Vizze\u00a0(IT), OBERBICHLER, Fabian/I-39030 Selva dei Molini\u00a0(IT), PREINDL, Matthias/I-39030 Rasun-Anterselva\u00a0(IT)",
            "mainpicture": "imgf0001.png"
        },
        "EP09000998B1": {
            "patentid": "EP09000998B1",
            "path": "EP09000998NWB1",
            "title": "Windenergieanlage mit Blatteinstellwinkelregler",
            "pubdate": "20150624",
            "inventor": "Kabatzke, Wolfgang/21502 Geesthacht\u00a0(DE), Wiese-M\u00fcller, Lars-Ulrich/25421 Pinneberg\u00a0(DE), Schl\u00fcter, Detlef/18069 Rostock\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10728260B1": {
            "patentid": "EP10728260B1",
            "path": "EP10728260NWB1",
            "title": "DISPOSITIF D'ASSEMBLAGE DE TRON\u00c7ONS DE PALES D'EOLIENNES ET PROCEDE DE LIAISON DE TRON\u00c7ONS DE PALES D'EOLIENNES",
            "pubdate": "20160914",
            "inventor": "AUBERON, Marcel/F-33160 St Medard En Jalles\u00a0(FR), PETERMANN, Nicolas/F-33200 Bordeaux\u00a0(FR)",
            "mainpicture": "imgf0001.png"
        },
        "EP11723237B1": {
            "patentid": "EP11723237B1",
            "path": "EP11723237NWB1",
            "title": "METHOD FOR REDUCING FLUID FLOW INDUCED FORCES PRODUCED BY VORTEX SHEDDING ON A WIND TURBINE ROTOR BLADE",
            "pubdate": "20150429",
            "inventor": "BRYANT, Joshua/8200 Aarhus N\u00a0(DK), BEHRENS, Tim/8200 Aarhus N\u00a0(DK), XUE, Sidney/Katy, 77494\u00a0(US), SAREEN, Ashish/8200 Aarhus N\u00a0(DK), JOHNSON, Bradley/8200 Aarhus N\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10740533B1": {
            "patentid": "EP10740533B1",
            "path": "EP10740533NWB1",
            "title": "ANTRIEBSSTRANG UND WINDKRAFTANLAGE",
            "pubdate": "20150909",
            "inventor": "VATH, Andreas/63849 Leidersbach\u00a0(DE), KLEIN, Andreas/58455 Witten\u00a0(DE), NOLLER, Klaus/71570 Oppenweiler\u00a0(DE), BERGER, G\u00fcnter/44577 Castrop-Rauxel\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP07013519B1": {
            "patentid": "EP07013519B1",
            "path": "EP07013519NWB1",
            "title": "Minimising wind turbine generator air gap with a specific shaft bearing arrangement",
            "pubdate": "20170830",
            "inventor": "Stiesdal, Henrik/5000 Odense C\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11728641B1": {
            "patentid": "EP11728641B1",
            "path": "EP11728641NWB1",
            "title": "TURBOGENERATEUR A ROTOR A PALES A INCIDENCE ADAPTEE AU VENT APPARENT",
            "pubdate": "20160309",
            "inventor": "Notteghem, Bernard/71710 Marmagne\u00a0(FR), Vailleau, Christian/71510 Essertenne\u00a0(FR)",
            "mainpicture": "imgf0001.png"
        },
        "EP05252678B1": {
            "patentid": "EP05252678B1",
            "path": "EP05252678NWB1",
            "title": "Method and apparatus for reducing rotor blade deflections, loads and/or peak rotational speed",
            "pubdate": "20141231",
            "inventor": "Moroz, Emilian Mieczyslaw/San Diego California 92127\u00a0(US), Pierce, Kirk Gee/Simpsonville South Carolina 29681\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP11007250B1": {
            "patentid": "EP11007250B1",
            "path": "EP11007250NWB1",
            "title": "Verfahren zur Herstellung eines Windenergieanlagenrotorblattbauteils mit einem vorgefertigten Hauptgurt",
            "pubdate": "20160511",
            "inventor": "Frankowski, Marco/18347 Ostseebad Wustrow\u00a0(DE), Austinat, Dirk/17126 Jarmen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11182200B1": {
            "patentid": "EP11182200B1",
            "path": "EP11182200NWB1",
            "title": "Method to rotate the rotor of a wind turbine and means to use in this method",
            "pubdate": "20170412",
            "inventor": "Falkenberg, Peter Loevenskjold/7400 Herning\u00a0(DK), Maj, Karl Aage/8450 Hammel\u00a0(DK), Poulsen, Henning/6900 Skjern\u00a0(DK), Stiesdal, Henrik/5000 Odense C\u00a0(DK), Nielsen, Jacob Blach/7442 Engesvang\u00a0(DK), Rasmussen, Brian/7323 Give\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12732958B1": {
            "patentid": "EP12732958B1",
            "path": "EP12732958NWB1",
            "title": "LIFTING TOOL FOR SERVICING OF WIND TURBINE GEARBOX COMPONENTS AND METHOD OF SERVICING USING SUCH A TOOL",
            "pubdate": "20151209",
            "inventor": "BENNETT, Mark/Beresford 6530\u00a0(AU), HEDGER, David/Koroit 3282\u00a0(AU)",
            "mainpicture": "imgf0001.png"
        },
        "EP11183462B1": {
            "patentid": "EP11183462B1",
            "path": "EP11183462NWB1",
            "title": "Wind turbine tower",
            "pubdate": "20150318",
            "inventor": "Laurberg, Hans/8000 \u00c5rhus C\u00a0(DK), Rasmussen, Anders Nygaard/2200 Kobenhavn\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP05758649B1": {
            "patentid": "EP05758649B1",
            "path": "EP05758649NWB1",
            "title": "WIND TURBINE BLADE",
            "pubdate": "20151111",
            "inventor": "GODSK, Kristian Balschmidt/2200 Copenhagen N.\u00a0(DK), NIELSEN, Thomas S. Bjertrup/8900 Randers\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12700685B1": {
            "patentid": "EP12700685B1",
            "path": "EP12700685NWB1",
            "title": "VORRICHTUNG UND VERFAHREN ZUM ERRICHTEN EINES TURMS EINER WINDENERGIEANLAGE",
            "pubdate": "20150422",
            "inventor": "VAN OHLEN, Hermann/26529 Upgant-Schott\u00a0(DE), H\u00d6LSCHER, Norbert/26607 Aurich\u00a0(DE), HONCZEK, Michael/26632 Ihlow\u00a0(DE), KAPITZA, Jan/26629 Grossefehn\u00a0(DE), BUCK, Ralf/26736 Krummh\u00f6rn\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12787006B1": {
            "patentid": "EP12787006B1",
            "path": "EP12787006NWB1",
            "title": "A WIND TURBINE BLADE",
            "pubdate": "20170104",
            "inventor": "SINGH, Ashish/Lucknow 226005\u00a0(IN)",
            "mainpicture": "imgf0001.png"
        },
        "EP12710497B1": {
            "patentid": "EP12710497B1",
            "path": "EP12710497NWB1",
            "title": "WINDKRAFTGETRIEBE",
            "pubdate": "20160824",
            "inventor": "ZF Friedrichshafen AG/88046 Friedrichshafen\u00a0(DE), Vestas Wind Systems A/S/8940 Randers SV\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP08001893B1": {
            "patentid": "EP08001893B1",
            "path": "EP08001893NWB1",
            "title": "Windpark umfassend Windenergieanlagen mit zueinander verschobenem Schwenkwinkel",
            "pubdate": "20150819",
            "inventor": "Letas, Heinz-Hermann, Dr./Gross Meinsdorf 23701 S\u00fcsel\u00a0(DE), Matzen, Bj\u00f6rn/24855 Bollingstedt\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10796151B1": {
            "patentid": "EP10796151B1",
            "path": "EP10796151NWB1",
            "title": "OSCILLATORY VORTICITY GENERATOR AND APPLICATIONS THEREOF",
            "pubdate": "20161102",
            "inventor": "SEIFERT, Avraham/69121 Tel-Aviv\u00a0(IL), STALNOV, Oksana/75357 Rishon-LeZion\u00a0(IL), FONO, Ilan/46424 Herzlia\u00a0(IL), DAYAN, Isaac/45324 Hod-HaSharon\u00a0(IL), TROSHIN, Victor/59416 Bat-Yam\u00a0(IL), AVNAIM, Maor Hai/76880 Doar-Na Emek Soreq\u00a0(IL), PALEI, Vitali/59503 Bat-Yam\u00a0(IL)",
            "mainpicture": "imgf0001.png"
        },
        "EP11729544B1": {
            "patentid": "EP11729544B1",
            "path": "EP11729544NWB1",
            "title": "Control of wind turbines in a wind park",
            "pubdate": "20150819",
            "inventor": "BOWYER, Robert/London SW6 6LE\u00a0(GB), SAREEN, Ashish/Sugar Land, Texas 77479\u00a0(US), BYREDDY, Chakradhar/Spring, Texas 77379\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP11718116B1": {
            "patentid": "EP11718116B1",
            "path": "EP11718116NWB1",
            "title": "ERFINDUNG BETREFFEND ROTORBL\u00c4TTER, INSBESONDERE F\u00dcR WINDKRAFTANLAGEN",
            "pubdate": "20161005",
            "inventor": "LAMBIE, Benjamin/63150 Heusenstamm\u00a0(DE), HUFNAGEL, Klaus/63457 Hanau\u00a0(DE)",
            "mainpicture": "imgb0001.png"
        },
        "EP11382091B1": {
            "patentid": "EP11382091B1",
            "path": "EP11382091NWB1",
            "title": "Wind turbine",
            "pubdate": "20161130",
            "inventor": "VALERO LAFUENTE, SEBASTIAN/08005, Barcelona\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP09772423B1": {
            "patentid": "EP09772423B1",
            "path": "EP09772423NWB1",
            "title": "A METHOD OF CONTROLLING A WIND POWER PLANT",
            "pubdate": "20160727",
            "inventor": "NAYEBI, Kouroush/DK-7340 Ikast\u00a0(DK), HERBSLEB, Eik/DK-8300 Odder\u00a0(DK)",
            "mainpicture": "imgb0001.png"
        },
        "EP09012075B1": {
            "patentid": "EP09012075B1",
            "path": "EP09012075NWB1",
            "title": "Windenergieanlagenpark, insbesondere Offshore-Windenergieanlagenpark",
            "pubdate": "20160127",
            "inventor": "Wiege, Dimitri/26123 Oldenburg\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11758107B1": {
            "patentid": "EP11758107B1",
            "path": "EP11758107NWB1",
            "title": "A wind turbine having a heat transfer system",
            "pubdate": "20151021",
            "inventor": "TIETZE, Poul T./DK-8220 Brabrand\u00a0(DK), NYVAD, Jesper/DK-8250 Eg\u00e5\u00a0(DK), NIELSEN, Jakob Hviid/DK-8830 Tjele\u00a0(DK), ANDERSEN, Jesper Lykkegaard/DK-8543 Hornslet\u00a0(DK), ROED, Carsten/DK-8850 Bjerringbro\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP08003243B1": {
            "patentid": "EP08003243B1",
            "path": "EP08003243NWB1",
            "title": "A wind turbine multi-panel blade",
            "pubdate": "20150624",
            "inventor": "Ricard Savio, Hely/31621 Sarriguren (Navarra)\u00a0(ES), Arocena De La Rua, Ion/31013 Pamplona\u00a0(ES), Sanz Pascual, Eneko/31013 Pamplona\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP12180429B1": {
            "patentid": "EP12180429B1",
            "path": "EP12180429NWB1",
            "title": "Wind turbine",
            "pubdate": "20151028",
            "inventor": "Munk-Hansen, Thorkil/7323 Give\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10189407B1": {
            "patentid": "EP10189407B1",
            "path": "EP10189407NWB1",
            "title": "Device for producing electric power",
            "pubdate": "20151125",
            "inventor": "Martinez Mardones, Jorge Alfonso/Santiago\u00a0(CL)",
            "mainpicture": "imgf0001.png"
        },
        "EP10161199B1": {
            "patentid": "EP10161199B1",
            "path": "EP10161199NWB1",
            "title": "Wind turbine blade with prefabricated leading edge segments",
            "pubdate": "20150610",
            "inventor": "Kyriakides, Steven Alan/Simpsonville, SC 29681\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP06021973B1": {
            "patentid": "EP06021973B1",
            "path": "EP06021973NWB1",
            "title": "Wind energy installation and method of controlling the output power from a wind energy installation",
            "pubdate": "20150812",
            "inventor": "Stiesdal, Henrik/5000 Odense C\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11799352B1": {
            "patentid": "EP11799352B1",
            "path": "EP11799352NWB1",
            "title": "A GEAR SYSTEM FOR A WIND TURBINE",
            "pubdate": "20160629",
            "inventor": "KORSGAARD NIELSEN, Thomas/DK-7100 Vejle\u00a0(DK), SCHJ\u00d8TT, Simon/6040 Egtved\u00a0(DK), DEMTR\u00d6DER, Jens/DK-8410 R\u00f8nde\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP07788560B1": {
            "patentid": "EP07788560B1",
            "path": "EP07788560NWB1",
            "title": "WIND GENERATOR BLADE WITH DIVERGENT TRAILING EDGE",
            "pubdate": "20151111",
            "inventor": "SLOT, Mark, Olaf, Att. Blanca Hernandez, Gamesa Innovation & Technology SL/48170 Zamudio (Bizkaia)\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP12004217B1": {
            "patentid": "EP12004217B1",
            "path": "EP12004217NWB1",
            "title": "Windenergieanlagenbauteil mit einer in ein Laminat eingebetteten elektrischen Leitung",
            "pubdate": "20151014",
            "inventor": "Rindt, Philipp/18057 Rostock\u00a0(DE), Austinat, Dirk/17126 Jarmen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11187863B1": {
            "patentid": "EP11187863B1",
            "path": "EP11187863NWB1",
            "title": "Manufacture of a root section",
            "pubdate": "20150729",
            "inventor": "Madsen, Kristian Lehmann/7000 Fredericia\u00a0(DK), Schibsbye, Karsten/7000 Fredericia\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10014171B1": {
            "patentid": "EP10014171B1",
            "path": "EP10014171NWB1",
            "title": "Verfahren zum Betrieb einer drehzahlgeregelten Windenergieanlage sowie eine solche Windenergieanlage",
            "pubdate": "20161221",
            "inventor": "Merkel, Maximilian/21149 Hamburg\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP05014283B1": {
            "patentid": "EP05014283B1",
            "path": "EP05014283NWB1",
            "title": "Storm control for horizontal axis wind turbine",
            "pubdate": "20150401",
            "inventor": "Yoshida, Shigeo/Shinjuku-ku, Tokyo 160-8316\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP09737370B1": {
            "patentid": "EP09737370B1",
            "path": "EP09737370NWB1",
            "title": "ANLAGE ZUR OBERFL\u00c4CHENBEHANDLUNG VON GEGENST\u00c4NDEN",
            "pubdate": "20150304",
            "inventor": "HEIM, J\u00fcrgen/D-72406 Bisingen\u00a0(DE), RIEMRICH, Eckard/D-72108 Rottenburg\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP06254932B1": {
            "patentid": "EP06254932B1",
            "path": "EP06254932NWB1",
            "title": "System and method for driving a monopile for supporting an offshore wind turbine",
            "pubdate": "20150506",
            "inventor": "Kothnur, Vasanth Srinivasa/Clifton Park New York 12065\u00a0(US), Anderson, David Deloyd/Glenville New York 12302\u00a0(US), Zheng, Danian/Clifton Park New York 10265\u00a0(US), Ali, Mohamed Ahmed/Clifton Park New York 12065\u00a0(US), Leland, Kenneth Bradley/Greer South Carolina 29650\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP08007142B1": {
            "patentid": "EP08007142B1",
            "path": "EP08007142NWB1",
            "title": "Generator and wind turbine",
            "pubdate": "20151202",
            "inventor": "Stiesdal, Henrik/5000 Odense C\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12718587B1": {
            "patentid": "EP12718587B1",
            "path": "EP12718587NWB1",
            "title": "A VARIABLE WIND TURBINE HAVING A POWER DISSIPATING UNIT",
            "pubdate": " A METHOD OF OPERATING A POWER DISSIPATING UNIT IN A WIND TURBINE",
            "inventor": "20150826",
            "mainpicture": "GUPTA, Amit Kumar/650386 Singapore\u00a0(SG), ANDERSEN, Gert Karmisholt/DK-8732 Hovedg\u00e5rd\u00a0(DK), FONN, Swee Yee/Singapore 050535\u00a0(SG), LI, Bing/Singapore 600179\u00a0(SG)",
            "null": [
                "imgb0001.png"
            ]
        },
        "EP03748102B1": {
            "patentid": "EP03748102B1",
            "path": "EP03748102NWB1",
            "title": "METHOD OF ERECTING A PLURALITY OF TOWERS FOR A WIND ENERGY TURBINE AND PLURALITY OF TOWERS FOR A WIND ENERGY TURBINE",
            "pubdate": "20170111",
            "inventor": "SEIDEL, Marc/49090 Osnabr\u00fcck\u00a0(DE), VON MUTIUS, Martin/24358 Ascheffel\u00a0(DE), UPHUES, Ulrich/30459 Hannover\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP03027544B1": {
            "patentid": "EP03027544B1",
            "path": "EP03027544NWB1",
            "title": "Verfahren zur Montage eines zweireihigen Kegelrollenlagers mit geteilten Lagerringen in einer Windkraftanlage",
            "pubdate": "20150729",
            "inventor": "Herbst, Hubert/97503 G\u00e4dheim\u00a0(DE), Brandenstein, Manfred/97776 Eussenheim\u00a0(DE), Olschewski, Armin/97422 Schweinfurt\u00a0(DE), Neder, G\u00fcnter/97422 Schweinfurt\u00a0(DE), G\u00f6bel, Werner/97490 Poppenhausen\u00a0(DE), Gessendorfer, Matthias/97509 Unterspiesheim\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP04737297B1": {
            "patentid": "EP04737297B1",
            "path": "EP04737297NWB1",
            "title": "WARTUNGSPLATTFORM",
            "pubdate": "20170705",
            "inventor": "LEMBURG, Christian/52074 AACHEN\u00a0(DE), LEMBURG, Johannes/27568 BREMERHAVEN\u00a0(DE), SCH\u00c4FER, Thomas/52457 ALDENHOVEN\u00a0(DE), WEBER, Carsten/52066 AACHEN\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10150625B1": {
            "patentid": "EP10150625B1",
            "path": "EP10150625NWB1",
            "title": "Motorbelastungsreduktion bei einer Windenergieanlage",
            "pubdate": "20150318",
            "inventor": "Altemark, Jens/24768 Rendsburg\u00a0(DE), Letas, Heinz-Hermann/23701 S\u00fcsel / Gro\u00df Meinsdorf\u00a0(DE), Hopp, Eckart/24790 Sch\u00fclldorf\u00a0(DE), Kr\u00fcger, Thomas/24784 Westerr\u00f6nfeld\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP09749312B1": {
            "patentid": "EP09749312B1",
            "path": "EP09749312NWB1",
            "title": "LOAD MEASURING DEVICE, METHOD AND PROGRAM",
            "pubdate": "20160525",
            "inventor": "Mitsubishi Heavy Industries, Ltd./Tokyo 108-8215\u00a0(JP), MHI Vestas Offshore Wind A/S/8200 Aarhus N\u00a0(DK)",
            "mainpicture": "imgb0001.png"
        },
        "EP12382055B1": {
            "patentid": "EP12382055B1",
            "path": "EP12382055NWB1",
            "title": "Aerodynamic blade and method of controlling the lift of such a blade",
            "pubdate": "20170927",
            "inventor": "Betran Palomas, Jaume/08172 Sant Cugat del Vall\u00e8s\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP03008295B1": {
            "patentid": "EP03008295B1",
            "path": "EP03008295NWB1",
            "title": "Wind farm and method for operating same",
            "pubdate": "20161221",
            "inventor": "L\u00fctze, Hans Henning/28455 Bad Bentheim\u00a0(DE), Rieken, Stefan/49762 Fresenburg\u00a0(DE), Meyer, Dietmar/28213 Bremen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12707943B1": {
            "patentid": "EP12707943B1",
            "path": "EP12707943NWB1",
            "title": "WIND TURBINE WITH TWO ROTORS",
            "pubdate": "20170531",
            "inventor": "DORELEIJERS, Thomas, Hubertus, Maria/NL-2931 AH Krimpen a/d Lek\u00a0(NL)",
            "mainpicture": "imgf0001.png"
        },
        "EP11779335B1": {
            "patentid": "EP11779335B1",
            "path": "EP11779335NWB1",
            "title": "SYSTEM AND METHOD FOR IDENTIFYING THE LIKELIHOOD OF A TOWER STRIKE WHERE A ROTOR BLADE STRIKES THE TOWER OF A WIND TURBINE",
            "pubdate": "20150715",
            "inventor": "OLESEN, Ib Svend/DK-8930 Randers\u00a0(DK), GLAVIND, Lars/DK-8900 Randers C\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP09737113B1": {
            "patentid": "EP09737113B1",
            "path": "EP09737113NWB1",
            "title": "AN INSERT AND METHOD FOR FORMING AN END CONNECTION IN A UNI-AXIAL COMPOSITE MATERIAL",
            "pubdate": "20170719",
            "inventor": "HAYDEN, Paul, Trevor/Isle of Wight PO31 7SF\u00a0(GB), BROOME, Peter, Anthony/Isle of Wight PO31 7DQ\u00a0(GB), WHILEY, David, Anthony/Shrewsbury SY5 8DSZ\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP10000849B1": {
            "patentid": "EP10000849B1",
            "path": "EP10000849NWB1",
            "title": "Verfahren zum Betrieb eines Windparks",
            "pubdate": "20150401",
            "inventor": "Jurkat, Mark/22844 Norderstedt\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12460011B1": {
            "patentid": "EP12460011B1",
            "path": "EP12460011NWB1",
            "title": "Photovoltaic wing",
            "pubdate": "20160427",
            "inventor": "Wojtasik, Lech/64-930 Dolaszewo\u00a0(PL)",
            "mainpicture": "imgf0001.png"
        },
        "EP13153693B1": {
            "patentid": "EP13153693B1",
            "path": "EP13153693NWB1",
            "title": "Wind turbine generator and operation method for the same",
            "pubdate": "20170621",
            "inventor": "Koyanagi, Takuya/Tokyo, 108-8215\u00a0(JP)",
            "mainpicture": "imgb0001.png"
        },
        "EP11382237B1": {
            "patentid": "EP11382237B1",
            "path": "EP11382237NWB1",
            "title": "Wind turbine rotor",
            "pubdate": "20160330",
            "inventor": "Pasquet, Pierre/08005 BARCELONA\u00a0(ES), Canedo Pardo, Santiago/08037 BARCELONA\u00a0(ES), Cavall\u00e9, Marc/08006 BARCELONA\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP10162687B1": {
            "patentid": "EP10162687B1",
            "path": "EP10162687NWB1",
            "title": "Wind turbine",
            "pubdate": "20160817",
            "inventor": "Stiesdal, Henrik/5000, Odense C\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12002718B1": {
            "patentid": "EP12002718B1",
            "path": "EP12002718NWB1",
            "title": "Turm f\u00fcr eine Windenergieanlage sowie Verfahren zur Errichtung eines solchen",
            "pubdate": "20160413",
            "inventor": "H\u00e4nler, Michael/18236 Kr\u00f6pelin\u00a0(DE), Borowski, Steffen/17438 Wolgast\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10710606B1": {
            "patentid": "EP10710606B1",
            "path": "EP10710606NWB1",
            "title": "A HINGE APPARATUS FOR CONNECTING FIRST AND SECOND WIND TURBINE BLADE COMPONENTS COMPRISING A ROTARY ACTUATOR",
            "pubdate": "20160706",
            "inventor": "WESTERGAARD, Carsten, Hein/Houston TX 77010\u00a0(US), HANCOCK, Mark/Hampshire SO15 5HN\u00a0(GB), NARASIMALU, Srikanth/535206 Singapore\u00a0(SG)",
            "mainpicture": "imgf0001.png"
        },
        "EP09732944B1": {
            "patentid": "EP09732944B1",
            "path": "EP09732944NWB1",
            "title": "BLADE FOR A WATER TURBINE",
            "pubdate": "20151014",
            "inventor": "KEIR, John/Singapore 099253\u00a0(SG), SRIGRAROM, Sutthiphong/Singapore 599490\u00a0(SG)",
            "mainpicture": "imgf0001.png"
        },
        "EP10250890B1": {
            "patentid": "EP10250890B1",
            "path": "EP10250890NWB1",
            "title": "Wind power generator having variable windmill wings",
            "pubdate": "20160309",
            "inventor": "Lee, In-nam/Namyangju-Si, Gyeonggi-do 472-908\u00a0(KR)",
            "mainpicture": "imgf0001.png"
        },
        "EP09157835B1": {
            "patentid": "EP09157835B1",
            "path": "EP09157835NWB1",
            "title": "Thermoelectric energy storage system having two thermal baths and method for storing thermoelectric energy",
            "pubdate": "20150603",
            "inventor": "Hemrle, Jaroslav/CH-5405, Baden-D\u00e4ttwil\u00a0(CH), Kaufmann, Lilian/CH-8902, Urdorf\u00a0(CH), Mercangoez, Mehmet/CH-5405, Baden-D\u00e4ttwil\u00a0(CH)",
            "mainpicture": "imgb0001.png"
        },
        "EP08012154B1": {
            "patentid": "EP08012154B1",
            "path": "EP08012154NWB1",
            "title": "Wind turbine blade with cambering flaps",
            "pubdate": "20160224",
            "inventor": "Rebsdorf, Anders/8600 Silkeborg\u00a0(DK), Friedrich, Michael/8600 Silkeborg\u00a0(DK), Meldgaard, Christian/8600 Silkeborg\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11808204B1": {
            "patentid": "EP11808204B1",
            "path": "EP11808204NWB1",
            "title": "WINDENERGIEANLAGE",
            "pubdate": "20160420",
            "inventor": "RITSCHEL, Uwe/18230 Zweedorf\u00a0(DE), GUTZMER, Robert/18059 Rostock\u00a0(DE), HARTMANN, Ulrich/14197 Berlin\u00a0(DE), J\u00d6CKEL, Andreas/90408 N\u00fcrnberg\u00a0(DE), ELENDER, Gunther/94081 F\u00fcrstenzell\u00a0(DE), M\u00d6HLE, Axel/12163 Berlin\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP02018223B1": {
            "patentid": "EP02018223B1",
            "path": "EP02018223NWB1",
            "title": "Windkraftanlage",
            "pubdate": "20170329",
            "inventor": "Weitkamp, Roland/49191 Belm\u00a0(DE)",
            "mainpicture": "imgb0001.png"
        },
        "EP10189248B1": {
            "patentid": "EP10189248B1",
            "path": "EP10189248NWB1",
            "title": "Method for operating a wind turbine with reduced blade fouling",
            "pubdate": "20160810",
            "inventor": "Haans, Wouter/2593, HL Den Haag\u00a0(NL), Nies, Jacob Johannes/8042 HA, Zwolle\u00a0(NL)",
            "mainpicture": "imgf0001.png"
        },
        "EP07808608B1": {
            "patentid": "EP07808608B1",
            "path": "EP07808608NWB1",
            "title": "METHOD FOR THE DAMPING OF TOWER OSCILLATIONS IN WIND POWER INSTALLATIONS",
            "pubdate": "20150624",
            "inventor": "SKAARE, Bj\u00f8rn/7619 Skogn\u00a0(NO)",
            "mainpicture": "imgb0001.png"
        },
        "EP12184018B1": {
            "patentid": "EP12184018B1",
            "path": "EP12184018NWB1",
            "title": "Method and arrangement to monitor a bearing of a wind turbine",
            "pubdate": "20150415",
            "inventor": "Nieuwenhuizen, John/8700 Horsens\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11701790B1": {
            "patentid": "EP11701790B1",
            "path": "EP11701790NWB1",
            "title": "WINDENERGIEANLAGE MIT BLATTHEIZUNGSVORRICHTUNG",
            "pubdate": "20150318",
            "inventor": "PETERS, Matthias/25704 Elpersb\u00fcttel\u00a0(DE), VON MUTIUS, Martin/24358 Ascheffel\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12854543B1": {
            "patentid": "EP12854543B1",
            "path": "EP12854543NWB1",
            "title": "WIND POWER GENERATION SYSTEM WITH TURBINE TURBOFAN",
            "pubdate": "20171220",
            "inventor": "ZHOU, Dengrong/Sanhe Hebei 065201\u00a0(CN), ZHOU, Jian/Sanhe Hebei 065201\u00a0(CN)",
            "mainpicture": "imgf0001.png"
        },
        "EP13382165B1": {
            "patentid": "EP13382165B1",
            "path": "EP13382165NWB1",
            "title": "Method of operating a wind turbine",
            "pubdate": "20170712",
            "inventor": "Guadayol Roig, Marc/08225 Terrassa\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP13002992B1": {
            "patentid": "EP13002992B1",
            "path": "EP13002992NWB1",
            "title": "Fastening system for wind turbines and corresponding installation methods",
            "pubdate": "20170104",
            "inventor": "Artal Lorente, Daniel/31621 Sarriguren\u00a0(ES), De Las Cuevas Jimenez, Fernando/31621 Sarriguren\u00a0(ES), Lazcoz Santesteban, Fermin/31621 Sarriguren\u00a0(ES), Munarriz Andres, Pedro/31621 Sarriguren\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP09778455B1": {
            "patentid": "EP09778455B1",
            "path": "EP09778455NWB1",
            "title": "PROFIL EINES ROTORSBLATTS UND ROTORBLATT EINER WINDENERGIEANLAGE",
            "pubdate": "20150513",
            "inventor": "PETSCHE, Marc/24809 N\u00fcbbel\u00a0(DE), KORJAHN, Matthias/24358 Bistensee\u00a0(DE), GOLLNICK, Bert/15517 F\u00fcrstenwalde\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12812276B1": {
            "patentid": "EP12812276B1",
            "path": "EP12812276NWB1",
            "title": "STR\u00d6MUNGSMASCHINE",
            "pubdate": "20150408",
            "inventor": "SCHWAIGER, Meinhard/A-4040 Linz\u00a0(AT)",
            "mainpicture": "imgf0001.png"
        },
        "EP11826143B1": {
            "patentid": "EP11826143B1",
            "path": "EP11826143NWB1",
            "title": "METHOD AND APPARATUS FOR MOUNTING A WIND POWER PLANT IN A HIGH BASE STRUCTURE",
            "pubdate": "20150128",
            "inventor": "LUHTALA, Pekka/FI-66300 Jurva\u00a0(FI), SIPOLA, Marko/FI-02170 Espoo\u00a0(FI)",
            "mainpicture": "imgf0001.png"
        },
        "EP06722631B1": {
            "patentid": "EP06722631B1",
            "path": "EP06722631NWB1",
            "title": "VERFAHREN UND VORRICHTUNG ZUR NUTZUNG DER WINDENERGIE",
            "pubdate": "20160928",
            "inventor": "Kelaiditis, Konstantin/66386 St. Ingbert\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11712497B1": {
            "patentid": "EP11712497B1",
            "path": "EP11712497NWB1",
            "title": "DOWNWIND TURBINE WITH FREE YAW SYSTEM",
            "pubdate": "20150114",
            "inventor": "DE BROE, Alex/B-1730 Asse\u00a0(BE), DUFFEY, Thomas/B-1000 Bruxelles\u00a0(BE), PICOT, Natalie/B-9000 Gent\u00a0(BE)",
            "mainpicture": "imgf0001.png"
        },
        "EP08161867B1": {
            "patentid": "EP08161867B1",
            "path": "EP08161867NWB1",
            "title": "System and method for loads reduction in a horizontal-axis wind turbine using upwind information",
            "pubdate": "20160323",
            "inventor": "Barbu, Corneliu/CA 92653\u00a0(US), Vyas, Parag/80797 Munich\u00a0(DE)",
            "mainpicture": "imgb0001.png"
        },
        "EP07014634B1": {
            "patentid": "EP07014634B1",
            "path": "EP07014634NWB1",
            "title": "Verfahren zum Betrieb einer Windenergieanlage mit einem Synchrongenerator und einem \u00dcberlagerungsgetriebe",
            "pubdate": "20160713",
            "inventor": "Nitzpon, Joachim/20255 Hamburg\u00a0(DE), Woldmann, Thomas-Paul/21129 Hamburg\u00a0(DE)",
            "mainpicture": "imgb0001.png"
        },
        "EP09759685B1": {
            "patentid": "EP09759685B1",
            "path": "EP09759685NWB1",
            "title": "STR\u00d6MUNGSKRAFTANLAGE",
            "pubdate": "20160914",
            "inventor": "TENBERGE, Heinz-Josef/58452 Witten\u00a0(DE), VATH, Andreas/63849 Leidersbach\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12003740B1": {
            "patentid": "EP12003740B1",
            "path": "EP12003740NWB1",
            "title": "Wind turbine control methods and systems for cold climate and low altitude conditions",
            "pubdate": "20150909",
            "inventor": "Romero Sanz, Ignacio/28043 Madrid\u00a0(ES), Lopez Rubio, Jose Maria/28043 Madrid\u00a0(ES), Guerrero Carrion, Jesus Javier/28043 Madrid\u00a0(ES), Molera Llorente, Borja/28043 Madrid\u00a0(ES), Palou Larranaga, Felipe/31621 Sarriguren\u00a0(ES), Nova Ramos, Jose Raul/28043 Madrid\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP08753768B1": {
            "patentid": "EP08753768B1",
            "path": "EP08753768NWB1",
            "title": "WIND TURBINE PARK",
            "pubdate": "20160316",
            "inventor": "JAKOBSSON, Johan Mikael/Grands Pass Oregon 95275\u00a0(US), PEELS, Huibertus Cornelis/NL-7631 HS Ootmarsum\u00a0(NL)",
            "mainpicture": "imgf0001.png"
        },
        "EP09175685B1": {
            "patentid": "EP09175685B1",
            "path": "EP09175685NWB1",
            "title": "Braking system for wind turbine",
            "pubdate": "20160608",
            "inventor": "Menke, Detlef/49504, Lotte\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10154384B1": {
            "patentid": "EP10154384B1",
            "path": "EP10154384NWB1",
            "title": "Handhabungsvorrichtung f\u00fcr Rotorblattlager",
            "pubdate": "20150805",
            "inventor": "Kaufmann, Sven/06268 Obhausen\u00a0(DE), Fuglsang-Petersen, Jochen/24613 Aukrug\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12797789B1": {
            "patentid": "EP12797789B1",
            "path": "EP12797789NWB1",
            "title": "VORRICHTUNG UND VERFAHREN ZUM VERANKERN EINER WINDENERGIEANLAGE",
            "pubdate": "20161026",
            "inventor": "SCHACKNIES, Meik/21698 Harsefeld\u00a0(DE), GORALSKI, Claus/82031 Geiselgasteig\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11728210B1": {
            "patentid": "EP11728210B1",
            "path": "EP11728210NWB1",
            "title": "TURM EINER WINDENERGIEANLAGE SOWIE VERFAHREN ZUR HERSTELLUNG EINES TURMS EINER WINDENERGIEANLAGE",
            "pubdate": "20161123",
            "inventor": "B\u00d6GL, Stefan/92369 Sengenthal\u00a0(DE), HIERL, Martin/92318 Neumarkt\u00a0(DE), KNITL, Josef/92342 Freystadt\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP09175923B1": {
            "patentid": "EP09175923B1",
            "path": "EP09175923NWB1",
            "title": "A tower of a wind turbine and a method for arranging a platform inside a tower",
            "pubdate": "20170614",
            "inventor": "Kristensen, Jonas/6900, Skjern\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP09001016B1": {
            "patentid": "EP09001016B1",
            "path": "EP09001016NWB1",
            "title": "Vorrichtung zur \u00dcberwachung der Drehzahl bei einer Windenergieanlage",
            "pubdate": "20150603",
            "inventor": "Kabatzke, Wolfgang/21502 Geesthacht\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12761726B1": {
            "patentid": "EP12761726B1",
            "path": "EP12761726NWB1",
            "title": "MOBILER DREHANTRIEB F\u00dcR EINEN ROTOR EINER WINDENERGIEANLAGE",
            "pubdate": "20160106",
            "inventor": "G\u00d6TTSCHE, Christian/24802 Gross Vollstedt\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP08152267B1": {
            "patentid": "EP08152267B1",
            "path": "EP08152267NWB1",
            "title": "Self aligning bearing for wind turbine rotor",
            "pubdate": "20170524",
            "inventor": "DIMASCIO, Paul Stephen/Greer, SC 29650\u00a0(US), MOORE, Bradley Graham/Greenville, SC 29605\u00a0(US), KOLAR, Roman/Hendersonville, NC 28792\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP08734394B1": {
            "patentid": "EP08734394B1",
            "path": "EP08734394NWB1",
            "title": "VERFAHREN ZUM AUSTAUSCH EINER GONDEL INKL. ROTOR EINER OFFSHORE-WINDENERGIEANLAGE UND WASSERFAHRZEUG ZUR DURCHF\u00dcHRUNG DES VERFAHRENS",
            "pubdate": "20160413",
            "inventor": "SIEGFRIEDSEN, S\u00f6nke/25878 Drage\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP13155196B1": {
            "patentid": "EP13155196B1",
            "path": "EP13155196NWB1",
            "title": "Wind turbine control method and system",
            "pubdate": "20170426",
            "inventor": "Esbensen, Thomas/7400 Herning\u00a0(DK), Hoegh, Gustav/7400 Herning\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12165757B1": {
            "patentid": "EP12165757B1",
            "path": "EP12165757NWB1",
            "title": "Cooling and supporting a stator segment of an electro-mechanical machine, especially for wind turbine application",
            "pubdate": "20160330",
            "inventor": "Lemma, Edom/7330 Brande\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12004850B1": {
            "patentid": "EP12004850B1",
            "path": "EP12004850NWB1",
            "title": "WINDENERGIEANLAGENROTORBLATT MIT EINER DICKEN PROFILHINTERKANTE",
            "pubdate": "20170201",
            "inventor": "Doosttalab, Mehdi/22850 Norderstedt\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12155169B1": {
            "patentid": "EP12155169B1",
            "path": "EP12155169NWB1",
            "title": "Wind turbine power generating facilities",
            "pubdate": "20150923",
            "inventor": "Hayashi, Noriyuki/Tokyo, 100-8220\u00a0(JP), Matsuo, Takahide/Tokyo, 100-8220\u00a0(JP), Shirahata,Toshiki/Niigata, 959-2608\u00a0(JP), Ono, Junji/Niigata, 959-2608\u00a0(JP), Ohama, Hideharu/Tokyo 100-8220\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP13382022B1": {
            "patentid": "EP13382022B1",
            "path": "EP13382022NWB1",
            "title": "Wind turbine blade",
            "pubdate": "20160601",
            "inventor": "Betran, Jaume/08172 SANT CUGAT DEL VALL\u00c8S\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP08708743B1": {
            "patentid": "EP08708743B1",
            "path": "EP08708743NWB1",
            "title": "ANTRIEBSEINRICHTUNG ZUM ANTREIBEN VON MEHREREN ACHSEN",
            "pubdate": "20160713",
            "inventor": "LENGL, Karl/97816 Lohr\u00a0(DE), SPATZ, Bernd/63857 Waldaschaff\u00a0(DE), BECKER, Stephan/63762 Grossostheim\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10703608B1": {
            "patentid": "EP10703608B1",
            "path": "EP10703608NWB1",
            "title": "WIND-POWERED ELECTRICITY GENERATOR AND METHOD FOR CONTROLLING WIND-POWERED ELECTRICITY GENERATOR",
            "pubdate": "20160706",
            "inventor": "MINAMI, Tohru/Tokyo 108-8215\u00a0(JP), TAKEBE, Tetsuo/Nagasaki-shi Nagasaki 850-0853\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP10824387B1": {
            "patentid": "EP10824387B1",
            "path": "EP10824387NWB1",
            "title": "WIND GENERATOR WITH WATER FLOAT SAIL",
            "pubdate": "20150708",
            "inventor": "Chen, Hong/Shenzhen, Guangdong 518172\u00a0(CN), Li, Maohua/Nanyuan, Fengtai District Beijing 100076\u00a0(CN)",
            "mainpicture": "imgf0001.png"
        },
        "EP11716807B1": {
            "patentid": "EP11716807B1",
            "path": "EP11716807NWB1",
            "title": "A WIND TURBINE",
            "pubdate": "20160518",
            "inventor": "SPRUCE, Chris/Leatherhead Surrey KT23 4PD\u00a0(GB)",
            "mainpicture": "imgb0001.png"
        },
        "EP11187573B1": {
            "patentid": "EP11187573B1",
            "path": "EP11187573NWB1",
            "title": "Method and system for controlling wind farm when wind speed varies abruptly.",
            "pubdate": "20150722",
            "inventor": "Kang, Yong Cheol/Jeonbuk\u00a0(KR), Kim, Yeon Hee/Jeonbuk\u00a0(KR), Zheng, Tai Ying/Jeonbuk\u00a0(KR)",
            "mainpicture": "imgb0001.png"
        },
        "EP12860671B1": {
            "patentid": "EP12860671B1",
            "path": "EP12860671NWB1",
            "title": "WIND TURBINE GENERATOR SYSTEM AND LIGHTNING PROTECTION DEVICE THEREOF",
            "pubdate": "20170621",
            "inventor": "Xinjiang Goldwind Science & Technology Co. Ltd./Xinjiang 830026\u00a0(CN), VENSYS Energy AG/66539 Neunkirchen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP09735712B1": {
            "patentid": "EP09735712B1",
            "path": "EP09735712NWB1",
            "title": "FRAME STRUCTURE FOR SUPPORTING A WIND POWER PLANT",
            "pubdate": "20170705",
            "inventor": "MORITZ, Bertil/S-723 48 V\u00e4ster\u00e5s\u00a0(SE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11822882B1": {
            "patentid": "EP11822882B1",
            "path": "EP11822882NWB1",
            "title": "WINDKRAFT-ROTOR UND VERFAHREN ZUR ENERGIEERZEUGUNG DAMIT",
            "pubdate": "20150603",
            "inventor": "SEIFERT, Jost/85077 Manching\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12199248B1": {
            "patentid": "EP12199248B1",
            "path": "EP12199248NWB1",
            "title": "Rotor-sector based control of wind turbines",
            "pubdate": "20160427",
            "inventor": "Kristoffersen, Jacob Krogh/8260 Viby J\u00a0(DK)",
            "mainpicture": "imgb0001.png"
        },
        "EP11169632B1": {
            "patentid": "EP11169632B1",
            "path": "EP11169632NWB1",
            "title": "Vortex Generator Assembly For Use With A Wind Turbine Rotor Blade",
            "pubdate": "20150225",
            "inventor": "Anjuri, EswaraRao VSJ/531001 Andhra Pradesh\u00a0(IN), Nanukuttan, Biju/560066 Bangalore, Karnataka\u00a0(IN), Loganathan, Jaikumar/560066 Bangalore, Karnataka\u00a0(IN), Herr, Stefan/Greenville, SC South Carolina 29615\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP10159129B1": {
            "patentid": "EP10159129B1",
            "path": "EP10159129NWB1",
            "title": "Canopy for a wind turbine nacelle",
            "pubdate": "20160601",
            "inventor": "Wohlleb, Matthias/52064 Aachen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP09160250B1": {
            "patentid": "EP09160250B1",
            "path": "EP09160250NWB1",
            "title": "Method and system for predicting the occurrence of a wind gust at a wind turbine",
            "pubdate": "20161207",
            "inventor": "Garate \u00c1lvaro, Jos\u00e9 Miguel/08012, Barcelona\u00a0(ES), Landaluze Moraza, Joseba/20500 Arrasate-Mondragon (Gipuzkoa)\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP12180236B1": {
            "patentid": "EP12180236B1",
            "path": "EP12180236NWB1",
            "title": "Method to approach a wind turbine by helicopter",
            "pubdate": "20151014",
            "inventor": "Lind, Soeren Oemann/4700 N\u00e6stved\u00a0(DK), Libergren, Peter/8464 Galten\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11153696B1": {
            "patentid": "EP11153696B1",
            "path": "EP11153696NWB1",
            "title": "Method for lubricating at least one blade pitch bearing of a wind turbine",
            "pubdate": "20170329",
            "inventor": "Esbensen, Thomas/7400, Herning\u00a0(DK), Bauer, Oto/7330, Brande\u00a0(DK)",
            "mainpicture": "imgb0001.png"
        },
        "EP13182724B1": {
            "patentid": "EP13182724B1",
            "path": "EP13182724NWB1",
            "title": "Turbine and control system of the over-power of said turbine",
            "pubdate": "20151028",
            "inventor": "Cattano, Aldo/37030 Badia Calavena (VR)\u00a0(IT)",
            "mainpicture": "imgf0001.png"
        },
        "EP12812108B1": {
            "patentid": "EP12812108B1",
            "path": "EP12812108NWB1",
            "title": "OFFSHORE WIND POWER GENERATOR, AND METHOD AND SYSTEM FOR INSTALLING THE OFFSHORE WIND POWER GENERATOR",
            "pubdate": "20170405",
            "inventor": "LEE, Byung Kyu/Geoje-si Gyeongsangnam-do 656-779\u00a0(KR), CHO, Dong Ho/Daejeon 305-701\u00a0(KR)",
            "mainpicture": "imgf0001.png"
        },
        "EP11702787B1": {
            "patentid": "EP11702787B1",
            "path": "EP11702787NWB1",
            "title": "VERFAHREN ZUM BETRIEB EINER WINDENERGIEANLAGE",
            "pubdate": "20160330",
            "inventor": "VON MUTIUS, Martin/24358 Ascheffel\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11700442B1": {
            "patentid": "EP11700442B1",
            "path": "EP11700442NWB1",
            "title": "POWER OSCILLATION DAMPING BY A CONVERTER-BASED POWER GENERATION DEVICE",
            "pubdate": "20150304",
            "inventor": "ANDRESEN, Bj\u00f6rn/DK-8752 Ostbirk\u00a0(DK), FRYDENSBJERG, Michael Noertoft/DK-7323 Give\u00a0(DK), KN\u00dcPPEL, Thyge/DK-2200 Copenhagen N\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP14167925B1": {
            "patentid": "EP14167925B1",
            "path": "EP14167925NWB1",
            "title": "Wind turbine blade having a tensile-only stiffener for passive control of flap movement",
            "pubdate": "20161130",
            "inventor": "Mailly, Luis A./Lafayette, 80026\u00a0(US)",
            "mainpicture": "imgb0001.png"
        },
        "EP11719655B1": {
            "patentid": "EP11719655B1",
            "path": "EP11719655NWB1",
            "title": "ACTUATING SYSTEM FOR CONTROLLING THE FLIGHT OF A POWER WING PROFILE FOR CONVERSION OF WIND ENERGY INTO ELECTRICAL OR MECHANICAL ENERGY",
            "pubdate": "20150114",
            "inventor": "MILANESE, Mario/I-10144 Torino\u00a0(IT), FAGIANO, Lorenzo/I-10144 Torino\u00a0(IT), GERLERO, Ilario/I-10144 Torino\u00a0(IT)",
            "mainpicture": "imgf0001.png"
        },
        "EP11008966B1": {
            "patentid": "EP11008966B1",
            "path": "EP11008966NWB1",
            "title": "Blattanschluss f\u00fcr ein Rotorblatt einer Windenergieanlage",
            "pubdate": "20141231",
            "inventor": "G\u00fcnther, Christian/22307 Hamburg\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12184764B1": {
            "patentid": "EP12184764B1",
            "path": "EP12184764NWB1",
            "title": "Lifter and method for handling a rotor blade and system comprising a lifter and a rotor blade",
            "pubdate": "20160120",
            "inventor": "Monux Belloso, Oscar/28205 Bremen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10702407B1": {
            "patentid": "EP10702407B1",
            "path": "EP10702407NWB1",
            "title": "WIND TURBINE NACELLE WITH COOLER TOP",
            "pubdate": "20171025",
            "inventor": "SIVALINGAM, Krishnamoorthi/Singapore 681687\u00a0(SG), BAHUGUNI, Anand/680792 Singapore\u00a0(SG), KANDASAMY, Ravi/Singapore 730679\u00a0(SG), NARASIMALU, Srikanth/Singapore 535206\u00a0(SG), GREVSEN, John, K./DK-8260 Viby J\u00a0(DK), NYVAD, Jesper/DK-8250 Eg\u00e5\u00a0(DK), TIETZE, Paul, T./DK-8220 Brabrand\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12754705B1": {
            "patentid": "EP12754705B1",
            "path": "EP12754705NWB1",
            "title": "SPAR TYPE FLOATING STRUCTURE",
            "pubdate": "20171004",
            "inventor": "Japan Marine United Corporation/Minato-ku Tokyo 108-0014\u00a0(JP), The University of Tokyo/Bunkyo-ku, Tokyo 113-8654\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP12158855B1": {
            "patentid": "EP12158855B1",
            "path": "EP12158855NWB1",
            "title": "Rotor blade pitching arrangement",
            "pubdate": "20160817",
            "inventor": "Stege, Jason/7330 Brande\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11170494B1": {
            "patentid": "EP11170494B1",
            "path": "EP11170494NWB1",
            "title": "Verfahren zur Steuerung einer Windenergieanlage",
            "pubdate": "20170802",
            "inventor": "Wobben, Aloys/26607 Aurich\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP07123024B1": {
            "patentid": "EP07123024B1",
            "path": "EP07123024NWB1",
            "title": "Wind turbine and method of detecting asymmetric icing on a wind turbine",
            "pubdate": "20150805",
            "inventor": "Sundermann, Bastian/14195, Berlin\u00a0(DE), Siuts, Christian/10245, Berlin\u00a0(DE), Oing, Hubert/14169, Berlin\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP08706936B1": {
            "patentid": "EP08706936B1",
            "path": "EP08706936NWB1",
            "title": "WIND TURBINE ROTOR BLADE AND METHOD OF MANUFACTURING SUCH ROTOR BLADE",
            "pubdate": "20170628",
            "inventor": "BERTELSEN, Kim/DK-6990 Ulfborg\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10155598B1": {
            "patentid": "EP10155598B1",
            "path": "EP10155598NWB1",
            "title": "Verfahren und Anordnung zum Transportieren von Komponenten einer Windenergieanlage sowie Montage-Plattform",
            "pubdate": "20150513",
            "inventor": "G\u00fcsloff-Below, Rainer/23568, L\u00fcbeck\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP09170407B1": {
            "patentid": "EP09170407B1",
            "path": "EP09170407NWB1",
            "title": "System and method for estimating wind condition for wind turbines",
            "pubdate": "20141231",
            "inventor": "Chen, Weiguo/201203, Shanghai\u00a0(CN), Xia, Jiyang/201203, Shanghai\u00a0(CN), Zhao, Lei/201203, Shanghai\u00a0(CN)",
            "mainpicture": "imgb0001.png"
        },
        "EP09708252B1": {
            "patentid": "EP09708252B1",
            "path": "EP09708252NWB1",
            "title": "FLUID ROTOR",
            "pubdate": "20170531",
            "inventor": "JOUTSINIEMI, Risto/44500 Viitasaari\u00a0(FI)",
            "mainpicture": "imgf0001.png"
        },
        "EP11807716B1": {
            "patentid": "EP11807716B1",
            "path": "EP11807716NWB1",
            "title": "\u00c9OLIENNE EN OFFSHORE FLOTTANT COMPORTANT UN SYST\u00c8ME DE STABILISATION ACTIF EN INCLINAISON DE LA NACELLE",
            "pubdate": "20160406",
            "inventor": "WITTRISH, Christian/F-92500 Rueil Malmaison\u00a0(FR), LONGUEMARE, Pascal/F-78100 Saint Germain En Laye\u00a0(FR)",
            "mainpicture": "imgf0001.png"
        },
        "EP08012253B1": {
            "patentid": "EP08012253B1",
            "path": "EP08012253NWB1",
            "title": "Wind turbine",
            "pubdate": "20160106",
            "inventor": "Stiesdal, Henrik/5000 Odense C\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10165225B1": {
            "patentid": "EP10165225B1",
            "path": "EP10165225NWB1",
            "title": "Floating offshore wind turbine",
            "pubdate": "20170823",
            "inventor": "Yoshida, Shigeo/Tokyo 160-8316\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP11007613B1": {
            "patentid": "EP11007613B1",
            "path": "EP11007613NWB1",
            "title": "Windenergieanlagenrotorblatt mit einer dicken Profilhinterkante",
            "pubdate": "20160504",
            "inventor": "Fischer, Gunter Reinald/22081 Hamburg\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12159727B1": {
            "patentid": "EP12159727B1",
            "path": "EP12159727NWB1",
            "title": "Method and arrangement for operating a wind turbine taking into account power losses",
            "pubdate": "20170308",
            "inventor": "Esbensen, Thomas/7400 Herning\u00a0(DK), Laurberg, Hans/8000 \u00c5rhus C\u00a0(DK), Andersen, Claus/7400 Herning\u00a0(DK), Hoegh, Gustav/7400 Herning\u00a0(DK)",
            "mainpicture": "imgb0001.png"
        },
        "EP13159226B1": {
            "patentid": "EP13159226B1",
            "path": "EP13159226NWB1",
            "title": "Arrangement to measure the deflection of a blade of a wind turbine",
            "pubdate": "20151014",
            "inventor": "Egedal, Per/7400 Herning\u00a0(DK), Staerdahl, Jesper Winther/7451 Sunds\u00a0(DK), Ziroff, Andreas/80469 M\u00fcnchen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10842366B1": {
            "patentid": "EP10842366B1",
            "path": "EP10842366NWB1",
            "title": "VERTICAL AXIS VARIABLE GEOMETRY WIND ENERGY COLLECTION SYSTEM",
            "pubdate": "20151230",
            "inventor": "Aaron, Michael/Clarksville, Tennessee 37040\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP09015206B1": {
            "patentid": "EP09015206B1",
            "path": "EP09015206NWB1",
            "title": "Wind turbine hub transportation device",
            "pubdate": "20160504",
            "inventor": "Poulsen, Henning/6900 Skjem\u00a0(DK), Westergaard, Jan, Emil/7330 Brande\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12154930B1": {
            "patentid": "EP12154930B1",
            "path": "EP12154930NWB1",
            "title": "Improved noise reduction control for wind turbines",
            "pubdate": "20160427",
            "inventor": "Nielsen, Kaj Skov/Issaquah WA, 98027\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP12748062B1": {
            "patentid": "EP12748062B1",
            "path": "EP12748062NWB1",
            "title": "LIGHTNING CURRENT TRANSFER SYSTEM FOR A WIND TURBINE GENERATOR",
            "pubdate": "20170208",
            "inventor": "Mitsubishi Heavy Industries, Ltd./Tokyo 108-8215\u00a0(JP), Global Lightning Protection Services A/S/Herning 7400\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10156701B1": {
            "patentid": "EP10156701B1",
            "path": "EP10156701NWB1",
            "title": "Voltage control method and system for a power generation plant and wind farm",
            "pubdate": "20170419",
            "inventor": "Alonso Sadaba, Oscar/31621, Sarriguren (Navarra)\u00a0(ES), Arlaban Gabeiras, Teresa/31621, Sarriguren (Navarra)\u00a0(ES), Egana Santamarina, Igor/31621, Sarriguren (Navarra)\u00a0(ES), Royo Garcia, Ricardo/31621, Sarriguren (Navarra)\u00a0(ES), Garcia Sayes, Jose Miguel/31621, Sarriguren (Navarra)\u00a0(ES), Nunez Polo, Miguel/31621, Sarriguren (Navarra)\u00a0(ES)",
            "mainpicture": "imgb0001.png"
        },
        "EP12192854B1": {
            "patentid": "EP12192854B1",
            "path": "EP12192854NWB1",
            "title": "Energiespeicherung am Meeresboden",
            "pubdate": "20170201",
            "inventor": "Zheng, Qinhua, Dr./80331 M\u00fcnchen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10741899B1": {
            "patentid": "EP10741899B1",
            "path": "EP10741899NWB1",
            "title": "VERFAHREN UND VORRICHTUNG ZUM TRANSPORT UND ZUR MONTAGE VON WINDKRAFTANLAGEN",
            "pubdate": "20171122",
            "inventor": "BEHR, Peter/22339 Hamburg\u00a0(DE), WADER, Jochen/42477 Radevormwald\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10773597B1": {
            "patentid": "EP10773597B1",
            "path": "EP10773597NWB1",
            "title": "Schaltschrank f\u00fcr eine Windkraftanlage",
            "pubdate": "20150506",
            "inventor": "BERTOLOTTI, Fabio/48455 Bad Bentheim\u00a0(DE), KESTERMANN, Hermann/48432 Rheine\u00a0(DE), THIER, Marc-Andre/59387 Ascheberg\u00a0(DE), BUELTEL, Tobias/48431 Rheine\u00a0(DE), UPSING, Josef/48432 Rheine\u00a0(DE), DAEMBERG, Tobias/49932 Thuine\u00a0(DE), WIBBEN, Norbert/48499 Salzbergen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP09007483B1": {
            "patentid": "EP09007483B1",
            "path": "EP09007483NWB1",
            "title": "Service lift in wind turbines",
            "pubdate": "20160323",
            "inventor": "Haenisch, Ringo/7330 Brande\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11853529B1": {
            "patentid": "EP11853529B1",
            "path": "EP11853529NWB1",
            "title": "CONTROL DEVICE FOR WIND POWER GENERATION DEVICE, WIND POWER GENERATION SYSTEM, AND CONTROL METHOD FOR WIND POWER GENERATION DEVICE",
            "pubdate": "20170726",
            "inventor": "WAKASA, Tsuyoshi/Tokyo 108-8215\u00a0(JP), SHINODA, Hisanobu/Tokyo 108-8215\u00a0(JP), HASHIMOTO, Masayuki/Tokyo 108-8215\u00a0(JP), YAMASHITA, Yukio/Tokyo 108-8215\u00a0(JP), NAKA, Takehiro/Tokyo 108-8215\u00a0(JP), YASUGI, Akira/Tokyo 108-8215\u00a0(JP), NAKASHIMA, Takumi/Tokyo 108-8215\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP12734002B1": {
            "patentid": "EP12734002B1",
            "path": "EP12734002NWB1",
            "title": "DYNAMIC TURBINE SYSTEM",
            "pubdate": "20171011",
            "inventor": "EHRNBERG, Daniel/SE-31196 Heberg\u00a0(SE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10168529B1": {
            "patentid": "EP10168529B1",
            "path": "EP10168529NWB1",
            "title": "Wind turbine blade with variable trailing edge",
            "pubdate": "20161130",
            "inventor": "B\u00e6k, Peter/6000 Kolding\u00a0(DK), Grabau, Peter/6000 Kolding\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11001661B1": {
            "patentid": "EP11001661B1",
            "path": "EP11001661NWB1",
            "title": "Pitch drive system and method for controlling a pitch of a rotor blade of a wind energy plant",
            "pubdate": "20151014",
            "inventor": "Areva Wind GmbH/27572 Bremerhaven\u00a0(DE), Moog Unna GmbH/59423 Unna\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12738021B1": {
            "patentid": "EP12738021B1",
            "path": "EP12738021NWB1",
            "title": "REMOTE SENSING SYSTEM FOR WIND TURBINES",
            "pubdate": "20161207",
            "inventor": "ZAIB, Ali/DK-9000 Aalborg\u00a0(DK), BOWYER, Robert/London SW6 6LE\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP11176778B1": {
            "patentid": "EP11176778B1",
            "path": "EP11176778NWB1",
            "title": "Method and apparatus for controlling wind turbine electric power generation",
            "pubdate": "20160629",
            "inventor": "Teichmann, Ralph/Schenectady, NY New York 12345\u00a0(US), O'Brien, Kathleen Ann/Niskayuna, NY New York 12309\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP10165958B1": {
            "patentid": "EP10165958B1",
            "path": "EP10165958NWB1",
            "title": "Drivetrain system for a wind turbine generator",
            "pubdate": "20160831",
            "inventor": "Patel, Priyangu C./Simpsonville, SC 29681\u00a0(US), Hidding, Edwin/46414, Rhede\u00a0(DE), Barnes, Gary R./Delanson, NY 12053\u00a0(US), Jansen, Patrick Lee/Scotia, NY 12302\u00a0(US), Minadeo, Adam Daniel/Greenville, SC 29609\u00a0(US), Johnson, Stephen B./Greenville, SC 29605\u00a0(US), Madge, James H./Simpsonville, SC 29681\u00a0(US), Wilson, Blake Weldon/Scotia, NY 12302\u00a0(US), Buskirk, Eric Steven/Guilderland, NY 12084\u00a0(US), Lokhandwalla, Murtuza/Clifton Park, NY 12065\u00a0(US), Nies, Jacob Johannes/8042 HA, Zwolle\u00a0(NL)",
            "mainpicture": "imgf0001.png"
        },
        "EP13002614B1": {
            "patentid": "EP13002614B1",
            "path": "EP13002614NWB1",
            "title": "A support structure for a wind turbine",
            "pubdate": "20150722",
            "inventor": "Mart\u00ednez de Casta\u00f1eda, Francisco Javier/28220 Majadahonda (Madrid)\u00a0(ES), Cidoncha Escobar, Manuel/28033 Madrid (Madrid)\u00a0(ES), Lancha Fernandez, Juan Carlos/45200 Illescas (Toledo)\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP08012892B1": {
            "patentid": "EP08012892B1",
            "path": "EP08012892NWB1",
            "title": "Verfahren zur Ermittlung einer Regelungsreserve sowie Windpark",
            "pubdate": "20160504",
            "inventor": "Jurkat, Mark/22844 Norderstedt\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10836288B1": {
            "patentid": "EP10836288B1",
            "path": "EP10836288NWB1",
            "title": "FLOATING ENERGY PRODUCING PLANT",
            "pubdate": "20150729",
            "inventor": "TUNBJER, Anders/S-742 43 \u00d6regrund\u00a0(SE), SUNDQUIST, Percy/S-742 43 \u00d6regrund\u00a0(SE), LANDVIK, Dag/S-742 43 \u00d6regrund\u00a0(SE)",
            "mainpicture": "imgf0001.png"
        },
        "EP13382110B1": {
            "patentid": "EP13382110B1",
            "path": "EP13382110NWB1",
            "title": "Pitch drive with a lateral lubricating plate",
            "pubdate": "20161005",
            "inventor": "Pasquet, Pierre/08328 ALELLA\u00a0(ES), Checa Caballero, Javier/08030 Barcelona\u00a0(ES), Garcia I Erill, Daniel/08025 BARCELONA\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP11800730B1": {
            "patentid": "EP11800730B1",
            "path": "EP11800730NWB1",
            "title": "WINDMILL PITCH CONTROL DEVICE",
            "pubdate": "20170614",
            "inventor": "HIBINO,Toshiharu/Fuwa-gun Gifu 503-2121\u00a0(JP), KODAMA,Haruo/Fuwa-gun Gifu 503-2121\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP07010506B1": {
            "patentid": "EP07010506B1",
            "path": "EP07010506NWB1",
            "title": "Actuation system for a wind turbine blade flap",
            "pubdate": "20161116",
            "inventor": "Stiesdal, Henrik/5000 Odense C\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP06253948B1": {
            "patentid": "EP06253948B1",
            "path": "EP06253948NWB1",
            "title": "System and method for control of a wind turbine based on measured wind speed upstream",
            "pubdate": "20150624",
            "inventor": "Avagliano, Aaron John/Houston, Texas, 77007\u00a0(US), Barbu, Corneliu/Guilderland, New York 12084\u00a0(US), Lyons, James Patrick Francis/Niskayuna, New York 12309\u00a0(US), Suryanarayanan, Shashikanth/Powai, Mumbai 400076\u00a0(IN)",
            "mainpicture": "imgf0001.png"
        },
        "EP12810053B1": {
            "patentid": "EP12810053B1",
            "path": "EP12810053NWB1",
            "title": "DE-ICING OF A WIND TURBINE BLADE",
            "pubdate": "20160309",
            "inventor": "WONG, Voon Hon/Singapore 248358\u00a0(SG), BAHUGUNI, Anand/600224, Singapore\u00a0(SG), KANDASAMY, Ravi/Singapore 730679\u00a0(SG)",
            "mainpicture": "imgf0001.png"
        },
        "EP06757858B1": {
            "patentid": "EP06757858B1",
            "path": "EP06757858NWB1",
            "title": "FLOATING WIND TURBINE INSTALLATION",
            "pubdate": "20151230",
            "inventor": "SVEEN, Dagfinn/0587 Oslo\u00a0(NO), NIELSEN, Finn, Gunnar/5152 B\u00f8nes\u00a0(NO), HANSON, Tor, David/5115 Ulset\u00a0(NO)",
            "mainpicture": "imgb0001.png"
        },
        "EP12700786B1": {
            "patentid": "EP12700786B1",
            "path": "EP12700786NWB1",
            "title": "TURM EINER WINDENERGIEANLAGE MIT STROMLEITMITTELN",
            "pubdate": "20160622",
            "inventor": "SCHUBERT, Matthias/24768 Rendsburg\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12704665B1": {
            "patentid": "EP12704665B1",
            "path": "EP12704665NWB1",
            "title": "A WIND TURBINE ARRANGEMENT WITH A MAIN WIND TURBINE AND AT LEAST ONE SECONDARY WIND TURBINE",
            "pubdate": "20150729",
            "inventor": "ROSENVARD, Paw/DK-8883 Gjern\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12186134B1": {
            "patentid": "EP12186134B1",
            "path": "EP12186134NWB1",
            "title": "Wind turbine installation method and wind turbine assembly suitable for use in said method",
            "pubdate": "20150729",
            "inventor": "van der Kooi, Reinder/2681 RL Monster\u00a0(NL)",
            "mainpicture": "imgf0001.png"
        },
        "EP13002474B1": {
            "patentid": "EP13002474B1",
            "path": "EP13002474NWB1",
            "title": "Wind energy converter using kites",
            "pubdate": "20150520",
            "inventor": "Ippolito, Massimo/I-14020 Berzano di San Pietro (AT)\u00a0(IT), Taddei, Franco/I-23896 Sirtori (LC)\u00a0(IT)",
            "mainpicture": "imgb0001.png"
        },
        "EP14165674B1": {
            "patentid": "EP14165674B1",
            "path": "EP14165674NWB1",
            "title": "Assembly method of wind power generation system",
            "pubdate": "20160316",
            "inventor": "Yu, Juhyun/Tokyo, 100-8280\u00a0(JP), Saeki, Mitsuru/Tokyo, 100-8280\u00a0(JP), Sano, Takahiko/Tokyo, 100-8280\u00a0(JP), Tanaka, Kouhei/Tokyo, 100-8280\u00a0(JP), Inamura, Shingo/Tokyo, 100-8280\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP12743240B1": {
            "patentid": "EP12743240B1",
            "path": "EP12743240NWB1",
            "title": "POWER GENERATING APPARATUS AND A METHOD OF OPERATING A PUMP/MOTOR OF A POWER GENERATING APPARATUS",
            "pubdate": "20160824",
            "inventor": "LAVENDER, Jack/Midlothian, Lothian, EH209TB\u00a0(GB), DUMNOV, Daniil/Midlothian, Lothian, EH209TB\u00a0(GB), STEIN, Uwe/Midlothian, Lothian, EH209TB\u00a0(GB), MACPHERSON, Jill/Midlothian, Lothian, EH209TB\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP10160820B1": {
            "patentid": "EP10160820B1",
            "path": "EP10160820NWB1",
            "title": "Method for enhancement of a wind plant layout with multiple wind turbines",
            "pubdate": "20170215",
            "inventor": "Gundling, Chris Henry/Greenville, SC 29615\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP09712140B1": {
            "patentid": "EP09712140B1",
            "path": "EP09712140NWB1",
            "title": "WINDKRAFTANLAGE MIT UMRICHTERREGELUNG",
            "pubdate": "20170830",
            "inventor": "FORTMANN, Jens/13156 Berlin\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10187414B1": {
            "patentid": "EP10187414B1",
            "path": "EP10187414NWB1",
            "title": "Method for manufacturing a wind turbine rotor blade",
            "pubdate": "20170426",
            "inventor": "Schibsbye, Karsten/7000 Fredericia\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10843392B1": {
            "patentid": "EP10843392B1",
            "path": "EP10843392NWB1",
            "title": "ROTORCRAFT POWER-GENERATION, CONTROL APPARATUS AND METHOD",
            "pubdate": "20160824",
            "inventor": "Calverley, Grant/Friday Harbor, WA 98250\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP12715906B1": {
            "patentid": "EP12715906B1",
            "path": "EP12715906NWB1",
            "title": "WIND TURBINE BLADE WITH ELONGATED FASTENING MEMBERS IN THE ROOT REGION THEREOF",
            "pubdate": "20150819",
            "inventor": "DAHL, Martin/24939 Flensburg\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12810060B1": {
            "patentid": "EP12810060B1",
            "path": "EP12810060NWB1",
            "title": "WIND TURBINE GENERATOR WITH ADAPTIVE LOCKED SPEED OPERATION",
            "pubdate": "20161116",
            "inventor": "DEMTR\u00d6DER, Jens/DK-8410 R\u00f8nde\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11727748B1": {
            "patentid": "EP11727748B1",
            "path": "EP11727748NWB1",
            "title": "ESTIMATION OF WIND CONDITIONS AT A WIND TURBINE",
            "pubdate": "20150114",
            "inventor": "EVANS, Martin/London SW12 8HD\u00a0(GB)",
            "mainpicture": "imgb0001.png"
        },
        "EP12804330B1": {
            "patentid": "EP12804330B1",
            "path": "EP12804330NWB1",
            "title": "HYDRAULIC TURBINE CONTROL DEVICE",
            "pubdate": "20170823",
            "inventor": "RUIS GOMIS, Vicente/E-03170 Rojales (Alicante)\u00a0(ES), ORTS PAREDES, Joaquin/E-03390 Benejuzar (Alicante)\u00a0(ES), LLEDO LARA, Jaime/E-08030 Barcelona\u00a0(ES), ORTS PAREDES, Jose Carlos/E-03179 Formentera del Seguro (Alicante)\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP09006118B1": {
            "patentid": "EP09006118B1",
            "path": "EP09006118NWB1",
            "title": "Turm f\u00fcr eine Windenergieanlage mit Flanschst\u00fcck zur Verbindung von Segmenten",
            "pubdate": "20170315",
            "inventor": "Meesenburg, Uwe/25840 Friedrichstadt\u00a0(DE), Sch\u00fcttendiebel, Ralf/49074 Osnabr\u00fcck\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10810526B1": {
            "patentid": "EP10810526B1",
            "path": "EP10810526NWB1",
            "title": "METHOD AND APPARATUS FOR PERMANENT MAGNET ATTACHMENT IN AN ELECTROMECHANICAL MACHINE",
            "pubdate": "20171011",
            "inventor": "PIERCEY, Mark, S./Southborough MA 01772\u00a0(US), MONGEAU, Peter, P./Westborough MA 01581\u00a0(US), LYNCH, Jonathan, A./St. Johnsbury VT 05819\u00a0(US), KOHLER, Thomas, D./Westport NY 12993\u00a0(US), SMITH, Paul, A./Montpelier VT 05602\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP14152768B1": {
            "patentid": "EP14152768B1",
            "path": "EP14152768NWB1",
            "title": "Column-stabilized offshore platform with water-entrapment plates and asymmetric mooring system for support of offshore wind turbines",
            "pubdate": "20170719",
            "inventor": "Roddier, Dominique/Berkeley, CA California 94708\u00a0(US), Cermelli, Christian/Berkeley, CA California 94708\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP12778448B1": {
            "patentid": "EP12778448B1",
            "path": "EP12778448NWB1",
            "title": "METHOD OF MANUFACTURING A WIND TURBINE BLADE AND A WIND TURBINE BLADE",
            "pubdate": "20170802",
            "inventor": "Mitsubishi Heavy Industries, Ltd./Tokyo 108-8215\u00a0(JP), Euros Entwicklungsgesellschaft f\u00fcr  Windkraftanlagen mbH/13088 Berlin\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP09719643B1": {
            "patentid": "EP09719643B1",
            "path": "EP09719643NWB1",
            "title": "VORRICHTUNG ZUR VERSTELLUNG DES ANSTELLWINKELS EINES ROTORBLATTES EINER WINDENERGIEANLAGE",
            "pubdate": "20160309",
            "inventor": "MASCIONI, Andreas/66346 P\u00fcttlingen\u00a0(DE), RINCK, J\u00fcrgen/66399 Mandelbachtal\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10845338B1": {
            "patentid": "EP10845338B1",
            "path": "EP10845338NWB1",
            "title": "DEVICE OF A POWER PLANT",
            "pubdate": "20160323",
            "inventor": "Hassavari, Nader/7004 Trondheim\u00a0(NO)",
            "mainpicture": "imgf0001.png"
        },
        "EP11181469B1": {
            "patentid": "EP11181469B1",
            "path": "EP11181469NWB1",
            "title": "System and Method for Controlling Wind Turbine Blades",
            "pubdate": "20160629",
            "inventor": "Loganathan, Jaikumar/Niskayuna, NY 12309\u00a0(US), Dey, Subhrajit/Niskayuna, NY 12309\u00a0(US), Koegler, Klaus Ulrich/Niskayuna, NY 12309\u00a0(US), Santhanakrishnan, Manisekaran/602001 Tiruvallur\u00a0(IN)",
            "mainpicture": "imgb0001.png"
        },
        "EP09177815B1": {
            "patentid": "EP09177815B1",
            "path": "EP09177815NWB1",
            "title": "A modular rotor blade and a method for assembling a modular rotor blade",
            "pubdate": "20160713",
            "inventor": "Stam, Ronny/7621 TR, Borne\u00a0(NL), Starke, Andreas/48429, Rheine\u00a0(DE), Veldkamp, Bart/7521 AD, Enschede\u00a0(NL), Meyer, Jendrik/49080, Osnabr\u00fcck\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP08014998B1": {
            "patentid": "EP08014998B1",
            "path": "EP08014998NWB1",
            "title": "Flange mounting for holding a tower section",
            "pubdate": "20151202",
            "inventor": "Knudsen, Henrik/8600 Silkeborg\u00a0(DK), Madsen, Jonas/6731 Tj\u00e6reborg\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11181208B1": {
            "patentid": "EP11181208B1",
            "path": "EP11181208NWB1",
            "title": "Horizontal axis wind turbine",
            "pubdate": "20150708",
            "inventor": "Tobinaga, Ikuo/Tokyo, 160-8316\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP11728018B1": {
            "patentid": "EP11728018B1",
            "path": "EP11728018NWB1",
            "title": "MASCHINENHAUSVERKLEIDUNG F\u00dcR GONDEL EINER WINDTURBINE",
            "pubdate": "20171011",
            "inventor": "THIEL, Enrico/18057 Rostock\u00a0(DE), KLOOK, Thorsten/18055 Rostock\u00a0(DE), HEUER, Stefan/18055 Rostock\u00a0(DE), ANAND, Deepak/12047 Berlin\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP08700128B1": {
            "patentid": "EP08700128B1",
            "path": "EP08700128NWB1",
            "title": "WIND TURBINE BLADE WITH LIFT-REGULATING MEANS IN FORM OF SLOTS OR HOLES",
            "pubdate": "20160323",
            "inventor": "BOVE, Stefano/DK-6640 Lunderskov\u00a0(DK), GRABAU, Peter/DK-6000 Kolding\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12743067B1": {
            "patentid": "EP12743067B1",
            "path": "EP12743067NWB1",
            "title": "VERFAHREN ZUM HERSTELLEN EINES ROTORBLATTS F\u00dcR EINE WINDENERGIEANLAGE",
            "pubdate": "20170628",
            "inventor": "RICHERS, Tilman/60314 Frankfurt am Main\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12005483B1": {
            "patentid": "EP12005483B1",
            "path": "EP12005483NWB1",
            "title": "Windenergieanlage",
            "pubdate": "20150128",
            "inventor": "Altemark, Jens/24768 Rendsburg\u00a0(DE), Bolln, S\u00f6nke/25746 Heide\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10163334B1": {
            "patentid": "EP10163334B1",
            "path": "EP10163334NWB1",
            "title": "Method for assembling jointed wind turbine blade",
            "pubdate": "20160420",
            "inventor": "Baehmann, Peggy Lynn/Glenville, NY 12302\u00a0(US), Miebach, Thomas/Ballston Spa, NY 12020\u00a0(US), Telfeyan, Eric/Guilderland, NY 12084\u00a0(US), Lin, Wendy Wen-Ling/Niskayuna, NY 12309\u00a0(US), Yerramalli, Chandra Sekher/Niskayuna, NY 12309\u00a0(US), Quek, Shu Ching/Clifton Park, NY 12065\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP12789099B1": {
            "patentid": "EP12789099B1",
            "path": "EP12789099NWB1",
            "title": "FLYING ELECTRIC GENERATORS WITH CLEAN AIR ROTORS",
            "pubdate": "20160706",
            "inventor": "WEDDENDORF, Bruce/Huntsville, Alabama 35803\u00a0(US), AUSTIN, Colin/Huntsville, Alabama 35801\u00a0(US), MERCIER, Greg/Madison, Alabama 35758\u00a0(US), AUSTIN, Robert/Huntsville, Alabama 36802\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP12714690B1": {
            "patentid": "EP12714690B1",
            "path": "EP12714690NWB1",
            "title": "BEARING ARRANGEMENT FOR A WIND TURBINE",
            "pubdate": "20151209",
            "inventor": "NIEUWENHUIZEN, John/DK-8700 Horsens\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11710761B1": {
            "patentid": "EP11710761B1",
            "path": "EP11710761NWB1",
            "title": "NOTBETRIEBSF\u00c4HIGE PITCHANTRIEBSVORRICHTUNG F\u00dcR EINE WIND- ODER WASSERKRAFTANLAGE",
            "pubdate": "20170510",
            "inventor": "THEOPOLD, Tobias/44263 Dortmund\u00a0(DE), KAUKE, Lars/58730 Fr\u00f6ndenberg\u00a0(DE)",
            "mainpicture": "imgb0001.png"
        },
        "EP11177566B1": {
            "patentid": "EP11177566B1",
            "path": "EP11177566NWB1",
            "title": "Windturbine",
            "pubdate": "20170125",
            "inventor": "Scheid, Ralf/90513 Zirndorf\u00a0(DE), Helm, Thomas/90768 F\u00fcrth\u00a0(DE), Leisch, Norbert/90562 Kalchreuth\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP09156245B1": {
            "patentid": "EP09156245B1",
            "path": "EP09156245NWB1",
            "title": "System and method for reducing rotor loads in a wind turbine upon detection of blade-pitch failure and loss of counter-torque",
            "pubdate": "20160601",
            "inventor": "Kammer, Leonardo Cesar/Niskayuna, NY 12309\u00a0(US), Braicks, Axel/48431 Rheine\u00a0(DE), Oing, Hubert/14169 Berlin\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP08007726B1": {
            "patentid": "EP08007726B1",
            "path": "EP08007726NWB1",
            "title": "Crack detection system",
            "pubdate": "20151118",
            "inventor": "Burchardt, Claus/9260 Gistrup\u00a0(DK), Grove-Nielsen, Erik/Vile 7870 Roslev\u00a0(DK), Kristensen, Jens J\u00f8rgen \u00d8stergaard/9240 Nibe\u00a0(DK), Stiesdal, Henrik/5000 Odense C\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP09251327B1": {
            "patentid": "EP09251327B1",
            "path": "EP09251327NWB1",
            "title": "Wind turbine with deployable air deflectors",
            "pubdate": "20170712",
            "inventor": "Baker, Jonathon P./West Conshohocken, PA 19428\u00a0(US), Jackson, Kevin Lee/West Conshohocken, PA 19428\u00a0(US), Mayda, Edward A./West Conshohocken, PA 19428\u00a0(US), Van Dam, Cornelis P./West Conshohocken, PA 19428\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP14159567B1": {
            "patentid": "EP14159567B1",
            "path": "EP14159567NWB1",
            "title": "Fan shroud and motor assembly comprised thereof",
            "pubdate": "20151104",
            "inventor": "Stehulak, Gregory Michael/Fort Wayne, IN Indiana 46815\u00a0(US), Fried, Joshua Zachary/West Lafayette, IN Indiana 47906\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP13169451B1": {
            "patentid": "EP13169451B1",
            "path": "EP13169451NWB1",
            "title": "De-humidifying system",
            "pubdate": "20171101",
            "inventor": "Soerensen, Carsten Moeller/7260 Sdr. Omme\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11742548B1": {
            "patentid": "EP11742548B1",
            "path": "EP11742548NWB1",
            "title": "LIFTING DEVICE FOR HOISTING COMPONENTS INCLUDED IN WIND TURBINES AND SIMILAR STRUCTURES",
            "pubdate": "20161019",
            "inventor": "VON AHN, Patrik/894 31 Sj\u00e4levad\u00a0(SE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12163861B1": {
            "patentid": "EP12163861B1",
            "path": "EP12163861NWB1",
            "title": "Offshore- Windenergiesystem",
            "pubdate": "20170607",
            "inventor": "Esken, Matthias/21220 Seevetal\u00a0(DE), Koch, Dr. Friedrich/47623 Kevelaer\u00a0(DE), Froitzheim, Herbert/41539 Dormagen\u00a0(DE), Schl\u00fcter, Thorsten/20251 Hamburg\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12157148B1": {
            "patentid": "EP12157148B1",
            "path": "EP12157148NWB1",
            "title": "Roller bearing, cage segment, spacer, and main-shaft support structure for wind-driven generator",
            "pubdate": "20150408",
            "inventor": "Omoto, Tatsuya/Kuwana-shi, Mie 511-0811\u00a0(JP), Hioki, Shoichi/Kuwana-shi, Mie 511-0811\u00a0(JP), Sasabe, Mitsuo/Kuwana-shi, Mie 511-0811\u00a0(JP), Nakamizo, Eiichi/Kuwana-shi, Mie 511-0811\u00a0(JP), Sakaguchi, Tomoya/Kuwana-shi, Mie 511-0811\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP12704663B1": {
            "patentid": "EP12704663B1",
            "path": "EP12704663NWB1",
            "title": "A WIND TURBINE FAULT DETECTION CIRCUIT AND METHOD",
            "pubdate": "20170621",
            "inventor": "LUO, Xue Wen/Singapore 610330\u00a0(SG), TUMABCAO, Michael Casem/Sg 730364\u00a0(SG), PARKHOU, Masoud/DK-8450 Hammel\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11823695B1": {
            "patentid": "EP11823695B1",
            "path": "EP11823695NWB1",
            "title": "STEEL PIPE COLUMN STRUCTURE AND METHOD FOR PRODUCING SAME",
            "pubdate": "20170906",
            "inventor": "MURAKAMI, Takuya/Tokyo 100-0011\u00a0(JP), KATO, Masashi/Tokyo 100-0011\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP12722067B1": {
            "patentid": "EP12722067B1",
            "path": "EP12722067NWB1",
            "title": "A WIND TURBINE OPTICAL WIND SENSOR",
            "pubdate": "20151028",
            "inventor": "OLESEN, Ib Svend/DK-8930 Randers\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP06254481B1": {
            "patentid": "EP06254481B1",
            "path": "EP06254481NWB1",
            "title": "Method and apparatus for condition-based monitoring of wind turbine components",
            "pubdate": "20170726",
            "inventor": "Lemieux, David L./Boulder, MT 59632\u00a0(US), Moroz, Emil M./San Diego, CA 92127\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP11160969B1": {
            "patentid": "EP11160969B1",
            "path": "EP11160969NWB1",
            "title": "Method of optimising a wind park construction",
            "pubdate": "20150617",
            "inventor": "Nielsen, Soeren E./8660 Skanderborg\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11702133B1": {
            "patentid": "EP11702133B1",
            "path": "EP11702133NWB1",
            "title": "SEGMENTED ROTOR BLADE EXTENSION PORTION",
            "pubdate": "20170628",
            "inventor": "HANCOCK, Mark/Southampton Hampshire SO15 5HN\u00a0(GB), BECH, Anton/DK-6950 Ringk\u00f8bing\u00a0(DK), VRONSKY, Tomas/Woolston Hampshire SO19 9FR\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP12822966B1": {
            "patentid": "EP12822966B1",
            "path": "EP12822966NWB1",
            "title": "TELESKOPIERBARES ROTORBLATT UND TELESKOPIERBARER TURM SOWIE, WINDENERGIEANLAGE UND WINDENERGIEANLAGENPARK",
            "pubdate": "20160316",
            "inventor": "Rohden, Rolf/26607 Aurich\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10721349B1": {
            "patentid": "EP10721349B1",
            "path": "EP10721349NWB1",
            "title": "A WIND TURBINE HAVING A CONTROL METHOD AND CONTROLLER FOR PERFORMING PREDICTIVE CONTROL OF A WIND TURBINE GENERATOR",
            "pubdate": "20161207",
            "inventor": "SPRUCE, Christopher/DK-8940 Randers\u00a0(DK), BOWYER, Robert/DK-8940 Randers\u00a0(DK), CREABY, Justin/DK-8940 Randers\u00a0(DK)",
            "mainpicture": "imgb0001.png"
        },
        "EP09744398B1": {
            "patentid": "EP09744398B1",
            "path": "EP09744398NWB1",
            "title": "VORRICHTUNG ZUR REGELUNG EINER DOPPELT GESPEISTEN ASYNCHRONMASCHINE",
            "pubdate": "20150805",
            "inventor": "ENGELHARDT, Stephan/47665 Sonsbeck\u00a0(DE), KRETSCHMANN, Joerg/47906 Kempen\u00a0(DE)",
            "mainpicture": "imgb0001.png"
        },
        "EP13701924B1": {
            "patentid": "EP13701924B1",
            "path": "EP13701924NWB1",
            "title": "TRANSMISSION",
            "pubdate": "20161019",
            "inventor": "VAN NEERBOS, Bart Richard/NL-1231 LJ Loosdrecht\u00a0(NL)",
            "mainpicture": "imgf0001.png"
        },
        "EP12183965B1": {
            "patentid": "EP12183965B1",
            "path": "EP12183965NWB1",
            "title": "Windmill and hub sealing apparatus thereof",
            "pubdate": "20170301",
            "inventor": "Lin, Jung-Kuei/300 Hsinchu City\u00a0(TW), Chang, Yun-Yuan/104 Taipei City\u00a0(TW)",
            "mainpicture": "imgf0001.png"
        },
        "EP09735221B1": {
            "patentid": "EP09735221B1",
            "path": "EP09735221NWB1",
            "title": "A WIND TURBINE BLADE",
            "pubdate": "20160127",
            "inventor": "HAYDEN, Paul, Trevor/Isle of Wight PO31 7SF\u00a0(GB), BROOME, Peter, Anthony/Isle of Wight PO31 7DQ\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP14150300B1": {
            "patentid": "EP14150300B1",
            "path": "EP14150300NWB1",
            "title": "Method for optimizing the operation of a wind turbine",
            "pubdate": "20170614",
            "inventor": "Gopalan, Simi/560066 Bangalore\u00a0(IN), Singh, Anoop/560066 Bangalore\u00a0(IN)",
            "mainpicture": "imgb0001.png"
        },
        "EP12810051B1": {
            "patentid": "EP12810051B1",
            "path": "EP12810051NWB1",
            "title": "A WIND TURBINE BLADE",
            "pubdate": "20161214",
            "inventor": "LAURITSEN, Steen M./DK-8250 Eg\u00e5\u00a0(DK), ROMBLAD, Jonas/DK-8240 Risskov\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12712572B1": {
            "patentid": "EP12712572B1",
            "path": "EP12712572NWB1",
            "title": "Molding apparatus for making a wind turbine blade and method of making same",
            "pubdate": "20151209",
            "inventor": "RAJASINGAM, Damien/Cowes PO31 7PL\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP08734509B1": {
            "patentid": "EP08734509B1",
            "path": "EP08734509NWB1",
            "title": "A WIND TURBINE AND A METHOD FOR CONTROLLING THE TEMPERATURE OF FLUID FLOWING IN A FIRST TEMPERATURE CONTROL SYSTEM OF A WIND TURBINE",
            "pubdate": "20171213",
            "inventor": "FROKJAER, Poul, Sp\u00e6rhage/DK-9260 Gistrup\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP09831246B1": {
            "patentid": "EP09831246B1",
            "path": "EP09831246NWB1",
            "title": "EFFICIENT WIND TURBINE BLADES, WIND TURBINE BLADE STRUCTURES, AND ASSOCIATED SYSTEMS AND METHODS OF MANUFACTURE, ASSEMBLY AND USE",
            "pubdate": "20170920",
            "inventor": "BAKER, Myles, L./Long Beach CA 90807\u00a0(US), ARENDT, Cory, P./Huntgtington Beach CA 92649\u00a0(US), MADRID, Bernard, G./Hungtington Beach CA 92649\u00a0(US), VILHAUER, Sheldon/CA 90746\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP11161449B1": {
            "patentid": "EP11161449B1",
            "path": "EP11161449NWB1",
            "title": "Kompakte Getriebe-Generator-Einheit f\u00fcr Windenergieanlagen",
            "pubdate": "20150527",
            "inventor": "B\u00f6ing, Alfons/46395 Bocholt\u00a0(DE), Dinter, Ralf Martin/45888 Gelsenkirchen\u00a0(DE), Draber, J\u00fcrgen/94036 Passau\u00a0(DE), Gr\u00fcning, Arne/94032 Passau\u00a0(DE), Memminger, Oliver/94127 Neuburg A.D. Inn\u00a0(DE), M\u00f6hle, Axel/12163 Berlin\u00a0(DE), Sch\u00f6berl, Friedrich/94099 Ruhstorf a.d. Rott\u00a0(DE), Zeichf\u00fc\u00dfl, Roland/94575 Rathsmannsdorf\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12803545B1": {
            "patentid": "EP12803545B1",
            "path": "EP12803545NWB1",
            "title": "VERTICAL AXIS WIND TURBINE WITH VARIABLE PITCH MECHANISM",
            "pubdate": "20170614",
            "inventor": "RADOVICH, Walter/Ingleburn, NSW 2666\u00a0(AU), HUANG, Ricky, Zhong/Ingleburn, NSW 2666\u00a0(AU), RUDLEY, Bjorn/Ingleburn, NSW 2666\u00a0(AU), TAN, Jing, K./Ingleburn, NSW 2666\u00a0(AU)",
            "mainpicture": "imgf0001.png"
        },
        "EP12718589B1": {
            "patentid": "EP12718589B1",
            "path": "EP12718589NWB1",
            "title": "METHOD AND APPARTAUS FOR PROTECTING WIND TURBINES FROM EXTREME EVENTS",
            "pubdate": "20170412",
            "inventor": "BOWYER, Robert/London SW6 6LE\u00a0(GB), WESTERGAARD, Carsten Hein/Houston, Texas 77010\u00a0(US), CREABY, Justin/Broomfield, CO 80020\u00a0(US), SPRUCE, Chris/Leatherhead Surrey KT23 4PD\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP13002476B1": {
            "patentid": "EP13002476B1",
            "path": "EP13002476NWB1",
            "title": "Wind energy converter using kites",
            "pubdate": "20150624",
            "inventor": "Ippolito, Massimo/I-14020 Berzano di San Pietro (AT)\u00a0(IT), Taddei, Franco/I-23896 Sirtori (LC)\u00a0(IT)",
            "mainpicture": "imgb0001.png"
        },
        "EP12735083B1": {
            "patentid": "EP12735083B1",
            "path": "EP12735083NWB1",
            "title": "A METHOD OF YAWING A ROTOR OF A WIND TURBINE",
            "pubdate": "20161019",
            "inventor": "SPRUCE, Chris/Leatherhead Surrey KT23 4PD\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP10766001B1": {
            "patentid": "EP10766001B1",
            "path": "EP10766001NWB1",
            "title": "ROTOR F\u00dcR EINE WINDENERGIEANLAGE",
            "pubdate": "20150408",
            "inventor": "BERTOLOTTI, Fabio/48455 Bad Bentheim\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11163273B1": {
            "patentid": "EP11163273B1",
            "path": "EP11163273NWB1",
            "title": "Method for measuring a rotational position of a rotor blade of a wind turbine and measuring device",
            "pubdate": "20170614",
            "inventor": "Scholte-Wassink, Hartmut Andreas/48499, Salzbergen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10177077B1": {
            "patentid": "EP10177077B1",
            "path": "EP10177077NWB1",
            "title": "Verfahren zum Betreiben einer Windenergieanlage",
            "pubdate": "20160615",
            "inventor": "Wobben, Aloys/26607 Aurich\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11729387B1": {
            "patentid": "EP11729387B1",
            "path": "EP11729387NWB1",
            "title": "METHOD AND APPARATUS FOR EXTRACTING ENERGY FROM A FLUCTUATING ENERGY FLOW FROM A RENEWABLE ENERGY SOURCE",
            "pubdate": "20170301",
            "inventor": "CALDWELL, Niall James/Edinburgh EH15 2NH\u00a0(GB), DUMNOV, Daniil Sergeevich/Edinburgh EH3 9HP\u00a0(GB), FIELDING, Michael Richard/Linlithgow EH49 7DY\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP11761491B1": {
            "patentid": "EP11761491B1",
            "path": "EP11761491NWB1",
            "title": "WIND TURBINE BLADE STRUCTURES, LIFTING ASSEMBLIES AND METHODS OF BLADE HANDLING",
            "pubdate": "20170726",
            "inventor": "BECH, Anton/DK-6950 Ringk\u00f8bing\u00a0(DK), HANCOCK, Mark/Southampton Hampshire SO15 5HN\u00a0(GB), THOMSEN, Peter, Frans/DK-6950 Ringk\u00f8bing\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP09176709B1": {
            "patentid": "EP09176709B1",
            "path": "EP09176709NWB1",
            "title": "Cooling system for wind turbine components",
            "pubdate": "20151014",
            "inventor": "Wan, Rongbo/Hangzhou City Zheijang Province 310002\u00a0(CN)",
            "mainpicture": "imgf0001.png"
        },
        "EP12181506B1": {
            "patentid": "EP12181506B1",
            "path": "EP12181506NWB1",
            "title": "Glider for airborne wind energy production",
            "pubdate": "20141231",
            "inventor": "Ruiterkamp, Richard/2586 GH Den Haag\u00a0(NL)",
            "mainpicture": "imgf0001.png"
        },
        "EP06255191B1": {
            "patentid": "EP06255191B1",
            "path": "EP06255191NWB1",
            "title": "Device for driving a first part of a wind energy turbine with respect to a second part of the wind energy turbine",
            "pubdate": "20150930",
            "inventor": "Nies, Jacob/8042 HA  Zwolle\u00a0(NL)",
            "mainpicture": "imgf0001.png"
        },
        "EP09014766B1": {
            "patentid": "EP09014766B1",
            "path": "EP09014766NWB1",
            "title": "Brake system, generator and wind turbine",
            "pubdate": "20150624",
            "inventor": "Eriksen, Uffe/8700 Horsens\u00a0(DK), Veng, Jens Anton Agerskov/7430 Ikast\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12724914B1": {
            "patentid": "EP12724914B1",
            "path": "EP12724914NWB1",
            "title": "VERFAHREN ZUM ERRICHTEN, WARTEN UND DEMONTIEREN EINER WINDENERGIEANLAGE",
            "pubdate": "20161019",
            "inventor": "WAGNER, Philipp/97638 Mellrichstadt\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12163552B1": {
            "patentid": "EP12163552B1",
            "path": "EP12163552NWB1",
            "title": "Rotor blade assembly for a wind turbine",
            "pubdate": "20160406",
            "inventor": "Lind, Soeren Oemann/4700 N\u00e6stved\u00a0(DK), Stege, Jason/7330 Brande\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10745551B1": {
            "patentid": "EP10745551B1",
            "path": "EP10745551NWB1",
            "title": "BETRIEBSF\u00dcHRUNGSSYSTEM EINER WINDENERGIEANLAGE UND VERFAHREN UNTER VERWENDUNG DES BETRIEBSF\u00dcHRUNGSSYSTEMS",
            "pubdate": "20151216",
            "inventor": "SCHINDELE, Lothar/71272 Renningen\u00a0(DE), BUCHTALA, Boris/75417 Muehlacker\u00a0(DE), SCHNURR, Bernd/97816 Lohr-Sendelbach\u00a0(DE), VATH, Andreas/63849 Leidersbach\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10817169B1": {
            "patentid": "EP10817169B1",
            "path": "EP10817169NWB1",
            "title": "WIND POWER GENERATION DEVICE",
            "pubdate": "20171018",
            "inventor": "ITO, Ryosuke/Tokyo 160-0023\u00a0(JP), OKUBO, Takanori/Nishitokyo-shi Tokyo 188-0002\u00a0(JP), CHIKASHIGE, Tadaaki/Kawasaki-shi Kanagawa 214-0034\u00a0(JP), YAMAZAKI, Takashi/Kiyose-shi Tokyo 2040022\u00a0(JP), MATSUMIYA, Hikaru/Tokyo 157-0066\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP09165835B1": {
            "patentid": "EP09165835B1",
            "path": "EP09165835NWB1",
            "title": "Expandable cable support for wind turbine",
            "pubdate": "20160907",
            "inventor": "Hennig, Jens/48431, Rheine\u00a0(DE), Achenbach, Patrick/48431, Rheine\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10747109B1": {
            "patentid": "EP10747109B1",
            "path": "EP10747109NWB1",
            "title": "HYDRAULIC GEOFRACTURE ENERGY STORAGE SYSTEM",
            "pubdate": "20150401",
            "inventor": "Schmidt, Howard K./Cypress, TX 77433\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP06701141B1": {
            "patentid": "EP06701141B1",
            "path": "EP06701141NWB1",
            "title": "STABLEUCHTE ZUR BEFEUERUNG EINES TURMES",
            "pubdate": "20150826",
            "inventor": "WOBBEN, Aloys/26607 Aurich\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11007097B1": {
            "patentid": "EP11007097B1",
            "path": "EP11007097NWB1",
            "title": "Rotorblatt oder Rotorblattsegment f\u00fcr eine Windenergieanlage",
            "pubdate": "20150729",
            "inventor": "Klein, Hendrik/18057 Rostock\u00a0(DE), G\u00fcnther, Christian/20251 Hamburg\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP13002688B1": {
            "patentid": "EP13002688B1",
            "path": "EP13002688NWB1",
            "title": "Windenergieanlagenrotorblatt mit einer elektrischen Heizeinrichtung und mehreren Blitzschutzleitern",
            "pubdate": "20170705",
            "inventor": "Hendrik, Klein/18147 Rostock\u00a0(DE), Ohlerich, Nick/18055 Rostock\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11162978B1": {
            "patentid": "EP11162978B1",
            "path": "EP11162978NWB1",
            "title": "Spoiler for a wind turbine blade",
            "pubdate": "20170802",
            "inventor": "Enevoldsen, Peder Bay/7100, Vejle\u00a0(DK), Kristensen, Jens J\u00f8rgen \u00d8stergaard/9240, Nibe\u00a0(DK), Thrue, Carsten/8740, Braedstrup\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11757609B1": {
            "patentid": "EP11757609B1",
            "path": "EP11757609NWB1",
            "title": "VERFAHREN UND ANORDNUNG ZUM EINSPEISEN VON ELEKTRISCHER LEISTUNG AUS EINER WINDENERGIEANLAGE IN EIN WECHSELSPANNUNGSNETZ",
            "pubdate": "20150729",
            "inventor": "STROBL, Bernhard/91080 Uttenreuth\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP09709096B1": {
            "patentid": "EP09709096B1",
            "path": "EP09709096NWB1",
            "title": "SYSTEM AND METHOD FOR STORING ENERGY",
            "pubdate": "20170510",
            "inventor": "FISKE, Orlo James/Goleta, California 93117\u00a0(US)",
            "mainpicture": "imgb0001.png"
        },
        "EP12735912B1": {
            "patentid": "EP12735912B1",
            "path": "EP12735912NWB1",
            "title": "METHOD FOR RETROFITTING VORTEX GENERATORS ON A WIND TURBINE BLADE",
            "pubdate": "20150909",
            "inventor": "MADSEN, Jesper/DK-6621 Gesten\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11709101B1": {
            "patentid": "EP11709101B1",
            "path": "EP11709101NWB1",
            "title": "WIND TURBINE, TRANSPORT SYSTEM AND METHODS OF OPERATING, MAINTENANCE AND CONSTRUCTION OF A WIND TURBINE",
            "pubdate": "20170426",
            "inventor": "ERIKSEN, Uffe/DK-8700 Horsens\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12004027B1": {
            "patentid": "EP12004027B1",
            "path": "EP12004027NWB1",
            "title": "Verfahren zur Herstellung einer Windenergieanlagenrotorblatthalbschale bzw. eines Windenergieanlagenrotorblatts und Herstellungsform zu diesem Zweck",
            "pubdate": "20150304",
            "inventor": "Austinat, Dirk/17126 Jarmen\u00a0(DE), Frankowski, Marco/18347 Ostseebad Wustrom\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP13198980B1": {
            "patentid": "EP13198980B1",
            "path": "EP13198980NWB1",
            "title": "Wind turbine assembly system",
            "pubdate": "20151216",
            "inventor": "Arlab\u00e1n Gabeiraas, Teresa/31621 Sarriguren (NAVARRA)\u00a0(ES), Garc\u00eda Say\u00e9s, Jos\u00e9 Miguel/31621 Sarriguren (NAVARRA)\u00a0(ES), Garcia Maestre, Iv\u00e1n/31621 Sarriguren (NAVARRA)\u00a0(ES), Ruiz Aldama, Alfonso/31621 Sarriguren (NAVARRA)\u00a0(ES), Gomez Andueza, Asier/31621 Sarriguren (NAVARRA)\u00a0(ES), Aristegui Lantero, Jose Luis/31621 Sarriguren (NAVARRA)\u00a0(ES), Gaston Lujambio, Ander/31621 Sarriguren (NAVARRA)\u00a0(ES), N\u00fa\u00f1ez Polo, Miguel/31621 Sarriguren (NAVARRA)\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP02732657B1": {
            "patentid": "EP02732657B1",
            "path": "EP02732657NWB1",
            "title": "METHODE ZUR MAXIMIERUNG DER ENERGIEAUSBEUTE EINER WINDTURBINE",
            "pubdate": "20161221",
            "inventor": "Wobben, Aloys/26607 Aurich\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP13738768B1": {
            "patentid": "EP13738768B1",
            "path": "EP13738768NWB1",
            "title": "Apparatus for moving blade of wind turbine, method for repairing pitch bearing using same and wind turbine including the same",
            "pubdate": "20161012",
            "inventor": "CHOI, Jaeyeon/Geoje-si Gyeongsangnam-do 656-892\u00a0(KR), YOON, Tae Won/Geoje-si Gyeongsangnam-do 656-812\u00a0(KR), MANAPPATTY, Shimjith/Geoje-si Gyeongsangnam-do 656-710\u00a0(KR)",
            "mainpicture": "imgf0001.png"
        },
        "EP08170075B1": {
            "patentid": "EP08170075B1",
            "path": "EP08170075NWB1",
            "title": "Apparatus and method for reducing asymmetric rotor loads in wind turbine shutdown",
            "pubdate": "20161019",
            "inventor": "Kammer, Leonardo Cesar/Niskayuna, NY 12309\u00a0(US), Oing, Hubert/14169, Berlin\u00a0(DE)",
            "mainpicture": "imgb0001.png"
        },
        "EP08015978B1": {
            "patentid": "EP08015978B1",
            "path": "EP08015978NWB1",
            "title": "Flange joint  for blade sections of a wind turbine with load sensor on the bolts",
            "pubdate": "20170503",
            "inventor": "Pedersen, Bent Herso/8600 Silkeborg\u00a0(DK), Arocena de la Rua, Ion/31621 Sarriguren (Navarra)\u00a0(ES), Rodriguez Sola, Rub\u00e9n/31621 Sarriguren (Navarra)\u00a0(ES), Sanz Pascual, Eneko/31621 Sarriguren (Navarra)\u00a0(ES), Savii, Hely Ricardo/31621 Sarriguren (Navarra)\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP03799486B1": {
            "patentid": "EP03799486B1",
            "path": "EP03799486NWB1",
            "title": "LASTAUFNEHMERANORDNUNG F\u00dcR WINDTURBINENFL\u00dcGEL",
            "pubdate": "20150506",
            "inventor": "Aloys Wobben/26607 Aurich\u00a0(DE)",
            "mainpicture": "imgb0001.png"
        },
        "EP12737897B1": {
            "patentid": "EP12737897B1",
            "path": "EP12737897NWB1",
            "title": "A POWER GENERATING APPARATUS OF RENEWABLE ENERGY TYPE",
            "pubdate": "20161005",
            "inventor": "KAMEDA, Takuro/Tokyo 108-8215\u00a0(JP), FURUKAWA, Syogo/Tokyo 108-8215\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP10834666B1": {
            "patentid": "EP10834666B1",
            "path": "EP10834666NWB1",
            "title": "BUTT-WELDED JOINT FORMED USING ELECTRON BEAM",
            "pubdate": "20170503",
            "inventor": "ISHIKAWA, Tadashi/Tokyo 100-8071\u00a0(JP), HONMA, Ryuichi/Tokyo 100-8071\u00a0(JP), ICHIKAWA, Kazutoshi/Tokyo 100-8071\u00a0(JP)",
            "mainpicture": "imgb0001.png"
        },
        "EP10803346B1": {
            "patentid": "EP10803346B1",
            "path": "EP10803346NWB1",
            "title": "WINDENERGIEANLAGE MIT HEBEVORRICHTUNG",
            "pubdate": "20150708",
            "inventor": "SIEGFRIEDSEN, S\u00f6nke/24768 Rendsburg\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11804633B1": {
            "patentid": "EP11804633B1",
            "path": "EP11804633NWB1",
            "title": "SUPERVISION OF CONTROLLER INSTABILITY IN A WIND TURBINE",
            "pubdate": "20160817",
            "inventor": "MIRANDA, Erik Carl Lehnskov/DK-8940 Randers SV\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP09177814B1": {
            "patentid": "EP09177814B1",
            "path": "EP09177814NWB1",
            "title": "Method and assembly for mounting rotor blade bearings of a wind turbine",
            "pubdate": "20160921",
            "inventor": "Koesters, Achim/48485, Neuenkirchen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP04756954B1": {
            "patentid": "EP04756954B1",
            "path": "EP04756954NWB1",
            "title": "METHOD AND APPARATUS FOR WIND TURBINE ROTOR LOAD CONTROL BASED ON SHAFT RADIAL DISPLACEMENT",
            "pubdate": "20160511",
            "inventor": "PIERCE, Kirk, G./Simpsonvills, SC 29681\u00a0(US), LEMIEUX, David, Lawrence/Boulder MT 59632\u00a0(US), BLAKEMORE, Ralph, W./Tehachapi, CA 93561\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP12811818B1": {
            "patentid": "EP12811818B1",
            "path": "EP12811818NWB1",
            "title": "STAY CABLE FOR STRUCTURES",
            "pubdate": "20160831",
            "inventor": "Lambert, Walter, L./Muskogee, OK 74401\u00a0(US)",
            "mainpicture": "imgb0001.png"
        },
        "EP12728132B1": {
            "patentid": "EP12728132B1",
            "path": "EP12728132NWB1",
            "title": "METHOD OF SYNCHRONISING A GENERATOR DRIVE WITH AN ALTERNATING CURRENT ELECTRICAL NETWORK",
            "pubdate": "20151118",
            "inventor": "CALDWELL, Niall/Midlothian Lothian EH20 9TB\u00a0(GB), DUMNOV, Daniil/Midlothian Lothian EH20 9TB\u00a0(GB), ABRAHAMS, Daniel/Midlothian Lothian EH20 9TB\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP08171278B1": {
            "patentid": "EP08171278B1",
            "path": "EP08171278NWB1",
            "title": "Integrated shipping fixture and assembly method for jointed wind turbine blades",
            "pubdate": "20170222",
            "inventor": "Livingston, Jamie T/Simpsonville, SC 29681\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP11193302B1": {
            "patentid": "EP11193302B1",
            "path": "EP11193302NWB1",
            "title": "Sealing arrangement for a wind turbine",
            "pubdate": "20170201",
            "inventor": "Nielsen, Jacob Blach/7442 Engesvang\u00a0(DK), Booth, James Kenneth/7330 Brande\u00a0(DK), Munk-Hansen, Thorkil/7323 Give\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10002051B1": {
            "patentid": "EP10002051B1",
            "path": "EP10002051NWB1",
            "title": "A wind turbine and method for cooling a heat generating component of a wind turbine",
            "pubdate": "20161005",
            "inventor": "Buus, Thomas, Paw/8643 Ans By\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP05257844B1": {
            "patentid": "EP05257844B1",
            "path": "EP05257844NWB1",
            "title": "Active flow modification on wind turbine blades",
            "pubdate": "20160518",
            "inventor": "Saddoughi, Seyed Gholamali/Clifton Park, NY 12065\u00a0(US), Gupta, Anurag/Clifton Park, NY 12065\u00a0(US), Giguere, Philippe/Simpsonville, SC 29681\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP06254831B1": {
            "patentid": "EP06254831B1",
            "path": "EP06254831NWB1",
            "title": "Wind turbine rotor assembly and blade having acoustic flap",
            "pubdate": "20150506",
            "inventor": "Herr, Stefan/Greenville South Carolina 29615\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP12712878B1": {
            "patentid": "EP12712878B1",
            "path": "EP12712878NWB1",
            "title": "ENERGIEGEWINNUNGSANLAGE",
            "pubdate": "20150506",
            "inventor": "Hehenberger, Gerald/9020 Klagenfurt\u00a0(AT)",
            "mainpicture": "imgb0001.png"
        },
        "EP10735171B1": {
            "patentid": "EP10735171B1",
            "path": "EP10735171NWB1",
            "title": "WINDMILL CONTROL DEVICE AND CONTROL METHOD",
            "pubdate": "20170920",
            "inventor": "BABA Mitsuya/Tokyo 108-8215\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP09835834B1": {
            "patentid": "EP09835834B1",
            "path": "EP09835834NWB1",
            "title": "PRIME MOVER",
            "pubdate": "20170426",
            "inventor": "Martino, Dominick Daniel/Levittown, PA 19057\u00a0(US)",
            "mainpicture": "imgb0001.png"
        },
        "EP09754011B1": {
            "patentid": "EP09754011B1",
            "path": "EP09754011NWB1",
            "title": "WIND GENERATOR COMPRISING AN IMPROVED HOUSING",
            "pubdate": "20150121",
            "inventor": "SOROA SISAM\u00d3N, Enrique/E-31621 SARRIGUREN (Navarra)\u00a0(ES), SALAVERRI ZAZPE, Mikel Aitor/E-31621 SARRIGUREN (Navarra)\u00a0(ES), ARRUTI P\u00c9REZ, Agust\u00edn/E-31621 SARRIGUREN (Navarra)\u00a0(ES), N\u00da\u00d1EZ POLO, Miguel/E-31621 SARRIGUREN (Navarra)\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP11178948B1": {
            "patentid": "EP11178948B1",
            "path": "EP11178948NWB1",
            "title": "Schmierritzel",
            "pubdate": "20170524",
            "inventor": "K\u00f6ppel, Bernhard/91257 Pegnitz\u00a0(DE), Brendel, J\u00fcrgen/91278 Pottenstein\u00a0(DE), Hess, Stefan, Dr./90489 N\u00fcrnberg\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP13155080B1": {
            "patentid": "EP13155080B1",
            "path": "EP13155080NWB1",
            "title": "Turning device to rotate the rotatable part of a wind turbine",
            "pubdate": "20150617",
            "inventor": "Munk-Hansen, Thorkil/7323 Give\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12724973B1": {
            "patentid": "EP12724973B1",
            "path": "EP12724973NWB1",
            "title": "WINDENERGIEANLAGEN-ROTORBLATT UND VERFAHREN ZUR MONTAGE EINES WINDENERGIEANLAGEN-ROTORBLATTES",
            "pubdate": "20171018",
            "inventor": "HOFFMANN, Alexander/26725 Emden\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP08010999B1": {
            "patentid": "EP08010999B1",
            "path": "EP08010999NWB1",
            "title": "Wind turbine blade with deflectable flaps",
            "pubdate": "20170823",
            "inventor": "Meldgaard, Christian/8600 Silkeborg\u00a0(DK), Friedrich, Michael/8600 Silkeborg\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10016097B1": {
            "patentid": "EP10016097B1",
            "path": "EP10016097NWB1",
            "title": "Hatch cover for wind driven power plant",
            "pubdate": "20160608",
            "inventor": "K\u00f6hne, Ansgar/27572 Bremerhaven\u00a0(DE), Arndt, Joachim/27612 Loxstedt\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP09007072B1": {
            "patentid": "EP09007072B1",
            "path": "EP09007072NWB1",
            "title": "\u00dcberwachung des Betriebs einer Windenergieanlage durch Ger\u00e4uschanalyse",
            "pubdate": "20151125",
            "inventor": "Dicke, Daniel/24783 Osterr\u00f6nfeld\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12818990B1": {
            "patentid": "EP12818990B1",
            "path": "EP12818990NWB1",
            "title": "WINDTURBINE MIT FERNWINDMESSER",
            "pubdate": "20170215",
            "inventor": "K\u00d6TTING, Norbert/48485 Neuenkirchen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12816740B1": {
            "patentid": "EP12816740B1",
            "path": "EP12816740NWB1",
            "title": "PROCEDE DE D\u00c9GIVRAGE DE STRUCTURES EN MAT\u00c9RIAUX COMPOSITES, NOTAMMENT DE PALES D'UNE \u00c9OLIENNE, ET DISPOSITIF ADAPT\u00c9",
            "pubdate": "20171018",
            "inventor": "GAILLARDON, Bastien/F-33000 Bordeaux\u00a0(FR), GRACIA, Serge/F-31500 Tuleda Navarra\u00a0(ES), OYHARCABAL, Mathieu/F-33400 Talence\u00a0(FR), OLINGA, Thomas/F-33270 Floirac\u00a0(FR)",
            "mainpicture": "imgb0001.png"
        },
        "EP11817196B1": {
            "patentid": "EP11817196B1",
            "path": "EP11817196NWB1",
            "title": "REGENERATIVE ENERGY POWER GENERATION DEVICE AND ROTOR LOCKING METHOD THEREFOR",
            "pubdate": "20150826",
            "inventor": "TSUTSUMI, Kazuhisa/Tokyo 108-8215\u00a0(JP)",
            "mainpicture": "imgb0001.png"
        },
        "EP07846421B1": {
            "patentid": "EP07846421B1",
            "path": "EP07846421NWB1",
            "title": "METHOD AND SYSTEM OF PERFORMING A FUNCTIONAL TEST OF AT LEAST ONE EMBEDDED SUB-ELEMENT OF A WIND TURBINE",
            "pubdate": "20150617",
            "inventor": "ELISIUSSEN, S\u00f8ren/8900 Randers\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12805932B1": {
            "patentid": "EP12805932B1",
            "path": "EP12805932NWB1",
            "title": "METHOD FOR CONTROLLING A WIND TURBINE",
            "pubdate": "20160921",
            "inventor": "MATESANZ, Alvaro Gil/E-28760 Tres Cantos\u00a0(ES)",
            "mainpicture": "imgb0001.png"
        },
        "EP12752158B1": {
            "patentid": "EP12752158B1",
            "path": "EP12752158NWB1",
            "title": "WIND TURBINE BLADE AND WIND-POWERED ELECTRICITY GENERATOR PROVIDED WITH SAME",
            "pubdate": "20150610",
            "inventor": "FUKAMI, Koji/Tokyo 108-8215\u00a0(JP)",
            "mainpicture": "imgb0001.png"
        },
        "EP09250441B1": {
            "patentid": "EP09250441B1",
            "path": "EP09250441NWB1",
            "title": "Automatic generation control augmentation for wind plant integration",
            "pubdate": "20170927",
            "inventor": "Miller, Nicholas Wright/Delmar New York 12054\u00a0(US), Clark, Kara/Glenville New York 12302\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP11162811B1": {
            "patentid": "EP11162811B1",
            "path": "EP11162811NWB1",
            "title": "Systems and methods for assembling a gearbox handling assembly for use in a wind turbine",
            "pubdate": "20171004",
            "inventor": "Signore, Jonathan Paul/Schenectady, NY 12345\u00a0(US), Koronkiewicz, Michael S./Schenectady, NY 12345\u00a0(US), Cheng, Christopher D./Schenectady, NY 12345\u00a0(US), Jutton, Stephen John/Greenville, SC 29615\u00a0(US), Buchan, Charles Van/Greenville, SC 29615\u00a0(US), Holmes, James Bradford/Greenville, SC 29165\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP10160819B1": {
            "patentid": "EP10160819B1",
            "path": "EP10160819NWB1",
            "title": "Wind turbine blade with integrated stall sensor and associated method of detecting stall of a wind turbine blade",
            "pubdate": "20150708",
            "inventor": "Fisher, Murray/Simpsonville, SC 29681\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP10178732B1": {
            "patentid": "EP10178732B1",
            "path": "EP10178732NWB1",
            "title": "Systems and methods of assembling a rotor blade extension for use in a wind turbine",
            "pubdate": "20170118",
            "inventor": "Santiago, Pedro Luis Benito/48499, Salzbergen (Niedersachsen)\u00a0(DE), Segovia, Eugenio Yegro/48499, Salzbergen (Niedersachsen)\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP12005805B1": {
            "patentid": "EP12005805B1",
            "path": "EP12005805NWB1",
            "title": "Schwingungstilgeranordnung f\u00fcr Windkraftanlagen mit Massenpendel und Wirbelstromd\u00e4mpfer",
            "pubdate": "20150325",
            "inventor": "Pankoke, Steffen, Dr./97837 Erlenbach\u00a0(DE), Loix, Nicolas, Dr./1401 Nivelles\u00a0(BE), Engelhardt, J\u00fcrgen, Dr./97249 Eisingen\u00a0(DE), Katz, Sebastian/97082 W\u00fcrzburg\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP11382054B1": {
            "patentid": "EP11382054B1",
            "path": "EP11382054NWB1",
            "title": "Wind turbine and method for lifting a gearbox torque arm",
            "pubdate": "20160302",
            "inventor": "Colom Quetglas, Miquel \u00c0ngel/08005, Barcelona\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP12709321B1": {
            "patentid": "EP12709321B1",
            "path": "EP12709321NWB1",
            "title": "SANDWICH PANEL WITH A CORE OF STRUCTURAL FOAM AND MANUFACTURE THEREOF",
            "pubdate": "20150819",
            "inventor": "LAVOIE, Bernard, Joseph/Magog Qu\u00e9bec J1X 5T7\u00a0(CA)",
            "mainpicture": "imgf0001.png"
        },
        "EP12748016B1": {
            "patentid": "EP12748016B1",
            "path": "EP12748016NWB1",
            "title": "DIRECT-DRIVE WIND TURBINE",
            "pubdate": "20150304",
            "inventor": "PEDERSEN, Bo/DK-7620 Lemvig\u00a0(DK), THOMSEN, Kim/DK-7430 Ikast\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP10002090B1": {
            "patentid": "EP10002090B1",
            "path": "EP10002090NWB1",
            "title": "Windparkregler",
            "pubdate": "20170830",
            "inventor": "Wittek, Thomas/26386 Wilhelmshaven\u00a0(DE), Guo, Xin Dr./13591 Berlin\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP09250444B1": {
            "patentid": "EP09250444B1",
            "path": "EP09250444NWB1",
            "title": "Hub pitch gear repair method",
            "pubdate": "20161214",
            "inventor": "Dimascio, Paul Stephen/Greer, South Carolina 29650\u00a0(US), Close, Ryan/Greenville, South Carolina 29607\u00a0(US), Auer, Gunther/20301 Irun\u00a0(ES), Grimley, Robert/Greer, South Carolina 29651\u00a0(US), Hamel, Alan/Simpsonville, South Carolina 29680\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP12746103B1": {
            "patentid": "EP12746103B1",
            "path": "EP12746103NWB1",
            "title": "A KITE FOR A SYSTEM FOR EXTRACTING ENERGY FROM THE WIND",
            "pubdate": "20150930",
            "inventor": "HARDY, John William/Burnham-On-Crouch CM0 8SH\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP12185790B1": {
            "patentid": "EP12185790B1",
            "path": "EP12185790NWB1",
            "title": "Method and system for resonance dampening in wind turbines",
            "pubdate": "20160203",
            "inventor": "Koerber, Arne/10585 Berlin\u00a0(DE)",
            "mainpicture": "imgb0001.png"
        },
        "EP08006746B1": {
            "patentid": "EP08006746B1",
            "path": "EP08006746NWB1",
            "title": "Method of damping tower vibrations of a wind turbine and control system for wind turbines",
            "pubdate": "20141231",
            "inventor": "Egedal, Per/7400 Herning\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP04724541B1": {
            "patentid": "EP04724541B1",
            "path": "EP04724541NWB1",
            "title": "CONTROL OF POWER, LOADS AND/OR STABILITY OF A HORIZONTAL AXIS WIND TURBINE BY USE OF VARIABLE BLADE GEOMETRY CONTROL",
            "pubdate": "20151104",
            "inventor": "BAK, Dan, Christian/DK-2800 Lyngby\u00a0(DK), BUHL, Thomas/DK-2670 Greve\u00a0(DK), FUGLSANG, Peter/DK-4000 Roskilde\u00a0(DK), MADSEN, Helge, Aagaard/DK-4000 Roskilde\u00a0(DK), RASMUSSEN, Flemming/DK-4960 Holeby\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11791013B1": {
            "patentid": "EP11791013B1",
            "path": "EP11791013NWB1",
            "title": "METHODS AND SYSTEM FOR OPERATING A WIND TURBINE COUPLED TO A POWER GRID",
            "pubdate": "20170222",
            "inventor": "BENITO SANTIAGO, Pedro Luis/E-28027 Madrid\u00a0(ES), YEGRO SEGOVIA, Eugenio/E-28027 Madrid\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP11382236B1": {
            "patentid": "EP11382236B1",
            "path": "EP11382236NWB1",
            "title": "Wind turbine auxiliary drive system",
            "pubdate": "20160907",
            "inventor": "Pasquet, Pierre/08005 BARCELONA\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP09702856B1": {
            "patentid": "EP09702856B1",
            "path": "EP09702856NWB1",
            "title": "WIND TURBINE BLADE AND HUB ASSEMBLY",
            "pubdate": "20151111",
            "inventor": "S\u00d8RENSEN, Tommy/DK-8632 Lemming\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11767374B1": {
            "patentid": "EP11767374B1",
            "path": "EP11767374NWB1",
            "title": "ZWILLINGSTURBINENSYSTEM, DAS DEM WIND/WASSER FOLGT (WINDTRACKER), F\u00dcR WIND- UND/ODER WASSERKRAFT, MIT OPTIMIERTER FL\u00dcGELFORM",
            "pubdate": "20160720",
            "inventor": "Steel, Dennis Patrick/47441 Moers\u00a0(DE)",
            "mainpicture": "imgb0001.png"
        },
        "EP12199070B1": {
            "patentid": "EP12199070B1",
            "path": "EP12199070NWB1",
            "title": "Segmented tower bottom flange and method of assembly",
            "pubdate": "20161130",
            "inventor": "Koot, Jasper/3454 AX De Meern\u00a0(NL)",
            "mainpicture": "imgf0001.png"
        },
        "EP10810737B1": {
            "patentid": "EP10810737B1",
            "path": "EP10810737NWB1",
            "title": "VORRICHTUNG ZUR NUTZUNG VON STR\u00d6MUNGSENERGIE",
            "pubdate": "20170222",
            "inventor": "KELAIDITIS, Alexis/66386 St. Ingbert\u00a0(DE), KELAIDITIS, Nikolas/60486 Frankfurt a.M.\u00a0(DE), KELAIDITIS, Konstantin/66386 St. ingbert\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP10305351B1": {
            "patentid": "EP10305351B1",
            "path": "EP10305351NWB1",
            "title": "Method of building a hybrid tower for a wind generator",
            "pubdate": "20160720",
            "inventor": "Huynh Tuong, Alain/92120, MONTROUGE\u00a0(FR), Melen, Beno\u00eet/92270, BOIS COLOMBES\u00a0(FR)",
            "mainpicture": "imgf0001.png"
        },
        "EP11151473B1": {
            "patentid": "EP11151473B1",
            "path": "EP11151473NWB1",
            "title": "Hub for the rotor of a wind energy turbine",
            "pubdate": "20161026",
            "inventor": "Schellings, Vincent/NL-7522 EH, Enschede\u00a0(NL), Delucis, Nicolas/D-48153, Munster\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP07821661B1": {
            "patentid": "EP07821661B1",
            "path": "EP07821661NWB1",
            "title": "STRUCTURE CELLULAIRE COMPOS\u00c9E D'UNE OU DE PLUSIEURS COUCHES DE CELLULES DESTIN\u00c9ES \u00c0 CAPTER L'\u00c9NERGIE",
            "pubdate": "20160406",
            "inventor": "SANDOZ, Alain/CH-2006 Neuch\u00e2tel\u00a0(CH), HAENNI, Nicolas/CH-1292 Chamb\u00e9sy\u00a0(CH)",
            "mainpicture": "imgf0001.png"
        },
        "EP11804631B1": {
            "patentid": "EP11804631B1",
            "path": "EP11804631NWB1",
            "title": "APPARATUS AND METHODS FOR MONITORING COMPONENT HEALTH IN A GEARBOX OF A POWER GENERATION SYSTEM",
            "pubdate": "20150729",
            "inventor": "SABANNAVAR, Anil/Singapore 312014\u00a0(SG), ONG, Jium Keat/Singapore 798595\u00a0(SG)",
            "mainpicture": "imgf0001.png"
        },
        "EP12159719B1": {
            "patentid": "EP12159719B1",
            "path": "EP12159719NWB1",
            "title": "Electrical yaw drive for a wind turbine, wind turbine and method for operating a wind turbine",
            "pubdate": "20160106",
            "inventor": "Thisted, Jan/8830 Tjele\u00a0(DK), Vinther, Soeren/7400 Herning\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12168909B1": {
            "patentid": "EP12168909B1",
            "path": "EP12168909NWB1",
            "title": "Transportation of wind turbine blades, in particular along curved roads",
            "pubdate": "20160629",
            "inventor": "Pedersen, Tom/6940 Lem\u00a0(ZA), Thomsen, Jens/7330 Brande\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP09003966B1": {
            "patentid": "EP09003966B1",
            "path": "EP09003966NWB1",
            "title": "Wind power generation system of a type provided with power storage system",
            "pubdate": "20160706",
            "inventor": "Oohara, Shinya/Tokyo 100-8220\u00a0(JP), Hoshino, Naoki/Ibaraki 317-0073\u00a0(JP), Iwata, Takeshi/Ibaraki 317-0073\u00a0(JP)",
            "mainpicture": "imgb0001.png"
        },
        "EP07109020B1": {
            "patentid": "EP07109020B1",
            "path": "EP07109020NWB1",
            "title": "REDUNDANT ELECTRICAL BRAKE AND PROTECTION SYSTEM FOR ELECTRIC GENERATORS",
            "pubdate": "20160518",
            "inventor": "Li, Lei/201203, Shanghai\u00a0(CN), Lu, Zhigang/201203, Shanghai\u00a0(CN), Tecihmann, Ralph/Albany, 12210\u00a0(US), Wang, Changyong/200125, Shanghai\u00a0(CN), Yang, Wenqiang/201102, Shanghai\u00a0(CN)",
            "mainpicture": "imgf0001.png"
        },
        "EP10845453B1": {
            "patentid": "EP10845453B1",
            "path": "EP10845453NWB1",
            "title": "MARINE WIND TURBINE WHOLE MACHINE",
            "pubdate": "20160622",
            "inventor": "LI, Aidong/Jiangsu 226117\u00a0(CN), DING, Hongyan/Jiangsu 226117\u00a0(CN), HUANG, Xuanxu/Jiangsu 226117\u00a0(CN)",
            "mainpicture": "imgf0001.png"
        },
        "EP10015467B1": {
            "patentid": "EP10015467B1",
            "path": "EP10015467NWB1",
            "title": "Method of operating a variable speed wind turbine",
            "pubdate": "20170614",
            "inventor": "Martin da Silva, Angel/28043 Madrid\u00a0(ES), Garcia Andujar, Juan Carlos/28043 Madrid\u00a0(ES), Lopez Rubio, Jose Maria/28043 Madrid\u00a0(ES), Jimenez de Lago, Mario/28043 Madrid\u00a0(ES), Romero-Sanz, Ignacio/28043 Madrid\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP11733823B1": {
            "patentid": "EP11733823B1",
            "path": "EP11733823NWB1",
            "title": "A LIFTING AND GUIDING DEVICE FOR HANDLING WIND TURBINE TOWER SECTIONS",
            "pubdate": "20171101",
            "inventor": "Siemens Aktiengesellschaft/80333 M\u00fcnchen\u00a0(DE), Andresen Towers A/S/5550 Langeskov\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP13164943B1": {
            "patentid": "EP13164943B1",
            "path": "EP13164943NWB1",
            "title": "Wear sensor for a wind turbine",
            "pubdate": "20170719",
            "inventor": "Mikkelsen, Jens Arne/7400 Herning\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP08846171B1": {
            "patentid": "EP08846171B1",
            "path": "EP08846171NWB1",
            "title": "WIND TURBINE BLADE AND METHOD FOR CONTROLLING THE LOAD ON A BLADE",
            "pubdate": "20170111",
            "inventor": "ABDALLAH, Imad/DK-8900 Randers\u00a0(DK), ROMBLAD, Jonas/DK-8900 Randers C\u00a0(DK), WESTERGAARD, Carsten, Hein/TX 77010 Houston\u00a0(US), LIM, Chee Kang/SG-Singapore 528794\u00a0(SG)",
            "mainpicture": "imgf0001.png"
        },
        "EP08752883B1": {
            "patentid": "EP08752883B1",
            "path": "EP08752883NWB1",
            "title": "WINDMILL PITCH ANGLE CONTROLLER AND METHOD FOR CONTROLLING WINDMILL PITCH ANGLE",
            "pubdate": "20150805",
            "inventor": "Mitsubishi Heavy Industries, Ltd./Tokyo 108-8215\u00a0(JP), MHI Vestas Offshore Wind A/S/8200 Aarhus N\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP11168522B1": {
            "patentid": "EP11168522B1",
            "path": "EP11168522NWB1",
            "title": "Nacelle main frame structure and drive train assembly for a wind turbine",
            "pubdate": "20171122",
            "inventor": "Smook, Warren/3040 Huldenberg\u00a0(BE)",
            "mainpicture": "imgf0001.png"
        },
        "EP09847209B1": {
            "patentid": "EP09847209B1",
            "path": "EP09847209NWB1",
            "title": "VERTICAL WIND POWER GENERATOR",
            "pubdate": "20150311",
            "inventor": "DENG, Yunhe/Guangdong 510460\u00a0(CN)",
            "mainpicture": "imgf0001.png"
        },
        "EP11009302B1": {
            "patentid": "EP11009302B1",
            "path": "EP11009302NWB1",
            "title": "Windenergieanlagenrotorblatt mit einem Heizelement und Verfahren zur Herstellung desselben",
            "pubdate": "20160309",
            "inventor": "L\u00f6we, Astrid/22301 Hamburg\u00a0(DE), Renschler, Oskar/22941 Delingsdorf\u00a0(DE), Rindt, Philipp/18057 Rostock\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP13169955B1": {
            "patentid": "EP13169955B1",
            "path": "EP13169955NWB1",
            "title": "System and method of moving a wind turbine rotor blade",
            "pubdate": "20160120",
            "inventor": "Vennegaard, Soeren Baek/9000 Aalborg\u00a0(DK), Schmidt, Thomas Posborg/9330 Dronninglund\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP05107575B1": {
            "patentid": "EP05107575B1",
            "path": "EP05107575NWB1",
            "title": "Use of continuous laminates, in particular suitable as a spar cap or another part of a wind energy turbine rotor blade",
            "pubdate": "20151014",
            "inventor": "Arelt, Rainer/48499 Salzbergen\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP09740331B1": {
            "patentid": "EP09740331B1",
            "path": "EP09740331NWB1",
            "title": "WIND TURBINE BLADE HAVING A SPOILER WITH EFFECTIVE SEPARATION OF AIRFLOW",
            "pubdate": "20160914",
            "inventor": "FUGLSANG, Peter/DK-7100 Vejle\u00a0(DK), LENZ, Kaja/DK-6400 S\u00f8nderborg\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP09734051B1": {
            "patentid": "EP09734051B1",
            "path": "EP09734051NWB1",
            "title": "UPWIND WIND TURBINE WITH BLADES SUPPORTED ON THE LEEWARD SIDE",
            "pubdate": "20160106",
            "inventor": "FUGLSANG, Lars/DK-5260 Odense S\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP05009781B1": {
            "patentid": "EP05009781B1",
            "path": "EP05009781NWB1",
            "title": "Windturbine mit gekr\u00fcmmten Rotorbl\u00e4ttern",
            "pubdate": "20160928",
            "inventor": "Schubert, Matthias/24768 Rendsburg\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP09809709B1": {
            "patentid": "EP09809709B1",
            "path": "EP09809709NWB1",
            "title": "DEVICE, METHOD AND PROGRAM FOR ADJUSTING RESTRICTION ON OPERATION OF WINDMILL",
            "pubdate": "20161005",
            "inventor": "KARIKOMI, Kai/Nagasaki-shi Nagasaki 851-0392\u00a0(JP), HIRAI, Shigeto/Nagasaki-shi Nagasaki 851-0392\u00a0(JP), HAYASHI, Yoshiyuki/Nagasaki-shi Nagasaki 850-8610\u00a0(JP)",
            "mainpicture": "imgb0001.png"
        },
        "EP08018796B1": {
            "patentid": "EP08018796B1",
            "path": "EP08018796NWB1",
            "title": "Wind turbine arrangement and method for aligning a wind turbine with the wind direction",
            "pubdate": "20160309",
            "inventor": "Enevoldsen, Peder, Bay/7100 Vejle\u00a0(DK), Frydendal, Ib/6683F\u00f8vling\u00a0(DK), Poulsen, Steffen Frydendal/8600 Silkeborg\u00a0(DK), Rubak, Rune/8600 Silkeborg\u00a0(DK)",
            "mainpicture": "imgf0001.png"
        },
        "EP12156273B1": {
            "patentid": "EP12156273B1",
            "path": "EP12156273NWB1",
            "title": "Monitoring wind turbine performance",
            "pubdate": "20160921",
            "inventor": "Uluyol, Onder/Morristown, NJ New Jersey 07962-2245\u00a0(US), Parthasarathy, Girija/Morristown, NJ New Jersey 07962-2245\u00a0(US)",
            "mainpicture": "imgb0001.png"
        },
        "EP12855997B1": {
            "patentid": "EP12855997B1",
            "path": "EP12855997NWB1",
            "title": "FLOATING TYPE WIND TURBINE GENERATING APPARATUS",
            "pubdate": "20161005",
            "inventor": "OHTA, Makoto/Tokyo 108-8215\u00a0(JP), KUMAMOTO, Hitoshi/Tokyo 108-8215\u00a0(JP), HONDA, Akihiro/Tokyo 108-8215\u00a0(JP), UEDA, Yoshinori/Tokyo 108-8215\u00a0(JP), YAMADA, Masato/Tokyo 108-8215\u00a0(JP)",
            "mainpicture": "imgf0001.png"
        },
        "EP11779013B1": {
            "patentid": "EP11779013B1",
            "path": "EP11779013NWB1",
            "title": "SYSTEMS AND METHODS FOR AVIAN MITIGATION FOR WIND FARMS",
            "pubdate": "20170412",
            "inventor": "OLIVER, Andrew, G./CO 80504\u00a0(US), BABBITT, Victor/Superior CO 80027\u00a0(US), FINE, Jeffrey, W./Grand Junction CO 81506\u00a0(US), IVES, Daniel/Broomfield CO 80020\u00a0(US), BRAND, Alexander, D./Westminster CO 80031\u00a0(US)",
            "mainpicture": "imgf0001.png"
        },
        "EP08777332B1": {
            "patentid": "EP08777332B1",
            "path": "EP08777332NWB1",
            "title": "WIND-TURBINE-DYNAMIC-CHARACTERISTICS MONITORING APPARATUS AND METHOD THEREFORE",
            "pubdate": "20160622",
            "inventor": "HASHIMOTO, Masayuki/Nagasaki-shi Nagasaki 851-0392\u00a0(JP), WAKASA, Tsuyoshi/Nagasaki-shi Nagasaki 851-0392\u00a0(JP), MATSUSHITA, Takatoshi/Nagasaki-shi Nagasaki 850-8610\u00a0(JP), ARINAGA, Shinji/Nagasaki-shi Nagasaki 851-0392\u00a0(JP)",
            "mainpicture": "imgb0001.png"
        },
        "EP12711913B1": {
            "patentid": "EP12711913B1",
            "path": "EP12711913NWB1",
            "title": "CHAINE D'ENTRAINEMENT COMPRENANT UNE MACHINE \u00c9LECTRIQUE DOUBLEMENT ALIMENT\u00c9E ET UN FILTRE COUPE-BANDE CONNECT\u00c9 ENTRE UN CONVERTISSEUR CONTINU-ALTERNATIF ET LE ROTOR DE LA MACHINE",
            "pubdate": "20160629",
            "inventor": "PERMUY, Alfred/F-92500 Rueil Malmaison\u00a0(FR)",
            "mainpicture": "imgb0001.png"
        },
        "EP11178500B1": {
            "patentid": "EP11178500B1",
            "path": "EP11178500NWB1",
            "title": "Wind turbine having variable height and method for operating the same",
            "pubdate": "20161012",
            "inventor": "Yegro Segovia, Eugenio/28979 Madrid\u00a0(ES), Benito Santiago, Pedro Luis/48429 Rheine\u00a0(DE), Garcia Lopez, Francisco/15896 Roxos Santiago de Compostela\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP12723681B1": {
            "patentid": "EP12723681B1",
            "path": "EP12723681NWB1",
            "title": "VERFAHREN ZUM BETREIBEN EINER WINDENERGIEANLAGE UNTER VEREISUNGSBEDINGUNGEN",
            "pubdate": "20150114",
            "inventor": "JEPSEN, Torsten/26603 Aurich\u00a0(DE)",
            "mainpicture": "imgf0001.png"
        },
        "EP08845265B1": {
            "patentid": "EP08845265B1",
            "path": "EP08845265NWB1",
            "title": "SEGMENTED CONCRETE TOWER FOR WIND POWER GENERATORS AND METHOD OF ERECTING THEREOF",
            "pubdate": "20160622",
            "inventor": "Cortina-Cordero, Alejandro/Mexico, D. F. 01330\u00a0(MX), Cortina-Ortega, Jose Pablo/Mexico, D. F. 01330\u00a0(MX), Cortina-Cordero, Jose Pablo/Mexico, D. F. 01330\u00a0(MX)",
            "mainpicture": "imgf0001.png"
        },
        "EP11382264B1": {
            "patentid": "EP11382264B1",
            "path": "EP11382264NWB1",
            "title": "Rotor for a wind turbine",
            "pubdate": "20160713",
            "inventor": "Feigl, Luca/08005 Barcelona\u00a0(ES), Rom\u00e1n Mallada, Jos\u00e9 Luis/08005 Barcelona\u00a0(ES), L\u00e1zaro, Ricardo/08005 Barcelona\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP10781724B1": {
            "patentid": "EP10781724B1",
            "path": "EP10781724NWB1",
            "title": "WIND TURBINE BLADES",
            "pubdate": "20160127",
            "inventor": "FIXTER, Greg Peter Wade/Hampshire GU14 OLX\u00a0(GB), SPOONER, Christopher Douglas James/Hampshire GU14 OLX\u00a0(GB), PERRY, Christopher James/Hampshire GU14 OLX\u00a0(GB)",
            "mainpicture": "imgf0001.png"
        },
        "EP10821603B1": {
            "patentid": "EP10821603B1",
            "path": "EP10821603NWB1",
            "title": "SYSTEM FOR PROTECTING WIND TURBINES AGAINST ATMOSPHERIC DISCHARGES",
            "pubdate": "20151028",
            "inventor": "ALMAZ\u00c1N S\u00c1NCHEZ, Jes\u00fas/E-28223 Pozuelo de Alarc\u00f3n (Madrid)\u00a0(ES)",
            "mainpicture": "imgf0001.png"
        },
        "EP19194772A1": {
            "patentid": "EP19194772A1",
            "path": "EP19194772NWA1",
            "title": "LOW LEVEL SPEED CONTROL",
            "pubdate": "20200422",
            "inventor": "SHALEV-SHWARTZ, Shai/9777513 Har Hotzvim\u00a0(IL), SHAMMAH, Shaked/9777513 Har Hotzvim\u00a0(IL), SHASHUA, Amnon/9777513 Har Hotzvim\u00a0(IL), COHEN, Barak/9777513 Har Hotzvim\u00a0(IL), ADELMAN, Zeev/9777513 Har Hotzvim\u00a0(IL), BERBERIAN, Oded/91450 Har Hotzvim\u00a0(IL)",
            "mainpicture": "imgaf001.png"
        }
    }
    linksjson = resultjson;
    callback(resultjson);
}
