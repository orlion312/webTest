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
} = require('../lib/helpers')
const keywords = config.urls.items

describe('Mail registration', () => {
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
		page.setDefaultTimeout(10000)
		page.setDefaultNavigationTimeout(20000)
	})

	after(async function () {
		await browser.close()
	})

	//test for registering to
	it('should register to mail desktop', async function () {
		this.timeout(10000)
		const gitMetrics = await page.metrics()
		await page.setViewport({ width: 1650, height: 1050 })
		await page.goto(UrlName)
		await typeText(
			page,
			webConfig.inputPath.mailTypePath,
			webConfig.inputPath.mailToType
		)
		await click(page, webConfig.inputPath.mailButton)
		await page.waitForSelector('.fa-thumbs-up')
		await page.screenshot({
			path: webConfig.imgPath.mailImgPath.success.desktop,
		})
		console.log(gitMetrics.TaskDuration)
	}),
		it('should register to mail ipad', async function () {
			this.timeout(10000)
			const gitMetrics = await page.metrics()
			const tablet = puppeteer.devices[webConfig.devices.ipad]
			await page.emulate(tablet)
			await page.goto(UrlName)
			await typeText(
				page,
				webConfig.inputPath.mailTypePath,
				webConfig.inputPath.mailToType
			)
			await click(page, webConfig.inputPath.mailButton)
			await page.waitForSelector('.fa-thumbs-up')
			await page.screenshot({
				path: webConfig.imgPath.mailImgPath.success.ipad,
			})
			console.log(gitMetrics.TaskDuration)
		}),
		it('should register to mail mobile', async function () {
			this.timeout(10000)
			const gitMetrics = await page.metrics()
			const mobile = puppeteer.devices[webConfig.devices.mobile]
			await page.emulate(mobile)
			await page.goto(UrlName)

			await typeText(
				page,
				webConfig.inputPath.mailTypePath,
				webConfig.inputPath.mailToType
			)
			await click(page, webConfig.inputPath.mailButton)
			await page.waitForSelector('.fa-thumbs-up')
			await page.screenshot({
				path: webConfig.imgPath.mailImgPath.success.mobile,
			})
			console.log(gitMetrics.TaskDuration)
		}),
		it('should give error to mail desktop', async function () {
			this.timeout(10000)
			const gitMetrics = await page.metrics()
			await page.setViewport({ width: 1650, height: 1050 })
			await page.goto(UrlName)
			await typeText(
				page,
				webConfig.inputPath.mailTypePath,
				webConfig.inputPath.errorMailType
			)
			await click(page, webConfig.inputPath.mailButton)
			await page.waitForSelector('.error-notes')
			await page.screenshot({
				path: webConfig.imgPath.mailImgPath.fail.desktop,
			})
			console.log(gitMetrics.TaskDuration)
		}),
		it('should give error to mail ipad', async function () {
			this.timeout(10000)
			const gitMetrics = await page.metrics()
			const mobile = puppeteer.devices[webConfig.devices.ipad]
			await page.emulate(mobile)
			await page.goto(UrlName)
			await typeText(
				page,
				webConfig.inputPath.mailTypePath,
				webConfig.inputPath.errorMailType
			)
			await click(page, webConfig.inputPath.mailButton)
			await page.waitForSelector('.error-notes')
			await page.screenshot({ path: webConfig.imgPath.mailImgPath.fail.ipad })
			console.log(gitMetrics.TaskDuration)
		}),
		it('should give error to mail mobile', async function () {
			this.timeout(10000)
			const gitMetrics = await page.metrics()
			const mobile = puppeteer.devices[webConfig.devices.mobile]
			await page.emulate(mobile)
			await page.goto(UrlName)
			await typeText(
				page,
				webConfig.inputPath.mailTypePath,
				webConfig.inputPath.errorMailType
			)
			await click(page, webConfig.inputPath.mailButton)
			await page.waitForSelector('.error-notes')
			await page.screenshot({ path: webConfig.imgPath.mailImgPath.fail.mobile })
			console.log(gitMetrics.TaskDuration)
		})
})
