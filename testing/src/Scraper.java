import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.FileOutputStream;
import static java.util.concurrent.TimeUnit.SECONDS;

import com.google.common.base.Function;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;

public class Scraper
{
    private String outputLocation, websiteLocation;
    private File output;
    
    public Scraper()
    {
        outputLocation = "C:/Users/MonPC/Desktop/School/SOEN/SOEN 341 Software Process'/Project/cssd/testing/Result.html";
        websiteLocation = "http://localhost:3000/";
        output = new File(outputLocation);
    }
    
    public Scraper(String websiteLocation, String outputLocation)
    {
        this.outputLocation = outputLocation;
        this.websiteLocation = websiteLocation;
        output = new File(outputLocation);
    }
    
    public boolean scrap()
    {
        PrintWriter filewriter = null;
        boolean success = false;
        try
        {
            filewriter = new PrintWriter(new FileOutputStream(output));
            System.setProperty("webdriver.gecko.driver", "C:/Users/MonPC/Desktop/School/SOEN/SOEN 341 Software Process'/Project/cssd/testing/dependencies/geckodriver.exe");
            WebDriver firefoxInstance = new FirefoxDriver();
            firefoxInstance.get(websiteLocation);
            firefoxInstance.manage().window().maximize();
            System.out.println("Currently Running Firefox on: " + websiteLocation);
            Wait wait = new FluentWait(firefoxInstance)
                    .withTimeout(30, SECONDS)
                    .pollingEvery(5, SECONDS)
                    .ignoring(NoSuchElementException.class);
            Object foo = wait.until(new Function()
            {
                public Object apply(Object driver)
                {
                    return ((WebDriver)driver).findElement(By.className("display-4"));
                }
            });
            //firefoxInstance.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS); doesn't work
            WebElement frame = firefoxInstance.findElement(By.tagName("html"));
            filewriter.println("<html>");
            filewriter.println(frame.getAttribute("innerHTML"));
            filewriter.println("</html>");
            firefoxInstance.close();
            success = true;
        }
        catch (FileNotFoundException fnf)
        {
            System.out.println("File was moved or deleted during the write process");
        }
        finally
        {
            if (filewriter != null)
                filewriter.close();
            return success;
        }
    }

    public String getOutputLocation()
    {
        return outputLocation;
    }

    public String getWebsiteLocation()
    {
        return websiteLocation;
    }

    public File getOutput()
    {
        return output;
    }
}
