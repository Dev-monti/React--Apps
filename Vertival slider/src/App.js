import React,{ useState } from "react";
import { Infoslideleft,Images } from "./Info";

const Data = Infoslideleft();
const newImages = Images();

function App() {
  const [numsilde,setNumslide] = useState(0);
  const ChangeSlider = (dire) => {
      dire === "bottom" 
      ? (numsilde !== Data.length - 1 ? setNumslide(numsilde + 1) : setNumslide(numsilde))
      : (numsilde !== 0 ? setNumslide(numsilde - 1) : setNumslide(numsilde))
  }
  return (
    <div className="container-fluid p-0">
      <div className="row p-0 m-0">
        <div className="col-xl-4 col-md-6 p-0 slider">
          <div className="icon-arrow icon-arrow1" onClick={() => ChangeSlider("bottom")}>
            <i className="bi bi-arrow-down-short"></i>
          </div>
          {Data.map((item,index) => {
            const {id,title,details,back_Color} = item;
            return(
              <div key={id} 
                className={`d-flex align-items-center justify-content-center text-center sliderLeft ${index === numsilde && "active"} ${index + 1 === numsilde && "dire-bottom"} ${index - 1 === numsilde && "dire-top"}`} 
                style={{
                  backgroundColor: back_Color,
                }}
              >
                <div className="text-white">
                  <h2 className="fw-bold">{title}</h2>
                  <p className="fs-4">{details}</p>
                </div>
              </div>
            )
          })}
        </div>
        <div className="col-xl-8 col-md-6 p-0 slider">
          <div className="icon-arrow icon-arrow2" onClick={() => ChangeSlider("top")}>
            <i className="bi bi-arrow-up-short"></i>
          </div>
          {newImages.map((item,index) => {
            return(
              <div key={index} className={`sliderRight ${index === numsilde && "active"} ${index + 1 === numsilde && "dire-top"} ${index - 1 === numsilde && "dire-bottom"}`}
              >
                <img src={item.image} alt="" />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
