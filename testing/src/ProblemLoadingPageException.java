public class ProblemLoadingPageException extends Exception
{
    ProblemLoadingPageException()
    {
        super("The link specified could not be connected to and resulted in being unable to connect");
    }

    ProblemLoadingPageException(String link)
    {
        super("The link specified: " + link + " could not be connected to");
    }
}
