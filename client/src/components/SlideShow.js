import React from 'react';
import '../styles/SlideShow.css'

const colors = ["#00C49F","#00C49F", "#00C49F", "#FFBB28"];
const delay = 3500;

function SlideShow() {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === colors.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div className="slideshowSlider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
        {/* {colors.map((backgroundColor, index) => (
          <div
            className="slide"
            key={index}
            style={{ backgroundColor }}
          ></div> */}
        {/* <img align="middle" className = " slide landing-logo" src={require('../images/10.png')} alt=""/>    */}
        <img align="middle" className = " slide landing-logo" src={require('../images/11.png')} alt=""/>   
        <img align="middle" className = "slide landing-logo" src={require('../images/12.png')} alt="a"/>   
        <img align="middle" className = "slide landing-logo" src={require('../images/13.png')} alt=""/>   
        <img align="middle" className = " slide landing-logo" src={require('../images/15.png')} alt=""/>   
        {/* ))} */}
      </div>

      <div className="slideshowDots">
        {colors.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
export default SlideShow
// ReactDOM.render(<Slideshow />, document.getElementById("App"));