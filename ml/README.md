# MM802 Final Project Machine Learning Part

## Traffic Volume Prediction

### Install Requirements
```bash
pip install requests
pip install pandas
pip install scikit-learn
pip install numpy
```

### Train
```bash
python3 traffic_volume_train.py
```

### Predict
```python
from ml.trafficVolume.TrafficVolumePredict import TrafficVolumePredict

model = TrafficVolumePredict('ml/trafficVolume/model/traffic_volume_model.pkl', 'ml/trafficVolume/model/label_encoder.pkl')
trafficVolume = model.predict('High Level Bridge', 2024)
```
