import { db } from "../config/db.js";

export const userRepository = {
  // la creation d'un utilisateur

  async create(user) {
    const [result] = await db.execute(
      `INSERT INTO users (email, password ,verification_token) VALUES (?, ? , ? ) `,
      [user.email, user.password, user.verificationToken],
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
      `SELECT id , email , latitude, longitude, FROM users WHERE last_seen > NOW() INTERVAL 3 MINUTE`,
    );
    return rows;
  },
};
