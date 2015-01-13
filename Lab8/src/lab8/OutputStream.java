package lab8;

import java.util.concurrent.SynchronousQueue;

public class OutputStream implements Runnable {

    private SynchronousQueue<String> syncQueue;
    private Thread OutPutStreamThread;

    public OutputStream(SynchronousQueue<String> syncQueue) throws InterruptedException {
        this.syncQueue = syncQueue;
        OutPutStreamThread = new Thread(this, "OutputStream Thread");
        OutPutStreamThread.start();
    }

    public void run() {

        Thread currentThread = Thread.currentThread();
               
        try {
            while (OutPutStreamThread == currentThread) {
            	System.out.println(syncQueue.take());
            }
        } catch (InterruptedException ie) {}
    }

    public void stop() {
        this.OutPutStreamThread = null;
    }
}