//variables declaration
var today = new Date().toLocaleDateString();

//constants declaration
const COOKIE_BANNER = document.getElementById('cb'),
    ALL_CB_BUTTONS = document.querySelectorAll('.cb-btn'),
    OPEN_CONFIG_BTN = document.getElementById('cb-config-btn'),
    ACCEPT_BTN = document.getElementById('cb-accept-btn'),
    REJECT_BTN = document.getElementById('cb-reject-btn'),
    BANNEROVERLAYWRAPPER = document.getElementById('cb-overlay');

//Check if the banner should be shown
function shouldBannerBeShown() {
    //Checking if the localStorage has cookie banner info
    if (localStorage.getItem('cookieBanner')) {
        var storedData = JSON.parse(localStorage.getItem('cookieBanner'));
        // Are all cookies accepted? If so, mantain the consent (gtag and dl.push) and return false to don't show the banner
        if (storedData.acceptedAllCookies) {
            gtag('consent', 'update', {
                'ad_storage': 'granted',
                'analytics_storage': 'granted',
                'functionality_storage': 'granted',
                'personalization_storage': 'granted',
                'security_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted'
            });
            return false;
        } 
        // Are cookies partially accepted or has the banner been shown today? If so, keep them denied and return false to don't show the banner
        if ((storedData.partiallyAccepted && storedData.lastSeen === today) ||
        storedData.lastSeen === today) {
            return false;
        }
    }
    return true;
}

//Function to toggle the visibility of several elems at the same time
function toogleVisibility(elems){
    elems.forEach(function(elem){
        elem.classList.toggle('cb-hidden');
    });
}

//Show banner
if (shouldBannerBeShown()) {
    BANNEROVERLAYWRAPPER.classList.remove("cb-hidden");
}

//Close banner when a user clicks some button
ALL_CB_BUTTONS.forEach(function(btn){
    btn.addEventListener('click', function(){
    toogleVisibility([BANNEROVERLAYWRAPPER]);
    });
});

//Accepting all the cookies when a user clicks "Accept all button"
ACCEPT_BTN.onclick= function(){
    //Send the consent update to GA4 and changes the gcs parameter value to indicate which kind of tracking is allowed
    gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted',
        'functionality_storage': 'granted',
        'personalization_storage': 'granted',
        'security_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
    });
    //Send the consent update to GTM to track it
    dataLayer.push({
        'event': 'cookie_consent_update',
        'ad_storage': 'granted',
        'analytics_storage': 'granted',
        'functionality_storage': 'granted',
        'personalization_storage': 'granted',
        'security_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
    });
    //Store the acceptance to get it when the page is reloaded
    var storedData = {
        lastSeen: today,
        acceptedAllCookies: true
    };
    
    localStorage.setItem('cookieBanner', JSON.stringify(storedData));
}

//Rejecting all the cookies when user click "Decline all button"
REJECT_BTN.onclick = function(){
    var storedData = {
        lastSeen: today
    };
    //Send the consent update to GA4 and mantaint/change the gcs parameter value to indicate that tracking is not allowed
    gtag('consent', 'default', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied',
        'functionality_storage': 'granted',
        'personalization_storage': 'denied',
        'security_storage':'denied'
      });
     //Send the consent update to GTM to track it  
    dataLayer.push({
        'event': 'cookie_consent_update',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied',
        'functionality_storage': 'granted',
        'personalization_storage': 'denied',
        'security_storage':'denied'
    });

localStorage.setItem('cookieBanner', JSON.stringify(storedData));
}
