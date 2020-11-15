const puppeteer = require('puppeteer')
const expect = require('chai').expect
const config = require('./bestdealsusa.com.config.json')
const webConfig = require('./config.json')
const {
	autoScroll,
	click,
	typeText,
	waitForRefresh,
	checkProviders,
} = require('.././lib/helpers')
const keywords = config.urls.items

describe('Boxes show test', () => {
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

	it('should check boxes desktop', async function () {
		this.timeout(30000)
		const gitMetrics = await page.metrics()
		await page.setViewport({ width: 1650, height: 1050 })
		await page.goto(UrlName)
		await typeText(page, webConfig.inputPath.typePath, keywords[1])
		await click(page, webConfig.inputPath.searchBarButton)
		await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] })
		await page.screenshot({ path: webConfig.imgPath.boxesImgPath.desktop })
		await autoScroll(page)
		await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] })
		let imgs = await page.evaluate(() => {
			let imgsCheck = []
			let items = document.querySelectorAll('img.loaded')
			items.forEach(item => {
				imgsCheck.push(item.getAttribute('src'))
			})
			return imgsCheck
		})
		imgs.forEach(img => {
			expect(img).to.be.a('string')
		})
		let price_titles = await page.evaluate(() => {
			let results = []
			let itemsP = document.querySelectorAll('span.price__discount')
			let itemsT = document.querySelectorAll('strong.items-list__item-title')
			if (itemsP.length == itemsT.length) {
				for (let i = 0; i < itemsT.length; i++) {
					results.push({
						price: itemsP[i].textContent,
						title: itemsT[i].textContent,
					})
				}
			}
			return results
		})
		price_titles.forEach(item => {
			expect(item.price).to.include('$')
			expect(item.title).to.be.a('string')
		})
		console.log(gitMetrics.TaskDuration)
	}),
		it('should check boxes ipad', async function () {
			this.timeout(30000)
			const gitMetrics = await page.metrics()
			const tablet = puppeteer.devices[webConfig.devices.ipad]
			await page.emulate(tablet)
			await page.goto(UrlName)
			await typeText(page, webConfig.inputPath.typePath, keywords[1])
			await click(page, webConfig.inputPath.searchBarButton)
			await page.screenshot({ path: webConfig.imgPath.boxesImgPath.ipad })
			await page.waitForSelector(webConfig.boxes.imgInput)
			await autoScroll(page)
			await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] })
			let imgs = await page.evaluate(() => {
				let imgsCheck = []
				let items = document.querySelectorAll('img.loaded')
				items.forEach(item => {
					imgsCheck.push(item.getAttribute('src'))
				})
				return imgsCheck
			})
			imgs.forEach(img => {
				expect(img).to.be.a('string')
			})
			let price_titles = await page.evaluate(() => {
				let results = []
				let itemsP = document.querySelectorAll('span.price__discount')
				let itemsT = document.querySelectorAll('strong.items-list__item-title')
				if (itemsP.length == itemsT.length) {
					for (let i = 0; i < itemsT.length; i++) {
						results.push({
							price: itemsP[i].textContent,
							title: itemsT[i].textContent,
						})
					}
				}
				return results
			})
			price_titles.forEach(item => {
				expect(item.price).to.include('$')
				expect(item.title).to.be.a('string')
			})
			console.log(gitMetrics.TaskDuration)
		}),
		it('should check boxes mobile', async function () {
			this.timeout(30000)
			const gitMetrics = await page.metrics()
			const mobile = puppeteer.devices[webConfig.devices.mobile]
			await page.emulate(mobile)
			await page.goto(UrlName)
			await typeText(page, webConfig.inputPath.typePath, keywords[1])
			await click(page, webConfig.inputPath.searchBarButton)
			await page.waitForSelector('img.loaded')
			await page.screenshot({ path: webConfig.imgPath.boxesImgPath.mobile })

			await page.waitForSelector(webConfig.boxes.boxesInput)
			await autoScroll(page)
			await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] })
			let imgs = await page.evaluate(() => {
				let imgsCheck = []
				let items = document.querySelectorAll('img.loaded')
				items.forEach(item => {
					imgsCheck.push(item.getAttribute('src'))
				})
				return imgsCheck
			})
			imgs.forEach(img => {
				expect(img).to.be.a('string')
			})
			let price_titles = await page.evaluate(() => {
				let results = []
				let itemsP = document.querySelectorAll('span.price__discount')
				let itemsT = document.querySelectorAll('strong.items-list__item-title')
				if (itemsP.length == itemsT.length) {
					for (let i = 0; i < itemsT.length; i++) {
						results.push({
							price: itemsP[i].textContent,
							title: itemsT[i].textContent,
						})
					}
				}
				return results
			})
			price_titles.forEach(item => {
				expect(item.price).to.include('$')
				expect(item.title).to.be.a('string')
			})
			console.log(gitMetrics.TaskDuration)
		})
})
