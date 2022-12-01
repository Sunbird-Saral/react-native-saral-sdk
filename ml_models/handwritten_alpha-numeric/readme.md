# Handwritten alpha-numeric recognition - Playbook
This repository is for alpha-numeric recognition which is integrated to Saral project. Saral is an OCR-plus application that is capable of doing OCR and can also understand the structure of the physical input.

## Dataset
- The dataset has to be placed inside data/raw  
- It will consist of 37 folders (1 folder per class) in total (i.e 0-10: digit classes (noise class included) and 11-36: block letters)
- In case more dataset needed, download from: [Link](https://drive.google.com/drive/folders/1pN6_j8BBoB9yacUNCXE37d6qKK6NtOpo?usp=share_link) and place it in the same folder structure as mentioned above

## Pre-trained Resnet model
- The pre-trained Resnet model is placed inside models/ 
- Can also be downloaded the pre-trained weights from: [Link](https://drive.google.com/file/d/1PZVfCDYWsmK0ejpv0r3-i0dOq-JvQgLi/view?usp=share_link)

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