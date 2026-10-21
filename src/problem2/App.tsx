import './style.css';
import { useEffect, useState } from 'react';
import type { TokenPrice } from './types';
import { calculateExchangeAmount } from './utils/exchange';
interface TokenIconProps {
    symbol: string;
}

function TokenIcon({ symbol }: TokenIconProps) {
    const [hasError, setHasError] = useState(false);

    if (hasError) {
        return (
            <span className="token-icon-fallback" aria-hidden="true">
        {symbol.slice(0, 1)}
      </span>
        );
    }

    return (
        <img
            className="token-icon"
            src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${symbol}.svg`}
            alt=""
            onError={() => setHasError(true)}
        />
    );
}
export default function Problem2() {
    const [amount, setAmount] = useState('');
    const [fromToken, setFromToken] = useState('ETH');
    const [toToken, setToToken] = useState('USDC');
    const [prices, setPrices] = useState<TokenPrice[]>([]);
    const [priceError, setPriceError] = useState('');
    const [showReview, setShowReview] = useState(false);

    const fromPrice = prices.find(
        (item) => item.currency === fromToken,
    )?.price;

    const toPrice = prices.find(
        (item) => item.currency === toToken,
    )?.price;

    const numericAmount = Number(amount);

    const receiveAmount =
        amount.trim() !== '' &&
        Number.isFinite(numericAmount) &&
        numericAmount > 0 &&
        fromPrice !== undefined &&
        toPrice !== undefined
            ? calculateExchangeAmount(numericAmount, fromPrice, toPrice)
            : 0;

    const exchangeRate =
        fromPrice !== undefined &&
        toPrice !== undefined &&
        toPrice > 0
            ? fromPrice / toPrice
            : undefined;

    const validationError =
        amount.trim() === ''
            ? 'Enter an amount to swap.'
            : !Number.isFinite(Number(amount)) || Number(amount) <= 0
                ? 'Amount must be greater than zero.'
                : fromPrice === undefined || toPrice === undefined
                    ? 'Price unavailable for the selected token.'
                    : '';

    useEffect(() => {
        async function fetchPrices() {
            try {
                const response = await fetch(
                    'https://interview.switcheo.com/prices.json',
                );

                if (!response.ok) {
                    throw new Error('Unable to load token prices.');
                }

                const data: TokenPrice[] = await response.json();

                setPrices(
                    data.filter(
                        (item) =>
                            typeof item.currency === 'string' &&
                            Number.isFinite(item.price) &&
                            item.price > 0,
                    ),
                );
            } catch {
                setPriceError('Unable to load token prices. Please try again.');
            }
        }

        fetchPrices();
    }, []);

    function resetReview() {
        setShowReview(false);
    }

    return (
        <div className="problem2-page">
            <a href="/" className="dashboard-link">
                ← Dashboard
            </a>
        <main className="swap-page">
            <section className="swap-card">
                <header className="swap-header">
                    <p className="eyebrow">EXCHANGE</p>
                    <h1>Swap tokens</h1>
                    <p className="subtitle">
                        Exchange one token for another.
                    </p>
                </header>

                {priceError && (
                    <p role="alert" className="swap-error">
                        {priceError}
                    </p>
                )}

                <div className="amount-panel">
                    <label htmlFor="send-amount">You pay</label>

                    <div className="amount-row">
                        <input
                            id="send-amount"
                            type="number"
                            min="0"
                            step="any"
                            placeholder="0.00"
                            value={amount}
                            onChange={(event) => {
                                setAmount(event.target.value);
                                resetReview();
                            }}
                        />
                        <TokenIcon symbol={fromToken} />
                        <div className="token-select-wrapper">
                            <select
                                aria-label="Token to send"
                                value={fromToken}
                                onChange={(event) => {
                                    resetReview();
                                    setFromToken(event.target.value)
                                }}
                            >
                                <option value="ETH" disabled={toToken === 'ETH'}>
                                    ETH
                                </option>
                                <option value="USDC" disabled={toToken === 'USDC'}>
                                    USDC
                                </option>
                                <option value="WBTC" disabled={toToken === 'WBTC'}>
                                    WBTC
                                </option>
                                <option value="SWTH" disabled={toToken === 'SWTH'}>
                                    SWTH
                                </option>
                            </select>
                            <span className="token-select-arrow" aria-hidden="true" />
                        </div>

                    </div>
                </div>
                {/*{validationError && (*/}
                {/*    <p className="swap-error" role="alert">*/}
                {/*        {validationError}*/}
                {/*    </p>*/}
                {/*)}*/}


                <button
                    type="button"
                    className="swap-direction"
                    aria-label="Switch swap direction"
                    onClick={() => {
                        setFromToken(toToken);
                        setToToken(fromToken);
                        resetReview();
                    }}
                >
                    ⇅
                </button>

                <div className="amount-panel">
                    <label htmlFor="receive-amount">You receive</label>

                    <div className="amount-row">
                        <input
                            id="receive-amount"
                            type="text"
                            placeholder="0.00"
                            value={
                                receiveAmount > 0
                                    ? receiveAmount.toLocaleString('en-US', {
                                        maximumFractionDigits: 2,
                                    })
                                    : ''
                            }
                            readOnly
                            aria-label="Estimated amount to receive"
                        />
                        <TokenIcon symbol={toToken} />
                        <div className="token-select-wrapper">
                            <select
                                aria-label="Token to receive"
                                value={toToken}
                                onChange={(event) => {
                                    setToToken(event.target.value)
                                    resetReview();
                                }}
                            >
                                <option value="ETH" disabled={fromToken === 'ETH'}>
                                    ETH
                                </option>
                                <option value="USDC" disabled={fromToken === 'USDC'}>
                                    USDC
                                </option>
                                <option value="WBTC" disabled={fromToken === 'WBTC'}>
                                    WBTC
                                </option>
                                <option value="SWTH" disabled={fromToken === 'SWTH'}>
                                    SWTH
                                </option>
                            </select>
                            <span className="token-select-arrow" aria-hidden="true" />
                        </div>
                    </div>
                </div>

                {exchangeRate !== undefined && (
                    <p className="exchange-rate">
                        1 {fromToken} ≈{' '}
                        {exchangeRate.toLocaleString('en-US', {
                            maximumFractionDigits: 8,
                        })}{' '}
                        {toToken}
                    </p>
                )}

                <button
                    type="button"
                    className="swap-submit"
                    disabled={Boolean(validationError)}
                    onClick={() => setShowReview(true)}
                >
                    Review swap
                </button>
            </section>
            {showReview && (
                <div className="swap-review">
                    <h2>Review your swap</h2>

                    <p>
                        You pay: <strong>{amount} {fromToken}</strong>
                    </p>

                    <p>
                        You receive approximately:{' '}
                        <strong>
                            {receiveAmount.toLocaleString('en-US', {
                                maximumFractionDigits: 8,
                            })}{' '}
                            {toToken}
                        </strong>
                    </p>

                    <p className="review-note">
                        This is an estimate based on the latest available token prices.
                    </p>

                    <button
                        type="button"
                        className="swap-submit"
                        onClick={() => setShowReview(false)}
                    >
                        Back to edit
                    </button>
                </div>
            )}
        </main>
        </div>
    );
}
