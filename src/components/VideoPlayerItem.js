import React from "react";
import LikeIcon from './LikeIcon';
import UnLikeIcon from './UnlikeIcon';

/**
 * Helpers
 */
function isVideoInLikes() {
	let likeVideos = window.localStorage.getItem("august-youtube-likes");
}

class VideoPlayerItem extends React.Component {
	constructor(props) {
		super(props);
		this.onVideoClick = this.onVideoClick.bind(this);
		this.onToggleLikeVideo = this.onToggleLikeVideo.bind(this);
		
		this.state = {
			like: false
		}
	}

	componentDidMount() {
		this.setState({
			like: this.props.isVideoLiked
		});
	}

	onVideoClick() {
		const video = this.props.video;
		let player = new window.YT.Player(video.etag, {
      height: '390',
      width: '640',
      videoId: video.id.videoId,
      playerVars: {
      	autoplay: 1,
	      iv_load_policy: 3,
	      modestbranding: 1,
	      rel: 0,
	      enablejsapi: 1
      }
    });
	}

	onToggleLikeVideo() {
		this.props.onToggleLikeVideo(this.props.video);
		this.setState({
			like: !this.state.like
		})
	}

	render() {
		const vm = this;
		const video = vm.props.video;
		const onVideoClick = vm.onVideoClick;
		const thumbnail = video.snippet.thumbnails.high.url;
		const isVideoLiked = vm.state.like;
		const onToggleLikeVideo = vm.onToggleLikeVideo;

		function LikeToggleIcon() {
			if(isVideoLiked) {
				return (<LikeIcon />);
			} else {
				return (<UnLikeIcon />);
			}
		}

		return (
			<div className="VideoPlayerItem">
				<article className="VideoPlayerItem__video">
					<div className="video-ratio-wrapper">
						<figure id={video.etag}>
							<img src={thumbnail} onClick={onVideoClick}/>
						</figure>
					</div>
				</article>
				<header className="VideoPlayerItem__header">
					<div className="VideoPlayerItem__heading">
						<h3 className="VideoPlayerItem__title">
							{video.snippet.title}
						</h3>
						<h5 className="VideoPlayerItem__author">
							by {video.snippet.channelTitle}
						</h5>
					</div>
					<button className="VideoPlayerItem__like" onClick={onToggleLikeVideo}>
						<LikeToggleIcon />
					</button>
				</header>
			</div>
		);
	}
}

export default VideoPlayerItem;