let xmlhttp = new XMLHttpRequest();
let table = "";    
let nbPage = 0; 
let startIndex = 0; 
let endIndex = 0;
let pageSize = 7; 
let page = 0; 

function loadXMLDoc() {
    xmlhttp.onreadystatechange = loadData;
    xmlhttp.open("GET", "https://obiwan.univ-brest.fr/~e22507849/data/bdd.xml", true);
    xmlhttp.send();
}

function loadData() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {   
        displayDataTable();  
        computeNbPage();
        showPageLinks();
        loadPage(page);   
    }
}

function computeNbPage (){
    let xmlDoc = xmlhttp.responseXML;  
    let x = xmlDoc.getElementsByTagName("question");
    nbPage = Math.ceil(x.length/pageSize);
    
}

function loadPage(pageNumber) {
    let xmlDoc = xmlhttp.responseXML;  
    let x = xmlDoc.getElementsByTagName("question");
    page = pageNumber;
    startIndex = (page*pageSize);
    endIndex = startIndex+pageSize;    
    if(endIndex-startIndex <pageSize){
        endIndex = x.length;
    }
    displayDataTable();
} 

function affiche(i,x){
    table += "<tr>" 
        + "<td>" 
        + x[i].getElementsByTagName("id")[0].textContent 
        + "</td>" 
        + "<td>" 
        + x[i].getElementsByTagName("contenu")[0].textContent 
        + "</td>" 
        + "<td>" +"<ol>"
        + "<li>"+x[i].getElementsByTagName("r1")[0].textContent+"</li>"
        + "<li>"+x[i].getElementsByTagName("r2")[0].textContent+"</li>"
        + "<li>"+x[i].getElementsByTagName("r3")[0].textContent +"</li>"
        + "</td>" +"</ol>"
        +"<td>"
        + "<a href='src/détail.html?id="
        + x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue
        + "'>Details</a>"
        +"</td>"
        + "</tr>";
}

function displayDataTable() {
    let i; 
    let xmlDoc = xmlhttp.responseXML;    
    let x = xmlDoc.getElementsByTagName("question");
    table = "<tr><th>ID</th><th>Question</th><th>Answers</th><th></th></tr>";    

    for (i = startIndex; i < endIndex; i++) {        
        affiche(i, x);
        document.getElementById("data").innerHTML = table;
    }
}   

function filterDataTable() {
    let i; 
    let xmlDoc = xmlhttp.responseXML;    
    let x = xmlDoc.getElementsByTagName("question");
    let slThematique = document.getElementById("thematique");
    let theme = slThematique.options[slThematique.selectedIndex].value;
    table ="<tr><th>ID</th><th>Question</th><th>Answers</th><th></th></tr>";    
        
    for (i = 0; i < x.length; i++) {    
        if(theme ==='Tout'){
            affiche(x,i);
        }else{
            if(x[i].getElementsByTagName("thematique")[0].textContent == theme){
                affiche(i,x);
            }
        }
    }
        
    document.getElementById("data").innerHTML = table;
    alert(theme); 
}

function showPageLinks() {
    let pageLinks='';
    for(let i=1;i<=nbPage;i++){
        pageLinks += "<input type='button' onclick='loadPage(" + (i-1)
        +")' value='"+i+"'>";
    }
    let divpl = document.getElementById("pageLinks");
    divpl.style.display = "block";    
    divpl.innerHTML = pageLinks;
}