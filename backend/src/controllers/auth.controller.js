import { AuthService } from "../services/auth.service.js";

export const AuthController = {
    async register (req, res, next){
        try {
            const {email, password } =req.body
            const userId = await AuthService.register(email, password)
            res.status(201).json({userId})
        } catch (error) {
            next(error)
        }
    },

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const token = await AuthService.login(email, password)
           res.status(200).json({token })
        } catch (error) {
            next(error)
        }
    },

      async verifyEmail(req, res, next) {
    try {
      const { token } = req.params;
      const user = await AuthService.verifyUser(token);

      if (!user) {
        return res.status(400).json({ message: "Token invalide ou expiré" });
      }

      return res.status(200).json({ message: "Email vérifié avec succès" });
    } catch (error) {
      next(error);
    }
  },
  
  
  async verifyUser(token) {
    const user = await userRepository.findByToken(token);
    if (!user) return null;

    await userRepository.updateVerification(user.id);
    return user;
  },




}