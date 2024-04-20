# %%
import pickle
import requests
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder


# %%
def fetch_data():
    url = 'https://data.edmonton.ca/resource/b58q-nxjr.json'
    ret = []
    offset = 0
    limit = 1000
    while offset < 55000:
        print(f'\rFetching data from {offset} to {offset + limit}', end='')
        response = requests.get(url, params={'$offset': offset, '$limit': limit})
        data = response.json()
        if len(data) == 0:
            break
        filtered = filter(lambda x: 'average_daily_volume' in x, data)
        ret.extend(map(lambda x: [x['site_name'], x['year'], x['average_daily_volume']], filtered))
        offset += limit
    return ret
    
df = pd.DataFrame(fetch_data(), columns=['Site Name', 'Year', 'Average Daily Volume'])

# %%
def train(df: pd.DataFrame) -> tuple[RandomForestRegressor, LabelEncoder]:
    # Encode 'Site Name'
    label_encoder = LabelEncoder()
    df['Site Name'] = label_encoder.fit_transform(df['Site Name'])

    # Features and target
    x = df[['Site Name', 'Year']]
    y = df['Average Daily Volume']

    # Split data
    x_train, x_test, y_train, y_test = train_test_split(x.values, y.values, test_size=0.2, random_state=42)

    # Initialize and train Random Forest
    rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
    rf_model.fit(x_train, y_train)

    # Predictions
    y_train_pred = rf_model.predict(x_train)
    y_test_pred = rf_model.predict(x_test)

    # Evaluation
    train_mse = mean_squared_error(y_train, y_train_pred)
    test_mse = mean_squared_error(y_test, y_test_pred)
    train_r2 = r2_score(y_train, y_train_pred)
    test_r2 = r2_score(y_test, y_test_pred)

    print(f'Train MSE: {train_mse}, Test MSE: {test_mse}')
    print(f'Train R²: {train_r2}, Test R²: {test_r2}')

    return rf_model, label_encoder

rf_model, label_encoder = train(df)
# %%
# Save model and label encoder
with open('model/traffic_volume_model.pkl', 'wb') as f:
    pickle.dump(rf_model, f)
    print(f'Random forest model saved to {f.name}')
with open('model/label_encoder.pkl', 'wb') as f:
    pickle.dump(label_encoder, f)
    print(f'Label encoder saved to {f.name}')
