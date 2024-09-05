function Home() {
    return (
        <div className="d-flex justify-content-between py-5 bg-search">
            <div className="form-title">
                <h1 className="fw-bold text-black text-center" style={{width: 576}}>
                    Find a perfect property
                    Where you'll love to live
                </h1>
                <p style={{width: 576}} className='fs-5 text-dark-emphasis fw-normal'>
                    We helps businesses customize,
                    automate and scale up their ad production and delivery.
                </p>
                <div className='bg-white'>
                    <ul className="list-inline d-flex justify-content-center p-3">
                        <li className="fw-bold py-3 px-5 rounded bg-dark w-25">Buy</li>
                        <li className="fw-bold py-3 px-5 mx-4 rounded bg-dark w-25">Sell</li>
                        <li className="fw-bold py-3 px-5 rounded bg-dark w-25">Rent</li>
                    </ul>
                </div>
            </div>
            <img className="my-5" src="/images/house_image.png" alt="" width={'610px'}/>
        </div>
    );
}

export default Home;