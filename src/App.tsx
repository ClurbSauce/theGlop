import { useEffect, useState } from 'react';
import './App.css';
import ConnectButton from './ConnectWallet';
import { TezosToolkit, WalletContract } from '@taquito/taquito';
import DisconnectButton from './DisconnectWallet';
import AddressInput from './AddressInput';
import { Contract, ContractsService } from '@dipdup/tzkt-api';
import NFTContainer from './NFTContainer';
import { Token } from '@taquito/michelson-encoder';
import glopLogo from "./images/theGlop.png";


function App() {
  
  const [Tezos, setTezos] = useState<TezosToolkit>(new TezosToolkit("https://jakartanet.tezos.marigold.dev"));
  const [wallet, setWallet] = useState<any>(null);
  const [userAddress, setUserAddress] = useState<string>("");
  const [userBalance, setUserBalance] = useState<number>(0);
  const [nfts, setNfts] = useState([]);
  const [recipient, setRecipient] = useState<string>("");
  const [otherAddress, setOtherAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);


  
  //tzkt
  const contractsService = new ContractsService( {baseUrl: "https://api.jakartanet.tzkt.io/" , version : "", withCredentials : false});
  const [contracts, setContracts] = useState<Array<Contract>>([]);
  
  const fetchContracts = () => {
    (async () => {
      setContracts((await contractsService.getSimilar({address:"KT1M1sXXUYdLvow9J4tYcDDrYa6aKn3k1NT9" , includeStorage:true, sort:{desc:"id"}})));
    })();
  }

  //NFTs
  const getNftData = async () => {
    if(!userAddress) return;
    const response = await fetch(`https://api.tzkt.io/v1/tokens/balances?account=${userAddress}&token`)
    const data = await response.json()
    //debugger
    setNfts(data)
  }

  useEffect(() => {
    getNftData()
  }, [userAddress]);

  const getOtherNftData = async () => {
    if(!otherAddress) return;
    const response = await fetch(`https://api.tzkt.io/v1/tokens/balances?account=${otherAddress}&token`)
    const data = await response.json()
    //debugger
    setNfts(data)

    setUserAddress("");
    setUserBalance(0);
    setWallet(null);
    console.log("disconnecting wallet");
  }
  
  //poke
  const poke = async (contract : Contract) => {   
    let c : WalletContract = await Tezos.wallet.at(""+contract.address);
    try {
      const op = await c.methods.default().send();
      await op.confirmation();
    } catch (error : any) {
      console.log(error);
      console.table(`Error: ${JSON.stringify(error, null, 2)}`);
    }
  };
  
  if (!userAddress && !otherAddress) {
    return (
      <div className="App">
        <div className='top'>
            <div className='text'>
              Account: {userAddress}
            </div>
            <div className='text'>
              Amount: {userBalance}
            </div>
        </div>
        <div className='header'>
          <div className='h1'>
            <ConnectButton
            Tezos={Tezos}
            setWallet={setWallet}
            setUserAddress={setUserAddress}
            setUserBalance={setUserBalance}
            wallet={wallet}
            />
          </div>
          <div className='h2'>
            <div className='logo'>
              <img src={glopLogo} alt="discord" />
            </div>
          </div>
          <div className='h3'>
            <div id="address-inputs">
              <input
              type="text"
              placeholder="Type Address"
              value={otherAddress}
              onChange={e => setOtherAddress(e.target.value)}
              />
              <button
              className="buttonSmall"
              disabled={!setOtherAddress}
              onClick={() => {
                getOtherNftData();
                setNfts([]);
              }}
              >
                {loading ? (
                  <span>
                    <i className="fas fa-spinner fa-spin"></i>&nbsp; Please wait
                  </span>
                ) : (
                  <span>
                    Load
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className='text'>
              Connect your wallet!
            </div>
      </div>
      );
  } else if (userAddress && !otherAddress) {
    return (
      <div className="App">
        <div className='top'>
            <div className='text'>
              Account: {userAddress}
            </div>
            <div className='text'>
              Amount: {userBalance}
            </div>
        </div>
        <div className='header'>
          <div className='h1'>
            <DisconnectButton
            wallet={wallet}
            setUserAddress={setUserAddress}
            setUserBalance={setUserBalance}
            setWallet={setWallet}
            />
          </div>
          <div className='h2'>
            <div className='logo'>
              <img src={glopLogo} alt="logo" />
            </div>
          </div>
          <div className='h3'>
           <div id="address-inputs">
              <input
              type="text"
              placeholder="Type Address"
              value={otherAddress}
              onChange={e => setOtherAddress(e.target.value)}
              />
              <button
              className="buttonSmall"
              disabled={!setOtherAddress}
              onClick={() => {
                getOtherNftData();
                setNfts([]);
              }}
              >
                {loading ? (
                  <span>
                    <i className="fas fa-spinner fa-spin"></i>&nbsp; Please wait
                  </span>
                ) : (
                  <span>
                    Load
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
        <NFTContainer nfts={nfts} />
      </div>
      );
    } else if (!userAddress && otherAddress) {
      return (
        <div className="App">
          <div className='top'>
              <div className='text'>
                Account: {otherAddress}
              </div>
              <div className='text'>
                Amount: {userBalance}
              </div>
          </div>
          <div className='header'>
            <div className='h1'>
              <ConnectButton
              Tezos={Tezos}
              setWallet={setWallet}
              setUserAddress={setUserAddress}
              setUserBalance={setUserBalance}
              wallet={wallet}
              />
            </div>
            <div className='h2'>
              <div className='logo'>
                <img src={glopLogo} alt="logo" />
              </div>
            </div>
            <div className='h3'>
              <div id="address-inputs">
                <input
                type="text"
                placeholder="Type Address"
                value={otherAddress}
                onChange={e => setOtherAddress(e.target.value)}
                />
                <button
                className="buttonSmall"
                disabled={!setOtherAddress}
                onClick={() => {
                  getOtherNftData();
                  setNfts([]);
                }}
                >
                  {loading ? (
                    <span>
                      <i className="fas fa-spinner fa-spin"></i>&nbsp; Please wait
                    </span>
                  ) : (
                    <span>
                      Load
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
          <NFTContainer nfts={nfts} />
        </div>
        );
      } else if (userAddress && otherAddress) {
      return (
        <div className="App">
          <div className='top'>
              <div className='text'>
                Account: {userAddress}
              </div>
              <div className='text'>
                Amount: {userBalance}
              </div>
          </div>
          <div className='header'>
            <div className='h1'>
              <DisconnectButton
              wallet={wallet}
              setUserAddress={setUserAddress}
              setUserBalance={setUserBalance}
              setWallet={setWallet}
              />
            </div>
            <div className='h2'>
              <div className='logo'>
                <img src={glopLogo} alt="logo" />
              </div>
            </div>
            <div className='h3'>
              <div id="address-inputs">
                <input
                type="text"
                placeholder="Type Address"
                value={otherAddress}
                onChange={e => setOtherAddress(e.target.value)}
                />
                <button
                className="buttonSmall"
                disabled={!setOtherAddress}
                onClick={() => {
                  getOtherNftData();
                  setNfts([]);
                }}
                >
                  {loading ? (
                    <span>
                      <i className="fas fa-spinner fa-spin"></i>&nbsp; Please wait
                    </span>
                  ) : (
                    <span>
                      Load
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
          <NFTContainer nfts={nfts} />
        </div>
        );
      } else {
        return <div>An error has occured</div>
      }
  };
  
  export default App;
  