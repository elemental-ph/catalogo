interface LogoProps {
  fillColor?: string
}

const LogoSquare = ({ fillColor = '#000' }: LogoProps) => {
  return (
    <div className='pointer-events-auto w-300' >
      <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 304.64 257.89">
      <g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1">
        <g id="LWPOLYLINE"><polygon  points="0 77.42 0 0 93.11 0 93.11 12.85 12.96 12.96 12.96 32.23 93.11 32.23 93.11 45.19 12.96 45.19 12.96 64.46 93.11 64.46 93.11 77.42 0 77.42 0 77.42"/></g>
        <g id="LWPOLYLINE-2" data-name="LWPOLYLINE"><polygon points="105.77 77.42 105.77 0 118.61 0 118.61 64.46 198.87 64.46 198.87 77.42 105.77 77.42 105.77 77.42"/></g>
        <g id="LWPOLYLINE-3" data-name="LWPOLYLINE"><polygon points="211.53 77.42 211.53 0 304.64 0 304.64 12.85 224.5 12.96 224.5 32.23 304.64 32.23 304.64 45.19 224.5 45.19 224.5 64.46 304.64 64.46 304.64 77.42 211.53 77.42 211.53 77.42"/></g>
        <g id="LWPOLYLINE-4" data-name="LWPOLYLINE"><polygon points="80.26 167.51 80.26 103.05 53.03 103.05 53.03 167.51 40.07 167.51 40.07 103.05 12.96 103.05 12.96 167.51 0 167.51 0 90.08 93.11 90.08 93.11 167.51 80.26 167.51 80.26 167.51"/></g>
        <g id="LWPOLYLINE-5" data-name="LWPOLYLINE"><polygon points="105.77 167.51 105.77 90.08 198.87 90.08 198.87 102.93 118.73 103.05 118.73 122.32 198.87 122.32 198.87 135.28 118.73 135.28 118.73 154.55 198.87 154.55 198.87 167.51 105.77 167.51 105.77 167.51"/></g>
        <g id="LWPOLYLINE-6" data-name="LWPOLYLINE"><polygon points="291.79 167.51 291.79 103.05 224.5 103.05 224.5 167.51 211.53 167.51 211.53 90.08 304.64 90.08 304.64 167.51 291.79 167.51 291.79 167.51"/></g>
        <g id="LWPOLYLINE-7" data-name="LWPOLYLINE"><polygon points="53.03 193.13 53.03 257.59 40.07 257.59 40.07 193.13 0 193.01 0 180.17 93.11 180.17 93.11 193.01 53.03 193.13 53.03 193.13"/></g>
        <path d="M105.77,180.47v77.42h13V225.66H186v32.23h12.85V180.47ZM186,212.7H118.73V193.43H186Z"/>
        <g id="LWPOLYLINE-8" data-name="LWPOLYLINE"><polygon  points="211.53 257.89 211.53 180.47 224.38 180.47 224.38 244.93 304.64 244.93 304.64 257.89 211.53 257.89 211.53 257.89"/></g></g></g>
        </svg>
    </div>
  )
}

export default LogoSquare