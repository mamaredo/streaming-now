import { GlobalContentWrapper } from './GlobalContentWrapper'
import { Logo } from './Logo'

export const Header = () => {
  return (
    <GlobalContentWrapper
      height={{ base: '56px', xl: '72px' }}
      display="flex"
      alignItems="center"
    >
      <Logo />
    </GlobalContentWrapper>
  )
}
