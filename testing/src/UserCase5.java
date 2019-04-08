import org.openqa.selenium.By;
import org.openqa.selenium.ElementClickInterceptedException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;

public class UserCase5 extends UC{
	static boolean run (){

		if (!noLogin())
			return false;

		driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div/div/a[2]/div/button")).click();
		System.out.println("Selected sequence instead of semester");
		WebDriverWait wait = new WebDriverWait(driver, 10);
		wait.until(ExpectedConditions.elementToBeClickable(By.xpath("/html/body/div/div/div[2]/div/div[2]/div/a/div/button")));
		driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div[2]/div/a/div/button")).click();
		System.out.println("Clicked on generate sequence");
		String[][] courses = {{"COMP248", "ENGR213", "COMP232", "ENCS282","SOEN287"},{"COMP249", "ENGR233", "ENGR202", "SOEN228"}};
		for (int i = 0; i< courses.length; i++)
			for (int j = 0; j<courses[i].length; j++) {

				boolean clicked = false;
				while (!clicked) {
					try {
						wait.until(ExpectedConditions.elementToBeClickable(By.xpath("/html/body/div[1]/div/div[2]/div/div/div/div[2]/div/table/tr/td[1]/div/button")));
						driver.findElement(By.xpath("/html/body/div[1]/div/div[2]/div/div/div/div[2]/div/table/tr/td[1]/div/button")).click();
						clicked = true;
					} catch (ElementClickInterceptedException e) {
					}
				}
				driver.findElement(By.id("add-class")).sendKeys(courses[i][j]);
				WebElement DropDownSemesterMenu = driver.findElement(By.id("semester"));
				Select semesterSelector = new Select((DropDownSemesterMenu));
				semesterSelector.selectByIndex(i);
				String semester = semesterSelector.getOptions().get(i).getText();
				driver.findElement(By.xpath("/html/body/div[4]/div/div/div[2]/div/button")).click();
				List <WebElement> listOfSemesterTables = driver.findElements(By.id("pdfTable"));
				if (listOfSemesterTables.get(i).getText().contains(courses[i][j]))
					System.out.println("Added "+courses[i][j]+" successfully to "+semester+" 2019");
				else {
					System.out.println("Could not add " + courses[i][j] + " to " + semester + " 2019. Please inspect.");
					return false;
				}
			}
		return true;
	}
}
