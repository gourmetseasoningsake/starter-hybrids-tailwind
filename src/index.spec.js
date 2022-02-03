import test from "ava"
import { withPage } from "../ava/helpers.js"



const url = "http://localhost:8080"



test("page should have a H1 element", withPage, async (t, page, server) => {
  //server.httpServer.address() TODO: get url from socket.address object
	await page.goto(url)
	t.not(await page.$('h1'), null);
})