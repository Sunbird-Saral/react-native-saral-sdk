from utils import get_train_generator, get_val_generator
import sys
sys.path.append('../../ml_models/handwritten_digits/src/models')
sys.path.append('../../ml_models/handwritten_alpha-numeric/src/models')
from tensorflow.keras.callbacks import ModelCheckpoint, TensorBoard
from keras.callbacks import CSVLogger
import datetime
import config

class BaseModel(object):
    def __init__(self, model, optimizer, callbacks = None):
        self.model = model
        self.callbacks = callbacks
        self.optimizer = optimizer
        self.csv_logger = CSVLogger(config.LOG_FILE_PATH+'training_log.csv', append=True, separator=';')

    def load_weights(self, path):
        self.model.load_weights(path)

    def save(self, path):
        self.model.save(path)

    def compile(self):
        self.model.compile(optimizer = self.optimizer, loss = 'categorical_crossentropy',
                         metrics = ['accuracy'])

    def fit(self, training_data, validation_data, epochs, batch_size):
        x_train, y_train = training_data
        x_val, y_val = validation_data
        # Tensorboard callback
        log_dir = "logs/fit/" + datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
        tensorboard_callback = TensorBoard(log_dir=log_dir,histogram_freq=1, write_graph= True, update_freq='epoch')

        #Save model callback
        if config.SAVE_BEST_MODEL == True:
            save_model_callback = ModelCheckpoint(filepath=config.SAVE_MODEL_PATH+"checkpoint_best_model.h5", 
                                                                            save_best_only=True, save_freq='epoch')
        else:
            save_model_callback = ModelCheckpoint(filepath=config.SAVE_MODEL_PATH+"checkpoint_{epoch:02d}_{val_loss:.2f}.h5", 
                                                                            period=1,save_freq='epoch')
        hist = self.model.fit(x_train, y_train, epochs = epochs,
                              batch_size = batch_size,
                              validation_data = (x_val, y_val), callbacks= [self.callbacks, tensorboard_callback, save_model_callback, self.csv_logger])

        return hist

    def fit_generator(self, training_data, validation_data, epochs, batch_size):
        x_train, y_train = training_data
        x_val, y_val = validation_data
        

        train_datagen = get_train_generator(x_train, y_train,
                                                  batch_size = batch_size)
        val_datagen = get_val_generator(x_val, y_val,
                                              batch_size = batch_size)

        # Tensorboard callback
        log_dir = "logs/fit/" + datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
        tensorboard_callback = TensorBoard(log_dir=log_dir,histogram_freq=1, write_graph= True, update_freq='epoch')

        # Save model callback
        if config.SAVE_BEST_MODEL == True:
            save_model_callback = ModelCheckpoint(filepath=config.SAVE_MODEL_PATH+"checkpoint_best_model.h5", 
                                                                            save_best_only=True, save_freq='epoch')
        else:
            save_model_callback = ModelCheckpoint(filepath=config.SAVE_MODEL_PATH+"checkpoint_{epoch:02d}_{val_loss:.2f}.h5", 
                                                                            period=1, save_freq='epoch')

        hist = self.model.fit_generator(train_datagen,
                                        callbacks = [self.callbacks, save_model_callback, tensorboard_callback, self.csv_logger],
                                        steps_per_epoch = x_train.shape[0] // batch_size,
                                        epochs = epochs, validation_data = val_datagen,
                                        validation_steps = x_val.shape[0] // batch_size)
        return hist

    def evaluate(self, eval_data, batch_size = 32):
        x, y = eval_data
        loss_and_metrics = self.model.evaluate(x, y,
                                               batch_size = batch_size)
        return loss_and_metrics

    def predict(self, x, batch_size = None, verbose = 1, steps = None):
        return self.model.predict(x, batch_size, verbose, steps)

    # def save_model_as_image(self, path):
    #     plot_model(self.model, to_file = path, show_shapes = True)
