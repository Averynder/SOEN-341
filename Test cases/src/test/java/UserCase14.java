import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.Select;

import java.sql.Driver;

public class UserCase14 {
	public static boolean run() {

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
		if (Driver.findElement(By.xpath("//h2")).getText().equals("Select an Option"))
			System.out.println("Made it to /LoadingCourses . Login successful");
		Driver.findElement(By.xpath("//button[contains(.,'Semester')]")).click();
		System.out.println("Selected semester instead of sequence");
		WebElement DropDownSemesterMenu = Driver.findElement(By.xpath("//select[@id='semester']"));
		Select SemesterSelector = new Select((DropDownSemesterMenu));
		SemesterSelector.selectByVisibleText("Winter");
		WebElement DropDownYearMenu = Driver.findElement(By.xpath("//select[@id='semester']"));
		Select YearSelector = new Select(DropDownYearMenu);
		YearSelector.selectByVisibleText("2020");
		System.out.println("Selected Winter 2020");
		//need to click submit button, then start adding courses to the schedule.
		return success;
	}
}
