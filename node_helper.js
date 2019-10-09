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
		if (notification === 'MMM-Marvel_SEND_CONFIG') {
			config = payload;
			marvel = new Marvel({publicKey: this.publicKey, privateKey: this.privateKey});
			characters = this.config.characters;
		}

		if (notification === "MMM-Marvel_GET_DATA") {

		}
	},


});
