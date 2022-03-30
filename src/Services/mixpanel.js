import mixpanel from 'mixpanel-browser';
var mixpanelToken
if (process.env.NODE_ENV == "production") {
    mixpanelToken = "037fdbda99bc3fe62a94ec541b06d749";
} else {
    mixpanelToken = "5510edbc11d8e6077735bbdb8cf9a9d6";
}
mixpanel.init(mixpanelToken, { debug: true, ignore_dnt: true });

export default function Mixpanel(purpose, buttonName) {
    console.log(purpose, buttonName);
    mixpanel.track(purpose, {
        'source': buttonName,
    });
}