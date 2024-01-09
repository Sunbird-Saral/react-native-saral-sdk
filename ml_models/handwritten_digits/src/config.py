#Note: Folder structrures are maintained as given below. Can be created if not present/ changed as per requirements
# To save the training checkpoint at the end of training
SAVE_MODEL=True

# path to save the trained model
SAVE_MODEL_PATH="../models/saved_model/"

# Save best model
SAVE_BEST_MODEL = False

# To convert .h5 (keras model) to a tflite model
H5_MODEL_PATH="/home/venkateshiyer/react-native-saral-sdk/ml_models/handwritten_digits/models/saved_model/checkpoint_28_0.02.h5"

# tflite  model save path
TF_LITE_SAVE_PATH="/home/venkateshiyer/react-native-saral-sdk/ml_models/handwritten_digits/models/tflite_model/hw_digits.tflite"

# total number of epochs you want to train the model
EPOCH=60

# batch size of training data
BATCH_SIZE=30

# Path of pretrained Resnet model to finetune it on new batch of dataset
PRETRAINED_WEIGHT_PATH='../models/pre-trained_model/saral_hwd_model_itr3.h5'

# training dataset path
IMAGE_PATH="../data/raw/*/*"

# size of the dataset to use for validation of the trained model
TEST_DATA_SIZE= 500

#if you want to use pre rained model as an initializer then FINE_TUNE should be True
FINE_TUNE=False

# we can data augmentation True if dataset is small with less variation.
DATA_AUGMENTATION=True

# Number of classes (i.e 0-9: digit class and 10: noise class)
NO_OF_CLASS = 11