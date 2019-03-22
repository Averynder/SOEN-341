
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
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



		Driver.get(URL);
		System.out.println("Navigated to url (logged out)");
		Driver.findElement(By.xpath("//button[contains(.,'I am a Student')]")).click();
		System.out.println("filling credentials with username: user, password: pass");
		Driver.findElement(By.xpath("//input")).sendKeys("user");
		Driver.findElement(By.xpath("//div[2]/input")).sendKeys("password");
		Driver.findElement(By.xpath("//button[@value='Submit']")).click();
		//System.out.println("ELEMENT "+ driver.findElement(By.xpath("//h2[contains(.,'Select an Option')]")).getText());
		if (Driver.findElement(By.xpath("//h2")).getText().equals("Select an Option")) {
			System.out.println("Made it to /LoadingCourses . Login successful");
			success = true;
		}
		Driver.manage().deleteAllCookies();
		System.out.println("CLOSING DRIVER");
		Driver.quit();
		System.out.println("DRIVER CLOSED");
		return success;
	}

}
