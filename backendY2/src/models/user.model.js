// User.js
export class User {
  constructor({ id, email, password, latitude, longitude, is_verified, verification_token }) {
    this.id = id ?? null;

    // Email doit être une string valide
    this.email = typeof email === 'string' ? email : null;

    // Password doit être hashé avant d’être assigné
    this.password = password ?? null;

    // Latitude / longitude sécurisées
    this.latitude = typeof latitude === 'number' ? latitude : null;
    this.longitude = typeof longitude === 'number' ? longitude : null;

    // Champ vérifié par défaut à false
    this.is_verified = !!is_verified;

    // Token de vérification sensible
    this.verification_token = verification_token ?? null;
  }

  /**
   * Retourne uniquement les champs safe pour l’API
   */
  toJSONSafe() {
    return {
      id: this.id,
      email: this.email,
      latitude: this.latitude,
      longitude: this.longitude,
      is_verified: this.is_verified,
    };
  }
}