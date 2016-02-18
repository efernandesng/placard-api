Placard-API
===========

A simple [placard](https://www.jogossantacasa.pt/web/Placard) API client library for node.js

## Installation

    npm install placard-api

## Example

    const placard = require('placard-api');

    placard.nextEvents((err, data)=> {
        console.log(data)
    })

    // or

    placard.nextEvents().then((data)=> {
        console.log(data)
    })

## Documentation

- **faq** - *List of Contents for Info*
- **fullSportsBook**
- **info**
- **nextEvents**


## License
[MIT](https://github.com/efernandesng/placard-api/blob/master/LICENSE.md)