import test from "ava"
import { withPage } from "../ava/helpers.js"



test("index: page should have a H1 element", withPage, async (t, page, url) => {
	await page.goto(url)
	const element = await page.waitForSelector("h1", { timeout: 3000 })
	t.not(element, null)
})