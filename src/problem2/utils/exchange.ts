
export function calculateExchangeAmount(
    amount: number,
    sourcePrice: number,
    destinationPrice: number,
): number {
    if (
        !Number.isFinite(amount) ||
        !Number.isFinite(sourcePrice) ||
        !Number.isFinite(destinationPrice) ||
        amount < 0 ||
        sourcePrice <= 0 ||
        destinationPrice <= 0
    ) {
        return 0;
    }

    return amount * (sourcePrice / destinationPrice);
}
