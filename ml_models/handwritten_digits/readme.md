# Handwritten digit recognition - Playbook
This repository is for handwritten digit recognition which is integrated to Saral project. Saral is an OCR-plus application that is capable of doing OCR and can also understand the structure of the physical input.

## Dataset
- The dataset has to be placed inside data/raw  
- It will consist of 11 folders in total (i.e 0-9: digit classes and 10: noise class)
- In case dataset not available, please download from: 

## Pre-trained Resnet model
- The pre-trained Resnet model is placed inside models/ 
- Incase model not available, please download the pre-trained weights from:

## To train the model
- Go to src/
- Using the config.py file, we can update the model specific parameters and augment the training data. Post training, the model will be saved in the given path
- To start the training
```bash
$ python train.py 
```
## Keras to tflite model converter
- Go to src/
- Run keras_to_tf_converter.py module to convert keras model to tflite model
- Use config.py file to give the path of keras model and save path to save the tflite model

## Evaluation
- Place test dataset inside data/test
- Go to src/
- Use predict.ipynb file for inferencing



