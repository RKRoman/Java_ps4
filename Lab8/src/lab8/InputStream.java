package lab8;

import java.util.concurrent.SynchronousQueue;
import java.io.UnsupportedEncodingException;

public class InputStream implements Runnable {
    
	private SynchronousQueue<String> syncQueue;
    private Thread InputStreamThread;
    private String txt = "";
    private String key = "";
    private String Encrypted = "";

    public InputStream(SynchronousQueue<String> syncQueue, String txt, String key) throws InterruptedException, UnsupportedEncodingException {
        
    	this.syncQueue = syncQueue;
        this.txt = txt;
        this.key = key;
        this.Encrypted = encrypt();
        
        InputStreamThread = new Thread(this, "InputStream Thread");
        InputStreamThread.start();
    }

    private String encrypt() throws UnsupportedEncodingException {
        
        byte[] txt = this.txt.getBytes();
        byte[] key = this.key.getBytes();
        byte[] result = new byte[txt.length];
        
        for(int i = 0; i<txt.length; i++)
        {
            result[i] = (byte) (txt[i] ^ key[i % key.length]);
        }
        
        return this.Encrypted = new String(result, "UTF-8");
    }

    public void run() {
        
    
        while (Encrypted == null) {}
        try {
        	syncQueue.put(this.Encrypted);
        	Encrypted = null;
        } catch (InterruptedException ie) {}
          catch (IllegalMonitorStateException ex) {}
    }

    public void stop() {
        this.InputStreamThread = null;
    }
}
