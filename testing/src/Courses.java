import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.*;
import org.json.simple.JSONObject;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class Courses {
	public static void main (String[] args) {
		System.setProperty(FirefoxDriver.SystemProperty.DRIVER_USE_MARIONETTE, "true");
		System.setProperty(FirefoxDriver.SystemProperty.BROWSER_LOGFILE, "/dev/null");
		java.util.logging.Logger.getLogger("org.openqa.selenium").setLevel(Level.OFF);

		WebDriver driver = new FirefoxDriver();
		driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
		driver.get(" https://www.concordia.ca/academics/undergraduate/calendar/current/sec71/71-60.html");
		WebDriverWait wait = new WebDriverWait(driver, 30);
		WebElement ENCSSection = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("/html/body/div/section/div/div/div[2]/div[2]/div[4]/div/div/div[1]/h3/a"))); //splash screen workaround
		ENCSSection.click();
		String ENGRCoursesText = driver.findElement(By.xpath("/html/body/div/section/div/div/div[2]/div[2]/div[4]/div/div/div[2]")).getText();
		driver.findElement(By.xpath("/html/body/div/section/div/div/div[2]/div[2]/div[3]/div/div/div[1]/h3/a")).click();
		String ENCSCoursesText = driver.findElement(By.xpath("/html/body/div/section/div/div/div[2]/div[2]/div[3]/div/div/div[2]/div/div/div/div")).getText();
		//System.out.println(ENCSCoursesText);
		System.out.println("Finished");

		List<String> allMatches = new ArrayList<String>();
		Matcher m = Pattern.compile("ENCS \\d\\d\\d").matcher(ENCSCoursesText);
		while (m.find())
			allMatches.add(m.group());

		System.out.println(allMatches.toString());
		List<String> ENCSCoursesList = new ArrayList<String>();
		for (String course : allMatches){
			if (!ENCSCoursesList.contains(course))
				ENCSCoursesList.add(course);
		}
		String[] ENCSCoursesArray = new String[ENCSCoursesList.size()];
		for (int i = 0; i<ENCSCoursesArray.length; i++)
			ENCSCoursesArray[i] = ENCSCoursesList.get(i).substring(5);
		System.out.println(ENCSCoursesArray[2]);
		driver.get("https://my.concordia.ca");
		Scanner input = new Scanner(System.in);
		try {
			do {
				System.out.println("Enter username:");

				String username = input.nextLine();
				System.out.println("Enter password:");
				String password = input.nextLine();
				driver.findElement(By.id("userid")).sendKeys(username);
				driver.findElement(By.id("pwd")).sendKeys(password);
				WebElement submit = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//input[@value='Log in']")));
				submit.click();
				try {
					Thread.sleep(2000);
				} catch (InterruptedException e) {
					System.out.println(e.getCause());
				}
			} while (driver.findElement(By.id("login_error")).isDisplayed());
		}catch (NoSuchElementException e){
			System.out.println("login successful");;
		}
		driver.get("https://campus.concordia.ca/psp/pscsprd/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL?");
		driver.switchTo().frame(0);
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.linkText("Search")));
		driver.findElement(By.linkText("Search")).click();

		//for (int i = 0; i<ENCSCoursesArray.length; i++) {
			WebElement DropDownSemesterMenu = driver.findElement(By.id("CLASS_SRCH_WRK2_STRM$35$"));
			Select semesterSelector = new Select(DropDownSemesterMenu);
			semesterSelector.selectByVisibleText("ALL TERMS (2019-2020)");
			driver.findElement(By.id("SSR_CLSRCH_WRK_SUBJECT$1")).sendKeys("ENCS");
			driver.findElement(By.id("SSR_CLSRCH_WRK_CATALOG_NBR$2")).sendKeys(ENCSCoursesArray[0]);
			driver.findElement(By.xpath("//td[3]/div/a/span")).click();
			try{
				Thread.sleep(2000);
			}catch (InterruptedException e){
				System.out.println(e.getCause());
			}
			driver.findElement(By.id("CLASS_SRCH_WRK2_SSR_PB_CLASS_SRCH")).click();
			driver.findElement(By.id("CLASS_SRCH_WRK2_SSR_PB_CLASS_SRCH")).click();
			WebElement sectionsFound = driver.findElement(By.xpath("/html/body/form/div[5]/table/tbody/tr/td/div/table/tbody/tr[14]/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td[2]/div/table/tbody/tr[1]/td"));
			String sectionsFoundText = sectionsFound.getText();
			String numberOfSectionsText = sectionsFoundText.replaceAll("[^\\d.]","").trim();
			int numberOfSections = Integer.parseInt(numberOfSectionsText);
			System.out.println(numberOfSections + " total sections found");
			WebElement row = driver.findElement(By.id("trSSR_CLSRCH_MTG1$0_row1"));
		System.out.println(row.getText());
		//}


		//driver.quit();

	}
}
