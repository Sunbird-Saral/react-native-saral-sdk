#Note: Folder structrures are maintained as given below. Can be created if not present/ changed as per requirements
# -- # -- # -- # -- for train_GAN.py -- # -- # -- # 

# Image path to train the model with / To create the synthetic dataset of a specific class (E.g 7/ 8/ 9) 
IMAGE_PATH="../data/raw/7/*"

# Path to save the training checkpoint
MODEL_SAVE_PATH="../models/saved_model/wgan_model_v4_digit_7/"

# Size of the latent space
latent_dim = 50

# Pretrained model to fine tune on. If available mention path or else keep it as NONE. (E.g: FINE_TUNE_MODEL_PATH=None/ FINE_TUNE_MODEL_PATH = 'path to model')
FINE_TUNE_MODEL_PATH='../models/pre-trained_model/wgan_model_v3_digit_7_8400_.h5'

# Save model after every 20 epochs
SAVE_EPOCHS=20

# -- # -- # -- # -- for eval_GAN.py -- # -- # -- # 

# To load the trained model for evaluation
TRAINED_MODEL_PATH="../models/saved_model/wgan_model_v4_digit_7_33600_.h5"

# Path to write the generated images from evaluation
IMAGE_SAVE_PATH="../data/generated_images/wgan_model_v4_digit_7_33600/"

