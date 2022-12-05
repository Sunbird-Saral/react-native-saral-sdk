# Handwritten digit recognition - Playbook
Please find the handwritten digit recognition asset details below. 

## Used architecture
[Resnet 164](https://arxiv.org/abs/1603.05027)

## Dataset
- The dataset has to be placed inside ``data/raw``  
- It will consist of 11 folders (1 folder per class) in total (i.e 0-9: digit classes and 10: noise class)
- In case more dataset needed, download from: [Link](https://drive.google.com/drive/folders/1pN6_j8BBoB9yacUNCXE37d6qKK6NtOpo?usp=share_link) and place it in the same folder structure as mentioned above

## Pre-trained Resnet model
- The pre-trained Resnet model is placed inside ``models/`` 
- Can also be downloaded the pre-trained weights from: [Link](https://drive.google.com/file/d/1PZVfCDYWsmK0ejpv0r3-i0dOq-JvQgLi/view?usp=share_link)

## To train the model
- Go to ``src/``
- Using the ``config.py`` file, we can update the model specific parameters and augment the training data. Post training, the model will be saved in the given path
- To start the training
``
$ python train.py 
``
## Keras to tflite model converter
- Go to ``src/``
- Run ``keras_to_tf_converter.py`` module to convert keras model to tflite model.
``
$ keras_to_tf_converter.py
``
- Use ``config.py`` file to give the path of keras model and save path to save the tflite model

## Evaluation
- Place test dataset inside ``data/test``
- Inference images should be in the form 1_3.jpg, 9_3445.jpg, etc. (i.e classname_random digit.jpg)
- Go to ``src/``
- Use ``predict.ipynb`` file for inferencing. Get the ground truth image and it's prediction (as title of the image)

## Notebooks and reports
- Experiment notebooks are inside ``notebooks/``
- Evaluation metrics like confusion matrix is used to report the performance of model
- Can check the performance of each trained model by just executing the cells in [experiments.ipynb](https://github.com/Sunbird-Saral/react-native-saral-sdk/tree/enhancement/ml_folder_struct/ml_models/handwritten_alpha-numeric/notebooks/experiment1) file
- In case of pre-trained weights not available in the ``models/`` folder, download from the above Drive link 



