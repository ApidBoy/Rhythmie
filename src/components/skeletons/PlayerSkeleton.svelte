<script>
    // @ts-nocheck
    
        import fav from '$lib/res/unfav.png';
        import dots from '$lib/res/dots.png';
        import volumeButton from '$lib/res/volume.png';
        import defaultImg from '$lib/res/default.png';
        import shuffle from '$lib/res/shuffle.png';
        import prev from '$lib/res/prev.png';
        import play from '$lib/res/play.png';
        import next from '$lib/res/next.png';
        import repeat from '$lib/res/repeat.png';
    </script>
    


    <div id="bottomBar">
        <div id="musicInfo">
            <img src={defaultImg} draggable={false} id="songArt" alt="Music art" />
            <div id="songInfo">
                <div id="actualInfo">
                    <div id="songTitle"></div>
                    <div id="songArtist"></div>
                </div>
            </div>
        </div>
        <div id="musicControls">
          <div id="musicComponent">
            <img draggable={false} id="shuffleButton" src={shuffle} alt="Shuffle" />
            <img
              draggable={false}
              id="prevButton"
              src={prev}
              alt="Previous"
            />
            <img
              draggable={false}
              id="playPause"
              src={play}
              alt="Play/Pause Button"
            />
            <img draggable={false} id="nextButton" src={next} alt="Next" />
            <img draggable={false} id="repeatButton" src={repeat} alt="Repeat" />
          </div>
        </div>
        <div id="totalSeek">
                <span id="currentDuration">00:00</span>
            <input id="seekBar" type="range" min="0" max="100" step="1" value="0" />
                <span id="totalDuration">00:00</span>
        </div>
            <div id="bottomIcons">
                <img draggable={false} id="favButton" src={fav} alt="" />
                <img draggable={false} id="bottomMenu" src={dots} alt="" />
                <img draggable={false} id="volumeButton" src={volumeButton} alt="" />
    
                <div id="sliderContainer">
                    <input id="volumeSlider" type="range" min="0.0" max="1.0" step="0.1" value="1" />
                </div>
            </div>
    </div>
    
    <style>
        #bottomBar {
            width: 100%;
            height: 100px;
            position: fixed;
            bottom: 0;
            display: flex;
            align-items: center;
            flex-direction: column;
            z-index: 5;
            background: #0a0a0a;
            box-shadow: 0 0 20px #000;
            border-top-left-radius: 30px;
            border-top-right-radius: 30px;
            opacity: 0;
        }
    
    
    #musicComponent {
      margin: 18px 20px 20px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    #playPause {
      width: 26px;
      margin: 5px 2px;
    }
    #playPause:hover {
      transform: scale(1.08);
      cursor: pointer;
    }
    #nextButton,
    #prevButton {
      transition: 0.4s;
      width: 20px;
      margin-left: 15px;
      margin-right: 15px;
    }
    #repeatButton,
    #shuffleButton {
      width: 18px;
    }
    
    
        #musicInfo {
            font-size: 20px;
            position: absolute;
            left: 0;
            bottom: 28px;
            color: #fff;
        }
        #songArt {
            height: 70px;
            width: 70px;
            background: #000;
            z-index: 5;
            border-radius: 1rem;
            position: absolute;
            left: 20px;
            bottom: -12px;
        }
        #songArt:hover {
            cursor: pointer;
            border-radius: 6px;
            transform: scale(1.05);
            margin-top: -90px;
        }
        #songInfo {
            position: relative;
            left: 110px;
            width: 100%;
            top: -5px;
        }
        #actualInfo {
            text-shadow: 0 0 10px #777;
        }
        #songTitle {
            height: 16px;
            width: 140px;
            background: #242424;
            border-radius: 1rem;
        }
        #songArtist {
            margin-top: 6px;
            height: 12px;
            width: 80px;
            background: #242424;
            border-radius: 1rem;
        }
        #songArtist:hover {
            text-decoration: underline;
            cursor: pointer;
        }
        #totalSeek {
            width: 40%;
            height: 5px;
            position: absolute;
            bottom: 20px;
            z-index: 2;
            transition: 0.2s;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        #totalSeek > span {
            font-family: 'Montserrat', sans-serif;
            font-size: .8rem;
        }
        #seekBar {
            -webkit-appearance: none;
            width: 100%;
            height: 100%;
            transition: 0.4s;
            overflow: hidden;
            background-color: #333;
            border-radius: 30px;
            margin: 0 20px;
        }
        #seekBar::-webkit-slider-thumb {
            -webkit-appearance: none;
            user-select: none;
            height: 20px;
            width: 0px;
            background: #000;
            box-shadow: -100vw 0 0 100vw #8b42ff;
        }
        #seekBar:hover {
            cursor: pointer;
            height: 10px;
        }
        #bottomIcons {
            position: fixed;
            bottom: 35px;
            right: 8.8%;
        }
        #bottomIcons > img {
            width: 25px;
        }
        #volumeSlider {
            -webkit-appearance: none;
            -moz-appearance: none;
            background-color: #333;
            border-radius: 20px;
            position: fixed;
            bottom: 4.7%;
            right: 2%;
            overflow: hidden;
            transition: 0.2s;
            height: 7px;
        }
        #volumeSlider::-webkit-slider-thumb {
            -webkit-appearance: none;
            background-color: #8b42ff;
            box-shadow: -100vw 0 0 100vw #8b42ff;
            width: 20px;
            border-radius: 20px;
            transition: 0.4s;
        }
        #volumeSlider:hover {
            cursor: pointer;
            height: 10px;
        }
        #volumeButton {
            transition: 0.3s;
            position: relative;
            right: 22%;
        }
        #volumeButton:hover {
            cursor: pointer;
            transform: scale(1.1);
        }
        #bottomMenu {
            transition: 0.3s;
            position: relative;
            right: 25%;
        }
        #bottomMenu:hover {
            cursor: pointer;
            transform: scale(1.1);
        }
        #favButton {
            transition: 0.3s;
            transform: scale(0.95);
            position: relative;
            right: 28%;
        }
        #favButton:hover {
            cursor: pointer;
            transform: scale(1.05);
        }
    
    </style>
    