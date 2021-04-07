# projet-tutore-s6


## Ajout des index via logstash

Prérequis : Elastisearch, Logstash et Java

Il est recommendé d'ajouter le chemin vers le /bin de logstash et d'elastisearch dans le path dans les variable d'environement pour la suite de l'installation.


### Structure de fichier

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

Cette opération peux prendre plusieurs minutes.

Une fois l'ajout des index à elastisearch terminé, il va falloir maintenant installer le backend et le frontend sur la machine.


## Installation du Back-End



