/* Magic Mirror
 * Node Helper: MMM-Marvel
 *
 * By Buzz Kc
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var Marvel = require('marvel');
var marvel;
var config;
var characters;

module.exports = NodeHelper.create({

	socketNotificationReceived: function(notification, payload) {
		var self = this;
		if (notification === 'MMM-Marvel_SEND_CONFIG') {
			this.config = payload;
			this.marvel = new Marvel({publicKey: this.config.publicKey, privateKey: this.config.privateKey});
			this.characters = this.config.characters;
		}

		if (notification === "MMM-Marvel_GET_DATA") {
			this.marvel.characters
				.name(this.characters[0])
				.get(function(err, resp) {
					if (err) { self.sendSocketNotification('MMM-Marvel_Console_Output', err)}
					else { self.sendSocketNotification('MMM-Marvel_Console_Output', resp) }
				})
		}
	},


});
