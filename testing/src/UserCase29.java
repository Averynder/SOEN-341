import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;
import java.util.Random;

public class UserCase29  extends  UserCase14{
	public static boolean run (){
		if (!UserCase14.run()){
			System.out.println("Adding a course failed (UC14). Please check UC14 or the add a course functionality.");
			return false;
		}
		driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div[2]/div[5]/button")).click();
		System.out.println("Removing course...");
		driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div[1]/div[3]/div/div[2]/div[2]/button")).click();
		driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div[1]/div[5]/button")).click();
		if (driver.findElement(By.id("selected-course-table")).findElements(By.tagName("tr")).size() ==0) { //if the number of rows in the selected course table = 0. Meaning table is empty
			System.out.println("COMP249 successfully removed.");
			driver.quit();
			return true;
		}else{
			System.out.println("Course was not successfully removed, please run the case without closing the driver and check the webdriver for additional info.");
			driver.quit();
			return false;
		}
	}
}
