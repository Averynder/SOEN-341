public class UserCase29  extends  UserCase14{
	public static boolean run (String user, String pass, boolean wantLogin){
		boolean addedCourse =  UserCase22.run(user, pass, wantLogin);
		if (! addedCourse)
			return false;
		else
			return true; //incomplete, will need to remove courses
	}
}
