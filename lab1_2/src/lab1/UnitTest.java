package lab1;

import static org.junit.Assert.*;

import org.junit.Test;

public class UnitTest {
double delta=0.000000001;
double x1=0;
double x2=0;
 
	public void Solve1(double a, double b, double c)
	{
		if (a == 0) throw new Exception("Коэффициент А равен нулю");
		double D = Math.pow(b,2) - 4*a*c;
	
		if (D>0) {
			x1 = (-b + Math.sqrt(D))/(2*a);
			x2 = (-b - Math.sqrt(D))/(2*a);
					}
		if (D==0) 	{
			x1=-b/(2*a);
			x2=0;
			}	   
		if (D<0) throw new Exception("Уравнение не имеет действительных решений");
	}
	
	@Test
		
	public void Test1(){
	Solve1(4,4,1);
	assertEquals(x1, -0.5, delta);
	assertEquals(x2, 0, delta);
	}
	
	@Test
	
	public void Testa2(){
		Solve1(1,7.7,3);
	assertEquals(x1, -0.411613750, delta);
	assertEquals(x2, -7.288386249, delta);
	}
	
	@Test (expected = Exception.class)
	public void testZeroA()
	{
		Solve1(0,2,4);
	}
	
	@Test (expected = Exception.class)
	public void testNegD()
	{
		Solve1(8,2,4);
	}
}
