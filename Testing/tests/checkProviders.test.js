const puppeteer = require('puppeteer')
const expect = require('chai').expect
const config = require('./bestdealsusa.com.config.json')
const webConfig = require('./config.json')
const {
	getText,
	click,
	typeText,
	waitForText,
	checkProviders,
} = require('.././lib/helpers')
const keywords = config.urls.items
const count = webConfig.resCount

describe('providers check test', () => {
	let browser
	let page
	let name
	let UrlName

	before(async function () {
		UrlName = 'https://www.' + config.name + '/'
		name = config.name
		keywords.forEach(function (item, index, array) {
			keywords[index] = item.replace(UrlName, '')
		})
		browser = await puppeteer.launch({
			headless: true,
			devtools: false,
		})
		page = await browser.newPage()
		page.setDefaultTimeout(10000)
		page.setDefaultNavigationTimeout(20000)
	})

	after(async function () {
		await browser.close()
	})

	it('should check providers desktop', async function () {
		this.timeout(20000)
		const gitMetrics = await page.metrics()
		await page.setViewport({ width: 1650, height: 1050 })
		await page.goto(UrlName)
		for (let i = 0; i < keywords.length; i++) {
			await typeText(page, webConfig.inputPath.typePath, keywords[i])
			await click(page, webConfig.inputPath.searchBarButton)
			await checkProviders(page)
			await page.goBack()
		}
		console.log(gitMetrics.TaskDuration)
	}),
		it('should check providers ipad', async function () {
			this.timeout(10000)
			const gitMetrics = await page.metrics()
			const tablet = puppeteer.devices[webConfig.devices.ipad]
			await page.emulate(tablet)
			await page.goto(UrlName)
			for (let i = 0; i < keywords.length; i++) {
				await typeText(page, webConfig.inputPath.typePath, keywords[i])
				await click(page, webConfig.inputPath.searchBarButton)
				await checkProviders(page)
			}
			console.log(gitMetrics.TaskDuration)
		}),
		it('should check providers mobile', async function () {
			this.timeout(10000)
			const gitMetrics = await page.metrics()
			const mobile = puppeteer.devices[webConfig.devices.mobile]
			await page.emulate(mobile)
			await page.goto(UrlName)
			for (let i = 0; i < keywords.length; i++) {
				await typeText(page, webConfig.inputPath.typePath, keywords[i])
				await click(page, webConfig.inputPath.searchBarButton)
				await checkProviders(page)
			}
			console.log(gitMetrics.TaskDuration)
		})
})
