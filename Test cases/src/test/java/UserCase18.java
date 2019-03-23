import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class UserCase18 extends UC{
	public static boolean run () {
		//System.setOut(new PrintStream(new FileOutputStream(fileName)));
		boolean success = noLogin();
		System.out.println("CLOSING DRIVER");
		Driver.quit();
		System.out.println("DRIVER CLOSED");
		return success;
	}
}
