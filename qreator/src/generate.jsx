
import { useEffect } from "react";
import "./generate.css";
import model1 from "./assets/model1.png";
import model2 from "./assets/model2.png";
import model3 from "./assets/model3.png";



function Generate() {
    useEffect(() => {
        document.querySelectorAll('.model').forEach((model) => {
            model.addEventListener('click', () => {
                document.querySelectorAll('.model').forEach((m) => m.classList.remove('active'));
                
                model.classList.add('active');
            });
        });}, []);
  return (
    <>
      <div className="generate" id="generate">
        <h1>Generate</h1>
        <div className="flexbox">
          <div className="url_input">
            <input type="url" placeholder="Enter your URL " id="url_input" />
            <div className="genbtn">
              <button className="generate-btn">Generate</button>
            </div>
            
          </div>
          <div className="qrmodels">
              <div className="model">  <img src={model1} alt="" /> </div>
              <div className="model">  <img src={model2} alt="" /></div>
              <div className="model">  <img src={model3} alt="" /></div>
            </div>  
        </div>
      </div>
    </>
  );
}

export default Generate;
