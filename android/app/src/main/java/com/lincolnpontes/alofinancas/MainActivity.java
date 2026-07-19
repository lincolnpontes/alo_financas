package com.lincolnpontes.alofinancas;

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

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        registerPlugin(BiometricLoginPlugin.class);
        super.onCreate(savedInstanceState);
        applySystemBarSafeArea();
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
