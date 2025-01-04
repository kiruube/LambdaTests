const { Builder, By, Key } = require("selenium-webdriver");
const assert = require('assert');

describe("add todo second tests", function () {
  // it block
  it("successfully adds a todo to application", async function () {
    // setup the webdriver
    let driver = new Builder().forBrowser("chrome").build();

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

    // Close the browser
    await driver.quit();
  });
});
