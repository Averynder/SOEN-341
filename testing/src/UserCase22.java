import org.openqa.selenium.By;
import org.openqa.selenium.ElementClickInterceptedException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.InputMismatchException;
import  java.util.Random;
import java.util.List;
import java.util.Scanner;
/*
This class tests UC22: the ability to customize the color of a course. It currently uses COMP248 with a random section
and a random lab. It will pick the color at random.
NOTE: when testing this user case, please be aware that the webdriver will not close the browser! This is in order for
the tester to ensure visually that the color has changing. You need to close the browsers manually after each test
iteration.
 */
public class UserCase22 extends UC{
	public static boolean run(String user, String pass, boolean wantLogin) {
		if (wantLogin) {
			if (!login(user, pass))
				return false;
		}else if (!noLogin())
			return false;
		Random rand = new Random();

		driver.findElement(By.xpath("//button[contains(.,'Semester')]")).click();
		System.out.println("Selected semester instead of sequence");
		WebDriverWait wait = new WebDriverWait(driver, 20);
		wait.until(ExpectedConditions.elementToBeClickable(By.id("semester")));
		WebElement DropDownSemesterMenu = driver.findElement(By.id("semester"));
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
		driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div[2]/div[2]/button")).click();
		driver.findElement(By.xpath("/html/body/div[3]/div/div/div[2]/form/div[2]/button"));
		driver.findElement(By.id("colorChanger")).click();
		System.out.print("Selecting color... ");
		driver.findElement(By.xpath("//select[@id='colorChanger']/option")).click();
		driver.findElement(By.xpath("//form/div[2]/button")).click();
		int color = rand.nextInt(19-1)+1;
		driver.findElement(By.xpath("//span["+color+"]/div/span/div")).click();
		driver.findElement(By.xpath("//div[5]/div/div/div[3]/div/button")).click();
		driver.findElement(By.xpath("//div[3]/div/button")).click();
		System.out.println("Color selected, Check it out on the browser B)");
		return true;
	}
}
