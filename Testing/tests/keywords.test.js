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

describe('Keywords search test', () => {
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

	//test for search button with keywords
	it('should go to keywordpage Desktop', async function () {
		this.timeout(15000)
		const gitMetrics = await page.metrics()
		await page.setViewport({ width: 1650, height: 1050 })
		for (let i = 0; i < keywords.length; i++) {
			await page.goto(UrlName)
			await typeText(page, webConfig.inputPath.typePath, keywords[i])
			await click(page, webConfig.inputPath.searchBarButton)
			const url = await page.url()
			expect(url).to.include(name + '/' + keywords[i])
		}
		console.log(gitMetrics.TaskDuration)
	}),
		it('should go to keywordpage ipad', async function () {
			this.timeout(15000)
			const gitMetrics = await page.metrics()
			const tablet = puppeteer.devices[webConfig.devices.ipad]
			await page.emulate(tablet)
			for (let i = 0; i < keywords.length; i++) {
				await page.goto(UrlName)
				await typeText(page, webConfig.inputPath.typePath, keywords[i])
				await click(page, webConfig.inputPath.searchBarButton)
				const url = await page.url()
				expect(url).to.include(name + '/' + keywords[i])
			}
			console.log(gitMetrics.TaskDuration)
		}),
		it('should go to keywordpage mobile', async function () {
			this.timeout(15000)
			const gitMetrics = await page.metrics()
			const mobile = puppeteer.devices[webConfig.devices.mobile]
			await page.emulate(mobile)
			for (let i = 0; i < keywords.length; i++) {
				await page.goto(UrlName)
				await typeText(page, webConfig.inputPath.typePath, keywords[i])
				await click(page, webConfig.inputPath.searchBarButton)
				const url = await page.url()
				expect(url).to.include(name + '/' + keywords[i])
			}
			console.log(gitMetrics.TaskDuration)
		})
})
