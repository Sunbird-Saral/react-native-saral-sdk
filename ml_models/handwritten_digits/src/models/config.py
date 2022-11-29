SAVE_MODEL=True

### path where you want to save the trained model

# SAVE_MODEL_PATH="./models/new/new_dataset_training_1.h5"
SAVE_MODEL_PATH = "/home/venkateshiyer/ml_models/handwritten_digits/models"
### any keras(.h5) model path which you want to convert into tflite
# H5_MODEL_PATH="./models/trained_resnet_model_v4.h5"

### flite  model save path
# TF_LITE_SAVE_PATH="./models/hw_recog_digit_tmp.tflite"
### total number of epochs you want to train the model
EPOCH=50
BATCH_SIZE=128
### Path of pretrained model to finetune it on new batch of dataset

PRETRAINED_WEIGHT_PATH='../../models/trained_resnet_model_v2_10.h5'
# /home/venkateshiyer/ml_models/handwritten_digits/data/raw
#### datset path
IMAGE_PATH="../../data/raw/*/*.jpg"

####size of the dataset to use for validation the trained model
TEST_DATA_SIZE=4

##### if you want to use pre rained model as an initializer thwn FINE_TUNE should be True
FINE_TUNE=False

#### we can data augmentation True if dataset is small with less variation.
DATA_AUGMENTATION=False

NO_OF_CLASS = 11