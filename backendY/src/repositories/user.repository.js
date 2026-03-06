import { db } from "../config/db.js";

export const userRepository = {
  // la creation d'un utilisateur

  async create(user) {
    const [result] = await db.execute(
      `INSERT INTO users (email, password ,verification_token) VALUES (?, ? , ? ) `,
      [user.email, user.password, user.verification_token],
    );
    return result.insertId;
  },

  // trouver un utilisateur par rapport a sont email

  async findByEmail(email) {
    const [rows] = await db.execute(`SELECT * FROM users WHERE email = ? `, [
      email,
    ]);

    return rows[0];
  },

  // chercher un token

  async findByToken(token) {
    const [rows] = await db.execute(
      `SELECT * FROM users WHERE verification_token = ?`,
      [token],
    );
    return rows[0];
  },

  // l'update aprés verification

  async updateVérification(userId) {
    await db.execute(
      `UPDATE users SET is_verified = 1, verification_token = NULL WHERE id = ?  `,
      [userId],
    );
  },

  // mettre a jour la localisation de l'utilisateur
  async updateLocation(userId, lat, lng) {
    await db.execute(
      `UPDATE user SET latitude = ?, longitude = ? , last_seen= NOW() WHERE id = ?`,
      [lat, lng, userId],
    );
  },

  // récuperer la position d'es utilisateur chaque 3 minutes
  async getActiveUsers() {
    const [rows] = await db.execute(
      `SELECT id , email , latitude, longitude FROM users WHERE last_seen > NOW() - INTERVAL 3 MINUTE`,
    );
    return rows;
  },

  async findByToken(token) {
    const [rows] = await db.execute(
      `SELECT * FROM users WHERE verification_token = ?`,
      [token],
    );
    return rows[0];
  },

  async updateVerification(userId) {
    await db.execute(
      `UPDATE users SET 	is_verified = 1, verification_token = NULL WHERE id = ?`,
      [userId],
    );
  },
};
