# projet-tutore-s6 (rendu final)

## Fichiers du projets

    .
    ├── backend                  # API symfony
    ├── config                   # Fichiers de config pour logstash
    ├── frontend                 # Site react
    └── README.md                # Tutoriel d'installation du projet


## Ajout des index via logstash

Prérequis : Elastisearch, Logstash et Java

Il est recommendé d'ajouter le chemin vers le /bin de logstash et d'elastisearch dans le path dans les variable d'environement pour la suite de l'installation.


### Structure de fichiers

    .
    ├── conf_files                   # Fichiers de config pour logstash
    └── steam_csv                    # Fichiers csv contenant les données


### Configuration du "path" vers les fichiers .csv

Logstash a besoin du chemin absolu pour ses fichiers d'entrée.

Dans chaque fichier .conf se trouvant dans conf_files ajouter le chemin absolu vers le fichier .csv correspondant :

```conf
input {
    file {
        path => "c:/chemin_absolu_vers/steam_csv/steam_support_info.csv" # exemple ici on pointe vers le fichier steam_support_info.csv
        start_position => "beginning"
        sincedb_path => "NULL"
    }
}
```

(il faut aussi faire attention à bien remplacer les "\\" par "/" sous windows)


### Ajout des index avec logstash

Maintenant que le path a été mis à jour dans tous les fichier de configuration logstash, il faudra ouvrir un invite de commande dans le dossier où se trouvent les fichiers .conf

Une fois l'invite de commande ouvert, il faudra entrer la commande suivante en indiquant le nom du fichier .conf que vous voulez utiliser :
```
logstash -f ./steam_support_info.conf   # encore une fois avec l'exemple de steam_support_info.conf, il faudra lancer la commande pour chaques fichier de config.
```

Cette opération peux prendre plusieurs minutes, voir plusieurs dizaines de minutes pour certains fichiers csv.

Une fois l'ajout des index à elastisearch terminé, il va falloir maintenant installer le backend et le frontend sur la machine.



## Installation du serveur symfony

Prérequis : PHP 7.4.* et composer ( pour php on pourra utiliser wampserver sur windows par exemple )

Si un virtual host est créé, il sera important de bien noter le nom et le port de ce dernier ( ex : steamapi:81 )

### Extraction et installation du serveur symfony

Le serveur symfony se trouve dans le fichier backend, ouvrez un terminal dans ce dossier et entrez la commande suivante :
```
composer install
```

Cela installera tous les composants recquis au fonctionnement du serveur.
Une fois la commande effectuée et le virtual host mis en place le serveur est près à être utilisé.
Il faudra aussi qu'elasticsearch soit lancé pour pouvoir utiliser l'api.


## Installation du site react

Prérequis : Node, npm et serve (installé avec la commande ```npm install -g serve``` ).

### Configuration de l'adresse de l'api

Dans le dossier ```frontend/src/config``` se trouve un fichier config.json.
Dans ce fichier, cherchez la ligne "path" et indiquez le nom de l'hôte de l'api :

```
{
    "path" : "steamapi:81"          # pour reprendre l'exemple précédent si l'hôte est "http://steamapi:81/" entrez "steamapi:81"
}
``` 


### Extraction et installation du site react

Le site react se trouve dans le dossier frontend, ouvrez un terminal dans ce dossier et entrez la commande suivante :
```
npm install
```

npm installera toutes les dépendances du projet.
Une fois cette étape terminée il ne restera plus qu'a lancer les commandes suivantes :
```
npm run build       # Cette commande va construire le site
...
serve -s build      # Cette commande va lancer le build qui sera hébergé localement et accessible via un navigateur sur le PC
```
