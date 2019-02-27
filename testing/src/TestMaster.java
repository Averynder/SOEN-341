import java.util.InputMismatchException;
import java.util.Scanner;

public class TestMaster
{
    
    public static void main(String[] args)
    {
        int userCaseNumber;
        int numberOfRuns = 0;
        boolean runsEntered = false, userCaseEntered = false;
        Scanner userInput = new Scanner(System.in);
        
        while (!runsEntered || !userCaseEntered)
        {
            try
            {
                while (!userCaseEntered)
                {
                    System.out.print("Which user case would you like to run: ");
                    userCaseNumber = userInput.nextInt();
                    userInput.nextLine();
                    if (userCaseNumber < 50)
                        userCaseEntered = true;
                    else
                    {
                        System.out.println("The number of the user case doesn't exist, Please enter a valid number from 0-50");
                    }
                }
                while (!runsEntered)
                {
                    System.out.print("Please enter the number of runs you would like to execute: ");
                    numberOfRuns = userInput.nextInt();
                    userInput.nextLine();
                    if (numberOfRuns < 10000)
                        runsEntered = true;
                    else
                    {
                        System.out.println("The number of runs is too many, Please enter a valid number from 0 - 10,000");
                    }
                }
            }
            catch (InputMismatchException ime)
            {
                userInput.nextLine();
                System.out.println("The input you submitted was not a number or outside of the range available for a programming integer");
            }
        }
        
        // run as many times as user specified
        while (numberOfRuns > 0)
        {
            if (UserCase1.run()) 
            {
                System.out.println("Test Completed Successfully");
                numberOfRuns--;
            }
            else
            {
                System.out.println("Test Failed, please verify in the log file or messages above");
                numberOfRuns = 0; 
            } 
        }
        userInput.close();
    }
}
