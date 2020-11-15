const { expect } = require('chai')
const webConfig = require('../tests/config.json')
module.exports = {
	click: async function (page, selector) {
		try {
			await page.$eval(selector, element =>
				element.querySelector('button').click()
			)
		} catch (error) {
			throw new Error('Could not click on selector:' + selector)
		}
	},
	getText: async function (page, selector) {
		try {
			await page.waitForSelector(selector)
			return await page.$eval(selector, element => element.textContent)
		} catch (error) {
			throw new Error('Could get text from selector: ${selector}')
		}
	},
	typeText: async function (page, selector, text) {
		try {
			await page.waitForSelector(selector)
			await page.type(selector, text)
		} catch (error) {
			throw new Error('Could type text on selector:' + selector)
		}
	},
	checkProviders: async function (page) {
		const providers = webConfig.providers
		try {
			await page.waitForSelector(providers.input)
			for (let i = 0; i < providers.provName.length; i++) {
				await page.waitForSelector(providers.provName[i])
			}
			let stop = await page.evaluate(() => {
				let boxes = document.querySelectorAll('a.items-list__item-inner')
				for (let i = 0; i < boxes.length; i++) {
					box = JSON.parse(box)
					if (box.provider == 'kelkoogroup') {
						break
					}
				}
				if (i < boxes.length) {
					return true
				}
			})
			expect(stop).toBe(true)
		} catch (error) {}
	},
	autoScroll: async function autoScroll(page) {
		await page.evaluate(async () => {
			await new Promise((resolve, reject) => {
				var totalHeight = 0
				var distance = 100
				var timer = setInterval(() => {
					var scrollHeight = document.body.scrollHeight
					window.scrollBy(0, distance)
					totalHeight += distance

					if (totalHeight >= scrollHeight) {
						clearInterval(timer)
						resolve()
					}
				}, 100)
			})
		})
	},
}
