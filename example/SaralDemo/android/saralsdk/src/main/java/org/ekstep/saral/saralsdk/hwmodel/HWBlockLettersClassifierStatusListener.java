package org.ekstep.saral.saralsdk.hwmodel;

public interface HWBlockLettersClassifierStatusListener extends HWClassifierStatusListener {
    public void OnModelLoadSuccess(String message);
    public void OnModelLoadError(String message);
}
