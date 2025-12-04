/**
 * Comprehensive End-to-End tests for the Infinity Gym website
 */

const puppeteer = require('puppeteer');
const { expect } = require('chai');

describe('Infinity Gym Website Comprehensive E2E Tests', function() {
  let browser;
  let page;

  // Increase timeout for all tests
  this.timeout(30000);

  before(async function() {
    this.timeout(30000);
    
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
    });
  });

  after(async function() {
    if (browser) {
      await browser.close();
    }
  });

  beforeEach(async function() {
    page = await browser.newPage();
    page.setDefaultTimeout(20000);
  });

  afterEach(async function() {
    if (page) {
      await page.close();
    }
  });

  it('should display the correct page title', async function() {
    await page.goto(`file://${__dirname}/../index.html`, { 
      waitUntil: 'domcontentloaded'
    });
    
    const title = await page.title();
    expect(title).to.equal('Infinity Gym | Your Fitness Journey Starts Here');
  });

  it('should have the main navigation menu', async function() {
    await page.goto(`file://${__dirname}/../index.html`, { 
      waitUntil: 'domcontentloaded'
    });
    
    const navbar = await page.$('.navbar');
    expect(navbar).to.not.be.null;
    
    const navLinks = await page.$$('.nav-link');
    expect(navLinks.length).to.be.at.least(3);
  });

  it('should display the hero section with correct content', async function() {
    await page.goto(`file://${__dirname}/../index.html`, { 
      waitUntil: 'domcontentloaded'
    });
    
    const heroSection = await page.$('.hero-section');
    expect(heroSection).to.not.be.null;
    
    const heroTitle = await page.$eval('.hero-title', el => el.textContent);
    expect(heroTitle).to.contain('Rise Together');
  });

  it('should have three membership plans displayed', async function() {
    await page.goto(`file://${__dirname}/../index.html`, { 
      waitUntil: 'domcontentloaded'
    });
    
    // Wait for pricing cards to be loaded
    await page.waitForSelector('.pricing-card', { timeout: 10000 });
    const pricingCards = await page.$$('.pricing-card');
    expect(pricingCards.length).to.equal(3);
  });

  it('should display correct plan names', async function() {
    await page.goto(`file://${__dirname}/../index.html`, { 
      waitUntil: 'domcontentloaded'
    });
    
    // Wait for pricing cards to be loaded
    await page.waitForSelector('.pricing-card', { timeout: 10000 });
    const planNames = await page.$$eval('.pricing-card .plan-name', elements => 
      elements.map(el => el.textContent)
    );
    expect(planNames).to.include('BASIC');
    expect(planNames).to.include('STANDARD');
    expect(planNames).to.include('PREMIUM');
  });

  it('should display correct pricing for each plan', async function() {
    await page.goto(`file://${__dirname}/../index.html`, { 
      waitUntil: 'domcontentloaded'
    });
    
    // Wait for pricing cards to be loaded
    await page.waitForSelector('.pricing-card', { timeout: 10000 });
    
    const basicPrice = await page.$eval('.pricing-card:first-child .plan-price', el => el.textContent);
    expect(basicPrice).to.contain('2000DA');
    
    const standardPrice = await page.$eval('.pricing-card:nth-child(2) .plan-price', el => el.textContent);
    expect(standardPrice).to.contain('2500DA');
    
    const premiumPrice = await page.$eval('.pricing-card:last-child .plan-price', el => el.textContent);
    expect(premiumPrice).to.contain('3500DA');
  });

  it('should have subscribe buttons for each plan', async function() {
    await page.goto(`file://${__dirname}/../index.html`, { 
      waitUntil: 'domcontentloaded'
    });
    
    // Wait for pricing cards to be loaded
    await page.waitForSelector('.pricing-card', { timeout: 10000 });
    const subscribeButtons = await page.$$('.subscribe-button');
    expect(subscribeButtons.length).to.equal(3);
  });

  it('should have a working contact form', async function() {
    await page.goto(`file://${__dirname}/../index.html`, { 
      waitUntil: 'domcontentloaded'
    });
    
    const contactForm = await page.$('#contactForm');
    expect(contactForm).to.not.be.null;
  });

  it('should display trainer cards', async function() {
    await page.goto(`file://${__dirname}/../index.html`, { 
      waitUntil: 'domcontentloaded'
    });
    
    // Wait for trainer cards to be loaded
    await page.waitForSelector('.trainer-card', { timeout: 10000 });
    const trainerCards = await page.$$('.trainer-card');
    expect(trainerCards.length).to.equal(3);
  });

  it('should display facility images', async function() {
    await page.goto(`file://${__dirname}/../index.html`, { 
      waitUntil: 'domcontentloaded'
    });
    
    // Wait for facility images to be loaded
    await page.waitForSelector('.facility-image', { timeout: 10000 });
    const facilityImages = await page.$$('.facility-image');
    expect(facilityImages.length).to.be.at.least(3);
  });

  it('should display footer', async function() {
    await page.goto(`file://${__dirname}/../index.html`, { 
      waitUntil: 'domcontentloaded'
    });
    
    const footer = await page.$('.footer');
    expect(footer).to.not.be.null;
  });

  it('should show subscription form when subscribe button is clicked', async function() {
    await page.goto(`file://${__dirname}/../index.html`, { 
      waitUntil: 'domcontentloaded'
    });
    
    // Wait for pricing cards to be loaded
    await page.waitForSelector('.pricing-card', { timeout: 10000 });
    
    // Wait for JavaScript to be fully loaded
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Click the first subscribe button
    await page.click('.pricing-card:first-child .subscribe-button');
    
    // Wait for the subscription form to appear
    await page.waitForSelector('#subscriptionFormContainer', { timeout: 10000 });
    
    // Check if form container is visible (not hidden)
    const formContainer = await page.$('#subscriptionFormContainer:not(.hidden)');
    expect(formContainer).to.not.be.null;
  });
});