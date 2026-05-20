# server.py
from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


model = joblib.load("emotion_model.pkl")


@app.route("/predict", methods=["POST"])
def predict():
    try:
        print("REQUEST RECEIVED")

        data = request.get_json(force=True)
        print("DATA:", data)

        text = data.get("text", "")

        if not text:
            return jsonify({"error": "No text"}), 400

        prediction = model.predict([text])[0]

        print("PRED:", prediction)

        return jsonify({
            "emotion": str(prediction)
        })

    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({"error": str(e)}), 500
    

if __name__ == "__main__":
    app.run(debug=True)