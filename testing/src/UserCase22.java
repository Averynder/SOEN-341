import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import  java.util.Random;

/*
This class tests UC22: the ability to customize the color of a course. It currently uses COMP248 with a random section
and a random lab. It will pick the color at random.
NOTE: when testing this user case, please be aware that the webdriver will not close the browser! This is in order for
the tester to ensure visually that the color has changing. You need to close the browsers manually after each test
iteration.
 */
public class UserCase22 extends UC{
	public static boolean run() {
		if (!UserCase14.run()) {
			System.out.println("Could not start test because UC14 failed. Please check");
			return false;
		}
		driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div[2]/div[3]/button")).click();
		System.out.print("Selecting color... ");
	//	driver.findElement(By.xpath("//select[@id='colorChanger']/option")).click();
		driver.findElement(By.xpath("/html/body/div[3]/div/div/div[2]/form/div[2]/button")).click();
		Random rand = new Random();
		int color = rand.nextInt(19-1)+1;

		driver.findElement(By.xpath("//span["+color+"]/div/span/div")).click();
		driver.findElement(By.xpath("//div[5]/div/div/div[3]/div/button")).click();
		driver.findElement(By.xpath("//div[3]/div/button")).click();
		System.out.println("Color selected, Check it out on the browser B)");
		return true;
	}
}
