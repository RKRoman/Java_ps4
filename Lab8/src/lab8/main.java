package lab8;

import java.util.concurrent.SynchronousQueue;
import java.io.UnsupportedEncodingException;

public class main {

	public static void main(String[] args) throws InterruptedException, UnsupportedEncodingException {
        
		SynchronousQueue<String> SyncQueue = new SynchronousQueue<String>();
		
		String [] txt = {"qwertyuiop", "etet;fdmcdsfgeet", "fhrjeoqlvnmcse"};
        String [] key = {"FFDDSTLFGDRWD", "ada123dfsdf", "A"};
        int number;

        if (txt.length == key.length) {
        	number = txt.length;
        } else {
        	throw new IllegalArgumentException("The amount of data and keys is not equal");
        }
        
        for (int i = 0; i < number; i++) {
            InputStream InputStream = new InputStream(SyncQueue, txt[i], key[i]);
            OutputStream OutputStream = new OutputStream(SyncQueue);
            
            try {
                Thread.sleep(700);
            } catch (InterruptedException ie) {}
            
            InputStream.stop();
            OutputStream.stop();
        }
 
    }
	
}
