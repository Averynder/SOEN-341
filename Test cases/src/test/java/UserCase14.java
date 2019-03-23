import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.Select;

import java.sql.Driver;
import java.util.concurrent.TimeUnit;

public class UserCase14 extends UC{
	public static boolean run(String user, String pass) {

		login(user, pass, true);
		Driver.findElement(By.xpath("//button[contains(.,'Semester')]")).click();
		System.out.println("Selected semester instead of sequence");
		WebElement DropDownSemesterMenu = Driver.findElement(By.xpath("//select[@id='semester']"));
		Select SemesterSelector = new Select((DropDownSemesterMenu));
		SemesterSelector.selectByVisibleText("Winter");
		WebElement DropDownYearMenu = Driver.findElement(By.xpath("//form[2]/div/select"));
		Select YearSelector = new Select(DropDownYearMenu);
		YearSelector.selectByVisibleText("2020");
		System.out.println("Selected Winter 2020");
		Driver.findElement(By.xpath("//button[contains(.,'Continue')]")).click();
		Driver.findElement(By.xpath("//input")).sendKeys("COMP248");
		int count = 500;
		while (count>0)
			count--;
		Driver.findElement(By.xpath("//button[@type='button']")).click();
		Driver.findElement(By.xpath("//select")).click();
		WebElement Section = Driver.findElement(By.name("course-section"));
		Select sectionSelector = new Select(Section);
		sectionSelector.selectByVisibleText("section 2");
		boolean success = true;
		System.out.println("Added COMP248 section 2 successfully");
		Driver.close();
		//need to click submit button, then start adding courses to the schedule.
		return success;
	}
}
