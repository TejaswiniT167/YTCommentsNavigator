import sys
from googleapiclient.discovery import build
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path='../.env')

api_key = os.getenv("API_KEY")
youtube = build('youtube', 'v3', developerKey=api_key)


def get_comments(video_id):
    comments = []
    request = youtube.commentThreads().list(
        part="snippet",
        videoId=video_id,
        maxResults=100
    )
    response = request.execute()
    while request:
        for item in response['items']:
            top_comment = item['snippet']['topLevelComment']['snippet']
            comments.append({
                'video_id': video_id,
                'comment_id': item['id'],
                'comment': top_comment['textDisplay'],
                'username': top_comment['authorDisplayName'],
                'likes': top_comment['likeCount'],
                'replies': []
            })
            # Fetch replies for the comment.
            replies_request = youtube.comments().list(
                part="snippet",
                parentId=item['id'],
                maxResults=100
            )
            replies_response = replies_request.execute()
            while replies_request:
                for reply in replies_response['items']:
                    rep = reply['snippet']
                    comments[-1]['replies'].append({
                        'comment': rep['textDisplay'],
                        'username': rep['authorDisplayName'],
                        'likes': rep['likeCount'],
                    })
                replies_request = youtube.comments().list_next(replies_request, replies_response)
                replies_response = replies_request.execute() if replies_request else None
        request = youtube.commentThreads().list_next(request, response)
        response = request.execute() if request else None
    return comments


def store_comments(comments):
    # Connect to MongoDB Atlas
    client = MongoClient(os.getenv('MONGO_URI'))
    db = client['youtube_comments']
    collection = db['comments']

    # Clear existing comments
    collection.delete_many({})

    for comment in comments:
        collection.insert_one(comment)


if __name__ == '__main__':
    if len(sys.argv) > 1:
        video_id = sys.argv[1]
        if video_id:
            comments = get_comments(video_id)
            store_comments(comments)
            length = sum([1 + len(comment['replies'])for comment in comments])
            print("Stored {} comments (w replies) for video {}".format(
                length, video_id))
        else:
            print("Invalid YouTube URL")
    else:
        print("Please provide a YouTube URL")
