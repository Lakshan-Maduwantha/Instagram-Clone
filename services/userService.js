const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/userRepository');
const { generateToken } = require('../jwtUtils');

const userRepository = new UserRepository();

class UserService {
  async signup(email, password, name, username, bio, profile_picture, website, phone_number) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepository.createUser(email, hashedPassword, name, username, bio, profile_picture, website, phone_number);
    const token = jwt.sign({ userId: user.id }, 'lmw');

    return { user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      bio: user.bio,
      website: user.website,
      phone_number: user.phone_number,
      followers: user.followers,
      following: user.following,
      created_at: user.created_at,
      updated_at: user.updated_at,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }, token };
  }

  async login(email, password) {

    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid email or password');
    }
    const token = generateToken(user.id); 
    return { user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      bio: user.bio,
      profile_picture: user.profile_picture,
      website: user.website,
      phone_number: user.phone_number,
      followers: user.followers,
      following: user.following,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }, token };
  }

  async updateUser(userId, updates) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const { name, username, bio, profile_picture, website, phone_number } = updates;

    if (name) {
      user.name = name;
    }

    if (username) {
      user.username = username;
    }

    if (bio) {
      user.bio = bio;
    }

    if (profile_picture) {
      user.profile_picture = profile_picture;
    }

    if (website) {
      user.website = website;
    }

    if (phone_number) {
      user.phone_number = phone_number;
    }

    await user.save();

    return user;
  }
}

module.exports = UserService;
