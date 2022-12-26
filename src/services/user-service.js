const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserRepository = require('../repository/user-repository');
const { JWT_KEY } = require('../config/serverConfig');

class UserService {
	constructor() {
		this.userRepository = new UserRepository();
	}

	async create(data) {
		try {
			const user = await this.userRepository.create(data);
			return user;
		} catch (error) {
			console.log("Something went wrong in the service layer");
			throw error;
		}
	}

	async signIn(email, plainPassword) {
		try {
			// Step 1 -> Fetch the user using the email
			const user = await this.userRepository.getByEmail(email);
			// Step 2 -> Compare Incoming plain password with stored encrypted password
			const passwordsMatch = this.checkPassword(plainPassword,user.password);
			if(!passwordsMatch){
				console.log("Password Doesn't Match");
				throw {error: 'Incorrect password'};
			}
			// Step 3 -> If passwords match then create a token and send it to the user
			const newJWT = this.createToken({email: user.email, id: user.id});
			return newJWT;
		} catch (error) {
			console.log("Something went wrong in the user SignIn Process");
			throw error;
		}
	}

	createToken(user) {
		try {
			const result = jwt.sign(user, JWT_KEY, { expiresIn: '1d' });
			return result;
		} catch (error) {
			console.log("Something went wrong in the token creation");
			throw error;
		}
	}

	verifyToken(token) {
		try {
			const response = jwt.verify(token, JWT_KEY);
			return response;
		} catch (error) {
			console.log("Something went wrong in token validation", error);
			throw error;
		}
	}

	checkPassword(userInputPlainPassword, encryptedPassword) {
		try {
			return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
		} catch (error) {
			console.log("Something went wrong in password comparison");
			throw error;
		}
	}
}

module.exports = UserService;