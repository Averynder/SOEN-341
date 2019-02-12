import java.awt.Desktop;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

public class FirstConnection
{
    public static void main(String[] args)
    {
        // If no script used, just run this once
        if (args.length == 0)
        {
            args = new String[1];
            args[0] = "1";
        }
        
        // run as many times as user specified for every input
        for (int numberOfArguments = 0; numberOfArguments < args.length; numberOfArguments++)
        {
            for (int numberOfRuns = Integer.parseInt(args[numberOfArguments]); numberOfRuns > 0; numberOfRuns--)
            {
                URL url;
                InputStream connectionToSite = null;
                BufferedReader htmlGrabber;
                String currentHTMLline;
                
                try
                {
                    if (Desktop.isDesktopSupported() && Desktop.getDesktop().isSupported(Desktop.Action.BROWSE))
                    {
                        Desktop.getDesktop().browse(new URI("http://localhost:3000/"));
                    }
                    url = new URL("http://localhost:3000/");
                    connectionToSite = url.openStream();
                    htmlGrabber = new BufferedReader(new InputStreamReader(connectionToSite));

                    while ((currentHTMLline = htmlGrabber.readLine()) != null)
                    {
                        System.out.println(currentHTMLline);
                    }
                    System.out.println("Connection Successful!");
                }
                catch (URISyntaxException urise)
                {
                    System.out.println("Sorry the site is not a valid one / couldn't connect");
                }
                catch (IOException ioe)
                {
                    System.out.println("No default browser or failed to launch it");
                }
            }
        }
    }
}

/*
Resources:
https://stackoverflow.com/questions/5226212/how-to-open-the-default-webbrowser-using-java
https://docs.oracle.com/javase/7/docs/api/java/net/URISyntaxException.html
https://stackoverflow.com/questions/7201722/java-desktop-getdesktop-browseuri-is-supported-but-does-not-open-document
https://docs.oracle.com/javase/7/docs/api/java/awt/Desktop.html#browse(java.net.URI)
https://www.mkyong.com/java/java-convert-string-to-int/
https://stackoverflow.com/questions/238547/how-do-you-programmatically-download-a-webpage-in-java
 */
