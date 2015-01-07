package lab1;
import java.util.Scanner;
public class Main {
	 static double read()
	    {
	        double a;
	        Scanner sc = new Scanner(System.in);
	      if(sc.hasNextDouble()) { // возвращает истинну если с потока ввода можно считать целое число
	          a = sc.nextDouble(); // считывает число с потока ввода и сохраняет в переменную
	          return a;
	      } else {
	        System.out.println("Вы ввели не число");
	       return -1;
	       }
	        	 	      
	    }
	 public static void Solve(double a, double b, double c, double x1, double x2)
	    {
		 	if (a == 0) throw new Exception("Коэффициент А равен нулю");
	    	double D = Math.pow(b,2) - 4*a*c;
			
	    	if (D>0) {
				x1 = (-b + Math.sqrt(D))/(2*a);
				x2 = (-b - Math.sqrt(D))/(2*a);
				System.out.print(x1+" "+x2);
				}
	    	if (D==0) 	{
	    		x1=-b/(2*a);
	    		x2=0;
	    		System.out.print(x1);
	    	}	   
	    	if (D<0) throw new Exception("Уравнение не имеет действительных решений");
	    }
	    public static void main(String[] args) {
	       
	    	double a,b,c; 
	        do {
	        System.out.print("A= ");
	        a=read();
	        } while (a==-1 );
	        
	        do {
		        System.out.print("B= ");
		        b=read();
		        } while (b==-1 );
	        do {
		        System.out.print("C= ");
		        c=read();
		        } while (c==-1 );
	       
	        Solve(a,b,c,0,0);
     
	    }
}
