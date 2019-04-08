import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;

public class UserCase20 extends UC{
	static boolean run(){
		String[] courses = {"SOEN228"};
		if (!noLogin()){
			System.out.println("Could not navigate to builder page using no login");
			return false;
		}

		driver.findElement(By.xpath("//button[contains(.,'Semester')]")).click();
		System.out.println("Selected semester instead of sequence");
		WebDriverWait wait = new WebDriverWait(driver, 20);
		wait.until(ExpectedConditions.elementToBeClickable(By.id("semester")));
		WebElement DropDownSemesterMenu = driver.findElement(By.xpath("//select[@id='semester']"));
		Select semesterSelector = new Select((DropDownSemesterMenu));
		final String[] ALL_SEMESTERS= {"Fall"};
		int semester = 0;
		wait.until(ExpectedConditions.elementToBeClickable(By.id("semester")));
		semesterSelector.selectByIndex(semester);
		WebElement DropDownYearMenu = driver.findElement(By.xpath("//form[2]/div/select"));
		Select yearSelector = new Select(DropDownYearMenu);
		List<WebElement> yearsList = yearSelector.getOptions();
		int year = 0;

		wait.until(ExpectedConditions.elementToBeClickable(By.id("semester-year")));
		yearSelector.selectByIndex(year);
		System.out.println("Selected " +ALL_SEMESTERS[semester]+" "+ yearsList.get(year).getText());
		WebElement searchBar = driver.findElement(By.id("add-class1"));
		WebElement selectButton = driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div[1]/div[3]/div/div[2]/div[1]/button"));
		WebElement errorMessage = driver.findElement(By.id("addStatus1"));

		searchBar.sendKeys("SOEN228");
		selectButton.click();
		if (errorMessage.isDisplayed() && errorMessage.getText().contains("Not Found")){
			System.out.println("Class not found message received for SOEN228.");
			return true;
		}
		else
			return false;
	}
}
