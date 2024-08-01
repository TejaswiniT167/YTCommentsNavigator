# YouTube-Comments-Navigator

YTCommentsNavigator is a web application that enables users to perform customized searches of YouTube comments. Built with the MERN stack, Python, and the YouTube Data API, this tool allows users to search within the comments, filter comments by likes, and analyze sentiment i.e., positive or negative. It provides enhanced comment navigation tailored to user needs :)

## Features and Benefits

### Enhanced Comment Navigation

- **Comprehensive Comment Browsing**: Search and filter through YouTube comments with ease, helping users to quickly find relevant comments without endless scrolling.
- **Streamlined Search and Filter**: Efficiently find comments based on keywords and likes, allowing for better navigation through large volumes of comments.

### Sentiment Analysis

- **Positive and Negative Filtering**: Analyze and filter comments by sentiment (positive or negative) using a simple rule-based model with TextBlob. Users can replace this with their own preferred approaches or self trained NLP models in `sentiment_analysis.py` for better specific results.
- **Instant Feedback**: Influencers and businesses can quickly gather feedback and insights, helping them to understand audience sentiment and make informed decisions.

### User-Centric Features

- **Customized Search**: Tailor searches to find the most liked comments swiftly, providing a more focused and efficient browsing experience.
- **Robust Comment Management**: Enhance user interaction by providing a platform to navigate through comments based on specific needs and preferences.
- **Research and Analysis**: Useful for researchers and hobbyists analyzing public sentiment and engagement on various topics, if made a legit option on the platform.
- **Educational Use**: Beneficial for learners in general, seeking doubt clarification and topic discussions within the comment section, providing for an optimized learning experience.

## Technologies Used

- **Frontend**: React.js, HTML, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB(Atlas)
- **Scripting**: Python
- **APIs**: YouTube Data API

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- Node.js
- npm or yarn
- Python
  Ensure you get your credentials for the below mentioned, required for this webapp working:
- MongoDB Atlas Connection string,
  In case you are using mongodb locally installed on your system, you can make slight code adjustments accordingly for database connection.
- YouTube API Key

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/TejaswiniT167/YTCommentsNavigator.git
   cd YTCommentsNavigator
   ```

2. **Setup Environment Variables:**

   Create a `.env` file at the root of the project by copying the example:

   ```bash
   cp .env.example .env
   ```

   Fill in your MongoDB URI and YouTube API key in the `.env` file.

   ```plaintext
   # .env

   MONGO_URI=your_mongo_uri
   API_KEY=your_youtube_api_key
   ```

3. **Install Dependencies:**
   Excecute the below commands in respective directories:

   - **Frontend:**

     ```bash
     cd frontend
     npm install
     npm run build
     ```

   - **Backend:**

     ```bash
     cd backend
     npm install
     ```

   - **Python:**
     ```bash
     cd python
     python -m venv com
     source com/bin/activate # On Windows use `com\Scripts\activate`
     pip install -r requirements.txt
     ```

### Running the Application

1. **Start the Backend (which serves the React app):**

   ```bash
   cd backend
   npm start
   ```

## Accessing the Web App

After successfully building the React app and starting the backend server, the web app can be accessed at `http://localhost:5000`. The backend server serves the React app we built using `npm run build` and utilizes Python scripts as child processes to fetch and process YouTube comments with YouTube API.

The backend directs to various routes to achieve different functionalities:

- **Fetching Comments**: `/api/fetch_comments` route is used to fetch comments from a specified YouTube video and store them in MongoDB.
- **Searching Comments**: `/api/search` route allows users to search from the comments stored in MongoDb by above action, based on keywords.
- **Sorting/Filtering by Likes**: `/api/byLikes` route sorts the comments by the number of likes, when the 'Filte by' likes option is selected.
- **Filtering by Sentiment**: `/api/bySentiment` route filters comments based on sentiment (positive or negative) providing relavent comments based on the selected 'Filter by' option on the website i.e positive/negative.

These routes work together for providing users with customized search capabilities and insights.

## Contributing

I built YTCommentsNavigator because I often found myself endlessly scrolling through YouTube comments, looking for the most liked ones and discussions about topics of my concern. I believe with functionalities like these, it provides for a better user experience, saving time and enabling efficient navigation.

If you feel the same way and have ideas for new features or improvements to existing ones, you can start with this project and build additional features upon it to enhance its functionality further. Your contributions are always welcome, and a mention of my initial work is highly appreciated :)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
