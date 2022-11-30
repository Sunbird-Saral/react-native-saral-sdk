import tensorflow as tf
import os
import cv2
import glob
import numpy as np

def pred_using_h5_digit(path):
    result = {}
    wrong_count=0
    for img1 in sorted(glob.iglob(path)):
        img=cv2.imread(img1)
        img= cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        img = img.astype('float32') / 255.
        img=np.reshape(img,(1,28,28,1))
        res=model.predict(img)
        pred=res[0].argmax(axis=0)
        ground = int(img1.split('/')[8])
        name = img1.split('/')[-2]
        if pred!=ground:
            result[name]=pred
            wrong_count+=1
    accuracy = (len(glob.glob(path))-wrong_count)/len(glob.glob(path))
    return result

if __name__ == '__main__':
    model = tf.keras.models.load_model(os.path.expanduser('~')+'/ml_models/handwritten_alpha-numeric/models')
    path = os.path.expanduser('~')+'/ml_models/handwritten_alpha-numeric/data/test/*'
    pred_using_h5_digit(path)