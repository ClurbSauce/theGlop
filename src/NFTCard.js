import React from 'react';
import Popup from './Popup';
import { useState } from 'react';

const tokenImg = undefined;

const handleClick = () => {
    console.log('clicked worked yo');
}


const NFTCard = ({ nft }) => {

    const [buttonPopup, setButtonPopup] = useState(false);

    const tokenImg = `https://ipfs.io/ipfs/${nft.token.metadata.displayUri?.split("ipfs://")[1]}`

    //const tokenThumbnailImg = `https://ipfs.io/ipfs/${nft.token.metadata.thumbnailUri.split("ipfs://")[1]}`

    return (
        <div className='card nft-card'>
            <img onClick={() => setButtonPopup(true)} src={tokenImg} className='nft-image' />

            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <h3>My Popup</h3>
            </Popup>
            
            {/* <div className='card content-item'>
                NFT Name:
            </div> */}
            <div className='card'>
                {nft.token.metadata.name}
            </div>
            {/* <div className='card content-item'>
                Collection Description:
            </div>
            <div>
                {nft.token.metadata.description}
            </div> */}
        </div>
    )
}

export default NFTCard