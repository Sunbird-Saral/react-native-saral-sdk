# Generating artificial dataset using GAN - Playbook
Please find the synthetic/ artificial datset generation asset details below.

## Training a GAN
- Go to ``src/``
- configure the parameters using ``config.py``
- To start training
 ``bash
$ python train_GAN.py 
``
## Generation of dataset using trained model
- Go to ``src/``
- configure the parameters using ``config.py``
- To start evaluation/ generation of synthetic dataset
 ``bash
$ python eval_GAN.py 
``
