import SearchBar from "../search/SearchBar";
import '../../css/carousel.css'
function Carousel() {
    return(
        <>

        <div id="carouselExampleRide" className="carousel slide h-25" data-bs-ride="true">

            <div className="carousel-inner">
                <div className="carousel-item active">
                    <div className="carousel-caption d-none d-md-block">
                        <SearchBar/>
                    </div>
                    <img src={"https://tulieuvankien.dangcongsan.vn/Uploads/2018/7/5/4/united_kingdom.jpg"}
                       style={{height:"500px"}}  className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item">
                    <img src="..." className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item">
                    <img src="..." className="d-block w-100" alt="..."/>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
        </>
    );
}
export default Carousel;