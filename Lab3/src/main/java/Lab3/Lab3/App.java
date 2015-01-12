package Lab3.Lab3;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileNotFoundException;

import javax.imageio.IIOException;
import javax.imageio.ImageIO;

import org.imgscalr.Scalr;

public class App 
{
    public static void main( String[] args ) throws Exception {
		if (args.length == 3 | args.length == 4) 
		{
			try 
			{
				File imgInput = new File(args[0]); File imgOutput = new File(args[1]);
				BufferedImage imgBufIn = ImageIO.read(imgInput);
				
				if (args.length == 4) 
				{
					BufferedImage imgBufOut = Scalr.resize(imgBufIn, Scalr.Mode.FIT_EXACT, Integer.parseInt(args[2]), Integer.parseInt(args[3]));
					ImageIO.write(imgBufOut, "jpg", imgOutput);
				}
				else 
				{
					BufferedImage imageout = Scalr.resize(imgBufIn, Scalr.Mode.FIT_TO_WIDTH, Integer.parseInt(args[2]), 0);
					ImageIO.write(imageout, "jpg", imgOutput);
				}
			}
			catch (NumberFormatException exc)
			{
				System.out.println("Values of width or height are incorrect");
			}
			catch (IIOException exc)
			{
				System.out.println("Input file doesn't exist");
			}
			catch (FileNotFoundException exc)
			{
				System.out.println("Invalid path of output file");
			}
		}
		else
		{
			System.out.println("Wrong number of arguments");
		}
	}
}
