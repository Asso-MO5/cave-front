import { forwardRef } from 'react'

export const StretchBox = forwardRef(function StretchBox(props, ref) {
  const {
    children,
    noOverFlow = false,
    className = '',
    disabledOnMobile = false,
  } = props
  return (
    <div className="w-full h-full relative">
      <div
        data-no-overflow={noOverFlow}
        data-disabled-on-mobile={disabledOnMobile}
        className={`${className} absolute data-[disabled-on-mobile=true]:relative sm:data-[disabled-on-mobile=true]:relative inset-0 data-[no-overflow=false]:overflow-y-auto`}
        ref={ref}
      >
        {children}
      </div>
    </div>
  )
})
