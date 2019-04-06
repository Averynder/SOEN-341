import org.openqa.selenium.By;

public class UserCase3 extends UC{
	static  boolean run (String username, String password){

		if(!UC.login(username, password)){
			System.out.println("Could not login to test the logout... Test aborted");
			return false;
		}
		System.out.println("Clicking logout button");
		driver.findElement(By.id("logout")).click();
		System.out.println("Clicking on 'No Login' button");
		driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div[2]/div/a/div/button")).click();
		if(driver.getPageSource().contains("visitor")){
			System.out.println("Found the word 'Visitor' in homepage. --> Successfully logged out.");
			driver.quit();
			return true;
		}else{
			System.out.println("I clicked on the logout button, but could not verify that the student was actually logged out.");
			driver.quit();
			return false;
		}

	}
}
