# Saral OCR Assets

This repository is integrated to Saral project. Saral is an OCR-plus application that is capable of doing OCR and can also understand the structure of the physical input.

###### To install dependencies, run this command line
```bash
$ pip install -r requirements.txt 
```

This repository conists of 3 folders:
- Common - Contains model architecture and helper fuctions (data augmentation on fly, loading dataset etc. )
- handwritten_alpha-numeric - Contains dataset, training, and inference pipeline for the alpha-numeric data recognition.
- [handwritten_digtis](https://github.com/Sunbird-Saral/react-native-saral-sdk/tree/enhancement/ml_folder_struct/ml_models/handwritten_digits) - Contains dataset, training, and inference pipeline for handwritten digits recognition.
