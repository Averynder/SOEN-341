const { Builder, By, Key, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const rp = require('request-promise');

const driver = new Builder().forBrowser('firefox');

const requestGrades = (cookie) => {
  let options = {
    method: 'POST',
    url: 'https://genesis.concordia.ca/mportal2.0/services/sisservice.ashx',
    qs: {
      token: cookie.value,
      method: 'get-my-student-record'
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  return new Promise((resolve, reject) => {
    rp(options)
    .then(grades => resolve(grades))
    .catch(err => console.log(err));
  });
};

module.exports = {
  login: function(netname, password) {
    return new Promise(function(resolve, reject) {
      driver.setFirefoxOptions(new firefox.Options().headless()) // comment this to see browser
      browser = driver.build();
      browser.get('https://my.concordia.ca/psp/upprpr9/?cmd=login&device=mobile')
        .then(_ => browser.findElement(By.name('userid')).sendKeys(netname))
        .then(_ => browser.findElement(By.name('pwd')).sendKeys(password, Key.RETURN))
        .then(_ => browser.sleep(5000))
        .then(_ => browser.getCurrentUrl())
        .then(url => {
          console.log(url);
          if (url.includes('errorCode')) {
            resolve(false); // relay to route that user failed to log in
            browser.quit();
          } else {
            browser.manage().getCookie("concordia-mportal-auth-guid") // get auth cookie
              .then(cookie => {
                resolve(true); // relay to route that user logged in successfully
                try {
                  requestGrades(cookie)
                    .then(grades => {
                      console.log(grades);
                      browser.quit();
                    });
                } catch (err) {
                  console.log(err);
                }
              }, err => {
                reject('Error retrieving cookie');
              })
          }
        });
    });
  }
};
