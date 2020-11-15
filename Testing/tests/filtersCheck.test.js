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

describe('fillters search test', () => {
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
		//await page.setViewport({ width: 1650, height: 1050 })
		browser = await puppeteer.launch({
			headless: true,
			devtools: false,
		})
		page = await browser.newPage()
		page.setDefaultTimeout(15000)
		page.setDefaultNavigationTimeout(20000)
	})

	after(async function () {
		await browser.close()
	})

	it('should check filters desktop', async function () {
		this.timeout(15000)
		const gitMetrics = await page.metrics()
		await page.setViewport({ width: 1650, height: 1050 })
		await page.goto(UrlName)
		await typeText(page, webConfig.inputPath.typePath, keywords[0])
		await click(page, webConfig.inputPath.searchBarButton)
		await page.waitForSelector(webConfig.inputPath.filterPath)
		await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] })
		await page.waitForSelector('.sidebar-filters__block-checkbox_list')
		await page.evaluate(() => {
			let items = document.querySelectorAll(
				'input.sidebar-filters__block-input'
			)
			items.forEach(item => {
				item.click()
			})
		})
		await page.waitForSelector('.clear-all-button')
		await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] })
		await page.screenshot({ path: webConfig.imgPath.filtersImgPath.desktop })
		console.log(gitMetrics.TaskDuration)
	}),
		it('should check filters ipad', async function () {
			this.timeout(15000)
			const gitMetrics = await page.metrics()
			const tablet = puppeteer.devices[webConfig.devices.ipad]
			await page.emulate(tablet)
			await page.goto(UrlName)
			await typeText(page, webConfig.inputPath.typePath, keywords[0])
			await click(page, webConfig.inputPath.searchBarButton)
			await page.waitForSelector(webConfig.inputPath.filterPath)
			await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] })
			await page.evaluate(() => {
				let items = document.querySelectorAll(
					'input.sidebar-filters__block-input'
				)
				items.forEach(item => {
					item.click()
				})
			})
			await page.waitForSelector('.clear-all-button')
			await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] })
			await page.screenshot({ path: webConfig.imgPath.filtersImgPath.ipad })
			console.log(gitMetrics.TaskDuration)
		}),
		it('should check filters mobile', async function () {
			this.timeout(20000)
			const gitMetrics = await page.metrics()
			const mobile = puppeteer.devices[webConfig.devices.mobile]
			await page.emulate(mobile)
			await page.goto(UrlName)
			await typeText(page, webConfig.inputPath.typePath, keywords[0])
			await click(page, webConfig.inputPath.searchBarButton)
			await page.waitForSelector(webConfig.filtersSideBar)
			await click(page, webConfig.filtersSideBar)
			await page.waitForSelector(webConfig.inputPath.filterPath)
			await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] })
			await page.evaluate(() => {
				let items = document.querySelectorAll(
					'input.sidebar-filters__block-input'
				)
				items.forEach(item => {
					item.click()
				})
			})
			await page.waitForSelector('.clear-all-button')
			await page.waitForSelector(webConfig.filtersSideBar)
			await click(page, webConfig.filtersSideBar)
			await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] })
			await page.screenshot({ path: webConfig.imgPath.filtersImgPath.mobile })
			console.log(gitMetrics.TaskDuration)
		})
})
