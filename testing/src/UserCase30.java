import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.Sleeper;
import org.openqa.selenium.support.ui.WebDriverWait;

public class UserCase30 extends UC {
	static boolean run(){
		if (!UserCase5.run()){
			System.out.println("Could not start the test because UC5 failed. Please check");
			return false;
		}
		System.out.println("Dragging course...");
		WebElement courseToSwap = driver.findElement(By.xpath("/html/body/div[1]/div/div[2]/div/div/div/div[2]/div/div[1]/div/div[1]/table/tbody/tr[1]"));
		String courseToSwapContent = courseToSwap.getText();
		Actions action = new Actions(driver);
		action.dragAndDrop(courseToSwap, driver.findElement(By.xpath("/html/body/div[1]/div/div[2]/div/div/div/div[2]/div/div[1]/div/div[2]/table/tbody")) ).build().perform();
		System.out.println("Course drag attempt to winter semester finished");
	//	System.out.println(driver.findElement(By.cssSelector("div.tableCol:nth-child(2) > table:nth-child(1) > tbody:nth-child(2)")).getText());
		try{
			Thread.sleep(5000);
		}catch(InterruptedException e){
			e.getCause();
		}
		if (driver.findElement(By.xpath("/html/body/div[1]/div/div[2]/div/div/div/div[2]/div/div[1]/div/div[2]")).getText().contains(courseToSwapContent)) {
			System.out.println("Course " + courseToSwapContent + " dragged to winter semester 2019 successfully");
			return true;
		}
		System.out.println("Course drag and drop attempt failed. Make sure driver is running in fullscreen and try again");

		return false;
	}


}
