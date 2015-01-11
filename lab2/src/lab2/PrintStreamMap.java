package lab2;

import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintStream;

public class PrintStreamMap extends PrintStream {

public PrintStreamMap(File file) throws FileNotFoundException {super(file);}
	
	public void println(Map map)
	{
		Set<Entry> entries = map.entrySet();
		
		for(Entry entry : entries){ print( entry.getKey().toString() + " " + entry.getValue().toString() + "\n" ); }
	}
	
}
