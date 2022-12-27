const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const db = require('./models/index');
const {User, Role} = require('./models/index');


const app = express();

// const UserService = require('./services/user-service');

const prepareAndStartServer = () => {

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	app.use('/api', apiRoutes);

	app.listen(PORT, async () => {
		if (process.env.DB_SYNC) {
			db.sequelize.sync({
				alter: true
			});
		}
		// const repo = new UserRepository();
		// const response = await repo.getById(1);
		// console.log(response);

		// const service = new UserService();
		// const newToken = service.createToken({emaiL:'abhishek.bisht.21@gmail.com', id:1});
		// console.log("New token is", newToken);

		// const u1 = await User.findByPk(2);
		// const r1 = await Role.findByPk(2);
		// u1.addRole(r1);

		console.log("Server started at port", PORT);
	})
}

prepareAndStartServer();

