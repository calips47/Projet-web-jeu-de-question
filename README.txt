Question n°1 :
Halffheim c'est le monde des morts, l'enfer des nordiques 
Asgard est éffectivement le monde des dieux nordiques
Jothuneim est le monde des géants

Explication de displayDataTable:
  	let i; //initialise le compteur qui parcours la base de donnée de questions.
        let xmlDoc = xmlhttp.responseXML;    //Permet de récupérer le contenue du fichier bdd.xml
        let table = "<tr><th>ID</th><th>Question</th><th>Answers</th><th>Thématique</th></tr>";  //initialisation de la variable qui va servir à modifier le contenu à l'affichage de la table.  
        let x = xmlDoc.getElementsByTagName("question"); // initialisation de la variable qui va parcourir les instances de la base de données.
        
	//La boucle qui parcours les éléments de la base de données et qui recupère à chaque question, la question, l'id de la question, la réponse, la thématique et peut-être plus plus tard.
        for (i = 0; i < x.length; i++) {        
            table += "<tr>" 
            + "<td>" 
            + x[i].getElementsByTagName("id")[0].textContent 
            + "</td>" 
            + "<td>" 
            + x[i].getElementsByTagName("contenu")[0].textContent 
            + "</td>" 
            + "<td>" 
            + x[i].getElementsByTagName("r1")[0].textContent+"<br>"
            + x[i].getElementsByTagName("r2")[0].textContent+"<br>"
            + x[i].getElementsByTagName("r3")[0].textContent +"<br>"
            + "</td>" 
            +"<td>"+x[i].getElementsByTagName("thematique")[0].textContent+"</td>"
            + "</tr>";
        }
        
        document.getElementById("data").innerHTML = table; //modification du code html de l'objet html "table" pour afficher la table de données.
        let slThematique = document.getElementById("thematique"); 
        let theme = slThematique.options[slThematique.selectedIndex].value; //la récuperationd de la thématique choisie par l'utilisateur.
        alert(theme); //affiche la thématqiue dans une pop-up box.

