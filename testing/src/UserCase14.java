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

		if (!login(user, pass))
			return false;
		Random rand = new Random();

		driver.findElement(By.xpath("//button[contains(.,'Semester')]")).click();
		System.out.println("Selected semester instead of sequence");
		WebElement DropDownSemesterMenu = driver.findElement(By.xpath("//select[@id='semester']"));
		Select semesterSelector = new Select((DropDownSemesterMenu));
		final String[] ALL_SEMESTERS= {"Fall", "Winter", "Summer"};
		int semester = rand.nextInt(3);
		semesterSelector.selectByIndex(semester);
		WebElement DropDownYearMenu = driver.findElement(By.xpath("//form[2]/div/select"));
		Select yearSelector = new Select(DropDownYearMenu);
		List<WebElement> yearsList = yearSelector.getOptions();
		int year = rand.nextInt(yearsList.size());
		yearSelector.selectByIndex(year);
		System.out.println("Selected " +ALL_SEMESTERS[semester]+ yearsList.get(year).getText());
		driver.findElement(By.xpath("//button[contains(.,'Continue')]")).click();
		driver.findElement(By.xpath("//input")).sendKeys("COMP248");//TODO: give option to choose course to add
		WebDriverWait wait = new WebDriverWait(driver, 20);
		WebElement button = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[@type='button']")));    //splash screen workaround
		boolean notClickableYet = true;
		while (notClickableYet) {
			try {
				button.click();
				notClickableYet = false;
			}catch (ElementClickInterceptedException e){
				continue;
			}
		}
		driver.findElement(By.xpath("//select")).click();
		WebElement sectionElement = driver.findElement(By.name("course-section"));
		Select sectionSelector = new Select(sectionElement);
		List<WebElement> sections = sectionSelector.getOptions();
		int section = rand.nextInt(sections.size());
		sectionSelector.selectByIndex(section);	//select random section
		WebElement labElement = driver.findElement(By.xpath("//select[2]"));
		Select labSelector = new Select(labElement);
		List<WebElement> labList = labSelector.getOptions();
		int lab = rand.nextInt(labList.size());
		labSelector.selectByIndex(lab);
		driver.findElement(By.xpath("//button[contains(.,'Change Section')]")).click();
		System.out.println("Added COMP248, section "+ sections.get(section).getText()+ ", lab "+ labList.get(lab).getText()+" successfully");//
		driver.quit();	//TODO: make more robust by confirming that the course is displayed on the schedule before returning true
		return true;
	}
}
