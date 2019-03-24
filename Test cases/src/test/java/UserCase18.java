/*This class tests UC18: the ability to access the course planner without a user account. It will attempt to access
the semester or sequence page by clicking the no login button.
*/

public class UserCase18 extends UC{
	public static boolean run () {
		//System.setOut(new PrintStream(new FileOutputStream(fileName)));
		boolean success = 	noLogin();
		System.out.println("CLOSING DRIVER");
		driver.close();
		System.out.println("DRIVER CLOSED");
		return success;
	}
}
