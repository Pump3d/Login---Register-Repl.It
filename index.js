const prompt = require('prompt-sync')();
const Client = require("@replit/database");
const db = new Client();
const debugMode = false

async function check(args) {
	let string = await db.get(args)
	if (debugMode == true) {console.log(string)}
	return string
}

async function register() {
	const user = prompt("Username: ").trim();
	const pass = prompt("Password: ").trim();

	const duser = await check(user)

	if (duser !== null) {
		console.log("Sorry, but that username exists. Please try a different one")
	} else if (pass.length < 5) {
		console.log("Please enter a password with more than four characters.")
	} else {
		await db.set(user, pass);
		console.log("Succesfully registered!")
	}
}

async function login() {
	const user = prompt("Username: ").trim();
	const pass = prompt("Password: ").trim();

	const duser = await check(user)

	if (duser == null) {
		console.log("That profile does not match any existing profiles. Please check for any spelling errors or register.")
	} else if (duser !== pass) {
		console.log("Invalid password, please check for any spelling errors and try again.")
	} else {
		console.log("Succesfully logged in!")
	}
}

function main() {
	const response = prompt("Login or register?: ")
	const lower = response.toLowerCase()
	if (lower == "login") {
		console.log("\n")
		login()
	} else if (lower == "register") {
		console.log("\n")
		register()
	}
}

async function restore() {
	await db.empty()
}

if (debugMode == true) {restore()}

main()