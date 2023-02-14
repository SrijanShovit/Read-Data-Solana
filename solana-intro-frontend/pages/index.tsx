import type { NextPage } from 'next'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import AddressForm from '../components/AddressForm'
import * as Web3 from '@solana/web3.js'

const Home: NextPage = () => {
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState('')
  const [existStatus, setExistStatus] = useState('')

  const addressSubmittedHandler = (address: string) => {
    try {
      setAddress(address)
      const key = new Web3.PublicKey(address)
      const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))
      connection.getBalance(key).then(balance => {
        setBalance(balance / Web3.LAMPORTS_PER_SOL)
      })
    } catch (error) {
      setAddress('')
      setBalance(0)

    }
  }

  const addressCheckHandler = async (address: string) => {
    setExistStatus('');
    setAddress(address)
    const key = new Web3.PublicKey(address)
    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))
    const res = await connection.getAccountInfo(key);
    console.log(res);
    if (res?.executable === false) {
      setExistStatus('Nope');
      setAddress('')
      setBalance(0)
    }
    else {
      setExistStatus('Yes');
      addressSubmittedHandler(key.toString());
    }

  }



  return (
    <>
      <div className={styles.App}>
        <header className={styles.AppHeader}>
          <p>
            Started My Solana Journey!! 🚀
          </p>
          <AddressForm handler={addressCheckHandler} />
          <p>{`Address: ${address}`}</p>
          <p>{`Balance: ${balance} SOL`}</p>
          <p>{`Is this account executable? : ${existStatus}`}</p>
        </header>
      </div>
      <div>

      </div>
    </>
  )
}

export default Home
