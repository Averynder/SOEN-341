import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;

public class UserCase16 extends UC{
	static boolean run (){
		if (!UserCase5.run()){
			System.out.println("Could not start the test because UC5 failed. Please check.");
			return false;
		}
		System.out.println("Swapping ENCS282 to the top of fall semester...");
		WebElement courseToSwap = driver.findElement(By.xpath("/html/body/div[1]/div/div[2]/div/div/div/div[2]/div/div[1]/div/div[1]/table/tbody/tr[4]"));
		String courseToSwapContent = courseToSwap.getText();
		Actions action = new Actions(driver);
		action.dragAndDrop(courseToSwap, driver.findElement(By.xpath("/html/body/div[1]/div/div[2]/div/div/div/div[2]/div/div[1]/div/div[1]/table/thead/tr/th[2]")) ).build().perform();
		System.out.println("Verifying if swap was successful...");
		try{
			Thread.sleep(2000);
		}catch (InterruptedException e){
			System.out.println(e.getMessage());
		}
		if (driver.findElement(By.xpath("/html/body/div[1]/div/div[2]/div/div/div/div[2]/div/div[1]/div/div[1]/table/tbody/tr[1]")).getText().contains("ENCS282")) {
			System.out.println("SOEN287 swapped to the top successfully");
			return true;
		}
		System.out.println("Swap was not successful");
		return false;


	}
}
