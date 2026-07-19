package com.lincolnpontes.alofinancas;

import android.graphics.Color;
import android.os.Bundle;
import android.view.View;

import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    private static final int EXTRA_TOP_DP = 8;
    private static final int EXTRA_BOTTOM_DP = 10;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        applySystemBarSafeArea();
    }

    private void applySystemBarSafeArea() {
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
        getWindow().setStatusBarColor(Color.rgb(245, 247, 244));
        getWindow().setNavigationBarColor(Color.rgb(245, 247, 244));

        WindowInsetsControllerCompat controller = WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
        controller.setAppearanceLightStatusBars(true);
        controller.setAppearanceLightNavigationBars(true);

        View root = findViewById(android.R.id.content);
        root.setBackgroundColor(Color.rgb(245, 247, 244));
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
