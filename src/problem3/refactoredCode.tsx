import type * as React from 'react';
import { useMemo } from 'react';

const refactoredCode = String.raw`interface WalletBalance {
  blockchain: string;
  currency: string;
  amount: number;
}

// REFACTOR: Removed the unused interface after eliminating the separate formatting map


// REFACTOR: Move the priority mapping outside the component to avoid recreating the object on every render.
const blockchainPriority: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20
};

// REFACTOR: Keep the priority lookup outside the component
const getPriority = (blockchain: string): number => {
  return blockchainPriority[blockchain] ?? -99;
};

//MOCK: hook for wallet balance data
function useWalletBalances(): WalletBalance[] {
  return [
    { currency: 'OSMO', amount: 5, blockchain: 'Osmosis' },
    { currency: 'ETH', amount: 2, blockchain: 'Ethereum' },
    { currency: 'ARB', amount: 10, blockchain: 'Arbitrum' }
  ];
}

//MOCK: hook for wallet prices data
function usePrices(): Record<string, number> {
  return {
    OSMO: 0.5,
    ETH: 2500,
    ARB: 0.8
  };
}

type Props = React.ComponentProps<'div'>;

const WalletPage = (props: Props) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
      const balancePriority = getPriority(balance.blockchain);
      //FIX: Use balancePriority instead of lhsPriority since it's not declared.
      //FIX: Balance amount should be positive not 0 or less
      //REFACTOR: Refactored the nested if condition into a single return statement.
      //ASSUMPTION: Show only positive balances on supported blockchains.
      return balancePriority > -99 && balance.amount > 0;
    })
    .sort((lhs: WalletBalance, rhs: WalletBalance) => {
      // REFACTOR: Sort by priority descending; equal priorities return 0. 
      return getPriority(rhs.blockchain) - getPriority(lhs.blockchain) 
    }); 
  }, [balances]); // FIX: prices removed from dependency since it's not used in the calculation.


  // REFACTOR: Format the amount directly when creating each row and removed the separate formattedBalances map. Removed unused index
  const rows = sortedBalances.map((balance: WalletBalance) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={'wallet-row'}
        key={balance.currency} // REFACTOR: Use a stable key to help React identify each wallet row, index can be changed when we edit or update the row.
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.amount.toFixed()}
      />
    )
  })

  return (
    <div {...props}>
      {rows}
    </div>
  )
}`;

export default refactoredCode;
