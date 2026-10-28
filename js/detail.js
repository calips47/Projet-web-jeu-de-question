let xmlhttp = new XMLHttpRequest();

function loadXMLDoc() {
    xmlhttp.onreadystatechange = loadData;
    xmlhttp.open("GET", "https://obiwan.univ-brest.fr/~e22507849/data/bdd.xml", true);
    xmlhttp.send();
}

function loadData() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
        displayDetail();
    }
}

function displayDetail() {
    let xmlDoc = xmlhttp.responseXML;
    let x = xmlDoc.getElementsByTagName("question");
    let urlp = new URLSearchParams(window.location.search);
    let qid = urlp.get('id');
    let sTheme = document.getElementById("theme");
    let contenu = document.getElementById("question");
    let sReponse = document.getElementById("reponse");
    let sPoint = document.getElementById("point");
    let sDetail = document.getElementById("detail");

    for(let i = 0; i<x.length; i++){
        if(x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue === qid){
            sTheme.value = x[i].getElementsByTagName("thematique")[0].textContent;
            contenu.textContent = x[i].getElementsByTagName("contenu")[0].textContent;
            sReponse.value = x[i].getElementsByTagName("bonne_reponse")[0].textContent;
            sPoint.value = x[i].getElementsByTagName("point")[0].textContent;
            sDetail.textContent = x[i].getElementsByTagName("detail")[0].textContent;
        }
    }
}