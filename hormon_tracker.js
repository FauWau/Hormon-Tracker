import fetch from "node-fetch"
import parse from "node-html-parser"
import nodemailer from "nodemailer"
import http from "http"
import fs from "fs"

import * as config from "./hormon_tracker_config.js"

/**
 * Schickt eine Email an den Nutzer, wenn die beobachteten Präparate auf Lager sind
 * und bietet eine entsprechende GUI über den Browser
 *
 * Momentan kompatibel mit:
 * - AstroVials
 * - Felicitas
 * - Serapharma
 *
 * @author FauWau
 * @version 1.0 
 * Letztes Update: 07.09.2026
*/



// Email-Modul initialisieren
var transporter = nodemailer.createTransport(config.mail_settings)

const file = fs.readFileSync("./hormon_tracker.html", (err, html) => {
        if(err) console.log(err)
})

let html = parse(file.toString())
let availableBefore = []
const len = Object.keys(config.sites).length


// Funktionen
/**
  * Lädt den Inhalt der Zielseite
  *
  * @param link = Link der Zielseite
  * @return: Zielseite als DOM Objekt | undefined falls Seite nicht gefunden
*/
async function getDom(link) {
	var response = await fetch(link)
	var foreignHtml = await response.text()
	return parse(foreignHtml)
}


/**
  * Filtert das DOM Objekt nach der vorrätigen Menge des Präparates
  *
  * @param document DOM Objekt der gesuchten Internetseite
  * @param provider Name der Internetseite
  * @return Seitentext zum Vorrat | undefined falls Aussage zu Vorrat nicht gefunden
*/
function filterDom (document, provider) {
	switch(provider) {
		case "Serapharma":
		case "AstroVials":
		case "Felicitas":
			var stock = document.querySelector(".stock")
			break
	}
	return stock
}

/**
  * Gibt die vorhandene Stückzahl zurück
  *
  * @param span Text mit Aussage über Stückzahl
  * @param provider Name der Internetseite
  * @return Stückzahl
*/
function inStock (span, provider) {
	switch(provider) {
		case "Serapharma":
		case "AstroVials":
		case "Felicitas":
		    	if(span.textContent.toLowerCase() != "out of stock") {
				return span.textContent.match("\d")[0]
			}
			break
	}
	return 0
}

/**
  * Sendet eine Email an die gewünschte Emailadresse falls Präparate vorrätig sind und Update die GUI entsprechend
  *
  * @param stock Vorhandene Stückzahl
  * @param site Informationen zur beobachteten Seite
  * @param i Index der beobachteten Seite in der Liste
  * @param availableBefore War das Präparat beim letzten Prüfen vorhanden?
*/
function notifyStock (stock, site, i, availableBefore) {
    	if(stock && !availableBefore[i-1]) {
			// Email vorbereiten
			var mailOptions = {
	    		from: config.mail_sender,
				to: config.mail_recipient,
				subject: site["name"] + " ist vorrätig",
				text: site["name"] + " ist auf " + site["provider"] + " verfügbar\n" + site["link"]
			}

			// Email absenden
			transporter.sendMail(mailOptions, function(error) {
    			if (error) {
        			console.log(error)
				} else {
					console.log("\x1b[92mEmail für " + site["name"].replace("&shy;") + " (" + site["provider"] + ") gesendet")
				}
			})
			// Update die GUI um Verfügbarkeit anzuzeigen
			html = html.replace("button" + i + " = 0", "button" + i + " = " + stock)
			availableBefore[i-1] = true
		} else {
			console.log(site["name"].replace("&shy;", "") + " (" + site["provider"] + ") ist nicht vorhanden")
    		// Update die GUI um Fehlen anzuzeigen
			html = html.replace("button" + i + " = \d", "button" + i + " = 0")
			availableBefore[i-1] = false
		}
}

/**
  * Fügt Schaltflächen auf der GUI ein
  *
  * @param site Informationen zur beobachteten Seite
  * @param i Index der beobachteten Seite in der Liste
*/
function addHtmlElements(site, i) {
	var buttonRow = html.querySelector("#button-row")
	buttonRow.appendChild(parse(
		"<a href=\"" + site.link + "\">" +
		"<div class=\"flex button\" id=\"" + i + "_1\" style=\"background-color: #fa5f5f\">" +
		"<h2>" + site.name + "</h2>" +
		"<h3>" + site.provider + "</h3>" +
		"<p id=\"" + i + "_2\">Nicht auf Lager</p>" +
		"</div>" +
		"<\a>"
	))
	var script = html.querySelector("script")
	script.set_content(
		"button" + i + " = 0\n" +
		"if(button" + i + ") {\n" +
                "\tdocument.getElementById(\"" + i + "_1\").style.backgroundColor = \"#5aed69\"\n" +
                "\tdocument.getElementById(\"" + i + "_2\").innerText = \"" + site["name"] + " auf Lager\"\n" +
                "}\n" +
		script.innerText
	)
}


// main()
try {
	// Füge Schaltflächen in GUI ein
	const len = Object.keys(config.sites).length
	for(let i = 1; i <= len; i++) {
		addHtmlElements(config.sites[i], i)
		availableBefore.push(false)
	}
	html = html.toString()

	// Starte den Server
	const server = http.createServer(async (request, response) => {
		response.writeHead(200, {
			'Content-Type': 'text/html'
		})
		response.write(html)
		response.end()
	})

	console.log("Starte Tracker")
	console.log("Suche nach " + len + " Präparaten")
	while(true) {
		for(let i = 1; i <= len; i++) {
			// Prüfe ob Seite erreichbar ist
			getDom(config.sites[i]["link"]).then( foreignHtml => {
				if(foreignHtml == undefined) {
					console.log("\x1b[91m" + config.sites[i]["provider"] + " ist nicht erreichbar")
				} else {
					// Suche nach der Aussage zum Vorrat
					var span = filterDom(foreignHtml, config.sites[i]["provider"])
					if(span == undefined) {
						console.log("\x1b[91mVorratsmenge bei " + config.sites[i]["provider"] + " nicht gefunden")
					} else {
						// Benachrichtige falls vorhanden den Nutzer
						notifyStock(
							inStock(
								span,
								config.sites[i]["provider"]
							),
							config.sites[i],
							i,
							availableBefore
						)
					}
				}
			})
		}

		server.listen(config.port)
		// Warte eine halbe Stunde
		await new Promise(resolve => setTimeout(resolve, 1800000))
		server.close()
		console.log("\n")
	}
} catch (err) {
	console.log(err)
} finally {
	console.log("Beende Tracker")
}
