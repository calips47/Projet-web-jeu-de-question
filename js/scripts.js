let xmlhttp = new XMLHttpRequest();
let nbPage = 0; 
let startIndex = 0; 
let endIndex = 0;
let pageSize = 10; 
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
    nbPage = x.length/pageSize;
    
}

function loadPage(pageNumber) {
    page = pageNumber;
    startIndex = (page*pageSize);
    endIndex = startIndex+pageSize;    
    displayDataTable();
} 

function affiche(i,x){
    let tab=""; 
    tab += "<tr>" 
        + "<td>" 
        + x[i].getElementsByTagName("id")[0].textContent 
        + "</td>" 
        + "<td>" 
        + x[i].getElementsByTagName("contenu")[0].textContent 
        + "</td>" 
        + "</tr>";
    return tab;
}

function displayDataTable() {
    let i; 
    let xmlDoc = xmlhttp.responseXML;    
    let x = xmlDoc.getElementsByTagName("question");
    let tab1 = "<tr><th>ID</th><th>Question</th></th></tr>"; 
    let tab2 = "<tr><th>ID</th><th>Question</th></th></tr>";
    let tab3 = "<tr><th>ID</th><th>Question</th></th></tr>";
    let tab4 = "<tr><th>ID</th><th>Question</th></th></tr>";
    

    for (i = startIndex; i < endIndex; i++) {        
        tab1 += affiche(i,x);
        tab2 += affiche(i+10,x);
        tab3 += affiche(i+20,x);
        tab4 += affiche(i+30,x);
    }
    
    document.getElementById("1").innerHTML = tab1;
    document.getElementById("2").innerHTML = tab2;
    document.getElementById("3").innerHTML = tab3;
    document.getElementById("4").innerHTML = tab4;

}   

function filterDataTable() {
    let i; 
    let xmlDoc = xmlhttp.responseXML;    
    let x = xmlDoc.getElementsByTagName("question");
    let slThematique = document.getElementById("thematique");
    let theme = slThematique.options[slThematique.selectedIndex].value;
    table ="<tr><th>ID</th><th>Question</th></tr>";    
        
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
    /*let divpl = document.getElementById("pageLinks");
    divpl.style.display = "block";    
    divpl.innerHTML = pageLinks;*/
}