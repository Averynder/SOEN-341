import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.ExpectedConditions;


public class UserCase14 extends UC{
	public static boolean run(String user, String pass) {

		login(user, pass, true);
		Driver.findElement(By.xpath("//button[contains(.,'Semester')]")).click();
		System.out.println("Selected semester instead of sequence");
		WebElement DropDownSemesterMenu = Driver.findElement(By.xpath("//select[@id='semester']"));	//TODO: randomize selection
		Select SemesterSelector = new Select((DropDownSemesterMenu));
		SemesterSelector.selectByVisibleText("Winter");
		WebElement DropDownYearMenu = Driver.findElement(By.xpath("//form[2]/div/select"));//TODO: randomize selection
		Select YearSelector = new Select(DropDownYearMenu);
		YearSelector.selectByVisibleText("2020");
		System.out.println("Selected Winter 2020");
		Driver.findElement(By.xpath("//button[contains(.,'Continue')]")).click();
		Driver.findElement(By.xpath("//input")).sendKeys("COMP248");//TODO: randomize selection
		WebDriverWait wait = new WebDriverWait(Driver, 10);
		WebElement button = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[@type='button']")));	//splash screen workaround
		button.click();
		Driver.findElement(By.xpath("//select")).click();
		WebElement Section = Driver.findElement(By.name("course-section"));
		Select sectionSelector = new Select(Section);//TODO: randomize me daddy
		sectionSelector.selectByVisibleText("section 2");
		System.out.println("Added COMP248 section 2 successfully");//TODO: match the random selection or replace with generic confirmation message
		Driver.close();	//TODO: make more robust by checking that the course is displayed on the schedule before returning true
		return true;
	}
}
