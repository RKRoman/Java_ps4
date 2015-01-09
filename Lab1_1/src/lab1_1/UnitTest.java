package lab1_1;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.Before;

import java.util.ArrayList;


public class UnitTest {

	ArrayList<Person> collectAdd = new ArrayList<Person>();
	People peopleTest = new People();
	
	@Before
	public void setPeople() throws Exception {
		peopleTest.add(new Person("Till", "Lindemann", 52));
		peopleTest.add(new Person("Richard", "Kruspe", 47));
		peopleTest.add(new Person("Christian", "Lorenz", 48));
//		peopleTest.add(new Person("Christoph", "Schneider", 48));
		collectAdd.add(new Person("Paul", "Landers", 50));
		collectAdd.add(new Person("Oliver", "Riedel", 43));
	}
	
		
	@Test
	public void testAdd() throws WrongAgeValueException {
		peopleTest.add(new Person("Christoph", "Schneider", 48));
		assertEquals("Till Lindemann, 52\n"
				+ "Richard Kruspe, 47\n"
				+ "Christian Lorenz, 48\n"
				+ "Christoph Schneider, 48\n", 
				peopleTest.toString());
	}
	
	@Test
	public void testAddWithIndex() throws WrongAgeValueException
	{
		peopleTest.add(0, new Person("Christoph", "Schneider", 48));
		assertEquals("Christoph Schneider, 48\n"
				+ "Till Lindemann, 52\n"
				+ "Richard Kruspe, 47\n"
				+ "Christian Lorenz, 48\n",
				peopleTest.toString());
	}
	
	@Test (expected = IndexOutOfBoundsException.class)
	public void testAddWithIndexOutOfBounds()
	{
		peopleTest.add(4, new Person());
	}

	@Test (expected = IndexOutOfBoundsException.class)
	public void testAddAllWithIndexOutOfBounds()
	{
		peopleTest.addAll(4, collectAdd);
	}
	
	@Test (expected = WrongAgeValueException.class)
	public void testAgeValue() throws WrongAgeValueException
	{
		peopleTest.add(0, new Person("Christoph", "Schneider", 0));
	}
	
	@Test
	public void testAddAll() throws WrongAgeValueException
	{
		peopleTest.addAll(collectAdd);
		assertEquals("Till Lindemann, 52\n"
				+ "Richard Kruspe, 47\n"
				+ "Christian Lorenz, 48\n"
				+ "Paul Landers, 50\n"
				+ "Oliver Riedel, 43\n",
				peopleTest.toString());
	}
	
	@Test
	public void testAddAllWithIndex()
	{
		peopleTest.addAll(0, collectAdd);
		assertEquals("Paul Landers, 50\n"
				+ "Oliver Riedel, 43\n"
				+ "Till Lindemann, 52\n"
				+ "Richard Kruspe, 47\n"
				+ "Christian Lorenz, 48\n",
				peopleTest.toString());
	}
	
	
	
}
