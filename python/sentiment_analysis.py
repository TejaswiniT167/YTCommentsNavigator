import sys
import json
from textblob import TextBlob
import retrieve_data

# Used simple Rule-based Sentiment Analysis Technique using TextBlob Python Library.
# This can be replaced with other preferrable techniques or your own trained NLP Model :)


def analyze_sentiment(comment):
    analysis = TextBlob(comment)
    if analysis.sentiment.polarity >= 0:
        return 'positive'
    else:
        return 'negative'


def get_sentiments(query_str):
    comments = retrieve_data.process_comments('search', query_str)
    result = []
    for comment in comments:
        sentiment = analyze_sentiment(comment['comment'])
        comment['sentiment'] = sentiment
        result.append(comment)

    return result


if __name__ == '__main__':
    query_str = sys.argv[1]
    sentiments = get_sentiments(query_str)
    print(json.dumps(sentiments))
