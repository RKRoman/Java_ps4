package Lab_5.Lab_5;

import java.io.*;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import java.text.SimpleDateFormat;

import javax.servlet.*;
import javax.servlet.http.*;

public class myServlet extends HttpServlet{
	
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		String currentTime = new SimpleDateFormat("HH:mm:ss").format(System.currentTimeMillis());
		Path path = FileSystems.getDefault().getPath("src/main/java/Lab_5/Lab_5/web/time.html");
		
		resp.setContentType("text/html"); 
		PrintWriter out = resp.getWriter(); 
		
		List<String> page = Files.readAllLines(path);
		
		for(String str:page) {
			out.println(str.replaceAll("%MESSAGE%", currentTime));
		}
		
		out.close(); 
	}
	
}
