# MMM-Marvel

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

This module displays comic character and book information.

Register for your free keys at [Marvel's](https://developer.marvel.com/) developer website. 

![](./images/MMM-Marvel.png)

## Dependencies

* An installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)
* npm
* [marvel](https://www.npmjs.com/package/marvel) node library

## Installation
### Setup the MagicMirror module
```bash
cd ~/MagicMirror/modules
git clone https://github.com/buzzkc/MMM-Marvel.git
cd MMM-Marvel
npm install
```
### Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'MMM-Marvel',
            header: 'Favorite Heros',
            position: 'top_right',
            config: {
                // See below for configurable options
                publicKey: 'yourPublicKeyHere', //register for keys at https://developer.marvel.com/
                privateKey: 'yourPrivateKeyHere',
                characters: [
                    'Hulk',
                    'Spider-Man',
                    'Thor'
                ],
                updateInterval: 30000 //Marvel allows 3,000 requests a day per key.
            }
        }
    ]
}
```

### Configuration options

| Option           | Description
|----------------- |-----------
| `publicKey`      | *Required* Public Key for Marvel API
| `private`        | *Required* Private Key for Marvel API
| `characters`     | *Required* Array of character names
| `updateInterval` | *Optional* Frequency to update information  <br><br>**Type** `int`(milliseconds)<br> Default: 60000 (one minute)


## Future Enhancements
* List of characters


## Thanks To
* MichMich for developing [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)
* swang for the [Marvel node](https://www.npmjs.com/package/marvel) api library
