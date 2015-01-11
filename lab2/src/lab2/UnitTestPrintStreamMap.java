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
import java.util.Map;
import java.util.TreeMap;

public class UnitTestPrintStreamMap {

	File fileMap;
	PrintStreamMap map;
	Map<String, String> myMap;
	
	public String fileToString(File file) throws IOException
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
	public void Init() throws FileNotFoundException
	{
		fileMap = new File("Map.txt");
		map = new PrintStreamMap(fileMap);
		myMap = new TreeMap<String, String>();
	}
	
	@After
	public void CloseStream()
	{
		map.close();
	}
	
	@Test
	public void TestMap() throws IOException {
		
		myMap.put("#000000", "black");
		myMap.put("#0000FF", "blue");
		myMap.put("#006400", "darkgreen");
		myMap.put("#00FF00", "green");
		myMap.put("#BEBEBE", "grey");
		myMap.put("#FF0000", "red");
		myMap.put("#FFFF00", "yellow");
		myMap.put("#FFFFFF", "while");
				
		myMap.put("#000000", "BLACK");
		map.println(myMap);
				
		assertEquals("#000000 BLACK\n#0000FF blue\n#006400 darkgreen\n#00FF00 green\n#BEBEBE grey\n#FF0000 red\n#FFFF00 yellow\n#FFFFFF while\n", fileToString(fileMap));
	}
	
	
	

}
