public class UserCase18 extends UC{
	public static boolean run () {
		//System.setOut(new PrintStream(new FileOutputStream(fileName)));
		boolean success = login();
		System.out.println("CLOSING DRIVER");
		Driver.close();
		System.out.println("DRIVER CLOSED");
		return success;
	}
}
