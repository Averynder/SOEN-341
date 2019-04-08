import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.nio.channels.Selector;

public class UserCase19 extends UC{
	static boolean run(){
		if (!noLogin()){
			System.out.println("noLogin failed");
			return false;
		}
		driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div/div/a[1]/div/button")).click();
		System.out.println("Selected semester instead of sequence");
		WebDriverWait wait = new WebDriverWait(driver, 20);
		wait.until(ExpectedConditions.elementToBeClickable(By.id("semester")));
		WebElement DropDownSemesterMenu = driver.findElement(By.xpath("//select[@id='semester']"));
		Select semesterSelector = new Select(DropDownSemesterMenu);
		semesterSelector.selectByIndex(0);
		System.out.println("Selected semester");
		WebElement DropDownYearMenu = driver.findElement(By.xpath("//form[2]/div/select"));
		Select yearSelector = new Select(DropDownYearMenu);
		yearSelector.selectByIndex(0);
		System.out.println("Selected year");
		WebElement searchBar = driver.findElement(By.id("add-class1"));
		WebElement selectButton = driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div[1]/div[3]/div/div[2]/div[1]/button"));
		searchBar.sendKeys("ENGR213");
		selectButton.click();
		System.out.println("Added ENGR213");
		searchBar.clear();
		searchBar.sendKeys("ENGR233");
		selectButton.click();
		System.out.println("Added ENGR233. It should conflict with ENGR213");
		driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div[1]/div[5]/button")).click();
		System.out.println("Generating schedule...");
		if (driver.findElement(By.id("timeConflict")).isDisplayed()){
			System.out.println("Time conflict message is received. Making sure schedule is empty...");
			if (!driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div[2]/div[2]")).getText().contains("ENGR")) {
				System.out.println("Schedule confirmed empty");
				return true;
			}else {
				System.out.println("Found ENGR course in schedule. Possible bug?");
				return false;
			}
		}
		System.out.println("Time conflict message not detected");
		return false;


	}
}
