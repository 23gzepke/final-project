import React from 'react';
import SearchBar from './SearchBar';
import youtube from './utils/YoutubeAPI';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import Loading from '../Loading/Loading';

class VideoContainer extends React.Component {
    state = {
        videos: [],
        selectedVideo: null,
        loading: false
    }
    handleSubmit = async (termFromSearchBar) => {
        this.setState({ loading: true });
        const response = await youtube.get('/search', {
            params: {
                q: termFromSearchBar
            }
        })

        this.setState({
            loading: false,
            videos: response.data.items
        })
    };
    handleVideoSelect = (video) => {
        this.setState({selectedVideo: video})
        this.setState({videos: []})
    }

    render() {
        return (
            this.state.loading ? (
                <Loading />
            )
        :
            (
            <div className='ui container' style={{marginTop: '1em', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <SearchBar handleFormSubmit={this.handleSubmit}/>
                    <div className='ui grid'>
                        <div className="ui row">
                            <div className="eleven wide column">
                                <VideoDetail video={this.state.selectedVideo}/>
                            </div>
                            <div className="five wide column">
                                <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos}/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        )
    }
}

export default VideoContainer;