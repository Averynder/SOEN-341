import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.ElementClickInterceptedException;

import java.util.List;
import java.util.Random;

/*
This class tests UC 14: student adds course. When run, it will login using the credentials you gave at the beginning
 and will attempt to add a random section of COMP248 to a random semester of a random year.
 */
public class UserCase14 extends UC{
	public static boolean run(String user, String pass) {	//TODO: give option to choose how many courses to add.

		if (!noLogin())
			return false;
		Random rand = new Random();

		driver.findElement(By.xpath("//button[contains(.,'Semester')]")).click();
		System.out.println("Selected semester instead of sequence");
		WebDriverWait wait = new WebDriverWait(driver, 20);
		wait.until(ExpectedConditions.elementToBeClickable(By.id("semester")));
		WebElement DropDownSemesterMenu = driver.findElement(By.xpath("//select[@id='semester']"));
		Select semesterSelector = new Select((DropDownSemesterMenu));
		final String[] ALL_SEMESTERS= {"Fall", "Winter"};
		int semester = rand.nextInt(2);

		semesterSelector.selectByIndex(semester);
		WebElement DropDownYearMenu = driver.findElement(By.xpath("//form[2]/div/select"));
		Select yearSelector = new Select(DropDownYearMenu);
		List<WebElement> yearsList = yearSelector.getOptions();
		int year = rand.nextInt(yearsList.size());

		wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//form[2]/div/select")));
		yearSelector.selectByIndex(year);
		System.out.println("Selected " +ALL_SEMESTERS[semester]+" "+ yearsList.get(year).getText());
		driver.findElement(By.id("add-class1")).sendKeys("COMP248");
	//	driver.findElement(By.xpath("//input")).sendKeys("COMP248");//TODO: give option to choose course to add
		//driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div[1]/div[5]/button"));

		driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div[1]/div[3]/div/div[2]/div[1]/button")).click();
		WebElement sectionElement = driver.findElement(By.name("course-section"));
		Select sectionSelector = new Select(sectionElement);
		List<WebElement> sections = sectionSelector.getOptions();
		int section = rand.nextInt(sections.size());
		sectionSelector.selectByIndex(section);	//select random section
		WebElement tutorialElement = driver.findElement(By.xpath("//select[2]"));
		Select tutorialSelector = new Select(tutorialElement);
		List<WebElement> tutorialList = tutorialSelector.getOptions();

		int tutorial = tutorialList.size() >0 ?rand.nextInt(tutorialList.size()):0;
		tutorialSelector.selectByIndex(tutorial);
		driver.findElement(By.xpath("//button[contains(.,'Change Section')]")).click();
		System.out.println("Added COMP248, section "+ sections.get(section).getText()+ ", tutorial "+ tutorialList.get(tutorial).getText()+" successfully");//
		driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div[1]/div[5]/button")).click();   //generate schedule
		System.out.println("Generating schedule...");
		if (driver.getPageSource().contains("COMP248"))
			System.out.println("COMP248 found in weekly schedule!");
		else {
			System.out.println("COMP248 was not found in the weekly schedule");
			return false;
		}


		driver.quit();	//TODO: make more robust by confirming that the course is displayed on the schedule before returning true
		return true;
	}
}
