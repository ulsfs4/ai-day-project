
import pandas as pd
import joblib
import re
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from model import build_model

df = pd.read_csv("Final_Data.csv")

df = df.dropna()

df = df[df["review_description"].str.len() > 2]


def clean_text(text):
    text = str(text)

    text = re.sub(r"[^\u0600-\u06FFa-zA-Z0-9\s]", " ", text)

    text = re.sub(r"\s+", " ", text)

    return text.strip()

df["review_description"] = df["review_description"].apply(clean_text)

X = df["review_description"]
y = df["rating"]


X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

model = build_model()

model.fit(X_train, y_train)

y_pred = model.predict(X_test)

print("\n Classification Report:\n")
print(classification_report(y_test, y_pred))

joblib.dump(model, "emotion_model.pkl")

print("\n Model trained and saved successfully!")