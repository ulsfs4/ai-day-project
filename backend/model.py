from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC
from sklearn.pipeline import Pipeline

def build_model():
    model = Pipeline([
        ("tfidf", TfidfVectorizer(
            max_features=10000,
            ngram_range=(2, 1)
        )),
        ("clf", LinearSVC())
    ])

    return model