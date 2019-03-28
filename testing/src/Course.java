import java.util.ArrayList;

class Course {
	String code, name;
	Course[] prerequisites;
	Course[] corequisites;
	int credits;
	ArrayList<Lecture> lectures = new ArrayList<Lecture>();


	public Course (String code) {
		this.code = code;
	}

	@Override
	public String toString () {
		return code;
	}
}
class Lecture{
	ArrayList<String> days = new ArrayList<>();
	String room, code, semester, startTime, endTime;

	public Lecture (String code) {
		this.code = code;
	}
	public String toString(){
		return code + days+room+semester;
	}
}
class Tutorial{
	String code, day, room, startTime, endTime;

	public Tutorial (String code, String day, String room, String startTime, String endTime) {
		this.code = code;
		this.day = day;
		this.room = room;
		this.startTime = startTime;
		this.endTime = endTime;
	}
}
