# Movie collection app

Project movie collection: Semester 4 Web-Applications

## Auteurs

- Ralph van der Have
- Lennart Harmes
- Danny Hoogeveen

## URL Gitlab

https://thuas.gitlab.io/dt-webapplications/wa-2122-s4/intervisiegroepen/groep-5/featherweightheroes

## URL Azure

https://featherweightheroes2.azurewebsites.net (backend)

## Versiegeschiedenis

(Back-end)

- 0.0 Project aangemaakt en initial commit gedaan. Onnidige bestanden verwijderd.
- 0.1 Begin gemaakt back-end (Express) en deployment op Azure
- 0.11 Sequelize geinstalleerd + connectie met Azure db gemaakt
- 0.12 models aangemaakt, routes aangemaakt, controller voor user object gemaakt
- 0.13 postman tests toegevoegd voor user object
- 0.14 collection/routes gemaakt voor Movie en Collection objects
- 0.2 Kolommen gekoppeld (many to many en one to many relaties)
- 0.21 endpoints toegevoegd om films aan collectie toe te voegen of te verwijderen
- 0.3 auth/login functionaliteit toegevoegd
- 0.31 endpoint toegevoegd om collectie op te halen incl alle films in die collectie
- 0.32 endpoint toegevoegd om alle collecties van een user op te vragen

(Front-end)

- 0.0 Project aangemaakt en initial commit gedaan. Onnodige bestanden zijn verwijderd.
- 0.1 Header en footer component gemaakt.
- 0.1.1 Populair movies kunnen opgehaald worden uit de API en er is mogelijk om de details van een film te zien.
- 0.2 Nieuwe menu optie is toegevoegd waar je je collecties kunt zien en de categorieen.
- 0.3 Registreer optie is toegevoegd.
- 0.3.1 Header is aangepast. Hier is met verschillende dropdown opties te zien waar je naartoe kunt navigeren
- 0.4 Toevoegen van de upcoming movie lijst. Ook now playing lijst is toegevoegd.
- 0.5 Registratie optie werkend gemaakt inclusief het aanmaken van een collection list en wantlist.
- 0.6 Login optie werkend gemaakt
- 0.7 Eerste versie Profielpagina gemaakt
- 0.8 Films toevoegen aan je collectie afgerond
- 0.9 Films toevoegen aan je wantlist afgerond

## Endpoints

- GET ~/admin/check

- GET ~/users (collection)
- GET ~/users/:id (specific user)
- POST ~/users (create new user, incl duplicate check)
- DELETE ~/users/:id (delete specific user)
- UPDATE ~/users/:id (update specific user)
- POST ~/users/login (login user using email & password)

- GET ~/auth (authorization of user)

- GET ~/movies(collection)
- GET ~/movies/:id (specific movie)
- POST ~/movies (create new movie)
- DELETE ~/movies/:id (delete specific movie)
- UPDATE ~/movies/:id (update specific movie)

- GET ~/collections (collection)
- GET ~/collections/:id (specific collection)
- POST ~/collections (create new collection)
- DELETE ~/collections/:id (delete specific collection)
- UPDATE ~/collections/:id (update specific collection)
- GET ~/users/collections/:id (get collections of specific user by user ID)
- GET ~/getCollectionWithMovies/:id (get collections with all movies in the collection)

- POST ~/collectionsMovies (body: movieID, collectionID - add movie to collection)
- DELETE ~/collectionsMovies (body: movieID, collectionID - remove movie from collection)

## Postman

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/19947940-7afc5961-acff-479f-8f5b-ca7d76a7b745?action=collection%2Ffork&collection-url=entityId%3D19947940-7afc5961-acff-479f-8f5b-ca7d76a7b745%26entityType%3Dcollection%26workspaceId%3D559f1b0c-3089-47bf-99c2-716935856b76)

## Status

90% gereed van de eindversie

## Known issues

Na het verwijderen van een film uit de wantlist of de collection wordt de film nog niet direct uit de table verwijderd. Na het verversen van de pagina is deze wel verdwenen uit de lijst. Dit zullen we in sprint 4 gaan verwerken.

## Vervolgstappen

Zie board Gitlab sprint 4

## Extra informatie

Niet van toepassing

## Credits

Weibenfalk voor het maken van de tutorial op youtube om het zo een stuk makkelijk te maken.
