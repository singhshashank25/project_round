const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	let token = req.cookies.token ;
    // let token = req.headers["token"];
	if (!token)
		return res
			.status(400)
			// .send({ message: "Access denied, no token provided." })
			.render("login",{message: "Access denied, no token provided.",title:""})

	jwt.verify(token, process.env.JWTSECRET, (err, validToken) => {
		if (err) {
			return res.status(400).send({ message: "invalid token" });
		} else {
			// console.log(validToken);
			req.user = validToken;
			next();
		}
	});
};