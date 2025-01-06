const { Builder, By, Key } = require("selenium-webdriver");
const capabilities = require("../capabilities");
const assert = require('assert');
const { describe, it, beforeEach, afterEach } = require("mocha");

describe("add todo third tests", function () {
  let driver;
  
  // Set timeout for Selenium tests
  this.timeout(30000);

  // LambdaTest credentials from capabilities
  const USERNAME = capabilities[0]["LT:Options"].username;
  const KEY = capabilities[0]["LT:Options"].accessKey;
  const GRID_HOST = "hub.lambdatest.com/wd/hub";
  const gridUrl = "https://" + USERNAME + ":" + KEY + "@" + GRID_HOST;

  beforeEach(async function() {  
    // setup the webdriver
    capabilities[0]["LT:Options"].name = this.currentTest.title; 
    driver = await new Builder()
      .usingServer(gridUrl)
      .withCapabilities(capabilities[0])
      .build();
});

  afterEach(async () => {
    await driver.quit();
  });

  // it block
  it("successfully adds a todo to application", async function () {
    // Navigate to our location
    await driver.get("https://lambdatest.github.io/sample-todo-app/");

    // Add a task
    await driver
      .findElement(By.id("sampletodotext"))
      .sendKeys("Learn", Key.RETURN);

    // assert
    let todoText = await driver
      .findElement(By.xpath("//li[last()]"))
      .getText()
      .then(function (value) {
        return value;
      });

    // assertion using node assertion
    assert.strictEqual(todoText, "Learn");
  });
});