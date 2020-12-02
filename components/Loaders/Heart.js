export default function Heart() {
  const strokeColor = "#B8B8B8";
  const heartColor = "#df1737";
  const size = "60px";
  const totalAnim = "6s";
  const delay = "1s";
  const squareLen = "240";
  const circleLen = "188.522";
  const heartLen = "308.522";
  const svgSize = "90px";
  const circleW = "60px";
  return (
    <>
      <svg
        className="heart-loader"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 90 90"
        version="1.1"
      >
        <g className="heart-loader__group">
          <path
            className="heart-loader__square"
            strokeWidth="1"
            fill="none"
            d="M0,30 0,90 60,90 60,30z"
          />
          <path
            className="heart-loader__circle m--left"
            strokeWidth="1"
            fill="none"
            d="M60,60 a30,30 0 0,1 -60,0 a30,30 0 0,1 60,0"
          />
          <path
            className="heart-loader__circle m--right"
            strokeWidth="1"
            fill="none"
            d="M60,60 a30,30 0 0,1 -60,0 a30,30 0 0,1 60,0"
          />
          <path
            className="heart-loader__heartPath"
            strokeWidth="2"
            d="M60,30 a30,30 0 0,1 0,60 L0,90 0,30 a30,30 0 0,1 60,0"
          />
        </g>
      </svg>
      <style jsx>{`
        .heart-loader {
          position: relative;
          display: block;
          height: ${size};
          overflow: visible;
          text-align: center;
          padding-top: 1rem;
        }

        .heart-loader__group {
          transform-origin: 0 ${svgSize};
          animation: group-anim ${totalAnim} ${delay} infinite;
        }

        .heart-loader__square {
          stroke: ${strokeColor};
          stroke-dasharray: ${squareLen}, ${squareLen};
          stroke-dashoffset: ${squareLen};
          animation: square-anim ${totalAnim} ${delay} infinite;
        }

        .heart-loader__circle {
          stroke: ${strokeColor};
          stroke-dasharray: ${circleLen}, ${circleLen};
          stroke-dashoffset: ${circleLen};
          transform-origin: ${circleW} ${circleW} / 2;
        }

        .heart-loader__circle.m--left {
          animation: left-circle-anim ${totalAnim} ${delay} infinite;
        }

        .heart-loader__circle.m--right {
          animation: right-circle-anim ${totalAnim} ${delay} infinite;
        }

        .heart-loader__heartPath {
          stroke: ${heartColor};
          fill: transparent;
          stroke-dasharray: ${heartLen}, ${heartLen};
          stroke-dashoffset: ${heartLen};
          animation: heart-anim ${totalAnim} ${delay} infinite;
        }

        @keyframes square-anim {
          12% {
            stroke-dashoffset: 0;
          }

          43% {
            stroke-dashoffset: 0;

            opacity: 1;
          }

          85% {
            stroke-dashoffset: 0;

            opacity: 0;
          }

          100% {
            stroke-dashoffset: 0;

            opacity: 0;
          }
        }

        @keyframes left-circle-anim {
          12% {
            stroke-dashoffset: ${circleLen};
          }

          31% {
            stroke-dashoffset: 0;

            transform: translateY(0);
          }

          41% {
            stroke-dashoffset: 0;

            transform: translateY(${circleW} / -2);
          }

          43% {
            stroke-dashoffset: 0;

            transform: translateY(${circleW} / -2);

            opacity: 1;
          }

          85% {
            stroke-dashoffset: 0;

            transform: translateY(${circleW} / -2);

            opacity: 0;
          }

          100% {
            stroke-dashoffset: 0;

            transform: translateY(${circleW} / -2);

            opacity: 0;
          }
        }

        @keyframes right-circle-anim {
          12% {
            stroke-dashoffset: ${circleLen};
          }

          31% {
            stroke-dashoffset: 0;

            transform: translateX(0);
          }

          41% {
            stroke-dashoffset: 0;

            transform: translateX(${circleW} / 2);
          }

          43% {
            stroke-dashoffset: 0;

            transform: translateX(${circleW} / 2);

            opacity: 1;
          }

          85% {
            stroke-dashoffset: 0;

            transform: translateX(${circleW} / 2);

            opacity: 0;
          }

          100% {
            stroke-dashoffset: 0;

            transform: translateX(${circleW} / 2);

            opacity: 0;
          }
        }

        @keyframes group-anim {
          43% {
            transform: rotate(0);
          }

          54% {
            transform: rotate(-45deg);
          }

          90% {
            transform: rotate(-45deg);

            opacity: 1;
          }

          97% {
            transform: rotate(-45deg);

            opacity: 0;
          }

          100% {
            transform: rotate(-45deg);

            opacity: 0;
          }
        }

        @keyframes heart-anim {
          55% {
            stroke-dashoffset: ${heartLen};

            fill: transparent;
          }

          70% {
            stroke-dashoffset: 0;

            fill: transparent;
          }

          87% {
            stroke-dashoffset: 0;

            fill: ${heartColor};
          }

          100% {
            stroke-dashoffset: 0;

            fill: ${heartColor};
          }
        }
      `}</style>
    </>
  );
}
