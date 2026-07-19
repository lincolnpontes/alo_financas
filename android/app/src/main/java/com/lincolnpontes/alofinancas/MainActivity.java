package com.lincolnpontes.alofinancas;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.media.AudioAttributes;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.View;

import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    private static final int SYSTEM_BAR_COLOR = 0xFF102C28;
    private static final int APP_BACKGROUND_COLOR = 0xFFF5F7F4;
    private static final int EXTRA_TOP_DP = 8;
    private static final int EXTRA_BOTTOM_DP = 10;
    private static final String ALARM_CHANNEL_ID = "alo_alarms_v3";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        registerPlugin(BiometricLoginPlugin.class);
        super.onCreate(savedInstanceState);
        createAlarmChannel();
        applySystemBarSafeArea();
    }

    private void createAlarmChannel() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return;
        NotificationManager manager = getSystemService(NotificationManager.class);
        if (manager == null) return;

        NotificationChannel channel = new NotificationChannel(
            ALARM_CHANNEL_ID,
            "Alarmes do Alô Finanças",
            NotificationManager.IMPORTANCE_HIGH
        );
        channel.setDescription("Alarmes de contas, tarefas e prioridades da lista da feira");
        channel.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC);
        channel.enableVibration(true);
        channel.setVibrationPattern(new long[] { 0, 800, 300, 800, 300, 1000 });
        channel.enableLights(true);
        channel.setLightColor(0xFF1D8B68);

        Uri alarmSound = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_ALARM);
        AudioAttributes audioAttributes = new AudioAttributes.Builder()
            .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
            .setUsage(AudioAttributes.USAGE_ALARM)
            .build();
        channel.setSound(alarmSound, audioAttributes);
        manager.createNotificationChannel(channel);
    }

    private void applySystemBarSafeArea() {
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
        getWindow().setStatusBarColor(SYSTEM_BAR_COLOR);
        getWindow().setNavigationBarColor(SYSTEM_BAR_COLOR);

        WindowInsetsControllerCompat controller = WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
        controller.setAppearanceLightStatusBars(false);
        controller.setAppearanceLightNavigationBars(false);

        View root = findViewById(android.R.id.content);
        root.setBackgroundColor(SYSTEM_BAR_COLOR);
        if (getBridge() != null && getBridge().getWebView() != null) {
            getBridge().getWebView().setBackgroundColor(APP_BACKGROUND_COLOR);
        }
        ViewCompat.setOnApplyWindowInsetsListener(root, (view, windowInsets) -> {
            Insets bars = windowInsets.getInsets(WindowInsetsCompat.Type.systemBars());
            int safeTop = Math.max(bars.top, getSystemDimension("status_bar_height")) + dp(EXTRA_TOP_DP);
            int safeBottom = Math.max(bars.bottom, getSystemDimension("navigation_bar_height")) + dp(EXTRA_BOTTOM_DP);
            view.setPadding(bars.left, safeTop, bars.right, safeBottom);
            return windowInsets;
        });
        ViewCompat.requestApplyInsets(root);
    }

    private int getSystemDimension(String name) {
        int id = getResources().getIdentifier(name, "dimen", "android");
        return id == 0 ? 0 : getResources().getDimensionPixelSize(id);
    }

    private int dp(int value) {
        return Math.round(value * getResources().getDisplayMetrics().density);
    }
}
