import sys
import json
from pymongo import MongoClient
import html
import re
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path='../.env')


def clean_comment(comment):
    comment = html.unescape(comment)
    comment = re.sub(r'<.*?>', '', comment)
    return comment


def search_comments(collection, query_str):
    results = collection.find({
        "$or": [
            {"comment": {"$regex": query_str, "$options": "i"}},
            {"replies.comment": {"$regex": query_str, "$options": "i"}}
        ]
    })
    return results


def sort_comments_by_likes(collection, query_str):
    results = collection.find({
        "$or": [
            {"comment": {"$regex": query_str, "$options": "i"}},
            {"replies.comment": {"$regex": query_str, "$options": "i"}}
        ]
    }).sort("likes", -1)
    return results


def process_comments(action, query_str):
    client = MongoClient(os.getenv('MONGO_URI'))
    db = client['youtube_comments']
    collection = db['comments']

    if action == 'fetch':
        results = collection.find()
    elif action == 'search':
        results = search_comments(collection, query_str)
    elif action == 'sort':
        results = sort_comments_by_likes(collection, query_str)
    else:
        results = []

    results_list = []
    for result in results:
        result['_id'] = str(result['_id'])
        result['comment'] = clean_comment(result['comment'])
        result['username'] = result['username'][1:]
        for reply in result['replies']:
            reply['comment'] = clean_comment(reply['comment'])
            reply['username'] = reply['username'][1:]
        results_list.append(result)

    return results_list


if __name__ == '__main__':
    action = sys.argv[1]
    query = sys.argv[2] if len(sys.argv) > 2 else ''
    results = process_comments(action, query)
    print(json.dumps(results))
