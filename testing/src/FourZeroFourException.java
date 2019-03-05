public class FourZeroFourException extends Exception
{
    FourZeroFourException()
    {
        super("The link specified could not be connected to and resulted in a 404 error");
    }

    FourZeroFourException(String link)
    {
        super("The link specified: " + link + "could not be connected to and resulted in a 404 error");
    }
}
