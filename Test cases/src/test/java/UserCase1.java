


public class UserCase1 extends UC {
	public static boolean run (String user, String pass, boolean isSuccessful) {
		//System.setOut(new PrintStream(new FileOutputStream(fileName)));
		boolean success = login(user, pass, isSuccessful);
		System.out.println("CLOSING DRIVER");
		Driver.close();
		System.out.println("DRIVER CLOSED");
		return success;
	}

}
