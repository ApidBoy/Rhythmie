<section>
    <div class="homeCard">
        <div id="homeCardImg" />
        <div id="homeCardTitle"></div>
        <div id="homeCardArtist"></div>
    </div>

    <div class="homeCard">
        <div id="homeCardImg" />
        <div id="homeCardTitle"></div>
        <div id="homeCardArtist"></div>
    </div>

    <div class="homeCard">
        <div id="homeCardImg" />
        <div id="homeCardTitle"></div>
        <div id="homeCardArtist"></div>
    </div>

    <div class="homeCard">
        <div id="homeCardImg" />
        <div id="homeCardTitle"></div>
        <div id="homeCardArtist"></div>
    </div>

    <div class="homeCard">
        <div id="homeCardImg" />
        <div id="homeCardTitle"></div>
        <div id="homeCardArtist"></div>
    </div>

    <div class="homeCard">
        <div id="homeCardImg" />
        <div id="homeCardTitle"></div>
        <div id="homeCardArtist"></div>
    </div>

    <div class="homeCard">
        <div id="homeCardImg" />
        <div id="homeCardTitle"></div>
        <div id="homeCardArtist"></div>
    </div>

    <div class="homeCard">
        <div id="homeCardImg" />
        <div id="homeCardTitle"></div>
        <div id="homeCardArtist"></div>
    </div>

    <div class="homeCard">
        <div id="homeCardImg" />
        <div id="homeCardTitle"></div>
        <div id="homeCardArtist"></div>
    </div>

    <div class="homeCard">
        <div id="homeCardImg" />
        <div id="homeCardTitle"></div>
        <div id="homeCardArtist"></div>
    </div>

    <div class="homeCard">
        <div id="homeCardImg" />
        <div id="homeCardTitle"></div>
        <div id="homeCardArtist"></div>
    </div>

    <div class="homeCard">
        <div id="homeCardImg" />
        <div id="homeCardTitle"></div>
        <div id="homeCardArtist"></div>
    </div>

    <div class="homeCard">
        <div id="homeCardImg" />
        <div id="homeCardTitle"></div>
        <div id="homeCardArtist"></div>
    </div>

    <div class="homeCard">
        <div id="homeCardImg" />
        <div id="homeCardTitle"></div>
        <div id="homeCardArtist"></div>
    </div>

    <div class="homeCard">
        <div id="homeCardImg" />
        <div id="homeCardTitle"></div>
        <div id="homeCardArtist"></div>
    </div>

    <div class="homeCard">
        <div id="homeCardImg" />
        <div id="homeCardTitle"></div>
        <div id="homeCardArtist"></div>
    </div>

    <div class="homeCard">
        <div id="homeCardImg" />
        <div id="homeCardTitle"></div>
        <div id="homeCardArtist"></div>
    </div>

    <div class="homeCard">
        <div id="homeCardImg" />
        <div id="homeCardTitle"></div>
        <div id="homeCardArtist"></div>
    </div>
</section>

<style>
	section {
		display: grid;
		gap: 20px;
		grid-template-columns: 200px 200px 200px 200px 200px 200px;
		grid-template-rows: 250px 250px;
	}
	.homeCard {
		height: 230px;
		width: 180px;
		text-align: left;
        background: #171717;
		border-radius: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        opacity: 1;
	}
	#homeCardImg {
		height: 150px;
		width: 150px;
		border-radius: 10px;
        margin-top: 15px;
        background: #242424;
	}
	#homeCardTitle {
		height: .9rem;
        width: 80%;
        margin-top: 15px;
		border-radius: 10px;
        background: #242424;
	}
	#homeCardArtist {
		margin-top: 5px;
		height: .8rem;
        width: 50%;
		border-radius: 10px;
        background: #242424;
	}

	@media only screen and (max-width: 880px) {
		#homeCardImg,
		.homeCard {
			height: 150px;
			width: 150px;
		}
	}

	@media only screen and (max-width: 750px) {
		#homeCardImg,
		.homeCard {
			height: 110px;
			width: 110px;
		}
		#homeCardTitle {
			font-size: 14px;
		}
	}

	@media only screen and (max-width: 550px) {
		#homeCardTitle {
			margin-top: 5px;
			font-size: 12px;
		}
		#homeCardImg,
		.homeCard {
			height: 90px;
			width: 90px;
			border-radius: 12px;
		}
	}
	@media only screen and (max-width: 440px) {
		#homeCardTitle {
			margin-top: 5px;
			font-size: 13px;
		}
	}
</style>