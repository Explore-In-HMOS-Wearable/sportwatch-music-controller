> **Note:** To access all shared projects, get information about environment setup, and view other guides, please visit [Explore-In-HMOS-Wearable Index](https://github.com/Explore-In-HMOS-Wearable/hmos-index).

# Music Controller with Wear Engine

This application demonstrates seamless integration between mobile devices and Huawei lite
wearable using Huawei Wear Engine. It allows users to control music playback (play, pause, next,
previous) directly from their Huawei wearable. The app supports real-time synchronization of music
information (title, artist, album art) between the mobile app and the lite wearable.

# Preview
<div>
    <img src="./screenshots/screenshot_1.png" width="25%"/>
    <img src="./screenshots/screenshot_2.png" width="25%"/>
</div>

# Use Cases

- **Music Playback Control**: Users can control music playback (play, pause, next, previous) from both the mobile app and the
  lite wearable.
- **Music Information Sync**: Album art, track title, and artist information are synchronized between the mobile app and
  lite wearable. Progress bar updates in real-time on both devices.

# Technology
## Stack

- **Language**: JS
- **Framework**: Huawei Lite OS
- **Tools**: DevEco Studio 5.1.0.849
- - **Libraries**:
- `@system.wearengine`
- `@system.app`
- `@system.file`

## Documentation Link
- [Applying for the Wear Engine Service](https://developer.huawei.com/consumer/en/doc/connectivity-Guides/applying-wearengine-0000001050777982)
- [Wear Engine SDK](https://developer.huawei.com/consumer/en/doc/connectivity-Library/litewearable-sdk-cn-0000001705004353)
- [Lite Wearable App Development via Wear Engine](https://developer.huawei.com/consumer/en/doc/connectivity-Guides/fitnesswatch-dev-0000001051423561)


# Directory Structure

```
    ├───js
    │   └───MainAbility
    │       │   app.js
    │       │
    │       ├───common
    │       │   └───assets
    │       │           backward_end_fill.png
    │       │           fast_forward.png
    │       │           forward_end_fill.png
    │       │           heart.png
    │       │           heart.svg
    │       │           heart_fill.png
    │       │           heart_fill.svg
    │       │           list_bullet.png
    │       │           list_bullet.svg
    │       │           music.png
    │       │           pause.png
    │       │           pause.svg
    │       │           pause_round_triangle_fill.png
    │       │           pause_round_triangle_fill.svg
    │       │           play.png
    │       │           play_circle_fill.png
    │       │           play_circle_fill.svg
    │       │           settings.png
    │       │           shuffle.png
    │       │           shuffle_red.png
    │       │           undo.png
    │       │
    │       ├───constants
    │       │       constants.js
    │       │
    │       ├───i18n
    │       │       en-US.json
    │       │       zh-CN.json
    │       │
    │       ├───pages
    │       │   ├───index
    │       │   │       index.css
    │       │   │       index.hml
    │       │   │       index.js
    │       │   │
    │       │   ├───phoneNotConnected
    │       │   │       phoneNotConnected.css
    │       │   │       phoneNotConnected.hml
    │       │   │       phoneNotConnected.js
    │       │   │
    │       │   ├───player
    │       │   │       player.css
    │       │   │       player.hml
    │       │   │       player.js
    │       │   │
    │       │   └───playlist
    │       │           playlist.css
    │       │           playlist.hml
    │       │           playlist.js
    │       │
    │       ├───utils
    │       │       utils.js
    │       │
    │       └───wearenginesdk // please import wear engine sdk the directory
    │
    └───resources
        └───rawfile
```

# Constraints and Restrictions

## Supported Devices
- Huawei Sport (Lite) Watch GT 4/5
- Huawei Sport (Lite) GT4/5 Pro
- Huawei Sport (Lite) Fit 3/4
- Huawei Sport (Lite) D2
- Huawei Sport (Lite) Ultimate

## Requirements
1. **Huawei DevEco IDE**: Required for developing the Huawei watch app.
2. After downloading the wear engine file from the [document (click to visit download page)](https://developer.huawei.com/consumer/en/doc/connectivity-Library/litewearable-sdk-cn-0000001705004353),
   place it in  ```\entry\src\main\js\MainAbility\wearengine``` directory.
3. Set signing configs and PEER_PKG_NAME & PEER_FINGERPRINT in utils.
4. Build and run the app on a **Huawei lite wearable**.
5. Ensure the **sport watch** and **mobile app** are properly paired.

# LICENSE
[Mobile - Lite Wearable] Music Controller with Wear Engine is distributed under the terms of the MIT License.
See the [license](/LICENSE) for more information.