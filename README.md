# Hormon Tracker

Dieses Programm bietet einen simplen, personalisierbaren Tracker zur Verfügung, der die Bestände von Hormonpräparaten in Online-Shops prüft.
Um den Nutzer zu informieren gibt eine über den Browser zugreifbare GUI und die Versendung von EMails.

Getestet und entwickelt wurde unter Linux auf einem Raspberry Pi Zero W 1.1 mit der Node Version 24.20.0


## Installation

Im folgenden werden die zur Nutzung notwendigen Installationsschritte beschrieben. 

1. Projekt Herunterladen
Das Projekt wird auf GitHub auf der Seite `https://github.com/FauWau/Hormon-Tracker/tree/master` verwaltet. Um es herunterzuladen nutzt man die Schaltfläche `Code` und kllickt unten auf `Download ZIP`. Wenn der ZIP-Ordner heruntergeladen ist, muss man den Inhalt in einen leeren Ordner entpacken.  

2. Installieren von NodeJS und NodePackageManager
Für alle gängigen Betriebssysteme findet sich auf der Seite `https://nodejs.org/en/download` der entsprechende Installer für NodeJS. Dieser muss entsprechend des eigenen Systemes ausgewählt, heruntergeladen und ausgeführt werden. NPM ist im Download inbegriffen.

3. Installieren der Node-Packete
Zuerst muss man die Konsole zu öffnen. Dafür öffnet man unter den gängigen Betriebssystemen die Suchleiste und sucht nach der Anwendung `Terminal`. In der Konsole wechselt man in den Ordner mit den Projektdatein mit dem Befehl `cd Pfad/zum/Ordner` und anschließendem Bestätigen mit der Enter-Taste. Anschließend gibt man in die Konsole `npm install` ein. 

4. Hintergrundnutzung ermöglichen
Um die Nutzung im Hintergrund zu ermöglichen verwendet dieses Projekt TMux. Die Installationsanleitung befindet sich auf `https://tmux.app/#install-heading`.  Um TMux zu starten gibt


## Programm starten

1. Terminal öffnen und Verzeichnis wechseln
Das Terminal-Öffnen erfolgt genau so wie zuvor beschrieben, ebenso wie der Wechsel in den korrekten Ordner.

2. Aktivieren von TMux 
Dafür muss nur der Befehl `tmux` eingegeben und bestätigt werden. Am unteren Bildschirmrand sollte nun ein grüner Rand sein.

3. Tracker starten
Zum Starten benötigt man den Befehl `node hormon_tracker.js`. In der Konsole sollten nun Statusinformationen erscheinen.


## OPTIONAL - Den Tracker über einen Raspberry Pi laufen lassen

Um sich über den eigenen PC mit dem Pi zu verbinden wird die Konsolenanwendung `ssh` benötigt.

1. ssh auf dem Pi aktivieren
Um sich per ssh (also Fernverbindung) mit einem Gerät verbinden zu können, muss auf diesem erst der ssh-Zugriff erlaubt werden. Für die Raspberry Pis findet sich hier ein Tutorial `https://www.elektronik-kompendium.de/sites/raspberry-pi/1906281.htm`.

3. Die Dateien auf den Pi kopieren
Hier gibt es zwei Ansätz: Wenn man mit der Nutzung von Git vertraut ist, kann man den Code direkt auf den Pi kopieren. Falls nicht gibt man am eigenen PC vom korrekten Ordner aus den Befehl `scp . NUTZERNAME@IP_DES_ZIELS:ZIELORDNER` ein.

2. Per ssh verbinden
Um sich zu verbinden, gibt man in die Kommandozeile `ssh NUTZERNAME@IP_DES_ZIELS` ein. Anschleißend muss noch, falls festgelegt, ein Passwort eingegeben werden. An dieser Stelle nicht wundern: in Linux-Konsolen wird das Passwort während der Eingabe nicht anzeigen. Anschließend sollte am Anfang der aktuellen Zeile der Name des Pis angezeigt werden.

3. Den Tracker starten
Nun fährt man wie zuvor fort ab Schritt 2 des vorherigen Abschnittes.


## TODO
- [ ] Zusätzliche Sprachen
- [ ] Unterstützung für mehr Anbieter