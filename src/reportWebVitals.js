import webVitals from "web-vitals";

const reportWebVitals = async (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    const {
      getCLS,
      getFID,
      getFCP,
      getLCP,
      getTTFB,
    } = webVitals;

    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
};

export default reportWebVitals;
