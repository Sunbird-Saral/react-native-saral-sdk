import tensorflow as tf
import os
import cv2
import glob
import numpy as np

def pred_using_h5_digit(model, path):
    result = {}
    wrong_count=0
    for img1 in sorted(glob.iglob(path)):
        img=cv2.imread(img1)
        img= cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        img = img.astype('float32') / 255.
        img=np.reshape(img,(1,28,28,1))
        res=model.predict(img)
        pred=res[0].argmax(axis=0)
        ground = img1.split('/')[-1] 
        ground_truth = ground.split('_')[0]
        result[img1] = pred
        if pred!= int(ground_truth):
            wrong_count+=1
    accuracy = (len(glob.glob(path))-wrong_count)/len(glob.glob(path))
    return result, accuracy

def pred_using_tflite_model(model, img_path):
    tflite_interpreter = tf.lite.Interpreter(model_path=model)
    tflite_interpreter.allocate_tensors()
    input_index = tflite_interpreter.get_input_details()
    output_index = tflite_interpreter.get_output_details()
    
    result = {}
    wrong_count=0; correct_count=0
    for img1 in sorted(glob.glob(img_path)):
        img_name= img1.split("/")[-1]
        img=cv2.imread(img1)
        img=cv2.resize(img,(28,28))
        img= cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        img = np.array(img,dtype=np.float32) / 255.0
        img=np.reshape(img,(1,28,28,1))
        tflite_interpreter.set_tensor(input_index[0]['index'],img)
        tflite_interpreter.invoke()
        predictions = tflite_interpreter.get_tensor(output_index[0]['index'])
        pred=predictions[0].argmax(axis=0)
        label = img_name.split("_")[0]
        result[img1] = pred  
        if int(label)!=pred:
            wrong_count+=1
            # result[img_name]={"ground":label,"prediction":pred}
        else:
            correct_count+=1 
    accuracy = (len(glob.glob(img_path))-wrong_count)*100/len(glob.glob(img_path))
    return result,accuracy

# if __name__ == '__main__':
#         model = os.path.expanduser('~')+'/react-native-saral-sdk/ml_models/handwritten_digits/models/tflite_model/trained_resnet_model_v2_10.tflite'
#         path = os.path.expanduser('~')+'/react-native-saral-sdk/ml_models/handwritten_digits/data/test/*'
#         print(pred_using_tflite_model(model, path))
#     model = tf.keras.models.load_model(os.path.expanduser('~')+'/react-native-saral-sdk/ml_models/handwritten_digits/models/pre-trained_model/trained_resnet_model_v2_10.h5')
#     path = os.path.expanduser('~')+'/react-native-saral-sdk/ml_models/handwritten_digits/data/test/*.jpg'
#     print(pred_using_h5_digit(model, path))
      