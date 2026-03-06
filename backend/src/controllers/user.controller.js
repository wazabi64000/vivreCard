import { userRepository } from "../repositories/user.repository.js";

 

export const UserController = {
  async updateLocation(req, res, next) {
    try {
      const { latitude, longitude } = req.body;
      await userRepository.updateLocation(
        req.user.id,
        latitude,
        longitude
      );
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  },

  async getActiveUsers(req, res, next) {
    try {
      const users = await userRepository.getActiveUsers();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }
};