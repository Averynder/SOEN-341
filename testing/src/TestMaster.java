
public class TestMaster
{
    public static void main(String[] args)
    {
        // If no script used, just run this once
        if (args.length == 0)
        {
            args = new String[1];
            args[0] = "1";
        }
        
        // run as many times as user specified
        if (args.length < 2)
        {
            for (int numberOfRuns = Integer.parseInt(args[0]); numberOfRuns > 0; numberOfRuns--)
            {
                if (UserCase1.run())
                    System.out.println("Test Completed Successfully");
                else
                    System.out.println("Test Failed, please verify in the log above");
            }
        }
    }
}
