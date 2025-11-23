import app from '@system.app'
import {
    getPlaylist,
    registerMessageReceiver,
    sendMusicAction,
    setFingerprint,
    unregisterMessageReceiver
} from '../../utils/utils'
import router from '@ohos.router'

export default {
    data: {
        musicInfo: null,
        operateMessage: 'Operation info',
        receiveMessage: 'Received message',
        receivedMessage: '',
        trackName: '',
        artistName: '',
        durationTime: '',
        isPlay: false,
        isFav: false,
        durationPercent: 40,
        totalDurationMs: 0,
        currentPositionMs: 0,
        intervalId: null,
        playlist: []
    },

    onInit() {
        setFingerprint()
        registerMessageReceiver()
        this.initializeMusicPlayer()
    },
    initializeMusicPlayer() {
        let that = this
        this.playlist = getPlaylist('internal://app/playlist.json')
        if (this.playlist.length === 0) {
            router.replace({
                uri: 'pages/phoneNotConnected/phoneNotConnected'
            });
            return;
        }

        const content = JSON.parse(this.playlist);

        const musicData = typeof content === 'string' ? JSON.parse(content) : content;
        if (musicData.title && musicData.artist) {
            that.trackName = musicData.title;
            that.artistName = musicData.artist;
            that.isPlay = musicData.is_playing;

            if (musicData.duration) {
                const totalSeconds = Math.floor(musicData.duration / 1000);
                const minutes = Math.floor(totalSeconds / 60);
                const seconds = totalSeconds % 60;
                that.durationTime =
                    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
            console.info('Music data updated')
            return;
        }
    },
    startTimer() {
        let that = this;
        if (that.intervalId) {
            clearInterval(that.intervalId);
        }

        that.intervalId = setInterval(() => {
            if (that.currentPositionMs < that.totalDurationMs) {
                that.currentPositionMs += 1000;
                that.updateTimeDisplay();
                that.durationPercent = Math.floor(
                    (that.currentPositionMs / that.totalDurationMs) * 100
                );
            } else {
                clearInterval(that.intervalId);
            }
        }, 1000);
    },
    updateTimeDisplay() {
        let that = this;
        const remainingMs = that.totalDurationMs - that.currentPositionMs;
        const totalSeconds = Math.floor(remainingMs / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        that.durationTime =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    },
    onDestroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        unregisterMessageReceiver()
    },
    handlePlayStatus() {
        const that = this;
        that.isPlay = !that.isPlay;
        const command = that.isPlay ? 'play' : 'pause';
        sendMusicAction(command);

        if (that.isPlay) {
            that.startTimer();
            return
        }
        if (that.intervalId) {
            clearInterval(that.intervalId);
            return
        }
    },
    handlePrev() {
        sendMusicAction('previous');
    },
    handleNext() {
        sendMusicAction('next');
    },
    swipeEvent(e) {
        if (e.direction === 'right') {
            app.terminate();
        }
    },
}