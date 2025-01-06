const { Builder, By, Key } = require("selenium-webdriver");
const capabilities = require("../capabilities");
const assert = require('assert');
const { describe, it } = require("mocha");

describe("add todo third tests", function () {
  let driver;
  
  // Set timeout for Selenium tests
  this.timeout(30000);

  // LambdaTest credentials from capabilities
  const USERNAME = capabilities[0]["LT:Options"].username;
  const KEY = capabilities[0]["LT:Options"].accessKey;
  const GRID_HOST = "hub.lambdatest.com/wd/hub";
  const gridUrl = "https://" + USERNAME + ":" + KEY + "@" + GRID_HOST;

  browsers = [
    { browserName: "chrome", version: "latest", platformName: "Windows 10" },
    { browserName: "firefox", version: "latest", platformName: "Windows 10" },
    { browserName: "MicrosoftEdge", version: "latest", platformName: "Windows 10" }
  ];

  browsers.forEach(({browserName, version, platformName}) => {

  // it block
  it(`successfully adds a todo for ${browserName}, ${version}, ${platformName}`, async function () {
    capabilities[0]["LT:Options"].platformName = platformName;
    capabilities[0]["LT:Options"].browserName = browserName;
    capabilities[0]["LT:Options"].version = version;

    capabilities[0]["LT:Options"].name = this.test.title; 
    driver = await new Builder()
      .usingServer(gridUrl)
      .withCapabilities(capabilities[0])
      .build();
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

    await driver.quit();
  });
      
});

});