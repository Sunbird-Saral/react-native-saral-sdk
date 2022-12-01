# ML based OCR implementation for recognition of handwritten digits and alphanumeric data

This repository is integrated to Saral project. Saral is an OCR-plus application that is capable of doing OCR and can also understand the structure of the physical input.

###### To install dependencies, run this command line
```bash
$ pip install -r requirements.txt 
```

This repository conists of 3 folders:
- Common - Contains model architecture and helper fuctions (data augmentation on fly, loading dataset etc. )
- handwritten_alpha-numeric - Contains dataset, training, and inference pipeline for the alpha-numeric data recognition.
- handwritten_digtis - Contains dataset, training, and inference pipeline for handwritten digits recognition. [Playbook link](react-native-saral-sdk/ml_models/handwritten_digits/readme.md)
