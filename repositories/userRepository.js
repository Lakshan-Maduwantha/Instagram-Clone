const User = require('../models/user');

class UserRepository {
  async findById(id) {
    return User.findByPk(id);
  }
  async createUser(email, password, name, username, bio, profile_picture, website, phone_number) {
    const user = await User.create({ email, password, name, username, bio, profile_picture, website,  phone_number });
    return user;
  }

  async findByEmail(email) {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  async updateUser(userId, updates) {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error('User not found');
    }

    if (updates.name) {
      user.name = updates.name;
    }

    if (updates.username) {
      user.username = updates.username;
    }

    if (updates.bio) {
      user.bio = updates.bio;
    }

    if (updates.website) {
      user.website = updates.website;
    }

    if (updates.phone_number) {
      user.phone_number = updates.phone_number;
    }

    await user.save();

    return user;
  }
}

module.exports = UserRepository;
