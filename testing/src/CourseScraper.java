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
import org.openqa.selenium.firefox.FirefoxBinary;
import org.openqa.selenium.firefox.FirefoxOptions;
import java.io.PrintWriter;



public class CourseScraper {
	static WebDriver driver;
	static void setup() {
		System.setProperty(FirefoxDriver.SystemProperty.DRIVER_USE_MARIONETTE, "true");
		System.setProperty(FirefoxDriver.SystemProperty.BROWSER_LOGFILE, "/dev/null");
		java.util.logging.Logger.getLogger("org.openqa.selenium").setLevel(Level.OFF);
		FirefoxBinary firefoxBinary = new FirefoxBinary();
		firefoxBinary.addCommandLineOptions("--headless");
		FirefoxOptions firefoxOptions = new FirefoxOptions();
		firefoxOptions.setBinary(firefoxBinary);
		driver = new FirefoxDriver(firefoxOptions);
		driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
	}

	public static void main (String[] args) {
		setup();
		driver.get(" https://www.concordia.ca/academics/undergraduate/calendar/current/sec71/71-60.html");
		WebDriverWait wait = new WebDriverWait(driver, 6);
		WebElement ENCSSection = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("/html/body/div/section/div/div/div[2]/div[2]/div[4]/div/div/div[1]/h3/a")));
		ENCSSection.click();
		String ENGRCoursesText = driver.findElement(By.xpath("/html/body/div/section/div/div/div[2]/div[2]/div[4]/div/div/div[2]")).getText();
		//System.out.println("ENGR:  "+ ENGRCoursesText);
		driver.findElement(By.xpath("/html/body/div/section/div/div/div[2]/div[2]/div[3]/div/div/div[1]/h3/a")).click();
		String ENCSCoursesText = driver.findElement(By.xpath("/html/body/div/section/div/div/div[2]/div[2]/div[3]/div/div/div[2]/div/div/div/div")).getText();

		driver.get("https://www.concordia.ca/academics/undergraduate/calendar/current/sec71/71-110.html");
		WebElement generalElectives = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("/html/body/div/section/div/div/div[2]/div[2]/div[3]")));
		String GECoursesText = driver.findElement(By.xpath("/html/body/div/section/div/div/div[2]/div[2]/div[3]")).getText();

		System.out.println("Finished");

		List<String> allMatchesENCS = new ArrayList<String>();  //find the courses in the text
		Matcher m = Pattern.compile("ENCS \\d\\d\\d").matcher(ENCSCoursesText);
		while (m.find())
			allMatchesENCS.add(m.group());

		System.out.println(allMatchesENCS.toString());
		List<String> ENCSSet = new ArrayList<String>();
		for (String course : allMatchesENCS){
			if (!ENCSSet.contains(course))      //remove duplicates
				ENCSSet.add(course);
		}

		List<String> allMatchesENGR = new ArrayList<String>();
		m = Pattern.compile("ENGR \\d\\d\\d").matcher(ENGRCoursesText);
		while(m.find())
			allMatchesENGR.add(m.group());

		System.out.println(allMatchesENGR.toString());
		List<String> ENGRSet = new ArrayList<String>();
		for (String course : allMatchesENGR){
			if (!ENGRSet.contains(course))
				ENGRSet.add(course);
		}

		List<String> allMatchesGE = new ArrayList<String>();
		m = Pattern.compile("[A-Z]{4} \\d\\d\\d").matcher(GECoursesText);
		while (m.find())
			allMatchesGE.add(m.group());


		List<String> GESet = new ArrayList<String>();
		for (String course : allMatchesGE){
			if (!GESet.contains(course))
				GESet.add(course);
		}

		Course[] ENGRCoursesArray = new Course[ENGRSet.size()];
		Course[] ENCSCoursesArray = new Course[ENCSSet.size()];
		Course[] GECoursesArray = new Course[GESet.size()];
		for (int i = 0; i< ENCSSet.size(); i++)
			ENCSCoursesArray[i] = new Course(ENCSSet.get(i));
		for (int i = 0; i<ENGRSet.size();i++)
			ENGRCoursesArray[i] = new Course(ENGRSet.get(i));
		for (int i = 0; i<GESet.size();i++)
			GECoursesArray[i] = new Course(GESet.get(i));

		System.out.println(Arrays.toString(ENCSCoursesArray));
		System.out.println(Arrays.toString(ENGRCoursesArray));
		System.out.println(Arrays.toString(GECoursesArray));
		String[] ENCSCoursesCodes = new String[ENCSCoursesArray.length];
		String[] ENGRCoursesCodes = new String[ENGRCoursesArray.length];
		String[] GECoursesCodes = new String[GECoursesArray.length];

		for (int i = 0; i<ENCSCoursesCodes.length; i++)
			ENCSCoursesCodes[i] = ENCSCoursesArray[i].code.substring(5);
		System.out.println(ENCSCoursesCodes[2]);
		for (int i = 0; i<ENGRCoursesCodes.length;i++)
			ENGRCoursesCodes[i] = ENGRCoursesArray[i].code.substring(5);
		System.out.println(ENGRCoursesCodes[2]);
		for (int i = 0; i<GECoursesCodes.length; i++)
			GECoursesCodes[i] = GECoursesArray[i].code.substring(5);

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
		final String [][] EN_COURSE_CODES = new String[][]{ENCSCoursesCodes, ENGRCoursesCodes, GECoursesCodes} ;
		String[] COURSE_KEYS = new String[2+GECoursesArray.length];
		COURSE_KEYS[0]="ENCS";
		COURSE_KEYS[1]="ENGR";
		for (int i = 2; i<GECoursesArray.length+2; i++)
			COURSE_KEYS[i] = GECoursesArray[i-2].code.substring(0,5);
		System.out.println(Arrays.toString(COURSE_KEYS));
		final Course[][] EN_ARRAYS = new Course[][]{ENCSCoursesArray, ENGRCoursesArray, GECoursesArray};
		for (int h = 0; h<3; h++) {
			for (int i = 0; i < EN_COURSE_CODES[h].length; i++) {
				driver.get("https://campus.concordia.ca/psp/pscsprd/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL?");
				driver.switchTo().frame(0);
				wait.until(ExpectedConditions.visibilityOfElementLocated(By.linkText("Search")));
				driver.findElement(By.linkText("Search")).click();
				wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("CLASS_SRCH_WRK2_STRM$35$")));
				WebElement DropDownSemesterMenu = driver.findElement(By.id("CLASS_SRCH_WRK2_STRM$35$"));
				Select semesterSelector = new Select(DropDownSemesterMenu);
				semesterSelector.selectByVisibleText("ALL TERMS (2019-2020)");
				if (h<2)
					driver.findElement(By.id("SSR_CLSRCH_WRK_SUBJECT$1")).sendKeys(COURSE_KEYS[h]);
				else
					driver.findElement(By.id("SSR_CLSRCH_WRK_SUBJECT$1")).sendKeys(COURSE_KEYS[i+2]);

				driver.findElement(By.id("SSR_CLSRCH_WRK_CATALOG_NBR$2")).sendKeys(EN_COURSE_CODES[h][i]);
				driver.findElement(By.xpath("//td[3]/div/a/span")).click();
				try {
					Thread.sleep(2000);
				} catch (InterruptedException e) {
					System.out.println(e.getMessage());
				}
				driver.findElement(By.id("CLASS_SRCH_WRK2_SSR_PB_CLASS_SRCH")).click();
				driver.findElement(By.id("CLASS_SRCH_WRK2_SSR_PB_CLASS_SRCH")).click();
				try {
					wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("DERIVED_CLSMSG_ERROR_TEXT")));
					System.out.println(EN_COURSE_CODES[h][i] + " not found.");
					EN_ARRAYS[h][i] = null;
					continue;
				} catch (Exception e) {
				}
				wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("/html/body/form/div[5]/table/tbody/tr/td/div/table/tbody/tr[14]/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td[2]/div/table/tbody/tr[1]/td")));
				WebElement sectionsFound = driver.findElement(By.xpath("/html/body/form/div[5]/table/tbody/tr/td/div/table/tbody/tr[14]/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td[2]/div/table/tbody/tr[1]/td"));
				String sectionsFoundText = sectionsFound.getText();
				String numberOfSectionsText = sectionsFoundText.replaceAll("[^\\d.]", "").trim();
				int numberOfSections = Integer.parseInt(numberOfSectionsText);
				System.out.println(numberOfSections + " total sections found for " + EN_COURSE_CODES[h][i]);
				String courseName = driver.findElement(By.id("win0divSSR_CLSRSLT_WRK_GROUPBOX2GP$0")).getText().split("-\\s")[1];
				EN_ARRAYS[h][i].name = courseName;
				System.out.print("Name: " + EN_ARRAYS[h][i].name);
				driver.findElement(By.id("MTG_CLASSNAME$0")).click();
				double credits = Double.parseDouble(driver.findElement(By.id("SSR_CLS_DTL_WRK_UNITS_RANGE")).getText().split(" ")[0]);
				String description = driver.findElement(By.id("DERIVED_CLSRCH_DESCRLONG")).getText();
				String prerequisites = description.contains("Prerequisite") ? description.split("Prerequisite:")[1] : null;
				EN_ARRAYS[h][i].credits = credits;
				System.out.println(" (" + EN_ARRAYS[h][i].credits+ " credits)");
				if (prerequisites != null)
					EN_ARRAYS[h][i].prerequisites = prerequisites.split("[;,.]");
				System.out.println("Prerequisites: "+Arrays.toString(EN_ARRAYS[h][i].prerequisites));
				driver.findElement(By.id("CLASS_SRCH_WRK2_SSR_PB_BACK")).click();
				for (int j = 0; j < numberOfSections; j++) {

					WebElement row = driver.findElement(By.id("trSSR_CLSRCH_MTG1$" + j + "_row1"));
					String[] rowText = row.getText().split("\\r?\\n");
					if (rowText[1].contains("LEC")) {
						System.out.println("Adding lecture " + rowText[1] + " to course " + EN_ARRAYS[h][i]);
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
						if (!rowText[3].contains("TBA")) {
							String[] times = rowText[3].split(" ");
							String startTime = times[1];
							String endTime = times[3];
							lec.startTime = startTime;
							lec.endTime = endTime;
						}
						System.out.println(lec.code + " takes place in " + lec.room + " during " + lec.days + " from " + lec.startTime + " to " + lec.endTime + " in " + lec.semester);
						EN_ARRAYS[h][i].lectures.add(lec);
					} else if (rowText[1].contains("TUT")) {
						System.out.println("Adding tutorial " + rowText[1] + " to lecture " + EN_ARRAYS[h][i].lectures.get(EN_ARRAYS[h][i].lectures.size() - 1));
						Tutorial tut = new Tutorial(rowText[1]);
						if (rowText[3].contains("Mo"))
							tut.day = "Monday";
						if (rowText[3].contains("Tu"))
							tut.day = "Tuesday";
						if (rowText[3].contains("We"))
							tut.day = "Wednesday";
						if (rowText[3].contains("Th"))
							tut.day = "Thursday";
						if (rowText[3].contains("Fr"))
							tut.day = "Friday";
						tut.room = rowText[4];
						if (!rowText[3].contains("TBA")) {
							String[] times = rowText[3].split(" ");
							String startTime = times[1];
							String endTime = times[3];
							tut.startTime = startTime;
							tut.endTime = endTime;
						}
						System.out.println(tut.code + " takes place in " + tut.room + " during " + tut.day + " from " + tut.startTime + " to " + tut.endTime + " in " + tut.room);
						EN_ARRAYS[h][i].lectures.get(EN_ARRAYS[h][i].lectures.size() - 1).tutorials.add(tut);
					} else if (rowText[1].contains("LAB")) {
						System.out.println("Adding lab " + rowText[1] + " to lecture " + EN_ARRAYS[h][i].lectures.get(EN_ARRAYS[h][i].lectures.size() - 1));
						Laboratory lab = new Laboratory(rowText[1]);
						if (rowText[3].contains("Mo"))
							lab.day = "Monday";
						if (rowText[3].contains("Tu"))
							lab.day = "Tuesday";
						if (rowText[3].contains("We"))
							lab.day = "Wednesday";
						if (rowText[3].contains("Th"))
							lab.day = "Thursday";
						if (rowText[3].contains("Fr"))
							lab.day = "Friday";
						lab.room = rowText[4];
						String[] times = rowText[3].split(" ");
						if (!rowText[3].contains("TBA")) {
							String startTime = times[1];
							String endTime = times[3];
							lab.startTime = startTime;
							lab.endTime = endTime;
						}
						System.out.println(lab.code + " takes place in " + lab.room + " during " + lab.day + " from " + lab.startTime + " to " + lab.endTime + " in " + lab);
						EN_ARRAYS[h][i].lectures.get(EN_ARRAYS[h][i].lectures.size() - 1).laboratories.add(lab);
					}

					System.out.println(Arrays.toString(rowText));
				}

			}
//			for (int k = 0; k < EN_ARRAYS[h].length; k++) {
//				if (EN_ARRAYS[h][k] != null) {
//					System.out.println("Lectures for " + EN_ARRAYS[h][k].code + ":");
//					System.out.println(EN_ARRAYS[h][k].lectures);
//				}
//			}
		}

		System.out.println("RETRIEVED ALL COURSE DATA FOR ENG AND ENCS. LOCATED INSIDE ENGRCoursesArray, ENCSCoursesArray and GECoursesArray");
		driver.quit();
//		PrintWriter write = null;
//		try{
//			write = new PrintWriter(File);
//		}
	}
}
