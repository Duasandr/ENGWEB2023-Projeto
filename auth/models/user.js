const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

/**
 * User Schema. Documents in the users collection will follow this schema.
 */
const userSchema = new mongoose.Schema({
  email: {                         // email will be used for login
    type: String,
    required: true
  },
  username: {                      // username will be used for posting comments        
    type: String,
    required: true
  },
  filiacao: String,
  level: {
    type: String,
    required: true,
    enum: ['admin', 'consumidor'],        // only two levels are available
    default: 'consumidor'
  },
  dataRegisto: {
    type: Date,
    default: Date.now
  },
  dataUltimoAcesso: {
    type: Date,
    default: Date.now
  }
})

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const UserModel = mongoose.model('User', userSchema, 'users');

module.exports = UserModel;