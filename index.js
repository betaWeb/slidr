const Slidr = require('./build/main/Slidr')

if (!('Slidr' in window)) {
    window.Slidr = Slidr
}
