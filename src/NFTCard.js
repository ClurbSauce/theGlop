import React from 'react'

const tokenImg = undefined;


const NFTCard = ({ nft }) => {

    const tokenImg = `https://ipfs.io/ipfs/${nft.token.metadata.displayUri?.split("ipfs://")[1]}`

    //const tokenThumbnailImg = `https://ipfs.io/ipfs/${nft.token.metadata.thumbnailUri.split("ipfs://")[1]}`

    return (
        <div className='card nft-card'>
            <img src={tokenImg} className='nft-image' />
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