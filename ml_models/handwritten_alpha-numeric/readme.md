# Handwritten alpha-numeric recognition - Playbook
Please find the handwritten alpha-numeric recognition asset details below.

## Used architecture
[Resnet 164](https://arxiv.org/abs/1603.05027)

## Dataset
- The dataset has to be placed inside ``data/raw``  
- It will consist of 37 folders (1 folder per class) in total (i.e 0-10: digit classes (noise class included) and 11-36: block letters)
- In case more dataset needed, download from: [Link](https://drive.google.com/drive/folders/1a08_cVWF_ZE_B6K_hUvWkms8Lo4S3ebT) and place it in the same folder structure as mentioned above

## Pre-trained Resnet model
- The pre-trained Resnet model is placed inside ``models/`` 
- Can also be downloaded the pre-trained weights from: [Link](https://drive.google.com/file/d/1PZVfCDYWsmK0ejpv0r3-i0dOq-JvQgLi/view?usp=share_link)

## To train the model
- Go to ``src/``
- Using the ``config.py`` file, we can update the model specific parameters and augment the training data. Post training, the model will be saved in the given path
- To start the training
``bash
$ python train.py 
``
## To check training stats of model using TensorBoard
- Execute ``$ tensorboard --logdir logs/`` on another terminal window
- Switch to SCALAR tab to check-realtime performance 

## Keras to tflite model converter
- Go to ``src/``
- Run ``keras_to_tf_converter.py`` module to convert keras model to tflite model. Pass location of .h5 model as argument
``bash
$ keras_to_tf_converter.py
``
- Use ``config.py file`` to give the path of keras model and save path to save the tflite model

## Evaluation
- Place test dataset inside ``data/test/``
- It should contain 1 folder per class with images to infer upon (E.g ``data/test/1/0.png,1.png``)
- Go to ``src/``
- Use ``predict.ipynb`` file for inferencing. Get the ground truth image and it's prediction (as title of the image)

## Notebooks and reports
- Handwritten alphanumeric [Playbook](https://github.com/Sunbird-Saral/react-native-saral-sdk/blob/develop/ml_models/handwritten_alpha-numeric/notebooks/HandwrittenAlphaNumeric_Playbook-%5BIteration-2%5D.ipynb)
- Experiment notebooks are inside ``notebooks/``
- Evaluation metrics like confusion matrix is used to report the performance of model
- Can check the performance of each trained model by just executing the cells in [experiments.ipynb](https://github.com/Sunbird-Saral/react-native-saral-sdk/tree/enhancement/ml_folder_struct/ml_models/handwritten_alpha-numeric/notebooks/experiment1) file
- In case of pre-trained weights not available in the ``models/`` folder, download from the above Drive link 
