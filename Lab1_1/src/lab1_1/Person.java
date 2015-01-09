package lab1_1;

public class Person {

private String name; private String surname; private int age;
	
	Person(){}; 
	
	Person(String _name, String _surname, int _age) throws WrongAgeValueException 
	{
		name = _name; 
		surname = _surname; 
		setAge(_age); 
	}
	
	public void setAge(int _age) throws WrongAgeValueException 
	{
		if (_age > 0)  
			age = _age;
		else
			throw new WrongAgeValueException();
	}
	
	public String toString()
	{
		return (name + " " + surname + ", " + age);
	}
	
}
