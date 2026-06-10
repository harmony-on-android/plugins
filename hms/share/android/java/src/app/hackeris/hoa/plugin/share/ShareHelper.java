package app.hackeris.hoa.plugin.share;

import android.content.Context;
import android.content.Intent;
import android.util.Log;

import java.lang.reflect.Method;

/**
 * Bridges @kit.ShareKit's systemShare to Android's Intent.ACTION_SEND.
 * Called from C++ NAPI via JNI (hms_share_stub.cpp → ShowSharePanel).
 * Gets Application context via reflection on ActivityThread (hidden API).
 */
public class ShareHelper {
    private static final String TAG = "HOA.systemShare.Java";

    /**
     * Called from C++ via JNI.
     */
    public static void showShare(String text, String title, String description) {
        Log.i(TAG, "showShare: title=\"" + title + "\" text_len=" +
              (text != null ? text.length() : 0));

        Context context = getApplicationContext();
        if (context == null) {
            Log.e(TAG, "Cannot get Application context");
            return;
        }

        try {
            Intent intent = new Intent(Intent.ACTION_SEND);
            intent.setType("text/plain");
            intent.putExtra(Intent.EXTRA_TEXT, text != null ? text : "");
            if (title != null && !title.isEmpty()) {
                intent.putExtra(Intent.EXTRA_SUBJECT, title);
            }
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

            context.startActivity(Intent.createChooser(intent,
                title != null && !title.isEmpty() ? title : "Share"));

            Log.i(TAG, "Share chooser launched");
        } catch (Exception e) {
            Log.e(TAG, "Failed to launch share chooser", e);
        }
    }

    private static Context getApplicationContext() {
        try {
            Class<?> clazz = Class.forName("android.app.ActivityThread");
            Method method = clazz.getMethod("currentActivityThread");
            Object thread = method.invoke(null);
            Method getApp = clazz.getMethod("getApplication");
            return (Context) getApp.invoke(thread);
        } catch (Exception e) {
            Log.e(TAG, "Failed to get Application via ActivityThread", e);
            return null;
        }
    }
}
