import router from '@system.router';
import app from '@system.app';
import { getPlaylist } from '../../utils/utils';

export default {
    swipeHandler(e) {
        if (e.direction === 'right') {
            app.terminate();
        }
    },
    onInit() {
        this.router();
    },
    router() {
        const playlist = getPlaylist()
        if (playlist.length === 0) {
            router.replace({
                uri: 'pages/phoneNotConnected/phoneNotConnected'
            });
            return;
        }

        setTimeout(() => {
            router.replace({
                uri: 'pages/playlist/playlist'
            });
        }, 500)
    }
}