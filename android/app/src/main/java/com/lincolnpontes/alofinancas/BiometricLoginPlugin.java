package com.lincolnpontes.alofinancas;

import android.content.Context;
import android.content.SharedPreferences;
import android.security.keystore.KeyGenParameterSpec;
import android.security.keystore.KeyProperties;
import android.os.Build;
import android.util.Base64;

import androidx.biometric.BiometricManager;
import androidx.biometric.BiometricPrompt;
import androidx.core.content.ContextCompat;
import androidx.core.hardware.fingerprint.FingerprintManagerCompat;
import androidx.fragment.app.FragmentActivity;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import org.json.JSONObject;

import java.nio.charset.StandardCharsets;
import java.security.KeyStore;
import java.util.concurrent.Executor;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;

@CapacitorPlugin(name = "BiometricLogin")
public class BiometricLoginPlugin extends Plugin {
    private static final String PREFS_NAME = "alo_financas_biometric";
    private static final String KEY_ALIAS = "alo_financas_login_key";
    private static final String PREF_CIPHER = "credentials";
    private static final String PREF_IV = "iv";
    private static final String PREF_LOGIN = "login";

    @PluginMethod
    public void getStatus(PluginCall call) {
        int status = biometricStatus();
        JSObject result = new JSObject();
        result.put("available", status == BiometricManager.BIOMETRIC_SUCCESS);
        result.put("enabled", credentialsStored());
        result.put("login", preferences().getString(PREF_LOGIN, ""));
        result.put("statusCode", status);
        result.put("reason", biometricStatusMessage(status));
        call.resolve(result);
    }

    @PluginMethod
    public void enable(PluginCall call) {
        String login = call.getString("login", "").trim().toLowerCase();
        String password = call.getString("password", "");
        if (login.isEmpty() || password.isEmpty()) {
            call.reject("Informe login e senha.");
            return;
        }
        prompt(call, "Ativar biometria", "Confirme sua identidade", () -> {
            try {
                JSONObject credentials = new JSONObject();
                credentials.put("login", login);
                credentials.put("password", password);
                encryptAndStore(credentials.toString(), login);
                JSObject result = new JSObject();
                result.put("enabled", true);
                result.put("login", login);
                call.resolve(result);
            } catch (Exception error) {
                call.reject("Não foi possível proteger as credenciais.", error);
            }
        });
    }

    @PluginMethod
    public void authenticate(PluginCall call) {
        if (!credentialsStored()) {
            call.reject("A biometria não está ativada.");
            return;
        }
        prompt(call, "Alô Finanças", "Use sua biometria para entrar", () -> {
            try {
                JSONObject credentials = new JSONObject(decryptStored());
                JSObject result = new JSObject();
                result.put("login", credentials.optString("login", ""));
                result.put("password", credentials.optString("password", ""));
                call.resolve(result);
            } catch (Exception error) {
                clearCredentials();
                call.reject("As credenciais biométricas expiraram. Entre com sua senha novamente.", error);
            }
        });
    }

    @PluginMethod
    public void disable(PluginCall call) {
        clearCredentials();
        JSObject result = new JSObject();
        result.put("enabled", false);
        call.resolve(result);
    }

    private void prompt(PluginCall call, String title, String subtitle, Runnable onSuccess) {
        if (!biometricAvailable()) {
            call.reject("A biometria não está disponível neste aparelho.");
            return;
        }
        FragmentActivity activity = (FragmentActivity) getActivity();
        Executor executor = ContextCompat.getMainExecutor(getContext());
        BiometricPrompt prompt = new BiometricPrompt(activity, executor, new BiometricPrompt.AuthenticationCallback() {
            @Override
            public void onAuthenticationSucceeded(BiometricPrompt.AuthenticationResult result) {
                super.onAuthenticationSucceeded(result);
                onSuccess.run();
            }

            @Override
            public void onAuthenticationError(int errorCode, CharSequence errorMessage) {
                super.onAuthenticationError(errorCode, errorMessage);
                call.reject(errorMessage == null ? "Autenticação cancelada." : errorMessage.toString());
            }
        });
        BiometricPrompt.PromptInfo promptInfo = new BiometricPrompt.PromptInfo.Builder()
            .setTitle(title)
            .setSubtitle(subtitle)
            .setNegativeButtonText("Usar senha")
            .build();
        activity.runOnUiThread(() -> prompt.authenticate(promptInfo));
    }

    private boolean biometricAvailable() {
        return biometricStatus() == BiometricManager.BIOMETRIC_SUCCESS;
    }

    @SuppressWarnings("deprecation")
    private int biometricStatus() {
        BiometricManager manager = BiometricManager.from(getContext());
        int status = Build.VERSION.SDK_INT >= Build.VERSION_CODES.R
            ? manager.canAuthenticate(BiometricManager.Authenticators.BIOMETRIC_WEAK)
            : manager.canAuthenticate();
        if (status == BiometricManager.BIOMETRIC_SUCCESS) return status;

        int legacyStatus = manager.canAuthenticate();
        if (legacyStatus == BiometricManager.BIOMETRIC_SUCCESS) return legacyStatus;

        FingerprintManagerCompat fingerprint = FingerprintManagerCompat.from(getContext());
        if (fingerprint.isHardwareDetected() && fingerprint.hasEnrolledFingerprints()) {
            return BiometricManager.BIOMETRIC_SUCCESS;
        }
        return status;
    }

    private String biometricStatusMessage(int status) {
        if (status == BiometricManager.BIOMETRIC_SUCCESS) return "";
        if (status == BiometricManager.BIOMETRIC_ERROR_NONE_ENROLLED) return "Nenhuma biometria está cadastrada no Android.";
        if (status == BiometricManager.BIOMETRIC_ERROR_HW_UNAVAILABLE) return "O leitor biométrico está temporariamente indisponível.";
        if (status == BiometricManager.BIOMETRIC_ERROR_NO_HARDWARE) return "O Android não informou um leitor biométrico compatível.";
        if (status == BiometricManager.BIOMETRIC_ERROR_SECURITY_UPDATE_REQUIRED) return "O Android exige uma atualização de segurança para usar a biometria.";
        return "A biometria não está disponível para este aplicativo.";
    }

    private SharedPreferences preferences() {
        return getContext().getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
    }

    private boolean credentialsStored() {
        SharedPreferences prefs = preferences();
        return !prefs.getString(PREF_CIPHER, "").isEmpty() && !prefs.getString(PREF_IV, "").isEmpty();
    }

    private void encryptAndStore(String value, String login) throws Exception {
        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        cipher.init(Cipher.ENCRYPT_MODE, getOrCreateKey());
        byte[] encrypted = cipher.doFinal(value.getBytes(StandardCharsets.UTF_8));
        preferences().edit()
            .putString(PREF_CIPHER, Base64.encodeToString(encrypted, Base64.NO_WRAP))
            .putString(PREF_IV, Base64.encodeToString(cipher.getIV(), Base64.NO_WRAP))
            .putString(PREF_LOGIN, login)
            .apply();
    }

    private String decryptStored() throws Exception {
        SharedPreferences prefs = preferences();
        byte[] encrypted = Base64.decode(prefs.getString(PREF_CIPHER, ""), Base64.NO_WRAP);
        byte[] iv = Base64.decode(prefs.getString(PREF_IV, ""), Base64.NO_WRAP);
        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        cipher.init(Cipher.DECRYPT_MODE, getOrCreateKey(), new GCMParameterSpec(128, iv));
        return new String(cipher.doFinal(encrypted), StandardCharsets.UTF_8);
    }

    private SecretKey getOrCreateKey() throws Exception {
        KeyStore keyStore = KeyStore.getInstance("AndroidKeyStore");
        keyStore.load(null);
        if (keyStore.containsAlias(KEY_ALIAS)) {
            return ((KeyStore.SecretKeyEntry) keyStore.getEntry(KEY_ALIAS, null)).getSecretKey();
        }
        KeyGenerator keyGenerator = KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, "AndroidKeyStore");
        keyGenerator.init(new KeyGenParameterSpec.Builder(
            KEY_ALIAS,
            KeyProperties.PURPOSE_ENCRYPT | KeyProperties.PURPOSE_DECRYPT
        ).setBlockModes(KeyProperties.BLOCK_MODE_GCM)
            .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
            .build());
        return keyGenerator.generateKey();
    }

    private void clearCredentials() {
        preferences().edit().clear().apply();
        try {
            KeyStore keyStore = KeyStore.getInstance("AndroidKeyStore");
            keyStore.load(null);
            if (keyStore.containsAlias(KEY_ALIAS)) keyStore.deleteEntry(KEY_ALIAS);
        } catch (Exception ignored) {
            // Clearing preferences is sufficient to invalidate the stored login.
        }
    }
}
