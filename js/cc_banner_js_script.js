//variables declaration
var today = new Date().toLocaleDateString();

//constants declaration
const COOKIE_BANNER = document.getElementById('cb'),
    ALL_CB_BUTTONS = document.querySelectorAll('.cb-btn'),
    OPEN_CONFIG_BTN = document.getElementById('cb-config-btn'),
    ACCEPT_BTN = document.getElementById('cb-accept-btn'),
    REJECT_BTN = document.getElementById('cb-reject-btn'),
    BANNEROVERLAYWRAPPER = document.getElementById('cb-overlay');