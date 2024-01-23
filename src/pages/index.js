import styles from "@styles/Home.module.css";

import Head from "next/head";

import fizzBuzz from "../utils/fizzBuzz";
import { useState } from "react";

export const EMPTY_RESULT_HINT = "Geben Sie einen Wert > 0 in das Formular ein.";

function Home() {
    
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const digit = parseInt(inputValue);
        if (digit < 1) {
            setError('Der Wert sollte groesser 0 sein');
            setResult([]);
            return;
        }
        setError('');
        const fizzBuzzResult = Array.from({ length: digit }, (_, i) => fizzBuzz(i + 1));
        setResult(fizzBuzzResult);
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleFocus = () => {
        setResult([]);
        setError('');
    };

    return (
        <>
            <Head>
                <title>Bewerber-Quiz - FizzBuzz - Autohaus König</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>

                <h1 className={styles.title}>FizzBuzz - Bewerber Quiz</h1>

                <form className={styles.inputForm} onSubmit={handleSubmit}>
                    <input
                        type="number"
                        value={inputValue}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        className={styles.input}
                    />
                    <button type="submit" className={styles.button}>Submit</button>
                </form>
                
                {error && <div className={styles.error}>{error}</div>}

                <ul className={styles.result}>
                    {result.length === 0 ? (
                        <li>{EMPTY_RESULT_HINT}</li>
                    ) : (
                        result.map((item, index) => <li key={index}>{item}</li>)
                    )}
                </ul>

            </main>
        </>
    );
}

export default Home;
