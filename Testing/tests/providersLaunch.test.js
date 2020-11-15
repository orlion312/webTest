const puppeteer = require('puppeteer')
const expect = require('chai').expect
const config = require('./bestdealsusa.com.config.json')
const webConfig = require('./config.json')
const {
	getText,
	click,
	typeText,
	waitForNewPag,
	checkProviders,
} = require('.././lib/helpers')
const keywords = config.urls.items

describe('providers click redirect', () => {
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

	it('should redirect us to provider desktop', async function () {
		this.timeout(30000)
		const gitMetrics = await page.metrics()
		await page.setViewport({ width: 1650, height: 1050 })
		await page.goto(UrlName)
		await typeText(page, webConfig.inputPath.typePath, keywords[1])
		await click(page, webConfig.inputPath.searchBarButton)

		await page.waitForSelector(webConfig.boxes.boxesInput)
		const items = await page.$$(webConfig.boxes.boxesInput)
		let title
		for (let i = 0; i < items.length; i++) {
			try {
				let item = items[i]
				title = await item.$eval('a.items-list__item-inner', hr =>
					hr.getAttribute('href')
				)
				expect(title).to.be.a('string')
			} catch (error) {
				throw new Error('can not load image in ' + items[i])
			}
		}
		const next = await page.waitForSelector('li.items-list__item')
		next.click('li.items-list__item')
		const getNewPageWhenLoaded = async () => {
			return new Promise(x =>
				browser.on('targetcreated', async target => {
					if (target.type() === 'page') {
						const newPage = await target.page()
						const newPagePromise = new Promise(y =>
							newPage.once('domcontentloaded', () => y(newPage))
						)
						const isPageLoaded = await newPage.evaluate(
							() => document.readyState
						)
						return isPageLoaded.match('complete|interactive')
							? x(newPage)
							: x(newPagePromise)
					}
				})
			)
		}

		const newPagePromise = getNewPageWhenLoaded()
		const newPage = await newPagePromise
		await newPage.screenshot({
			path: webConfig.imgPath.providerImgPath.desktop,
			fullPage: true,
		})
		const url = await newPage.url()
		console.log(gitMetrics.TaskDuration)
	}),
		it('should redirect us to provider ipad', async function () {
			this.timeout(30000)
			const gitMetrics = await page.metrics()
			const tablet = puppeteer.devices[webConfig.devices.ipad]
			await page.emulate(tablet)
			await page.goto(UrlName)
			await typeText(page, webConfig.inputPath.typePath, keywords[1])
			await click(page, webConfig.inputPath.searchBarButton)

			await page.waitForSelector(webConfig.boxes.boxesInput)
			const items = await page.$$(webConfig.boxes.boxesInput)
			let title
			for (let i = 0; i < items.length; i++) {
				try {
					let item = items[i]
					title = await item.$eval('a.items-list__item-inner', hr =>
						hr.getAttribute('href')
					)
					expect(title).to.be.a('string')
				} catch (error) {
					throw new Error('can not load image in ' + items[i])
				}
			}
			const next = await page.waitForSelector('li.items-list__item')
			next.click('li.items-list__item')
			const getNewPageWhenLoaded = async () => {
				return new Promise(x =>
					browser.on('targetcreated', async target => {
						if (target.type() === 'page') {
							const newPage = await target.page()
							const newPagePromise = new Promise(y =>
								newPage.once('domcontentloaded', () => y(newPage))
							)
							const isPageLoaded = await newPage.evaluate(
								() => document.readyState
							)
							return isPageLoaded.match('complete|interactive')
								? x(newPage)
								: x(newPagePromise)
						}
					})
				)
			}

			const newPagePromise = getNewPageWhenLoaded()
			const newPage = await newPagePromise
			await newPage.screenshot({
				path: webConfig.imgPath.providerImgPath.ipad,
				fullPage: true,
			})
			const url = await newPage.url()
			console.log(gitMetrics.TaskDuration)
		}),
		it('should redirect us to provider mobile', async function () {
			this.timeout(30000)
			const gitMetrics = await page.metrics()
			const mobile = puppeteer.devices[webConfig.devices.mobile]
			await page.emulate(mobile)
			await page.goto(UrlName)
			await typeText(page, webConfig.inputPath.typePath, keywords[1])
			await click(page, webConfig.inputPath.searchBarButton)

			await page.waitForSelector(webConfig.boxes.boxesInput)
			const items = await page.$$(webConfig.boxes.boxesInput)
			let title
			for (let i = 0; i < items.length; i++) {
				try {
					let item = items[i]
					title = await item.$eval('a.items-list__item-inner', hr =>
						hr.getAttribute('href')
					)
					expect(title).to.be.a('string')
				} catch (error) {
					throw new Error('can not load image in ' + items[i])
				}
			}

			const next = await page.waitForSelector('li.items-list__item')
			next.click('li.items-list__item')
			const getNewPageWhenLoaded = async () => {
				return new Promise(x =>
					browser.on('targetcreated', async target => {
						if (target.type() === 'page') {
							const newPage = await target.page()
							const newPagePromise = new Promise(y =>
								newPage.once('domcontentloaded', () => y(newPage))
							)
							const isPageLoaded = await newPage.evaluate(
								() => document.readyState
							)
							return isPageLoaded.match('complete|interactive')
								? x(newPage)
								: x(newPagePromise)
						}
					})
				)
			}

			const newPagePromise = getNewPageWhenLoaded()
			const newPage = await newPagePromise
			await newPage.screenshot({
				path: webConfig.imgPath.providerImgPath.mobile,
				fullPage: true,
			})
			const url = await newPage.url()
			console.log(gitMetrics.TaskDuration)
		})
})
