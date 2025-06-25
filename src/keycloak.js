//src/keycloak.js
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    // URL ของ Keycloak ที่ต้องเปลี่ยน
    url: 'http://localhost:8081',
    realm: 'affiliate',
    clientId: 'affiliate-api',
    checkLoginIframe: false
});

export default keycloak;