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
		}else
			noLogin();
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
		Scanner input = new Scanner(System.in);
		System.out.println("Please select up to 5 valid courses to add. Format example: COMP248 (leave blank for no course");
		System.out.print("Course 1: ");
		String course1 = input.nextLine();
		System.out.print("\nCourse 2: ");
		String course2 = input.nextLine();
		System.out.print("\nCourse 3: ");
		String course3 = input.nextLine();
		System.out.print("\nCourse 4: ");
		String course4 = input.nextLine();
		System.out.print("\nCourse 5: ");
		String course5 = input.nextLine();
		System.out.print("\nInput course number if you wish to modify it (0 to continue): ");
		try {
			int modifyCourse = input.nextInt();
		}catch (InputMismatchException e){
			System.out.println("That is not an integer!");
		}
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
		System.out.println("Added COMP248, section "+ sections.get(section).getText()+ ", lab "+ labList.get(lab).getText()+" successfully");

		driver.findElement(By.xpath("//button[contains(.,'Color Selection')]")).click();
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
