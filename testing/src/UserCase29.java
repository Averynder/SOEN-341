import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;
import java.util.Random;

public class UserCase29  extends  UserCase14{
	public static boolean run (){
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
		wait.until(ExpectedConditions.elementToBeClickable(By.id("semester")));
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
		if (tutorialList.size() >0) {
			int tutorial =  rand.nextInt(tutorialList.size());
			tutorialSelector.selectByIndex(tutorial);
			System.out.println("Added COMP248, section "+ sections.get(section).getText()+ ", tutorial "+ tutorialList.get(tutorial).getText()+" successfully");
		}else
			System.out.println("Added COMP248, section "+ sections.get(section).getText()+ " successfully");

		driver.findElement(By.xpath("//button[contains(.,'Change Section')]")).click();
		System.out.println("Removing course...");
		driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div[1]/div[3]/div/div[2]/div[2]/button")).click();
		if (driver.findElement(By.id("selected-course-table")).findElements(By.tagName("tr")).size() ==0) { //if the number of rows in the selected course table = 0. Meaning table is empty
			System.out.println("COMP249 successfully removed.");
			driver.quit();
			return true;
		}else{
			System.out.println("Course was not successfully removed, please run the case without closing the driver for additional info.");
			driver.quit();
			return false;
		}
	}
}
