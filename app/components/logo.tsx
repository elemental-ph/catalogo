import Link from 'next/link'

interface LogoProps {
  fillColor?: string
}

const Logo = ({ fillColor = '#fff' }: LogoProps) => {
  return (
    <Link className='pointer-events-auto w-300' href="https://www.elementalchile.cl/es/works" >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1044.56 76.54"
      >
        <g id="STROKES_H">
          <path style={{ fill: fillColor }} d="M0 63.78h92.13v12.76H0zM0 0h92.13v12.76H0zM0 31.89h92.13v12.76H0zM119.06 63.78h92.13v12.76h-92.13zM238.11 63.78h92.13v12.76h-92.13zM238.11 0h92.13v12.76h-92.13zM238.11 31.89h92.13v12.76h-92.13zM357.17 0h92.13v12.76h-92.13zM476.22 63.78h92.13v12.76h-92.13zM476.22 0h92.13v12.76h-92.13zM476.22 31.89h92.13v12.76h-92.13zM595.28 0h92.12v12.76h-92.12zM714.33 0h92.12v12.76h-92.12zM833.38 0h92.12v12.76h-92.12zM833.38 31.89h92.12v12.76h-92.12zM952.44 63.78h92.13v12.76h-92.13z" />
        </g>
        <g id="STROKES_V">
          <path style={{ fill: fillColor }} d="M0 0h12.76v76.54H0zM119.06 0h12.76v76.54h-12.76zM238.11 0h12.76v76.54h-12.76zM357.17 0h12.76v76.54h-12.76zM396.85 0h12.76v76.54h-12.76zM436.54 0h12.76v76.54h-12.76zM476.22 0h12.76v76.54h-12.76zM595.28 0h12.76v76.54h-12.76zM674.64 0h12.76v76.54h-12.76zM754.01 0h12.76v76.54h-12.76zM833.38 0h12.76v76.54h-12.76zM912.75 0h12.76v76.54h-12.76zM952.44 0h12.76v76.54h-12.76z" />
        </g>
      </svg>
    </Link>
  )
}

export default Logo