

/*
This class tests UC1: successful login. It will log the user successfully provided the given credentials are correct.
 */
public class UserCase1 extends UC {
	public static boolean run (String user, String pass) {
		//System.setOut(new PrintStream(new FileOutputStream(fileName)));
		boolean success = login(user, pass);
		System.out.println("CLOSING DRIVER");
		driver.quit();
		System.out.println("DRIVER CLOSED");
		return success;
	}

}
