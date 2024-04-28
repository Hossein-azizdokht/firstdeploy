import React, { useState, useEffect } from "react";

function Splash(props) {
  const [hide, sethide] = useState();
  useEffect(() => {
    sethide(props.hide);
  }, []);
  const className = !hide ? "splashWrp fade-out" : "splashWrp";

  return (
    <div className={props.withoutLabel? 'splashWrp bigSplashWrp' : className}>
      <div className="splash">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          id="logo"
          viewBox="0 0 47.477 47.833"
          fill="none"
        >
          <path
            id="Path_28"
            data-name="Path 28"
            d="M130.378,112.44c.162-.7.243-1.021.407-1.8.124-.473.188-.547.717-.34a7.778,7.778,0,0,1,3.514,2.78,9.419,9.419,0,0,1,1.639,7.624,8.888,8.888,0,0,1-1.957,4.272c-3.418,4.413-10.2,5.292-15.062,2.813a5.809,5.809,0,0,1-1.352-1.092,7.513,7.513,0,0,1-1.671-2.474,7.647,7.647,0,0,1-.69-3.348,10.537,10.537,0,0,1,.617-4,10.333,10.333,0,0,1,1.031-1.894A17.173,17.173,0,0,1,119,113.369a18.407,18.407,0,0,1,2.01-1.5,4.665,4.665,0,0,1,2.193-.88c.253.079-.322,1.436-.545,1.966-.063.148-.952.672-1.455,1.149a7.5,7.5,0,0,0-2.716,5.754,5.075,5.075,0,0,0,2.194,4.432,7.49,7.49,0,0,0,4.484,1.327c2.382-.188,3.469-.406,5.234-1.72,2.069-1.54,2.857-3.669,2.857-6.366a5.544,5.544,0,0,0-1.842-4.046c-.671-.579-1.122-.663-1.033-1.049Zm-6.982,4.74c0-2.08,1.641-5.62,2.423-7.731.181-.487.462-.56,1.02-.663.814-.151,1.9-.314,1.988-.151a31.578,31.578,0,0,1-.907,4.461c-.126.6-.846,4.063-.983,4.345-.7.049-2.51.016-3.317.016-.233,0-.224-.029-.224-.277Zm14.111-10.651A22.917,22.917,0,0,1,139.7,108.2c.154.142.211.186.345.3a26.8,26.8,0,0,1,2.194,2.254,17.44,17.44,0,0,1,2.153,3.868,20.387,20.387,0,0,1,1.117,5.035,14.3,14.3,0,0,1-1.236,7.219,12.381,12.381,0,0,1-1.992,3.189,23.376,23.376,0,0,1-3.565,3.5,22.78,22.78,0,0,1-2.953,2.065,14.3,14.3,0,0,1-3.519,1.468c-.309,0-.518-.622-.909-1.551-.257-.611-.559-1.374-.825-1.989-.617-1.321-.5-.9,1.94-2.057a16.7,16.7,0,0,0,2.179-1.24,15.033,15.033,0,0,0,2.7-2.316,14,14,0,0,0,3.945-8.475,12.57,12.57,0,0,0-2.251-8.259,9.567,9.567,0,0,0-6.446-3.83,18.452,18.452,0,0,0-12.432,3.094,26.511,26.511,0,0,0-3.235,2.485,18.467,18.467,0,0,0-2.15,2.451,14.726,14.726,0,0,0-1.958,3.2,11.6,11.6,0,0,0-.822,4.328,9.779,9.779,0,0,0,2.9,7.39c2.245,2.235,4.409,2.631,7.256,3.378.253.066.186,1.722.186,2.285,0,.4.055,2.332-.169,2.424a9.986,9.986,0,0,1-2.355-.4,16.171,16.171,0,0,1-4.517-2.01,12.893,12.893,0,0,1-1.645-1.222,14.061,14.061,0,0,1-1.2-1.281,12.556,12.556,0,0,1-1.87-3.045,15.7,15.7,0,0,1-.578-1.478l-.338-.958a20.865,20.865,0,0,0,.262,6.965c.371-.286.485-.381.687-.551a3.7,3.7,0,0,1,.406-.333c.136.131.674.794.78.926a20.7,20.7,0,0,0,3.953,3.28,26.65,26.65,0,0,0,2.779,1.4c2.648,1.3,10.2,2.921,16.543.015a25.372,25.372,0,0,0,5.372-3.433c.588-.471,1.127-1.093,1.331-.8l1.286,1.487a3.679,3.679,0,0,1,.67.859c.054.213-.393.574-.609.75l-.807.7a22.424,22.424,0,0,1-2.039,1.535,26.877,26.877,0,0,1-4.2,2.188,23.371,23.371,0,0,1-10.2,1.723,18.65,18.65,0,0,1-9.054-2.392,27.308,27.308,0,0,1-4.616-3.382l-.729-.7a14.982,14.982,0,0,1-1.053-1.222,6.376,6.376,0,0,0,.754,1.8,19.865,19.865,0,0,0,2.04,2.666,16.861,16.861,0,0,0,8.52,5.04l1.188.291c.172.042.169,0,.343.889.042.2.362,1.829.126,1.895-.909.172-4.314-1.312-4.9-1.553A20.4,20.4,0,0,1,116.4,147l-1.881-1.183a12.935,12.935,0,0,0,1.914,1.72,24.485,24.485,0,0,0,2.68,1.637,22.458,22.458,0,0,0,5.721,1.846,27.948,27.948,0,0,0,12.735-.828,26.431,26.431,0,0,0,2.617-.883c1.544-.609,1.236-.917,1.916.152.824,1.3,1.087,1.295-.348,1.913a27.524,27.524,0,0,1-8.627,2.09,25.465,25.465,0,0,1-3.386.2c-.776,0-2.042-.038-2.493-.042.708.181,1.855.4,2.535.505a24.5,24.5,0,0,0,18.247-4.729c4.68-4.137,6.854-7.51,8.323-13.261a22.169,22.169,0,0,0,.571-3.5c-.053.187-.291,1.016-.61,2.02-.422,1.394-.539,1.619-.971,2.755a21.378,21.378,0,0,1-2.983,5.559c-.345.475-.8,1.295-1.271.728-1.253-1.64-1.216-1.284-.784-1.775a23.963,23.963,0,0,0,1.84-2.457c2.422-4.453,3.01-5.631,3.784-10.421a16.343,16.343,0,0,0-.131-5.359,17.448,17.448,0,0,0-1.253-3.789,30.68,30.68,0,0,1,.357,4.653,24.94,24.94,0,0,1-1.508,8.258,27.017,27.017,0,0,1-4.36,7.375l-.629.748a25.271,25.271,0,0,1-2.062,2.022,19.219,19.219,0,0,1-2.833,2.135,30.314,30.314,0,0,1-12.954,4.444c-.289-.033-.37-.275-.458-.525-.131-.37-.872-2.077-.716-2.191a12.142,12.142,0,0,1,1.608-.3,47.69,47.69,0,0,0,5.114-1.259,25.07,25.07,0,0,0,6.329-3.251,29.309,29.309,0,0,0,3-2.476c.893-.893,1.977-2.055,2.779-3.037a15.382,15.382,0,0,0,1.8-2.53,20.771,20.771,0,0,0,1.954-14.623,16.468,16.468,0,0,0-1.637-4.276,21.459,21.459,0,0,0-2.879-3.625l-.479-.5a9.578,9.578,0,0,0-2.123-1.589,4.912,4.912,0,0,0,.616.733,22.05,22.05,0,0,1,1.645,2.222,21.28,21.28,0,0,1,1.8,3.4c2.67,6.415,2.484,12.819-1.67,18.345-1.852,2.476-1.766,2.087-2.681,1.14-.294-.335-.212-.234-.53-.6-1.067-1.161-.895-.9-.321-1.56a14.557,14.557,0,0,0,3.136-5.534,19.454,19.454,0,0,0,.46-9.453,17.523,17.523,0,0,0-2.509-6.266,11.25,11.25,0,0,0-2.3-2.7,15.629,15.629,0,0,0-3.04-1.938,10.486,10.486,0,0,0-1.947-.621Z"
            transform="translate(-109.445 -106.53)"
            fillRule="evenodd"
            stroke="#fff"
            strokeWidth="0.7"
          />
        </svg>
        {!props.withoutLabel && (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                position: "relative",
                marginTop: "130px",
                color: "#fff",
                fontSize: "0.8rem",
              }}
            >
              پــارس تـکنـولـوژی ســداد
            </div>
            <div
              style={{
                position: "relative",
                color: "#fff",
                fontSize: "0.65rem",
                fontWeight: "200",
                marginTop: "18px",
                opacity: "0.6"
              }}
            >
              فناوری اطلاعات و ارتباطات
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Splash;
