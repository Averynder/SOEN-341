import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

import java.util.concurrent.TimeUnit;

public class UC {
	static boolean isLoggedIn = false;
	static WebDriver Driver;
	static final String URL = "http://localhost:3000";
	private static void setup(){
//		System.setProperty("webdriver.gecko.driver","src/main/resources/drivers/geckodriver.exe");
//		System.setProperty(FirefoxDriver.SystemProperty.DRIVER_USE_MARIONETTE,"true");
//		System.setProperty(FirefoxDriver.SystemProperty.BROWSER_LOGFILE,"/dev/null");
		String URL = "http://localhost:3000";
		Driver = new FirefoxDriver();
		Driver.manage().timeouts().implicitlyWait(15, TimeUnit.SECONDS);
		Driver.manage().deleteAllCookies();
	}
	public  static boolean login (String user, String pass, boolean isSuccessful) {
		setup();
		Driver.get(URL);
		System.out.println("Navigated to url (logged out)");
		Driver.findElement(By.xpath("//button[contains(.,'I am a Student')]")).click();
		System.out.println("filling credentials with username and password");

		if (isSuccessful) {
			System.out.println("Authentication meant to succeed");
			Driver.findElement(By.xpath("//input")).sendKeys(user);
			Driver.findElement(By.xpath("//div[2]/input")).sendKeys(pass);
			Driver.findElement(By.id("waiting")).click();
			if (Driver.findElement(By.xpath("//button[contains(.,'Semester')]")).isDisplayed())
				isLoggedIn = true;
		}else {
				System.out.println("Authentication meant to fail");
				Driver.findElement(By.xpath("//input")).sendKeys("xxxxxx");
				Driver.findElement(By.xpath("//div[2]/input")).sendKeys("xxxxxx");
				Driver.findElement(By.id("waiting")).click();
		}if (isLoggedIn)
			System.out.println("Made it to /build-seq-or-sem. Login successful");
		else
			System.out.println("Failed authentication");
		return  isLoggedIn;
	}
	public static boolean login (){
		String URL = "http://localhost:3000";
		Driver = new FirefoxDriver();
		Driver.manage().timeouts().implicitlyWait(15, TimeUnit.SECONDS);
		Driver.manage().deleteAllCookies();

		Driver.get(URL);
		System.out.println("Navigated to url (logged out)");
		Driver.findElement(By.xpath("//button[contains(.,'No Login')]")).click();
		//System.out.println("filling credentials with username: user, password: pass");
		//Driver.findElement(By.xpath("//input")).sendKeys("user");
		//Driver.findElement(By.xpath("//div[2]/input")).sendKeys("password");
		//Driver.findElement(By.xpath("//button[@value='Submit']")).click();
		if (Driver.findElement(By.xpath("//button[contains(.,'Semester')]")).isDisplayed()) {
			System.out.println("Made it to /build-seq-or-sem with no login successfully");
			return true;
		}else{
			System.out.println("Could not make it to selection page with no login");
			return false;
		}
	}
}
