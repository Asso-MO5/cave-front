'use client'
import { dc } from '@/utils/dynamic-classes'

export function Button({
  onClick,
  isActive,
  type,
  children,
  theme = 'primary',
  disabled = false,
  iconPosition = 'left',
}) {
  const themeClasses = {
    primary: `border border-mo-primary text-mo-primary hover:bg-mo-primary ${
      isActive ? 'bg-mo-primary text-mo-white' : 'bg-mo-white'
    }`,
    secondary: `border border-mo-secondary text-mo-secondary hover:bg-mo-secondary  ${
      isActive ? 'bg-mo-secondary text-mo-white' : 'bg-mo-white'
    }`,
    valid: `border border-mo-valid text-mo-valid hover:bg-mo-valid ${
      isActive ? 'bg-mo-valid text-mo-white' : 'bg-mo-white'
    }`,
    'primary-inverse': `border border-mo-primary text-mo-white ${
      isActive ? 'bg-mo-primary text-mo-white' : 'bg-mo-primary'
    }`,
    'secondary-inverse': `border border-mo-secondary text-mo-white hover:bg-mo-secondary ${
      isActive ? 'bg-mo-secondary text-mo-white' : 'bg-mo-white'
    }`,
  }

  const styles = dc(
    'flex items-center',
    'gap-1 px-2 py-1 rounded-md hover:text-mo-white transition-colors ease-in-out text-sm',
    themeClasses[theme],
    [disabled, 'opacity-50 cursor-not-allowed'],
    [iconPosition === 'right', 'flex-row-reverse']
  )

  return (
    <button
      type={type || 'button'}
      onClick={(e) => onClick?.(e)}
      className={styles}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
