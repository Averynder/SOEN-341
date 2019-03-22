import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class UserCase18 {
	public static boolean run () {
		//System.setOut(new PrintStream(new FileOutputStream(fileName)));
		boolean success = false;
		WebDriver Driver;
		String URL = "http://localhost:3000";
		Driver = new FirefoxDriver();



		Driver.get(URL);
		System.out.println("Navigated to url (logged out)");
		Driver.findElement(By.xpath("//button[contains(.,'No Login')]")).click();
		//System.out.println("filling credentials with username: user, password: pass");
		//Driver.findElement(By.xpath("//input")).sendKeys("user");
		//Driver.findElement(By.xpath("//div[2]/input")).sendKeys("password");
		//Driver.findElement(By.xpath("//button[@value='Submit']")).click();
		System.out.println("ELEMENT "+ Driver.findElement(By.xpath("//h2[contains(.,'Which build option would you like?')]")).getText());
		if (Driver.findElement(By.xpath("//h2")).getText().equals("Which build option would you like?")) {
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
