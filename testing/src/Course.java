import java.util.ArrayList;

class Course {
	String code, name;
	String[] prerequisites, corequisites;
	double credits;
	ArrayList<Lecture> lectures = new ArrayList<Lecture>();


	public Course (String code) {
		this.code = code;
	}

	@Override
	public String toString () {
		return code+" "+name+ " "+ credits+ " credits "+lectures;
	}
}
class Lecture{
	ArrayList<String> days = new ArrayList<>();
	ArrayList<Tutorial> tutorials = new ArrayList<Tutorial>();
	ArrayList<Laboratory> laboratories = new ArrayList<>();
	String room, code, semester, startTime, endTime;

	public Lecture (String code) {
		this.code = code;
	}
	public String toString(){
		return code +" "+ days+" "+room+" "+semester+ " start: "+startTime+" end: "+endTime+" tutorials: "+tutorials;
	}
}
class Tutorial{
	String code, day, room, startTime, endTime;

	public Tutorial (String code) {
		this.code = code;
	}

	public Tutorial (String code, String day, String room, String startTime, String endTime) {
		this.code = code;
		this.day = day;
		this.room = room;
		this.startTime = startTime;
		this.endTime = endTime;
	}

	@Override
	public String toString () {
		return code+ " "+day+" "+room+" "+startTime+" "+endTime;
	}
}
class Laboratory{
	String code, day, room, startTime, endTime;

	public Laboratory (String code) {
		this.code = code;
	}

	@Override
	public String toString () {
		return code + " "+ day+" "+room+" "+startTime+" "+endTime;
	}
}
