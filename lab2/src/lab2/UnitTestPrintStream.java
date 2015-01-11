package lab2;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.After;
import org.junit.Before;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintStream;
import java.math.*;


public class UnitTestPrintStream {

	File file;
	PrintStream stream;
	
	public String file_to_string(File file) throws IOException
	{
		String str; 
		StringBuffer sbuf = new StringBuffer();
	
		BufferedReader bufr = new BufferedReader(new FileReader(file));
		
		while ((str = bufr.readLine()) != null) {
			sbuf.append(str + "\n");
		}
		bufr.close();
		
		return sbuf.toString();
	}
	
	@Before
	public void setUp() throws FileNotFoundException
	{
		file = new File("file.txt");
		stream = new PrintStream(file);
	}
	
	@After
	public void stream_closing()
	{
		stream.close();
	}
	
	@Test
	public void Test_print() throws IOException 
	{
		stream.print(8+9);
		stream.print("Java");
		stream.print("Eclipse");
		
		assertEquals("17JavaEclipse\n", file_to_string(file));
	}
	
	@Test
	public void Test_println() throws IOException
	{
		stream.println(8+9);
		stream.println("Java");
		stream.println("Eclipse");
		
		assertEquals("17\nJava\nEclipse\n", file_to_string(file));
	}
	
	@Test
	public void Test_printf() throws IOException
	{
		stream.printf("%08d", 777);
		stream.printf("%s", "Java");
		stream.printf("%.2f", 3.14159);
		stream.printf("%b", 5<6);
		
		assertEquals("00000777Java3,14true\n", file_to_string(file));
	}
	
	
	@Test
	public void Test_append() throws IOException
	{
		stream.append('m');
		stream.append("qwerty"); 
		stream.append("PrintStream", 0, 5);
		assertEquals("mqwertyPrint\n", file_to_string(file));
	}
	
	@Test
	public void test_write() throws IOException
	{
		stream.write(123);
		stream.write(87); 
		stream.write(35);
		stream.write(64);
		stream.write(125);
		
		assertEquals("{W#@}\n" ,file_to_string(file));
	}
	
		
	@Test (expected = IndexOutOfBoundsException.class)
	public void Test_append_index_out_of_bounds() throws FileNotFoundException
	{
		stream.append("qwerty", 10, 15);
	}
		
}
