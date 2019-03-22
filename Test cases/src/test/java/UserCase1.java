
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import java.util.concurrent.TimeUnit;

import static java.lang.Thread.*;
//import org.testng.Assert;
//import org.testng.annotations.AfterMethod;
//import org.testng.annotations.BeforeMethod;
//import org.testng.annotations.Test;

public class UserCase1 {
	public static boolean run () {
		//System.setOut(new PrintStream(new FileOutputStream(fileName)));
		boolean success = false;
		WebDriver Driver;
		String URL = "http://localhost:3000";
		Driver = new FirefoxDriver();
		Driver.manage().timeouts().implicitlyWait(100,TimeUnit.SECONDS) ;




		Driver.get(URL);
		Driver.manage().deleteAllCookies();
		System.out.println("Navigated to url (logged out)");
		Driver.findElement(By.xpath("//button[contains(.,'I am a Student')]")).click();
		System.out.println("filling credentials with username: user, password: pass");
		Driver.findElement(By.xpath("//input")).sendKeys("user");
		Driver.findElement(By.xpath("//div[2]/input")).sendKeys("password");
		Driver.findElement(By.xpath("//button[@value='Submit']")).click();
		//Driver.findElement(By.xpath("//button[@value='Submit']")).click();
//		int count = 10000;
//		while (count>0)
//			count--;

	//	System.out.println("ELEMENT "+ Driver.findElement(By.xpath("//h2[contains(.,'Which build option would you like?')]")).getText());
		if (Driver.findElement(By.xpath("//button[contains(.,'Semester')]")).isDisplayed()) {
			System.out.println("Made it to /build-seq-or-sem. Login successful");
			success = true;
		}

		System.out.println("CLOSING DRIVER");
		Driver.quit();
		System.out.println("DRIVER CLOSED");
		return success;
	}

}
