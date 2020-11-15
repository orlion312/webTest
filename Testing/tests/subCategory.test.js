const puppeteer = require('puppeteer')
const expect = require('chai').expect
const config = require('./bestdealsusa.com.config.json')
const {
	getText,
	click,
	typeText,
	waitForText,
	checkProviders,
} = require('.././lib/helpers')
const websiteConfig = require('./config.json')
const keywords = config.urls.items

describe('subCategory test', () => {
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
			slowMo: 10,
			devtools: false,
		})
		page = await browser.newPage()
		page.setDefaultTimeout(10000)
		page.setDefaultNavigationTimeout(20000)
	})

	after(async function () {
		await browser.close()
	})

	//subCategory.forEach(function (item, index, array) {
	it('checks sub-category Desktop', async function () {
		this.timeout(30000)
		await page.setViewport({ width: 1650, height: 1050 })
		await page.goto(UrlName)
		let gitMetrics = await page.metrics()
		await page.waitForSelector('.header-navbar')
		let navBar = await page.$$('.menu-links')
		let url
		let navi = await page.evaluate(() => {
			let hrefs = []
			let subCat = document.querySelectorAll('.a-menu-links')
			subCat.forEach(item => {
				hrefs.push(item.getAttribute('href'))
			})
			return hrefs
		})

		for (let i = 0; i < navBar.length; i++) {
			navBar = await page.$$('.menu-links')
			await page.waitForSelector('a.a-menu-links')
			await navBar[i].click()
			await page.waitForSelector('.breadcrumbs')
			url = await page.url()
			expect(url).to.include(navi[i])
			await page.goBack()
		}
		console.log(gitMetrics.TaskDuration)
	}),
		it('checks sub-category ipad', async function () {
			this.timeout(30000)
			const tablet = puppeteer.devices[websiteConfig.devices.ipad]
			await page.emulate(tablet)
			await page.goto(UrlName)
			let gitMetrics = await page.metrics()
			await page.waitForSelector('.header-navbar')
			let navBar = await page.$$('.menu-links')
			let url
			let navi = await page.evaluate(() => {
				let hrefs = []
				let subCat = document.querySelectorAll('.a-menu-links')
				subCat.forEach(item => {
					hrefs.push(item.getAttribute('href'))
				})
				return hrefs
			})

			for (let i = 0; i < websiteConfig.subCat.ipad; i++) {
				navBar = await page.$$('.menu-links')
				await page.waitForSelector('a.a-menu-links')
				await navBar[i].click()
				await page.waitForSelector('.breadcrumbs')
				url = await page.url()
				expect(url).to.include(navi[i])
				await page.goBack()
			}
			console.log(gitMetrics.TaskDuration)
		}),
		it('checks sub-category mobile', async function () {
			this.timeout(30000)
			let gitMetrics = await page.metrics()
			const mobile = puppeteer.devices[websiteConfig.devices.mobile]
			await page.emulate(mobile)
			await page.goto(UrlName)
			const menuBar = await page.waitForSelector('.mobile-menu-toggler')
			await menuBar.click()

			await page.waitForSelector('.header-navbar')
			let navBar = await page.$$('.menu-links', { visible: true })
			let url
			let navi = await page.evaluate(() => {
				let hrefs = []
				let subCat = document.querySelectorAll('.a-menu-links')
				subCat.forEach(item => {
					hrefs.push(item.getAttribute('href'))
				})
				return hrefs
			})
			for (let i = 0; i < websiteConfig.subCat.mobile; i++) {
				navBar = await page.$$('.menu-links', { visible: true })
				await page.waitForSelector('a.a-menu-links')
				await navBar[i].click()
				await page.waitForSelector('.breadcrumbs')
				url = await page.url()
				expect(url).to.include(navi[i])
				await page.goBack()
				const menuBar = await page.waitForSelector('.mobile-menu-toggler')
				await menuBar.click()
			}
			console.log(gitMetrics.TaskDuration)
		})
})
