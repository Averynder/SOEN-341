import java.util.InputMismatchException;
import java.util.Scanner;
public class TestMaster {

	public static void main(String[] args) {

		Scanner userInput = new Scanner(System.in);
		System.out.print("Please enter username: ");
		String username = userInput.nextLine();
		System.out.print("\nPassword: ");
		String password = userInput.nextLine();
		outerloop: while (true) {
			int userCaseNumber = 0;
			int numberOfRuns = 0;
			boolean runsEntered = false, userCaseEntered = false;


			while (!runsEntered || !userCaseEntered) {
				try {
					while (!userCaseEntered) {
						System.out.print("Which user case would you like to run (0 to exit):");
						userCaseNumber = userInput.nextInt();
						userInput.nextLine();
						if (userCaseNumber == 0) {
							System.out.println("Goodbye");
							userInput.close();
							break outerloop;
						}
						if (userCaseNumber < 50 && userCaseNumber > -1)
							userCaseEntered = true;
						else {
							System.out.println("The number of the user case doesn't exist, Please enter a valid number from 0-50");
						}
					}
					while (!runsEntered) {
						System.out.print("Please enter the number of runs you would like to execute: ");
						numberOfRuns = userInput.nextInt();
						userInput.nextLine();
						if (numberOfRuns < 10000)
							runsEntered = true;
						else {
							System.out.println("The number of runs is too many, Please enter a valid number from 0 - 10,000");
						}
					}
				} catch (InputMismatchException ime) {
					userInput.nextLine();
					System.out.println("The input you submitted was not a number or outside of the range available for a programming integer");
				}
			}

			// run as many times as user specified
			boolean withLogin = false;
			boolean answeredQuestion = false;
			while (numberOfRuns > 0) {
				switch (userCaseNumber) {

					case 1:

						if (UserCase1.run(username, password)) {
							System.out.println("Test #" + numberOfRuns + " completed successfully for UC1");
							numberOfRuns--;
							break;
						}else {
							System.out.println("Please re-enter credentials and run again (0 for either to exit):");
							System.out.print("username: ");
							username = userInput.nextLine();
							System.out.print("\nPassword: ");
							password = userInput.nextLine();
							if (username.equals("0") || password.equals("0")){
								System.out.println("Goodbye");
								userInput.close();
								break outerloop;
							}
							continue ;
						}
					case 3:
						if(UserCase3.run(username, password)){
							System.out.println("Test #"+ numberOfRuns+" completed successfully for UC3");
							numberOfRuns--;
							break;
						}else{
							System.out.println("Closing driver...");
							UC.driver.quit();
							System.out.println("Please re-enter credentials and run again (0 for either to exit):");
							System.out.print("username: ");
							username = userInput.nextLine();
							System.out.print("\nPassword: ");
							password = userInput.nextLine();
							if (username.equals("0") || password.equals("0")) {
								System.out.println("Goodbye");
								userInput.close();
								break outerloop;
							}
							//	continue;
						}
					case 14:
						if (UserCase14.run(username, password)) {
							System.out.println("Test #" + numberOfRuns + " completed successfully for UC14");
							numberOfRuns--;
							break ;

						} else {
							System.out.println("Closing driver... ");
							UC.driver.quit();
							System.out.print("Driver closed");
							System.out.println("Please re-enter credentials and run again (0 for either to exit):");
							System.out.print("username: ");
							username = userInput.nextLine();
							System.out.print("\nPassword: ");
							password = userInput.nextLine();
							if (username.equals("0") || password.equals("0")) {
								System.out.println("Goodbye");
								userInput.close();
								break outerloop;
							}
						//	continue;
						}
					case 18:
						if (UserCase18.run()) {
							System.out.println("Test #" + numberOfRuns + " completed successfully for UC18");
							numberOfRuns--;
							break;
						} else {
							System.out.println("UC18 failed. Please check log file");
							numberOfRuns = 0;
							break;
						}

					case 22:
						if(!answeredQuestion) {
							System.out.print("Do you want to perform this use case while logged in? [y/n]: ");
							String answer = userInput.nextLine();
							System.out.println();
							withLogin =answer.equals("y");
							answeredQuestion = true;
						}if(UserCase22.run(username, password, withLogin)){
						System.out.println("Test #"+ numberOfRuns+" completed successfully for UC22");
						numberOfRuns--;
					} else {
						System.out.println("Closing driver... ");
						UC.driver.quit();
						System.out.print("Driver closed");
						System.out.println("Please re-enter credentials and run again (0 for either to exit):");
						System.out.print("username: ");
						username = userInput.nextLine();
						System.out.print("\nPassword: ");
						password = userInput.nextLine();
						if (username.equals("0") || password.equals("0")) {
							System.out.println("Goodbye");
							userInput.close();
							break outerloop;
						}
						continue;
					}

					case 29:
						if (UserCase29.run()){
							System.out.println("Test #"+ numberOfRuns+" completed successfully for UC29");
							numberOfRuns--;
							break;
						}else{
							System.out.println("UC29 failed. Please check log file");
							numberOfRuns = 0;
							break;
						}
					default:
						userCaseEntered = false;
						while (!userCaseEntered) {
							try {
								System.out.println("Number doesn't match any user case implemented, try again: ");
								userCaseNumber = userInput.nextInt();
								userCaseEntered = true;
							} catch (InputMismatchException e) {
								System.out.println("Input not a number");
								userInput.nextLine(); //Consume junk line
							}
						}
				}
			}

		}

	}
}
