import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class CourseScraper {
	static WebDriver driver;
	static void setup() {
		System.setProperty(FirefoxDriver.SystemProperty.DRIVER_USE_MARIONETTE, "true");
		System.setProperty(FirefoxDriver.SystemProperty.BROWSER_LOGFILE, "/dev/null");
		java.util.logging.Logger.getLogger("org.openqa.selenium").setLevel(Level.OFF);

		driver = new FirefoxDriver();
		driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
	}

	public static void main (String[] args) {
		setup();
		driver.get(" https://www.concordia.ca/academics/undergraduate/calendar/current/sec71/71-60.html");
		WebDriverWait wait = new WebDriverWait(driver, 6);
		WebElement ENCSSection = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("/html/body/div/section/div/div/div[2]/div[2]/div[4]/div/div/div[1]/h3/a")));
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
		List<String> ENCSSet = new ArrayList<String>();
		for (String course : allMatches){
			if (!ENCSSet.contains(course))
				ENCSSet.add(course);
		}
		Course[] ENCSCoursesList = new Course[ENCSSet.size()];
		for (int i = 0; i< ENCSSet.size(); i++)
			ENCSCoursesList[i] = new Course(ENCSSet.get(i));

		System.out.println(ENCSCoursesList);
		String[] ENCSCoursesCodes = new String[ENCSCoursesList.length];
		for (int i = 0; i<ENCSCoursesCodes.length; i++)
			ENCSCoursesCodes[i] = ENCSCoursesList[i].code.substring(5);
		System.out.println(ENCSCoursesCodes[2]);
		ArrayList<ArrayList<String>> DeepENCSCourses = new ArrayList<ArrayList<String>>();       //array of which each entry is an arraylist containing all course search results

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
					System.out.println(e.getMessage());
				}
			} while (driver.findElement(By.id("login_error")).isDisplayed());
		}catch (NoSuchElementException e){
			System.out.println("login successful");;
		}


		for (int i = 0; i<ENCSCoursesCodes.length; i++) {
			driver.get("https://campus.concordia.ca/psp/pscsprd/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL?");
			driver.switchTo().frame(0);
			wait.until(ExpectedConditions.visibilityOfElementLocated(By.linkText("Search")));
			driver.findElement(By.linkText("Search")).click();

			WebElement DropDownSemesterMenu = driver.findElement(By.id("CLASS_SRCH_WRK2_STRM$35$"));
			Select semesterSelector = new Select(DropDownSemesterMenu);
			semesterSelector.selectByVisibleText("ALL TERMS (2019-2020)");
			driver.findElement(By.id("SSR_CLSRCH_WRK_SUBJECT$1")).sendKeys("ENCS");
			driver.findElement(By.id("SSR_CLSRCH_WRK_CATALOG_NBR$2")).sendKeys(ENCSCoursesCodes[i]);
			driver.findElement(By.xpath("//td[3]/div/a/span")).click();
			try{
				Thread.sleep(2000);
			}catch (InterruptedException e){
				System.out.println(e.getMessage());
			}
			driver.findElement(By.id("CLASS_SRCH_WRK2_SSR_PB_CLASS_SRCH")).click();
			driver.findElement(By.id("CLASS_SRCH_WRK2_SSR_PB_CLASS_SRCH")).click();
			try{
				wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("DERIVED_CLSMSG_ERROR_TEXT")));
				System.out.println(ENCSCoursesCodes[i]+" not found.");
				ENCSCoursesList[i] = null;
				continue;
			}catch (Exception e){}

			WebElement sectionsFound = driver.findElement(By.xpath("/html/body/form/div[5]/table/tbody/tr/td/div/table/tbody/tr[14]/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td[2]/div/table/tbody/tr[1]/td"));
			String sectionsFoundText = sectionsFound.getText();
			String numberOfSectionsText = sectionsFoundText.replaceAll("[^\\d.]","").trim();
			int numberOfSections = Integer.parseInt(numberOfSectionsText);
			System.out.println(numberOfSections + " total sections found for "+ENCSCoursesCodes[i]);
			String courseName = driver.findElement(By.id("win0divSSR_CLSRSLT_WRK_GROUPBOX2GP$0")).getText().split("-*\\s")[1];
			ENCSCoursesList[i].name = courseName;
			System.out.println("Name: "+ENCSCoursesList[i].name);
			driver.findElement(By.id("MTG_CLASSNAME$0")).click();
			//int credits = [0-9](\.[0-9])*
			for (int j = 0; j<numberOfSections;j++) {

				WebElement row = driver.findElement(By.id("trSSR_CLSRCH_MTG1$"+j+"_row1"));
				String[] rowText = row.getText().split("\\r?\\n");
				if (rowText[1].contains("LEC")){
					System.out.println("Adding lecture "+rowText[1]+" to course "+ENCSCoursesList[i]);
					Lecture lec = new Lecture(rowText[1]);
					if (rowText[3].contains("Mo"))
						lec.days.add("Monday");
					if (rowText[3].contains("Tu"))
						lec.days.add("Tuesday");
					if (rowText[3].contains("We"))
						lec.days.add("Wednesday");
					if (rowText[3].contains("Th"))
						lec.days.add("Thursday");
					if (rowText[3].contains("Fr"))
						lec.days.add("Friday");
					lec.room = rowText[4];
					lec.semester = rowText[7];
					String[] times = rowText[3].split(" ");
					String startTime = times[1];
					String endTime = times[3];
					lec.startTime = startTime;
					lec.endTime = endTime;
					System.out.println(lec.code+" takes place in "+ lec.room+" during "+lec.days+" from "+lec.startTime+"to "+lec.endTime+" in "+lec.semester);
					ENCSCoursesList[i].lectures.add(lec);
					//add time, name
				}
				System.out.println(Arrays.toString(rowText));
			}

		}
		for (int k = 0; k<ENCSCoursesList.length; k++) {
			if (ENCSCoursesList[k] != null) {
				System.out.println("Lectures for " + ENCSCoursesList[k].code + ":");
				System.out.println(ENCSCoursesList[k].lectures);
			}
		}


		//driver.quit();

	}
}
