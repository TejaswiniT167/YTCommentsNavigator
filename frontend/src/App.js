import React, { useState } from 'react';
import axios from 'axios';
import VideoFrame from './components/VideoFrame';
import CommentList from './components/CommentList';
import SearchForm from './components/SearchForm';
import FilterSelect from './components/FilterSelect';

function App() {
    const [query, setQuery] = useState('');
    const [url, setUrl] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [videoId, setVideoId] = useState('');
    const [filter, setFilter] = useState('');

    const extractVideoId = (url) => {
        const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[?&].*)?/;
        /*Regex for accepting various kinds of YouTube video URLs */
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const handleFetchComments = async (e) => {
        e.preventDefault();
        setQuery(''); 
        setFilter('');
        setLoading(true);
        setResults([]);
        const id = extractVideoId(url);
        if (id) {
            setVideoId(id);
            try {
                await axios.post('http://localhost:5000/api/fetch_comments', { id });
                const allCommentsResponse = await axios.post('http://localhost:5000/api/search', { query: '' });
                setResults(allCommentsResponse.data);
            } catch (error) {
                console.error('Error fetching comments', error);
            } finally {
                setLoading(false);
            }
        } else {
            console.error('Invalid YouTube URL');
            setResults([]);
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setFilter('')
        try {
            const response = await axios.post('http://localhost:5000/api/search', { query });
            setResults(response.data);
        } catch (error) {
            console.error('Error searching comments', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = async (selectedFilter) => {
        setFilter(selectedFilter);
        setLoading(true);
        try {
            let response;
            if (selectedFilter === 'likes') {
                response = await axios.post('http://localhost:5000/api/byLikes', { query });
            } else if (selectedFilter === 'positive' || selectedFilter === 'negative') {
                response = await axios.post('http://localhost:5000/api/bySentiment', { query, sentiment: selectedFilter });
            }
            setResults(response.data);
        } catch (error) {
            console.error('Error filtering comments', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <h1><i class="fa-brands fa-youtube"></i> YT Comments Navigator</h1>
            {videoId && <VideoFrame videoId={videoId} />}
            <SearchForm 
                url={url}
                query={query}
                onUrlChange={setUrl}
                onQueryChange={setQuery}
                onFetchComments={handleFetchComments}
                onSearch={handleSearch}
            />
            <FilterSelect filter={filter} onFilterChange={handleFilterChange} />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <CommentList results={results} />
            )}
        </div>
    );
}

export default App;
