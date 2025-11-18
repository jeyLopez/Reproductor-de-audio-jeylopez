
import React, { useEffect, useRef, useState } from 'react'

const Home = () => {
	const audioRef = useRef(null);
	const [songs, setSongs] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false)
	useEffect(() => {
		const cargarCanciones = async () => {
			try {
				const respuesta = await fetch('https://playground.4geeks.com/sound/songs');
				const data = await respuesta.json();
				setSongs(data.songs);
				console.log(data);
				console.log("La canción seleccionada es:", currentIndex)


			} catch (error) {
				console.error("Error cargando canciones:", error);
			}
		};

		cargarCanciones();
	}, []);


	useEffect(() => {
		if (currentIndex === null) return;

		const song = songs[currentIndex];
		const fullUrl = "https://playground.4geeks.com" + song.url;

		audioRef.current.src = fullUrl;
		audioRef.current.play()
			.then(() => console.log("Reproduciendo:", song.name))
			.catch(err => console.log("Error al reproducir:", err));

	}, [currentIndex]);


	const handlePlayPause = () => {
		if (!audioRef.current) return;

		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(false);
		} else {
			audioRef.current.play();
			setIsPlaying(true);
		}
	};
	const handleNext = () => {
		if (songs.length === 0) return;

		const nextIndex = (currentIndex + 1) % songs.length;

		setCurrentIndex(nextIndex);
	};
	const handlePrevious = () => {
		if (songs.length === 0) return;

		const prevIndex = (currentIndex - 1 + songs.length) % songs.length;

		setCurrentIndex(prevIndex);
	};


	return (
		<div className="container-fluid">
			<div className='container'>
				<audio ref={audioRef} className='audio-player'></audio>
				<div className="controls">
					<button onClick={handlePrevious}> <i className="fa-solid fa-backward icon "></i></button>
					<button onClick={handlePlayPause}>  {isPlaying ? <i class="fa-solid fa-pause icon"></i> : <i class="fa-solid fa-play icon"></i>}</button>
					<button onClick={handleNext}><i className="fa-solid fa-forward icon"></i> </button>
				</div>
				<ul className='list-s'>
					{songs.map((song, index) => (
						<li
							key={song.id}
							onClick={() =>
								setCurrentIndex(index)}
							className={`song-item ${currentIndex === index ? "active" : ""}`}
						>
							{index + 1}.{song.name}
						</li>
					))}
				</ul>
			</div>
		</div>
	);

};

export default Home;