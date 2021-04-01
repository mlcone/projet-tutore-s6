# projet-tutore-s6


## Ajout des index via logstash

Requis : Elastisearch, Logstash et Java

### Structure de fichier

    .
    ├── conf_files                   # Fichiers de config pour logstash
    └── steam_csv                    # Fichiers csv contenant les données


### Configuration du "path" vers les fichiers csv

Logstash a besoin du chemin absolu pour ses fichiers d'entrée.

```conf
input {
    file {
        path => "chemin_absolu_vers/steam_csv"
        start_position => "beginning"
        sincedb_path => "NULL"
    }
}
```

(il faut aussi faire attention à bien remplacer les "\" par "/" sous windows)


