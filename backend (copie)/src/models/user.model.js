export class User{  
    constructor ({id, email, password, latitude, longitude, is_verified, verification_token}) {

        this.id = id  ?? null;
        this.email = email ?? null;
        this.password = password ?? null;
        this.latitude = latitude ?? null;
        this.longitude = longitude ?? null;
        this.is_verified = is_verified || false;
        this.verification_token = verification_token || null
    }
 }