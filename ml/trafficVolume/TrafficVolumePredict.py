import pickle
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder

class TrafficVolumePredict:
    def __init__(self, rf_model_path: str, label_encoder_path: str):
        with open(rf_model_path, 'rb') as f:
            self.rf_model: RandomForestRegressor = pickle.load(f)
        with open(label_encoder_path, 'rb') as f:
            self.label_encoder: LabelEncoder = pickle.load(f)
    

    def predict(self, site_name: str, year: int) -> int:
        # Step 1: Encode the site name
        try:
            site_name_encoded = self.label_encoder.transform([site_name])
        except ValueError:
            raise ValueError(f'Site name {site_name} not found in the training data')
        
        # Step 2: Create the feature vector
        feature_vector = np.array([[site_name_encoded[0], year]])
        
        # Step 3: Make a prediction
        predicted_volume = self.rf_model.predict(feature_vector)
        
        return int(predicted_volume[0])
