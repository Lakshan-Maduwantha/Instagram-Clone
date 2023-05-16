const UserService = require('../services/userService');
const userService = new UserService();

class UserController {
  async signup(req, res) {
    const { email, password, name, username, bio, profilePicture, website, phoneNumber } = req.body;

    try {
      const { user, token } = await userService.signup(email, password, name, username, bio, profilePicture, website, phoneNumber);
      res.json({ user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const { user, token } = await userService.login(email, password);
      res.json({ user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateUser(req, res) {
    const userId = req.params.id;
    const updates = req.body;

    try {
      const user = await userService.updateUser(userId, updates);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = UserController;
