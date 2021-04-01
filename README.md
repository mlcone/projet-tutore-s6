# projet-tutore-s6


## Ajout des index via logstash

Requis : Elastisearch, Logstash et Java

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

(il faut aussi faire attention à bien remplacer les "\" par "/" sous windows)


