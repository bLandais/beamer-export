#Beamer Export
### Introduction
Cet outil sert à exporter en PDF les diapos codé via le moteur "*beamer.js*" ([disponible sur GitHub](https://github.com/CedricDinont/Beamer.js))

### Instructions

* Pour Linux (testé sur Debian):

  * [PhantomJS](http://phantomjs.org/download.html)
  * ImageMagick :
    ```
    apt-get install imagemagick
    ```
  * Utilisation:
    * Modifier l'URL du cours dans le fichier ```script.js```
    * Et ensuite:
  ```
    chmod +x start.sh
    ./start.sh
  ```
