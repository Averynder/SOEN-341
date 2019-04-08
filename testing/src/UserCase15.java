import org.openqa.selenium.By;
class UserCase15 extends UserCase14{
	public static boolean run(){


		if (!UserCase14.run()) {//adds COMP248
			System.out.println("Failed because UC14 failed. Please test UC14");
			return false;
		}
		driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div[2]/a/div/button")).click();
		driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div/div[3]/button")).click();
		System.out.println("PDF download prompt appeared.");
		return true;
	}
}
