/**
 * Konfigurationsdatei für den Hormon Tracker
 * Leere Anführungszeichen müssen ausgefüllt werden
 * 
 * @author FauWau
 * @version 1.0
 * Letztes Update: 07.09.2026
*/

// Wartezeit zwischen Prüfungen in ms
// Sollte wegen möglicher IP-Sperre der Seite nict zu niedrig gesetzt werden
export const waitTime = 1800000 //1800000 ms = 30 min


// Server Einstellungen
export const port = 8080

// Mail Einstellungen
export const mail_settings = {
	service: "",
	auth: {
    		user: "",
    		pass: ""
	}
}

export const mail_sender = ""
export const mail_recipient = ""


// Watchlist Einstellungen
/*
 * name: Name des Päparats
 * provider: Name der Internetseite
 * link: Link zur Internet
 */
// Immer auf Kommata beim Einfügen neuer Einträge achten!
export const sites = {
	1: {
		name : "Estradiol Enanthat mit MTC",
		provider : "AstroVials",
		link : "https://astrovials.com/product/estradiol-enanthate/"
	},
	2: {
		name : "Estradiol Enanthat mit Rizinus",
		provider : "AstroVials",
		link : "https://astrovials.com/product/estradiol-enanthate-castor/"
	},
	3: {
		name: "Estradiol Enanthat mit MTC",
		provider: "Serapharma",
		link: "https://serapharma.net/product/estradiol-enanthate/"
	},
	4: {
		name: "Estradiol Enanthat mit Trauben&shy;samen",
		provider: "Serapharma",
		link: "https://serapharma.net/product/estradiol-enanthate-grape-seed-oil/"
	},
	5: {
		name: "Estradiol Enanthat mit MTC",
		provider: "Felicitas",
		link: "https://flcts.eu/products/estinj/estradiol-enanthate-mct-10ml/"
	},
	6: {
		name: "Estradiol Enanthat mit Trauben&shy;samen",
		provider: "Felicitas",
		link: "https://flcts.eu/products/estinj/estradiol-enanthate-grape-10ml/"
	}
}
