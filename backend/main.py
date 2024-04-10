from flask import Flask, jsonify, request
import csv
from datetime import datetime, timedelta

app = Flask(__name__)

# Helper function to parse CSV file
def parse_csv(filename):
    disruptions = []
    with open(filename, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            point_str = row['point'].replace('POINT (', '').replace(')', '')
            lon, lat = map(float, point_str.split())
            disruption = {
                "id": int(row['Disruption ID']),
                "start": row['Start Date'],
                "end": row['Finish Date'],
                "status": row['Status'],
                "impact": row['Impact'],
                "coordinate": [lon, lat]
            }
            disruptions.append(disruption)
    return disruptions


# Load data from CSV
traffic_disruptions = parse_csv("Traffic_Disruptions_20240410.csv")

@app.route('/camera-locations', methods=['GET'])
def get_camera_locations():
    # Dummy camera locations
    camera_locations = [
        {"id": 1, "name": "Camera 1", "coordinate": {"lon": -74.0059, "lat": 40.7128}},
        {"id": 2, "name": "Camera 2", "coordinate": {"lon": -73.935242, "lat": 40.73061}},
        {"id": 3, "name": "Camera 3", "coordinate": {"lon": -73.989, "lat": 40.739}},
    ]
    return jsonify(camera_locations)

@app.route('/traffic-index/yearly', methods=['GET'])
def get_yearly_traffic_index():
    from_date = request.args.get('from', (datetime.utcnow() - timedelta(days=365*6)).strftime('%Y-%m-%d'))
    to_date = request.args.get('to', datetime.utcnow().strftime('%Y-%m-%d'))
    # Dummy yearly traffic index
    yearly_traffic_index = [
        {"date": "2020-01-01", "value": 100},
        {"date": "2021-01-01", "value": 120},
        {"date": "2022-01-01", "value": 130},
        {"date": "2023-01-01", "value": 110},
        {"date": "2024-01-01", "value": 115},
    ]
    return jsonify(yearly_traffic_index)

@app.route('/traffic-index/monthly', methods=['GET'])
def get_monthly_traffic_index():
    from_date = request.args.get('from', (datetime.utcnow() - timedelta(days=30*12)).strftime('%Y-%m-%d'))
    to_date = request.args.get('to', datetime.utcnow().strftime('%Y-%m-%d'))
    # Dummy monthly traffic index
    monthly_traffic_index = [
        {"date": "2023-01-01", "value": 10},
        {"date": "2023-02-01", "value": 12},
        {"date": "2023-03-01", "value": 15},
        {"date": "2023-04-01", "value": 13},
        {"date": "2023-05-01", "value": 18},
        {"date": "2023-06-01", "value": 20},
    ]
    return jsonify(monthly_traffic_index)

@app.route('/traffic-index/daily', methods=['GET'])
def get_daily_traffic_index():
    from_date = request.args.get('from', (datetime.utcnow() - timedelta(days=30)).strftime('%Y-%m-%d'))
    to_date = request.args.get('to', datetime.utcnow().strftime('%Y-%m-%d'))
    # Dummy daily traffic index
    daily_traffic_index = [
        {"date": "2024-04-01", "value": 50},
        {"date": "2024-04-02", "value": 55},
        {"date": "2024-04-03", "value": 60},
        {"date": "2024-04-04", "value": 65},
        {"date": "2024-04-05", "value": 70},
        {"date": "2024-04-06", "value": 75},
    ]
    return jsonify(daily_traffic_index)

@app.route('/traffic-index/hourly', methods=['GET'])
def get_hourly_traffic_index():
    from_date = request.args.get('from', (datetime.utcnow() - timedelta(hours=24)).strftime('%Y-%m-%d %H:%M:%S'))
    to_date = request.args.get('to', datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S'))
    # Dummy hourly traffic index
    hourly_traffic_index = [
        {"date": "2024-04-10T00:00:00+00:00", "value": 5},
        {"date": "2024-04-10T01:00:00+00:00", "value": 6},
        {"date": "2024-04-10T02:00:00+00:00", "value": 7},
        {"date": "2024-04-10T03:00:00+00:00", "value": 8},
        {"date": "2024-04-10T04:00:00+00:00", "value": 9},
        {"date": "2024-04-10T05:00:00+00:00", "value": 10},
    ]
    return jsonify(hourly_traffic_index)

@app.route('/traffic-disruptions', methods=['GET'])
def get_traffic_disruptions():
    return jsonify(traffic_disruptions)

if __name__ == '__main__':
    app.run(debug=True)
