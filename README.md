# Chat Application

## Installation der Node.js Abhängigkeiten:
Installiert alle Abhängigkeiten, die in der package.json-Datei angegeben sind. Diese werden in das Verzeichnis node_modules kopiert.

npm install

## bower installieren

npm install -g bower

## Installation der Frontend-Abhängigkeiten:
Installiert alle Abhängigkeiten, die in der bower.json-Datei angegeben sind. Diese werden in das Verzeichnis bower_components kopiert.

bower install

## Grunt installieren

npm install -g grunt-cli

## Start des Servers:
Führt den Node.js-Webserver aus. Dieser ist erreichbar über http://localhost:8080

node index.js

## Ausführung der grunt-Tasks:
Führt den angegebenen beziehungsweise den default-Task aus. Die Tasks werden in der Gruntfile.js konfiguriert.

grunt [<task>]