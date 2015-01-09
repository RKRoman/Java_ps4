package lab1_1;

import java.util.Collection;
import java.util.ArrayList;


public class People {

		
	private ArrayList<Person> peopleArray = new ArrayList<Person>(); 

	People() {}; 

	public void add(int index, Person person)	{
	peopleArray.add(index, person);
}

	public boolean add(Person person)	{
		return peopleArray.add(person);
	}
	
	public boolean addAll(int index, Collection<Person> collection)	{
		return peopleArray.addAll(index, collection);
	}
	
	public boolean addAll(Collection<Person> collection)	{
		return peopleArray.addAll(collection);
	}
	
		
	public String toString()
	{
		StringBuffer sbuf = new StringBuffer();
		
		for (Person person : peopleArray)
		{
			sbuf.append(person.toString() + "\n"); 
		}
		
		return sbuf.toString();
	}
}
