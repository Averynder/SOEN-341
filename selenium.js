var { Builder, By, Key, until } = require('selenium-webdriver');
var chrome = require('selenium-webdriver/firefox');

module.exports = (app) => {
  app.get('/concordia/:netname/:password', function (req, res, next) {
    let driver = new Builder().forBrowser('firefox')
      //.setChromeOptions(new chrome.Options().headless()) // invisible chrome
      .setChromeOptions().build();
      try {
        let getDriver = new Promise(function(resolve, reject)
        {
          resolve(driver.get('https://my.concordia.ca/psp/upprpr9/?cmd=login&device=mobile')
              .then(_ => driver.findElement(By.name('userid')).sendKeys(req.params.netname))
              .then(_ => driver.findElement(By.name('pwd')).sendKeys(req.params.password, Key.RETURN)))
        });
        getDriver.then(function(whateverwasresolved)
        {
          console.log("Got Inside1!");
          let getNetName = new Promise(function(resolve,reject)
          {
            resolve(sleep(20));
            //resolve(driver.wait(until.elementLocated(By.id('btnGrade')), 20000))
          });
          getNetName.then(function(whateverisreturnedfromnetname)
          {
            console.log("Got Inside2!");
            let getNetName2 = new Promise(function(resolve,reject)
            {
              resolve(driver.findElement(By.id('btnGrade')).click())
            });
            getNetName2.then(function(whateverisreturnedfromnetname)
            {
              console.log("Got Inside3!");
              //
              let getNetName3 = new Promise(function(resolve,reject)
              {
                resolve(sleep(20))
              });
              getNetName3.then(function(whateverisreturnedfromnetname)
              {
                console.log("Got Inside4!");
                //
                let getNetName4 = new Promise(function(resolve,reject)
                {
                  resolve(driver.findElement(By.id('btnAllGrades')).click())
                });
                getNetName4.then(function(whateverisreturnedfromnetname)
                {
                  console.log("Scrape Time!");

                  driver.findElements(By.className("course mainsec")).then(function(elems){
                    elems.forEach(function (elem) {
                      elem.getText().then(function(textValue){
                        console.log(textValue); // Insert / Do Stuff From this point
                      });
                    });
                  });
                });
                //
              });
              //
            });
          });
        });
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