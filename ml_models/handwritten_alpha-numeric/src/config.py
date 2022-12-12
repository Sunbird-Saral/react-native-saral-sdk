#Note: Folder structrures are maintained as given below. Can be created if not present/ changed as per requirements
# To save the training checkpoint at the end of training
SAVE_MODEL=True

# path to save the trained model
SAVE_MODEL_PATH="../models/saved_model/"

# Save best model. 
SAVE_BEST_MODEL = False

# To convert .h5 (keras model) to a tflite model
H5_MODEL_PATH="../models/saved_model/new_model.h5"

# tflite  model save path
TF_LITE_SAVE_PATH="../models/tflite_model/an_recog_digit_tmp.tflite"

# total number of epochs you want to train the model
EPOCH=10

# batch size of training data
BATCH_SIZE=4

# Path of pretrained Resnet model to finetune it on new batch of dataset
PRETRAINED_WEIGHT_PATH='../models/pre-trained_model/trained_resnet_model_letter_digit_v0_24_epoch_basemodel.h5'

# training dataset path
IMAGE_PATH="../data/raw/*/*.jpg"

# size of the dataset to use for validation of the trained model
TEST_DATA_SIZE=4

#if you want to use pre rained model as an initializer then FINE_TUNE should be True
FINE_TUNE=False

# we can data augmentation True if dataset is small with less variation
DATA_AUGMENTATION=False

# 0-9:Digits, 10:Noise, and 11-36: Block letters
NO_OF_CLASS = 37