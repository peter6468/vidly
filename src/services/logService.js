//import Raven from 'raven-js';

function init() {
//  
}

function log(error) {
    //Raven.captureException(error)
    console.error(error);
}

export default {
    init,
    log
}