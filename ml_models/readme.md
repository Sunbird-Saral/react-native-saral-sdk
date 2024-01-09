# Saral OCR Assets

Saral is an OCR-plus application that is capable of doing OCR and can also understand the structure of the physical input. Please find Saral OCR assets below. The ttlite version of these assets are packaged as part of Saral SDK for edge location predictions using mobile compute. 

###### To install dependencies, run this command line
``
$ pip install -r requirements.txt 
``

This repository conists of below folders:
- Common - Contains model architecture and helper fuctions (data augmentation on fly, loading dataset etc. )
- [handwritten_digits](https://github.com/Sunbird-Saral/react-native-saral-sdk/tree/enhancement/ml_folder_struct/ml_models/handwritten_digits) - Contains dataset, training, and inference pipeline for handwritten digits recognition.
- [OMR detection notebook](https://github.com/Sunbird-Saral/Project-Saral/blob/v1-develop/models/v1.5/omr_predictions.ipynb) - Logic implemented for OMR detection.
- [handwritten_alpha-numeric](https://github.com/Sunbird-Saral/react-native-saral-sdk/tree/enhancement/ml_folder_struct/ml_models/handwritten_alpha-numeric) - Contains dataset, training, and inference pipeline for the alpha-numeric data recognition.
- [GAN](https://github.com/Sunbird-Saral/react-native-saral-sdk/tree/enhancement/ml_folder_struct/ml_models/GAN) - To generate synthetic/ artificial dataset of a particular class
- free-text extraction - TBD
