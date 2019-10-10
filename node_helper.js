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
		}

		if (notification === "MMM-Marvel_GET_DATA") {
			self.sendSocketNotification('MMM-Marvel_Console_Output', payload);
			this.marvel.characters
				.name(payload)
				.get(function(err, resp) {
					if (err) { self.sendSocketNotification('MMM-Marvel_Console_Output', err)}
					else { 
						self.sendSocketNotification('MMM-Marvel_Console_Output', resp);
						self.sendSocketNotification('MMM-Marvel_Data_Received', resp);
					}
				})
		}
	},


});
