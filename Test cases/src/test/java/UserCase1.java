

/*
This class tests UC1: successful noLogin. It will log the user successfully provided the given credentials are correct.
 */
public class UserCase1 extends UC {
	public static boolean run (String user, String pass, boolean isSuccessful) {
		//System.setOut(new PrintStream(new FileOutputStream(fileName)));
		boolean success = login(user, pass, isSuccessful);
		System.out.println("CLOSING DRIVER");
		driver.close();
		System.out.println("DRIVER CLOSED");
		return success;
	}

}
