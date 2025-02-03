import React, { useState, useEffect, useRef } from 'react';
import './Timer.scss';
import TimeConfig from '../TimeConfig/TimeConfig';
import beep1 from '../../assets/beep1.mp3';
import beep2 from '../../assets/beep2.mp3';
import beep3 from '../../assets/beep3.mp3';
import beep4 from '../../assets/beep4.mp3';
import avatarDefault from '../../assets/arenio.png';

const Timer = ({ avatarUrl, setAvatarUrl }) => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isSoundEnabled, setIsSoundEnabled] = useState(true); // Estado para controlar el sonido
    const [selectedSound, setSelectedSound] = useState(() => {
        // Recuperar el sonido seleccionado desde localStorage
        const savedSound = localStorage.getItem('selectedSound');
        return savedSound ? savedSound : beep1;
    }); // Estado para el sonido seleccionado
    const [savedTimes, setSavedTimes] = useState([]); // Estado para almacenar los conteos guardados
    const [tempAvatarUrl, setTempAvatarUrl] = useState(''); // Estado temporal para la URL del avatar
    const [imageSource, setImageSource] = useState(''); // Estado para controlar la fuente de la imagen
    const timeConfigRef = useRef();
    const beepRef = useRef(new Audio(selectedSound));

    useEffect(() => {
        let timerInterval;
        if (isRunning) {
            timerInterval = setInterval(() => {
                setElapsedTime((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(timerInterval);
    }, [isRunning]);

    useEffect(() => {
        if (elapsedTime >= timeConfigRef.current?.getTime() && isSoundEnabled) {
            beepRef.current.loop = true; // Repetir indefinidamente
            beepRef.current.play();
        } else {
            beepRef.current.pause();
            beepRef.current.currentTime = 0;
        }
    }, [elapsedTime, isSoundEnabled]);

    useEffect(() => {
        beepRef.current.pause(); // Detener el sonido actual
        beepRef.current.currentTime = 0; // Reiniciar el sonido actual
        beepRef.current = new Audio(selectedSound); // Actualizar la referencia del sonido
    }, [selectedSound]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const startTimer = () => {
        setElapsedTime(0);
        setIsRunning(true);
    };

    const getTimeFromConfig = () => {
        const time = timeConfigRef.current.getTime();
        setElapsedTime(0);
        setIsRunning(true);
    };

    const stopTimer = () => {
        setIsRunning(false);
        beepRef.current.pause(); // Detener el sonido
        beepRef.current.currentTime = 0; // Reiniciar el sonido
    };

    const nextTimer = () => {
        setSavedTimes([...savedTimes, elapsedTime]);
        setElapsedTime(0);
    };

    const toggleSound = () => {
        setIsSoundEnabled((prev) => !prev);
    };

    const handleSoundChange = (event) => {
        const sound = event.target.value;
        setSelectedSound(sound);
        localStorage.setItem('selectedSound', sound); // Guardar el sonido seleccionado en localStorage
    };

    const handleAvatarUrlChange = (event) => {
        const url = event.target.value;
        setTempAvatarUrl(url);
        setImageSource('url');
    };

    const handleAvatarFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempAvatarUrl(reader.result);
                setImageSource('file');
            };
            reader.readAsDataURL(file);
        }
    };

    const applyAvatar = () => {
        if (tempAvatarUrl) {
            setAvatarUrl(tempAvatarUrl);
            localStorage.setItem('avatarUrl', tempAvatarUrl); // Guardar la URL del avatar en localStorage
        }
    };

    const resetAvatar = () => {
        setAvatarUrl(avatarDefault);
        localStorage.removeItem('avatarUrl'); // Eliminar la URL del avatar de localStorage
        setTempAvatarUrl('');
        setImageSource('');
    };

    const getTotalSavedTime = () => {
        return savedTimes.reduce((total, time) => total + time, 0);
    };

    return (
        <div className="timer-container">
            <TimeConfig ref={timeConfigRef} />
            <div className="timer-controls">
                <button className='primary-button' onClick={getTimeFromConfig}>▶ Empezar</button>
                <button className='tertiary-button' onClick={nextTimer}>⏭ Siguiente</button>
                <button className='stop-button' onClick={stopTimer}>⏹ Parar</button>
            </div>
            <div id="timer" className={elapsedTime >= timeConfigRef.current?.getTime() ? 'red' : ''}>
                {formatTime(elapsedTime)}
            </div>
            <div className="saved-times">
                <h3>Conteos Anteriores:</h3>
                <ul>
                    {savedTimes.map((time, index) => (
                        <li key={index} className={time >= timeConfigRef.current?.getTime() ? 'red' : ''}>
                            {formatTime(time)}
                        </li>
                    ))}
                </ul>
                <div className="total-saved-time">
                    <h4>Tiempo Total:</h4>
                    <p>{formatTime(getTotalSavedTime())}</p>
                </div>
            </div>
            <div className="customization-controls">
                <div className="timer-controls">
                    <button className='secondary-button' onClick={toggleSound}>
                        {isSoundEnabled ? '🔊 Desactivar Sonido' : '🔇 Activar Sonido'}
                    </button>
                    <select className='sound-selector' onChange={handleSoundChange} value={selectedSound}>
                        <option value={beep1}>Guitarra 1</option>
                        <option value={beep2}>Guitarra 2</option>
                        <option value={beep3}>Campanas de viento</option>
                        <option value={beep4}>Alerta</option>
                    </select>
                </div>
                <div className="timer-controls">
                    <input
                        type="text"
                        placeholder="URL de la imagen"
                        onChange={handleAvatarUrlChange}
                        value={imageSource === 'url' ? tempAvatarUrl : ''}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarFileChange}
                    />
                    <button className='secondary-button' onClick={applyAvatar}>Aplicar Avatar</button>
                    <button className='secondary-button' onClick={resetAvatar}>Restablecer Avatar</button>
                </div>
            </div>
        </div>
    );
};

export default Timer;
