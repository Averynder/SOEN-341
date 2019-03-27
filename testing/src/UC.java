import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxBinary;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.firefox.FirefoxDriver;

import java.util.concurrent.TimeUnit;
import java.util.logging.Level;

/*
This is a parent class to all use cases. It is not meant to be run, contains initial methods necessary for all UCs.
 */
public class UC {

	static WebDriver driver;
	static final String URL = "http://localhost:3000";
	private static void setup(){
//		System.setProperty("webdriver.gecko.driver","src/main/resources/drivers/geckodriver.exe");
//		System.setProperty(FirefoxDriver.SystemProperty.DRIVER_USE_MARIONETTE,"true");
//		System.setProperty(FirefoxDriver.SystemProperty.BROWSER_LOGFILE,"/dev/null");
		FirefoxBinary firefoxBinary = new FirefoxBinary();
		firefoxBinary.addCommandLineOptions("--headless");
		FirefoxOptions firefoxOptions = new FirefoxOptions();
		firefoxOptions.setBinary(firefoxBinary);
		String URL = "http://localhost:3000";
		java.util.logging.Logger.getLogger("org.openqa.selenium").setLevel(Level.OFF);
		System.setProperty("webdriver.gecko.driver","../testing/dependencies/geckodriver");
		System.setProperty(FirefoxDriver.SystemProperty.DRIVER_USE_MARIONETTE,"true");
		System.setProperty(FirefoxDriver.SystemProperty.BROWSER_LOGFILE,"/dev/null");
		driver = new FirefoxDriver(firefoxOptions);
		driver.manage().timeouts().implicitlyWait(90, TimeUnit.SECONDS);
		driver.manage().deleteAllCookies();
	}
	public  static boolean login (String user, String pass, boolean isSuccessful) {
		setup();
		driver.get(URL);
		System.out.println("Navigated to url (logged out)");
		driver.findElement(By.xpath("//button[contains(.,'I am a Student')]")).click();
		System.out.println("filling credentials with username and password");
		boolean isLoggedIn = false;
		if (isSuccessful) {
			System.out.println("Authentication meant to succeed");
			driver.findElement(By.xpath("//input")).sendKeys(user);
			driver.findElement(By.xpath("//div[2]/input")).sendKeys(pass);
			driver.findElement(By.id("waiting")).click();
			if (driver.findElement(By.xpath("//button[contains(.,'Semester')]")).isDisplayed())
				isLoggedIn = true;
		}else {
				System.out.println("Authentication meant to fail");
				driver.findElement(By.xpath("//input")).sendKeys("xxxxxx");
				driver.findElement(By.xpath("//div[2]/input")).sendKeys("xxxxxx");
				driver.findElement(By.id("waiting")).click();
		}if (isLoggedIn)
			System.out.println("Made it to /build-seq-or-sem. Login successful");
		else
			System.out.println("Failed authentication");
		return  isLoggedIn;
	}
	public static boolean noLogin (){
		String URL = "http://localhost:3000";
		driver = new FirefoxDriver();
		driver.manage().timeouts().implicitlyWait(15, TimeUnit.SECONDS);
		driver.manage().deleteAllCookies();

		driver.get(URL);
		System.out.println("Navigated to url (logged out)");
		driver.findElement(By.xpath("//button[contains(.,'No Login')]")).click();

		if (driver.findElement(By.xpath("//button[contains(.,'Semester')]")).isDisplayed()) {
			System.out.println("Made it to /build-seq-or-sem with no login successfully");
			return true;
		}else{
			System.out.println("Could not make it to selection page with no noLogin");
			return false;
		}
	}
}
