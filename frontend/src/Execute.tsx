import React from 'react';
import { useQuery, gql } from '@apollo/client';

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    hello
  }
`;

function ExchangeRates() {
    const { loading, error, data } = useQuery(EXCHANGE_RATES);

    console.log(data);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return null;
}

export default ExchangeRates;