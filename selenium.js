var { Builder, By, Key, until } = require('selenium-webdriver');
var firefox = require('selenium-webdriver/firefox');

module.exports = (app) => {
  app.get('/concordia/:netname/:password', function (req, res, next) {
    let driver = new Builder().forBrowser('firefox')
      //.setFirefoxOptions(new firefox.Options().headless()) // invisible firefox
      .build();

    try {
      driver.get('https://my.concordia.ca/psp/upprpr9/?cmd=login&device=mobile')
        .then(_ => driver.findElement(By.name('userid')).sendKeys(req.params.netname))
        .then(_ => driver.findElement(By.name('pwd')).sendKeys(req.params.password, Key.RETURN))
        .then(_ => driver.wait(until.isEnabled(By.id('btnGrade')), 4000)
          .then(btn => btn.sendKeys(Key.ENTER))
        )
        .then(_ => driver.wait(until.elementLocated(By.id('btnAllGrades')), 10000)
          .then(btn => btn.click()) // done waiting, click
        )
        .then(_ => driver.wait(until.elementLocated(By.id('student-schedule')), 4000)
          .then(schedule => console.log(schedule))
        )
        .then(_ => driver.quit(), e => driver.quit().then(() => { throw e; }));
    } catch (err) {
      console.log(err);
    }
    /*
    driver.findElements(By.className("course mainsec")).then(function(elems){
    elems.forEach(function (elem) {
    elem.getText().then(function(textValue){
    console.log(textValue); // Insert / Do Stuff From this point
    */
    res.end();
  });
}
