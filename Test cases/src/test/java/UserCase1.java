
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import java.util.concurrent.TimeUnit;

import static java.lang.Thread.*;
//import org.testng.Assert;
//import org.testng.annotations.AfterMethod;
//import org.testng.annotations.BeforeMethod;
//import org.testng.annotations.Test;

public class UserCase1 extends UC {
	public static boolean run (String user, String pass, boolean isSuccessful) {
		//System.setOut(new PrintStream(new FileOutputStream(fileName)));
		boolean success = login(user, pass, isSuccessful);
		System.out.println("CLOSING DRIVER");
		Driver.quit();
		System.out.println("DRIVER CLOSED");
		return success;
	}

}
