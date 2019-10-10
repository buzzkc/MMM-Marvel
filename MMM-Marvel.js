/* global Module */

/* Magic Mirror
 * Module: MMM-Marvel
 *
 * By Buzz Kc
 * MIT Licensed.
 */

Module.register("MMM-Marvel", {
	defaults: {
		updateInterval: 60000,
		retryDelay: 5000,
		publicKey: '',
		privateKey: '',
		characters: []
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror
	
	currentCharacter: 0,

	start: function() {
		var self = this;
		var dataRequest = null;
		var data = null;

		//Flag for check if module is loaded
		this.loaded = false;

		this.sendConfig();
		//this.getData();

		// Schedule update timer.
		this.scheduleUpdate(2000);
	},

	sendConfig: function() {
		this.sendSocketNotification('MMM-Marvel_SEND_CONFIG', this.config);
	},

	/*
	 * getData
	 * function example return data and show it in the module wrapper
	 * get a URL request
	 *
	 */
	getData: function() {
		//iterate through character list each time
		var hero = this.config.characters[this.currentCharacter];

		this.currentCharacter = this.currentCharacter + 1 ;
		if (this.currentCharacter === this.config.characters.length) {
			//reached length of characters, reset to first
			this.currentCharacter = 0;
		}
		
		this.sendSocketNotification("MMM-Marvel_GET_DATA", hero);
	},



	/* scheduleUpdate()
	 * Schedule next update.
	 *
	 * argument delay number - Milliseconds before next update.
	 *  If empty, this.config.updateInterval is used.
	 */
	scheduleUpdate: function(delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}
		nextLoad = nextLoad ;
		var self = this;
		setTimeout(function() {
			self.getData();
			self.scheduleUpdate();
		}, nextLoad);
	},

	getDom: function() {
		var self = this;

		// create element wrapper for show into the module
		var wrapper = document.createElement("div");
		// If this.dataRequest is not empty
		if (this.data && this.data.length > 0) {
			
			//image of character
			var imgDataRequest = document.createElement("IMG");
			imgDataRequest.src = this.data[0].thumbnail.path + '/portrait_incredible.' + this.data[0].thumbnail.extension;
			imgDataRequest.className = 'marvelThumbnail'
			//name of character
			var wrapperDataRequest = document.createElement("div");
			wrapperDataRequest.innerHTML = this.data[0].name;
			wrapperDataRequest.className = 'marvelCharacterName';

			//description of character
			var descriptionDataRequest = document.createElement("div");
			descriptionDataRequest.innerHTML = this.data[0].description
			descriptionDataRequest.className = 'marvelDescription'

			
			wrapper.appendChild(imgDataRequest);
			wrapper.appendChild(wrapperDataRequest);
			wrapper.appendChild(descriptionDataRequest);
		}

		return wrapper;
	},

	getScripts: function() {
		return [];
	},

	getStyles: function () {
		return [
			"MMM-Marvel.css",
		];
	},

	// Load translations files
	getTranslations: function() {
		//FIXME: This can be load a one file javascript definition
		return {
			en: "translations/en.json",
			es: "translations/es.json"
		};
	},

	processData: function(data) {
		var self = this;
		this.dataRequest = data;
		if (this.loaded === false) { self.updateDom(self.config.animationSpeed) ; }
		this.loaded = true;

		// the data if load
		// send notification to helper
		this.sendSocketNotification("MMM-Marvel-NOTIFICATION_TEST", data);
	},

	// socketNotificationReceived from helper
	socketNotificationReceived: function (notification, payload) {
		if(notification === "MMM-Marvel_Data_Received") {
			// set dataNotification
			this.data = payload;
			console.log("data:");
			console.log(this.data);
			this.updateDom();
		}
		//messages to display in console from node_helper and other backend processes.
		if (notification === "MMM-Marvel_Console_Output") {
			console.log("OUTPUT_LOG:");
			console.log(payload);
		}
	},
});
