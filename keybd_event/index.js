function WindowsKeybd_eventModule() {
    const keybd_event = require('bindings')('keybd_event');
    this.pause = () => {
        keybd_event(function (msg) {
            console.log(msg);
            // Prints: 'hello world'
        });
    }

    this.play = () => {
        keybd_event(function (msg) {
            console.log(msg);
            // Prints: 'hello world'
        });
    }
}
module.exports = WindowsKeybd_eventModule;

