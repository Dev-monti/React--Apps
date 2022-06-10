import React, { useEffect, useState } from 'react';
import Keyboard from './components/Kayboard';
import StatsModal from './components/modals/StatsModal';
import AlertModal from './components/modals/AlertModal';
import GridTable from './components/grid/GridTable';
import { WORDLIST } from './constants/wordList'

const alertContent = {
	notFound: { text: 'this word not found', classes: 'bg-slate-500 animate-[alertLfToRi_1s_ease-in-out]' },
	empty: { text: 'Fields are empty', classes: 'bg-red-400 animate-[alertLfToRi_1s_ease-in-out]' },
	correct: { text: 'congrats! the word is correct', classes: 'bg-lime-500' },
	noMatch: { text: 'No match', classes: 'bg-[#facc15]' },
}

class Guess {
	constructor(key, classes) {
		this.key = key;
		this.classes = classes
	}
}

function App() {

	const [solution, setSolution] = useState(null);

	const [guessesKeys, setGuessesKeys] = useState(Array(6).fill(Array(5).fill(new Guess('', ''))));
	const [currentGuess, setCurrentGuess] = useState(Array(5).fill(new Guess('', '')));

	const [yIndex, setYIndex] = useState(0)
	const [xIndex, setXIndex] = useState(0);

	const [alertStyle, setAlertStyle] = useState({ text: '', classes: '' })
	const [modalStats, setModalStats] = useState({ state: false, score: null })

	const [darkMode, setDarkMode] = useState(false);

	const getSolutione = async () => {
		const fetchSolution = WORDLIST[parseInt(Math.random() * WORDLIST.length)].toUpperCase();
		localStorage.solution = fetchSolution;
		setSolution(fetchSolution);
	}

	const handleStateLetters = (guess) => {
		let strTarget = solution.split('');
		let newGuess = [];
		newGuess = guess.map((key, index) => {
			if (strTarget.includes(key)) {
				if (key === strTarget[index]) {
					strTarget.splice(index, 1, '_')
					return new Guess(key, 'text-white bg-bgCorrect border-bgCorrect')
				} else {
					strTarget.splice(strTarget.indexOf(key), 1, '_')
					return new Guess(key, 'text-white bg-bgPresent border-bgPresent')
				}
			} else {
					return new Guess(key, 'text-white bg-bgAbsent border-bgAbsent')
			}
		})
		return newGuess
	}

	const handleGuessedLetters = (alert_M) => {
		let newGuesssesKeys = guessesKeys;
		newGuesssesKeys[yIndex] = handleStateLetters(
			currentGuess.map(gues => gues.key)
		);
		setGuessesKeys(newGuesssesKeys)
		setCurrentGuess(
			Array(5).fill(new Guess())
		)
		setXIndex(0)
		setAlertStyle(alertContent[alert_M])
	}

	const displayModalStats = (score) => {
		setTimeout(() => {
			setModalStats({ state: true, score: score })
		}, [1500])
	}

	const onAddKey = (key) => {
		if (xIndex < 5) {
			let newCrGs = currentGuess;
			newCrGs.splice(
				xIndex, 1, new Guess(key, 'animate-[scale_1s_ease-in-out] border-black')
			);
			setCurrentGuess(newCrGs);
			setXIndex(xIndex + 1)
		}
	}

	const onDelelte = () => {
		if (xIndex > 0) {
			let newCrGs = currentGuess;
			newCrGs[xIndex - 1] = new Guess();
			setCurrentGuess(newCrGs);
			setXIndex(xIndex => xIndex - 1)
		}
	}

	const onEntre = () => {

		const guessStr = currentGuess.map(item => item.key).join('')

		if (xIndex !== 5) {
			setAlertStyle(alertContent.empty)
			return
		}

		if (!WORDLIST.includes(guessStr.toLowerCase())) {
			setAlertStyle(alertContent.notFound);
			setCurrentGuess(
				currentGuess => currentGuess.map(
					(gues) => new Guess(gues.key, 'animate-[keyAnimate_.5s_ease-in-out] border-2 border-black')
				)
			)
			return
		}

		if (guessStr !== solution) {

			const listCol = yIndex

			handleGuessedLetters('noMatch')
			setYIndex(yIndex => yIndex + 1)

			if (listCol === 5) {
				displayModalStats(null)
				return
			}
			return
		}

		if (guessStr === solution) {
			handleGuessedLetters('correct')
			displayModalStats(yIndex)
			setYIndex(yIndex => yIndex + 1)
			return
		}
	}

	const handleKeyEntred = ({ key }) => {
		if (key === 'Enter') {
			onEntre()
		}

		if (key === 'Backspace') {
			onDelelte()
		}

		if (/^[a-zA-Z]$/.test(key)) {
			onAddKey(key.toUpperCase())
		}
	}

	const toogleDarkMode = () => {
		if (darkMode) {
			setDarkMode(false);
			localStorage.theme = 'light'
		} else {
			setDarkMode(true);
			localStorage.theme = 'dark'
		}
	}

	useEffect(() => {
		getSolutione()
	}, [])

	useEffect(() => {
		if (localStorage.theme === 'dark') {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}, [darkMode])

	return (
		<main className='dark:bg-black'>
			<StatsModal
				modalStats={modalStats}
				yIndex={yIndex}
			/>
			<div className='w-1/4 py-2 mx-auto'>
				<header className='flex justify-between items-center border-b py-1'>
					<div className='flex items-center'>
						<h2 className='mr-4 text-xl dark:text-white font-bold'>Wordle</h2>
						<button onClick={toogleDarkMode} >
							{darkMode
								? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="fill-black dark:fill-white" viewBox="0 0 16 16">
									<path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
								</svg>
								: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="fill-black dark:fill-white" viewBox="0 0 16 16">
									<path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
								</svg>
							}
						</button>
					</div>
					<div className='flex'>
						<button>
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="fill-black dark:fill-white" viewBox="0 0 16 16">
								<path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2z" />
							</svg>
						</button>
						<button className='ml-2'>
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="fill-black dark:fill-white" viewBox="0 0 16 16">
								<path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
								<path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
							</svg>
						</button>
					</div>
				</header>
				<AlertModal
					alertStyle={alertStyle}
				/>
				<GridTable
					yIndex={yIndex}
					guessesKeys={guessesKeys}
					currentGuess={currentGuess}
				/>
			</div>
			<Keyboard
				handleKeyEntred={handleKeyEntred}
				onAddKey={onAddKey}
				onDelelte={onDelelte}
				onEntre={onEntre}
			/>
		</main>
	);
}

export default App;
