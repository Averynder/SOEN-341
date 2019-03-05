import java.io.File;
import java.io.IOException;
import java.awt.Desktop;

public class UserCase1
{
    public static boolean run()
    {
        boolean success = false;
        Scraper myWebsitePlease = new Scraper("http://localhost:3000/", "C:/Users/MonPC/Desktop/School/SOEN/SOEN 341 Software Process'/Project/cssd/testing/UserCase_1/Result.html");
        boolean result = myWebsitePlease.scrap();
        if (result)
        {
            File downloadedPage;
            try
            {
                // Opens Default browser to Downloaded Result
                if (Desktop.isDesktopSupported() && Desktop.getDesktop().isSupported(Desktop.Action.BROWSE))
                {
                    downloadedPage = new File("C:/Users/MonPC/Desktop/School/SOEN/SOEN 341 Software Process'/Project/cssd/testing/UserCase_1/Result.html");
                    Desktop.getDesktop().browse(downloadedPage.toURI());
                }
                success = true;
            }
            catch (IOException ioe)
            {
                System.out.println("No default browser or failed to launch it");
            }
        }
        return success;
    }
}
