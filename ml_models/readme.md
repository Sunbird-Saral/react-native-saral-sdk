#Basic info:
This repo is the ML based OCR implementation for recognition of handwritten digits and alphanumeric data on OMR marksheet 


This repo conists of 3 folders:
    - Common
    - handwritten_alpha-numeric
    - handwritten_digtis


- Common - Contains model architecture and helper fuctions (data augmentation on fly, loading dataset etc. )
- handwritten_alpha-numeric - Contains dataset, experiment notebooks, training, and inference pipeline for the alpha-numeric dataset (Details as link)
- handwritten_digtis - Contains dataset, experiment notebooks, training, and inference pipeline for  handwritten digits dataset (Details as a link)


(Link will bring you here)
- handwritten_digits:
Draw a tree folder structure for better understanding

This folder contains:
    - Data
        - raw - Consists of the raw dataset for all classes (i.e 0-9 digits and 10 as noise)
        - test - Consists of inference/ test dataset
    - models 
        - pretrained - Consists pre-trained Resnet model
        - saved models - Consists of training checkpoints
    - notebooks
        (Folder per each experiment - E.g experiment1, experiment2,...)
        - experiment1
            - readme.md - Basic information of the training and prediction cycle
            - prediction.ipynb - Jupyter notebook that constists the prediction pipeline (for .h5 and .tflite models)
    - src
        - config.py - Parameters to configure the training piplelie (augmentation(bool), no. of classes(11 for digits/ 37 for alpha-numeric), path to save model, path to pretrained weights, etc. )
        - train. py - Training pipeline for handwritten digits
        - predict.py - Prediction pipeline for handwritten digits