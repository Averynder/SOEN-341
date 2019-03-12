var { Builder, By, Key, until } = require('selenium-webdriver');
var chrome = require('selenium-webdriver/firefox');

module.exports = (app) => {
  app.get('/concordia/:netname/:password', function (req, res, next) {
    let driver = new Builder().forBrowser('firefox')
      //.setChromeOptions(new chrome.Options().headless()) // invisible chrome
      .setChromeOptions().build();
    let element = driver.findElement(By.id("btnGrade"));
    let executor = driver;
    executor.executeScript("arguments[0].click();", element);
      try {
        //driver.get('https://my.concordia.ca/')
        driver.get('https://my.concordia.ca/psp/upprpr9/?cmd=login&device=mobile')
          .then(_ => driver.findElement(By.name('userid')).sendKeys(req.params.netname))
          .then(_ => driver.findElement(By.name('pwd')).sendKeys(req.params.password, Key.RETURN))
          .then(_ => driver.wait(until.elementLocated(By.xpath('/html/body/table[1]/tbody/tr[2]/td/table/tbody/tr/td[1]/ul/li[1]/table/tbody/tr[2]/td/div/nav/div[1]/ul/li[2]/div')), 4000))
          .then(_ => driver.quit(), e => driver.quit().then(() => { throw e; }));
      } catch (err) {
        console.log(err);
      } finally {
        res.end();
      }
  });
}

function sleep(seconds)
{
  var e = new Date().getTime() + (seconds * 1000);
  while (new Date().getTime() <= e) {}
}