Web Avancé Front
Examen du 5 Mars 2024

Mise en pratique des connaissances accumulées au cours du module. Le travail sera à restituer sur un repo github et sera à remettre avant 17h, tout commit passé ce délais ne seront pas pris en compte dans la notation.

MALUS : Il est attendu qu'un code lisible et indenté soit restitué, dans le cas contraire jusqu'à 5 points peuvent être substitué à la note finale.
Exercice 1
Objectif : Mettre en place un projet angular.

Règles de Gestions
Faire une installation locale d'angular
Installer la version 17.2
Créer un nouveau projet angular : nom_prenom_BA3
Exercice 2
Objectif : créer une SAP d'un site e-commerce Le nom du site à développer est libre

Règles de Gestions
L'application contient 3 pages :
Page d'accueil
Page racine du site
Contient la liste des articles du site
Page panier
accessible depuis la page d'accueil
Page checkout
La structure des pages doit contenir
Un header avec l'attribut role="banner"
Un menu de navigation principal
Un main
Exercice 3
Objectif : Alimenter la page d'accueil et récupérer la liste des articles disponible à l'adresse [https://www.eleguen.ovh/api/v1/articles]

Règles de Gestions
Créer un service EcommerceService qui soccupera des communication http
Créer une interface IArticle à partir du jeu de données récupéré
Implémenter l'appel API GET pour récupérer la liste des articles
Afficher la liste récupérée sous la forme de tuiles
Chaque tuile doit contenir les informations suivante
Nom de l'article (Name)
Photo de l'article (Closet Image)
Saison (Seasonal Availability)
Prix (Buy)
Chaque tuile doit implémenter les fonctions suivante
Choix de la quantité : 1 par défaut, valeur minimal
Ajouter au panier
Cas 1 : Créé une entrée dans le panier avec la quantité choisi
Cas 2 : Si une entrée existe déjà dans le panier, ajoute la quantité choisi en plus de l'existante
Ne s'affiche que si une entrée correspondante dans le panier, Supprime l'entrée du panier
Bonus : Cliquer sur une tuile ouvre une modale offrant plus d'informations sur l'article (choix libre sur les informations à afficher, suggestions : Source et Style) et intègre les fonctionnalités panier
Exercice 4
Objectif : Restituer la liste des éléments présent dans le panier.

Règles de Gestions
Créer une interface IArticlePanier
id: id de l'article
name: Le nom de l'article
quantity: La quantité
price: Le coût unitaire
totalPrice: Le coût final
Chaque article dans le panier est listé et affiches ses attributs comme définit dans IArticlePanier
Pour chaque article il est possible de modifier la quantité, le coût global étant recalculer à la volée.
Pour chaque article il est possible de supprimer l'article du panier
Implémenter 3 actions sur cette page
Retourner à la liste des articles
Continuer vers le checkout
Vider le panier
Bonus : Cliquer sur 'Vider le panier' ouvre une modale demandant la confirmation de l'action
Exercice 5
Objectif : Concevoir la page de checkout

Règles de Gestions
Créer le formulaire de prise d'information de l'utilisateur
nom
prénom
adresse
code postal
ville
numéro de carte (on ne renseigne pas de vraie carte svp)
date de validité de la carte
Créer l'interface IUser avec
lastname : nom
firstname : prénom
adress : adresse
zipcode: code postal
city: ville
card : numéro de carte
cardDate : date de validité de la carte
Intégrer la validation du formulaire (Reactive Forms)
tous les champs sont obligatoires
Le code postal est une chaine de caractères constitué de 5 chiffres
Le numéro de carte est une chaine de caractères constitué de 16 chiffres
La date de validité de la carte ne peut être antérieur à la date du jour
Le formulaire possède 2 actions
Annuler la commande : vide le panier et redirige vers la page d'accueil
Confirmer la commande : envois la commande (panier + info utilisateur) en appelant le service EcommerceService, en cas de succès vide le panier puis redirige vers l'accueil, en cas d'erreur on reste sur la page et le panier ne bouge pas
Ajouter au service existant l'appel API POST pour envoyer la commande
Le endpoint est [https://www.eleguen.ovh/api/v1/purchase]
Le corps bodyde la requête attendu par le server est la suivante : `{panier: IArticlePanier[], user: IUser}
Si la commande est validée (le format reçu par le server est OK) statutcode = 201 [https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201]
Si la commande n'est pas validé (le format reçu par le server est KO ou le body est absent) statutcode = 400 [https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400]
Bonus : Signaler le succès ou l'echec de la transaction avec un message adapté (avant ou après la redirection dans le cas du succès)