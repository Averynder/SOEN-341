var { Builder, By, Key, until } = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');


module.exports = (app) => {
  app.get('/concordia/:netname/:password', function (req, res, next) {
    let driver = new Builder()
      .forBrowser('chrome')
      //.setChromeOptions(new chrome.Options().headless()) // invisible chrome
      .setChromeOptions()
      .build();
      try {
        driver.get('https://my.concordia.ca/')
          .then(_ => driver.findElement(By.name('userid')).sendKeys(req.params.netname))
          .then(_ => driver.findElement(By.name('pwd')).sendKeys(req.params.password, Key.RETURN))
          .then(_ => driver.wait(until.elementLocated(By.xpath('/html/body/table[1]/tbody/tr[2]/td/table/tbody/tr/td[1]/ul/li[1]/table/tbody/tr[2]/td/div/nav/div[1]/ul/li[2]/div')), 4000))
          //.then(_ => driver.findElement(By.xpath('//*[@id="CU_MY_STUD_CENTRE"]/div')).click()) // click on the arrow to show MyStudentCentre
          //.then(_ => driver.wait(until.elementLocated(By.xpath('/html/body/table[1]/tbody/tr[2]/td/table/tbody/tr/td[1]/ul/li[1]/table/tbody/tr[2]/td/div/nav/div[1]/ul/li[2]/ul/li[1]/a')), 4000)) // wait until content shows up
          //.then(_ => driver.findElement(By.xpath('/html/body/table[1]/tbody/tr[2]/td/table/tbody/tr/td[1]/ul/li[1]/table/tbody/tr[2]/td/div/nav/div[1]/ul/li[2]/ul/li[1]/a')).click()) // click on MyStudent Centre
          //.then(_ => driver.wait(until.elementLocated(By.xpath('//*[@id="DERIVED_SSS_SCL_DESCR254A"]')), 8000)) // body of MyStudent Centre
          //.then(_ => driver.findElement(By.xpath('//*[@id="DERIVED_SSS_SCL_TITLE1$78$"]')).getText()) // Netname
          .then(_ => driver.quit(), e => driver.quit().then(() => { throw e; }));
      } catch (err) {
        console.log(err);
      } finally {
        res.end();
      }
  });
}
