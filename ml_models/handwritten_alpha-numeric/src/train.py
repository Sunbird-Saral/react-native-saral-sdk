import argparse
import config
import sys
import os
sys.path.insert(0,os.path.expanduser('~')+'/react-native-saral-sdk/ml_models/common/')
from utils import load_mnist
from resnet_model import ResNet164

DEPTH = 164
MODEL_NAME = f'ResNet{DEPTH}'

def get_argument_parser(model_name):
    '''
    Argument parser which returns the options which the user inputted.

    Args:
        None

    Returns:
        argparse.ArgumentParser().parse_args()
    '''
    
    weights_path = config.PRETRAINED_WEIGHT_PATH
    image_path = f'./images/{model_name}.png'
    plot_path = f'./images/{model_name}_plot.png'

    parser = argparse.ArgumentParser()
    parser.add_argument('--epochs',
                        help = 'How many epochs you need to run (default: 10)',
                        type = int, default = config.EPOCH)
    parser.add_argument('--batch_size',
                        help = 'The number of images in a batch (default: 64)',
                        type = int, default = config.BATCH_SIZE)
    parser.add_argument('--path_for_weights',
                        help = f'The path from where the weights will be saved or loaded \
                                (default: {weights_path})',
                        type = str, default = weights_path)
    parser.add_argument('--path_for_image',
                        help = f'The path from where the model image will be saved \
                                (default: {image_path})',
                        type = str, default = image_path)
    parser.add_argument('--path_for_plot',
                        help = f'The path from where the training progress will be plotted \
                                (default: {plot_path})',
                        type = str, default = plot_path)
    parser.add_argument('--data_augmentation',
                        help = '0: No, 1: Yes (default: 1)',
                        type = int, default = 0)
    parser.add_argument('--load_weights',
                        help = '0: No, 1: Yes (default: 0)',
                        type = int, default = 0)
    parser.add_argument('--plot_training_progress',
                        help = '0: No, 1: Yes (default: 1)',
                        type = int, default = 1)
    parser.add_argument('--save_model_to_image',
                        help = '0: No, 1: Yes (default: 1)',
                        type = int, default = 1)
    # parser.add_argument('--classes', required=True, 
    #                     type = int, help='Enter number of classes: 11 or 37')
    args = parser.parse_args()

    return args

def train(model, model_name):
    # load all arguments
    # args = get_argument_parser(model_name)

    training_data, validation_data, test_data = load_mnist()
    print(f'[data loaded]')

    # build and compile the model
    model.compile()
    print('[model built]')

    # save the model architecture to an image file
    #if args.save_model_to_image:
        #model.save_model_as_image(args.path_for_image)
        #print(f'[model image saved as {args.path_for_image}]')

    # load pretrained weights
    if config.FINE_TUNE:
        model.load_weights(config.PRETRAINED_WEIGHT_PATH)
        print(f'[weights loaded from {config.PRETRAINED_WEIGHT_PATH}]')

    # train the model
    hist = None
    if config.DATA_AUGMENTATION:
        hist = model.fit_generator(training_data, validation_data,
                                   epochs = config.EPOCH, batch_size = config.BATCH_SIZE)
        print('[trained with augmented images]')
    else:
        hist = model.fit(training_data, validation_data,
                            epochs = config.EPOCH, batch_size = config.BATCH_SIZE)
        print('[trained without augmented images]')

    # save the training progress to an image file
    #if args.plot_training_progress:
        #utils.plot(history = hist, path = args.path_for_plot, title = model_name)
        #print(f'[training progress saved as {args.path_for_plot}]')

    # save the model and trained weights in the configured path
    if config.SAVE_MODEL:
        model.save(config.SAVE_MODEL_PATH)
        print(f'[Model and trained weights saved in {config.SAVE_MODEL_PATH}]')

    # evaluate the model with the test dataset
    loss_and_metrics = model.evaluate(test_data, batch_size = config.BATCH_SIZE)
    print('[Evaluation on the test dataset]\n', loss_and_metrics, '\n')

def main():
    '''
    Train the model defined above.
    '''
    model = ResNet164()
    train(model, MODEL_NAME)

if __name__ == '__main__':
    main()